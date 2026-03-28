import { supabase } from './supabaseClient';

type Outlet = { id: number; name: string };
type Category = { id: number; name: string };
type Product = {
  id: number;
  name: string;
  category_id: number;
  current_stock: number;
  reorder_level: number;
};
type HistoricalOrder = { order_date: string; quantity: number };
type ForecastRow = {
  product_id: number;
  forecast_date: string;
  predicted_demand: number;
  confidence_lower?: number | null;
  confidence_upper?: number | null;
  generated_at?: string | null;
};

type TrajectoryPoint = {
  label: string;
  historical: number | null;
  forecast: number | null;
  upper: number | null;
  lower: number | null;
};

type ForecastingSnapshot = {
  summary: {
    total_forecast_30d: number;
    products_at_risk: number;
    total_products: number;
    category_breakdown: Array<{ category: string; total_demand: number }>;
    top_products: Array<{ name: string; total_demand: number; current_stock: number }>;
    historical_daily: Array<{ date: string; total: number }>;
    last_updated: string;
  };
  alerts: Array<{
    id: number;
    name: string;
    category: string;
    current_stock: number;
    total_forecast_30d: number;
    avg_daily_demand: number;
    last_forecast: string;
  }>;
  trajectoryData: TrajectoryPoint[];
  categoryBreakdown: Array<{ category: string; total_demand: number }>;
};

type ForecastGenerationResult = {
  status?: string;
  message?: string;
  models_trained?: number;
};

type ForecastJob = {
  id: string;
  outlet_id: number;
  status: 'queued' | 'processing' | 'completed' | 'failed';
  progress: number;
  message: string | null;
  result: Record<string, any> | null;
  created_at: string;
  started_at: string | null;
  completed_at: string | null;
};

class HttpError extends Error {
  status: number;
  url: string;
  body: string;

  constructor(status: number, url: string, body: string) {
    super(`Request failed with ${status} for ${url}`);
    this.name = "HttpError";
    this.status = status;
    this.url = url;
    this.body = body;
  }
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL?.replace(/\/$/, "");
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const LEGACY_API_BASE_URL = (
  import.meta.env.VITE_FORECAST_API_URL || "http://127.0.0.1:5000/api"
).replace(/\/$/, "");
const HAS_EXPLICIT_FORECAST_API = Boolean(import.meta.env.VITE_FORECAST_API_URL);

function isSupabaseConfigured() {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);
  if (!res.ok) {
    throw new HttpError(res.status, url, await res.text());
  }
  return res.json() as Promise<T>;
}

function shouldFallbackToLegacy(error: unknown) {
  if (!(error instanceof HttpError)) {
    return false;
  }

  return (
    error.status === 404 &&
    (error.body.includes("PGRST205") ||
      error.body.includes("Could not find the table") ||
      error.body.includes("relation") ||
      error.body.includes("does not exist"))
  );
}

function canUseLegacyApi() {
  if (HAS_EXPLICIT_FORECAST_API) {
    return true;
  }

  return (
    typeof window !== "undefined" &&
    ["localhost", "127.0.0.1"].includes(window.location.hostname)
  );
}

async function fetchSupabaseTable<T>(
  table: string,
  select: string,
  filters: Record<string, string | number> = {},
  order?: string,
): Promise<T[]> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error("Supabase environment variables are missing.");
  }

  const url = new URL(`${SUPABASE_URL}/rest/v1/${table}`);
  url.searchParams.set("select", select);

  Object.entries(filters).forEach(([key, value]) => {
    url.searchParams.set(key, `eq.${value}`);
  });

  if (order) {
    url.searchParams.set("order", order);
  }

  return fetchJson<T[]>(url.toString(), {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
  });
}

async function fetchLegacyJson<T>(path: string, init?: RequestInit): Promise<T> {
  return fetchJson<T>(`${LEGACY_API_BASE_URL}${path}`, init);
}

function sum(values: Array<number | null | undefined>) {
  return values.reduce((total, value) => total + Number(value || 0), 0);
}

function aggregateByDate(rows: Array<{ date: string; total: number }>) {
  const grouped = new Map<string, number>();
  rows.forEach((row) => {
    grouped.set(row.date, (grouped.get(row.date) || 0) + Number(row.total || 0));
  });

  return [...grouped.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([date, total]) => ({ date, total }));
}

function aggregateForecastRows(rows: ForecastRow[]) {
  const grouped = new Map<
    string,
    { predicted: number; lower: number; upper: number }
  >();

  rows.forEach((row) => {
    const key = row.forecast_date;
    const current = grouped.get(key) || { predicted: 0, lower: 0, upper: 0 };
    current.predicted += Number(row.predicted_demand || 0);
    current.lower += Number(row.confidence_lower || 0);
    current.upper += Number(row.confidence_upper || 0);
    grouped.set(key, current);
  });

  return [...grouped.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([forecast_date, values]) => ({
      forecast_date,
      predicted_demand: values.predicted,
      confidence_lower: values.lower,
      confidence_upper: values.upper,
    }));
}

