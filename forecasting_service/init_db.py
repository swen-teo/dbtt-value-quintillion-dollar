"""
init_db.py — Initialise the Valu$ Wholesale sample MySQL database.

Creates `valu_forecast` database and populates it with ~1 year of daily
order data across 4 distinct store locations.
NOW SYNCED WITH SUPABASE PRODUCTS.
"""

import pymysql
import random
import math
import os
import requests
from datetime import datetime, timedelta
from dotenv import load_dotenv

# Load environment variables from project root
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))

# DB Connection Config
DB_HOST = "127.0.0.1"
DB_USER = "root"
DB_PASS = ""
DB_PORT = 3306
DB_NAME = "valu_forecast"

# Supabase Config
SUPABASE_URL = os.getenv("VITE_SUPABASE_URL")
SUPABASE_KEY = os.getenv("VITE_SUPABASE_ANON_KEY")

def fetch_supabase_products():
    """Fetch live products from Supabase and map to Forecasting schema."""
    if not SUPABASE_URL or not SUPABASE_KEY:
        print("[WARNING] Supabase credentials missing. Falling back to local defaults.")
        return None, None

    # THE ONLY 6 PRODUCTS FOR THE DEMO
    TARGET_NAMES = [
        "Premium Cola", "Potato Chips", "Instant Noodles", 
        "Energy Drink", "Laundry Detergent", "Cleaning Liquid"
    ]
    WHITELIST_IDS = ['1', '2', '3', '4', '5', '6']

    try:
        url = f"{SUPABASE_URL}/rest/v1/products?select=*"
        headers = {
            "apikey": SUPABASE_KEY,
            "Authorization": f"Bearer {SUPABASE_KEY}"
        }
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        all_supabase_products = response.json()

        # Filter to ONLY the requested 6 items (match by ID or Title)
        supabase_products = []
        for p in all_supabase_products:
            is_match = p['mock_id'] in WHITELIST_IDS or any(tn.lower() in p['name'].lower() for tn in TARGET_NAMES)
            if is_match and len(supabase_products) < 6:
                supabase_products.append(p)

        if not supabase_products:
            print("[ERROR] Could not find any of the target products in Supabase!")
            return None, None

        # 1. Extract and map categories
        unique_cats = sorted(list(set(p['category'] for p in supabase_products)))
        categories = [(i+1, cat) for i, cat in enumerate(unique_cats)]
        cat_map = {cat: i+1 for i, cat in categories}

        # 2. Map products
        products = []
        for p in supabase_products:
            m_id = int(p['mock_id'])
            sku = f"SKU-{m_id:03d}"
            name = p['name']
            c_id = cat_map[p['category']]
            price = float(p['cash_price'])
            stock = int(p['stock'])
            reorder = int(stock * 0.4) 
            base_demand = random.randint(30, 60) # High-velocity items
            
            products.append((m_id, sku, name, c_id, price, stock, reorder, base_demand))
        
        return categories, sorted(products, key=lambda x: x[0])

    except Exception as e:
        print(f"[ERROR] Failed to fetch Supabase products: {e}")
        return None, None

# ── Fallback Data (In case Supabase is unreachable) ──────────────────────────
DEFAULT_CATEGORIES = [
    (1, "Rice & Grains"), (2, "Cooking Essentials"), (3, "Instant Noodles & Pasta"),
    (4, "Canned Goods"), (5, "Beverages"), (6, "Snacks & Confectionery"),
    (7, "Cleaning & Household"), (8, "Personal Care"),
]

DEFAULT_PRODUCTS = [
    (1,  "RG-001", "Rice 25kg Premium",          1, 28.50, 210,  150, 45),
    (2,  "RG-002", "Rice 10kg Value",            1, 12.90, 340,  200, 60),
    (11, "BV-001", "Mineral Water 1.5L (x12)",   5,  6.90, 520,  300, 80),
]

# ── Outlets (Stores) ─────────────────────────────────────────────────────────
OUTLETS = [
    (1, "Valu$ Jurong East", 1.5),      # High volume
    (2, "Valu$ Tampines Hub", 1.3),     # High volume
    (3, "Valu$ Woodlands", 1.0),        # Medium volume
    (4, "Valu$ Bedok Central", 0.8),    # Lower volume
]

def _is_sg_holiday(d: datetime) -> bool:
    md = (d.month, d.day)
    if d.month == 1 and d.day >= 20: return True
    if d.month == 2 and d.day <= 14: return True
    if d.month == 4 and 10 <= d.day <= 25: return True
    if d.month == 12 and d.day >= 15: return True
    if md in [(8, 8), (8, 9), (8, 10)]: return True
    return False

def _is_school_holiday(d: datetime) -> bool:
    if d.month == 3 and 14 <= d.day <= 22: return True
    if d.month == 6: return True
    if d.month == 9 and 1 <= d.day <= 10: return True
    if d.month >= 11: return True
    return False

def _generate_daily_demand(product_row, outlet_row, date: datetime, day_index: int) -> int:
    _, _, _, category_id, _, _, _, base = product_row
    _, _, multiplier = outlet_row

    dow = date.weekday()
    weekly_factor = {0: 1.15, 1: 1.0, 2: 0.95, 3: 1.0, 4: 1.20, 5: 0.90, 6: 0.70}[dow]

    dom = date.day
    if dom >= 25: monthly_factor = 1.25
    elif dom <= 5: monthly_factor = 1.10
    else: monthly_factor = 1.0

    holiday_factor = 1.40 if _is_sg_holiday(date) else 1.0
    school_factor = 1.12 if _is_school_holiday(date) else 1.0
    
    trend = 1.0 + 0.005 * (day_index / 30)
    noise = random.uniform(0.80, 1.20)

    demand = base * multiplier * weekly_factor * monthly_factor * holiday_factor * school_factor * trend * noise
    return max(1, int(round(demand)))

