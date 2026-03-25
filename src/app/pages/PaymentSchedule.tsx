import { useState } from 'react';
import { Calendar, CreditCard, CheckCircle, Clock, AlertCircle, Download, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router';

interface Payment {
  id: string;
  orderId: string;
  installmentNumber: number;
  totalInstallments: number;
  amount: number;
  dueDate: string;
  status: 'paid' | 'upcoming' | 'overdue';
  paidDate?: string;
  orderTotal: number;
  items: string[];
}

export default function PaymentSchedule() {
  const navigate = useNavigate();
  const [view, setView] = useState<'upcoming' | 'history'>('upcoming');

  // Mock payment schedule data
  const payments: Payment[] = [
    {
      id: 'PAY-001',
      orderId: 'ORD-1001',
      installmentNumber: 2,
      totalInstallments: 4,
      amount: 112.48,
      dueDate: '2026-03-28',
      status: 'upcoming',
      orderTotal: 449.90,
      items: ['Premium Cola Case', 'Potato Chips Box'],
    },
    {
      id: 'PAY-002',
      orderId: 'ORD-1002',
      installmentNumber: 3,
      totalInstallments: 4,
      amount: 45.75,
      dueDate: '2026-03-30',
      status: 'upcoming',
      orderTotal: 183.00,
      items: ['Instant Noodles Pack'],
    },
    {
      id: 'PAY-003',
      orderId: 'ORD-1001',
      installmentNumber: 1,
      totalInstallments: 4,
      amount: 112.48,
      dueDate: '2026-03-21',
      status: 'paid',
      paidDate: '2026-03-21',
      orderTotal: 449.90,
      items: ['Premium Cola Case', 'Potato Chips Box'],
    },
    {
      id: 'PAY-004',
      orderId: 'ORD-1002',
      installmentNumber: 2,
      totalInstallments: 4,
      amount: 45.75,
      dueDate: '2026-03-23',
      status: 'paid',
      paidDate: '2026-03-22',
      orderTotal: 183.00,
      items: ['Instant Noodles Pack'],
    },
    {
      id: 'PAY-005',
      orderId: 'ORD-1002',
      installmentNumber: 1,
      totalInstallments: 4,
      amount: 45.75,
      dueDate: '2026-03-16',
      status: 'paid',
      paidDate: '2026-03-16',
      orderTotal: 183.00,
      items: ['Instant Noodles Pack'],
    },
  ];

  const upcomingPayments = payments.filter(p => p.status === 'upcoming' || p.status === 'overdue');
  const paidPayments = payments.filter(p => p.status === 'paid');

  const totalUpcoming = upcomingPayments.reduce((sum, p) => sum + p.amount, 0);
  const totalPaid = paidPayments.reduce((sum, p) => sum + p.amount, 0);
  const nextPaymentDate = upcomingPayments.length > 0 
    ? new Date(upcomingPayments.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())[0].dueDate)
    : null;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-xs font-semibold text-emerald-700">Paid</span>
          </div>
        );
      case 'upcoming':
        return (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-xs font-semibold text-blue-700">Upcoming</span>
          </div>
        );
      case 'overdue':
        return (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 border border-red-200 rounded-full">
            <AlertCircle className="w-3.5 h-3.5 text-red-600" />
            <span className="text-xs font-semibold text-red-700">Overdue</span>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-[1200px] mx-auto px-8 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Payment Schedule</h1>
          <p className="text-gray-600">Manage your BNPL installments and payment history</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              {nextPaymentDate && (
                <div className="text-right">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Next Payment</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {nextPaymentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                </div>
              )}
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">${upcomingPayments[0]?.amount.toFixed(2) || '0.00'}</p>
            <p className="text-sm text-gray-600">Due next week</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Total Upcoming</p>
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">${totalUpcoming.toFixed(2)}</p>
            <p className="text-sm text-gray-600">{upcomingPayments.length} installments</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Total Paid</p>
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">${totalPaid.toFixed(2)}</p>
            <p className="text-sm text-gray-600">{paidPayments.length} installments</p>
          </div>
        </div>

        {/* BNPL Info Card */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-6 mb-8 shadow-xl">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20">
                <CreditCard className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-2">Buy Now Pay Later</h3>
                <p className="text-gray-300 text-sm mb-3 max-w-md">
                  Your payments are automatically deducted weekly. Keep your account topped up to avoid late fees.
                </p>
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span className="text-gray-300">0% Interest</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span className="text-gray-300">Auto-Pay Enabled</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span className="text-gray-300">No Hidden Fees</span>
                  </div>
                </div>
              </div>
            </div>
            <button className="px-5 py-2.5 bg-white text-slate-900 rounded-xl font-semibold text-sm hover:bg-gray-100 transition-colors">
              Manage Auto-Pay
            </button>
          </div>
        </div>

        {/* View Toggle */}
        <div className="bg-white rounded-2xl border border-gray-200 p-1.5 inline-flex mb-6 shadow-sm">
          <button
            onClick={() => setView('upcoming')}
            className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all ${
              view === 'upcoming'
                ? 'bg-gradient-to-r from-[#ff6900] to-[#ff8534] text-white shadow-md'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Upcoming ({upcomingPayments.length})
          </button>
          <button
            onClick={() => setView('history')}
            className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all ${
              view === 'history'
                ? 'bg-gradient-to-r from-[#ff6900] to-[#ff8534] text-white shadow-md'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            History ({paidPayments.length})
          </button>
        </div>

        {/* Payments List */}
        <div className="space-y-4">
          {(view === 'upcoming' ? upcomingPayments : paidPayments).map((payment) => (
            <div
              key={payment.id}
              className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-lg text-gray-900">Order #{payment.orderId}</h3>
                    {getStatusBadge(payment.status)}
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    Installment {payment.installmentNumber} of {payment.totalInstallments}
                  </p>
                  <p className="text-xs text-gray-500">
                    {payment.items.join(' • ')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900 mb-1">${payment.amount.toFixed(2)}</p>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">
                    of ${payment.orderTotal.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {payment.status === 'paid' ? 'Paid on' : 'Due'}: {' '}
                      <span className="font-semibold text-gray-900">
                        {new Date(payment.status === 'paid' && payment.paidDate ? payment.paidDate : payment.dueDate).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-[#ff6900] to-[#ff8534] h-2 rounded-full transition-all"
                        style={{ width: `${(payment.installmentNumber / payment.totalInstallments) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-gray-600">
                      {Math.round((payment.installmentNumber / payment.totalInstallments) * 100)}%
                    </span>
                  </div>
                </div>

                {payment.status === 'paid' && (
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    <Download className="w-4 h-4" />
                    Receipt
                  </button>
                )}

                {payment.status === 'upcoming' && (
                  <button
                    onClick={() => navigate(`/customer/payment/${payment.id}`)}
                    className="px-5 py-2 bg-gradient-to-r from-[#155dfc] to-[#3b82f6] text-white rounded-xl text-sm font-semibold hover:shadow-lg transition-all"
                  >
                    Pay Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {(view === 'upcoming' ? upcomingPayments : paidPayments).length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center shadow-sm">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">
              No {view === 'upcoming' ? 'Upcoming' : 'Payment'} {view === 'upcoming' ? 'Payments' : 'History'}
            </h3>
            <p className="text-gray-600">
              {view === 'upcoming' 
                ? "You're all caught up! No upcoming payments at the moment."
                : 'Your payment history will appear here once you make a purchase.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}