import { useState } from 'react';
import { User, CreditCard, MapPin, Package, Shield, Star, Award, CheckCircle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router';

type TabType = 'profile' | 'subscription' | 'credit';

export default function Account() {
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const navigate = useNavigate();

  const [pendingCreditLimit, setPendingCreditLimit] = useState(5000);
  const initialCreditLimit = parseInt(sessionStorage.getItem('creditLimit') || '0', 10);

  const [customer, setCustomer] = useState({
    shopName: 'Mama Shop #493',
    uen: '201012345C',
    contactPerson: 'John Tan',
    email: 'john.tan@mamashop493.com',
    phone: '+65 9123 4567',
    address: '123 Hougang Ave 3, #01-234, Singapore 530123',
    creditLimit: initialCreditLimit,
    usedCredit: 0,
    availableCredit: initialCreditLimit,
    membershipTier: sessionStorage.getItem('accountType') || 'normal',
    memberSince: 'Jan 2024',
    rewardsPoints: 12400,
    nextBillingDate: 'April 20, 2026',
  });

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-orange-50 min-h-screen">
      <div className="max-w-[1400px] mx-auto p-8">
        <h1 className="font-bold text-3xl text-[#101828] mb-8">Account Management</h1>

        <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr]">
            {/* Sidebar Navigation */}
            <div className="bg-gradient-to-br from-gray-50 to-white border-r-2 border-gray-100 p-6">
              <div className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition-all ${
                    activeTab === 'profile'
                      ? 'bg-gradient-to-r from-orange-100 to-orange-50 text-[#d08700] border-2 border-[#ff6900]'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5" />
                    <span>Profile & Business</span>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('subscription')}
                  className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition-all ${
                    activeTab === 'subscription'
                      ? 'bg-gradient-to-r from-orange-100 to-orange-50 text-[#d08700] border-2 border-[#ff6900]'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Star className="w-5 h-5" />
                    <span>Subscription (Prime)</span>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('credit')}
                  className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition-all ${
                    activeTab === 'credit'
                      ? 'bg-gradient-to-r from-orange-100 to-orange-50 text-[#d08700] border-2 border-[#ff6900]'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 flex-shrink-0" />
                    <span className="whitespace-nowrap">B2B Credit & BNPL</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="p-8">
              {/* Profile & Business Tab */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div className="border-b-2 border-gray-100 pb-4">
                    <h2 className="text-2xl font-bold text-[#0a0a0a]">Business Profile</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Shop Name</label>
                      <input
                        type="text"
                        defaultValue={customer.shopName}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#ff6900] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">UEN</label>
                      <input
                        type="text"
                        defaultValue={customer.uen}
                        disabled
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-500"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Business Address</label>
                      <textarea
                        defaultValue={customer.address}
                        rows={3}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#ff6900] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <button className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:shadow-xl transition-all">
                    Save Changes
                  </button>
                </div>
              )}

              {/* Subscription Tab */}
              {activeTab === 'subscription' && (
                <div className="space-y-6">
                  <div className="border-b-2 border-gray-100 pb-4">
                    <h2 className="text-2xl font-bold text-[#0a0a0a]">Subscription Plan</h2>
                  </div>

                  {customer.membershipTier === 'normal' ? (
                    <>
                      <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-gray-800 mb-1">Normal Business Account</h3>
                            <p className="text-sm text-gray-500">Free tier for traditional retailers</p>
                          </div>
                          <div className="bg-gray-200 text-gray-600 px-3 py-1 rounded-lg font-bold text-sm">
                            Current Plan
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-[#ff6900] rounded-2xl p-8 relative overflow-hidden shadow-lg">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff6900]/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                        <div className="relative z-10">
                          <div className="flex items-center gap-3 mb-2">
                            <Star className="w-8 h-8 text-[#ff6900]" fill="#ff6900" />
                            <h3 className="text-2xl font-bold text-gray-900">Upgrade to Trade Prime</h3>
                          </div>
                          <p className="text-gray-700 mb-6">Unlock exclusive pricing, early BNPL access, and priority delivery.</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                            {[
                              'Exclusive wholesale pricing',
                              'Priority order processing',
                              'Extended BNPL credit terms',
                              'Free delivery on orders above $500',
                            ].map((benefit, index) => (
                              <div key={index} className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-[#ff6900] flex-shrink-0" />
                                <span className="text-gray-800 font-medium">{benefit}</span>
                              </div>
                            ))}
                          </div>

                          <div className="flex items-center justify-between bg-white/60 p-4 rounded-xl">
                            <div>
                              <span className="text-3xl font-bold text-[#ff6900]">$29</span>
                              <span className="text-gray-600"> / month</span>
                            </div>
                            <button 
                              onClick={() => {
                                setCustomer({ ...customer, membershipTier: 'prime' });
                                sessionStorage.setItem('accountType', 'prime');
                                window.dispatchEvent(new Event('accountTypeChanged'));
                              }}
                              className="bg-gradient-to-r from-[#ff6900] to-[#ff8534] text-white px-8 py-3 rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all"
                            >
                              Upgrade Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-[#ff6900] rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-[#733e0a] mb-1">Active Prime Member</h3>
                            <p className="text-sm text-[#a65f00]">Next billing date: {customer.nextBillingDate}</p>
                          </div>
                          <Star className="w-10 h-10 text-[#f0b100]" fill="#f0b100" />
                        </div>

                        <button 
                          onClick={() => {
                            setCustomer({ ...customer, membershipTier: 'normal' });
                            sessionStorage.setItem('accountType', 'normal');
                            window.dispatchEvent(new Event('accountTypeChanged'));
                          }}
                          className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-2.5 rounded-xl font-bold hover:shadow-xl transition-all"
                        >
                          Cancel Subscription
                        </button>
                      </div>

                      <div className="bg-white border-2 border-gray-100 rounded-2xl p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Subscription Benefits</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[
                            'Exclusive wholesale pricing',
                            'Priority order processing',
                            'Extended BNPL credit terms',
                            'Free delivery on orders above $500',
                            'Access to member-only deals',
                            'Dedicated account manager',
                          ].map((benefit, index) => (
                            <div key={index} className="flex items-center gap-3">
                              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                              <span className="text-gray-700">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                    </>
                  )}
                </div>
              )}

              {/* B2B Credit & BNPL Tab */}
              {activeTab === 'credit' && (
                <div className="space-y-6">
                  <div className="border-b-2 border-gray-100 pb-4">
                    <h2 className="text-2xl font-bold text-[#0a0a0a]">B2B Credit & BNPL</h2>
                  </div>

                  {customer.membershipTier === 'normal' ? (
                    <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-8 text-center mt-8">
                      <CreditCard className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Subscribe to Trade Prime</h3>
                      <p className="text-gray-600 mb-6 font-medium">Please subscribe to the Trade Prime plan to view and manage your B2B Credit Limit.</p>
                      <button 
                        onClick={() => setActiveTab('subscription')}
                        className="bg-gradient-to-r from-[#ff6900] to-[#ff8534] text-white px-8 py-3 rounded-xl font-bold hover:shadow-xl transition-all inline-flex items-center gap-2"
                      >
                        <Star className="w-5 h-5 fill-current" />
                        Upgrade to Prime
                      </button>
                    </div>
                  ) : customer.creditLimit === 0 ? (
                    <div className="space-y-6">
                      <div className="text-center mb-8">
                        <p className="text-gray-600 font-medium">Please select a BNPL credit limit for your new Prime account</p>
                      </div>

                      <div className="space-y-4 mb-8">
                        {[3000, 5000, 10000].map((limit) => (
                          <div
                            key={limit}
                            onClick={() => setPendingCreditLimit(limit)}
                            className={`bg-white rounded-2xl border-2 p-6 cursor-pointer transition-all ${
                              pendingCreditLimit === limit
                                ? 'border-[#ff6900] shadow-xl'
                                : 'border-gray-200 hover:border-[#ff6900] hover:shadow-lg'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                                  pendingCreditLimit === limit
                                    ? 'border-[#ff6900] bg-[#ff6900]'
                                    : 'border-gray-300'
                                }`}>
                                  {pendingCreditLimit === limit && (
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

                      <button
                        onClick={() => {
                          setCustomer({ ...customer, creditLimit: pendingCreditLimit, availableCredit: pendingCreditLimit });
                          sessionStorage.setItem('creditLimit', pendingCreditLimit.toString());
                        }}
                        className="w-full bg-gradient-to-r from-[#155dfc] to-[#3b82f6] text-white px-6 py-4 rounded-xl font-bold hover:shadow-xl hover:-translate-y-1 transition-all text-lg"
                      >
                        Confirm Credit Limit
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-2xl p-6 flex items-start justify-between">
                          <div>
                            <p className="text-sm font-semibold text-[#1c398e] mb-2">Total Credit Limit</p>
                            <p className="text-4xl font-bold text-[#1c398e]">${customer.creditLimit.toFixed(2)}</p>
                          </div>
                          <button
                            onClick={() => {
                              setPendingCreditLimit(customer.creditLimit);
                              setCustomer({...customer, creditLimit: 0});
                            }}
                            className="bg-white text-[#155dfc] text-sm px-4 py-2 rounded-lg font-bold hover:bg-blue-50 transition-all border border-blue-200"
                          >
                            Change limit
                          </button>
                        </div>

                        <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-2xl p-6">
                          <p className="text-sm font-semibold text-[#0d542b] mb-2">Available Credit</p>
                          <p className="text-4xl font-bold text-[#0d542b]">${customer.availableCredit.toFixed(2)}</p>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-orange-50 to-orange-100 border-2 border-orange-200 rounded-2xl p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-3">BNPL Benefits</h3>
                        <div className="space-y-2">
                          {[
                            'Flexible payment terms up to 90 days',
                            'No upfront costs for qualified orders',
                            'Automated payment tracking',
                            'Build business credit score',
                          ].map((benefit, index) => (
                            <div key={index} className="flex items-center gap-3">
                              <Award className="w-5 h-5 text-[#ff6900] flex-shrink-0" />
                              <span className="text-gray-700">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={() => navigate('/customer/payments')}
                        className="w-full bg-gradient-to-r from-[#155dfc] to-[#3b82f6] text-white px-6 py-3 rounded-xl font-bold hover:shadow-xl transition-all"
                      >
                        View Payment Schedule
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}