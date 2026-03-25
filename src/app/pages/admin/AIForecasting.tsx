export default function AIForecasting() {
  return (
    <div className="min-h-screen p-7">
      {/* Header */}
      <div className="flex items-center justify-between mb-7">
        <div className="bg-[#27286f] border border-white rounded-full px-3.5 py-1.5">
          <p className="font-bold text-xs text-white">AI Demand Forecasting</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white border border-[#eadfce] rounded-[14px] px-5 py-3 font-extrabold text-sm text-[#1f2937] hover:shadow-md transition-shadow">
            Model assumptions
          </button>
          <button className="bg-[#ff6a00] rounded-[14px] px-5 py-3 font-extrabold text-sm text-white shadow-[0px_18px_42px_0px_rgba(201,101,15,0.12)] hover:shadow-xl transition-shadow">
            Generate supplier PO plan
          </button>
        </div>
      </div>

      {/* Alert Banner */}
      <div className="bg-[#ff6900] rounded-[28px] p-7 shadow-[0px_18px_42px_0px_rgba(201,101,15,0.12)] mb-6">
        <div className="grid grid-cols-[624px_1fr] gap-5">
          <div>
            <h2 className="font-bold text-2xl text-white mb-2">High-confidence spike expected during school holidays</h2>
            <p className="text-base text-white/90 mb-6">
              Forecast confidence is strongest for beverages and snacks in outlets with recurring Prime replenishment patterns.
            </p>
            <div className="flex gap-4">
              <div className="bg-white/16 border border-white/16 rounded-[18px] px-3.5 py-3">
                <p className="font-bold text-[22px] text-white mb-1">91%</p>
                <p className="text-xs text-white/92">Forecast confidence</p>
              </div>
              <div className="bg-white/16 border border-white/16 rounded-[18px] px-3.5 py-3">
                <p className="font-bold text-[22px] text-white mb-1">+31%</p>
                <p className="text-xs text-white/92">Projected peak uplift</p>
              </div>
              <div className="bg-white/16 border border-white/16 rounded-[18px] px-3.5 py-3">
                <p className="font-bold text-[22px] text-white mb-1">4</p>
                <p className="text-xs text-white/92">Suppliers to notify next</p>
              </div>
            </div>
          </div>
          <div className="bg-white/18 border border-white/18 rounded-[24px] p-5">
            <h3 className="font-bold text-lg text-white mb-3">Model inputs</h3>
            <ul className="space-y-2 pl-4">
              <li className="text-base text-white">Purchase frequency from subscribed accounts</li>
              <li className="text-base text-white">SKU mix shifts by route and shop segment</li>
              <li className="text-base text-white">Seasonality events such as school holidays</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_380px] gap-6">
        {/* Forecasted category trend */}
        <div className="space-y-6">
          <div className="bg-white border border-[#eadfce] rounded-[24px] shadow-[0px_14px_28px_0px_rgba(31,41,55,0.04)] p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-bold text-lg text-[#1f2937] mb-1">Forecasted category trend</h3>
                <p className="text-sm text-[#6b7280]">Next 4 weeks projected demand movement.</p>
              </div>
              <div className="bg-[#e0e7ff] rounded-full px-2.5 py-1.5">
                <p className="font-extrabold text-xs text-[#4f46e5]">Updated 2h ago</p>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { category: 'Beverages', icon: '🥤', trend: '+38%', color: 'bg-[#dbeafe]', textColor: 'text-[#1e40af]' },
                { category: 'Staples', icon: '🍚', trend: '+24%', color: 'bg-[#fef3c7]', textColor: 'text-[#92400e]' },
                { category: 'Fresh essentials', icon: '🥚', trend: '+19%', color: 'bg-[#f3e8ff]', textColor: 'text-[#6b21a8]' },
              ].map((item, index) => (
                <div key={index} className={`${item.color} rounded-[18px] p-4 flex items-center justify-between`}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl">
                      {item.icon}
                    </div>
                    <div>
                      <p className={`font-bold text-base ${item.textColor}`}>{item.category}</p>
                      <p className="text-sm text-[#6b7280]">Peak uplift</p>
                    </div>
                  </div>
                  <p className={`font-bold text-2xl ${item.textColor}`}>{item.trend}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Products forecast table */}
          <div className="bg-white border border-[#eadfce] rounded-[24px] shadow-[0px_14px_28px_0px_rgba(31,41,55,0.04)] p-6">
            <h3 className="font-bold text-lg text-[#1f2937] mb-4">Products forecast table</h3>

            <div className="space-y-0">
              <div className="grid grid-cols-[1fr_100px_100px_100px_120px] gap-4 text-xs font-medium text-[#6b7280] pb-3 border-b border-[#e5e7eb]">
                <div>PRODUCT</div>
                <div>CONFIDENCE</div>
                <div>DEMAND</div>
                <div>STOCK COVER</div>
                <div>RECOMMENDED</div>
              </div>
              {[
                {
                  name: 'Jasmine Green Tea 24 × 250ml',
                  desc: 'POKKA carton tea • Lower sugar',
                  confidence: '93%',
                  demand: '+38%',
                  stock: '5 days',
                  recommended: '160 cartons',
                },
                {
                  name: 'Royal Umbrella Thai Mixed Rice 2kg',
                  desc: '2kg household staple • Larger BNPL baskets',
                  confidence: '88%',
                  demand: '+24%',
                  stock: '8 days',
                  recommended: '95 bags',
                },
                {
                  name: 'Chew\'s Omega 6 Eggs',
                  desc: 'Fresh eggs • Morning route demand strongest',
                  confidence: '84%',
                  demand: '+19%',
                  stock: '3 days',
                  recommended: '140 trays',
                },
              ].map((product, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[1fr_100px_100px_100px_120px] gap-4 py-4 border-b border-[#e5e7eb] last:border-0"
                >
                  <div>
                    <p className="font-bold text-sm text-[#1f2937] mb-0.5">{product.name}</p>
                    <p className="text-xs text-[#6b7280]">{product.desc}</p>
                  </div>
                  <div className="text-sm text-[#1f2937]">{product.confidence}</div>
                  <div className="text-sm font-bold text-[#16a34a]">{product.demand}</div>
                  <div className="text-sm text-[#1f2937]">{product.stock}</div>
                  <div className="text-sm font-bold text-[#1f2937]">{product.recommended}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actionable sourcing insights */}
        <div className="bg-white border border-[#eadfce] rounded-[24px] shadow-[0px_14px_28px_0px_rgba(31,41,55,0.04)] p-6">
          <h3 className="font-bold text-lg text-[#1f2937] mb-4">Actionable sourcing insights</h3>

          <div className="space-y-3">
            {[
              {
                title: 'Increase Jasmine Green Tea PO to 160 cartons',
                desc: 'Current stock cover is only 5 days while forecasted demand is up sharply in North-East and West routes.',
                color: 'bg-[#fef3c7]',
              },
              {
                title: 'Lock in rice allocation early',
                desc: 'Thai Mixed Rice demand is strengthening alongside higher BNPL basket sizes among subscribed family shops.',
                color: 'bg-[#fef3c7]',
              },
              {
                title: 'Prioritize eggs on morning delivery runs',
                desc: 'Chew\'s Omega 6 Eggs should be synced with earliest truck windows due to freshness expectations and repeat order timing.',
                color: 'bg-[#fef3c7]',
              },
            ].map((insight, index) => (
              <div key={index} className={`${insight.color} border border-[#fde68a] rounded-[18px] p-4`}>
                <p className="font-bold text-sm text-[#1f2937] mb-2">{insight.title}</p>
                <p className="text-xs text-[#78350f]">{insight.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
