import { useState } from 'react';
import { Package, TrendingUp, Users, MapPin, Clock, CheckCircle, AlertTriangle, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useProducts } from '../../hooks/useData';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { products } = useProducts();
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'quarter'>('week');

  const stats = [
    {
      label: 'Pending Orders',
      value: '12',
      icon: Package,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-500',
    },
    {
      label: 'Ready for Pickup',
      value: '8',
      icon: CheckCircle,
      color: 'bg-green-500',
      textColor: 'text-green-500',
    },
    {
      label: 'Active Customers',
      value: '234',
      icon: Users,
      color: 'bg-blue-500',
      textColor: 'text-blue-500',
    },
    {
      label: 'Revenue Today',
      value: '$12,450',
      icon: TrendingUp,
      color: 'bg-[#ff6900]',
      textColor: 'text-[#ff6900]',
    },
  ];

  const recentOrders = [
    {
      id: 'ORD-1001',
      customer: 'Mama Shop #493',
      items: 5,
      total: 245.50,
      pickup: 'Immediate - Central Hub',
      status: 'pending',
    },
    {
      id: 'ORD-1002',
      customer: 'Mama Shop #127',
      items: 8,
      total: 432.80,
      pickup: 'Scheduled - Ang Mo Kio',
      status: 'confirmed',
    },
    {
      id: 'ORD-1003',
      customer: 'Convenience Store #89',
      items: 12,
      total: 678.20,
      pickup: 'Immediate - Jurong Hub',
      status: 'ready',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'ready':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Stock forecasting data
  const reorderPatterns = [
    {
      product: products[2],
      avgWeeklyOrders: 15,
      totalWeeklyDemand: 450,
      currentStock: 300,
      forecastedDemand: 1800,
      restockNeeded: 1500,
      confidence: 92,
      trend: 'up',
    },
    {
      product: products[3],
      avgWeeklyOrders: 12,
      totalWeeklyDemand: 120,
      currentStock: 100,
      forecastedDemand: 480,
      restockNeeded: 380,
      confidence: 88,
      trend: 'stable',
    },
    {
      product: products[0],
      avgWeeklyOrders: 18,
      totalWeeklyDemand: 450,
      currentStock: 150,
      forecastedDemand: 1800,
      restockNeeded: 1650,
      confidence: 95,
      trend: 'up',
    },
    {
      product: products[1],
      avgWeeklyOrders: 20,
      totalWeeklyDemand: 400,
      currentStock: 200,
      forecastedDemand: 1600,
      restockNeeded: 1400,
      confidence: 90,
      trend: 'up',
    },
  ];

  const getMultiplier = () => {
    switch (timeframe) {
      case 'week':
        return 1;
      case 'month':
        return 4;
      case 'quarter':
        return 12;
      default:
        return 1;
    }
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (trend === 'down') return <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />;
    return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
  };

  const getStockStatus = (current: number, needed: number) => {
    const ratio = current / needed;
    if (ratio > 0.5) return { label: 'Good', color: 'text-green-600', bg: 'bg-green-100' };
    if (ratio > 0.25) return { label: 'Low', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { label: 'Critical', color: 'text-red-600', bg: 'bg-red-100' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-[1400px] mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">Dashboard</h1>
          <p className="text-gray-600 text-lg">Welcome back, Admin. Here's your operations overview.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-2xl border-2 border-gray-100 p-6 hover:border-gray-200 hover:shadow-lg transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-1 font-medium">{stat.label}</p>
                <p className={`font-bold text-3xl ${stat.textColor}`}>{stat.value}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2 bg-white rounded-2xl border-2 border-gray-100 p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Recent Orders</h2>
              <button
                onClick={() => navigate('/admin/orders')}
                className="text-sm text-[#ff6900] hover:text-[#ff8534] font-semibold transition-colors"
              >
                View All →
              </button>
            </div>

            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="border-2 border-gray-100 rounded-xl p-5 hover:border-[#ff6900] hover:shadow-lg transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center">
                        <Package className="w-6 h-6 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-lg">{order.id}</p>
                        <p className="text-sm text-gray-600">{order.customer}</p>
                      </div>
                    </div>
                    <span className={`px-4 py-2 rounded-xl text-xs font-bold ${getStatusColor(order.status)} uppercase tracking-wide`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <span className="text-gray-600">{order.items} items</span>
                      <span className="text-gray-400">•</span>
                      <span className="font-bold text-gray-900 text-base">${order.total.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{order.pickup}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            {/* Pickup Schedule */}
            <div className="bg-white rounded-2xl border-2 border-gray-100 p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-5">Today's Pickup Schedule</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200">
                  <Clock className="w-5 h-5 text-[#ff6900]" />
                  <div className="flex-1">
                    <p className="font-bold text-sm text-gray-900">Central Hub</p>
                    <p className="text-xs text-gray-600">5 orders ready</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200">
                  <Clock className="w-5 h-5 text-[#ff6900]" />
                  <div className="flex-1">
                    <p className="font-bold text-sm text-gray-900">Jurong Hub</p>
                    <p className="text-xs text-gray-600">3 orders ready</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => navigate('/admin/pickup-scheduling')}
                className="w-full mt-5 px-4 py-3 bg-gradient-to-r from-[#ff6900] to-[#ff8534] text-white rounded-xl font-bold hover:shadow-xl hover:shadow-orange-500/20 transition-all"
              >
                Manage Schedule
              </button>
            </div>

            {/* Alerts */}
            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Alerts</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-sm text-gray-700 font-medium">3 scheduled pickups require routing to heartland outlets</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-sm text-gray-700 font-medium">Low stock alert: Premium Cola (24x330ml)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stock Forecasting Section */}
        <div className="mt-8">
          <div className="bg-white rounded-2xl border-2 border-gray-100 p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Stock Forecasting & Reorder Intelligence</h2>
                <p className="text-gray-600">AI-powered demand prediction based on historical order patterns</p>
              </div>
              <div className="flex gap-2 bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setTimeframe('week')}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                    timeframe === 'week'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Weekly
                </button>
                <button
                  onClick={() => setTimeframe('month')}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                    timeframe === 'month'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setTimeframe('quarter')}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                    timeframe === 'quarter'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Quarterly
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {reorderPatterns.map((pattern, index) => {
                const multiplier = getMultiplier();
                const forecastedDemand = pattern.totalWeeklyDemand * multiplier;
                const restockNeeded = Math.max(0, forecastedDemand - pattern.currentStock);
                const status = getStockStatus(pattern.currentStock, restockNeeded);

                return (
                  <div
                    key={index}
                    className="border-2 border-gray-100 rounded-xl p-6 hover:border-[#ff6900] hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start gap-6">
                      {/* Product Image */}
                      <div className="w-24 h-24 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                        <img
                          src={pattern.product.image}
                          alt={pattern.product.name}
                          className="w-full h-full object-contain p-3"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-bold text-lg text-gray-900 mb-1">{pattern.product.name}</h3>
                            <p className="text-sm text-gray-600">{pattern.product.unit}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {getTrendIcon(pattern.trend)}
                            <span className={`px-3 py-1 rounded-lg text-xs font-bold ${status.bg} ${status.color}`}>
                              {status.label}
                            </span>
                          </div>
                        </div>

                        {/* Metrics Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                            <p className="text-xs text-blue-900 mb-1 font-semibold">Current Stock</p>
                            <p className="font-bold text-xl text-gray-900">{pattern.currentStock}</p>
                          </div>
                          <div className="bg-purple-50 border border-purple-200 rounded-xl p-3">
                            <p className="text-xs text-purple-900 mb-1 font-semibold">Forecasted Demand</p>
                            <p className="font-bold text-xl text-gray-900">{forecastedDemand}</p>
                          </div>
                          <div className="bg-orange-50 border border-orange-200 rounded-xl p-3">
                            <p className="text-xs text-orange-900 mb-1 font-semibold">Restock Needed</p>
                            <p className="font-bold text-xl text-gray-900">{restockNeeded}</p>
                          </div>
                          <div className="bg-green-50 border border-green-200 rounded-xl p-3">
                            <p className="text-xs text-green-900 mb-1 font-semibold">Confidence</p>
                            <p className="font-bold text-xl text-gray-900">{pattern.confidence}%</p>
                          </div>
                          <div className="bg-gray-50 border border-gray-200 rounded-xl p-3">
                            <p className="text-xs text-gray-900 mb-1 font-semibold">Avg Weekly Orders</p>
                            <p className="font-bold text-xl text-gray-900">{pattern.avgWeeklyOrders}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}