function buildTrajectoryData(
  historicalDaily: Array<{ date: string; total: number }>,
  forecastDaily: Array<{
    forecast_date: string;
    predicted_demand: number;
    confidence_lower: number;
    confidence_upper: number;
  }>,
) {
  const trajectory: TrajectoryPoint[] = historicalDaily.map((item) => ({
    label: item.date.slice(5),
    historical: item.total,
    forecast: null,
    upper: null,
    lower: null,
  }));

  forecastDaily.forEach((item) => {
    trajectory.push({
      label: item.forecast_date.slice(5),
      historical: null,
      forecast: Math.round(item.predicted_demand),
      upper: Math.round(item.confidence_upper),
      lower: Math.round(item.confidence_lower),
    });
  });

  return trajectory;
}

export async function getOutlets(): Promise<Outlet[]> {
  if (isSupabaseConfigured()) {
    try {
      return await fetchSupabaseTable<Outlet>("forecast_outlets", "id,name", {}, "id.asc");
    } catch (error) {
      if (shouldFallbackToLegacy(error) && canUseLegacyApi()) {
        return fetchLegacyJson<Outlet[]>("/outlets");
      }
      throw error;
    }
  }

  return fetchLegacyJson<Outlet[]>("/outlets");
}

export async function getForecastingSnapshot(
  outletId: number,
): Promise<ForecastingSnapshot> {
  if (isSupabaseConfigured()) {
    try {
      const [categories, products, historicalOrders, forecastRows] =
        await Promise.all([
          fetchSupabaseTable<Category>("forecast_categories", "id,name", {}, "id.asc"),
          fetchSupabaseTable<Product>(
            "forecast_products",
            "id,name,category_id,current_stock,reorder_level",
            {},
            "id.asc",
          ),
          fetchSupabaseTable<HistoricalOrder>(
            "historical_orders",
            "order_date,quantity",
            { outlet_id: outletId },
            "order_date.asc",
          ),
          fetchSupabaseTable<ForecastRow>(
            "forecasts",
            "product_id,forecast_date,predicted_demand,confidence_lower,confidence_upper,generated_at",
            { outlet_id: outletId },
            "forecast_date.asc",
          ),
        ]);

      const categoryById = new Map(
        categories.map((category) => [category.id, category.name]),
      );
      const productById = new Map(products.map((product) => [product.id, product]));

      const forecastByProduct = new Map<
        number,
        { total: number; lastForecast: string; generatedAt: string }
      >();

      forecastRows.forEach((row) => {
        const current = forecastByProduct.get(row.product_id) || {
          total: 0,
          lastForecast: "",
          generatedAt: "",
        };
        current.total += Number(row.predicted_demand || 0);
        if (!current.lastForecast || row.forecast_date > current.lastForecast) {
          current.lastForecast = row.forecast_date;
        }
        if (!current.generatedAt || (row.generated_at || "") > current.generatedAt) {
          current.generatedAt = row.generated_at || "";
        }
        forecastByProduct.set(row.product_id, current);
      });

      const forecastDaily = aggregateForecastRows(forecastRows);
      const historicalDaily = aggregateByDate(
        historicalOrders.map((row) => ({
          date: row.order_date,
          total: Number(row.quantity || 0),
        })),
      );
      const trajectoryData = buildTrajectoryData(historicalDaily, forecastDaily);

      const categoryBreakdownMap = new Map<string, number>();
      const alerts: ForecastingSnapshot["alerts"] = [];

      products.forEach((product) => {
        const forecast = forecastByProduct.get(product.id);
        if (!forecast) return;

        const category = categoryById.get(product.category_id) || "Uncategorized";
        const totalForecast30d = forecast.total;
        const currentStock = Number(product.current_stock || 0);
        const threshold = currentStock / 4;

        categoryBreakdownMap.set(
          category,
          (categoryBreakdownMap.get(category) || 0) + totalForecast30d,
        );

        if (totalForecast30d > threshold) {
          alerts.push({
            id: product.id,
            name: product.name,
            category,
            current_stock: currentStock,
            total_forecast_30d: Math.round(totalForecast30d),
            avg_daily_demand: Math.round(totalForecast30d / 30),
            last_forecast:
              forecast.generatedAt || forecast.lastForecast || new Date().toISOString(),
          });
        }
      });

      alerts.sort(
        (left, right) =>
          right.total_forecast_30d - right.current_stock - (left.total_forecast_30d - left.current_stock),
      );

      const categoryBreakdown = [...categoryBreakdownMap.entries()]
        .map(([category, totalDemand]) => ({
          category,
          total_demand: Math.round(totalDemand),
        }))
        .sort((left, right) => right.total_demand - left.total_demand);

      const topProducts = [...forecastByProduct.entries()]
        .map(([productId, forecast]) => {
          const product = productById.get(productId);
          return {
            name: product?.name || `Product ${productId}`,
            total_demand: Math.round(forecast.total),
            current_stock: Math.floor(Number(product?.current_stock || 0) / 4),
          };
        })
        .sort((left, right) => right.total_demand - left.total_demand)
        .slice(0, 5);

      const totalForecast30d = sum(forecastRows.map((row) => row.predicted_demand));
      const lastUpdated =
        forecastRows
          .map((row) => row.generated_at || "")
          .filter(Boolean)
          .sort()
          .at(-1) || new Date().toISOString();

      return {
        summary: {
          total_forecast_30d: Math.round(totalForecast30d),
          products_at_risk: alerts.length,
          total_products: products.length,
          category_breakdown: categoryBreakdown,
          top_products: topProducts,
          historical_daily: historicalDaily,
          last_updated: lastUpdated,
        },
        alerts,
        trajectoryData,
        categoryBreakdown,
      };
    } catch (error) {
      if (shouldFallbackToLegacy(error) && canUseLegacyApi()) {
        const [summary, alerts, historicalRows, forecastRows] = await Promise.all([
          fetchLegacyJson<ForecastingSnapshot["summary"]>(
            `/forecast/summary?outlet_id=${outletId}`,
          ),
          fetchLegacyJson<ForecastingSnapshot["alerts"]>(
            `/forecast/alerts?outlet_id=${outletId}`,
          ),
          fetchLegacyJson<Array<{ date: string; total: number }>>(
            `/historical?days=60&outlet_id=${outletId}`,
          ),
          fetchLegacyJson<ForecastRow[]>(
            `/forecast/results?outlet_id=${outletId}`,
          ),
        ]);

        const aggregatedForecast = aggregateForecastRows(forecastRows);
        return {
          summary,
          alerts,
          trajectoryData: buildTrajectoryData(historicalRows, aggregatedForecast),
          categoryBreakdown: summary.category_breakdown || [],
        };
      }

      throw error;
    }
  }
 
  const [summary, alerts, historicalRows, forecastRows] = await Promise.all([
    fetchLegacyJson<ForecastingSnapshot["summary"]>(
      `/forecast/summary?outlet_id=${outletId}`,
    ),
    fetchLegacyJson<ForecastingSnapshot["alerts"]>(
      `/forecast/alerts?outlet_id=${outletId}`,
    ),
    fetchLegacyJson<Array<{ date: string; total: number }>>(
      `/historical?days=60&outlet_id=${outletId}`,
    ),
    fetchLegacyJson<ForecastRow[]>(
      `/forecast/results?outlet_id=${outletId}`,
    ),
  ]);

  const aggregatedForecast = aggregateForecastRows(forecastRows);
  return {
    summary,
    alerts,
    trajectoryData: buildTrajectoryData(historicalRows, aggregatedForecast),
    categoryBreakdown: summary.category_breakdown || [],
  };
}

