import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { Package, Clipboard, Truck, TrendingUp, FileText, History } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleExportReport = () => {
    const rows = [
      ['Product', 'Current Stock', 'Forecast Demand (7 days)', 'Action'],
      ...priorityRestocks.map(item => [item.name, item.stock, item.forecast, item.status])
    ];
    const csv = rows.map(r => r.join(',')).join('\n');
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

  const priorityRestocks = [
    { name: 'Cooking Oil 5L', stock: '165 units', forecast: '1,092 units', status: 'Draft PO', statusColor: 'text-[#ff6900]' },
    { name: 'Rice 25kg Premium', stock: '231 units', forecast: '850 units', status: 'Draft PO', statusColor: 'text-[#ff6900]' },
    { name: 'Instant Noodles Carton', stock: '203 units', forecast: '600 units', status: 'Auto-Order', statusColor: 'text-[#ff8534]' },
    { name: 'Flour 1kg Bundle', stock: '801 units', forecast: '400 units', status: 'Draft PO', statusColor: 'text-[#ff6900]' },
  ];

  return (
    <div className="min-h-screen bg-[#f9f4ea] p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-bold text-2xl text-[#1b2a4a]">Welcome back Valu$ 6767</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
          <p className="font-medium text-sm text-[#6b7280] mb-2">Total Revenue (MTD)</p>
          <p className="font-bold text-[28px] text-[#1b2a4a] mb-2">$1.67M</p>
          <div className="flex items-center gap-1 text-[#10b981]">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 13 13">
              <path d="M6.5 0L13 13H0L6.5 0Z" />
            </svg>
            <p className="font-medium text-xs">+67% vs last month</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
          <p className="font-medium text-sm text-[#6b7280] mb-2">Orders Today</p>
          <p className="font-bold text-[28px] text-[#1b2a4a] mb-2">1,267</p>
          <div className="flex items-center gap-1 text-[#10b981]">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 13 13">
              <path d="M6.5 0L13 13H0L6.5 0Z" />
            </svg>
            <p className="font-medium text-xs">+6.7% vs yesterday</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
          <p className="font-medium text-sm text-[#6b7280] mb-2">Items Sold</p>
          <p className="font-bold text-[28px] text-[#1b2a4a] mb-2">45,676</p>
          <div className="flex items-center gap-1 text-[#10b981]">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 13 13">
              <path d="M6.5 0L13 13H0L6.5 0Z" />
            </svg>
            <p className="font-medium text-xs">+4.2% vs last week</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-medium text-sm text-[#6b7280] mb-2">Low Stock Alerts</p>
              <p className="font-bold text-[28px] text-[#ef4444]">23 Items</p>
            </div>
            <div className="w-12 h-12 bg-[#fee2e2] rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-[#ef4444]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-[1fr_400px] gap-6 mb-8">
        {/* Top Selling Products Chart */}
        <div className="bg-white rounded-xl p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
          <div className="mb-6">
            <h3 className="font-bold text-lg text-[#1f2937] mb-1">Top Selling Products For This Month</h3>
            <p className="text-sm text-[#6b7280]">Last 30 days • Click legends for a refreshing forecast</p>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" stroke="#9ca3af" />
              <YAxis dataKey="name" type="category" width={150} stroke="#9ca3af" />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} />
              <Tooltip />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
          <h3 className="font-bold text-lg text-[#1f2937] mb-5">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => navigate('/admin/catalog')} className="flex flex-col items-center justify-center p-4 border border-[#e5e7eb] rounded-lg hover:border-[#ff6900] hover:bg-[#fff7ed] transition-colors">
              <Package className="w-8 h-8 text-[#ff6900] mb-2" />
              <p className="font-medium text-xs text-center text-[#1f2937]">New Product</p>
            </button>
            <button onClick={() => navigate('/admin/catalog/pricing')} className="flex flex-col items-center justify-center p-4 border border-[#e5e7eb] rounded-lg hover:border-[#ff6900] hover:bg-[#fff7ed] transition-colors">
              <Clipboard className="w-8 h-8 text-[#ff6900] mb-2" />
              <p className="font-medium text-xs text-center text-[#1f2937]">Update Pricing</p>
            </button>
            <button onClick={() => navigate('/admin/orders')} className="flex flex-col items-center justify-center p-4 border border-[#e5e7eb] rounded-lg hover:border-[#ff6900] hover:bg-[#fff7ed] transition-colors">
              <Truck className="w-8 h-8 text-[#ff6900] mb-2" />
              <p className="font-medium text-xs text-center text-[#1f2937]">Process Orders</p>
            </button>
            <button onClick={() => navigate('/admin/catalog/forecasting')} className="flex flex-col items-center justify-center p-4 border border-[#e5e7eb] rounded-lg hover:border-[#ff6900] hover:bg-[#fff7ed] transition-colors">
              <TrendingUp className="w-8 h-8 text-[#ff6900] mb-2" />
              <p className="font-medium text-xs text-center text-[#1f2937]">View Analytics</p>
            </button>
            <button onClick={handleExportReport} className="flex flex-col items-center justify-center p-4 border border-[#e5e7eb] rounded-lg hover:border-[#ff6900] hover:bg-[#fff7ed] transition-colors">
              <FileText className="w-8 h-8 text-[#ff6900] mb-2" />
              <p className="font-medium text-xs text-center text-[#1f2937]">Export Report</p>
            </button>
            <button onClick={() => navigate('/admin/orders')} className="flex flex-col items-center justify-center p-4 border border-[#e5e7eb] rounded-lg hover:border-[#ff6900] hover:bg-[#fff7ed] transition-colors">
              <History className="w-8 h-8 text-[#ff6900] mb-2" />
              <p className="font-medium text-xs text-center text-[#1f2937]">Order History</p>
            </button>
          </div>
        </div>
      </div>

      {/* AI Demand Forecast Section */}
      <div className="bg-gradient-to-br from-[#27286f] to-[#1e1f5a] rounded-2xl p-8 mb-8 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-bold text-2xl text-white mb-2">AI Demand Forecast</h2>
            <p className="text-base text-white/90">
              High-confidence spike expected during school holidays
            </p>
          </div>
          <button className="bg-white text-[#27286f] font-bold text-sm px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Generate Forecast
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/10 border border-white/20 rounded-xl p-4">
            <p className="font-bold text-3xl text-white mb-1">91%</p>
            <p className="text-sm text-white/80">Forecast confidence</p>
          </div>
          <div className="bg-white/10 border border-white/20 rounded-xl p-4">
            <p className="font-bold text-3xl text-white mb-1">+31%</p>
            <p className="text-sm text-white/80">Projected peak uplift</p>
          </div>
          <div className="bg-white/10 border border-white/20 rounded-xl p-4">
            <p className="font-bold text-3xl text-white mb-1">4</p>
            <p className="text-sm text-white/80">Suppliers to notify next</p>
          </div>
        </div>
      </div>

      {/* Priority Restock Alerts */}
      <div className="bg-white rounded-xl p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-lg text-[#1f2937]">Priority Restock Alerts</h3>
          <a href="/admin/catalog/forecasting" className="text-sm font-medium text-[#155dfc] hover:underline">
            View All (23)
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#e5e7eb]">
                <th className="text-left py-3 px-4 font-medium text-xs text-[#6b7280] uppercase">Product Name</th>
                <th className="text-left py-3 px-4 font-medium text-xs text-[#6b7280] uppercase">Current Stock</th>
                <th className="text-left py-3 px-4 font-medium text-xs text-[#6b7280] uppercase">Forecast Demand (7 days)</th>
                <th className="text-left py-3 px-4 font-medium text-xs text-[#6b7280] uppercase">Action</th>
              </tr>
            </thead>
            <tbody>
              {priorityRestocks.map((item, index) => (
                <tr key={index} className="border-b border-[#e5e7eb] hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <p className="font-medium text-sm text-[#1f2937]">{item.name}</p>
                  </td>
                  <td className="py-3 px-4">
                    <p className="text-sm text-[#ff6900] font-medium">{item.stock}</p>
                  </td>
                  <td className="py-3 px-4">
                    <p className="text-sm text-[#ff8534] font-medium">{item.forecast}</p>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`font-medium text-sm ${item.statusColor}`}>{item.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}