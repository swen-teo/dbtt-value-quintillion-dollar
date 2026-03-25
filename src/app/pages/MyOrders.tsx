import { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

export default function MyOrders() {
  const [currentPage, setCurrentPage] = useState(1);
  const [dateFrom, setDateFrom] = useState('01/01/2026');
  const [dateTo, setDateTo] = useState('22/03/2026');

  const stats = [
    { label: 'TOTAL ORDERS', value: '87', subtitle: 'Since Jan 2025', color: 'border-blue-200 bg-blue-50' },
    { label: 'PENDING', value: '2', subtitle: 'Awaiting confirmation', color: 'border-orange-200 bg-orange-50' },
    { label: 'READY FOR PICKUP', value: '3', subtitle: 'Awaiting collection', color: 'border-purple-200 bg-purple-50' },
    { label: 'COLLECTED', value: '82', subtitle: '94.2% on schedule', color: 'border-green-200 bg-green-50' },
  ];

  const orderProgress = [
    { step: 1, label: 'Placed', date: 'Mar 22', status: 'completed' },
    { step: 2, label: 'Confirmed', date: 'Pending', status: 'active' },
    { step: 3, label: 'Picked', date: '', status: 'upcoming' },
    { step: 4, label: 'Ready', date: '', status: 'upcoming' },
    { step: 5, label: 'Collected', date: '', status: 'upcoming' },
  ];

  const activeOrders = [
    { id: 'ORD-4832', date: 'Mar 22, 2026', items: '12 Items', total: '$2,450.00', status: 'Pending', statusColor: 'bg-orange-100 text-orange-700', pickupBy: '—', action: 'View' },
    { id: 'ORD-4831', date: 'Mar 18, 2026', items: '28 Items', total: '$5,120.00', status: 'Ready For Pickup', statusColor: 'bg-green-100 text-green-700', pickupBy: 'Mar 23', action: 'Collect', actionColor: 'bg-[#ff6900]' },
    { id: 'ORD-4830', date: 'Mar 17, 2026', items: '8 Items', total: '$1,860.00', status: 'Ready For Pickup', statusColor: 'bg-green-100 text-green-700', pickupBy: 'Mar 22', action: 'Track', actionColor: 'bg-[#ff6900]' },
    { id: 'ORD-4829', date: 'Mar 16, 2026', items: '6 Items', total: '$980.00', status: 'Packed', statusColor: 'bg-purple-100 text-purple-700', pickupBy: 'Mar 22', action: 'View' },
    { id: 'ORD-4828', date: 'Mar 15, 2026', items: '15 Items', total: '$3,200.00', status: 'Pending', statusColor: 'bg-orange-100 text-orange-700', pickupBy: '—', action: 'View' },
  ];

  const orderHistory = [
    { id: 'ORD-4825', date: 'Mar 12, 2026', items: '20 Items', total: '$4,560.00', status: 'Collected', statusColor: 'bg-green-100 text-green-700', action: 'Reorder' },
    { id: 'ORD-4818', date: 'Mar 8, 2026', items: '35 Items', total: '$7,230.00', status: 'Collected', statusColor: 'bg-green-100 text-green-700', action: 'Reorder' },
    { id: 'ORD-4810', date: 'Mar 4, 2026', items: '18 Items', total: '$3,890.00', status: 'Collected', statusColor: 'bg-green-100 text-green-700', action: 'Reorder' },
    { id: 'ORD-4799', date: 'Feb 28, 2026', items: '42 Items', total: '$9,100.00', status: 'Collected', statusColor: 'bg-green-100 text-green-700', action: 'Reorder' },
    { id: 'ORD-4790', date: 'Feb 24, 2026', items: '5 Items', total: '$680.00', status: 'Cancelled', statusColor: 'bg-red-100 text-red-700', action: 'Details' },
    { id: 'ORD-4782', date: 'Feb 20, 2026', items: '30 Items', total: '$6,450.00', status: 'Collected', statusColor: 'bg-green-100 text-green-700', action: 'Reorder' },
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
            <Calendar className="w-4 h-4" />
            <span>March 22, 2026</span>
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
              <h2 className="text-xl font-bold text-gray-900">Latest Order — ORD-4832</h2>
              <p className="text-sm text-gray-600">12 items · $2,450.00 · Placed Mar 22, 2026</p>
            </div>
            <span className="bg-orange-100 text-orange-700 px-4 py-2 rounded-xl font-bold text-sm">
              Pending
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
                  <p className="text-xs text-gray-500">{step.date}</p>
                </div>
              ))}
            </div>
            {/* Progress Line */}
            <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200 -z-0">
              <div className="h-full bg-green-600 w-1/5" />
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
                {activeOrders.map((order, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4 font-bold text-gray-900">{order.id}</td>
                    <td className="py-4 px-4 text-gray-700">{order.date}</td>
                    <td className="py-4 px-4 text-gray-700">{order.items}</td>
                    <td className="py-4 px-4 font-bold text-gray-900">{order.total}</td>
                    <td className="py-4 px-4">
                      <span className={`${order.statusColor} px-3 py-1 rounded-full font-semibold text-sm`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-700">{order.pickupBy}</td>
                    <td className="py-4 px-4">
                      <button
                        className={`${
                          order.actionColor || 'bg-white border-2 border-gray-200 text-gray-700'
                        } px-6 py-2 rounded-xl font-bold text-sm hover:shadow-lg transition-all ${
                          order.actionColor ? 'text-white' : ''
                        }`}
                      >
                        {order.action}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order History */}
        <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Order History</h2>
            
            {/* Date Filter */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="border-2 border-gray-200 rounded-xl px-4 py-2 text-sm w-32 focus:border-[#ff6900] focus:outline-none"
                />
                <Calendar className="w-4 h-4 text-gray-400" />
              </div>
              <span className="text-gray-600">to</span>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="border-2 border-gray-200 rounded-xl px-4 py-2 text-sm w-32 focus:border-[#ff6900] focus:outline-none"
                />
                <Calendar className="w-4 h-4 text-gray-400" />
              </div>
              <select className="border-2 border-gray-200 rounded-xl px-4 py-2 text-sm focus:border-[#ff6900] focus:outline-none">
                <option>All Statuses</option>
                <option>Collected</option>
                <option>Cancelled</option>
              </select>
              <button className="bg-gray-900 text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-gray-800 transition-colors">
                Apply
              </button>
            </div>
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
                {orderHistory.map((order, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4 font-bold text-gray-900">{order.id}</td>
                    <td className="py-4 px-4 text-gray-700">{order.date}</td>
                    <td className="py-4 px-4 text-gray-700">{order.items}</td>
                    <td className="py-4 px-4 font-bold text-gray-900">{order.total}</td>
                    <td className="py-4 px-4">
                      <span className={`${order.statusColor} px-3 py-1 rounded-full font-semibold text-sm`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <button className="text-[#ff6900] font-bold text-sm hover:underline">
                        {order.action}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-end gap-2 mt-6">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="w-10 h-10 border-2 border-gray-200 rounded-xl flex items-center justify-center hover:border-[#ff6900] transition-colors disabled:opacity-50"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-xl font-bold transition-colors ${
                  currentPage === page
                    ? 'bg-[#ff6900] text-white'
                    : 'border-2 border-gray-200 text-gray-700 hover:border-[#ff6900]'
                }`}
              >
                {page}
              </button>
            ))}
            <span className="text-gray-600 px-2">...</span>
            <button className="w-10 h-10 border-2 border-gray-200 rounded-xl font-bold text-gray-700 hover:border-[#ff6900] transition-colors">
              8
            </button>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="w-10 h-10 border-2 border-gray-200 rounded-xl flex items-center justify-center hover:border-[#ff6900] transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
