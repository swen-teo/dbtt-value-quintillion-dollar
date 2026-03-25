import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Search, ShoppingCart, Star } from 'lucide-react';
import { products } from '../data/mockData';

export default function QuickOrder() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [orderItems, setOrderItems] = useState<{ [key: string]: number }>({});

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      const newItems = { ...orderItems };
      delete newItems[productId];
      setOrderItems(newItems);
    } else {
      setOrderItems({ ...orderItems, [productId]: quantity });
    }
  };

  const addAllToCart = () => {
    try {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      
      Object.entries(orderItems).forEach(([productId, quantity]) => {
        const existingItem = cart.find((item: any) => item.productId === productId);
        
        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          cart.push({ productId, quantity, paymentMethod: 'cash' });
        }
      });
      
      localStorage.setItem('cart', JSON.stringify(cart));
      navigate('/customer/cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
      navigate('/customer/cart');
    }
  };

  const totalItems = Object.values(orderItems).reduce((sum, qty) => sum + qty, 0);

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-[1200px] mx-auto p-8">
        <div className="mb-8">
          <h1 className="font-bold text-3xl text-[#101828] mb-2">Quick Order</h1>
          <p className="text-[#6a7282]">Quickly add multiple products to your cart using SKU or product name</p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search by product name or SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 border-2 border-[#e5e7eb] rounded-lg text-lg focus:ring-2 focus:ring-[#ff6900] focus:border-transparent"
          />
          <Search className="absolute left-4 top-4 w-6 h-6 text-[#99A1AF]" />
        </div>

        {/* Quick Order Table */}
        <div className="bg-white border border-[#e5e7eb] rounded-lg overflow-hidden mb-6">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-[#e5e7eb]">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-[#101828]">Product</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-[#101828]">Category</th>
                <th className="px-6 py-4 text-right text-sm font-bold text-[#101828]">Cash Price</th>
                <th className="px-6 py-4 text-right text-sm font-bold text-[#101828]">BNPL Price</th>
                <th className="px-6 py-4 text-center text-sm font-bold text-[#101828]">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-b border-[#e5e7eb] hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-12 h-12 object-contain"
                      />
                      <div>
                        <p className="font-medium text-[#101828]">{product.name}</p>
                        <p className="text-sm text-[#6a7282]">{product.unit}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-block px-2 py-1 bg-[#fff7ed] text-[#ca3500] text-xs font-medium rounded">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="font-bold text-[#101828]">${product.cashPrice.toFixed(2)}</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="font-bold text-[#155dfc]">${product.bnplPrice.toFixed(2)}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => updateQuantity(product.id, (orderItems[product.id] || 0) - 1)}
                        className="w-8 h-8 border border-[#e5e7eb] rounded flex items-center justify-center hover:border-[#ff6900] transition-colors"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        value={orderItems[product.id] || 0}
                        onChange={(e) => updateQuantity(product.id, parseInt(e.target.value) || 0)}
                        className="w-16 h-8 border border-[#e5e7eb] rounded text-center"
                        min="0"
                      />
                      <button
                        onClick={() => updateQuantity(product.id, (orderItems[product.id] || 0) + 1)}
                        className="w-8 h-8 border border-[#e5e7eb] rounded flex items-center justify-center hover:border-[#ff6900] transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No products found</p>
            </div>
          )}
        </div>

        {/* Add to Cart Button */}
        {totalItems > 0 && (
          <div className="fixed bottom-8 right-8 bg-white border-2 border-[#ff6900] rounded-lg shadow-2xl p-6">
            <div className="flex items-center gap-4">
              <div>
                <p className="text-sm text-[#6a7282]">Total Items</p>
                <p className="font-bold text-2xl text-[#101828]">{totalItems}</p>
              </div>
              <button
                onClick={() => addAllToCart()}
                className="bg-gradient-to-r from-[#ff6900] to-[#ff8534] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:shadow-xl transition-all"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
            </div>
          </div>
        )}

        {/* Frequently Ordered Quick Add */}
        <div className="mt-8">
          <h2 className="font-bold text-xl text-[#101828] mb-4 flex items-center gap-2">
            <Star className="w-6 h-6 text-[#ff6900]" />
            Your Frequently Ordered Items
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {products.slice(0, 3).map((product) => (
              <div
                key={product.id}
                className="bg-gray-50 border border-[#e5e7eb] rounded-lg p-4"
              >
                <div className="flex items-center gap-3 mb-3">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-16 h-16 object-contain"
                  />
                  <div className="flex-1">
                    <p className="font-bold text-sm text-[#101828]">{product.name}</p>
                    <p className="text-xs text-[#6a7282]">${product.cashPrice.toFixed(2)}</p>
                  </div>
                </div>
                <button
                  onClick={() => updateQuantity(product.id, (orderItems[product.id] || 0) + 1)}
                  className="w-full bg-gradient-to-r from-[#ff6900] to-[#ff8534] text-white py-2 rounded-lg text-sm font-bold hover:shadow-lg transition-all"
                >
                  + Quick Add
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}