import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Trash2, Plus, Minus, ShoppingBag, CreditCard } from 'lucide-react';
import { useProducts } from '../hooks/useData';
import { CartItem } from '../types';

export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { products } = useProducts();

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

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    try {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const item = cart.find((item: any) => item.productId === productId);
      if (item) {
        item.quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCart();
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const removeItem = (productId: string) => {
    try {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const updatedCart = cart.filter((item: any) => item.productId !== productId);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      loadCart();
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => {
      try {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const cartItem = cart.find((ci: any) => ci.productId === item.product.id);
        const price = cartItem?.paymentMethod === 'bnpl' 
          ? item.product.bnplPrice 
          : item.product.cashPrice;
        return sum + price * item.quantity;
      } catch (error) {
        console.error('Error calculating subtotal:', error);
        return sum + item.product.cashPrice * item.quantity;
      }
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const tax = subtotal * 0.09; // 9% GST
  const total = subtotal + tax;

  if (cartItems.length === 0) {
    return (
      <div className="bg-white min-h-screen">
        <div className="max-w-[1200px] mx-auto p-8">
          <h1 className="font-bold text-3xl text-[#101828] mb-8">Shopping Cart</h1>
          <div className="text-center py-16">
            <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-500 mb-6">Your cart is empty</p>
            <button
              onClick={() => navigate('/customer/shop')}
              className="bg-[#ff6900] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#e55e00] transition-colors"
            >
              Start Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-[1200px] mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">Shopping Cart</h1>
          <p className="text-gray-600 text-lg">{cartItems.length} items in your cart</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-3xl border-2 border-gray-100 p-16 text-center shadow-lg">
            <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="font-bold text-2xl text-gray-900 mb-3">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some products to get started with your wholesale order</p>
            <button
              onClick={() => navigate('/customer/shop')}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#ff6900] to-[#ff8534] text-white px-8 py-4 rounded-xl font-bold hover:shadow-xl hover:shadow-orange-500/20 transition-all"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => {
                // item already has product populated from loadCart()
                // No need to find it again
                const product = item.product;
                if (!product) return null;

                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-2xl border-2 border-gray-100 p-6 hover:border-gray-200 hover:shadow-lg transition-all"
                  >
                    <div className="flex gap-6">
                      <div className="w-28 h-28 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <img src={product.image} alt={product.name} className="w-full h-full object-contain p-3" />
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between mb-2">
                          <div>
                            <h3 className="font-bold text-xl text-gray-900 mb-1">{product.name}</h3>
                            <p className="text-sm text-gray-600">{product.unit}</p>
                          </div>
                          <button
                            onClick={() => removeItem(product.id)}
                            className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-1.5">
                            <button
                              onClick={() => updateQuantity(product.id, item.quantity - 1)}
                              className="w-9 h-9 bg-white rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors shadow-sm"
                            >
                              <Minus className="w-4 h-4 text-gray-700" />
                            </button>
                            <span className="font-bold text-lg text-gray-900 w-12 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(product.id, item.quantity + 1)}
                              className="w-9 h-9 bg-white rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors shadow-sm"
                            >
                              <Plus className="w-4 h-4 text-gray-700" />
                            </button>
                          </div>

                          <div className="text-right">
                            <p className="text-sm text-gray-500 mb-1">Subtotal</p>
                            <p className="font-bold text-2xl text-gray-900">
                              ${(product.cashPrice * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border-2 border-gray-100 p-6 sticky top-8 shadow-lg">
                <h2 className="font-bold text-2xl text-gray-900 mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6 pb-6 border-b-2 border-gray-100">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>GST (9%)</span>
                    <span className="font-semibold">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Service Fee</span>
                    <span className="font-semibold text-green-600">Free</span>
                  </div>
                </div>

                <div className="flex justify-between mb-6">
                  <span className="font-bold text-xl text-gray-900">Total</span>
                  <span className="font-bold text-3xl text-gray-900">${total.toFixed(2)}</span>
                </div>

                <button
                  onClick={() => navigate('/customer/checkout')}
                  className="w-full bg-gradient-to-r from-[#ff6900] to-[#ff8534] text-white py-4 rounded-xl font-bold hover:shadow-xl hover:shadow-orange-500/20 transition-all mb-3 text-lg"
                >
                  Proceed to Checkout
                </button>

                <button
                  onClick={() => navigate('/customer/shop')}
                  className="w-full border-2 border-gray-200 text-gray-700 py-4 rounded-xl font-semibold hover:border-[#ff6900] hover:bg-orange-50 transition-all"
                >
                  Continue Shopping
                </button>

                {/* BNPL Info */}
                <div className="mt-6 p-5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl text-white shadow-lg shadow-blue-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <CreditCard className="w-5 h-5" />
                    <p className="font-bold">Buy Now Pay Later</p>
                  </div>
                  <p className="text-sm text-blue-100">
                    Split your payment into 4 interest-free installments of{' '}
                    <span className="font-bold text-white">${(total / 4).toFixed(2)}</span> each
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}