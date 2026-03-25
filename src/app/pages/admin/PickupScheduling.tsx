import { useState, useEffect } from 'react';
import { MapPin, Calendar, Truck, Package, AlertCircle } from 'lucide-react';
import { outletLocations } from '../../data/mockData';

export default function PickupScheduling() {
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedOutlet, setSelectedOutlet] = useState<string>('all');

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    try {
      const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      setOrders(savedOrders);
    } catch (error) {
      console.error('Error loading orders:', error);
      setOrders([]);
    }
  };

  const scheduledOrders = orders.filter((order) => {
    const matchesDate = order.pickupType === 'scheduled' && 
      order.pickupDate?.startsWith(selectedDate);
    const matchesOutlet = selectedOutlet === 'all' || 
      order.pickupLocation.includes(selectedOutlet);
    return matchesDate && matchesOutlet;
  });

  const immediateOrders = orders.filter((order) => 
    order.pickupType === 'immediate' && 
    (selectedOutlet === 'all' || order.pickupLocation.includes(selectedOutlet))
  );

  const getOutletOrders = (outletName: string) => {
    return scheduledOrders.filter((order) => 
      order.pickupLocation.includes(outletName)
    );
  };

  const heartlandOutlets = outletLocations.filter((outlet) => outlet.type === 'heartland');
  const hubOutlets = outletLocations.filter((outlet) => outlet.type === 'hub');

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-[1400px] mx-auto p-8">
        <div className="mb-8">
          <h1 className="font-bold text-3xl text-gray-900 mb-2">Pickup Scheduling & Routing</h1>
          <p className="text-gray-600">Manage pickup schedules and route orders to outlets</p>
        </div>

        {/* Date & Outlet Filter */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                Scheduled Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6900] focus:border-transparent"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-2" />
                Filter by Outlet
              </label>
              <select
                value={selectedOutlet}
                onChange={(e) => setSelectedOutlet(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6900] focus:border-transparent"
              >
                <option value="all">All Outlets</option>
                <optgroup label="Hub Outlets">
                  {hubOutlets.map((outlet) => (
                    <option key={outlet.id} value={outlet.name}>{outlet.name}</option>
                  ))}
                </optgroup>
                <optgroup label="Heartland Outlets">
                  {heartlandOutlets.map((outlet) => (
                    <option key={outlet.id} value={outlet.name}>{outlet.name}</option>
                  ))}
                </optgroup>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Hub Outlets - Immediate Pickup */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                  <Truck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-xl text-gray-900">Hub Outlets - Immediate Pickup</h2>
                  <p className="text-sm text-gray-600">Orders ready for immediate collection</p>
                </div>
              </div>

              {hubOutlets.map((outlet) => {
                const outletOrders = immediateOrders.filter((order) =>
                  order.pickupLocation.includes(outlet.name)
                );

                if (outletOrders.length === 0) return null;

                return (
                  <div key={outlet.id} className="mb-4 border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-bold text-gray-900">{outlet.name}</p>
                        <p className="text-sm text-gray-600">{outlet.address}</p>
                      </div>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        {outletOrders.length} orders
                      </span>
                    </div>

                    <div className="space-y-2">
                      {outletOrders.map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Package className="w-5 h-5 text-gray-600" />
                            <div>
                              <p className="font-medium text-sm text-gray-900">{order.id}</p>
                              <p className="text-xs text-gray-600">{order.shopName}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-sm text-gray-900">${order.totalAmount.toFixed(2)}</p>
                            <p className="text-xs text-gray-600">{order.items.length} items</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}

              {immediateOrders.length === 0 && (
                <div className="text-center py-8">
                  <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No immediate pickup orders</p>
                </div>
              )}
            </div>

            {/* Heartland Outlets - Scheduled Pickup */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-xl text-gray-900">Heartland Outlets - Scheduled Pickup</h2>
                  <p className="text-sm text-gray-600">
                    Orders for {new Date(selectedDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {heartlandOutlets.map((outlet) => {
                const outletOrders = getOutletOrders(outlet.name);

                if (outletOrders.length === 0) return null;

                return (
                  <div key={outlet.id} className="mb-4 border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-bold text-gray-900">{outlet.name}</p>
                        <p className="text-sm text-gray-600">{outlet.address}</p>
                        <p className="text-xs text-blue-600 mt-1">Lead time: {outlet.leadTime}</p>
                      </div>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {outletOrders.length} orders
                      </span>
                    </div>

                    <div className="space-y-2">
                      {outletOrders.map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Package className="w-5 h-5 text-gray-600" />
                            <div>
                              <p className="font-medium text-sm text-gray-900">{order.id}</p>
                              <p className="text-xs text-gray-600">{order.shopName}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-sm text-gray-900">${order.totalAmount.toFixed(2)}</p>
                            <p className="text-xs text-gray-600">{order.items.length} items</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Routing Action */}
                    <button className="w-full mt-3 px-4 py-2 bg-gradient-to-r from-[#ff6900] to-[#ff8534] text-white rounded-lg font-bold hover:shadow-lg transition-all text-sm">
                      Schedule Delivery Route
                    </button>
                  </div>
                );
              })}

              {scheduledOrders.length === 0 && (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No scheduled orders for this date</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Routing Info */}
          <div className="space-y-6">
            {/* Summary */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-4">Pickup Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Immediate Pickup</span>
                  <span className="font-bold text-lg text-green-600">{immediateOrders.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Scheduled Pickup</span>
                  <span className="font-bold text-lg text-blue-600">{scheduledOrders.length}</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900">Total Orders</span>
                    <span className="font-bold text-xl text-[#ff6900]">
                      {immediateOrders.length + scheduledOrders.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Routing Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-start gap-3 mb-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-sm text-gray-900 mb-2">Routing System</h3>
                  <p className="text-xs text-gray-700 mb-3">
                    Scheduled orders are routed from the Central Hub to heartland outlets via daily replenishment trucks.
                  </p>
                  <ul className="text-xs text-gray-700 space-y-1 list-disc list-inside">
                    <li>Morning route: North region</li>
                    <li>Afternoon route: East & West</li>
                    <li>Lead time: 24-48 hours</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Outlets Requiring Routing */}
            {scheduledOrders.length > 0 && (
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-2 border-yellow-300 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="w-5 h-5 text-yellow-700" />
                  <h3 className="font-bold text-sm text-gray-900">Action Required</h3>
                </div>
                <p className="text-xs text-gray-700 mb-3">
                  {scheduledOrders.length} scheduled order(s) need to be routed to heartland outlets
                </p>
                <button className="w-full px-4 py-2 bg-gradient-to-r from-yellow-600 to-yellow-700 text-white rounded-lg font-bold hover:shadow-lg transition-all text-sm">
                  Generate Routing Plan
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}