import { useState, useEffect, useRef } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
} from 'recharts';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '../../components/ui/chart';
import {
  getForecastingSnapshot,
  getForecastJob,
  getOutlets,
  getProducts,
  requestForecastGeneration,
} from '../../lib/forecastingData';
import { 
  TrendingUp, AlertCircle, AlertTriangle, Package, Truck, 
  RefreshCw, ChevronRight, BarChart3, PieChart, 
  MapPin, Calendar, CheckCircle2, CheckCircle, Info, Activity 
} from 'lucide-react';

export default function AIForecasting() {
  const [outlets, setOutlets] = useState<{id: number, name: string}[]>([]);
  const [currentOutletId, setCurrentOutletId] = useState<number | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null); // null = Portfolio View
  const [availableProducts, setAvailableProducts] = useState<{id: number, name: string}[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [trajectoryData, setTrajectoryData] = useState<any[]>([]);
  const [categoryBreakdown, setCategoryBreakdown] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [generateProgress, setGenerateProgress] = useState(0);
  const [generateStatus, setGenerateStatus] = useState('');
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const jobPollRef = useRef<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadInitialData = async () => {
      try {
        setConnectionError(null);
        const [outletData, productData] = await Promise.all([
          getOutlets(),
          getProducts(),
        ]);
        if (cancelled) return;
        setOutlets(outletData);
        setCurrentOutletId((current) => current ?? outletData[0]?.id ?? null);
        setAvailableProducts(productData.map(p => ({ id: p.id, name: p.name })));
      } catch (e) {
        if (cancelled) return;
        console.error('Error fetching initial data', e);
        setConnectionError(
          '⚠️ Unable to load forecasting data. Check Supabase or the legacy API configuration.',
        );
      }
    };

    loadInitialData();
    const timer = setTimeout(() => setIsAnalyzing(false), 1800);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!currentOutletId) return;

    let cancelled = false;

    const loadSnapshot = async () => {
      try {
        const snapshot = await getForecastingSnapshot(
          currentOutletId, 
          selectedProductId || undefined
        );
        if (cancelled) return;
        setSummary(snapshot.summary);
        setAlerts(snapshot.alerts);
        setTrajectoryData(snapshot.trajectoryData);
        setCategoryBreakdown(snapshot.categoryBreakdown);
        
        setConnectionError(null);
      } catch (e) {
        if (cancelled) return;
        console.error('Error fetching forecasting snapshot', e);
        setConnectionError(
          '⚠️ Unable to load forecasting data. Make sure Supabase is seeded or the legacy backend is running.',
        );
      }
    };

    loadSnapshot();

    return () => {
      cancelled = true;
    };
  }, [currentOutletId, selectedProductId]);

  useEffect(() => {
    return () => {
      if (jobPollRef.current) {
        window.clearInterval(jobPollRef.current);
      }
    };
  }, []);

  const handleGenerateForecast = async () => {
    if (isGenerating) return;
    if (!currentOutletId) {
      setGenerateStatus('❌ Select an outlet before generating a forecast');
      setIsGenerating(true);
      setTimeout(() => setIsGenerating(false), 2000);
      return;
    }
    
    setIsGenerating(true);
    setGenerateProgress(0);
    setGenerateStatus('Queueing forecast job...');

    try {
      const dispatch = await requestForecastGeneration(Number(currentOutletId));

      if (dispatch.mode === 'legacy') {
        setGenerateProgress(100);
        if (dispatch.result.status === 'success') {
          setGenerateStatus(`✅ Success! Generated forecasts for ${dispatch.result.models_trained} products.`);
          const snapshot = await getForecastingSnapshot(Number(currentOutletId));
          setSummary(snapshot.summary);
          setAlerts(snapshot.alerts);
          setTrajectoryData(snapshot.trajectoryData);
          setCategoryBreakdown(snapshot.categoryBreakdown);
        } else {
          setGenerateStatus(`❌ Model Error: ${dispatch.result.message || 'Check logs'}`);
        }
      } else {
        const jobId = dispatch.job.id;
        setGenerateStatus(`⏳ Forecast job queued (${jobId.slice(0, 8)}...)`);
        setGenerateProgress(dispatch.job.progress || 0);

        if (jobPollRef.current) {
          window.clearInterval(jobPollRef.current);
        }

        jobPollRef.current = window.setInterval(async () => {
          try {
            const job = await getForecastJob(jobId);
            setGenerateProgress(job.progress || 0);
            setGenerateStatus(job.message || `Training... (${job.progress || 0}%)`);

            if (job.status === 'completed') {
              if (jobPollRef.current) {
                window.clearInterval(jobPollRef.current);
                jobPollRef.current = null;
              }

              const snapshot = await getForecastingSnapshot(Number(currentOutletId));
              setSummary(snapshot.summary);
              setAlerts(snapshot.alerts);
              setTrajectoryData(snapshot.trajectoryData);
              setCategoryBreakdown(snapshot.categoryBreakdown);
              setGenerateProgress(100);
              setGenerateStatus(`✅ Forecast complete for outlet ${currentOutletId}.`);

              setTimeout(() => {
                setIsGenerating(false);
                setGenerateProgress(0);
                setGenerateStatus('');
              }, 3000);
            }

            if (job.status === 'failed') {
              if (jobPollRef.current) {
                window.clearInterval(jobPollRef.current);
                jobPollRef.current = null;
              }
              setGenerateStatus(`❌ Forecast failed: ${job.message || 'See worker logs'}`);
              setTimeout(() => {
                setIsGenerating(false);
                setGenerateProgress(0);
                setGenerateStatus('');
              }, 4000);
            }
          } catch (pollError: any) {
            console.error('Error polling forecast job', pollError);
            if (jobPollRef.current) {
              window.clearInterval(jobPollRef.current);
              jobPollRef.current = null;
            }
            setGenerateStatus(`❌ Polling error: ${pollError.message}`);
            setTimeout(() => {
              setIsGenerating(false);
              setGenerateProgress(0);
              setGenerateStatus('');
            }, 4000);
          }
        }, 2500);
      }
    } catch (e: any) {
      if (jobPollRef.current) {
        window.clearInterval(jobPollRef.current);
        jobPollRef.current = null;
      }
      setGenerateStatus(`❌ Network Error: ${e.message}`);
      setTimeout(() => {
        setIsGenerating(false);
        setGenerateProgress(0);
        setGenerateStatus('');
      }, 4000);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f4ea] flex-1 relative font-sans px-10 py-10">
      {/* AI Analysis Initial Overlay */}
      {isAnalyzing && (
        <div className="fixed inset-0 z-50 bg-[#f9f4ea] flex flex-col items-center justify-center transition-opacity duration-700">
           <div className="w-20 h-20 border-4 border-orange-100 border-t-[#ff6900] rounded-full animate-spin mb-6"></div>
           <h2 className="text-[#1B2A4A] font-bold text-xl animate-pulse">Initializing AI Forecasting Engine...</h2>
           <p className="text-gray-500 mt-2">Loading multi-store predictive models</p>
        </div>
      )}

      <div className={`max-w-[1600px] mx-auto transition-all duration-700 ${isAnalyzing ? 'opacity-0 scale-98 translate-y-4' : 'opacity-100 scale-100 translate-y-0'}`}>
        
        {/* Top Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold text-[#1B2A4A] tracking-tight">AI Demand Forecasting Module</h1>
            <p className="text-gray-600 mt-1">Generate dynamic ordering plans based on ML pattern analysis</p>
          </div>
          <div className="flex items-center gap-4">
            {connectionError && <p className="text-red-500 font-bold text-sm">{connectionError}</p>}

            {/* Outlet Selector */}
            <select 
              value={currentOutletId || ''} 
              onChange={e => setCurrentOutletId(Number(e.target.value))}
              className="px-4 py-3 border-2 border-[#1B2A4A] rounded-xl font-bold text-[#1B2A4A] bg-white shadow-sm focus:outline-none focus:border-orange-500 hover:bg-gray-50 transition-colors"
            >
              <option value="" disabled>{connectionError ? 'Backend Offline' : 'Loading Outlets...'}</option>
              {outlets.map((o: any) => <option key={o.id} value={o.id}>{o.name}</option>)}
            </select>
          </div>
        </div>

        {/* Action Banner */}
        <div className="bg-[#ff6900] rounded-[28px] p-10 shadow-[0px_18px_42px_0px_rgba(201,101,15,0.15)] mb-10 flex justify-between items-center bg-gradient-to-r from-[#ff6900] to-[#ff8534]">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <h2 className="text-white text-3xl font-extrabold tracking-tight">Demand Intelligence</h2>
              <span className="bg-white/20 text-white text-[10px] uppercase font-black px-2 py-1 rounded-md backdrop-blur-md">
                v2.4 Prod Engine
              </span>
            </div>
            <p className="text-orange-50 font-medium text-lg opacity-90">
              ML models are currently trained on 2+ years of historical Valu$ data.
            </p>
            {summary?.last_forecast && (
              <div className="flex items-center gap-2 mt-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]"></div>
                <p className="text-white/80 text-xs font-bold uppercase tracking-widest">
                  Last Snapshot: {new Date(summary.last_forecast).toLocaleString()}
                </p>
              </div>
            )}
          </div>
            <div className="flex flex-col items-end gap-1">
              <button
                onClick={handleGenerateForecast}
                disabled={isGenerating}
                className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-lg transition-all shadow-xl hover:-translate-y-1 active:scale-95 ${isGenerating ? 'bg-gray-100/20 text-white cursor-wait' : 'bg-white text-[#ff6900] hover:bg-orange-50'}`}
              >
                <RefreshCw className={`w-6 h-6 ${isGenerating ? 'animate-spin' : ''}`} />
                {isGenerating ? 'Recalculating...' : 'Generate New Forecast'}
              </button>
              <p className="text-white/60 text-[10px] font-bold uppercase tracking-tighter">
                * Triggers fresh GradientBoosting re-training
              </p>
            </div>
        </div>

        {isGenerating && (
            <div className="w-full mb-10">
                <div className="h-3 w-full bg-white rounded-full overflow-hidden shadow-inner">
                    <div className="h-full bg-green-500 transition-all duration-300" style={{width: `${generateProgress}%`}}></div>
                </div>
                <p className="text-sm font-bold text-gray-600 mt-2">{generateStatus}</p>
            </div>
        )}

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                <p className="text-gray-500 font-medium text-sm mb-2">Predicted Units (30 Days)</p>
                <p className="text-3xl font-extrabold text-[#1B2A4A]">{summary?.total_forecast_30d?.toLocaleString() || '—'}</p>
                <p className="text-sm text-gray-400 mt-1">Across entire catalog</p>
            </div>
            <div className="bg-white rounded-xl border border-red-50 p-6 shadow-sm relative overflow-hidden">
                <div className="absolute -right-4 -top-4 w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
                    <AlertTriangle className="text-red-500 w-6 h-6 absolute bottom-3 left-3" />
                </div>
                <p className="text-gray-500 font-medium text-sm mb-2">Critical Shortages</p>
                <p className="text-3xl font-extrabold text-[#ef4444]">{summary?.products_at_risk ?? '—'}</p>
                <p className="text-sm text-gray-400 mt-1">{summary?.products_at_risk > 0 ? 'Need immediate sourcing' : 'Stock is healthy'}</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                <p className="text-gray-500 font-medium text-sm mb-2">Products Processed</p>
                <p className="text-3xl font-extrabold text-gray-900">{summary?.total_products || '6'}</p>
                <p className="text-sm text-gray-400 mt-1">Analyzed by ML models</p>
            </div>
            <div className="bg-[#1B2A4A] rounded-xl border border-[#1B2A4A] p-6 shadow-lg text-white relative">
                <p className="text-blue-200 font-medium text-sm mb-2">Service Health</p>
                <div className="flex items-center gap-2">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                    <p className="text-2xl font-extrabold">Online</p>
                </div>
                <p className="text-xs text-blue-300 mt-2">{summary?.last_updated ? `Last sync: ${summary.last_updated}` : 'No local sync yet'}</p>
            </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-8 shadow-sm h-[520px]">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-[#1f2937]">
                        {selectedProductId 
                            ? `${availableProducts.find(p => p.id === selectedProductId)?.name || 'Product'} Forecast` 
                            : 'Overall Portfolio Forecast'}
                    </h3>
                    <select
                      value={selectedProductId || ''}
                      onChange={e => setSelectedProductId(e.target.value ? Number(e.target.value) : null)}
                      className="px-3 py-2 border-2 border-[#ff6900] rounded-lg text-sm font-semibold text-[#ff6900] bg-white focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all cursor-pointer"
                    >
                      <option value="">📊 All Products</option>
                      {availableProducts.map((p: any) => (
                        <option key={p.id} value={p.id}>📦 {p.name}</option>
                      ))}
                    </select>
                </div>
                <div className="relative h-[380px] w-full">
                    <ChartContainer
                      config={{
                        historical: { label: 'Historical', color: '#1B2A4A' },
                        forecast: { label: 'Predicted (30d)', color: '#E8651A' },
                        upper: { label: 'Upper Bound', color: 'rgba(232,101,26,0.20)' },
                        lower: { label: 'Lower Bound', color: 'rgba(232,101,26,0.10)' },
                      }}
                      className="h-full w-full aspect-auto"
                    >
                      <ComposedChart data={trajectoryData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="label" tickLine={false} axisLine={false} />
                        <YAxis tickLine={false} axisLine={false} width={42} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Line type="monotone" dataKey="historical" stroke="var(--color-historical)" strokeWidth={3} dot={false} connectNulls />
                        <Line type="monotone" dataKey="forecast" stroke="var(--color-forecast)" strokeWidth={3} strokeDasharray="6 4" dot={false} connectNulls />
                        <Line type="monotone" dataKey="upper" stroke="var(--color-upper)" strokeWidth={2} dot={false} connectNulls />
                        <Line type="monotone" dataKey="lower" stroke="var(--color-lower)" strokeWidth={2} dot={false} connectNulls />
                      </ComposedChart>
                    </ChartContainer>
                </div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm h-[520px] flex flex-col">
                <h3 className="text-lg font-bold text-[#1f2937] mb-2">Stock vs Forecast (30d)</h3>
                <p className="text-xs text-gray-400 mb-6">Current inventory compared to predicted 30-day demand per product</p>
                <div className="flex-1 min-h-0 relative">
                    {alerts.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-gray-400">
                        <Package className="w-12 h-12 mb-3 opacity-30" />
                        <p className="font-semibold text-sm">Generate a forecast to see comparison</p>
                      </div>
                    ) : (
                      <div className="h-full flex flex-col justify-center gap-4">
                        {alerts.slice(0, 6).map((a: any) => {
                          const maxVal = Math.max(a.current_stock, a.total_forecast_30d);
                          const stockPct = maxVal > 0 ? (a.current_stock / maxVal) * 100 : 0;
                          const forecastPct = maxVal > 0 ? (a.total_forecast_30d / maxVal) * 100 : 0;
                          const isShortfall = a.total_forecast_30d > a.current_stock;
                          return (
                            <div key={a.id} className="flex items-center gap-3">
                              <p className="text-xs font-bold text-gray-600 w-28 truncate text-right" title={a.name}>
                                {a.name.replace(/\s*\(.*?\)\s*/g, '')}
                              </p>
                              <div className="flex-1 flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                  <div className="h-4 rounded-r-md bg-[#1B2A4A] transition-all duration-500" style={{ width: `${stockPct}%`, minWidth: '4px' }} />
                                  <span className="text-[10px] font-bold text-gray-500">{a.current_stock.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className={`h-4 rounded-r-md transition-all duration-500 ${isShortfall ? 'bg-[#ef4444]' : 'bg-[#ff6900]'}`} style={{ width: `${forecastPct}%`, minWidth: '4px' }} />
                                  <span className={`text-[10px] font-bold ${isShortfall ? 'text-red-500' : 'text-orange-500'}`}>{a.total_forecast_30d.toLocaleString()}</span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                        <div className="flex items-center gap-6 mt-2 justify-center">
                          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-[#1B2A4A]" /><span className="text-[10px] font-bold text-gray-500">Current Stock</span></div>
                          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-[#ff6900]" /><span className="text-[10px] font-bold text-gray-500">Forecast (30d)</span></div>
                          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-[#ef4444]" /><span className="text-[10px] font-bold text-gray-500">Shortfall Risk</span></div>
                        </div>
                      </div>
                    )}
                </div>
            </div>
        </div>

        {/* Priority Restock Alerts */}
        <div className="bg-white rounded-2xl border border-gray-100 p-0 shadow-sm overflow-hidden mb-10">
            <div className="p-6 border-b border-gray-100 bg-[#f9fafb]">
                <h3 className="text-lg font-bold text-[#1f2937]">Urgent Procurement Recommendations</h3>
                <p className="text-sm text-gray-500 mt-1">Items where 30-day forecast significantly exceeds current on-hand inventory</p>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50/50">
                            <th className="p-5 font-bold text-[#1B2A4A] border-b border-gray-100">Product Name</th>
                            <th className="p-5 font-bold text-[#1B2A4A] border-b border-gray-100 text-right">
                                <div className="flex items-center justify-end gap-2">
                                    Current Stock
                                    <span className="bg-green-100 text-green-600 text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 font-black">
                                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></div>
                                        LIVE
                                    </span>
                                </div>
                            </th>
                            <th className="p-5 font-bold text-[#1B2A4A] border-b border-gray-100 text-right">Forecast (30d)</th>
                            <th className="p-5 font-bold border-b border-gray-100 text-right">Shortfall</th>
                            <th className="p-5 font-bold border-b border-gray-100 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {alerts.length === 0 ? (
                            <tr><td colSpan={5} className="p-8 text-center text-gray-500 font-medium">Click 'Generate Forecast' above to calculate restock alerts.</td></tr>
                        ) : alerts.map((a: any) => (
                            <tr key={a.id} className="hover:bg-[#fef3c7] transition-colors group">
                                <td className="p-5">
                                    <p className="font-extrabold text-[#1f2937] text-sm">{a.name}</p>
                                    <p className="text-xs text-gray-500">{a.category}</p>
                                </td>
                                <td className="p-5 font-medium text-[#1f2937] text-sm text-right">{a.current_stock.toLocaleString()} units</td>
                                <td className="p-5 font-extrabold text-[#E8651A] text-sm text-right">{a.total_forecast_30d.toLocaleString()} units</td>
                                <td className="p-5 font-extrabold text-[#ef4444] text-sm text-right">-{Math.max(0, a.total_forecast_30d - a.current_stock).toLocaleString()} units</td>
                                <td className="p-5 text-center">
                                    <button className={`px-4 py-2 font-bold text-xs rounded-[12px] shadow-sm transition-colors ${a.total_forecast_30d - a.current_stock > 500 ? 'bg-[#ff6900] text-white hover:bg-[#e05d00]' : 'bg-[#fff7ed] text-[#ff6900] border border-[#ff6900] hover:bg-[#ffeadd]'}`}>
                                        {a.total_forecast_30d - a.current_stock > 500 ? 'Auto-Order' : 'Draft PO'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

      </div>
    </div>
  );
}
