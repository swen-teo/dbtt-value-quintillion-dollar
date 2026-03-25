export default function CatalogOperations() {
  return (
    <div className="min-h-screen p-7">
      {/* Header */}
      <div className="flex items-center justify-between mb-7">
        <div className="bg-[#27286f] border border-white rounded-full px-3.5 py-1.5">
          <p className="font-bold text-xs text-white">Catalog Operations</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white border border-[#eadfce] rounded-[14px] px-5 py-3 font-extrabold text-sm text-[#1f2937] hover:shadow-md transition-shadow">
            Export restock list
          </button>
          <button className="bg-[#ff6a00] rounded-[14px] px-5 py-3 font-extrabold text-sm text-white shadow-[0px_18px_42px_0px_rgba(201,101,15,0.12)] hover:shadow-xl transition-shadow">
            Raise supplier order
          </button>
        </div>
      </div>

      {/* Alert Banner */}
      <div className="bg-[#ff6900] rounded-[28px] p-7 shadow-[0px_18px_42px_0px_rgba(201,101,15,0.12)] mb-6">
        <div className="grid grid-cols-[624px_1fr] gap-5">
          <div>
            <h2 className="font-bold text-2xl text-white mb-2">School holiday demand spike is forming</h2>
            <p className="text-base text-white/90 mb-6">
              Trade Prime order frequency is up for beverages, cup noodles, and snack cartons across heartland routes.
            </p>
            <div className="flex gap-4">
              <div className="bg-white/16 border border-white/16 rounded-[18px] px-3.5 py-3 flex-1">
                <p className="font-bold text-[22px] text-white mb-1">148</p>
                <p className="text-xs text-white/92">Active forecasted SKUs</p>
              </div>
              <div className="bg-white/16 border border-white/16 rounded-[18px] px-3.5 py-3 flex-1">
                <p className="font-bold text-[22px] text-white mb-1">27%</p>
                <p className="text-xs text-white/92">High-demand lift vs last month</p>
              </div>
              <div className="bg-white/16 border border-white/16 rounded-[18px] px-3.5 py-3 flex-1">
                <p className="font-bold text-[22px] text-white mb-1">11</p>
                <p className="text-xs text-white/92">Items to bulk order this week</p>
              </div>
            </div>
          </div>
          <div className="bg-white/18 border border-white/18 rounded-[24px] p-5">
            <h3 className="font-bold text-lg text-white mb-3">Catalog sync priorities</h3>
            <ul className="space-y-2 pl-4">
              <li className="text-base text-white">Review SKUs at risk of stockout within 10 days.</li>
              <li className="text-base text-white">Confirm supplier lead times before the holiday surge.</li>
              <li className="text-base text-white">Pin replenishment items used by high-frequency subscribed shops.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-[#eadfce] rounded-[18px] p-4">
          <p className="text-xs text-[#6b7280] mb-2">Subscribed shops tracked</p>
          <p className="font-bold text-2xl text-[#1f2937]">392</p>
        </div>
        <div className="bg-white border border-[#eadfce] rounded-[18px] p-4">
          <p className="text-xs text-[#6b7280] mb-2">Supplier-ready SKUs</p>
          <p className="font-bold text-2xl text-[#1f2937]">81%</p>
        </div>
        <div className="bg-white border border-[#eadfce] rounded-[18px] p-4">
          <p className="text-xs text-[#6b7280] mb-2">Pending replenishment orders</p>
          <p className="font-bold text-2xl text-[#1f2937]">14</p>
        </div>
        <div className="bg-white border border-[#eadfce] rounded-[18px] p-4">
          <p className="text-xs text-[#6b7280] mb-2">At-risk stockouts</p>
          <p className="font-bold text-2xl text-[#dc2626]">6</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-[639px_1fr] gap-6">
        {/* High-demand SKU watchlist */}
        <div className="bg-white border border-[#eadfce] rounded-[24px] shadow-[0px_14px_28px_0px_rgba(31,41,55,0.04)] p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-bold text-lg text-[#1f2937] mb-1">High-demand SKU watchlist</h3>
              <p className="text-sm text-[#6b7280]">Using purchase frequency and SKU mix from subscribed accounts.</p>
            </div>
            <div className="bg-[#fff0e4] rounded-full px-2.5 py-1.5">
              <p className="font-extrabold text-xs text-[#cc5200]">Forecast-assisted</p>
            </div>
          </div>

          {/* Product List */}
          <div className="space-y-0 border-t border-[#f0e7da]">
            {[
              {
                name: 'Premium Cola 24x330ml',
                category: 'Beverages • Prime uptake in North-East routes',
                demand: '+34%',
                stock: '8 days',
                status: 'Bulk order now',
                statusColor: 'bg-[#fde8e8] text-[#b91c1c]',
              },
              {
                name: 'Instant Noodles 40 pack',
                category: 'Household staples • Consistent weekly reorders',
                demand: '+22%',
                stock: '13 days',
                status: 'Monitor',
                statusColor: 'bg-[#fff0e4] text-[#cc5200]',
              },
              {
                name: 'Classic Potato Chips Box',
                category: 'Snacks • Holiday basket spike predicted',
                demand: '+29%',
                stock: '6 days',
                status: 'Urgent restock',
                statusColor: 'bg-[#fde8e8] text-[#b91c1c]',
              },
            ].map((product, index) => (
              <div key={index} className="border-b border-[#f0e7da] py-4">
                <div className="grid grid-cols-[186px_90px_115px_1fr] items-center gap-6">
                  <div>
                    <p className="font-bold text-base text-[#1f2937] mb-1">{product.name}</p>
                    <p className="text-base text-[#6b7280]">{product.category}</p>
                  </div>
                  <div>
                    <p className="font-extrabold text-base text-[#1f2937]">{product.demand}</p>
                    <p className="text-base text-[#6b7280]">Expected demand</p>
                  </div>
                  <div>
                    <p className="font-extrabold text-base text-[#1f2937]">{product.stock}</p>
                    <p className="text-base text-[#6b7280]">Stock cover</p>
                  </div>
                  <div className="flex justify-end">
                    <div className={`${product.statusColor} rounded-full px-2.5 py-1.5`}>
                      <p className="font-extrabold text-xs whitespace-nowrap">{product.status}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Supplier readiness */}
        <div className="bg-white border border-[#eadfce] rounded-[24px] shadow-[0px_14px_28px_0px_rgba(31,41,55,0.04)] p-5">
          <h3 className="font-bold text-lg text-[#1f2937] mb-1">Supplier readiness</h3>
          <p className="text-sm text-[#6b7280] mb-5">Lead-time and allocation view for planned bulk orders.</p>

          <div className="space-y-3">
            {[
              {
                name: 'East Asia beverage supplier',
                details: 'Lead time: 4 days • MOQ: 180 cartons • Allocation confirmed',
                bg: 'bg-[#fff1db]',
              },
              {
                name: 'Regional noodles wholesaler',
                details: 'Lead time: 7 days • MOQ: 220 cartons • Price review pending',
                bg: 'bg-[#fff1db]',
              },
              {
                name: 'Snack importer',
                details: 'Lead time: 6 days • MOQ: 120 cartons • Promo bundle available',
                bg: 'bg-[#fff1db]',
              },
            ].map((supplier, index) => (
              <div key={index} className={`${supplier.bg} border border-[#eadfce] rounded-[18px] p-4`}>
                <p className="font-bold text-base text-[#1f2937] mb-1.5">{supplier.name}</p>
                <p className="text-base text-[#1f2937]">{supplier.details}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 bg-[#fefce8] border border-[#f9e195] rounded-[18px] p-4">
            <p className="font-extrabold text-sm text-[#b45309] mb-1">
              Recommendation: place a combined supplier order for
            </p>
            <p className="text-sm text-[#78350f]">
              420 cartons before the next school holiday replenishment cycle.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
