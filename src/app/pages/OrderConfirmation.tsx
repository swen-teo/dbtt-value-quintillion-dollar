import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { CheckCircle, Package, MapPin, Calendar, CreditCard, ArrowRight, Download } from 'lucide-react';

export default function OrderConfirmation() {
  const navigate = useNavigate();
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    const savedOrderStr = localStorage.getItem('lastOrder');
    if (savedOrderStr) {
      const savedOrder = JSON.parse(savedOrderStr);
      setOrder({
        id: savedOrder.id,
        date: savedOrder.createdAt,
        total: savedOrder.total,
        paymentMethod: savedOrder.paymentMethod,
        installments: 4,
        installmentAmount: savedOrder.total / 4,
        pickupType: savedOrder.pickupType,
        pickupLocation: savedOrder.pickupLocation,
        pickupAddress: savedOrder.pickupLocation, // Location name acts as address backup
        pickupDate: savedOrder.pickupDate,
        items: savedOrder.items.map((i: any) => ({
          name: i.product.name,
          quantity: i.quantity,
          price: (savedOrder.paymentMethod === 'bnpl' ? i.product.bnplPrice : i.product.cashPrice) * i.quantity
        }))
      });
    } else {
      // Default fallback if no order
      setOrder({
        id: 'ORD-1003',
        date: new Date().toISOString(),
        total: 247.50,
        paymentMethod: 'bnpl',
        installments: 4,
        installmentAmount: 61.88,
        pickupType: 'scheduled',
        pickupLocation: 'Valu$ Tampines Outlet',
        pickupAddress: '456 Tampines Ave 9, Singapore 520456',
        pickupDate: '2026-03-25',
        items: [
          { name: 'Premium Cola (24x330ml)', quantity: 2, price: 45.00 },
          { name: 'Potato Chips Box (60x30g)', quantity: 3, price: 76.50 },
          { name: 'Instant Noodles (40 packs)', quantity: 4, price: 88.00 },
        ],
      });
    }
  }, []);

  if (!order) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      <div className="max-w-[900px] mx-auto p-8">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full mb-6 shadow-2xl shadow-green-500/30 animate-bounce">
            <CheckCircle className="w-14 h-14 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">Order Confirmed!</h1>
          <p className="text-xl text-gray-600">Thank you for your order. We're preparing it for pickup.</p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-3xl border-2 border-gray-200 overflow-hidden shadow-xl mb-8">
          {/* Order Header */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-8 text-white">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-white/80 text-sm mb-1">Order Number</p>
                <p className="text-3xl font-bold">{order.id}</p>
              </div>
              <div className="text-right">
                <p className="text-white/80 text-sm mb-1">Order Date</p>
                <p className="text-lg font-semibold">
                  {new Date(order.date).toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="p-8 border-b-2 border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
                <Package className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Order Items</h2>
            </div>

            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
                  <div className="flex-1">
                    <p className="font-semibold text-lg text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-bold text-xl text-gray-900">${item.price.toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t-2 border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-xl font-semibold text-gray-900">Total Amount</span>
                <span className="text-4xl font-bold text-gray-900">${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className={`p-8 border-b-2 border-gray-100 ${order.paymentMethod === 'bnpl' ? 'bg-[#00b14f]/5' : 'bg-orange-50'}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${
                order.paymentMethod === 'bnpl' 
                  ? 'bg-gradient-to-br from-[#00b14f] to-[#018a3e] shadow-green-500/20' 
                  : 'bg-gradient-to-br from-orange-500 to-orange-600 shadow-orange-500/20'
              }`}>
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                {order.paymentMethod === 'bnpl' ? 'Payment Plan' : 'Payment Method'}
              </h2>
            </div>

            <div className={`bg-white rounded-2xl p-6 border-2 ${
              order.paymentMethod === 'bnpl' ? 'border-[#00b14f]/30' : 'border-orange-200'
            }`}>
              {order.paymentMethod === 'bnpl' ? (
                <>
                  <p className="text-gray-700 mb-4">
                    <span className="font-bold text-lg text-[#00b14f]">Grab Pay Later</span> - {order.installments} Weekly Installments
                  </p>
                  
                  <div className="grid grid-cols-4 gap-3">
                    {Array.from({ length: order.installments }).map((_, index) => (
                      <div key={index} className="bg-[#00b14f]/5 border border-[#00b14f]/20 rounded-xl p-3 text-center">
                        <p className="text-xs text-green-900 mb-1">Week {index + 1}</p>
                        <p className="font-bold text-lg text-gray-900">${order.installmentAmount.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>

                  <p className="text-sm text-gray-600 mt-4 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#00b14f]" />
                    0% interest • Automated via Grab • Seamlessly split
                  </p>
                </>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-lg text-gray-900">Credit / Debit Card</p>
                    <p className="text-sm text-gray-600">Securely processed immediately</p>
                  </div>
                  <div className="bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-bold">
                    Paid Successfully
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Pickup Info */}
          <div className="p-8 bg-orange-50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Pickup Details</h2>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-orange-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <MapPin className="w-5 h-5" />
                    <span className="text-sm font-semibold uppercase tracking-wide">Location</span>
                  </div>
                  <p className="font-bold text-lg text-gray-900 mb-1">{order.pickupLocation}</p>
                  <p className="text-sm text-gray-600">{order.pickupAddress}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Calendar className="w-5 h-5" />
                    <span className="text-sm font-semibold uppercase tracking-wide">Pickup Date</span>
                  </div>
                  <p className="font-bold text-lg text-gray-900">
                    {new Date(order.pickupDate).toLocaleDateString('en-US', { 
                      weekday: 'long',
                      month: 'long', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </p>
                  <p className="text-sm text-gray-600">Available for pickup after 2:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <button
            onClick={() => navigate('/customer/my-orders')}
            className="bg-gradient-to-r from-[#ff6900] to-[#ff8534] text-white py-4 rounded-2xl font-bold hover:shadow-xl hover:shadow-orange-500/20 transition-all flex items-center justify-center gap-2"
          >
            View Order Status
            <ArrowRight className="w-5 h-5" />
          </button>

          <button className="border-2 border-gray-300 text-gray-700 py-4 rounded-2xl font-bold hover:border-gray-400 hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
            Download Receipt
            <Download className="w-5 h-5" />
          </button>
        </div>

        {/* Continue Shopping */}
        <div className="text-center">
          <button
            onClick={() => navigate('/customer/shop')}
            className="inline-flex items-center gap-2 text-[#ff6900] font-bold hover:text-[#ff8534] transition-colors text-lg"
          >
            Continue Shopping
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
