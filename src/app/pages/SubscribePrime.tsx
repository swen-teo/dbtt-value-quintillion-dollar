import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, CreditCard, Shield, Star, CheckCircle, Lock, Info } from 'lucide-react';

export default function SubscribePrime() {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: ''
  });

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvc || !cardDetails.name) {
      alert('Please fill in all card details.');
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    try {
      const newTier = 'prime';
      sessionStorage.setItem('accountType', newTier);
      // Reset Grab Link on fresh upgrade
      sessionStorage.removeItem('grabLinked');
      sessionStorage.removeItem('grabEmail');
      
      const customerId = sessionStorage.getItem('customerId');
      if (customerId) {
        const { supabase } = await import('../lib/supabaseClient');
        await supabase.from('customers').update({ membership_tier: newTier }).eq('id', customerId);
      }

      window.dispatchEvent(new Event('accountTypeChanged'));
      alert('Welcome to Trade Prime! Your subscription is now active.');
      navigate('/customer/account?tab=subscription');
    } catch (err) {
      console.error("Failed to update membership tier:", err);
      alert('Failed to process subscription. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1000px] mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/customer/account?tab=subscription')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 font-medium transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Account
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Plan Benefits */}
          <div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-[#ff6900] rounded-3xl p-8 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff6900]/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#ff6900] rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20">
                    <Star className="w-7 h-7 text-white" fill="white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">Trade Prime</h1>
                    <p className="text-[#ff6900] font-bold">Premium Business Plan</p>
                  </div>
                </div>

                <div className="mb-8 mt-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-black text-gray-900">$16.76</span>
                    <span className="text-gray-500 font-bold">/ month</span>
                  </div>
                  <p className="text-gray-600 mt-2 text-sm italic">Unlock the full power of wholesale trading.</p>
                </div>

                <div className="space-y-4 mb-8">
                  {[
                    'Priority order processing & fulfillment',
                    'Unlock Grab Pay Later (BNPL) at checkout',
                    'Native integration with Grab ID',
                    'Flexible weekly payment cycles',
                    'Guaranteed stock for top items',
                    'Exclusive Prime-only deals'
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-[#ff6900]/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-[#ff6900]" />
                      </div>
                      <span className="text-gray-700 font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 border border-orange-200 flex items-start gap-3">
                  <Info className="w-5 h-5 text-orange-600 mt-0.5" />
                  <p className="text-xs text-orange-800 leading-relaxed">
                    Subscription is billed monthly. Cancel anytime from your account settings.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Card Payment Form */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <CreditCard className="w-6 h-6 text-indigo-600" />
              Secure Card Payment
            </h2>

            <form onSubmit={handleSubscribe} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Cardholder Name</label>
                <input
                  type="text"
                  required
                  placeholder="JOHN TAN"
                  value={cardDetails.name}
                  onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value.toUpperCase() })}
                  className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-indigo-500 focus:bg-white transition-all outline-none font-medium"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Card Number</label>
                <div className="relative">
                  <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    required
                    placeholder="0000 0000 0000 0000"
                    maxLength={19}
                    value={cardDetails.number}
                    onChange={(e) => {
                      let val = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
                      let matches = val.match(/\d{4,16}/g);
                      let match = (matches && matches[0]) || '';
                      let parts = [];
                      for (let i = 0, len = match.length; i < len; i += 4) {
                        parts.push(match.substring(i, i + 4));
                      }
                      if (parts.length) {
                        setCardDetails({ ...cardDetails, number: parts.join(' ') });
                      } else {
                        setCardDetails({ ...cardDetails, number: val });
                      }
                    }}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-indigo-500 focus:bg-white transition-all outline-none font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Expiry Date</label>
                  <input
                    type="text"
                    required
                    placeholder="MM/YY"
                    maxLength={5}
                    value={cardDetails.expiry}
                    onChange={(e) => {
                      let val = e.target.value.replace(/\D/g, '');
                      if (val.length > 2) {
                        val = val.substring(0, 2) + '/' + val.substring(2, 4);
                      }
                      setCardDetails({ ...cardDetails, expiry: val });
                    }}
                    className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-indigo-500 focus:bg-white transition-all outline-none font-medium text-center"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">CVC / CVV</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      required
                      placeholder="***"
                      maxLength={3}
                      value={cardDetails.cvc}
                      onChange={(e) => setCardDetails({ ...cardDetails, cvc: e.target.value.replace(/\D/g, '') })}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-indigo-500 focus:bg-white transition-all outline-none font-medium text-center"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className={`w-full py-4 rounded-2xl font-bold text-lg shadow-xl transition-all flex items-center justify-center gap-3 ${
                    isProcessing 
                    ? 'bg-gray-400 cursor-not-allowed text-white' 
                    : 'bg-gradient-to-r from-indigo-600 to-blue-700 text-white hover:scale-[1.02] hover:shadow-indigo-500/20'
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Shield className="w-6 h-6" />
                      Subscribe Now - $16.76
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-gray-400">
                <Lock className="w-3 h-3" />
                <span className="text-[10px] uppercase font-bold tracking-widest">PCI-DSS Compliant Secure Gateway</span>
              </div>

              <div className="mt-8 p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-start gap-3">
                <XCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                <p className="text-xs text-amber-800 font-medium">
                  <strong>Important:</strong> Grab Pay is not supported for subscription payments. Please use a valid credit or debit card.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function XCircle(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6" />
      <path d="m9 9 6 6" />
    </svg>
  );
}
