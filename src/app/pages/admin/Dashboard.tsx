import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Package, Truck, ClipboardList, TrendingUp, AlertCircle, RefreshCw, ShoppingCart, Activity, CheckCircle, Download } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const navigate = useNavigate();
  const [isSyncing, setIsSyncing] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsSyncing(false), 2200);
    return () => clearTimeout(timer);
  }, []);
  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 2200);
  };

  const priorityRestocks = [
    { name: 'Jasmine Green Tea', stock: 120, forecast: '+75%', status: 'Urgent' },
    { name: 'Omega 6 Eggs', stock: 45, forecast: '+42%', status: 'Warning' }
  ];

  const handleExportReport = () => {
    const rows = [
      ['Product', 'Current Stock', 'Forecast Demand (7 days)', 'Action'],
      ...priorityRestocks.map(item => [item.name, item.stock, item.forecast, item.status])
    ];
    const csv = rows.map(r => r.join(',')).join('\\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'valu-report.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const chartData = [
    { name: 'Rice 25kg Premium', value: 4892, fill: '#ff6900' },
    { name: 'Cooking Oil 5L', value: 3621, fill: '#ff8534' },
    { name: 'Canned sardines', value: 2482, fill: '#ffb366' },
    { name: 'Sugar 1kg Bundle', value: 1684, fill: '#ffc999' },
    { name: 'Instant Noodles ...', value: 1423, fill: '#ffd9b3' },
    { name: 'Soy Sauce 1L', value: 892, fill: '#ffe6cc' },
  ];

  const mockTrafficData = [
    { day: 'Mon', orders: 120, deliveries: 45 },
    { day: 'Tue', orders: 132, deliveries: 58 },
    { day: 'Wed', orders: 101, deliveries: 42 },
    { day: 'Thu', orders: 145, deliveries: 65 },
    { day: 'Fri', orders: 180, deliveries: 88 },
    { day: 'Sat', orders: 210, deliveries: 105 },
    { day: 'Sun', orders: 160, deliveries: 70 },
  ];

  return (
    <div className="min-h-screen bg-[#f9f4ea] relative font-sans">
      {/* Premium Loading Overlay */}
      {isSyncing && (
        <div className="fixed inset-0 z-50 bg-[#1b2a4a] flex flex-col items-center justify-center transition-opacity duration-1000">
           <div className="relative">
              <div className="w-24 h-24 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="font-bold text-white text-xl">V$</p>
              </div>
           </div>
           <h2 className="text-white font-bold text-2xl mt-8 animate-pulse">Synchronizing HQ Operations...</h2>
           <p className="text-blue-300 mt-2">Connecting to Valu$ Multi-Store Data Engine</p>
        </div>
      )}

      <div className={`p-8 transition-all duration-1000 ${isSyncing ? 'opacity-0 scale-95 blur-lg' : 'opacity-100 scale-100 blur-0'}`}>
      {/* Header */}
      <div className="mb-8 flex justify-between items-end">
        <div>
            <h1 className="font-bold text-3xl text-[#1b2a4a] mb-2">Headquarters Dashboard</h1>
            <p className="text-[#6b7280]">Real-time operational overview for all Valu$ wholesale facilities.</p>
        </div>
        <div className="flex gap-4">
            <button onClick={handleExportReport} className="bg-white text-[#1b2a4a] border-2 border-gray-200 font-bold px-6 py-2.5 rounded-xl hover:bg-gray-50 flex items-center gap-2">
                <Download className="w-5 h-5" />
                Export Report
            </button>
            <button onClick={handleSync} className="bg-white text-[#1b2a4a] border-2 border-gray-200 font-bold px-6 py-2.5 rounded-xl hover:bg-gray-50 flex items-center gap-2">
                <RefreshCw className={`w-5 h-5 ${isSyncing ? 'animate-spin' : ''}`} />
                {isSyncing ? 'Syncing...' : 'Sync Operations'}
            </button>
            <button 
                onClick={() => navigate('/admin/catalog/forecasting')}
                className="bg-gradient-to-r from-[#ff6900] to-[#ff8534] text-white font-bold px-6 py-2.5 rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
            >
                <Activity className="w-5 h-5" />
                Forecasting Engine
            </button>
        </div>
      </div>

      {/* Primary KPI Row */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="absolute -bottom-6 -right-6 opacity-[0.03] text-[#1b2a4a]"><ClipboardList className="w-32 h-32" /></div>
          <p className="font-semibold text-sm text-gray-500 mb-2 uppercase tracking-wide">Orders Placed (MTD)</p>
          <p className="font-extrabold text-4xl text-[#1b2a4a] mb-2">1,267</p>
          <div className="flex items-center gap-2 text-green-600">
            <TrendingUp className="w-4 h-4" />
            <p className="font-bold text-sm">+14% vs last month</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="absolute -bottom-6 -right-6 opacity-[0.03] text-[#1b2a4a]"><Package className="w-32 h-32" /></div>
          <p className="font-semibold text-sm text-gray-500 mb-2 uppercase tracking-wide">Global Stock Level</p>
          <p className="font-extrabold text-4xl text-[#1b2a4a] mb-2">452K</p>
          <div className="flex items-center gap-2 text-green-600">
            <TrendingUp className="w-4 h-4" />
            <p className="font-bold text-sm">Healthy threshold</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="absolute -bottom-6 -right-6 opacity-[0.03] text-[#1b2a4a]"><Truck className="w-32 h-32" /></div>
          <p className="font-semibold text-sm text-gray-500 mb-2 uppercase tracking-wide">Upcoming Deliveries</p>
          <p className="font-extrabold text-4xl text-[#ff6900] mb-2">184</p>
          <p className="font-bold text-sm text-gray-500">Scheduled for next 48 hours</p>
        </div>

        <div className="bg-[#1b2a4a] rounded-2xl p-6 shadow-md border border-[#273a61] relative overflow-hidden">
          <div className="absolute -bottom-6 -right-6 opacity-[0.05] text-white"><AlertCircle className="w-32 h-32" /></div>
          <p className="font-semibold text-sm text-blue-200 mb-2 uppercase tracking-wide">AI Forecast Alerts</p>
          <p className="font-extrabold text-4xl text-white mb-2">23</p>
          <p className="font-bold text-sm text-[#ff8534]">Products require drafting PO</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Column */}
        <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="font-bold text-xl text-[#1b2a4a]">Order vs Delivery Traffic</h3>
                        <p className="text-sm text-gray-500">Weekly logistics throughput across all zones</p>
                    </div>
                </div>
                <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={mockTrafficData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#1b2a4a" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#1b2a4a" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorDeliveries" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ff6900" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#ff6900" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                            <XAxis dataKey="day" stroke="#9CA3AF" tick={{fill: '#6B7280', fontWeight: 600}} axisLine={false} tickLine={false} />
                            <YAxis stroke="#9CA3AF" tick={{fill: '#6B7280', fontWeight: 600}} axisLine={false} tickLine={false} />
                            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                            <Area type="monotone" dataKey="orders" stroke="#1b2a4a" strokeWidth={3} fillOpacity={1} fill="url(#colorOrders)" name="Orders Placed" />
                            <Area type="monotone" dataKey="deliveries" stroke="#ff6900" strokeWidth={3} fillOpacity={1} fill="url(#colorDeliveries)" name="Deliveries Handled" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
            
            {/* Quick Actions Bar */}
            <div className="grid grid-cols-4 gap-4">
                <button onClick={() => navigate('/admin/orders')} className="bg-white border-2 border-gray-100 p-4 rounded-xl font-bold text-[#1b2a4a] hover:border-[#1b2a4a] hover:shadow-md transition-all flex flex-col items-center gap-2">
                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600"><ShoppingCart className="w-6 h-6" /></div>
                    Process Inbound
                </button>
                <button onClick={() => navigate('/admin/pickup-scheduling')} className="bg-white border-2 border-gray-100 p-4 rounded-xl font-bold text-[#1b2a4a] hover:border-[#1b2a4a] hover:shadow-md transition-all flex flex-col items-center gap-2">
                    <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center text-[#ff6900]"><Truck className="w-6 h-6" /></div>
                    Dispatch Routes
                </button>
                <button onClick={() => navigate('/admin/catalog')} className="bg-white border-2 border-gray-100 p-4 rounded-xl font-bold text-[#1b2a4a] hover:border-[#1b2a4a] hover:shadow-md transition-all flex flex-col items-center gap-2">
                    <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600"><Package className="w-6 h-6" /></div>
                    Catalog Config
                </button>
                <button onClick={() => navigate('/admin/catalog/forecasting')} className="bg-white border-2 border-gray-100 p-4 rounded-xl font-bold text-[#1b2a4a] hover:border-[#ff6900] hover:shadow-md transition-all flex flex-col items-center gap-2">
                    <div className="w-12 h-12 bg-[#fff1e6] rounded-full flex items-center justify-center text-[#ff6900]"><TrendingUp className="w-6 h-6" /></div>
                    Smart Ordering
                </button>
            </div>
        </div>

        {/* Right Sidebar List */}
        <div className="space-y-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-lg text-[#1b2a4a] mb-5">Latest Orders Placed</h3>
                <div className="space-y-4">
                    {[
                        { id: 'ORD-9982', time: '10 mins ago', val: '$4,250', status: 'Pending Route', icon: <ShoppingCart className="w-5 h-5"/> },
                        { id: 'ORD-9981', time: '45 mins ago', val: '$1,890', status: 'Queued', icon: <ShoppingCart className="w-5 h-5"/> },
                        { id: 'ORD-9980', time: '1 hour ago', val: '$8,400', status: 'Dispatching', icon: <Truck className="w-5 h-5"/> },
                        { id: 'ORD-9979', time: '2 hours ago', val: '$3,120', status: 'Delivered', icon: <CheckCircle className="w-5 h-5 text-green-500"/> },
                    ].map((tx) => (
                        <div key={tx.id} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                                    {tx.icon}
                                </div>
                                <div>
                                    <p className="font-bold text-[#1b2a4a] text-sm">{tx.id}</p>
                                    <p className="text-xs text-gray-400">{tx.time}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-gray-900 text-sm">{tx.val}</p>
                                <p className="text-xs font-semibold text-blue-500">{tx.status}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <button onClick={() => navigate('/admin/orders')} className="w-full mt-4 py-3 bg-gray-50 text-gray-600 font-bold text-sm rounded-xl hover:bg-gray-100 transition-colors">
                    View All Orders
                </button>
            </div>

            <div className="bg-gradient-to-br from-[#1b2a4a] to-[#2a3f70] rounded-2xl p-6 shadow-xl text-white">
                <h3 className="font-bold text-xl mb-4">Urgent Forecasts</h3>
                <p className="text-gray-300 text-sm mb-6 pb-6 border-b border-white/10">The AI model has detected high probability inventory shortages in 3 locations requiring your immediate approval.</p>
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="font-bold text-white">Woodlands Hub</p>
                            <p className="text-xs text-orange-400">Jasmine Green Tea (Crit: 5 Days)</p>
                        </div>
                        <p className="font-bold text-xl">+75%</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="font-bold text-white">Jurong East</p>
                            <p className="text-xs text-orange-400">Omega 6 Eggs (Crit: 2 Days)</p>
                        </div>
                        <p className="font-bold text-xl">+42%</p>
                    </div>
                </div>
                <button 
                    onClick={() => navigate('/admin/catalog/forecasting')}
                    className="w-full mt-6 py-3 bg-[#ff6900] text-white font-bold text-sm rounded-xl shadow-[0_4px_14px_0_rgba(255,105,0,0.39)] hover:scale-[1.02] hover:shadow-[0_6px_20px_rgba(255,105,0,0.23)] transition-all"
                >
                    Review PO Drafts
                </button>
            </div>
        </div>
      </div>
      </div>
    </div>
  );
}