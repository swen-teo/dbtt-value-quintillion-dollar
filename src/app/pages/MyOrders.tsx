import { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Package, MapPin, X, ArrowRight, CreditCard, Shield, RefreshCcw } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

export default function MyOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [lastOrder, setLastOrder] = useState<any>(null);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    const customerId = sessionStorage.getItem('customerId');
    if (!customerId) return;

    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*, order_items(*, products(*))')
        .eq('customer_id', customerId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        const mappedOrders = data.map(order => ({
          ...order,
          createdAt: order.created_at,
          total: order.total_amount,
          items: order.order_items.map((item: any) => ({
            ...item,
            product: item.products,
            quantity: item.quantity
          }))
        }));
        setOrders(mappedOrders);
        setLastOrder(mappedOrders[0]);
      }
    } catch (err: any) {
      console.error("Error loading orders from Supabase:", err);
      alert("Unable to load orders from Supabase. Falling back to local data. Error: " + err.message);
      // Fallback to localStorage if needed
      const allOrdersStr = localStorage.getItem('allOrders');
      if (allOrdersStr) {
        const all = JSON.parse(allOrdersStr);
        const sorted = [...all].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setOrders(sorted);
        setLastOrder(sorted[0]);
      }
    }
  };

  const markAsCollected = async (orderId: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: 'collected' })
        .eq('id', orderId);

      if (error) throw error;

      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'collected' } : o));
      if (lastOrder?.id === orderId) {
        setLastOrder({ ...lastOrder, status: 'collected' });
      }
      alert('Order marked as Collected! Admin will finalize the order shortly.');
    } catch (err: any) {
      console.error("Error marking order as collected:", err);
      alert("Failed to update status: " + err.message);
    }
  };

  const stats = [
    { label: 'TOTAL ORDERS', value: orders.length.toString(), subtitle: 'Since Mar 2026', color: 'border-blue-200 bg-blue-50' },
    { label: 'PENDING', value: orders.filter(o => o.status === 'pending').length.toString(), subtitle: 'Awaiting confirmation', color: 'border-orange-200 bg-orange-50' },
    { label: 'READY FOR PICKUP', value: orders.filter(o => o.status === 'ready').length.toString(), subtitle: 'Awaiting collection', color: 'border-purple-200 bg-purple-50' },
    { label: 'COLLECTED', value: orders.filter(o => ['collected', 'completed'].includes(o.status)).length.toString(), subtitle: '94.2% on schedule', color: 'border-green-200 bg-green-50' },
  ];

  const getStatusStep = (status: string): number => {
    switch(status.toLowerCase()) {
      case 'pending': return 1;
      case 'confirmed': return 2;
      case 'preparing': return 3;
      case 'ready': return 4;
      case 'collected': 
      case 'completed': return 5;
      case 'cancelled': return -1;
      default: return 1;
    }
  };

  const currentStep = lastOrder ? getStatusStep(lastOrder.status) : 0;

  const orderProgress = [
    { step: 1, label: 'Placed', status: currentStep >= 1 ? 'completed' : 'upcoming' },
    { step: 2, label: 'Confirmed', status: currentStep >= 2 ? 'completed' : currentStep === 1 ? 'active' : 'upcoming' },
    { step: 3, label: 'Order Preparing', status: currentStep >= 3 ? 'completed' : currentStep === 2 ? 'active' : 'upcoming' },
    { step: 4, label: 'Ready', status: currentStep >= 4 ? 'completed' : currentStep === 3 ? 'active' : 'upcoming' },
    { step: 5, label: 'Collected', status: currentStep >= 5 ? 'completed' : currentStep === 4 ? 'active' : 'upcoming' },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-orange-50 min-h-screen">
      <div className="max-w-[1400px] mx-auto p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h1 className="font-bold text-3xl text-[#101828]">My Orders</h1>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <button 
              onClick={loadOrders}
              className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-xl hover:bg-gray-50 transition-all font-bold text-[#101828] shadow-sm active:scale-95"
            >
              <RefreshCcw className="w-4 h-4 text-[#ff6900]" />
              Refresh Status
            </button>
            <div className="h-4 w-px bg-gray-300 mx-1" />
            <Calendar className="w-4 h-4" />
            <span>{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className={`border-2 ${stat.color} rounded-2xl p-6`}>
              <p className="text-xs font-bold text-gray-600 mb-2 uppercase tracking-wide">{stat.label}</p>
              <p className="text-4xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.subtitle}</p>
            </div>
          ))}
        </div>

        {/* Latest Order */}
        <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 mb-8 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Latest Order — {lastOrder?.id || 'NO ACTIVE ORDER'}</h2>
              <p className="text-sm text-gray-600">
                {lastOrder ? `${lastOrder.items?.length || 0} items · $${(lastOrder.total ?? 0).toFixed(2)} · Placed ${new Date(lastOrder.createdAt).toLocaleDateString()}` : 'Please place an order to see its status.'}
              </p>
            </div>
            <span className={`${
              lastOrder?.status === 'completed' ? 'bg-green-100 text-green-700' :
              lastOrder?.status === 'collected' ? 'bg-blue-100 text-blue-700' :
              lastOrder?.status === 'ready' ? 'bg-purple-100 text-purple-700' :
              lastOrder?.status === 'preparing' ? 'bg-blue-100 text-blue-700' :
              lastOrder?.status === 'cancelled' ? 'bg-red-100 text-red-700' :
              'bg-orange-100 text-orange-700'
            } px-4 py-2 rounded-xl font-bold text-sm capitalize`}>
              {lastOrder?.status === 'completed' || lastOrder?.status === 'collected' ? 'Collected' : 
               lastOrder?.status === 'ready' ? 'Ready For Pickup' : 
               lastOrder?.status === 'preparing' ? 'Order Preparing' : 
               lastOrder?.status || 'No Order'}
            </span>
          </div>

          {/* Progress Timeline */}
          <div className="relative">
            <div className="flex items-center justify-between">
              {orderProgress.map((step, index) => (
                <div key={index} className="flex flex-col items-center relative z-10">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold mb-2 ${
                      step.status === 'completed'
                        ? 'bg-green-600 text-white'
                        : step.status === 'active'
                        ? 'bg-[#ff6900] text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {step.step}
                  </div>
                  <p className="text-sm font-semibold text-gray-700">{step.label}</p>
                </div>
              ))}
            </div>
            {/* Progress Line */}
            <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200 -z-0">
              <div 
                className="h-full bg-green-600 transition-all duration-700 ease-out shadow-[0_0_10px_rgba(22,163,74,0.5)]" 
                style={{ width: `${currentStep > 0 ? (Math.max(0, currentStep - 1) / 4) * 100 : 0}%` }} 
              />
            </div>
          </div>
        </div>

        {/* Active Orders */}
        <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 mb-8 shadow-lg">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Active Orders</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-100">
                  <th className="text-left py-4 px-4 text-xs font-bold text-gray-600 uppercase tracking-wide">ORDER ID</th>
                  <th className="text-left py-4 px-4 text-xs font-bold text-gray-600 uppercase tracking-wide">DATE</th>
                  <th className="text-left py-4 px-4 text-xs font-bold text-gray-600 uppercase tracking-wide">ITEMS</th>
                  <th className="text-left py-4 px-4 text-xs font-bold text-gray-600 uppercase tracking-wide">TOTAL</th>
                  <th className="text-left py-4 px-4 text-xs font-bold text-gray-600 uppercase tracking-wide">STATUS</th>
                  <th className="text-left py-4 px-4 text-xs font-bold text-gray-600 uppercase tracking-wide">PICKUP BY</th>
                  <th className="text-left py-4 px-4 text-xs font-bold text-gray-600 uppercase tracking-wide">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? orders.map((order, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4 font-bold text-gray-900">{order.id}</td>
                    <td className="py-4 px-4 text-gray-700">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="py-4 px-4 text-gray-700">{order.items.length} Items</td>
                    <td className="py-4 px-4 font-bold text-gray-900">${(order.total ?? 0).toFixed(2)}</td>
                    <td className="py-4 px-4">
                      <span className={`${
                        order.status === 'completed' ? 'bg-green-100 text-green-700' : 
                        order.status === 'collected' ? 'bg-blue-100 text-blue-700' :
                        order.status === 'ready' ? 'bg-purple-100 text-purple-700' :
                        order.status === 'preparing' ? 'bg-blue-100 text-blue-700' :
                        'bg-orange-100 text-orange-700'
                      } px-3 py-1 rounded-full font-semibold text-sm capitalize`}>
                        {order.status === 'completed' || order.status === 'collected' ? 'Collected' : 
                         order.status === 'ready' ? 'Ready For Pickup' : 
                         order.status === 'preparing' ? 'Order Preparing' : 
                         order.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-700">{order.pickupDate || '—'}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => setSelectedOrder(order)}
                          className="bg-white border-2 border-gray-200 text-gray-700 px-4 py-2 rounded-xl font-bold text-sm hover:border-[#ff6900] hover:text-[#ff6900] transition-all"
                        >
                          View
                        </button>
                        {order.status === 'ready' && (
                          <button 
                            onClick={() => {
                              if(confirm('Are you at the store and ready to mark this as collected?')) {
                                markAsCollected(order.id);
                              }
                            }}
                            className="bg-green-600 text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-green-700 transition-all border-2 border-green-600 shadow-sm whitespace-nowrap"
                          >
                            Collect Now
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-gray-500 font-medium">No active orders found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order History */}
        <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Order History</h2>
            <div className="text-sm text-gray-500 font-medium italic">Latest business transactions</div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-100">
                  <th className="text-left py-4 px-4 text-xs font-bold text-gray-600 uppercase tracking-wide">ORDER ID</th>
                  <th className="text-left py-4 px-4 text-xs font-bold text-gray-600 uppercase tracking-wide">DATE</th>
                  <th className="text-left py-4 px-4 text-xs font-bold text-gray-600 uppercase tracking-wide">ITEMS</th>
                  <th className="text-left py-4 px-4 text-xs font-bold text-gray-600 uppercase tracking-wide">TOTAL</th>
                  <th className="text-left py-4 px-4 text-xs font-bold text-gray-600 uppercase tracking-wide">STATUS</th>
                  <th className="text-left py-4 px-4 text-xs font-bold text-gray-600 uppercase tracking-wide">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? orders.map((order, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4 font-bold text-gray-900">{order.id}</td>
                    <td className="py-4 px-4 text-gray-700">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="py-4 px-4 text-gray-700">{order.items.length} Items</td>
                    <td className="py-4 px-4 font-bold text-gray-900">${(order.total ?? 0).toFixed(2)}</td>
                    <td className="py-4 px-4">
                      <span className={`${
                        order.status === 'Collected' ? 'bg-green-100 text-green-700' : 
                        order.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                        'bg-gray-100 text-gray-600'
                      } px-3 py-1 rounded-full font-semibold text-sm`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <button 
                        onClick={() => setSelectedOrder(order)}
                        className="text-[#ff6900] font-bold text-sm hover:underline"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-gray-500 font-medium">No order history available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-300">
          <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 text-white flex items-center justify-between">
              <div>
                <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">Detailed View</p>
                <h3 className="text-2xl font-bold tracking-tight">{selectedOrder.id}</h3>
              </div>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="p-2 hover:bg-white/10 rounded-full transition-all group"
              >
                <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
              </button>
            </div>

            <div className="p-8 max-h-[75vh] overflow-y-auto">
              {/* Summary Header */}
              <div className="flex items-center justify-between mb-8 pb-6 border-b-2 border-gray-100">
                 <div>
                   <p className="text-sm text-gray-500 mb-1">Status</p>
                   <span className="bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full font-bold text-sm inline-flex items-center gap-2">
                     <Package className="w-4 h-4" />
                     Processing
                   </span>
                 </div>
                 <div className="text-right">
                    <p className="text-sm text-gray-500 mb-1 font-medium">Transaction Total</p>
                    <p className="text-4xl font-black text-gray-900 tracking-tight">${(selectedOrder.total ?? 0).toFixed(2)}</p>
                 </div>
              </div>

              {/* Items List */}
              <div className="space-y-6 mb-8">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Order Items</h4>
                  <span className="text-gray-400 text-xs font-bold">{selectedOrder.items.length} Product(s)</span>
                </div>
                <div className="space-y-3">
                  {selectedOrder.items.map((item: any, idx: number) => (
                    <div key={idx} className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100 hover:border-gray-200 transition-colors">
                       <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-gray-200 shadow-sm">
                          <Package className="w-6 h-6 text-[#ff6900]" />
                       </div>
                       <div className="flex-1">
                          <p className="font-bold text-gray-900 leading-tight">{item.product?.name || 'Unknown Product'}</p>
                          <p className="text-xs text-gray-500 mt-1 font-medium">Quantity: {item.quantity}</p>
                       </div>
                       <p className="font-black text-gray-900 text-lg">
                          ${((
                            selectedOrder.paymentMethod === 'bnpl' 
                              ? (item.product?.bnplPrice ?? item.product?.cashPrice ?? item.product?.price ?? item.price ?? 0)
                              : (item.product?.cashPrice ?? item.product?.price ?? item.product?.bnplPrice ?? item.price ?? 0)
                          ) * (item.quantity ?? 1)).toFixed(2)}
                       </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pickup & Payment Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="bg-indigo-50/50 p-5 rounded-2xl border border-indigo-100">
                    <div className="flex items-center gap-2 text-indigo-700 mb-3">
                       <MapPin className="w-4 h-4" />
                       <span className="text-[10px] font-black uppercase tracking-widest">Pickup Location</span>
                    </div>
                    <p className="font-bold text-gray-900 text-sm leading-tight mb-2">{selectedOrder.pickupLocation}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                      <Calendar className="w-3.5 h-3.5" />
                      {selectedOrder.pickupDate}
                    </div>
                 </div>
                 <div className="bg-[#00b14f]/5 p-5 rounded-2xl border border-[#00b14f]/20">
                    <div className="flex items-center gap-2 text-[#00b14f] mb-3">
                       <CreditCard className="w-4 h-4" />
                       <span className="text-[10px] font-black uppercase tracking-widest">Payment Method</span>
                    </div>
                    <p className="font-bold text-gray-900 text-sm mb-2">
                       {selectedOrder.paymentMethod === 'bnpl' ? 'Grab Pay Later (4x)' : 'Credit / Debit Card'}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-[#00b14f] font-bold">
                       <Shield className="w-3.5 h-3.5" />
                       Auth Code: 49X{selectedOrder.id.split('-')[1]}
                    </div>
                 </div>
              </div>
            </div>

            <div className="p-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
               <div className="flex items-center gap-2 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                 <Shield className="w-4 h-4 text-[#00b14f]" />
                 Secure Transaction Verified
               </div>
               <button 
                 onClick={() => setSelectedOrder(null)}
                 className="bg-gray-900 text-white px-10 py-3.5 rounded-2xl font-bold hover:bg-gray-800 hover:shadow-2xl transition-all shadow-lg"
               >
                 Close Details
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
