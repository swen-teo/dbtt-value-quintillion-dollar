import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Plus, Minus, ShoppingCart } from 'lucide-react';
import { products } from '../data/mockData';
import { Award, CreditCard, CheckCircle, TrendingDown } from 'lucide-react';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === id);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="p-8">
        <p>Product not found</p>
      </div>
    );
  }

  const calculateBNPL = (price: number, installments: number = 4) => {
    return (price / installments).toFixed(2);
  };

  const addToCart = () => {
    try {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existingItem = cart.find((item: any) => item.productId === product.id);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.push({ productId: product.id, quantity });
      }
      
      localStorage.setItem('cart', JSON.stringify(cart));
      navigate('/customer/cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
      navigate('/customer/cart');
    }
  };

  const totalPrice = (product?.cashPrice || 0) * quantity;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-[1200px] mx-auto p-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/customer/shop')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 font-medium transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Shop
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Product Image */}
          <div className="bg-white rounded-3xl border-2 border-gray-100 p-6 shadow-lg h-fit">
            <div className="h-[400px] bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-full object-contain p-6" />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-orange-50 border border-orange-200 px-4 py-2 rounded-full mb-4">
                <Award className="w-4 h-4 text-[#ff6900]" />
                <span className="text-sm font-semibold text-[#ff6900]">Trade Wholesale</span>
              </div>
              <h1 className="font-bold text-4xl text-gray-900 mb-3 tracking-tight">{product.name}</h1>
              <p className="text-lg text-gray-600">{product.unit}</p>
            </div>

            {/* Pricing */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white shadow-xl">
              <div className="flex items-baseline gap-3 mb-3">
                <p className="text-5xl font-bold">${(product?.cashPrice || 0).toFixed(2)}</p>
                <p className="text-xl text-gray-400 line-through">${(product?.retailPrice || 0).toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <TrendingDown className="w-5 h-5" />
                <p className="font-semibold">Save {Math.round((((product?.retailPrice || 0) - (product?.cashPrice || 0)) / (product?.retailPrice || 1)) * 100)}%</p>
              </div>
            </div>



            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block font-bold text-[#101828] mb-3">Quantity</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-[#e5e7eb] rounded-lg flex items-center justify-center hover:border-[#ff6900] transition-colors"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20 h-10 border border-[#e5e7eb] rounded-lg text-center font-bold text-lg"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-[#e5e7eb] rounded-lg flex items-center justify-center hover:border-[#ff6900] transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
                <span className="text-[#6a7282] ml-2">units in stock: {product.stock}</span>
              </div>
            </div>

            {/* Total Price */}
            <div className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-100 shadow-inner mb-6">
              <div className="flex justify-between items-center">
                <span className="font-bold text-xl text-gray-900">Order Total:</span>
                <span className="font-black text-3xl text-[#ff6900]">${(totalPrice || 0).toFixed(2)}</span>
              </div>
            </div>

            {/* Product Details */}
            <div className="bg-white rounded-2xl border-2 border-gray-100 p-6 shadow-sm">
              <h3 className="font-bold text-xl text-gray-900 mb-4">Product Details</h3>
              <div className="space-y-3 text-gray-700">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Category</span>
                  <span className="font-semibold">{product.category}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Unit Size</span>
                  <span className="font-semibold">{product.unit}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Stock Status</span>
                  <span className="font-semibold text-green-600 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    In Stock
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Minimum Order</span>
                  <span className="font-semibold">1 unit</span>
                </div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={addToCart}
              className="w-full bg-gradient-to-r from-[#ff6900] to-[#ff8534] text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:shadow-xl hover:shadow-orange-500/30 transition-all hover:scale-[1.02]"
            >
              <ShoppingCart className="w-6 h-6" />
              Add to Cart
            </button>

            {/* Product Description */}
            <div className="mt-8 border-t border-[#e5e7eb] pt-6">
              <h3 className="font-bold text-lg text-[#101828] mb-3">Product Description</h3>
              <p className="text-[#6a7282]">{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}