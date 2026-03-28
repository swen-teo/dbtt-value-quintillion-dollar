import { useState, useEffect } from 'react';
import { Search, Filter, Package, CheckCircle, XCircle, Eye, Download } from 'lucide-react';
import { products } from '../../data/mockData';
import { supabase } from '../../lib/supabaseClient';

export default function OrderManagement() {
  const [orders, setOrders] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      const rows = [
        ['Order ID', 'Customer', 'Shop', 'Pickup Type', 'Location', 'Total', 'Status'],
        ...filteredOrders.map(o => [o.id, o.customerName, o.shopName, o.pickupType, o.pickupLocation, o.totalAmount.toFixed(2), o.status])
      ];
      const csv = rows.map(r => r.join(',')).join('\\n');
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'orders-export.csv';
      a.click();
      URL.revokeObjectURL(url);
      setIsExporting(false);
    }, 1000);
  };


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
        const mappedOrders = data.map(order => ({
          ...order,
          id: order.id,
          customerName: order.customer_name,
          shopName: order.shop_name,
          pickupType: order.pickup_type,
          pickupLocation: order.pickup_location,
          totalAmount: order.total_amount,
          status: order.status,
          pickupDate: order.pickup_date,
          createdAt: order.created_at
        }));
        setOrders(mappedOrders);
      }
    } catch (error: any) {
      console.error('Error loading orders from Supabase:', error);
      alert('Unable to load orders from Supabase. Falling back to local data. Error: ' + error.message);
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

      if (error) {
        alert('Supabase update failed: ' + error.message);
        throw error;
      }

      const updatedOrders = orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      );
      setOrders(updatedOrders);
    } catch (error: any) {
      console.error('Error updating order status in Supabase:', error);
      alert('Error updating order status: ' + (error.message || 'Unknown error'));
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.shopName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'ready':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-[1400px] mx-auto p-8">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="font-bold text-3xl text-gray-900 mb-2">Order Management</h1>
            <p className="text-gray-600">Monitor and manage all customer orders</p>
          </div>
          <button 
            onClick={handleExport}
            disabled={isExporting}
            className={`font-bold px-6 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
              isExporting ? 'bg-gray-100 text-gray-400 cursor-wait' : 'bg-white text-[#1b2a4a] border-2 border-gray-200 hover:bg-gray-50'
            }`}
          >
            <Download className="w-5 h-5" />
            {isExporting ? 'Exporting...' : 'Export Orders'}
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search by order ID or customer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6900] focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6900] focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="ready">Ready</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Order ID</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Customer</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Pickup Type</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Location</th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-900">Total</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Status</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Package className="w-5 h-5 text-gray-400" />
                        <span className="font-medium text-gray-900">{order.id}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{order.shopName}</p>
                      <p className="text-sm text-gray-600">{order.customerName}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                        order.pickupType === 'immediate'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {order.pickupType === 'immediate' ? '⚡ Immediate' : '📅 Scheduled'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-900">{order.pickupLocation}</p>
                      {order.pickupType === 'scheduled' && (
                        <p className="text-xs text-gray-600">
                          {new Date(order.pickupDate).toLocaleDateString()}
                        </p>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="font-bold text-gray-900">${order.totalAmount.toFixed(2)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-3">
                        {order.status === 'pending' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'confirmed')}
                            className="px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-xs font-bold transition-colors whitespace-nowrap"
                          >
                            Confirm
                          </button>
                        )}
                        {order.status === 'confirmed' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'preparing')}
                            className="px-3 py-1.5 bg-purple-50 text-purple-700 hover:bg-purple-100 rounded-lg text-xs font-bold transition-colors whitespace-nowrap"
                          >
                            Prepare for Pickup
                          </button>
                        )}
                        {order.status === 'preparing' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'ready')}
                            className="px-3 py-1.5 bg-green-50 text-green-700 hover:bg-green-100 rounded-lg text-xs font-bold transition-colors whitespace-nowrap"
                          >
                            Mark as Ready
                          </button>
                        )}
                        {order.status === 'ready' && (
                          <span className="text-xs text-gray-400 italic px-3 py-1.5 whitespace-nowrap">
                            Awaiting Customer Pickup
                          </span>
                        )}
                        {order.status === 'collected' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'completed')}
                            className="px-3 py-1.5 bg-green-600 text-white hover:bg-green-700 rounded-lg text-xs font-bold transition-colors whitespace-nowrap shadow-sm"
                          >
                            Finalize Completion
                          </button>
                        )}
                        {order.status !== 'completed' && order.status !== 'cancelled' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'cancelled')}
                            className="px-3 py-1.5 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg text-xs font-bold transition-colors whitespace-nowrap"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No orders found</p>
            </div>
          )}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Total Orders</p>
            <p className="font-bold text-2xl text-gray-900">{orders.length}</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Pending</p>
            <p className="font-bold text-2xl text-yellow-600">
              {orders.filter((o) => o.status === 'pending').length}
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Preparing</p>
            <p className="font-bold text-2xl text-purple-600">
              {orders.filter((o) => o.status === 'preparing').length}
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Ready for Pickup</p>
            <p className="font-bold text-2xl text-green-600">
              {orders.filter((o) => o.status === 'ready').length}
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Collected (Pending)</p>
            <p className="font-bold text-2xl text-blue-600">
              {orders.filter((o) => o.status === 'collected').length}
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Completed</p>
            <p className="font-bold text-2xl text-gray-600">
              {orders.filter((o) => o.status === 'completed').length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}