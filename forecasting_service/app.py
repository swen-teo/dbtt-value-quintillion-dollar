"""
app.py — Flask backend for the Valu$ AI Demand Forecasting Dashboard.
Connects to MySQL database with Multi-Store capability.
"""

import pymysql
import os
from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
from datetime import datetime

DB_HOST = "127.0.0.1"
DB_USER = "root"
DB_PASS = ""
DB_PORT = 3306
DB_NAME = "valu_forecast"

app = Flask(__name__)
CORS(app)  # Keep flask-cors as fallback

@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type,Authorization'
    response.headers['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE,OPTIONS'
    return response


def get_db():
    return pymysql.connect(
        host=DB_HOST, 
        user=DB_USER, 
        password=DB_PASS, 
        port=DB_PORT, 
        database=DB_NAME,
        cursorclass=pymysql.cursors.DictCursor
    )


# ── Pages ─────────────────────────────────────────────────────────────────────

@app.route("/")
def index():
    return render_template("forecast.html")


# ── API: Outlets & Products ───────────────────────────────────────────────────

@app.route("/api/outlets")
def api_outlets():
    conn = get_db()
    cur = conn.cursor()
    cur.execute("SELECT * FROM outlets ORDER BY id")
    rows = cur.fetchall()
    conn.close()
    return jsonify(rows)


@app.route("/api/products")
def api_products():
    conn = get_db()
    cur = conn.cursor()
    cur.execute("""
        SELECT p.id, p.sku, p.name, p.unit_price, p.current_stock, p.reorder_level,
               c.name as category
        FROM products p
        JOIN categories c ON p.category_id = c.id
        ORDER BY p.name
    """)
    rows = cur.fetchall()
    conn.close()
    return jsonify(rows)


# ── API: Generate Forecast ────────────────────────────────────────────────────

@app.route("/api/forecast/generate", methods=["POST"])
def api_forecast_generate():
    """Trigger ML forecast for a specific outlet to save time."""
    from forecast import train_and_forecast
    
    data = request.get_json() or {}
    outlet_id = data.get("outlet_id", 1)
    forecast_days = 30
    
    conn = get_db()
    cur = conn.cursor()
    cur.execute("SELECT id FROM products")
    products = cur.fetchall()
    conn.close()
    
    models_trained = 0
    for p in products:
        train_and_forecast(p["id"], outlet_id, forecast_days)
        models_trained += 1
        
    return jsonify({
        "status": "success",
        "models_trained": models_trained,
        "forecast_days": forecast_days,
        "outlet_id": outlet_id
    })


# ── API: Forecast Results ─────────────────────────────────────────────────────

@app.route("/api/forecast/results")
def api_forecast_results():
    """Return stored forecast data given an outlet_id."""
    outlet_id = request.args.get("outlet_id", 1)  # default to outlet 1
    conn = get_db()
    cur = conn.cursor()

    cur.execute("""
        SELECT f.*, p.name as product_name, p.sku
        FROM forecasts f
        JOIN products p ON f.product_id = p.id
        WHERE f.outlet_id = %s
        ORDER BY p.name, f.forecast_date
    """, (outlet_id,))
    
    rows = cur.fetchall()
    conn.close()
    return jsonify(rows)


# ── API: Restock Alerts ───────────────────────────────────────────────────────

@app.route("/api/forecast/alerts")
def api_forecast_alerts():
    """Items where total 30-day predicted demand exceeds current stock at a specific outlet."""
    outlet_id = request.args.get("outlet_id", 1)
    conn = get_db()
    cur = conn.cursor()
    
    # We apportion the global "current_stock" to the outlet equally for demo purposes
    # Alternatively we can just use the global stock vs outlet demand, but real scenarios
    # would map outlet inventory. For now, we divide the stock by 4 (number of outlets)
    # to trigger alerts properly for a single outlet view.
    
    cur.execute("""
        SELECT
            p.id,
            p.sku,
            p.name,
            FLOOR(MAX(p.current_stock) / 4) as current_stock,
            MAX(p.reorder_level) as reorder_level,
            MAX(c.name) as category,
            ROUND(SUM(f.predicted_demand)) as total_forecast_30d,
            ROUND(AVG(f.predicted_demand), 1) as avg_daily_demand,
            MAX(f.generated_at) as last_forecast
        FROM products p
        JOIN forecasts f ON p.id = f.product_id
        JOIN categories c ON p.category_id = c.id
        WHERE f.outlet_id = %s
        GROUP BY p.id
        HAVING total_forecast_30d > (MAX(p.current_stock) / 4)
        ORDER BY (total_forecast_30d - (MAX(p.current_stock) / 4)) DESC
    """, (outlet_id,))
    
    rows = cur.fetchall()
    conn.close()
    return jsonify(rows)


# ── API: Dashboard Summary ────────────────────────────────────────────────────

@app.route("/api/forecast/summary")
def api_forecast_summary():
    """Aggregated metrics for the dashboard cards for a specific outlet."""
    outlet_id = request.args.get("outlet_id", 1)
    conn = get_db()
    cur = conn.cursor()

    cur.execute("SELECT ROUND(SUM(predicted_demand)) as total FROM forecasts WHERE outlet_id = %s", (outlet_id,))
    total = cur.fetchone()

    cur.execute("""
        SELECT COUNT(*) as count FROM (
            SELECT p.id
            FROM products p
            JOIN forecasts f ON p.id = f.product_id
            WHERE f.outlet_id = %s
            GROUP BY p.id
            HAVING SUM(f.predicted_demand) > (MAX(p.current_stock) / 4)
        ) as t
    """, (outlet_id,))
    at_risk = cur.fetchone()

    cur.execute("""
        SELECT c.name as category, ROUND(SUM(f.predicted_demand)) as total_demand
        FROM forecasts f
        JOIN products p ON f.product_id = p.id
        JOIN categories c ON p.category_id = c.id
        WHERE f.outlet_id = %s
        GROUP BY c.id
        ORDER BY total_demand DESC
    """, (outlet_id,))
    cat_breakdown = cur.fetchall()

    cur.execute("""
        SELECT p.name, ROUND(SUM(f.predicted_demand)) as total_demand,
               FLOOR(p.current_stock / 4) as current_stock
        FROM forecasts f
        JOIN products p ON f.product_id = p.id
        WHERE f.outlet_id = %s
        GROUP BY p.id
        ORDER BY total_demand DESC
        LIMIT 5
    """, (outlet_id,))
    top_products = cur.fetchall()

    cur.execute("""
        SELECT order_date as date, SUM(quantity) as total
        FROM historical_orders
        WHERE outlet_id = %s
        GROUP BY order_date
        ORDER BY order_date DESC
        LIMIT 60
    """, (outlet_id,))
    hist = cur.fetchall()

    conn.close()

    return jsonify({
        "total_forecast_30d": total["total"] if total and total["total"] else 0,
        "products_at_risk": at_risk["count"] if at_risk else 0,
        "total_products": 20,
        "category_breakdown": cat_breakdown,
        "top_products": top_products,
        "historical_daily": list(reversed(hist)),
        "last_updated": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
    })


# ── API: Historical data for charts ──────────────────────────────────────────

@app.route("/api/historical")
def api_historical():
    """Return historical daily demand for a specific outlet."""
    outlet_id = request.args.get("outlet_id", 1)
    days = int(request.args.get("days", 60))
    
    conn = get_db()
    cur = conn.cursor()
    cur.execute("""
        SELECT order_date as date, SUM(quantity) as total
        FROM historical_orders
        WHERE outlet_id = %s
        GROUP BY order_date
        ORDER BY order_date DESC
        LIMIT %s
    """, (outlet_id, days))
    
    rows = cur.fetchall()
    conn.close()
    return jsonify(list(reversed(rows)))


if __name__ == "__main__":
    print("Starting Valu$ Multi-Store Demand Forecasting Server...")
    print("    Open http://localhost:5000 in your browser\n")
    app.run(debug=True, port=5000)
