import { useState, useEffect } from 'react';
import { User, CreditCard, MapPin, Package, Shield, Star, Award, CheckCircle, XCircle, RefreshCcw, Clock, Box, Smartphone, Link as LinkIcon, Plus, Minus, Search } from 'lucide-react';
import { useNavigate } from 'react-router';
import { products } from '../data/mockData';

type TabType = 'profile' | 'subscription' | 'credit' | 'recurring';

export default function Account() {
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const navigate = useNavigate();

  const [pendingCreditLimit, setPendingCreditLimit] = useState(5000);
  const initialCreditLimit = parseInt(sessionStorage.getItem('creditLimit') || '0', 10);
  const initialUsedCredit = parseInt(sessionStorage.getItem('usedCredit') || '0', 10);

  const [customer, setCustomer] = useState({
    shopName: 'Mama Shop #493',
    uen: '201012345C',
    contactPerson: 'John Tan',
    email: 'john.tan@mamashop493.com',
    phone: '+65 9123 4567',
    address: '123 Hougang Ave 3, #01-234, Singapore 530123',
    creditLimit: initialCreditLimit,
    usedCredit: initialUsedCredit,
    availableCredit: Math.max(0, initialCreditLimit - initialUsedCredit),
    membershipTier: sessionStorage.getItem('accountType') || 'normal',
    memberSince: 'Jan 2024',
    rewardsPoints: 12400,
    nextBillingDate: 'April 20, 2026',
  });

  const [isGrabLinked, setIsGrabLinked] = useState(sessionStorage.getItem('grabLinked') === 'true');
  const [isLinkingModalOpen, setIsLinkingModalOpen] = useState(false);
  const [grabPhone, setGrabPhone] = useState('');
  const [grabEmail, setGrabEmail] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isRecurringCardLinked, setIsRecurringCardLinked] = useState(sessionStorage.getItem('recurringCardLinked') === 'true');
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productSearchQuery, setProductSearchQuery] = useState('');
  const [selectedQuantities, setSelectedQuantities] = useState<{ [key: string]: number }>({});
  const [recurringOrders, setRecurringOrders] = useState<any[]>([]);

  useEffect(() => {
    const handleStorageUpdate = () => {
      const currentCreditLimit = parseInt(sessionStorage.getItem('creditLimit') || '0', 10);
      const currentUsedCredit = parseInt(sessionStorage.getItem('usedCredit') || '0', 10);
      setCustomer(prev => ({
        ...prev,
        creditLimit: currentCreditLimit,
        usedCredit: currentUsedCredit,
        availableCredit: Math.max(0, currentCreditLimit - currentUsedCredit),
        membershipTier: sessionStorage.getItem('accountType') || 'normal'
      }));
    };

    // Sync on mount just in case
    handleStorageUpdate();

    window.addEventListener('accountTypeChanged', handleStorageUpdate);
    return () => window.removeEventListener('accountTypeChanged', handleStorageUpdate);
  }, []);

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
                    <span className="whitespace-nowrap">Grab PayLater Overview</span>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('recurring')}
                  className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition-all ${
                    activeTab === 'recurring'
                      ? 'bg-gradient-to-r from-orange-100 to-orange-50 text-[#d08700] border-2 border-[#ff6900]'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <RefreshCcw className="w-5 h-5 flex-shrink-0" />
                    <span className="whitespace-nowrap">Recurring Orders</span>
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
                          <p className="text-gray-700 mb-6">Unlock Grab Pay Later access and priority delivery.</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                            {[
                              'Priority order processing',
                              'Grab Pay Later splitting',
                              'Natively Integrated Grab ID',
                              'Flexible Weekly Payment',
                            ].map((benefit, index) => (
                              <div key={index} className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-[#ff6900] flex-shrink-0" />
                                <span className="text-gray-800 font-medium">{benefit}</span>
                              </div>
                            ))}
                          </div>

                          <div className="text-right mt-4">
                            <button 
                              onClick={() => {
                                setCustomer({ ...customer, membershipTier: 'prime' });
                                sessionStorage.setItem('accountType', 'prime');
                                // Reset Grab Link on fresh upgrade
                                sessionStorage.removeItem('grabLinked');
                                sessionStorage.removeItem('grabEmail');
                                setIsGrabLinked(false);
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
                            // Disconnect Grab on Cancellation
                            sessionStorage.removeItem('grabLinked');
                            sessionStorage.removeItem('grabEmail');
                            setIsGrabLinked(false);
                            window.dispatchEvent(new Event('accountTypeChanged'));
                          }}
                          className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-2.5 rounded-xl font-bold hover:shadow-xl transition-all"
                        >
                          Cancel Subscription
                        </button>
                      </div>

                      <div className="bg-white border-2 border-gray-100 rounded-2xl p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 font-outfit uppercase tracking-tight">Connected Accounts</h3>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#00b14f] rounded-xl flex items-center justify-center shadow-lg shadow-green-500/10">
                              <img src="https://static.grab.com/wp-content/uploads/media/images/grab_logo_2021.png" className="w-8 h-8 object-contain brightness-0 invert" alt="Grab" />
                            </div>
                            <div>
                               <p className="font-bold text-gray-900">Grab ID Account</p>
                               <p className="text-xs text-gray-500">{isGrabLinked ? `${sessionStorage.getItem('grabEmail') || 'john.tan@email.com'} (Linked)` : 'Not linked yet'}</p>
                            </div>
                          </div>
                          {!isGrabLinked ? (
                             <button 
                               onClick={() => {
                                 setIsLinkingModalOpen(true);
                               }}
                               className="bg-[#00b14f] text-white px-4 py-2 rounded-lg font-bold text-sm hover:scale-105 transition-all"
                             >
                               Link Account
                             </button>
                          ) : (
                             <button 
                               onClick={() => {
                                 sessionStorage.removeItem('grabLinked');
                                 sessionStorage.removeItem('grabEmail');
                                 setIsGrabLinked(false);
                               }}
                               className="text-red-500 text-xs font-bold hover:underline"
                             >
                               Disconnect
                             </button>
                          )}
                        </div>
                      </div>

                      {/* Linking Modal */}
                      {isLinkingModalOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in transition-all">
                          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
                            {/* Modal Header */}
                            <div className="bg-[#00b14f] p-6 text-white text-center relative">
                               <button 
                                 onClick={() => setIsLinkingModalOpen(false)}
                                 className="absolute top-4 right-4 hover:bg-white/20 p-2 rounded-full transition-all"
                               >
                                 <XCircle className="w-6 h-6" />
                               </button>
                               <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-black/10">
                                 <img src="https://static.grab.com/wp-content/uploads/media/images/grab_logo_2021.png" className="w-10 h-10 object-contain" alt="Grab" />
                               </div>
                               <h3 className="text-xl font-bold">Link Grab Account</h3>
                               <p className="text-white/80 text-sm mt-1 uppercase tracking-widest font-bold">Safe & Secure Flow</p>
                            </div>

                            {/* Modal Body */}
                            <div className="p-8">
                               {isVerifying ? (
                                 <div className="py-12 text-center">
                                    <div className="w-16 h-16 border-4 border-[#00b14f] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                                    <p className="text-gray-800 font-bold text-lg">Verifying your account...</p>
                                    <p className="text-gray-500 text-sm mt-2">Connecting to Grab secure servers...</p>
                                 </div>
                               ) : (
                                 <div className="space-y-6">
                                    <div className="text-center mb-4">
                                       <p className="text-gray-600 font-medium">Enter your Grab Account details to link with Valu$ Trade Prime</p>
                                    </div>
                                    <div className="space-y-4 text-left">
                                       <div className="space-y-2">
                                          <label className="block text-sm font-bold text-gray-700">Phone Number</label>
                                          <div className="relative">
                                             <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                             <input 
                                               type="text" 
                                               placeholder="+65 9123 4567"
                                               value={grabPhone}
                                               onChange={(e) => setGrabPhone(e.target.value)}
                                               className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-[#00b14f] focus:bg-white transition-all outline-none font-bold text-lg"
                                             />
                                          </div>
                                       </div>
                                       
                                       <div className="space-y-2">
                                          <label className="block text-sm font-bold text-gray-700">Email Address</label>
                                          <div className="relative">
                                             <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                             <input 
                                               type="email" 
                                               placeholder="john.tan@email.com"
                                               value={grabEmail}
                                               onChange={(e) => setGrabEmail(e.target.value)}
                                               className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-[#00b14f] focus:bg-white transition-all outline-none font-bold text-lg"
                                             />
                                          </div>
                                       </div>
                                    </div>
                                    
                                    <button 
                                      onClick={() => {
                                        if (grabPhone.length < 5 || !grabEmail.includes('@')) {
                                          return alert('Please enter a valid phone and email address');
                                        }
                                        setIsVerifying(true);
                                        setTimeout(() => {
                                          setIsVerifying(false);
                                          setIsGrabLinked(true);
                                          setIsLinkingModalOpen(false);
                                          sessionStorage.setItem('grabLinked', 'true');
                                          sessionStorage.setItem('grabEmail', grabEmail);
                                          alert('Grab Account Linked Successfully!');
                                        }, 2000);
                                      }}
                                      className="w-full bg-[#00b14f] text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-green-500/20 hover:scale-[1.02] transition-all"
                                    >
                                      Verify and Connect
                                    </button>
                                 </div>
                               )}
                            </div>
                            
                            <div className="bg-gray-50 p-4 border-t border-gray-100 flex items-center justify-center gap-2">
                               <Shield className="w-4 h-4 text-green-600" />
                               <span className="text-[10px] uppercase font-bold text-gray-400 tracking-tighter">Powered by Grab Secure Auth</span>
                            </div>
                          </div>
                        </div>
                      )}

                    </>
                  )}
                </div>
              )}

              {/* Grab PayLater Overview Tab */}
              {activeTab === 'credit' && (
                <div className="space-y-6">
                  <div className="border-b-2 border-gray-100 pb-4">
                    <h2 className="text-2xl font-bold text-[#0a0a0a]">Grab PayLater Overview</h2>
                  </div>

                  {customer.membershipTier === 'normal' ? (
                    <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-8 text-center mt-8">
                      <Smartphone className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Unlock Buy Now, Pay Later</h3>
                      <p className="text-gray-600 mb-6 font-medium">Upgrade to Trade Prime to access Grab PayLater for all your wholesale orders.</p>
                      <button 
                        onClick={() => setActiveTab('subscription')}
                        className="bg-gradient-to-r from-[#ff6900] to-[#ff8534] text-white px-8 py-3 rounded-xl font-bold hover:shadow-xl transition-all inline-flex items-center gap-2"
                      >
                        <Star className="w-5 h-5 fill-current" />
                        Upgrade to Prime
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="bg-gradient-to-br from-[#00b14f]/10 to-[#00b14f]/5 border-2 border-[#00b14f]/30 rounded-2xl p-6 mb-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#00b14f]/10 rounded-full blur-2xl -mr-16 -mt-16"></div>
                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-4">
                             <div>
                               <p className="text-xs font-bold text-[#00b14f] uppercase tracking-widest mb-1">Integrated Gateway</p>
                               <h3 className="text-2xl font-bold text-gray-900">Grab Pay Later</h3>
                            </div>
                            <div className={`px-4 py-1.5 rounded-full text-sm font-bold shadow-md ${
                              isGrabLinked ? 'bg-[#00b14f] text-white shadow-green-500/20' : 'bg-gray-200 text-gray-500'
                            }`}>
                              {isGrabLinked ? 'Active' : 'Unlinked'}
                            </div>
                          </div>
                          
                          <p className="text-gray-700 mb-6 font-medium">
                            {isGrabLinked 
                              ? 'Your Valu$ Trade Prime account is natively linked with Grab Pay Later. You can comfortably split any wholesale order into 4 interest-free installments safely at checkout.'
                              : 'Connect your Grab ID to activate Grab PayLater and split your wholesale orders into installments seamlessly.'}
                          </p>
                          
                          <div className="flex gap-4">
                             <div className="bg-white/80 p-4 rounded-xl flex-1 border border-[#00b14f]/20 shadow-sm">
                               <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Status</p>
                               <p className={`font-bold flex items-center gap-2 ${isGrabLinked ? 'text-[#00b14f]' : 'text-gray-400'}`}>
                                 {isGrabLinked ? <CheckCircle className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
                                 {isGrabLinked ? 'Ready for Checkout' : 'Linking Required'}
                               </p>
                             </div>
                             <div className="bg-white/80 p-4 rounded-xl flex-1 border border-[#00b14f]/20 shadow-sm">
                               <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Interest Rate</p>
                               <p className="font-bold text-gray-900">0%</p>
                             </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-orange-50 to-orange-100 border-2 border-orange-200 rounded-2xl p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-3">Grab Pay Later Benefits</h3>
                        <div className="space-y-2">
                          {[
                            'Flexible payment terms up to 90 days',
                            'No upfront costs for qualified orders',
                            'Automated Grab payment tracking',
                            'Interest-free 4-month splits',
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
              {/* Recurring Orders Tab */}
              {activeTab === 'recurring' && (
                <div className="space-y-6">
                  <div className="border-b-2 border-gray-100 pb-4 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-[#0a0a0a]">Recurring Orders</h2>
                    <span className="bg-orange-100 text-[#ff6900] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-orange-200">
                       Prime Exclusive
                    </span>
                  </div>

                  {customer.membershipTier === 'normal' ? (
                    <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-12 text-center mt-8">
                      <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <RefreshCcw className="w-10 h-10 text-[#ff6900]" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Automate Your Inventory</h3>
                      <p className="text-gray-600 mb-8 max-w-md mx-auto">
                        Upgrade to Trade Prime to schedule recurring monthly orders. We'll automatically reserve stock for you so you'll never run out of your best-sellers.
                      </p>
                      <button 
                        onClick={() => setActiveTab('subscription')}
                        className="bg-gradient-to-r from-[#ff6900] to-[#ff8534] text-white px-10 py-4 rounded-2xl font-bold hover:shadow-xl transition-all inline-flex items-center gap-2 text-lg"
                      >
                        <Star className="w-5 h-5 fill-current" />
                        Unlock Recurring Orders
                      </button>
                    </div>
                  ) : !isRecurringCardLinked ? (
                    <div className="bg-white border-2 border-gray-100 rounded-3xl p-10 text-center shadow-sm">
                      <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6 text-indigo-600">
                        <CreditCard className="w-10 h-10" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Payment Method Required</h3>
                      <p className="text-gray-600 mb-6 max-w-md mx-auto">
                        To enable automated stock reservation and recurring orders, please link a credit or debit card for the monthly billing cycles.
                      </p>
                      
                      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 max-w-sm mx-auto flex items-start gap-3 text-left">
                         <XCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                         <p className="text-xs text-amber-800 font-medium">
                            <strong>Note:</strong> Grab Pay Later is currently not supported for recurring monthly schedules.
                         </p>
                      </div>

                      <button 
                        onClick={() => setIsCardModalOpen(true)}
                        className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center gap-2 mx-auto"
                      >
                        <LinkIcon className="w-5 h-5" />
                        Link Payment Card
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                        <div className="relative z-10">
                           <div className="flex items-center gap-4 mb-4">
                              <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
                                 <Shield className="w-8 h-8 text-indigo-300" />
                              </div>
                              <div>
                                 <h3 className="text-2xl font-bold">Guaranteed Stock Availability</h3>
                                 <p className="text-indigo-200 text-sm">Inventory reserved 7 days before your scheduled delivery</p>
                              </div>
                           </div>
                           <p className="text-white/80 max-w-2xl">
                             As a Trade Prime user, your recurring orders bypass standard inventory limits. We pre-allocate stock from our Hub Outlets to ensure your business remains undisrupted.
                           </p>
                        </div>
                      </div>

                      {recurringOrders.length === 0 ? (
                        <div className="py-16 text-center bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl">
                           <Box className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                           <p className="text-gray-500 font-medium">No recurring orders scheduled yet.</p>
                           <p className="text-gray-400 text-sm">Start by adding your first best-seller below.</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 gap-4">
                           {recurringOrders.map((order, idx) => (
                             <div key={idx} className="bg-white border-2 border-gray-100 rounded-2xl p-6 flex items-center justify-between hover:border-indigo-200 transition-all shadow-sm">
                                <div className="flex items-center gap-4">
                                   <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100">
                                      <Box className="w-7 h-7 text-indigo-600" />
                                   </div>
                                   <div>
                                      <p className="font-bold text-lg text-gray-900">{order.name}</p>
                                      <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                                         <span className="flex items-center gap-1 font-medium"><Clock className="w-4 h-4" /> {order.frequency}</span>
                                         <span className="flex items-center gap-1 font-medium text-green-600"><CheckCircle className="w-4 h-4" /> Stock Reserved</span>
                                      </div>
                                   </div>
                                </div>
                                <div className="text-right flex items-center gap-8">
                                   <div>
                                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Quantity</p>
                                      <p className="text-lg font-bold text-gray-900">{order.qty} Cases</p>
                                   </div>
                                   <div className="border-l border-gray-100 pl-8">
                                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Monthly Deduction</p>
                                      <p className="text-xl font-black text-indigo-600">${order.totalPrice.toFixed(2)}</p>
                                      <p className="text-[10px] text-indigo-400 font-bold">Next: {order.nextDate}</p>
                                   </div>
                                </div>
                             </div>
                           ))}
                        </div>
                      )}

                      <button 
                        onClick={() => setIsProductModalOpen(true)}
                        className="w-full border-2 border-dashed border-gray-300 rounded-3xl py-12 flex flex-col items-center justify-center gap-3 text-gray-400 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50 transition-all mt-4"
                      >
                         <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center border-2 border-gray-200 group-hover:scale-110 transition-transform">
                            <Plus className="w-6 h-6" />
                         </div>
                         <span className="font-bold text-lg">Add New Recurring Product</span>
                      </button>
                    </div>
                  )}

                  {/* Product Selection Modal */}
                  {isProductModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in transition-all">
                       <div className="bg-white rounded-3xl w-full max-w-2xl h-[80vh] flex flex-col overflow-hidden shadow-2xl">
                          <div className="bg-indigo-600 p-6 text-white text-center relative">
                             <button onClick={() => setIsProductModalOpen(false)} className="absolute top-4 right-4 hover:bg-white/20 p-2 rounded-full"><XCircle className="w-6 h-6" /></button>
                             <h3 className="text-xl font-bold">Select Recurring Products</h3>
                             <p className="text-indigo-100 text-xs mt-1 uppercase tracking-widest font-bold font-outfit">Guaranteed Stock Fulfillment</p>
                          </div>
                          
                          <div className="p-6 bg-gray-50 border-b border-gray-200">
                             <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input 
                                  type="text" 
                                  placeholder="Search products..." 
                                  value={productSearchQuery}
                                  onChange={(e) => setProductSearchQuery(e.target.value)}
                                  className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-100 rounded-2xl focus:border-indigo-500 outline-none" 
                                />
                             </div>
                          </div>

                          <div className="flex-1 overflow-y-auto p-6 space-y-4">
                             {products.filter(p => p.name.toLowerCase().includes(productSearchQuery.toLowerCase())).map(product => (
                               <div key={product.id} className="flex items-center justify-between p-4 border-2 border-gray-50 rounded-2xl hover:border-indigo-100 transition-all">
                                  <div className="flex items-center gap-4">
                                     <img src={product.image} className="w-12 h-12 object-contain" alt={product.name} />
                                     <div>
                                        <p className="font-bold text-gray-900">{product.name}</p>
                                        <p className="text-xs text-gray-500">${product.cashPrice.toFixed(2)} / {product.unit}</p>
                                     </div>
                                  </div>
                                  <div className="flex items-center gap-3">
                                     <button 
                                       onClick={() => setSelectedQuantities(prev => ({ ...prev, [product.id]: Math.max(0, (prev[product.id] || 0) - 1) }))}
                                       className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all"
                                     >
                                        <Minus className="w-4 h-4" />
                                     </button>
                                     <span className="w-8 text-center font-bold">{selectedQuantities[product.id] || 0}</span>
                                     <button 
                                       onClick={() => setSelectedQuantities(prev => ({ ...prev, [product.id]: (prev[product.id] || 0) + 1 }))}
                                       className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-green-50 hover:text-green-500 transition-all"
                                     >
                                        <Plus className="w-4 h-4" />
                                     </button>
                                  </div>
                               </div>
                             ))}
                          </div>

                          <div className="p-6 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
                             <div className="flex gap-8">
                                <div>
                                   <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Total Items</p>
                                   <p className="text-xl font-bold text-indigo-600">
                                      {Object.values(selectedQuantities).reduce((a, b) => a + b, 0)} Items
                                   </p>
                                </div>
                                <div className="border-l border-gray-200 pl-8">
                                   <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Monthly Total</p>
                                   <p className="text-2xl font-black text-[#00b14f]">
                                      ${Object.entries(selectedQuantities).reduce((total, [id, qty]) => {
                                        const p = products.find(prod => prod.id === id);
                                        return total + (p?.cashPrice || 0) * qty;
                                      }, 0).toFixed(2)}
                                   </p>
                                </div>
                             </div>
                             <button 
                               onClick={() => {
                                 const selectedItems = Object.entries(selectedQuantities)
                                   .filter(([_, qty]) => qty > 0)
                                   .map(([id, qty]) => {
                                     const p = products.find(prod => prod.id === id);
                                     return {
                                       name: p?.name,
                                       qty: qty,
                                       totalPrice: (p?.cashPrice || 0) * qty,
                                       frequency: 'Monthly (1st)',
                                       nextDate: 'April 01, 2026',
                                       status: 'Active'
                                     };
                                   });
                                 
                                 if (selectedItems.length === 0) return alert('Please select at least one product');
                                 
                                 setRecurringOrders(prev => [...prev, ...selectedItems]);
                                 setIsProductModalOpen(false);
                                 setSelectedQuantities({});
                                 alert('Recurring Schedule Created Successfully!');
                               }}
                               className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 shadow-xl shadow-indigo-200 transition-all font-outfit"
                             >
                               Confirm Schedule
                             </button>
                          </div>
                       </div>
                    </div>
                  )}

                  {/* Card Modal */}
                  {isCardModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in transition-all">
                      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
                        <div className="bg-indigo-600 p-6 text-white text-center relative">
                           <button onClick={() => setIsCardModalOpen(false)} className="absolute top-4 right-4 hover:bg-white/20 p-2 rounded-full"><XCircle className="w-6 h-6" /></button>
                           <h3 className="text-xl font-bold">Setup Recurring Payment</h3>
                           <p className="text-indigo-100 text-xs mt-1 uppercase tracking-widest font-bold">Secure Card Verification</p>
                        </div>
                        <div className="p-8 space-y-4">
                           <div>
                              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Card Number</label>
                              <div className="relative">
                                 <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                 <input type="text" placeholder="**** **** **** 1234" className="w-full pl-12 pr-4 py-3 border-2 border-gray-100 rounded-xl focus:border-indigo-500 outline-none font-medium" />
                              </div>
                           </div>
                           <div className="grid grid-cols-2 gap-4">
                              <div>
                                 <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Expiry Date</label>
                                 <input type="text" placeholder="MM/YY" className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-indigo-500 outline-none font-medium" />
                              </div>
                              <div>
                                 <label className="block text-xs font-bold text-gray-500 uppercase mb-2">CVV</label>
                                 <input type="text" placeholder="***" className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-indigo-500 outline-none font-medium" />
                              </div>
                           </div>
                           <button 
                             onClick={() => {
                               setIsRecurringCardLinked(true);
                               sessionStorage.setItem('recurringCardLinked', 'true');
                               setIsCardModalOpen(false);
                             }}
                             className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all mt-4"
                           >
                             Save Card & Enable Recurring
                           </button>
                        </div>
                      </div>
                    </div>
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