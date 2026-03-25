import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, CreditCard, CheckCircle, AlertCircle, Shield, Calendar, DollarSign } from 'lucide-react';

export default function AutoPay() {
  const navigate = useNavigate();
  const [autoPayEnabled, setAutoPayEnabled] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('bank');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-[900px] mx-auto p-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/customer/payments')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 font-medium transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Payment Schedule
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">Auto-Pay Settings</h1>
          <p className="text-gray-600 text-lg">Manage your automatic payment preferences</p>
        </div>

        {/* Auto-Pay Status Card */}
        <div className={`rounded-2xl p-8 mb-8 border-2 ${autoPayEnabled ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200' : 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200'}`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${autoPayEnabled ? 'bg-green-500' : 'bg-gray-400'} shadow-lg`}>
                {autoPayEnabled ? (
                  <CheckCircle className="w-8 h-8 text-white" />
                ) : (
                  <AlertCircle className="w-8 h-8 text-white" />
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  Auto-Pay is {autoPayEnabled ? 'Active' : 'Inactive'}
                </h2>
                <p className="text-gray-600">
                  {autoPayEnabled 
                    ? 'Payments will be automatically deducted on due dates'
                    : 'You will need to manually pay each installment'}
                </p>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={autoPayEnabled}
                onChange={(e) => setAutoPayEnabled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-16 h-8 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-8 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-500"></div>
            </label>
          </div>

          {autoPayEnabled && (
            <div className="flex items-center gap-3 text-sm text-gray-700 bg-white/60 backdrop-blur-sm rounded-xl p-4">
              <Shield className="w-5 h-5 text-green-600" />
              <p>Your account is protected. We'll only charge on scheduled payment dates.</p>
            </div>
          )}
        </div>

        {/* Payment Method Selection */}
        {autoPayEnabled && (
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Payment Method</h3>

            <div className="space-y-4">
              {/* Bank Account */}
              <label className={`flex items-center gap-4 p-6 border-2 rounded-2xl cursor-pointer transition-all ${paymentMethod === 'bank' ? 'border-[#ff6900] bg-orange-50' : 'border-gray-200 hover:border-gray-300'}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="bank"
                  checked={paymentMethod === 'bank'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-5 h-5 text-[#ff6900] focus:ring-[#ff6900]"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-bold text-lg text-gray-900">Bank Account (GIRO)</p>
                      <p className="text-sm text-gray-600">DBS Bank • •••• 4521</p>
                    </div>
                  </div>
                </div>
                {paymentMethod === 'bank' && (
                  <CheckCircle className="w-6 h-6 text-[#ff6900]" />
                )}
              </label>

              {/* Credit Card */}
              <label className={`flex items-center gap-4 p-6 border-2 rounded-2xl cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-[#ff6900] bg-orange-50' : 'border-gray-200 hover:border-gray-300'}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-5 h-5 text-[#ff6900] focus:ring-[#ff6900]"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-bold text-lg text-gray-900">Credit/Debit Card</p>
                      <p className="text-sm text-gray-600">Visa • •••• 8765</p>
                    </div>
                  </div>
                </div>
                {paymentMethod === 'card' && (
                  <CheckCircle className="w-6 h-6 text-[#ff6900]" />
                )}
              </label>
            </div>

            <button className="mt-6 w-full border-2 border-dashed border-gray-300 text-gray-600 py-4 rounded-2xl font-semibold hover:border-[#ff6900] hover:text-[#ff6900] transition-all">
              + Add New Payment Method
            </button>
          </div>
        )}

        {/* Payment Schedule Info */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white shadow-2xl">
          <h3 className="text-2xl font-bold mb-6">How Auto-Pay Works</h3>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-lg mb-1">Automatic Scheduling</p>
                <p className="text-gray-300">Payments are automatically deducted on your scheduled due dates every week.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-lg mb-1">No Extra Fees</p>
                <p className="text-gray-300">Auto-Pay is completely free with no additional charges or processing fees.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-lg mb-1">Secure & Protected</p>
                <p className="text-gray-300">Your payment information is encrypted and stored securely with bank-level security.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={() => {
              alert('Settings saved successfully!');
              navigate('/customer/payments');
            }}
            className="flex-1 bg-gradient-to-r from-[#ff6900] to-[#ff8534] text-white py-4 rounded-2xl font-bold hover:shadow-xl hover:shadow-orange-500/20 transition-all"
          >
            Save Settings
          </button>
          <button
            onClick={() => navigate('/customer/payments')}
            className="flex-1 border-2 border-gray-200 text-gray-700 py-4 rounded-2xl font-semibold hover:border-gray-300 hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
