import { useState } from 'react';

export default function PricingConfiguration() {
  const [isReviewing, setIsReviewing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleReview = () => {
    setIsReviewing(true);
    alert('Loading payment history panel... (Simulation)');
    setTimeout(() => setIsReviewing(false), 1000);
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 2000);
  };

  return (
    <div className="min-h-screen p-7">
      {/* Header */}
      <div className="flex items-center justify-between mb-7">
        <div className="bg-[#27286f] border border-white rounded-full px-3.5 py-1.5">
          <p className="font-bold text-xs text-white">Subscription Controls</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleReview}
            disabled={isReviewing}
            className={`bg-white border border-[#eadfce] rounded-[14px] px-5 py-3 font-extrabold text-sm hover:shadow-md transition-shadow ${isReviewing ? 'text-gray-400 cursor-wait' : 'text-[#1f2937]'}`}>
            Review payment history
          </button>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className={`rounded-[14px] px-5 py-3 font-extrabold text-sm shadow-[0px_18px_42px_0px_rgba(201,101,15,0.12)] hover:shadow-xl transition-shadow ${isSaving ? 'bg-green-500 text-white cursor-wait' : 'bg-[#ff6a00] text-white'}`}>
            {isSaving ? 'Rules Saved ✅' : 'Save pricing rules'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Volume pricing tiers */}
        <div className="bg-white border border-[#eadfce] rounded-[24px] shadow-[0px_14px_28px_0px_rgba(31,41,55,0.04)] p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-lg text-[#1f2937] mb-1">Volume pricing tiers</h3>
              <p className="text-sm text-[#6b7280]">Align margins for standard accounts and Prime subscribers.</p>
            </div>
            <div className="bg-[#e0e7ff] rounded-full px-2.5 py-1.5">
              <p className="font-extrabold text-xs text-[#4f46e5]">Live policy</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="grid grid-cols-4 gap-4 text-xs font-medium text-[#6b7280] pb-2 border-b border-[#e5e7eb]">
              <div>TIER</div>
              <div>ORDER RANGE</div>
              <div>STANDARD</div>
              <div>PRIME</div>
            </div>
            {[
              { tier: 'Tier 1', range: '1 to 10 units', standard: 'Base price', prime: 'Base price' },
              { tier: 'Tier 2', range: '11 to 49 units', standard: '10% bulk discount', prime: '12% Prime discount' },
              { tier: 'Tier 3', range: '50+ units', standard: '13% bulk discount', prime: '15% Prime exclusive' },
            ].map((row, index) => (
              <div key={index} className="grid grid-cols-4 gap-4 py-3 text-sm text-[#1f2937]">
                <div className="font-semibold">{row.tier}</div>
                <div>{row.range}</div>
                <div>{row.standard}</div>
                <div>{row.prime}</div>
              </div>
            ))}
          </div>

          <div className="mt-4 bg-[#fef3c7] border border-[#fde68a] rounded-lg p-3">
            <p className="text-xs text-[#92400e]">
              Prime discounts remain gated by payment reliability and approval status.
            </p>
          </div>
        </div>

        {/* Subscription registration pipeline */}
        <div className="bg-white border border-[#eadfce] rounded-[24px] shadow-[0px_14px_28px_0px_rgba(31,41,55,0.04)] p-6">
          <h3 className="font-bold text-lg text-[#1f2937] mb-1">Subscription registration pipeline</h3>
          <p className="text-sm text-[#6b7280] mb-6">Approve new shops and watch conversion into successful accounts.</p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="font-bold text-4xl text-[#1f2937]">38</p>
              <p className="text-sm text-[#6b7280]">Pending registrations</p>
            </div>
            <div>
              <p className="font-bold text-4xl text-[#16a34a]">84%</p>
              <p className="text-sm text-[#6b7280]">Approval success rate</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="font-bold text-base text-[#1f2937]">UEN checks</p>
                <p className="font-bold text-base text-[#1f2937]">11</p>
              </div>
              <p className="text-sm text-[#6b7280]">Auto-verified before approval</p>
              <p className="text-sm text-[#6b7280] mt-1">Accounts waiting for BNPL review</p>
              <div className="mt-2 bg-[#ff6900] h-1.5 rounded-full" />
            </div>
          </div>
        </div>

        {/* Credit limit governance */}
        <div className="bg-white border border-[#eadfce] rounded-[24px] shadow-[0px_14px_28px_0px_rgba(31,41,55,0.04)] p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-lg text-[#1f2937] mb-1">Credit limit governance</h3>
              <p className="text-sm text-[#6b7280]">Adjust BNPL limits based on payment history and order consistency.</p>
            </div>
            <div className="bg-[#fed7aa] rounded-full px-2.5 py-1.5">
              <p className="font-extrabold text-xs text-[#9a3412]">Admin approval needed</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="grid grid-cols-4 gap-4 text-xs font-medium text-[#6b7280] pb-2 border-b border-[#e5e7eb]">
              <div>SHOP</div>
              <div>PAYMENT BEHAVIOR</div>
              <div>CURRENT LIMIT</div>
              <div>SUGGESTED ACTION</div>
            </div>
            {[
              {
                shop: 'Mama Shop #204',
                behavior: 'On-time for 6 months',
                limit: '$4,000',
                action: 'Increase to $5,500',
                actionColor: 'text-[#16a34a]',
              },
              {
                shop: 'Mama Shop #493',
                behavior: '1 delayed payment in 90 days',
                limit: '$3,000',
                action: 'Hold for review',
                actionColor: 'text-[#d97706]',
              },
              {
                shop: 'Mama Shop #188',
                behavior: 'Repeated delays',
                limit: '$2,200',
                action: 'Reduce to $1,500',
                actionColor: 'text-[#dc2626]',
              },
            ].map((row, index) => (
              <div key={index} className="grid grid-cols-4 gap-4 py-3 text-sm">
                <div className="font-semibold text-[#1f2937]">{row.shop}</div>
                <div className="text-[#6b7280]">{row.behavior}</div>
                <div className="text-[#1f2937]">{row.limit}</div>
                <div className={`font-semibold ${row.actionColor}`}>{row.action}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing rule editor */}
        <div className="bg-white border border-[#eadfce] rounded-[24px] shadow-[0px_14px_28px_0px_rgba(31,41,55,0.04)] p-6">
          <h3 className="font-bold text-lg text-[#1f2937] mb-1">Pricing rule editor</h3>
          <p className="text-sm text-[#6b7280] mb-6">Set guardrails for subscription pricing and high-volume accounts.</p>

          <div className="space-y-4">
            <div className="bg-[#fef3c7] border border-[#fde68a] rounded-lg p-4">
              <p className="font-bold text-base text-[#1f2937] mb-2">Prime monthly fee</p>
              <p className="text-sm text-[#78350f] mb-3">
                $49 / month • Includes exclusive overlay pricing and heartland pickup routing support
              </p>
            </div>

            <div className="bg-[#fef3c7] border border-[#fde68a] rounded-lg p-4">
              <p className="font-bold text-base text-[#1f2937] mb-2">Bulk margin floor</p>
              <p className="text-sm text-[#78350f] mb-3">
                8% minimum gross margin maintained across beverage and snack categories
              </p>
            </div>

            <div className="bg-[#fef3c7] border border-[#fde68a] rounded-lg p-4">
              <p className="font-bold text-base text-[#1f2937] mb-2">Registration gate</p>
              <p className="text-sm text-[#78350f]">
                Approve only after UEN validation, trade reference check, and payment risk score review
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
