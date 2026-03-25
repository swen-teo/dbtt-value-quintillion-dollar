import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, CreditCard, Calendar, CheckCircle, DollarSign, ShieldCheck } from 'lucide-react';

export default function PaymentPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [paymentMethod, setPaymentMethod] = useState('saved-bank');
  const [processing, setProcessing] = useState(false);

  // Mock payment data
  const payment = {
    id: id || 'PAY-001',
    orderId: 'ORD-1001',
    installmentNumber: 2,
    totalInstallments: 4,
    amount: 112.48,
    dueDate: '2026-03-28',
    items: ['Premium Cola Case', 'Potato Chips Box'],
  };

  const handlePayment = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      alert('Payment processed successfully!');
      navigate('/customer/payments');
    }, 2000);
  };

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
          <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">Make Payment</h1>
          <p className="text-gray-600 text-lg">Complete your installment payment</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Amount Card */}
            <div className="bg-gradient-to-br from-[#ff6900] to-[#ff8534] rounded-2xl p-8 text-white shadow-xl shadow-orange-500/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <DollarSign className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-white/80 text-sm">Amount Due</p>
                  <p className="text-4xl font-bold">${payment.amount.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-white/90 text-sm">
                <Calendar className="w-4 h-4" />
                <span>Due: {new Date(payment.dueDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Select Payment Method</h3>

              <div className="space-y-4">
                {/* Saved Bank Account */}
                <label className={`flex items-center gap-4 p-6 border-2 rounded-2xl cursor-pointer transition-all ${paymentMethod === 'saved-bank' ? 'border-[#ff6900] bg-orange-50' : 'border-gray-200 hover:border-gray-300'}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="saved-bank"
                    checked={paymentMethod === 'saved-bank'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5 text-[#ff6900] focus:ring-[#ff6900]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-bold text-lg text-gray-900">Bank Account (GIRO)</p>
                        <p className="text-sm text-gray-600">DBS Bank • •••• 4521</p>
                      </div>
                    </div>
                  </div>
                  {paymentMethod === 'saved-bank' && (
                    <CheckCircle className="w-6 h-6 text-[#ff6900]" />
                  )}
                </label>

                {/* Saved Card */}
                <label className={`flex items-center gap-4 p-6 border-2 rounded-2xl cursor-pointer transition-all ${paymentMethod === 'saved-card' ? 'border-[#ff6900] bg-orange-50' : 'border-gray-200 hover:border-gray-300'}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="saved-card"
                    checked={paymentMethod === 'saved-card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5 text-[#ff6900] focus:ring-[#ff6900]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-bold text-lg text-gray-900">Credit/Debit Card</p>
                        <p className="text-sm text-gray-600">Visa • •••• 8765</p>
                      </div>
                    </div>
                  </div>
                  {paymentMethod === 'saved-card' && (
                    <CheckCircle className="w-6 h-6 text-[#ff6900]" />
                  )}
                </label>
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-900 mb-2">Secure Payment</h4>
                  <p className="text-sm text-gray-700">
                    Your payment is processed securely using bank-level encryption. Your financial information is never stored on our servers.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handlePayment}
                disabled={processing}
                className={`flex-1 bg-gradient-to-r from-[#ff6900] to-[#ff8534] text-white py-5 rounded-2xl font-bold text-lg hover:shadow-xl hover:shadow-orange-500/20 transition-all flex items-center justify-center gap-3 ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {processing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-6 h-6" />
                    Pay ${payment.amount.toFixed(2)}
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Payment Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 shadow-sm sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Payment Summary</h3>

              <div className="space-y-4 mb-6 pb-6 border-b-2 border-gray-100">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Order ID</span>
                  <span className="font-semibold text-gray-900">{payment.orderId}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Installment</span>
                  <span className="font-semibold text-gray-900">
                    {payment.installmentNumber} of {payment.totalInstallments}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Due Date</span>
                  <span className="font-semibold text-gray-900">
                    {new Date(payment.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Order Items</p>
                <ul className="space-y-2">
                  {payment.items.map((item, index) => (
                    <li key={index} className="text-sm text-gray-700 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-[#ff6900] rounded-full"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Total Payment</span>
                  <span className="text-3xl font-bold text-gray-900">${payment.amount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
