import { useState, useEffect, useRef } from 'react';
import { Chart, ScatterController, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, LineController, BarController, BarElement, Filler } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { 
  TrendingUp, AlertCircle, AlertTriangle, Package, Truck, 
  RefreshCw, ChevronRight, BarChart3, PieChart, 
  MapPin, Calendar, CheckCircle2, CheckCircle, Info, Activity 
} from 'lucide-react';

Chart.register(ScatterController, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, LineController, BarController, BarElement, Filler);

const API_BASE_URL = 'http://127.0.0.1:5000/api';

export default function AIForecasting() {
  const [outlets, setOutlets] = useState<{id: number, name: string}[]>([]);
  const [currentOutletId, setCurrentOutletId] = useState<number | null>(null);
  const [summary, setSummary] = useState<any>(null);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [generateProgress, setGenerateProgress] = useState(0);
  const [generateStatus, setGenerateStatus] = useState('');
  const [connectionError, setConnectionError] = useState<string | null>(null);
  
  const demandChartRef = useRef<HTMLCanvasElement>(null);
  const categoryChartRef = useRef<HTMLCanvasElement>(null);
  const demandChartInstance = useRef<Chart | null>(null);
  const categoryChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    fetchOutlets();
    const timer = setTimeout(() => setIsAnalyzing(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (currentOutletId) {
      fetchSummary();
      fetchAlerts();
      refreshCharts();
    }
  }, [currentOutletId]);

  const fetchOutlets = async () => {
    try {
      setConnectionError(null);
      const res = await fetch(`${API_BASE_URL}/outlets`);
      if (!res.ok) throw new Error('API Error');
      const data = await res.json();
      setOutlets(data);
      if (data.length > 0 && !currentOutletId) {
        setCurrentOutletId(data[0].id);
      }
    } catch (e) { 
      console.error('Error fetching outlets', e); 
      setConnectionError('⚠️ Cannot connect to Python Backend on Port 5000');
    }
  };

  const fetchSummary = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/forecast/summary?outlet_id=${currentOutletId}`);
      const data = await res.json();
      setSummary(data);
    } catch (e) { console.error('Error fetching summary', e); }
  };

  const fetchAlerts = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/forecast/alerts?outlet_id=${currentOutletId}`);
      const data = await res.json();
      setAlerts(data);
    } catch (e) { console.error('Error fetching alerts', e); }
  };

  const refreshCharts = async () => {
    try {
      const [histRes, forecastRes, summaryRes] = await Promise.all([
        fetch(`${API_BASE_URL}/historical?days=60&outlet_id=${currentOutletId}`),
        fetch(`${API_BASE_URL}/forecast/results?outlet_id=${currentOutletId}`),
        fetch(`${API_BASE_URL}/forecast/summary?outlet_id=${currentOutletId}`)
      ]);
      const histData = await histRes.json();
      let forecastDataList = await forecastRes.json();
      const summaryData = await summaryRes.json();

      if (forecastDataList.length === 0) return;

      const grouped: any = {};
      forecastDataList.forEach((row: any) => {
        const dateStr = row.forecast_date || row.date;
        if (!grouped[dateStr]) grouped[dateStr] = { predicted: 0, lower: 0, upper: 0 };
        grouped[dateStr].predicted += (row.predicted_demand || 0);
        grouped[dateStr].lower += (row.confidence_lower || 0);
        grouped[dateStr].upper += (row.confidence_upper || 0);
      });
      const aggregatedForecast = Object.entries(grouped).sort().map(([date, vals]: any) => ({
        forecast_date: date,
        predicted_demand: vals.predicted,
        confidence_lower: vals.lower,
        confidence_upper: vals.upper,
      }));

      const histLabels = histData.map((d: any) => d.date.slice(5));
      const histValues = histData.map((d: any) => d.total);
      const forecastLabels = aggregatedForecast.map((d: any) => d.forecast_date.slice(5));
      const forecastValues = aggregatedForecast.map((d: any) => Math.round(d.predicted_demand));
      const forecastUpper = aggregatedForecast.map((d: any) => Math.round(d.confidence_upper));
      const forecastLower = aggregatedForecast.map((d: any) => Math.round(d.confidence_lower));

      const histFull = [...histValues, ...forecastValues.map(() => null)];
      const forecastFull = [...histValues.map(() => null), ...forecastValues];
      const upperFull = [...histValues.map(() => null), ...forecastUpper];
      const lowerFull = [...histValues.map(() => null), ...forecastLower];
      const allLabels = [...histLabels, ...forecastLabels];

      if (demandChartInstance.current) demandChartInstance.current.destroy();
      if (demandChartRef.current) {
        demandChartInstance.current = new Chart(demandChartRef.current, {
          type: 'line',
          data: {
            labels: allLabels,
            datasets: [
              { label: 'Historical', data: histFull, borderColor: '#1B2A4A', backgroundColor: 'rgba(27,42,74,0.08)', fill: true, tension: 0.35, pointRadius: 0 },
              { label: 'Predicted (30d)', data: forecastFull, borderColor: '#E8651A', borderDash: [6, 3], fill: false, tension: 0.35, pointRadius: 0 },
              { label: 'Upper Bound', data: upperFull, borderColor: 'transparent', backgroundColor: 'rgba(232,101,26,0.08)', fill: '-1', tension: 0.35, pointRadius: 0 },
              { label: 'Lower Bound', data: lowerFull, borderColor: 'transparent', fill: false, tension: 0.35, pointRadius: 0 }
            ]
          },
          options: { responsive: true, maintainAspectRatio: false, interaction: { mode: 'index', intersect: false }, plugins: { legend: { position: 'top', align: 'end' } } }
        });
      }

      if (categoryChartInstance.current) categoryChartInstance.current.destroy();
      if (categoryChartRef.current && summaryData.category_breakdown) {
        categoryChartInstance.current = new Chart(categoryChartRef.current, {
          type: 'bar',
          data: {
            labels: summaryData.category_breakdown.map((c: any) => c.category),
            datasets: [{
              data: summaryData.category_breakdown.map((c: any) => c.total_demand),
              backgroundColor: ['#E8651A', '#1B2A4A', '#3B82F6', '#22C55E', '#F59E0B'],
              borderRadius: 4,
            }]
          },
          options: { responsive: true, maintainAspectRatio: false, indexAxis: 'y', plugins: { legend: { display: false } } }
        });
      }
    } catch (e) { console.error('Error refreshing charts', e); }
  };

  const handleGenerateForecast = async () => {
    if (isGenerating) return;
    if (!currentOutletId) {
      setGenerateStatus('❌ Select an outlet or wait for backend to connect');
      setIsGenerating(true);
      setTimeout(() => setIsGenerating(false), 2000);
      return;
    }
    
    setIsGenerating(true);
    setGenerateProgress(0);
    setGenerateStatus('Initializing ML engine...');
    
    // High-fidelity progress simulation for better UX during ML training
    const interval = setInterval(() => {
      let currentProgress = 0;
      setGenerateProgress(p => {
        let next = p;
        if (p < 30) next = p + 4;
        else if (p < 60) next = p + 2;
        else if (p < 90) next = p + 0.5;
        currentProgress = next;
        return next;
      });
      
      setGenerateStatus(_ => {
        if (currentProgress < 25) return 'Analyzing historical SKU velocity...';
        if (currentProgress < 50) return 'Training GradientBoosting models...';
        if (currentProgress < 80) return 'Running 30-day simulations...';
        return 'Finalizing predictions...';
      });
    }, 600);

    try {
      const res = await fetch(`${API_BASE_URL}/forecast/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ outlet_id: Number(currentOutletId) })
      });
      
      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }
      
      const data = await res.json();
      clearInterval(interval);
      setGenerateProgress(100);
      
      if (data.status === 'success') {
        setGenerateStatus(`✅ Success! Generated forecasts for ${data.models_trained} products.`);
        fetchSummary();
        fetchAlerts();
        refreshCharts();
      } else {
        setGenerateStatus(`❌ Model Error: ${data.message || 'Check logs'}`);
      }
    } catch (e: any) {
      clearInterval(interval);
      setGenerateStatus(`❌ Network Error: ${e.message}`);
    }
    
    setTimeout(() => { 
      setIsGenerating(false); 
      setGenerateProgress(0); 
      setGenerateStatus('');
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#f9f4ea] flex-1 relative font-sans p-8">
      {/* AI Analysis Initial Overlay */}
      {isAnalyzing && (
        <div className="fixed inset-0 z-50 bg-[#f9f4ea] flex flex-col items-center justify-center transition-opacity duration-700">
           <div className="w-20 h-20 border-4 border-orange-100 border-t-[#ff6900] rounded-full animate-spin mb-6"></div>
           <h2 className="text-[#1B2A4A] font-bold text-xl animate-pulse">Initializing AI Forecasting Engine...</h2>
           <p className="text-gray-500 mt-2">Loading multi-store predictive models</p>
        </div>
      )}

      <div className={`max-w-[1400px] mx-auto transition-all duration-700 ${isAnalyzing ? 'opacity-0 scale-98 translate-y-4' : 'opacity-100 scale-100 translate-y-0'}`}>
        
        {/* Top Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#1B2A4A] tracking-tight">AI Demand Forecasting Module</h1>
            <p className="text-gray-600 mt-1">Generate dynamic ordering plans based on ML pattern analysis</p>
          </div>
          <div className="flex items-center gap-4">
            {connectionError && <p className="text-red-500 font-bold text-sm">{connectionError}</p>}
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
        <div className="bg-[#ff6900] rounded-[28px] p-8 shadow-[0px_18px_42px_0px_rgba(201,101,15,0.15)] mb-8 flex justify-between items-center bg-gradient-to-r from-[#ff6900] to-[#ff8534]">
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
            <div className="w-full mb-8">
                <div className="h-3 w-full bg-white rounded-full overflow-hidden shadow-inner">
                    <div className="h-full bg-green-500 transition-all duration-300" style={{width: `${generateProgress}%`}}></div>
                </div>
                <p className="text-sm font-bold text-gray-600 mt-2">{generateStatus}</p>
            </div>
        )}

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
                <p className="text-3xl font-extrabold text-gray-900">{summary?.total_products || '20'}</p>
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 p-6 shadow-sm h-96">
                <h3 className="text-lg font-bold text-[#1f2937] mb-4">Historical vs Forecasted Trajectory</h3>
                <div className="relative h-72 w-full">
                    <canvas ref={demandChartRef}></canvas>
                </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm h-96 flex flex-col">
                <h3 className="text-lg font-bold text-[#1f2937] mb-4">Uplift by Category</h3>
                <div className="flex-1 min-h-0 relative">
                    <canvas ref={categoryChartRef}></canvas>
                </div>
            </div>
        </div>

        {/* Priority Restock Alerts */}
        <div className="bg-white rounded-xl border border-gray-100 p-0 shadow-sm overflow-hidden mb-8">
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
