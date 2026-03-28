"""
forecast.py - ML demand forecasting worker backed by Supabase.

The worker reads queued jobs from Supabase, trains the existing
GradientBoosting models on historical_orders, and writes results back
into the forecasts table.
"""

from __future__ import annotations

import time
from datetime import datetime, timedelta

import numpy as np
import pandas as pd
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.metrics import mean_absolute_error, r2_score

from supabase_store import delete_rows, insert_rows, select_rows, update_rows


def _add_sg_holiday_flag(df: pd.DataFrame) -> pd.DataFrame:
    dates = pd.to_datetime(df["order_date"])
    df = df.copy()

    df["is_cny"] = ((dates.dt.month == 1) & (dates.dt.day >= 20)) | (
        (dates.dt.month == 2) & (dates.dt.day <= 14)
    )
    df["is_hari_raya"] = (dates.dt.month == 4) & (dates.dt.day >= 10) & (
        dates.dt.day <= 25
    )
    df["is_yearend"] = (dates.dt.month == 12) & (dates.dt.day >= 15)
    df["is_national_day"] = (dates.dt.month == 8) & (dates.dt.day.isin([8, 9, 10]))
    df["is_school_hol"] = (
        ((dates.dt.month == 3) & (dates.dt.day >= 14) & (dates.dt.day <= 22))
        | (dates.dt.month == 6)
        | ((dates.dt.month == 9) & (dates.dt.day <= 10))
        | (dates.dt.month >= 11)
    )

    for col in ["is_cny", "is_hari_raya", "is_yearend", "is_national_day", "is_school_hol"]:
        df[col] = df[col].astype(int)

    return df


