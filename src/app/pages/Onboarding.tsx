import { useState } from 'react';
import { useNavigate } from 'react-router';
import { CreditCard, Clock, TrendingUp, CheckCircle, ArrowRight, Shield, Zap } from 'lucide-react';

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    shopName: '',
    uen: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
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
                Valu$ Trade Prime Plan
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
                <h3 className="font-bold text-2xl text-gray-900 mb-3">Grab Pay Later</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Exclusive for Subscribers: Split your payments into 4 interest-free installments seamlessly with Grab Pay Later.
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
                    <span>Instant Approval</span>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      Business UEN <span className="text-[#ff6900]">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.uen}
                      onChange={(e) => setFormData({ ...formData, uen: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6900] focus:border-transparent transition-all"
                      placeholder="e.g., 201012345C"
                    />
                  </div>
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

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-bold text-3xl text-gray-900 mb-2">Confirm Your Details</h2>
              <p className="text-gray-600">Please review your business information before completing registration</p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg mb-8">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Shop Name</h4>
                    <p className="text-lg font-semibold text-gray-900">{formData.shopName || '-'}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Business UEN</h4>
                    <p className="text-lg font-semibold text-gray-900">{formData.uen || '-'}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Contact Person</h4>
                    <p className="text-lg font-semibold text-gray-900">{formData.contactPerson || '-'}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Phone</h4>
                    <p className="text-lg font-semibold text-gray-900">{formData.phone || '-'}</p>
                  </div>
                  <div className="md:col-span-2">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Email</h4>
                    <p className="text-lg font-semibold text-gray-900">{formData.email || '-'}</p>
                  </div>
                  <div className="md:col-span-2">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Shop Address</h4>
                    <p className="text-lg font-semibold text-gray-900">{formData.address || '-'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleBack}
                className="w-1/3 border-2 border-gray-300 text-gray-700 px-6 py-4 rounded-xl font-bold hover:border-gray-400 transition-all text-lg"
              >
                Back
              </button>
              <button
                onClick={() => {
                  sessionStorage.setItem('accountType', 'normal');
                  sessionStorage.setItem('creditLimit', '0');
                  sessionStorage.setItem('usedCredit', '0');
                  window.dispatchEvent(new Event('accountTypeChanged'));
                  handleNext();
                }}
                className="flex-1 bg-gradient-to-r from-[#ff6900] to-[#ff8534] text-white px-6 py-4 rounded-xl font-bold hover:shadow-xl transition-all flex items-center justify-center gap-2 text-lg"
              >
                Complete Registration
                <CheckCircle className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}