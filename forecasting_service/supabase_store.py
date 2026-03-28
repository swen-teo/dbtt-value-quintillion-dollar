"""Minimal Supabase REST helper for the Python forecasting worker."""

from __future__ import annotations

import json
import os
import ssl
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path
from typing import Any, Dict, Iterable, List, Optional

import certifi


class SupabaseConfigError(RuntimeError):
    pass


def _load_env_file() -> None:
    """Load root .env files into process env if they exist."""
    root = Path(__file__).resolve().parents[1]
    for filename in (".env", ".env.local"):
        path = root / filename
        if not path.exists():
            continue

        for raw_line in path.read_text().splitlines():
            line = raw_line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, value = line.split("=", 1)
            key = key.strip()
            value = value.strip().strip('"').strip("'")
            os.environ.setdefault(key, value)


_load_env_file()


def get_supabase_config() -> tuple[str, str]:
    url = (
        os.getenv("SUPABASE_URL")
        or os.getenv("VITE_SUPABASE_URL")
        or ""
    ).rstrip("/")
    key = (
        os.getenv("SUPABASE_SERVICE_ROLE_KEY")
        or os.getenv("SUPABASE_ANON_KEY")
        or os.getenv("VITE_SUPABASE_ANON_KEY")
        or ""
    )

    if not url or not key:
        raise SupabaseConfigError(
            "Missing Supabase config. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY."
        )

    return url, key


def _request_json(
    method: str,
    path: str,
    *,
    params: Optional[Dict[str, Any]] = None,
    body: Any = None,
    headers: Optional[Dict[str, str]] = None,
) -> Any:
    base_url, key = get_supabase_config()
    url = f"{base_url}{path}"
    if params:
        url = f"{url}?{urllib.parse.urlencode(params, doseq=True)}"

    request_headers = {
        "apikey": key,
        "Authorization": f"Bearer {key}",
        "Accept": "application/json",
    }
    if body is not None:
        request_headers["Content-Type"] = "application/json"
        request_headers["Prefer"] = "return=representation"
    if headers:
        request_headers.update(headers)

    data = None if body is None else json.dumps(body).encode("utf-8")
    req = urllib.request.Request(url, data=data, headers=request_headers, method=method)
    context = ssl.create_default_context(cafile=certifi.where())

    try:
        with urllib.request.urlopen(req, timeout=60, context=context) as resp:
            raw = resp.read()
            if not raw:
                return None
            return json.loads(raw.decode("utf-8"))
    except urllib.error.HTTPError as exc:
        payload = exc.read().decode("utf-8") if exc.fp else ""
        raise RuntimeError(
            f"Supabase request failed ({exc.code}) for {method} {path}: {payload}"
        ) from exc


def select_rows(
    table: str,
    select: str = "*",
    *,
    filters: Optional[Dict[str, Any]] = None,
    order: Optional[str] = None,
    limit: Optional[int] = None,
) -> List[Dict[str, Any]]:
    params: Dict[str, Any] = {"select": select}
    for key, value in (filters or {}).items():
        params[key] = f"eq.{value}"
    if order:
        params["order"] = order
    if limit is not None:
        params["limit"] = limit
    return _request_json("GET", f"/rest/v1/{table}", params=params) or []


def insert_rows(table: str, rows: Iterable[Dict[str, Any]] | Dict[str, Any]):
    payload = list(rows) if not isinstance(rows, dict) else rows
    return _request_json("POST", f"/rest/v1/{table}", body=payload)


def update_rows(
    table: str,
    updates: Dict[str, Any],
    *,
    filters: Optional[Dict[str, Any]] = None,
):
    params: Dict[str, Any] = {}
    for key, value in (filters or {}).items():
        params[key] = f"eq.{value}"
    return _request_json("PATCH", f"/rest/v1/{table}", params=params, body=updates)


def delete_rows(table: str, *, filters: Optional[Dict[str, Any]] = None):
    params: Dict[str, Any] = {}
    for key, value in (filters or {}).items():
        params[key] = f"eq.{value}"
    if not params:
        # PostgREST rejects DELETE requests without any WHERE clause.
        # Use a harmless always-true filter so "clear table" operations work.
        params["id"] = "not.is.null"
    return _request_json("DELETE", f"/rest/v1/{table}", params=params)
