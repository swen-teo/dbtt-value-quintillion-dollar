"""
seed_supabase.py - Populate Supabase forecasting tables with sample data.

Syncs the 6 LIVE storefront products from Supabase `products` into 
the `forecast_products` and `forecast_categories` tables, then 
generates 1 year of historical orders.
"""

from __future__ import annotations

import random
from datetime import datetime, timedelta

from supabase_store import delete_rows, insert_rows, select_rows

OUTLETS = [
    (1, "Valu$ Jurong East", 1.5),
    (2, "Valu$ Tampines Hub", 1.3),
    (3, "Valu$ Woodlands", 1.0),
    (4, "Valu$ Bedok Central", 0.8),
]

TARGET_NAMES = [
    "Premium Cola", "Potato Chips", "Instant Noodles", 
    "Energy Drink", "Laundry Detergent", "Cleaning Liquid"
]
WHITELIST_IDS = ['1', '2', '3', '4', '5', '6']

def _is_sg_holiday(d: datetime) -> bool:
    md = (d.month, d.day)
    if d.month == 1 and d.day >= 20:
        return True
    if d.month == 2 and d.day <= 14:
        return True
    if d.month == 4 and 10 <= d.day <= 25:
        return True
    if d.month == 12 and d.day >= 15:
        return True
    if md in [(8, 8), (8, 9), (8, 10)]:
        return True
    return False

def _is_school_holiday(d: datetime) -> bool:
    if d.month == 3 and 14 <= d.day <= 22:
        return True
    if d.month == 6:
        return True
    if d.month == 9 and 1 <= d.day <= 10:
        return True
    if d.month >= 11:
        return True
    return False

def _generate_daily_demand(product_row, outlet_row, date: datetime, day_index: int) -> int:
    _, _, _, category_id, _, _, reorder_level, base = product_row
    _, _, multiplier = outlet_row

    dow = date.weekday()
    weekly_factor = {0: 1.15, 1: 1.0, 2: 0.95, 3: 1.0, 4: 1.20, 5: 0.90, 6: 0.70}[dow]

    dom = date.day
    if dom >= 25:
        monthly_factor = 1.25
    elif dom <= 5:
        monthly_factor = 1.10
    else:
        monthly_factor = 1.0

    holiday_factor = 1.40 if _is_sg_holiday(date) else 1.0

    school_factor = 1.0
    if _is_school_holiday(date):
        school_factor = 1.35 if category_id in (5, 6) else 1.12

    trend = 1.0 + 0.005 * (day_index / 30)
    noise = random.uniform(0.80, 1.20)

    demand = base * multiplier * weekly_factor * monthly_factor * holiday_factor * school_factor * trend * noise
    return max(1, int(round(demand)))

def fetch_live_products():
    """Fetch live storefront products and map them."""
    all_supabase_products = select_rows("products")
    
    supabase_products = []
    for p in all_supabase_products:
        is_match = p.get('mock_id') in WHITELIST_IDS or any(tn.lower() in p.get('name', '').lower() for tn in TARGET_NAMES)
        if is_match and len(supabase_products) < 6:
            supabase_products.append(p)

    if not supabase_products:
        print("[ERROR] Could not find any of the target products in Supabase `products` table!")
        return [], []

    # Map categories
    unique_cats = sorted(list(set(p['category'] for p in supabase_products)))
    categories = [{"id": i+1, "name": cat} for i, cat in enumerate(unique_cats)]
    cat_map = {cat['name']: cat['id'] for cat in categories}

    # Map products
    # Result tuple: (id, name, category_id, current_stock, reorder_level, base_daily_demand)
    products = []
    for p in supabase_products:
        m_id = int(p['mock_id'])
        c_id = cat_map[p['category']]
        stock = int(p['stock'])
        reorder = int(stock * 0.4)
        base_demand = random.randint(30, 60)
        
        products.append((m_id, f"SKU-{m_id:03d}", p['name'], c_id, stock, reorder, base_demand))

    return categories, sorted(products, key=lambda x: x[0])


def seed_supabase():
    print("Seeding Supabase forecasting tables from LIVE products...")

    cats, prods = fetch_live_products()
    if not prods:
        return

    # Clear previous data
    print("Clearing old data...")
    delete_rows("historical_orders")
    delete_rows("forecasts")
    delete_rows("forecast_jobs")
    delete_rows("forecast_products")
    delete_rows("forecast_categories")

    # Insert new category and product info
    print("Inserting filtered categories and products...")
    insert_rows("forecast_categories", cats)
    
    prod_inserts = []
    for p in prods:
        prod_inserts.append({
            "id": p[0],
            "name": p[2],
            "category_id": p[3],
            "current_stock": p[4],
            "reorder_level": p[5]
        })
    insert_rows("forecast_products", prod_inserts)

    # Generate History
    random.seed(42)
    start_date = datetime(2025, 1, 1)
    num_days = 365
    buyer_types = ["standard", "standard", "standard", "prime", "prime"]

    order_rows = []
    for day_idx in range(num_days):
        current_date = start_date + timedelta(days=day_idx)
        date_str = current_date.strftime("%Y-%m-%d")

        for outlet in OUTLETS:
            for product in prods:
                # product is a tuple: (id, sku, name, category_id, stock, reorder, base)
                # _generate_daily_demand expects it to be unpacked. Wait, let's pad it to match old length:
                # pad: (id, sku, name, cat_id, price, stock, reorder, base)
                padded_product = (product[0], product[1], product[2], product[3], 0.0, product[4], product[5], product[6])
                
                qty = _generate_daily_demand(padded_product, outlet, current_date, day_idx)
                buyer = random.choice(buyer_types)
                order_rows.append(
                    {
                        "product_id": product[0],
                        "outlet_id": outlet[0],
                        "order_date": date_str,
                        "quantity": qty,
                        "buyer_type": buyer,
                    }
                )

    batch_size = 5000
    for i in range(0, len(order_rows), batch_size):
        batch = order_rows[i : i + batch_size]
        insert_rows("historical_orders", batch)
        print(f"  Inserted {min(i + batch_size, len(order_rows)):,}/{len(order_rows):,} order rows")

    print(f"[OK] Supabase forecasting tables seeded successfully with {len(prods)} products.")


if __name__ == "__main__":
    seed_supabase()
