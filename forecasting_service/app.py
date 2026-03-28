"""
Flask wrapper for the Supabase-backed forecasting worker.

The Flask process is now only a lightweight local service that starts
the background job poller and exposes a health check.
"""

from __future__ import annotations

from threading import Thread

from flask import Flask, jsonify
from flask_cors import CORS

from forecast import poll_forecast_jobs_forever


app = Flask(__name__)
CORS(app)


@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type,Authorization"
    response.headers["Access-Control-Allow-Methods"] = "GET,PUT,POST,DELETE,OPTIONS"
    return response


@app.route("/health")
@app.route("/api/health")
def health():
    return jsonify({"status": "ok", "service": "forecast-worker"})


def start_worker():
    worker = Thread(target=poll_forecast_jobs_forever, daemon=True)
    worker.start()
    return worker


if __name__ == "__main__":
    print("Starting Supabase-backed forecast worker...")
    start_worker()
    app.run(debug=False, port=5000, use_reloader=False)
