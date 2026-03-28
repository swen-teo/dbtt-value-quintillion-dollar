"""
seed_supabase.py - Populate Supabase forecasting tables with sample data.

This mirrors the old MySQL seeding flow, but writes into Supabase tables
so the separate Python training worker can use the same historical data.
"""

from __future__ import annotations

import random
from datetime import datetime, timedelta

from supabase_store import delete_rows, insert_rows


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

OUTLETS = [
    (1, "Valu$ Jurong East", 1.5),
    (2, "Valu$ Tampines Hub", 1.3),
    (3, "Valu$ Woodlands", 1.0),
    (4, "Valu$ Bedok Central", 0.8),
]

PRODUCTS = [
    (1, "RG-001", "Rice 25kg Premium", 1, 28.50, 210, 150, 45),
    (2, "RG-002", "Rice 10kg Value", 1, 12.90, 340, 200, 60),
    (3, "RG-003", "Basmati Rice 5kg", 1, 9.80, 180, 100, 25),
    (4, "CE-001", "Cooking Oil 5L", 2, 11.50, 145, 120, 55),
    (5, "CE-002", "Soy Sauce 1L", 2, 3.20, 420, 200, 30),
    (6, "CE-003", "Sugar 1kg Bundle", 2, 2.80, 380, 250, 40),
    (7, "IN-001", "Instant Noodles Carton (30)", 3, 8.90, 450, 300, 70),
    (8, "IN-002", "Bee Hoon 500g (x20)", 3, 6.50, 260, 150, 35),
    (9, "CG-001", "Canned Sardines (x24)", 4, 18.90, 190, 100, 28),
    (10, "CG-002", "Canned Luncheon Meat (x12)", 4, 22.50, 160, 80, 22),
    (11, "BV-001", "Mineral Water 1.5L (x12)", 5, 6.90, 520, 300, 80),
    (12, "BV-002", "Packet Drinks Assorted (x24)", 5, 9.50, 380, 200, 55),
    (13, "BV-003", "Instant Coffee 3-in-1 (x30)", 5, 12.80, 290, 150, 42),
    (14, "SN-001", "Potato Chips Carton (x24)", 6, 15.90, 310, 200, 48),
    (15, "SN-002", "Biscuit Assortment (x36)", 6, 13.50, 270, 180, 38),
    (16, "SN-003", "Chocolate Bars (x48)", 6, 24.00, 200, 120, 30),
    (17, "CL-001", "Floor Cleaner 5L (x6)", 7, 9.80, 180, 100, 20),
    (18, "CL-002", "Dishwashing Liquid 1L (x12)", 7, 7.50, 320, 200, 32),
    (19, "PC-001", "Tissue Box (x24)", 8, 8.90, 400, 250, 50),
    (20, "PC-002", "Hand Soap 500ml (x12)", 8, 6.20, 280, 150, 28),
]


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
    _, _, _, category_id, _, _, _, base = product_row
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


def seed_supabase():
    print("Seeding Supabase forecasting tables...")

    # Clear previous forecast history and jobs so the seed is repeatable.
    delete_rows("historical_orders")
    delete_rows("forecasts")
    delete_rows("forecast_jobs")

    random.seed(42)
    start_date = datetime(2025, 1, 1)
    num_days = 365
    buyer_types = ["standard", "standard", "standard", "prime", "prime"]

    order_rows = []
    for day_idx in range(num_days):
        current_date = start_date + timedelta(days=day_idx)
        date_str = current_date.strftime("%Y-%m-%d")

        for outlet in OUTLETS:
            for product in PRODUCTS:
                qty = _generate_daily_demand(product, outlet, current_date, day_idx)
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

    print("[OK] Supabase forecasting tables seeded successfully.")


if __name__ == "__main__":
    seed_supabase()
