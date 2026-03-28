import { useState, useMemo } from 'react';
import { useProducts } from '../../hooks/useData';
import { Search, Edit2, X, Tag, TrendingDown, Lock, ChevronRight, Trash2 } from 'lucide-react';
import { Product } from '../../types';
import { supabase } from '../../lib/supabaseClient';

export default function PricingConfiguration() {
  const { products, loading } = useProducts();
  const [isReviewing, setIsReviewing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Track promo percentage per product ID
  const [draftPromos, setDraftPromos] = useState<Record<string, number>>({});
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [promoInput, setPromoInput] = useState<string>('');

  const handleReview = () => {
    setIsReviewing(true);
    alert('Loading payment history panel... (Simulation)');
    setTimeout(() => setIsReviewing(false), 1000);
  };

  const handleSave = async () => {
    if (Object.keys(draftPromos).length === 0) {
      alert('No changes to save!');
      return;
    }

    setIsSaving(true);
    
    try {
      // Loop through all draft promos and update Supabase
      const updatePromises = Object.entries(draftPromos).map(async ([productId, promoPercent]) => {
        const product = products.find(p => p.id === productId);
        if (product) {
          const newCash = product.cashPrice * (1 - promoPercent / 100);
          const newBnpl = product.bnplPrice * (1 - promoPercent / 100);

          return supabase
            .from('products')
            .update({
              cash_price: newCash,
              bnpl_price: newBnpl
            })
            .eq('id', product.dbId || productId); // fallback to id if dbId not found
        }
      });

      await Promise.all(updatePromises);
      
      // Ideally re-fetch or update local state
      alert('Success! All pricing rules deployed successfully.');
      setDraftPromos({});
      setIsReviewModalOpen(false);
    } catch (error) {
      console.error('Error saving pricing changes:', error);
      alert('Failed to save changes. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const removePromoFromDraft = (productId: string) => {
    const newPromos = { ...draftPromos };
    delete newPromos[productId];
    setDraftPromos(newPromos);
    if (Object.keys(newPromos).length === 0) {
      setIsReviewModalOpen(false);
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  const openPromoModal = (product: Product) => {
    setSelectedProduct(product);
    setPromoInput(draftPromos[product.id]?.toString() || '');
  };

  const applyPromo = () => {
    if (selectedProduct) {
      const val = parseFloat(promoInput);
      if (!isNaN(val) && val >= 0) {
        if (val === 0) {
          const newPromos = { ...draftPromos };
          delete newPromos[selectedProduct.id];
          setDraftPromos(newPromos);
        } else {
          setDraftPromos({ ...draftPromos, [selectedProduct.id]: val });
        }
      }
      setSelectedProduct(null);
    }
  };

  return (
    <div className="min-h-screen p-7">
      {/* Header */}
      <div className="flex items-center justify-between mb-7">
        <div className="bg-[#27286f] border border-white rounded-full px-3.5 py-1.5 flex items-center gap-2">
          <Tag className="w-3.5 h-3.5 text-white" />
          <p className="font-bold text-xs text-white">Pricing & Promo Engine</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsReviewModalOpen(true)}
            disabled={Object.keys(draftPromos).length === 0}
            className={`bg-white border border-[#eadfce] rounded-[14px] px-5 py-3 font-extrabold text-sm hover:shadow-md transition-all flex items-center gap-2 ${Object.keys(draftPromos).length === 0 ? 'opacity-40 cursor-not-allowed' : 'text-[#1f2937]'}`}>
            Review adjustments
            {Object.keys(draftPromos).length > 0 && (
              <span className="bg-[#ff6a00] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                {Object.keys(draftPromos).length}
              </span>
            )}
          </button>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className={`rounded-[14px] px-5 py-3 font-extrabold text-sm shadow-[0px_18px_42px_0px_rgba(201,101,15,0.12)] hover:shadow-xl transition-shadow ${isSaving ? 'bg-green-500 text-white cursor-wait' : 'bg-[#ff6a00] text-white'}`}>
            {isSaving ? 'Rules Saved ✅' : 'Save pricing rules'}
          </button>
        </div>
      </div>

      <div className="flex gap-6 items-start">
        {/* Main Content: Product Pricing Table */}
        <div className="flex-1 bg-white border border-[#eadfce] rounded-[24px] shadow-[0px_14px_28px_0px_rgba(31,41,55,0.04)] overflow-hidden flex flex-col h-[calc(100vh-140px)]">
          <div className="p-6 border-b border-[#e5e7eb] flex items-center justify-between bg-white shrink-0">
            <div>
              <h3 className="font-bold text-xl text-[#1f2937] mb-1">Product Pricing Engine</h3>
              <p className="text-sm text-[#6b7280]">Manage base pricing and apply SKU-level promo discounts.</p>
            </div>
            
            <div className="relative w-72">
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#ff6900] focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex-1 overflow-auto bg-gray-50/50">
            {loading ? (
              <div className="p-10 text-center text-gray-500">Loading catalog...</div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50 sticky top-0 z-10 shadow-sm">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Retail Cost</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Cash Price</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">BNPL Price</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Promo</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredProducts.map((product) => {
                    const promoPercent = draftPromos[product.id] || 0;
                    const hasPromo = promoPercent > 0;
                    const baseCash = product.cashPrice;
                    const baseBnpl = product.bnplPrice;
                    
                    const actualCash = hasPromo ? baseCash * (1 - promoPercent / 100) : baseCash;
                    const actualBnpl = hasPromo ? baseBnpl * (1 - promoPercent / 100) : baseBnpl;

                    return (
                      <tr key={product.id} className="hover:bg-white transition-colors cursor-pointer group" onClick={() => openPromoModal(product)}>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl border border-gray-100 bg-white flex items-center justify-center overflow-hidden shrink-0">
                              <img src={product.image} alt={product.name} className="w-8 h-8 object-contain" />
                            </div>
                            <div>
                              <p className="font-bold text-sm text-gray-900 line-clamp-1">{product.name}</p>
                              <p className="text-xs text-gray-500 mt-0.5">{product.category} • {product.unit}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <p className="text-sm font-medium text-gray-500">${product.retailPrice.toFixed(2)}</p>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex flex-col items-end">
                            <p className={`text-sm font-bold ${hasPromo ? 'text-green-600' : 'text-gray-900'}`}>
                              ${actualCash.toFixed(2)}
                            </p>
                            {hasPromo && <p className="text-xs text-gray-400 line-through">${baseCash.toFixed(2)}</p>}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex flex-col items-end">
                            <p className={`text-sm font-bold ${hasPromo ? 'text-green-600' : 'text-gray-900'}`}>
                              ${actualBnpl.toFixed(2)}
                            </p>
                            {hasPromo && <p className="text-xs text-gray-400 line-through">${baseBnpl.toFixed(2)}</p>}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          {hasPromo ? (
                            <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-2.5 py-1 rounded-md text-xs font-bold border border-green-200">
                              <Tag className="w-3 h-3" />
                              {promoPercent}% OFF
                            </span>
                          ) : (
                            <span className="text-xs text-gray-400 font-medium">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button 
                            className="p-2 text-gray-400 hover:text-[#ff6900] hover:bg-orange-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                            onClick={(e) => { e.stopPropagation(); openPromoModal(product); }}
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                  {filteredProducts.length === 0 && !loading && (
                    <tr>
                      <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                        No products found matching "{searchQuery}"
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Right Sidebar: Read Only Panels */}
        <div className="w-[340px] shrink-0 space-y-6">
          {/* Subscription registration pipeline */}
          <div className="bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-[28px] p-6 relative overflow-hidden backdrop-blur-sm">
            {/* Holographic effect background */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl"></div>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1.5 bg-white/80 border border-blue-100 rounded-full px-2.5 py-1 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Live Sync</span>
              </div>
              <Lock className="w-3.5 h-3.5 text-slate-400" />
            </div>

            <div className="relative z-10">
              <h3 className="font-bold text-lg text-slate-800 mb-1">Subscription Pipeline</h3>
              <p className="text-[11px] font-medium text-slate-500 uppercase tracking-tight mb-6">Owner: Central Risk System</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/60 p-3 rounded-2xl border border-white/40">
                  <p className="font-black text-3xl text-slate-900 leading-none">38</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Pending Regs</p>
                </div>
                <div className="bg-white/60 p-3 rounded-2xl border border-white/40">
                  <p className="font-black text-3xl text-emerald-600 leading-none">84%</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Approval Rate</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-bold text-xs text-slate-700">UEN Verification Progress</p>
                    <p className="font-bold text-xs text-slate-900">11 Units</p>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full rounded-full w-[40%]" />
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/50 flex items-center justify-between text-[10px] text-slate-400 font-medium italic">
                <span>View only mode active</span>
                <span>Last sync: 2m ago</span>
              </div>
            </div>
          </div>

          {/* Credit limit governance */}
          <div className="bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-[28px] p-6 relative overflow-hidden backdrop-blur-sm">
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl"></div>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1.5 bg-white/80 border border-indigo-100 rounded-full px-2.5 py-1 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">External Data</span>
              </div>
              <Lock className="w-3.5 h-3.5 text-slate-400" />
            </div>

            <div className="relative z-10">
              <h3 className="font-bold text-lg text-slate-800 mb-1">Credit Limits</h3>
              <p className="text-[11px] font-medium text-slate-500 uppercase tracking-tight mb-6">Owner: Finance Partner API</p>

              <div className="space-y-3">
                {[
                  { shop: 'Mama Shop #204', behavior: 'On-time 6mo', action: 'Increase limit', color: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
                  { shop: 'Mama Shop #493', behavior: '1 delayed', action: 'Hold review', color: 'bg-amber-50 text-amber-700 border-amber-100' },
                  { shop: 'Mama Shop #188', behavior: 'Repeated delays', action: 'Reduce limit', color: 'bg-rose-50 text-rose-700 border-rose-100' },
                ].map((row, index) => (
                  <div key={index} className="flex flex-col gap-2 p-3 bg-white/40 rounded-2xl border border-white/60">
                    <div className="flex justify-between items-start">
                      <span className="font-bold text-xs text-slate-900">{row.shop}</span>
                      <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full border ${row.color}`}>{row.action}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium">{row.behavior}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/50 flex items-center justify-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                Data non-interactive
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Modal (Promo Editor) */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <h2 className="font-bold text-xl text-gray-900">Configure Promo</h2>
              <button onClick={() => setSelectedProduct(null)} className="p-2 text-gray-400 hover:text-gray-700 hover:bg-white rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              {/* Product Info Summary */}
              <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="w-16 h-16 bg-white rounded-xl border border-gray-200 flex items-center justify-center p-2 shrink-0">
                  <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-contain" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 line-clamp-1">{selectedProduct.name}</p>
                  <p className="text-sm text-gray-500 mt-1">Base Cash: ${selectedProduct.cashPrice.toFixed(2)}</p>
                </div>
              </div>

              {/* Input */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-2">Discount Percentage (%)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">%</span>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="e.g. 15 for 15% off"
                    className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-500/10 focus:border-[#ff6900] outline-none transition-all font-bold text-gray-900"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">Enter 0 to remove an active promo.</p>
              </div>

              {/* Dynamic Preview */}
              {(() => {
                const val = parseFloat(promoInput) || 0;
                const newCash = selectedProduct.cashPrice * (1 - Math.min(val, 100) / 100);
                const newBnpl = selectedProduct.bnplPrice * (1 - Math.min(val, 100) / 100);
                
                return (
                  <div className="bg-orange-50 rounded-2xl p-5 border border-orange-100">
                    <p className="text-xs font-bold text-orange-800 uppercase tracking-wider mb-3 flex items-center gap-1">
                      <TrendingDown className="w-3 h-3" />
                      Live Projection
                    </p>
                    <div className="flex justify-between items-center mb-2 text-sm">
                      <span className="text-orange-900">New Cash Price:</span>
                      <div className="flex items-center gap-2">
                        {val > 0 && <span className="text-orange-400 line-through">${selectedProduct.cashPrice.toFixed(2)}</span>}
                        <span className="font-bold text-orange-900 text-lg">${newCash.toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-orange-900">New BNPL Price:</span>
                      <div className="flex items-center gap-2">
                        {val > 0 && <span className="text-orange-400 line-through">${selectedProduct.bnplPrice.toFixed(2)}</span>}
                        <span className="font-bold text-orange-900 text-lg">${newBnpl.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex gap-3">
              <button 
                onClick={() => setSelectedProduct(null)}
                className="flex-1 px-4 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={applyPromo}
                className="flex-1 px-4 py-3 bg-[#ff6900] text-white rounded-xl font-bold hover:shadow-lg hover:shadow-orange-500/30 transition-all active:scale-[0.98]"
              >
                Apply Promo
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Review Adjustments Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-[32px] w-full max-w-2xl shadow-2xl overflow-hidden transform animate-in slide-in-from-bottom-4 duration-300">
            <div className="p-8 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="font-black text-2xl text-gray-900">Review Pending Changes</h2>
                <p className="text-gray-500 text-sm mt-1">Review your SKU adjustments before deploying to the live catalog.</p>
              </div>
              <button 
                onClick={() => setIsReviewModalOpen(false)} 
                className="p-3 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors"
                disabled={isSaving}
              >
                <X className="w-5 h-5 text-gray-900" />
              </button>
            </div>

            <div className="p-8 max-h-[50vh] overflow-auto">
              {Object.keys(draftPromos).length === 0 ? (
                <div className="py-10 text-center text-gray-400 font-bold uppercase tracking-widest">
                  No pending adjustments
                </div>
              ) : (
                <div className="space-y-4">
                  {Object.entries(draftPromos).map(([id, percent]) => {
                    const product = products.find(p => p.id === id);
                    if (!product) return null;
                    const newCash = product.cashPrice * (1 - percent / 100);
                    return (
                      <div key={id} className="flex items-center gap-6 p-4 rounded-2xl bg-gray-50 border border-gray-100 group">
                        <div className="w-14 h-14 bg-white rounded-xl border border-gray-200 flex items-center justify-center p-2">
                          <img src={product.image} className="w-full h-full object-contain" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-gray-900 truncate">{product.name}</p>
                          <p className="text-xs text-emerald-600 font-bold tracking-tight bg-emerald-50 w-fit px-2 py-0.5 rounded-full border border-emerald-100 mt-1">
                            -{percent}% Promo Applied
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-400 line-through font-bold">${product.cashPrice.toFixed(2)}</p>
                          <p className="text-lg font-black text-[#ff6a00] leading-none">${newCash.toFixed(2)}</p>
                        </div>
                        <button 
                          onClick={() => removePromoFromDraft(id)}
                          className="p-2.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                          disabled={isSaving}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="p-8 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3 text-amber-600">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest leading-none">Status</p>
                  <p className="text-sm font-bold">Unsaved changes only</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <button 
                  onClick={() => setIsReviewModalOpen(false)}
                  disabled={isSaving}
                  className="px-8 py-4 bg-white border border-gray-200 text-gray-900 rounded-[18px] font-black text-sm hover:shadow-md transition-all active:scale-95"
                >
                  Keep Editing
                </button>
                <button 
                  onClick={handleSave}
                  disabled={isSaving || Object.keys(draftPromos).length === 0}
                  className={`px-10 py-4 rounded-[18px] font-black text-sm text-white shadow-xl transition-all active:scale-95 flex items-center gap-2 ${isSaving ? 'bg-green-500 cursor-wait' : 'bg-[#ff6a00]'}`}
                >
                  {isSaving ? 'Deploying Changes...' : 'Deploy to Catalog'}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

