"""
init_db.py — Initialise the Valu$ Wholesale sample MySQL database.

Creates `valu_forecast` database and populates it with ~1 year of daily
order data across 4 distinct store locations.
"""

import pymysql
import random
import math
from datetime import datetime, timedelta

# DB Connection Config
DB_HOST = "127.0.0.1"
DB_USER = "root"
DB_PASS = ""
DB_PORT = 3306
DB_NAME = "valu_forecast"

# ── Categories ───────────────────────────────────────────────────────────────
CATEGORIES = [
    (1, "Rice & Grains"),
    (2, "Cooking Essentials"),
    (3, "Instant Noodles & Pasta"),
    (4, "Canned Goods"),
    (5, "Beverages"),
    (6, "Snacks & Confectionery"),
    (7, "Cleaning & Household"),
    (8, "Personal Care"),
]

# ── Outlets (Stores) ─────────────────────────────────────────────────────────
OUTLETS = [
    (1, "Valu$ Jurong East", 1.5),      # High volume
    (2, "Valu$ Tampines Hub", 1.3),     # High volume
    (3, "Valu$ Woodlands", 1.0),        # Medium volume
    (4, "Valu$ Bedok Central", 0.8),    # Lower volume
]

# ── Products ─────────────────────────────────────────────────────────────────
# (id, sku, name, category_id, unit_price, current_stock, reorder_level, base_daily_demand)
PRODUCTS = [
    (1,  "RG-001", "Rice 25kg Premium",          1, 28.50, 210,  150, 45),
    (2,  "RG-002", "Rice 10kg Value",            1, 12.90, 340,  200, 60),
    (3,  "RG-003", "Basmati Rice 5kg",           1,  9.80, 180,  100, 25),
    (4,  "CE-001", "Cooking Oil 5L",             2, 11.50, 145,  120, 55),
    (5,  "CE-002", "Soy Sauce 1L",               2,  3.20, 420,  200, 30),
    (6,  "CE-003", "Sugar 1kg Bundle",           2,  2.80, 380,  250, 40),
    (7,  "IN-001", "Instant Noodles Carton (30)",3,  8.90, 450,  300, 70),
    (8,  "IN-002", "Bee Hoon 500g (x20)",        3,  6.50, 260,  150, 35),
    (9,  "CG-001", "Canned Sardines (x24)",      4, 18.90, 190,  100, 28),
    (10, "CG-002", "Canned Luncheon Meat (x12)", 4, 22.50, 160,   80, 22),
    (11, "BV-001", "Mineral Water 1.5L (x12)",   5,  6.90, 520,  300, 80),
    (12, "BV-002", "Packet Drinks Assorted (x24)",5, 9.50, 380,  200, 55),
    (13, "BV-003", "Instant Coffee 3-in-1 (x30)",5, 12.80, 290,  150, 42),
    (14, "SN-001", "Potato Chips Carton (x24)",  6, 15.90, 310,  200, 48),
    (15, "SN-002", "Biscuit Assortment (x36)",   6, 13.50, 270,  180, 38),
    (16, "SN-003", "Chocolate Bars (x48)",       6, 24.00, 200,  120, 30),
    (17, "CL-001", "Floor Cleaner 5L (x6)",      7,  9.80, 180,  100, 20),
    (18, "CL-002", "Dishwashing Liquid 1L (x12)",7,  7.50, 320,  200, 32),
    (19, "PC-001", "Tissue Box (x24)",           8,  8.90, 400,  250, 50),
    (20, "PC-002", "Hand Soap 500ml (x12)",      8,  6.20, 280,  150, 28),
]


def _is_sg_holiday(d: datetime) -> bool:
    """Check if a date falls on or near a major SG holiday / event."""
    md = (d.month, d.day)
    if d.month == 1 and d.day >= 20: return True
    if d.month == 2 and d.day <= 14: return True
    if d.month == 4 and 10 <= d.day <= 25: return True
    if d.month == 12 and d.day >= 15: return True
    if md in [(8, 8), (8, 9), (8, 10)]: return True
    return False

def _is_school_holiday(d: datetime) -> bool:
    """Approximate Singapore school holiday windows."""
    if d.month == 3 and 14 <= d.day <= 22: return True
    if d.month == 6: return True
    if d.month == 9 and 1 <= d.day <= 10: return True
    if d.month >= 11: return True
    return False

