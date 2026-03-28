import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { MapPin, Calendar, CreditCard, Banknote, CheckCircle } from 'lucide-react';

import { useProducts, useOutletLocations } from '../hooks/useData';
import { CartItem, OutletLocation } from '../types';
import { supabase } from '../lib/supabaseClient';

export default function Checkout() {
  const navigate = useNavigate();
  const { products } = useProducts();
  const { locations: outletLocations } = useOutletLocations();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [pickupType, setPickupType] = useState<'immediate' | 'scheduled'>('immediate');
  const [selectedOutlet, setSelectedOutlet] = useState<OutletLocation | null>(null);
  const [pickupDate, setPickupDate] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bnpl'>('card');
  const [errorObj, setErrorObj] = useState<string | null>(null);
  
  // Card Details State
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: ''
  });

  const accountType = sessionStorage.getItem('accountType') || 'standard';
  const isGrabLinked = sessionStorage.getItem('grabLinked') === 'true';

  useEffect(() => {
    if (products.length > 0) {
      loadCart();
    }
  }, [products]);

  const loadCart = () => {
    try {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const items: CartItem[] = cart
        .map((item: any) => {
          const product = products.find((p) => p.id === item.productId);
          if (!product) return null;
          return {
            product,
            quantity: item.quantity,
          };
        })
        .filter(Boolean);
      setCartItems(items);
    } catch (error) {
      console.error('Error loading cart:', error);
      setCartItems([]);
    }
  };

  const getTotals = () => {
    try {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const subtotal = cartItems.reduce((sum, item) => {
        const cartItem = cart.find((ci: any) => ci.productId === item.product.id);
        const price = cartItem?.paymentMethod === 'bnpl' 
          ? item.product.bnplPrice 
          : item.product.cashPrice;
        return sum + price * item.quantity;
      }, 0);
      const tax = subtotal * 0.09;
      return { subtotal, tax, total: subtotal + tax };
    } catch (error) {
      console.error('Error calculating totals:', error);
      return { subtotal: 0, tax: 0, total: 0 };
    }
  };

  const availableOutlets = outletLocations.filter((outlet) => {
    if (pickupType === 'immediate') {
      return outlet.type === 'hub';
    }
    return true;
  });

  const handlePlaceOrder = async () => {
    setErrorObj(null);
    const { total } = getTotals();

    if (paymentMethod === 'bnpl') {
      if (accountType !== 'prime') {
        setErrorObj('A Trade Prime Plan subscription is required to use Grab Pay Later.');
        return;
      }
      if (!isGrabLinked) {
        setErrorObj('Please link your Grab Account first in the Account settings.');
        return;
      }
    }

    if (paymentMethod === 'card') {
      if (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvc || !cardDetails.name) {
        setErrorObj('Please fill in all card details for the payment.');
        return;
      }
    }

    if (!selectedOutlet) {
      setErrorObj('Please select a pickup location.');
      return;
    }

    if (pickupType === 'scheduled' && !pickupDate) {
      setErrorObj('Please select a pickup date.');
      return;
    }

    // Save order to localStorage
    const orderData = {
      id: `ORD-${Date.now().toString().slice(-4)}`,
      items: cartItems,
      total: total,
      paymentMethod,
      pickupType,
      pickupLocation: selectedOutlet?.name || '',
      pickupAddress: selectedOutlet?.address || '',
      pickupDate: pickupDate || new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
      status: 'Pending',
    };
    
    localStorage.setItem('lastOrder', JSON.stringify(orderData));
    
    // Append to Order History
    try {
      const allOrders = JSON.parse(localStorage.getItem('allOrders') || '[]');
      allOrders.push(orderData);
      localStorage.setItem('allOrders', JSON.stringify(allOrders));
    } catch (e) {
      localStorage.setItem('allOrders', JSON.stringify([orderData]));
    }

    localStorage.removeItem('cart');

    // Attempt Supabase Insert
    try {
      const spUrl = (import.meta as any).env.VITE_SUPABASE_URL;
      if (spUrl && spUrl !== 'YOUR_SUPABASE_PROJECT_URL' && !spUrl.includes('placeholder')) {
        const { data: orderDataRaw, error: orderError } = await supabase.from('orders').insert({
          customer_name: cardDetails.name || 'Guest',
          shop_name: 'Guest Shop',
          total_amount: total,
          payment_method: paymentMethod,
          bnpl_installments: paymentMethod === 'bnpl' ? 4 : null,
          pickup_type: pickupType,
          pickup_location: selectedOutlet?.name || '',
          pickup_date: pickupDate ? new Date(pickupDate).toISOString() : new Date().toISOString(),
          status: 'pending'
        }).select().single();

        if (orderError) throw orderError;

        if (orderDataRaw) {
          const orderItems = cartItems.map(item => ({
            order_id: orderDataRaw.id,
            product_id: item.product.dbId || item.product.id, // Will fail if dbId is missing and id isn't UUID, but safe effort
            quantity: item.quantity,
            unit_price: paymentMethod === 'bnpl' ? item.product.bnplPrice : item.product.cashPrice
          }));
          
          const { error: itemsError } = await supabase.from('order_items').insert(orderItems);
          if (itemsError) throw itemsError;
          console.log("Order saved to Supabase successfully.");
        }
      }
    } catch (err) {
      console.error("Failed to save order to Supabase. Fallback used.", err);
    }
    
    navigate('/customer/order-confirmation');
  };

  const { subtotal, tax, total } = getTotals();

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-[1200px] mx-auto p-8">
        <h1 className="font-bold text-3xl text-[#101828] mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Method Selection */}
            <div className="bg-white border border-[#e5e7eb] rounded-lg p-6">
              <h2 className="font-bold text-xl text-[#101828] mb-4 flex items-center gap-2">
                <CreditCard className="w-6 h-6 text-[#155dfc]" />
                Select Payment Method
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  onClick={() => setPaymentMethod('bnpl')}
                  className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                    paymentMethod === 'bnpl'
                      ? 'border-[#00b14f] bg-[#00b14f]/5'
                      : 'border-[#e5e7eb] hover:border-[#00b14f]'
                  } ${accountType !== 'prime' ? 'opacity-60' : ''}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-[#101828]">Grab Pay Later</span>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === 'bnpl' ? 'border-[#00b14f]' : 'border-gray-300'
                    }`}>
                      {paymentMethod === 'bnpl' && <div className="w-3 h-3 rounded-full bg-[#00b14f]" />}
                    </div>
                  </div>
                  <p className="text-sm text-[#6a7282]">Split into 4 interest-free installments with Grab.</p>
                  {accountType === 'prime' ? (
                    <div className="mt-2 space-y-2">
                       {isGrabLinked ? (
                         <div className="bg-[#00b14f]/10 rounded p-2 flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-[#00b14f]" />
                            <span className="text-xs font-bold text-[#00b14f]">Grab Account Linked</span>
                         </div>
                       ) : (
                         <div className="bg-amber-50 border border-amber-100 rounded p-2 flex flex-col gap-2">
                            <span className="text-xs font-bold text-amber-700">Grab Linking Required</span>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate('/customer/account?tab=credit');
                              }}
                              className="text-white bg-amber-600 px-3 py-1.5 rounded text-[10px] font-bold hover:bg-amber-700 self-start shadow-sm"
                            >
                              Link Account Now
                            </button>
                         </div>
                       )}
                    </div>
                  ) : (
                    <div className="mt-2 p-2 bg-red-50 border border-red-100 rounded text-xs font-bold text-red-600 flex flex-col gap-1">
                      <span>Trade Prime Plan Required</span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate('/customer/account?tab=subscription');
                        }}
                        className="text-white bg-red-500 px-2 py-1 rounded text-[10px] hover:bg-red-600 self-start"
                      >
                        Upgrade Now
                      </button>
                    </div>
                  )}
                </div>

                <div
                  onClick={() => setPaymentMethod('card')}
                  className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                    paymentMethod === 'card'
                      ? 'border-[#ff6900] bg-[#fff7ed]'
                      : 'border-[#e5e7eb] hover:border-[#ff6900]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-[#101828]">Credit / Debit Card</span>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === 'card' ? 'border-[#ff6900]' : 'border-gray-300'
                    }`}>
                      {paymentMethod === 'card' && <div className="w-3 h-3 rounded-full bg-[#ff6900]" />}
                    </div>
                  </div>
                  <p className="text-sm text-[#6a7282]">Pay immediately securely with your card.</p>
                </div>
              </div>

              {paymentMethod === 'card' && (
                <div className="mt-6 border-t border-gray-100 pt-6">
                  <h3 className="font-bold text-[#101828] mb-4">Enter Card Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Number</label>
                      <input 
                        type="text" 
                        autoComplete="off"
                        placeholder="0000 0000 0000 0000" 
                        value={cardDetails.number}
                        onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                        className="w-full px-4 py-3 border border-[#e5e7eb] rounded-lg focus:ring-2 focus:ring-[#ff6900] focus:border-transparent transition-all" 
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Validity</label>
                        <input 
                          type="text" 
                          autoComplete="off"
                          placeholder="MM/YY" 
                          value={cardDetails.expiry}
                          onChange={(e) => {
                            let val = e.target.value.replace(/\D/g, '');
                            if (val.length > 2) {
                              val = val.substring(0, 2) + '/' + val.substring(2, 4);
                            } else {
                              val = val.substring(0, 2);
                            }
                            setCardDetails({...cardDetails, expiry: val});
                          }}
                          className="w-full px-4 py-3 border border-[#e5e7eb] rounded-lg focus:ring-2 focus:ring-[#ff6900] focus:border-transparent transition-all" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Verification</label>
                        <input 
                          type="password" 
                          autoComplete="off"
                          placeholder="123" 
                          value={cardDetails.cvc}
                          onChange={(e) => setCardDetails({...cardDetails, cvc: e.target.value})}
                          className="w-full px-4 py-3 border border-[#e5e7eb] rounded-lg focus:ring-2 focus:ring-[#ff6900] focus:border-transparent transition-all" 
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Holder</label>
                      <input 
                        type="text" 
                        autoComplete="off"
                        placeholder="John Tan" 
                        value={cardDetails.name}
                        onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                        className="w-full px-4 py-3 border border-[#e5e7eb] rounded-lg focus:ring-2 focus:ring-[#ff6900] focus:border-transparent transition-all" 
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Pickup Type Selection */}
            <div className="bg-white border border-[#e5e7eb] rounded-lg p-6">
              <h2 className="font-bold text-xl text-[#101828] mb-4 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-[#ff6900]" />
                Select Pickup Method
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Immediate Pickup */}
                <div
                  onClick={() => {
                    setPickupType('immediate');
                    setSelectedOutlet(null);
                  }}
                  className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                    pickupType === 'immediate'
                      ? 'border-[#ff6900] bg-[#fff7ed]'
                      : 'border-[#e5e7eb] hover:border-[#ff6900]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-[#101828]">Immediate Pickup</span>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      pickupType === 'immediate' ? 'border-[#ff6900]' : 'border-gray-300'
                    }`}>
                      {pickupType === 'immediate' && <div className="w-3 h-3 rounded-full bg-[#ff6900]" />}
                    </div>
                  </div>
                  <p className="text-sm text-[#6a7282] mb-2">
                    Collect today at Hub Outlets
                  </p>
                  <div className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded inline-block">
                    <CheckCircle className="w-3 h-3 inline mr-1" />
                    Ready in 1 hour
                  </div>
                </div>

                {/* Scheduled Pickup */}
                <div
                  onClick={() => {
                    setPickupType('scheduled');
                    setSelectedOutlet(null);
                  }}
                  className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                    pickupType === 'scheduled'
                      ? 'border-[#155dfc] bg-blue-50'
                      : 'border-[#e5e7eb] hover:border-[#155dfc]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-[#101828]">Scheduled Pickup</span>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      pickupType === 'scheduled' ? 'border-[#155dfc]' : 'border-gray-300'
                    }`}>
                      {pickupType === 'scheduled' && <div className="w-3 h-3 rounded-full bg-[#155dfc]" />}
                    </div>
                  </div>
                  <p className="text-sm text-[#6a7282] mb-2">
                    Any of 69+ heartland outlets
                  </p>
                  <div className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded inline-block flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    24-48 hours
                  </div>
                </div>
              </div>

              {/* Pickup Date (for scheduled) */}
              {pickupType === 'scheduled' && (
                <div className="mb-6">
                  <label className="block font-medium text-[#101828] mb-2">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Preferred Pickup Date
                  </label>
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    min={new Date(Date.now() + 86400000).toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-[#e5e7eb] rounded-lg focus:ring-2 focus:ring-[#ff6900] focus:border-transparent"
                  />
                </div>
              )}

              {/* Outlet Selection */}
              {(pickupType === 'immediate' || (pickupType === 'scheduled' && pickupDate !== '')) && (
                <div>
                  <h3 className="font-bold text-[#101828] mb-3">
                    {pickupType === 'immediate' ? 'Hub Outlets (Immediate Pickup)' : 'All Outlets (Choose Your Nearest)'}
                  </h3>
                  <div className="space-y-2 max-h-[400px] overflow-y-auto">
                    {availableOutlets.map((outlet) => (
                      <div
                        key={outlet.id}
                        onClick={() => setSelectedOutlet(outlet)}
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${
                          selectedOutlet?.id === outlet.id
                            ? 'border-[#ff6900] bg-[#fff7ed]'
                            : 'border-[#e5e7eb] hover:border-[#ff6900]'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-bold text-[#101828]">{outlet.name}</p>
                              {outlet.type === 'hub' && (
                                <span className="bg-[#ff6900] text-white text-xs px-2 py-0.5 rounded">
                                  HUB
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-[#6a7282]">{outlet.address}</p>
                            {outlet.leadTime && (
                              <p className="text-xs text-[#155dfc] mt-1">Lead time: {outlet.leadTime}</p>
                            )}
                          </div>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                            selectedOutlet?.id === outlet.id ? 'border-[#ff6900]' : 'border-gray-300'
                          }`}>
                            {selectedOutlet?.id === outlet.id && <div className="w-3 h-3 rounded-full bg-[#ff6900]" />}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 border border-[#e5e7eb] rounded-lg p-6 sticky top-8">
              <h2 className="font-bold text-xl text-[#101828] mb-4">Order Summary</h2>

              {/* Items */}
              <div className="space-y-3 mb-4 max-h-[200px] overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-[#6a7282]">
                      {item.product.name} x{item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#e5e7eb] pt-4 mb-4 space-y-2">
                <div className="flex justify-between text-sm text-[#6a7282]">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-[#6a7282]">
                  <span>GST (9%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mt-4 pt-4 border-t border-[#e5e7eb]">
                  <span className="font-bold text-lg text-[#101828]">Total</span>
                  <span className="font-bold text-2xl text-[#ff6900]">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Pickup Summary */}
              {selectedOutlet && (
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-4 mb-4">
                  <p className="font-bold text-sm text-[#101828] mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#155dfc]" />
                    Pickup Details:
                  </p>
                  <p className="text-xs text-[#6a7282] mb-1">{selectedOutlet.name}</p>
                  <p className="text-xs text-[#6a7282] mb-2">{selectedOutlet.address}</p>
                  {pickupType === 'scheduled' && (
                    <p className="text-xs text-[#155dfc] flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Ready by: {new Date(pickupDate).toLocaleDateString()}
                    </p>
                  )}
                  {pickupType === 'immediate' && (
                    <p className="text-xs text-green-700 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Ready for pickup in 1 hour
                    </p>
                  )}
                </div>
              )}

              {errorObj && (
                <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm font-medium">
                  {errorObj}
                </div>
              )}

              <button
                onClick={handlePlaceOrder}
                className="w-full bg-gradient-to-r from-[#ff6900] to-[#ff8534] text-white py-4 rounded-xl font-bold hover:shadow-xl hover:shadow-orange-500/20 transition-all"
              >
                Place Order - ${total.toFixed(2)}
              </button>

              <p className="text-xs text-center text-[#6a7282] mt-4">
                By placing this order, you agree to our terms and conditions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}