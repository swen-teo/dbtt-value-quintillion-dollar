import { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Package, 
  CheckCircle2, 
  XCircle, 
  Eye, 
  Download, 
  Activity, 
  Clock, 
  ShoppingBag, 
  CheckCircle,
  AlertCircle,
  ArrowRight,
  TrendingUp,
  LayoutDashboard
} from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';

export default function OrderManagement() {
  const [orders, setOrders] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        setOrders(data.map(order => ({
          ...order,
          customerName: order.customer_name,
          shopName: order.shop_name,
          pickupType: order.pickup_type,
          pickupLocation: order.pickup_location,
          totalAmount: order.total_amount,
          status: order.status,
          pickupDate: order.pickup_date,
          createdAt: order.created_at
        })));
      }
    } catch (error: any) {
      console.error('Error loading orders:', error);
      const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      setOrders(savedOrders);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;

      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    } catch (error: any) {
      console.error('Error updating status:', error);
    }
  };

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
       // Mock export logic...
       setIsExporting(false);
    }, 1500);
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.shopName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    { label: 'Total Orders', value: orders.length, icon: ShoppingBag, color: 'text-slate-900', bg: 'bg-slate-100' },
    { label: 'Pending', value: orders.filter(o => o.status === 'pending').length, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Confirmed', value: orders.filter(o => o.status === 'confirmed').length, icon: CheckCircle2, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Preparing', value: orders.filter(o => o.status === 'preparing').length, icon: Activity, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Ready', value: orders.filter(o => o.status === 'ready').length, icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Collected', value: orders.filter(o => o.status === 'collected').length, icon: ShoppingBag, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  ];

  return (
    <div className="h-screen flex flex-col bg-[#faf9f6] overflow-hidden">
      {/* Page Header (Compact) */}
      <div className="px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="font-black text-2xl text-slate-900 tracking-tight flex items-center gap-2">
            <LayoutDashboard className="w-6 h-6 text-[#ff6900]" />
            Order Management
          </h1>
          <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest leading-none mt-1">Real-time Order Operations</p>
        </div>
        <button 
          onClick={handleExport}
          disabled={isExporting}
          className="h-9 px-5 bg-white border border-slate-200 text-slate-900 rounded-[10px] font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 hover:shadow-sm transition-all flex items-center gap-2 disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          {isExporting ? 'Exporting...' : 'Export'}
        </button>
      </div>

      <div className="flex-1 overflow-hidden px-6 pb-6 flex flex-col gap-3">
        {/* KPI Dashboard (Top Row) */}
        <div className="grid grid-cols-6 gap-3">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white border border-slate-200/60 rounded-[18px] p-3 shadow-sm flex items-center gap-3">
              <div className={`w-8 h-8 ${stat.bg} ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider leading-none">{stat.label}</p>
                <p className={`text-lg font-black ${stat.color} leading-none mt-1`}>{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* High-Density Filters */}
        <div className="bg-white border border-slate-200/60 rounded-[18px] p-2 px-3 shadow-sm flex items-center gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              placeholder="Search ID or Shop..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 pl-10 pr-4 bg-slate-50 border border-slate-100 rounded-[10px] font-bold text-xs focus:ring-2 focus:ring-[#ff6900]/20 outline-none transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
             <Filter className="w-4 h-4 text-slate-400" />
             <select
               value={statusFilter}
               onChange={(e) => setStatusFilter(e.target.value)}
               className="h-9 px-4 bg-slate-50 border border-slate-100 rounded-[10px] font-black text-[10px] uppercase tracking-widest text-slate-600 focus:ring-2 focus:ring-[#ff6900]/20 outline-none"
             >
               <option value="all">All Status</option>
               <option value="pending">Pending</option>
               <option value="confirmed">Confirmed</option>
               <option value="preparing">Preparing</option>
               <option value="ready">Ready</option>
               <option value="collected">Collected</option>
               <option value="completed">Completed</option>
             </select>
          </div>
        </div>

        {/* Table Container (Locked Height, Internal Scroll) */}
        <div className="flex-1 bg-white border border-slate-200/60 rounded-[24px] shadow-sm flex flex-col overflow-hidden">
          <div className="bg-slate-50/80 px-6 py-3 border-b border-slate-100 grid grid-cols-[140px_1fr_120px_140px_100px_100px_160px] gap-4 items-center">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Order ID</p>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer / Shop</p>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Type</p>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Location</p>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Total</p>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</p>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-right pr-2">Action</p>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-50 custom-scrollbar">
            {filteredOrders.map((order) => (
              <div key={order.id} className="px-6 py-2.5 hover:bg-slate-50/80 transition-all grid grid-cols-[140px_1fr_120px_140px_100px_100px_160px] gap-4 items-center group">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 group-hover:bg-white transition-colors">
                    <Package className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-xs font-black text-slate-900 tracking-tight">{order.id.slice(0, 12)}...</span>
                </div>

                <div className="min-w-0">
                  <p className="font-bold text-slate-900 text-sm truncate">{order.shopName || 'Unknown Shop'}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider truncate">{order.customerName}</p>
                </div>

                <div>
                   <span className={`px-2 py-0.5 rounded-[6px] font-black text-[9px] uppercase tracking-widest border ${
                    order.pickupType === 'immediate' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                  }`}>
                    {order.pickupType}
                  </span>
                </div>

                <p className="text-[10px] font-bold text-slate-500 leading-tight uppercase truncate">{order.pickupLocation}</p>

                <p className="font-black text-xs text-slate-900 text-right font-mono">${order.totalAmount?.toFixed(2)}</p>

                <div className="flex justify-center">
                   <div className={`w-2.5 h-2.5 rounded-full ${order.status === 'ready' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-slate-300'}`}></div>
                </div>

                <div className="flex justify-end pr-1">
                   {order.status === 'pending' && (
                     <button onClick={() => updateOrderStatus(order.id, 'confirmed')} className="h-8 w-full bg-blue-50 text-blue-600 border border-blue-100 rounded-[8px] font-black text-[9px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">Confirm</button>
                   )}
                   {order.status === 'confirmed' && (
                     <button onClick={() => updateOrderStatus(order.id, 'preparing')} className="h-8 w-full bg-purple-50 text-purple-600 border border-purple-100 rounded-[8px] font-black text-[9px] uppercase tracking-widest hover:bg-purple-600 hover:text-white transition-all">Start Prep</button>
                   )}
                   {order.status === 'preparing' && (
                     <button onClick={() => updateOrderStatus(order.id, 'ready')} className="h-8 w-full bg-orange-50 text-[#ff6900] border border-orange-100 rounded-[8px] font-black text-[9px] uppercase tracking-widest hover:bg-[#ff6900] hover:text-white transition-all">Mark Ready</button>
                   )}
                   {order.status === 'ready' && (
                     <span className="text-[8px] font-black text-slate-300 uppercase italic">Awaiting Pickup</span>
                   )}
                   {order.status === 'collected' && (
                     <button onClick={() => updateOrderStatus(order.id, 'completed')} className="h-8 w-full bg-emerald-600 text-white rounded-[8px] font-black text-[9px] uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-sm">Complete</button>
                   )}
                   {(order.status === 'completed' || order.status === 'cancelled') && (
                     <span className="text-[9px] font-black uppercase text-slate-300 tracking-widest">{order.status}</span>
                   )}
                </div>
              </div>
            ))}
          </div>

          {filteredOrders.length === 0 && (
            <div className="flex-1 flex flex-col items-center justify-center bg-slate-50/50">
              <Package className="w-12 h-12 text-slate-200 mb-4" />
              <p className="text-slate-400 font-bold text-sm tracking-widest uppercase">No Active Orders</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}