def _generate_daily_demand(product_row, outlet_row, date: datetime, day_index: int) -> int:
    """Generate daily demand incorporating base demand, outlet multiplier, seasonality, etc."""
    _, _, _, category_id, _, _, _, base = product_row
    _, _, multiplier = outlet_row

    dow = date.weekday()
    weekly_factor = {0: 1.15, 1: 1.0, 2: 0.95, 3: 1.0, 4: 1.20, 5: 0.90, 6: 0.70}[dow]

    dom = date.day
    if dom >= 25: monthly_factor = 1.25
    elif dom <= 5: monthly_factor = 1.10
    else: monthly_factor = 1.0

    holiday_factor = 1.40 if _is_sg_holiday(date) else 1.0

    school_factor = 1.0
    if _is_school_holiday(date):
        if category_id in (5, 6): school_factor = 1.35
        else: school_factor = 1.12

    trend = 1.0 + 0.005 * (day_index / 30)
    noise = random.uniform(0.80, 1.20)

    # Calculate final demand
    demand = base * multiplier * weekly_factor * monthly_factor * holiday_factor * school_factor * trend * noise
    return max(1, int(round(demand)))


def create_database():
    """Build the MySQL database from scratch."""
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
    cur.execute("""
        CREATE TABLE categories (
            id INT PRIMARY KEY,
            name VARCHAR(255) NOT NULL
        )
    """)
    cur.execute("""
        CREATE TABLE outlets (
            id INT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            demand_multiplier FLOAT NOT NULL
        )
    """)
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
    
    # Indexes for faster queries
    cur.execute("CREATE INDEX idx_orders ON historical_orders(outlet_id, product_id, order_date)")
    cur.execute("CREATE INDEX idx_forecasts ON forecasts(outlet_id, product_id, forecast_date)")

    # ── Seed Base Data ────────────────────────────────────────────────────
    cur.executemany("INSERT INTO categories VALUES (%s, %s)", CATEGORIES)
    cur.executemany("INSERT INTO outlets VALUES (%s, %s, %s)", OUTLETS)
    
    product_inserts = [(p[0], p[1], p[2], p[3], p[4], p[5], p[6]) for p in PRODUCTS]
    cur.executemany(
        "INSERT INTO products (id, sku, name, category_id, unit_price, current_stock, reorder_level) VALUES (%s, %s, %s, %s, %s, %s, %s)",
        product_inserts
    )

    # ── Generate 1 Year of Daily Orders per Outlet ───────────────────────
    random.seed(42)
    start_date = datetime(2025, 1, 1)
    num_days = 365  # 1 year
    buyer_types = ["standard", "standard", "standard", "prime", "prime"]

    order_rows = []
    for day_idx in range(num_days):
        current_date = start_date + timedelta(days=day_idx)
        date_str = current_date.strftime("%Y-%m-%d")

        for outlet in OUTLETS:
            for product in PRODUCTS:
                qty = _generate_daily_demand(product, outlet, current_date, day_idx)
                buyer = random.choice(buyer_types)
                order_rows.append((product[0], outlet[0], date_str, qty, buyer))

    # Insert in batches to avoid max_allowed_packet issues
    batch_size = 5000
    for i in range(0, len(order_rows), batch_size):
        batch = order_rows[i:i+batch_size]
        cur.executemany(
            "INSERT INTO historical_orders (product_id, outlet_id, order_date, quantity, buyer_type) VALUES (%s, %s, %s, %s, %s)",
            batch
        )

    conn.commit()

    # ── Summary ───────────────────────────────────────────────────────────
    cur.execute("SELECT COUNT(*) FROM historical_orders")
    total_orders = cur.fetchone()[0]
    
    print(f"[OK] Database '{DB_NAME}' created in MySQL (port {DB_PORT})")
    print(f"     Outlets:   {len(OUTLETS)}")
    print(f"     Products:  {len(PRODUCTS)}")
    print(f"     Orders:    {total_orders:,}")
    print(f"     Date range: {start_date.strftime('%Y-%m-%d')} to {(start_date + timedelta(days=num_days - 1)).strftime('%Y-%m-%d')}")

    conn.close()


if __name__ == "__main__":
    create_database()
