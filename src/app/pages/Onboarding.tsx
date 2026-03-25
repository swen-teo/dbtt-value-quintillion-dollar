import { useState } from 'react';
import { useNavigate } from 'react-router';
import { CreditCard, Clock, TrendingUp, CheckCircle, ArrowRight, Shield, Zap } from 'lucide-react';

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    shopName: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    creditLimit: 5000,
    accountType: 'prime', // 'prime' or 'normal'
  });

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Complete onboarding
      navigate('/customer/shop');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl -ml-48 -mb-48"></div>
      
      <div className="max-w-[1200px] mx-auto p-8 relative z-10">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex items-center">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold transition-all shadow-lg ${
                    step >= num
                      ? 'bg-gradient-to-br from-[#ff6900] to-[#ff8534] text-white shadow-orange-500/30 scale-110'
                      : 'bg-white border-2 border-gray-200 text-gray-400'
                  }`}
                >
                  {step > num ? <CheckCircle className="w-7 h-7" /> : <span className="text-xl">{num}</span>}
                </div>
                {num < 3 && (
                  <div
                    className={`w-32 h-1.5 mx-4 rounded-full transition-all ${
                      step > num ? 'bg-gradient-to-r from-[#ff6900] to-[#ff8534]' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Welcome & Benefits */}
        {step === 1 && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="font-bold text-5xl text-gray-900 mb-4 tracking-tight">
                Welcome to Valu$ Trade Prime
              </h1>
              <p className="text-xl text-gray-600">
                Join Singapore's leading B2B wholesale platform with exclusive benefits
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {/* Benefit 1 */}
              <div className="bg-white rounded-3xl border-2 border-gray-100 p-8 hover:border-[#ff6900] hover:shadow-2xl transition-all group">
                <div className="w-16 h-16 bg-gradient-to-br from-[#ff6900] to-[#ff8534] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform">
                  <CreditCard className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-2xl text-gray-900 mb-3">Buy Now Pay Later</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Split your payments into 4 interest-free installments. No upfront capital required.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm text-gray-700">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <span>0% Interest Rate</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-700">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <span>Up to $5,000 Credit Limit</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-700">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <span>Flexible Weekly Payments</span>
                  </li>
                </ul>
              </div>

              {/* Benefit 2 */}
              <div className="bg-white rounded-3xl border-2 border-gray-100 p-8 hover:border-[#155dfc] hover:shadow-2xl transition-all group">
                <div className="w-16 h-16 bg-gradient-to-br from-[#155dfc] to-[#3b82f6] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-2xl text-gray-900 mb-3">Flexible Pickup Options</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Choose between immediate pickup at hubs or scheduled collection at 69+ outlets.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm text-gray-700">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <span>1-Hour Immediate Pickup</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-700">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <span>Island-Wide Coverage</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-700">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <span>24-48 Hour Scheduling</span>
                  </li>
                </ul>
              </div>

              {/* Benefit 3 */}
              <div className="bg-white rounded-3xl border-2 border-gray-100 p-8 hover:border-[#ff6900] hover:shadow-2xl transition-all group">
                <div className="w-16 h-16 bg-gradient-to-br from-[#ff6900] to-[#ff8534] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-2xl text-gray-900 mb-3">Trade Pricing</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Access wholesale prices with savings up to 40% off retail.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm text-gray-700">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <span>Bulk Discount Pricing</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-700">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <span>Exclusive Clearance Sales</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-700">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <span>Early Access to Promotions</span>
                  </li>
                </ul>
              </div>

              {/* Benefit 4 */}
              <div className="bg-white rounded-3xl border-2 border-gray-100 p-8 hover:border-[#155dfc] hover:shadow-2xl transition-all group">
                <div className="w-16 h-16 bg-gradient-to-br from-[#155dfc] to-[#3b82f6] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-2xl text-gray-900 mb-3">Trusted Platform</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Join thousands of retailers across Singapore who trust Valu$.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm text-gray-700">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <span>Dedicated Support Team</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-700">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <span>Secure Transactions</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-700">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <span>Quality Guaranteed</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-[#ff6900] to-[#ff8534] text-white px-10 py-5 rounded-2xl font-bold text-xl hover:shadow-2xl hover:shadow-orange-500/30 transition-all hover:scale-105"
              >
                Get Started
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Business Information */}
        {step === 2 && (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-bold text-3xl text-gray-900 mb-2">Business Information</h2>
              <p className="text-gray-600">Tell us about your shop</p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Shop Name <span className="text-[#ff6900]">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.shopName}
                    onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6900] focus:border-transparent transition-all"
                    placeholder="e.g., Mama Shop #123"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Contact Person <span className="text-[#ff6900]">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6900] focus:border-transparent transition-all"
                    placeholder="Your full name"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      Email <span className="text-[#ff6900]">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6900] focus:border-transparent transition-all"
                      placeholder="shop@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      Phone <span className="text-[#ff6900]">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6900] focus:border-transparent transition-all"
                      placeholder="+65 9123 4567"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Shop Address <span className="text-[#ff6900]">*</span>
                  </label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6900] focus:border-transparent transition-all"
                    rows={3}
                    placeholder="Full shop address including postal code"
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={handleBack}
                  className="flex-1 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-bold hover:border-gray-400 transition-all"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  className="flex-1 bg-gradient-to-r from-[#ff6900] to-[#ff8534] text-white px-6 py-3 rounded-lg font-bold hover:shadow-xl transition-all"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Credit Limit Selection */}
        {step === 3 && (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-bold text-3xl text-gray-900 mb-2">Select Your Credit Limit</h2>
              <p className="text-gray-600">Choose a BNPL credit limit that works for your business</p>
            </div>

            <div className="space-y-4 mb-8">
              {[3000, 5000, 10000].map((limit) => (
                <div
                  key={limit}
                  onClick={() => setFormData({ ...formData, creditLimit: limit })}
                  className={`bg-white rounded-2xl border-2 p-6 cursor-pointer transition-all ${
                    formData.creditLimit === limit
                      ? 'border-[#ff6900] shadow-xl'
                      : 'border-gray-200 hover:border-[#ff6900] hover:shadow-lg'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        formData.creditLimit === limit
                          ? 'border-[#ff6900] bg-[#ff6900]'
                          : 'border-gray-300'
                      }`}>
                        {formData.creditLimit === limit && (
                          <CheckCircle className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-2xl text-gray-900">${limit.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">Monthly Credit Limit</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Weekly Payment</p>
                      <p className="font-bold text-lg text-[#155dfc]">
                        ${(limit / 4).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 mb-8">
              <div className="flex items-start gap-3">
                <Clock className="w-6 h-6 text-[#155dfc] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">How BNPL Works</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#155dfc] flex-shrink-0 mt-0.5" />
                      <span>Pay 25% of your order value today</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#155dfc] flex-shrink-0 mt-0.5" />
                      <span>Remaining 75% split into 3 weekly payments</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#155dfc] flex-shrink-0 mt-0.5" />
                      <span>No interest, no hidden fees</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#155dfc] flex-shrink-0 mt-0.5" />
                      <span>Automatic deductions from your account</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <button
                  onClick={handleBack}
                  className="w-1/3 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-bold hover:border-gray-400 transition-all"
                >
                  Back
                </button>
                <button
                  onClick={() => {
                    setFormData({ ...formData, accountType: 'prime' });
                    sessionStorage.setItem('accountType', 'prime');
                    sessionStorage.setItem('creditLimit', formData.creditLimit.toString());
                    handleNext();
                  }}
                  className="flex-1 bg-gradient-to-r from-[#ff6900] to-[#ff8534] text-white px-6 py-3 rounded-xl font-bold hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  Complete Trade Prime Setup
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              
              <div className="mt-4">
                <button
                  onClick={() => {
                    setFormData({ ...formData, accountType: 'normal' });
                    sessionStorage.setItem('accountType', 'normal');
                    sessionStorage.setItem('creditLimit', '0');
                    handleNext();
                  }}
                  className="w-full border-2 border-gray-200 text-gray-600 bg-white px-6 py-4 rounded-xl font-bold hover:border-[#155dfc] hover:text-[#155dfc] hover:bg-blue-50 transition-all shadow-sm"
                >
                  Skip BNPL for now and continue with Normal Business Account
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}