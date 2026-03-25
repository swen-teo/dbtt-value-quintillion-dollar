"""
forecast.py — ML Demand Forecasting for Valu$ Wholesale.

Uses scikit-learn GradientBoostingRegressor with engineered time-series
features (lags, rolling means, calendar features, holiday flags) to
predict 30-day demand per product per outlet.
"""

import pymysql
import os
import numpy as np
import pandas as pd
from datetime import datetime, timedelta
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, r2_score

# DB Connection Config
DB_HOST = "127.0.0.1"
DB_USER = "root"
DB_PASS = ""
DB_PORT = 3306
DB_NAME = "valu_forecast"


def get_db():
    return pymysql.connect(host=DB_HOST, user=DB_USER, password=DB_PASS, port=DB_PORT, database=DB_NAME)


# ── Holiday / Calendar helpers ───────────────────────────────────────────────

def _add_sg_holiday_flag(df: pd.DataFrame) -> pd.DataFrame:
    """Add binary holiday columns."""
    dates = pd.to_datetime(df["order_date"])
    df = df.copy()

    # CNY window
    df["is_cny"] = ((dates.dt.month == 1) & (dates.dt.day >= 20)) | \
                   ((dates.dt.month == 2) & (dates.dt.day <= 14))

    # Hari Raya (approx)
    df["is_hari_raya"] = (dates.dt.month == 4) & (dates.dt.day >= 10) & (dates.dt.day <= 25)

    # Christmas / year-end
    df["is_yearend"] = (dates.dt.month == 12) & (dates.dt.day >= 15)

    # National Day
    df["is_national_day"] = (dates.dt.month == 8) & (dates.dt.day.isin([8, 9, 10]))

    # School holidays
    df["is_school_hol"] = (
        ((dates.dt.month == 3) & (dates.dt.day >= 14) & (dates.dt.day <= 22)) |
        (dates.dt.month == 6) |
        ((dates.dt.month == 9) & (dates.dt.day <= 10)) |
        (dates.dt.month >= 11)
    )

    for col in ["is_cny", "is_hari_raya", "is_yearend", "is_national_day", "is_school_hol"]:
        df[col] = df[col].astype(int)

    return df


def _engineer_features(df: pd.DataFrame) -> pd.DataFrame:
    """Build all features from daily aggregated demand."""
    df = df.copy()
    dates = pd.to_datetime(df["order_date"])

    # Calendar features
    df["day_of_week"]  = dates.dt.dayofweek
    df["day_of_month"] = dates.dt.day
    df["month"]        = dates.dt.month
    df["week_of_year"] = dates.dt.isocalendar().week.astype(int)
    df["quarter"]      = dates.dt.quarter

    # Is month-end restock window
    df["is_month_end"] = (dates.dt.day >= 25).astype(int)
    df["is_month_start"] = (dates.dt.day <= 5).astype(int)

    # Lag features
    for lag in [1, 3, 7, 14, 21, 30]:
        df[f"lag_{lag}d"] = df["quantity"].shift(lag)

    # Rolling mean features
    for window in [7, 14, 30]:
        df[f"rolling_mean_{window}d"] = df["quantity"].rolling(window=window).mean()
        df[f"rolling_std_{window}d"]  = df["quantity"].rolling(window=window).std()

    # Holiday flags
    df = _add_sg_holiday_flag(df)

    return df


# ── Feature columns used for training ────────────────────────────────────────

FEATURE_COLS = [
    "day_of_week", "day_of_month", "month", "week_of_year", "quarter",
    "is_month_end", "is_month_start",
    "lag_1d", "lag_3d", "lag_7d", "lag_14d", "lag_21d", "lag_30d",
    "rolling_mean_7d", "rolling_mean_14d", "rolling_mean_30d",
    "rolling_std_7d", "rolling_std_14d", "rolling_std_30d",
    "is_cny", "is_hari_raya", "is_yearend", "is_national_day", "is_school_hol",
]