export async function requestForecastGeneration(outletId: number) {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('forecast_jobs')
        .insert({
          outlet_id: outletId,
          status: 'queued',
          progress: 0,
          message: 'Queued for training',
          result: null,
        })
        .select('*')
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return { mode: 'supabase' as const, job: data as ForecastJob };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      if (message.toLowerCase().includes("forecast_jobs") && canUseLegacyApi()) {
        const result = await fetchLegacyJson<ForecastGenerationResult>("/forecast/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ outlet_id: outletId }),
        });

        return { mode: 'legacy' as const, result };
      }

      throw error;
    }
  }

  const isLocalhost =
    typeof window !== 'undefined' &&
    ["localhost", "127.0.0.1"].includes(window.location.hostname);

  if (!HAS_EXPLICIT_FORECAST_API && !isLocalhost) {
    throw new Error(
      "Forecast generation needs Supabase + forecast_jobs or a separate compute service.",
    );
  }

  const result = await fetchLegacyJson<ForecastGenerationResult>("/forecast/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ outlet_id: outletId }),
  });

  return { mode: 'legacy' as const, result };
}

export async function getForecastJob(jobId: string) {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase is not configured.');
  }

  const { data, error } = await supabase
    .from('forecast_jobs')
    .select('*')
    .eq('id', jobId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as ForecastJob;
}