def _engineer_features(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()
    dates = pd.to_datetime(df["order_date"])

    df["day_of_week"] = dates.dt.dayofweek
    df["day_of_month"] = dates.dt.day
    df["month"] = dates.dt.month
    df["week_of_year"] = dates.dt.isocalendar().week.astype(int)
    df["quarter"] = dates.dt.quarter
    df["is_month_end"] = (dates.dt.day >= 25).astype(int)
    df["is_month_start"] = (dates.dt.day <= 5).astype(int)

    for lag in [1, 3, 7, 14, 21, 30]:
        df[f"lag_{lag}d"] = df["quantity"].shift(lag)

    for window in [7, 14, 30]:
        df[f"rolling_mean_{window}d"] = df["quantity"].rolling(window=window).mean()
        df[f"rolling_std_{window}d"] = df["quantity"].rolling(window=window).std()

    return _add_sg_holiday_flag(df)


FEATURE_COLS = [
    "day_of_week",
    "day_of_month",
    "month",
    "week_of_year",
    "quarter",
    "is_month_end",
    "is_month_start",
    "lag_1d",
    "lag_3d",
    "lag_7d",
    "lag_14d",
    "lag_21d",
    "lag_30d",
    "rolling_mean_7d",
    "rolling_mean_14d",
    "rolling_mean_30d",
    "rolling_std_7d",
    "rolling_std_14d",
    "rolling_std_30d",
    "is_cny",
    "is_hari_raya",
    "is_yearend",
    "is_national_day",
    "is_school_hol",
]


def _now_iso() -> str:
    return datetime.utcnow().replace(microsecond=0).isoformat() + "Z"


def _load_historical_data(product_id: int, outlet_id: int) -> pd.DataFrame:
    rows = select_rows(
        "historical_orders",
        "order_date,quantity",
        filters={"product_id": product_id, "outlet_id": outlet_id},
        order="order_date.asc",
    )
    df = pd.DataFrame(rows)
    if df.empty:
        return df

    df["quantity"] = pd.to_numeric(df["quantity"], errors="coerce").fillna(0)
    return df


def _write_forecasts(
    product_id: int,
    outlet_id: int,
    results: list[dict],
) -> None:
    delete_rows("forecasts", filters={"product_id": product_id, "outlet_id": outlet_id})
    payload = [
        {
            "product_id": product_id,
            "outlet_id": outlet_id,
            "forecast_date": row["date"],
            "predicted_demand": row["predicted"],
            "confidence_lower": row["lower"],
            "confidence_upper": row["upper"],
            "generated_at": _now_iso(),
        }
        for row in results
    ]
    insert_rows("forecasts", payload)


def train_and_forecast(product_id: int, outlet_id: int, forecast_days: int = 30):
    df = _load_historical_data(product_id, outlet_id)
    if len(df) < 60:
        return [], 0.0

    df = _engineer_features(df).dropna()
    if len(df) < 60:
        return [], 0.0

    X = df[FEATURE_COLS].values
    y = df["quantity"].values

    split_idx = len(df) - 60
    X_train, X_test = X[:split_idx], X[split_idx:]
    y_train, y_test = y[:split_idx], y[split_idx:]

    model = GradientBoostingRegressor(
        n_estimators=30,
        max_depth=3,
        learning_rate=0.1,
        subsample=0.8,
        random_state=42,
    )
    model.fit(X_train, y_train)

    y_pred_test = model.predict(X_test)
    r2 = r2_score(y_test, y_pred_test)
    mae = mean_absolute_error(y_test, y_pred_test)

    last_date = pd.to_datetime(df["order_date"].iloc[-1])
    recent_quantities = list(df["quantity"].values[-30:])

    results: list[dict] = []
    for i in range(1, forecast_days + 1):
        future_date = last_date + timedelta(days=i)
        future_date_str = future_date.strftime("%Y-%m-%d")

        row_df = pd.DataFrame(
            [
                {
                    "order_date": future_date_str,
                    "quantity": 0,
                }
            ]
        )
        row_df["day_of_week"] = future_date.weekday()
        row_df["day_of_month"] = future_date.day
        row_df["month"] = future_date.month
        row_df["week_of_year"] = future_date.isocalendar()[1]
        row_df["quarter"] = (future_date.month - 1) // 3 + 1
        row_df["is_month_end"] = int(future_date.day >= 25)
        row_df["is_month_start"] = int(future_date.day <= 5)

        n = len(recent_quantities)
        row_df["lag_1d"] = recent_quantities[-1] if n >= 1 else 0
        row_df["lag_3d"] = recent_quantities[-3] if n >= 3 else 0
        row_df["lag_7d"] = recent_quantities[-7] if n >= 7 else 0
        row_df["lag_14d"] = recent_quantities[-14] if n >= 14 else 0
        row_df["lag_21d"] = recent_quantities[-21] if n >= 21 else 0
        row_df["lag_30d"] = recent_quantities[-30] if n >= 30 else 0

        last_7 = recent_quantities[-7:] if n >= 7 else recent_quantities
        last_14 = recent_quantities[-14:] if n >= 14 else recent_quantities
        last_30 = recent_quantities[-30:] if n >= 30 else recent_quantities
        row_df["rolling_mean_7d"] = np.mean(last_7)
        row_df["rolling_mean_14d"] = np.mean(last_14)
        row_df["rolling_mean_30d"] = np.mean(last_30)
        row_df["rolling_std_7d"] = np.std(last_7) if len(last_7) > 1 else 0
        row_df["rolling_std_14d"] = np.std(last_14) if len(last_14) > 1 else 0
        row_df["rolling_std_30d"] = np.std(last_30) if len(last_30) > 1 else 0
        row_df = _add_sg_holiday_flag(row_df)

        X_future = row_df[FEATURE_COLS].values
        predicted = float(model.predict(X_future)[0])
        predicted = max(0, predicted)

        lower = max(0, predicted - 1.5 * mae)
        upper = predicted + 1.5 * mae

        results.append(
            {
                "date": future_date_str,
                "predicted": round(predicted, 1),
                "lower": round(lower, 1),
                "upper": round(upper, 1),
            }
        )

        recent_quantities.append(predicted)

    _write_forecasts(product_id, outlet_id, results)
    return results, r2


def run_outlet_forecasts(
    outlet_id: int,
    forecast_days: int = 30,
    *,
    job_id: str | None = None,
) -> list[dict]:
    products = select_rows("forecast_products", "id,name", order="id.asc")
    total_models = len(products)
    summary: list[dict] = []

    for idx, product in enumerate(products, start=1):
        if job_id:
            update_rows(
                "forecast_jobs",
                {
                    "status": "processing",
                    "progress": min(95, 10 + int(((idx - 1) / max(total_models, 1)) * 80)),
                    "message": f"Training {product['name']} ({idx}/{total_models})",
                    "started_at": _now_iso(),
                },
                filters={"id": job_id},
            )

        forecasts, r2 = train_and_forecast(product["id"], outlet_id, forecast_days)
        total_predicted = sum(row["predicted"] for row in forecasts)
        summary.append(
            {
                "product_id": product["id"],
                "outlet_id": outlet_id,
                "product_name": product["name"],
                "r2_score": round(r2, 4),
                "total_30d_demand": round(total_predicted, 0),
            }
        )

        if job_id:
            update_rows(
                "forecast_jobs",
                {
                    "progress": min(95, 10 + int((idx / max(total_models, 1)) * 80)),
                    "message": f"Completed {idx}/{total_models} models",
                },
                filters={"id": job_id},
            )

    return summary


def process_forecast_job(job: dict) -> None:
    job_id = job["id"]
    outlet_id = int(job["outlet_id"])

    update_rows(
        "forecast_jobs",
        {
            "status": "processing",
            "progress": 5,
            "message": "Starting forecast training",
            "started_at": _now_iso(),
        },
        filters={"id": job_id},
    )

    summary = run_outlet_forecasts(outlet_id, job_id=job_id)
    update_rows(
        "forecast_jobs",
        {
            "status": "completed",
            "progress": 100,
            "message": "Forecast generation complete",
            "result": {
                "models_trained": len(summary),
                "outlet_id": outlet_id,
                "generated_at": _now_iso(),
            },
            "completed_at": _now_iso(),
        },
        filters={"id": job_id},
    )


def poll_forecast_jobs_forever(sleep_seconds: int = 5) -> None:
    print("Forecast worker ready. Polling Supabase for queued jobs...")
    while True:
        try:
            queued_jobs = select_rows(
                "forecast_jobs",
                "*",
                filters={"status": "queued"},
                order="created_at.asc",
                limit=5,
            )

            if not queued_jobs:
                time.sleep(sleep_seconds)
                continue

            for job in queued_jobs:
                try:
                    process_forecast_job(job)
                except Exception as exc:
                    update_rows(
                        "forecast_jobs",
                        {
                            "status": "failed",
                            "progress": 100,
                            "message": f"Forecast failed: {exc}",
                            "completed_at": _now_iso(),
                        },
                        filters={"id": job["id"]},
                    )
                    print(f"[forecast worker] job {job['id']} failed: {exc}")

        except Exception as exc:
            print(f"[forecast worker] polling error: {exc}")
            time.sleep(sleep_seconds)


if __name__ == "__main__":
    print("Running Supabase-backed forecast worker...")
    poll_forecast_jobs_forever()
