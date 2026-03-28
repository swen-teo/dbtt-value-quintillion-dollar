import { useState, useEffect } from 'react';
import { Package, MapPin, Calendar, CheckCircle, Clock, XCircle, RefreshCcw } from 'lucide-react';
import { useProducts } from '../hooks/useData';
import { supabase } from '../lib/supabaseClient';

export default function OrderTracking() {
  const [orders, setOrders] = useState<any[]>([]);
  const { products } = useProducts();

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    const customerId = sessionStorage.getItem('customerId');
    if (!customerId) return;

    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('customer_id', customerId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        const mappedOrders = data.map(order => ({
          ...order,
          id: order.id,
          createdAt: order.created_at,
          totalAmount: order.total_amount,
          status: order.status,
          pickupLocation: order.pickup_location,
          pickupType: order.pickup_type,
          pickupDate: order.pickup_date,
          // Since OrderTracking seems to expect items as part of the order object in the render 
          // but doesn't fetch them here originally, I'll fetch them for completeness if needed 
          // or at least handle the mapping if it was stored in items before.
          // The current render uses order.items, which is not in the orders table directly.
          items: [] // Placeholder, adding proper fetch below
        }));

        // Fetch items for these orders
        const orderIds = mappedOrders.map(o => o.id);
        const { data: itemsData } = await supabase
          .from('order_items')
          .select('*')
          .in('order_id', orderIds);

        if (itemsData) {
          mappedOrders.forEach(order => {
            order.items = itemsData.filter(item => item.order_id === order.id).map(item => ({
              product: { id: item.product_id },
              quantity: item.quantity
            }));
          });
        }

        setOrders(mappedOrders);
      }
    } catch (error: any) {
      console.error('Error loading orders from Supabase:', error);
      alert('Unable to load orders from Supabase. Falling back to local data. Error: ' + error.message);
      const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      setOrders(savedOrders);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-orange-100 text-orange-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'preparing': // Order Preparing
        return 'bg-purple-100 text-purple-800';
      case 'ready':
        return 'bg-green-100 text-green-800';
      case 'collected':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5" />;
      case 'confirmed':
        return <CheckCircle className="w-5 h-5" />;
      case 'preparing':
        return <Package className="w-5 h-5" />;
      case 'ready':
        return <MapPin className="w-5 h-5" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5" />;
      default:
        return <Package className="w-5 h-5" />;
    }
  };

  if (orders.length === 0) {
    return (
      <div className="bg-white min-h-screen">
        <div className="max-w-[1200px] mx-auto p-8">
          <h1 className="font-bold text-3xl text-[#101828] mb-8">Order Tracking</h1>
          <div className="text-center py-16">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-500 mb-2">No orders yet</p>
            <p className="text-gray-400">Your order history will appear here</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-[1200px] mx-auto p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-bold text-3xl text-[#101828]">Order Tracking</h1>
          <button 
            onClick={loadOrders}
            className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-xl hover:bg-gray-50 transition-all font-bold text-[#101828] shadow-sm active:scale-95"
          >
            <RefreshCcw className="w-4 h-4 text-[#ff6900]" />
            Refresh Status
          </button>
        </div>

        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white border border-[#e5e7eb] rounded-lg overflow-hidden">
              {/* Order Header */}
              <div className="bg-gray-50 p-4 border-b border-[#e5e7eb]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-sm text-[#6a7282]">Order ID</p>
                      <p className="font-bold text-[#101828]">{order.id}</p>
                    </div>
                    <div className="h-8 w-px bg-gray-300" />
                    <div>
                      <p className="text-sm text-[#6a7282]">Order Date</p>
                      <p className="font-medium text-[#101828]">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="h-8 w-px bg-gray-300" />
                    <div>
                      <p className="text-sm text-[#6a7282]">Total Amount</p>
                      <p className="font-bold text-[#ff6900]">${order.totalAmount.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    <span className="font-medium capitalize">{order.status}</span>
                  </div>
                </div>
              </div>

              {/* Order Details */}
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                  {/* Pickup Information */}
                  <div className="lg:col-span-2">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-[#ff6900] to-[#ff8534] rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-[#101828] mb-1">Pickup Location</p>
                        <p className="text-[#6a7282]">{order.pickupLocation}</p>
                        {order.pickupType === 'immediate' && (
                          <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
                            <CheckCircle className="w-4 h-4" />
                            Ready for immediate pickup
                          </p>
                        )}
                      </div>
                    </div>

                    {order.pickupType === 'scheduled' && (
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-[#155dfc] to-[#3b82f6] rounded-lg flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-bold text-[#101828] mb-1">Scheduled Pickup Date</p>
                          <p className="text-[#6a7282]">
                            {new Date(order.pickupDate).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Order Progress */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="font-bold text-[#101828] mb-3">Order Progress</p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-sm text-[#6a7282]">Order Placed</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          ['confirmed', 'preparing', 'ready', 'completed'].includes(order.status)
                            ? 'bg-green-500'
                            : 'bg-gray-300'
                        }`}>
                          <CheckCircle className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-sm text-[#6a7282]">Confirmed</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          ['preparing', 'ready', 'completed'].includes(order.status)
                            ? 'bg-green-500'
                            : 'bg-gray-300'
                        }`}>
                          <CheckCircle className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-sm text-[#6a7282]">Order Preparing</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          ['ready', 'collected', 'completed'].includes(order.status)
                            ? 'bg-green-500'
                            : 'bg-gray-300'
                        }`}>
                          <CheckCircle className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-sm text-[#6a7282]">Ready for Pickup</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          ['collected', 'completed'].includes(order.status)
                            ? 'bg-green-500'
                            : 'bg-gray-300'
                        }`}>
                          <CheckCircle className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-sm text-[#6a7282]">Collected</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <p className="font-bold text-[#101828] mb-3">Order Items</p>
                  <div className="space-y-2">
                    {order.items.map((item: any) => {
                      const product = products.find((p) => p.id === item.product.id);
                      if (!product) return null;
                      
                      return (
                        <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <img 
                              src={product.image} 
                              alt={product.name} 
                              className="w-12 h-12 object-contain"
                            />
                            <div>
                              <p className="font-medium text-[#101828]">{product.name}</p>
                              <p className="text-sm text-[#6a7282]">Qty: {item.quantity}</p>
                            </div>
                          </div>
                          <p className="font-medium text-[#101828]">
                            ${(product.cashPrice * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}