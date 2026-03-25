import { useState } from 'react';

export default function LogisticsHubCollections() {
  const [activeTab, setActiveTab] = useState<'hub' | 'heartland'>('hub');

  const orders = [
    { id: 'INV-29031', shop: 'Mama Shop #493', items: 50, time: '25 minutes ago' },
    { id: 'INV-29032', shop: 'Mama Shop #493', items: 50, time: '25 minutes ago' },
    { id: 'INV-29033', shop: 'Mama Shop #493', items: 50, time: '25 minutes ago' },
    { id: 'INV-29034', shop: 'Mama Shop #493', items: 50, time: '25 minutes ago' },
  ];

  return (
    <div className="min-h-screen p-7">
      {/* Header */}
      <h1 className="font-bold text-[30px] text-[#3b3a9f] mb-6">Logistics Command Center</h1>

      {/* Main Content */}
      <div className="bg-white border border-[#fee2e2] rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] overflow-hidden">
        {/* Tabs */}
        <div className="bg-[#ff6900] border-b border-white flex items-center gap-4 px-6 py-4">
          <button
            className={`font-medium text-base px-1 pb-0.5 ${
              activeTab === 'hub'
                ? 'text-[#333] border-b-2 border-[#333]'
                : 'text-white hover:text-white/90'
            }`}
            onClick={() => setActiveTab('hub')}
          >
            Hub Collections
          </button>
          <button
            className={`font-medium text-base px-1 pb-0.5 ${
              activeTab === 'heartland'
                ? 'text-[#333] border-b-2 border-[#333]'
                : 'text-white hover:text-white/90'
            }`}
            onClick={() => setActiveTab('heartland')}
          >
            Heartland Routing
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'hub' ? (
            <div>
              <h2 className="font-bold text-lg text-[#1f2937] mb-4">Pick & Pack Queue (Pioneer Road HQ)</h2>
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white border border-[#4a5565] rounded-[10px] p-4 flex items-center justify-between hover:border-[#ff6900] transition-colors"
                  >
                    <div>
                      <h3 className="font-bold text-base text-[#1f2937] mb-1">Order #{order.id}</h3>
                      <p className="text-sm text-[#99a1af] mb-1">
                        {order.shop} • {order.items} items
                      </p>
                      <p className="text-xs text-[#6a7282]">Ordered {order.time}</p>
                    </div>
                    <button className="bg-[#ff6900] text-white font-bold text-sm px-6 py-2 rounded-lg hover:bg-[#e65d00] transition-colors">
                      Start Picking
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <h2 className="font-bold text-lg text-[#333] mb-4">Heartland Store Routing (24-48hr Dispatch)</h2>
              <div className="space-y-4">
                {[
                  { zone: 'North Zone', hub: 'Valu$ AMK Hub', count: 8, color: 'text-[#fdc700]' },
                  { zone: 'East Zone', hub: 'Valu$ Bedok Mall', count: 5, color: 'text-[#16a34a]' },
                  { zone: 'West Zone', hub: 'Valu$ Jurong Point', count: 10, color: 'text-[#e65400]' },
                ].map((route, index) => (
                  <div
                    key={index}
                    className="bg-white border border-[#fee2e2] rounded-[10px] p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className={`font-bold text-base ${route.zone === 'West Zone' ? 'text-[#e65400]' : 'text-[#333]'} mb-1`}>
                          {route.zone}
                        </h3>
                        <p className={`text-sm flex items-center gap-2 ${route.zone === 'West Zone' ? 'text-[#e65400]' : 'text-[#333]'}`}>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
                            <path
                              d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.33333"
                            />
                            <path
                              d="M8 5.33334V8.00001L9.66667 9.66667"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.33333"
                            />
                          </svg>
                          {route.hub}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold text-2xl ${route.color}`}>{route.count}</p>
                        <p className="text-xs text-[#99a1af]">orders queued</p>
                      </div>
                    </div>
                    <button className="w-full bg-[#ff6900] text-white font-medium text-sm py-2 rounded-lg hover:bg-[#e65d00] transition-colors">
                      Generate Dispatch Manifest
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
