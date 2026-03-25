import { useNavigate } from 'react-router';
import { Zap, TrendingDown, Clock, ShoppingCart, ArrowLeft } from 'lucide-react';
import { products } from '../data/mockData';
import { addToCart } from '../utils/cartHelpers';

export default function Deals() {
  const navigate = useNavigate();

  // Mock clearance/deal products
  const dealProducts = products.filter(p => p.savingsPercent >= 10);

  const handleAddToCart = (productId: string) => {
    const success = addToCart(productId, 1);
    if (success) {
      alert('Added to cart successfully!');
    } else {
      alert('Failed to add to cart. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      <div className="max-w-[1400px] mx-auto p-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/customer/shop')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 font-medium transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Shop
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-[#ff6900] via-[#ff7a1a] to-[#ff8534] rounded-3xl p-12 mb-8 shadow-2xl shadow-orange-500/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-32 -mb-32"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-5xl font-bold text-white mb-2 tracking-tight">Flash Deals</h1>
                <p className="text-white/90 text-xl">Massive savings on clearance and promotional items</p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-white mt-8">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl border border-white/30">
                <Clock className="w-5 h-5" />
                <span className="font-semibold">Limited Time Offers</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl border border-white/30">
                <TrendingDown className="w-5 h-5" />
                <span className="font-semibold">Up to 40% Off</span>
              </div>
            </div>
          </div>
        </div>

        {/* Deal Products Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Active Deals</h2>
              <p className="text-gray-600 text-lg">{dealProducts.length} products on special offer</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {dealProducts.map((product) => {
              const retailPrice = product.cashPrice + product.savings;
              return (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl border-2 border-orange-200 overflow-hidden hover:border-[#ff6900] hover:shadow-2xl transition-all group cursor-pointer relative"
                  onClick={() => navigate(`/customer/product/${product.id}`)}
                >
                  {/* Savings Badge */}
                  <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                    Save {product.savingsPercent}%
                  </div>

                  <div className="aspect-square bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform">
                    <img src={product.image} alt={product.name} className="w-full h-full object-contain p-6" />
                  </div>

                  <div className="p-6">
                    <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{product.unit}</p>

                    <div className="mb-4">
                      <div className="flex items-baseline gap-2 mb-2">
                        <p className="font-bold text-3xl text-[#ff6900]">${product.cashPrice.toFixed(2)}</p>
                        <p className="text-lg text-gray-500 line-through">${retailPrice.toFixed(2)}</p>
                      </div>
                      <p className="text-sm text-green-600 font-semibold">
                        You save ${product.savings.toFixed(2)}
                      </p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product.id);
                      }}
                      className="w-full bg-gradient-to-r from-[#ff6900] to-[#ff8534] text-white py-3.5 rounded-xl font-bold hover:shadow-xl hover:shadow-orange-500/30 transition-all flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}