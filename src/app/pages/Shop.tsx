import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ShoppingCart, Package, Zap, Search } from 'lucide-react';
import { products } from '../data/mockData';
import { addToCart } from '../utils/cartHelpers';

export default function ShopPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['all', 'BEVERAGES', 'SNACKS', 'HOUSEHOLD', 'CLEARANCE'];

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (productId: string) => {
    const success = addToCart(productId, 1);
    if (success) {
      alert('Added to cart successfully!');
    } else {
      alert('Failed to add to cart. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-[1400px] mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">Browse Wholesale</h1>
          <p className="text-gray-600 text-lg">Premium products at trade prices</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products by name, brand, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#ff6900] focus:border-transparent transition-all text-gray-900 placeholder:text-gray-400 shadow-sm hover:shadow-md"
            />
          </div>
        </div>

        {/* Flash Deal */}
        <div className="bg-gradient-to-r from-[#ff6900] via-[#ff7a1a] to-[#ff8534] rounded-2xl p-8 mb-8 flex items-center justify-between shadow-xl shadow-orange-500/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full -ml-24 -mb-24"></div>
          <div className="text-white relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <p className="font-bold text-2xl">Flash Deal Today!</p>
            </div>
            <p className="text-white/90 text-lg">Clearance Pattern: up to 40% off. Limited quantities available.</p>
          </div>
          <button
            onClick={() => navigate('/customer/deals')}
            className="bg-white text-[#ff6900] px-8 py-4 rounded-xl font-bold hover:shadow-2xl transition-all hover:scale-105 relative z-10"
          >
            View Deals
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full border whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-[#ff6900] text-white border-[#ff6900]'
                  : 'bg-white text-[#364153] border-[#e5e7eb] hover:border-[#ff6900]'
              }`}
            >
              {category === 'all' ? 'All Products' : category.charAt(0) + category.slice(1).toLowerCase()}
            </button>
          ))}
        </div>

        {/* All Products Section */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-2xl text-gray-900">All Products</h2>
              <p className="text-gray-600">Premium wholesale selection</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              if (!product) return null;
              const retailPrice = product.cashPrice + (product.savings || 0);
              return (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl border-2 border-gray-100 p-6 hover:border-[#ff6900] hover:shadow-xl transition-all cursor-pointer group w-full h-full flex flex-col"
                  onClick={() => navigate(`/customer/product/${product.id}`)}
                >
                  <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl mb-5 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform">
                    <img src={product.image} alt={product.name} className="w-full h-full object-contain p-6" />
                  </div>

                  <div className="mb-4 flex-grow">
                    <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 leading-tight">{product.name}</h3>
                    <p className="text-sm text-gray-600">{product.unit}</p>
                  </div>

                  <div className="flex items-baseline gap-2 mb-5">
                    <p className="font-bold text-2xl text-gray-900">${product.cashPrice.toFixed(2)}</p>
                    <p className="text-sm text-gray-500 line-through">${retailPrice.toFixed(2)}</p>
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
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}