def create_database():
    """Build the MySQL database from scratch."""
    print("--- Valu$ AI Forecasting DB Sync ---")
    
    # Fetch live products
    categories, products = fetch_supabase_products()
    if not products:
        categories, products = DEFAULT_CATEGORIES, DEFAULT_PRODUCTS

    # First connect without specifying DB to create it
    conn = pymysql.connect(host=DB_HOST, user=DB_USER, password=DB_PASS, port=DB_PORT)
    cur = conn.cursor()
    cur.execute(f"DROP DATABASE IF EXISTS {DB_NAME};")
    cur.execute(f"CREATE DATABASE {DB_NAME} DEFAULT CHARACTER SET utf8mb4;")
    conn.commit()
    conn.close()

    # Now connect to the newly created DB
    conn = pymysql.connect(host=DB_HOST, user=DB_USER, password=DB_PASS, port=DB_PORT, database=DB_NAME)
    cur = conn.cursor()

    # ── Schema ────────────────────────────────────────────────────────────
    cur.execute("CREATE TABLE categories (id INT PRIMARY KEY, name VARCHAR(255) NOT NULL)")
    cur.execute("CREATE TABLE outlets (id INT PRIMARY KEY, name VARCHAR(255) NOT NULL, demand_multiplier FLOAT NOT NULL)")
    cur.execute("""
        CREATE TABLE products (
            id INT PRIMARY KEY,
            sku VARCHAR(50) NOT NULL UNIQUE,
            name VARCHAR(255) NOT NULL,
            category_id INT NOT NULL,
            unit_price FLOAT NOT NULL,
            current_stock INT NOT NULL,
            reorder_level INT NOT NULL,
            FOREIGN KEY (category_id) REFERENCES categories(id)
        )
    """)
    cur.execute("""
        CREATE TABLE historical_orders (
            id INT PRIMARY KEY AUTO_INCREMENT,
            product_id INT NOT NULL,
            outlet_id INT NOT NULL,
            order_date DATE NOT NULL,
            quantity INT NOT NULL,
            buyer_type VARCHAR(50) NOT NULL DEFAULT 'standard',
            FOREIGN KEY (product_id) REFERENCES products(id),
            FOREIGN KEY (outlet_id) REFERENCES outlets(id)
        )
    """)
    cur.execute("""
        CREATE TABLE forecasts (
            id INT PRIMARY KEY AUTO_INCREMENT,
            product_id INT NOT NULL,
            outlet_id INT NOT NULL,
            forecast_date DATE NOT NULL,
            predicted_demand FLOAT NOT NULL,
            confidence_lower FLOAT,
            confidence_upper FLOAT,
            generated_at DATETIME NOT NULL,
            FOREIGN KEY (product_id) REFERENCES products(id),
            FOREIGN KEY (outlet_id) REFERENCES outlets(id)
        )
    """)
    
    cur.execute("CREATE INDEX idx_orders ON historical_orders(outlet_id, product_id, order_date)")
    cur.execute("CREATE INDEX idx_forecasts ON forecasts(outlet_id, product_id, forecast_date)")

    # ── Seed Base Data ────────────────────────────────────────────────────
    cur.executemany("INSERT INTO categories VALUES (%s, %s)", categories)
    cur.executemany("INSERT INTO outlets VALUES (%s, %s, %s)", OUTLETS)
    
    product_inserts = [(p[0], p[1], p[2], p[3], p[4], p[5], p[6]) for p in products]
    cur.executemany(
        "INSERT INTO products (id, sku, name, category_id, unit_price, current_stock, reorder_level) VALUES (%s, %s, %s, %s, %s, %s, %s)",
        product_inserts
    )

    # ── Generate 1 Year of Daily Orders per Outlet ───────────────────────
    print(f"Generating history for {len(products)} products across {len(OUTLETS)} outlets...")
    random.seed(42)
    start_date = datetime(2025, 1, 1)
    num_days = 365
    buyer_types = ["standard", "standard", "standard", "prime", "prime"]

    order_rows = []
    for day_idx in range(num_days):
        current_date = start_date + timedelta(days=day_idx)
        date_str = current_date.strftime("%Y-%m-%d")

        for outlet in OUTLETS:
            for product in products:
                qty = _generate_daily_demand(product, outlet, current_date, day_idx)
                buyer = random.choice(buyer_types)
                order_rows.append((product[0], outlet[0], date_str, qty, buyer))

    batch_size = 5000
    for i in range(0, len(order_rows), batch_size):
        batch = order_rows[i:i+batch_size]
        cur.executemany(
            "INSERT INTO historical_orders (product_id, outlet_id, order_date, quantity, buyer_type) VALUES (%s, %s, %s, %s, %s)",
            batch
        )

    conn.commit()

    cur.execute("SELECT COUNT(*) FROM historical_orders")
    total_orders = cur.fetchone()[0]
    
    print(f"[OK] Database '{DB_NAME}' synced with Supabase products.")
    print(f"     Products Synced: {len(products)}")
    print(f"     Historical Orders Generated: {total_orders:,}")
    conn.close()

if __name__ == "__main__":
    create_database()