def train_and_forecast(product_id: int, outlet_id: int, forecast_days: int = 30):
    """
    Train a GradientBoostingRegressor for a single product+outlet and generate
    a `forecast_days`-day forecast.
    """
    conn = get_db()

    # Load daily aggregated demand
    query = """
        SELECT order_date, SUM(quantity) as quantity
        FROM historical_orders
        WHERE product_id = %s AND outlet_id = %s
        GROUP BY order_date
        ORDER BY order_date
    """
    df = pd.read_sql_query(query, conn, params=(product_id, outlet_id))

    if len(df) < 60:
        conn.close()
        return [], 0.0

    # Feature engineering
    df = _engineer_features(df)
    df = df.dropna()  # drop rows where lag/rolling features are NaN

    X = df[FEATURE_COLS].values
    y = df["quantity"].values

    # Train / test split (last 60 days = test)
    split_idx = len(df) - 60
    X_train, X_test = X[:split_idx], X[split_idx:]
    y_train, y_test = y[:split_idx], y[split_idx:]

    # Model optimized for demo speed
    model = GradientBoostingRegressor(
        n_estimators=30,
        max_depth=3,
        learning_rate=0.1,
        subsample=0.8,
        random_state=42,
    )
    model.fit(X_train, y_train)

    # Evaluate
    y_pred_test = model.predict(X_test)
    r2 = r2_score(y_test, y_pred_test)
    mae = mean_absolute_error(y_test, y_pred_test)

    # ── Generate future forecasts ─────────────────────────────────────────
    last_date = pd.to_datetime(df["order_date"].iloc[-1])
    recent_quantities = list(df["quantity"].values[-30:])  # last 30 days for lags

    results = []
    for i in range(1, forecast_days + 1):
        future_date = last_date + timedelta(days=i)
        future_date_str = future_date.strftime("%Y-%m-%d")

        # Build a single-row feature vector
        row = {
            "order_date": future_date_str,
            "quantity": 0,  # placeholder
        }
        row_df = pd.DataFrame([row])
        row_df["day_of_week"]  = future_date.weekday()
        row_df["day_of_month"] = future_date.day
        row_df["month"]        = future_date.month
        row_df["week_of_year"] = future_date.isocalendar()[1]
        row_df["quarter"]      = (future_date.month - 1) // 3 + 1
        row_df["is_month_end"]   = int(future_date.day >= 25)
        row_df["is_month_start"] = int(future_date.day <= 5)

        # Lag features
        n = len(recent_quantities)
        row_df["lag_1d"]  = recent_quantities[-1]  if n >= 1  else 0
        row_df["lag_3d"]  = recent_quantities[-3]  if n >= 3  else 0
        row_df["lag_7d"]  = recent_quantities[-7]  if n >= 7  else 0
        row_df["lag_14d"] = recent_quantities[-14] if n >= 14 else 0
        row_df["lag_21d"] = recent_quantities[-21] if n >= 21 else 0
        row_df["lag_30d"] = recent_quantities[-30] if n >= 30 else 0

        # Rolling features
        last_7  = recent_quantities[-7:]  if n >= 7  else recent_quantities
        last_14 = recent_quantities[-14:] if n >= 14 else recent_quantities
        last_30 = recent_quantities[-30:] if n >= 30 else recent_quantities
        row_df["rolling_mean_7d"]  = np.mean(last_7)
        row_df["rolling_mean_14d"] = np.mean(last_14)
        row_df["rolling_mean_30d"] = np.mean(last_30)
        row_df["rolling_std_7d"]   = np.std(last_7)  if len(last_7)  > 1 else 0
        row_df["rolling_std_14d"]  = np.std(last_14) if len(last_14) > 1 else 0
        row_df["rolling_std_30d"]  = np.std(last_30) if len(last_30) > 1 else 0

        # Holiday flags
        row_df = _add_sg_holiday_flag(row_df)

        # Predict
        X_future = row_df[FEATURE_COLS].values
        predicted = float(model.predict(X_future)[0])
        predicted = max(0, predicted)

        # Confidence interval (~MAE-based)
        lower = max(0, predicted - 1.5 * mae)
        upper = predicted + 1.5 * mae

        results.append({
            "date": future_date_str,
            "predicted": round(predicted, 1),
            "lower": round(lower, 1),
            "upper": round(upper, 1),
        })

        # Push prediction into recent buffer
        recent_quantities.append(predicted)

    # ── Persist forecasts to DB ───────────────────────────────────────────
    now_str = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    cur = conn.cursor()
    cur.execute("DELETE FROM forecasts WHERE product_id = %s AND outlet_id = %s", (product_id, outlet_id))
    
    insert_data = [(product_id, outlet_id, r["date"], r["predicted"], r["lower"], r["upper"], now_str) for r in results]
    cur.executemany(
        "INSERT INTO forecasts (product_id, outlet_id, forecast_date, predicted_demand, confidence_lower, confidence_upper, generated_at) "
        "VALUES (%s, %s, %s, %s, %s, %s, %s)",
        insert_data
    )
    conn.commit()
    conn.close()

    return results, r2


def run_all_forecasts(forecast_days: int = 30):
    """Train models and generate forecasts for every product at every outlet."""
    conn = get_db()
    cur = conn.cursor()
    cur.execute("SELECT id, name FROM products ORDER BY id")
    products = cur.fetchall()
    
    cur.execute("SELECT id, name FROM outlets ORDER BY id")
    outlets = cur.fetchall()
    conn.close()

    summary = []
    total_models = len(products) * len(outlets)
    trained_count = 0

    for oid, oname in outlets:
        for pid, pname in products:
            forecasts, r2 = train_and_forecast(pid, oid, forecast_days)
            trained_count += 1
            total_predicted = sum(f["predicted"] for f in forecasts)
            summary.append({
                "product_id": pid,
                "outlet_id": oid,
                "product_name": pname,
                "outlet_name": oname,
                "r2_score": round(r2, 4),
                "total_30d_demand": round(total_predicted, 0),
            })
            print(f"  [{trained_count}/{total_models}] {oname[:15]} - {pname:<25s} R2={r2:.4f}  30d-demand={total_predicted:,.0f}")

    return summary


if __name__ == "__main__":
    import warnings
    warnings.filterwarnings('ignore')  # suppress pandas MySQL warning
    print("Running Valu$ Demand Forecast for 4 Outlets...\n")
    results = run_all_forecasts()
    print(f"\nCompleted {len(results)} ML models successfully.")
