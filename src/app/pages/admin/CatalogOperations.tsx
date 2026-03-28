import { useState, useMemo } from 'react';
import { useProducts } from '../../hooks/useData';
import { supabase } from '../../lib/supabaseClient';
import {
  Package,
  TrendingUp,
  AlertTriangle,
  Truck,
  Download,
  Plus,
  Minus,
  X,
  CheckCircle2,
  ShoppingCart,
  ChevronRight,
  TrendingUp as TrendingUpIcon,
  Activity,
  Calendar
} from 'lucide-react';

export default function CatalogOperations() {
  const { products, loading } = useProducts();
  const [isExporting, setIsExporting] = useState(false);
  const [isOrdering, setIsOrdering] = useState(false);

  // State for draft procurement order
  const [draftOrder, setDraftOrder] = useState<Record<string, number>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successOrder, setSuccessOrder] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      const csv = 'SKU,Demand,Stock\nPremium Cola,+34%,8 days\nInstant Noodles,+22%,13 days';
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'restock-list.csv';
      a.click();
      URL.revokeObjectURL(url);
      setIsExporting(false);
    }, 1500);
  };

  const handleOrder = async () => {
    if (Object.keys(draftOrder).length === 0) return;

    setIsOrdering(true);
    try {
      // Simulate/Implement restocking logic by updating product stock in Supabase
      const updatePromises = Object.entries(draftOrder).map(([id, qty]) => {
        const product = products.find(p => p.id === id);
        if (product) {
          return supabase
            .from('products')
            .update({ stock: product.stock + qty })
            .eq('id', product.dbId || id);
        }
        return Promise.resolve();
      });

      await Promise.all(updatePromises);

      setSuccessOrder(true);
      setDraftOrder({});
      setTimeout(() => {
        setSuccessOrder(false);
        setIsModalOpen(false);
      }, 3000);
    } catch (error) {
      console.error('Error raising supplier order:', error);
      alert('Failed to raise supplier order. Please check connection.');
    } finally {
      setIsOrdering(false);
    }
  };

  const addToDraft = (productId: string, suggestedQty: number) => {
    setDraftOrder(prev => ({
      ...prev,
      [productId]: suggestedQty
    }));
    setIsModalOpen(true);
  };

  const updateDraftQty = (productId: string, delta: number) => {
    setDraftOrder(prev => {
      const current = prev[productId] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const { [productId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [productId]: next };
    });
  };

  // Mock forecast logic based on live product data
  const watchlist = useMemo(() => {
    return products
      .filter(p => p.stock < 500) // User manually changed threshold to 200, I'll keep it low or use their pref. Let's use 200 as per their last edit.
      .filter(p => p.stock < 200)
      .map(p => {
        // Business metrics the user requested earlier to clarify data
        const dailyVelocity = 8 + (parseInt(p.id) % 15);
        const monthlyVelocity = dailyVelocity * 30;
        const runway = Math.floor(p.stock / dailyVelocity);
        
        return {
          id: p.id,
          name: p.name,
          category: p.category,
          image: p.image,
          stock: p.stock,
          velocity: monthlyVelocity,
          runway: runway,
          suggestedQty: Math.max(0, (dailyVelocity * 30) - p.stock)
        };
      })
      .sort((a, b) => a.runway - b.runway);
  }, [products]);

  const atRiskCount = watchlist.filter(w => w.runway < 10).length;

  const handleRestockAll = () => {
    const batch: Record<string, number> = {};
    watchlist.forEach(p => {
      if (p.suggestedQty > 0) {
        batch[p.id] = p.suggestedQty;
      }
    });
    setDraftOrder(prev => ({ ...prev, ...batch }));
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen p-7 pb-32">
      {/* Header */}
      <div className="flex items-center justify-between mb-7">
        <div className="bg-[#27286f] border border-white rounded-full px-3.5 py-1.5">
          <p className="font-bold text-xs text-white">Catalog Operations</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExport}
            disabled={isExporting}
            className={`h-10 px-5 bg-white border border-slate-200 rounded-[12px] font-bold text-sm hover:shadow-sm hover:border-slate-300 transition-all flex items-center justify-center gap-2 ${isExporting ? 'text-slate-400 cursor-wait' : 'text-slate-700'}`}>
            <Download className="w-4 h-4" />
            {isExporting ? 'Exporting...' : 'Export list'}
          </button>
        </div>
      </div>

      {/* Insight Dashboard Header */}
      <div className="bg-white border border-slate-200 rounded-[28px] p-8 shadow-sm mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rotate-45 translate-x-32 -translate-y-32 rounded-[60px] -z-0"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-50/50 -translate-x-16 translate-y-16 rounded-full -z-0 blur-2xl"></div>

        <div className="relative z-10 grid grid-cols-[1fr_360px] gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Inventory Intelligence • Active</span>
            </div>
            <h2 className="font-black text-3xl text-slate-900 mb-3 tracking-tight">Supply Chain Command</h2>
            <p className="text-slate-500 max-w-xl leading-relaxed font-medium">
              ML models indicate a <span className="text-orange-600 font-bold">30-day coverage</span> target.
              Synchronize bulk orders across high-velocity SKUs to optimize route efficiency.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-100 rounded-[20px] p-5">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 leading-none">High Velocity</p>
              <div className="flex items-baseline gap-1">
                <p className="text-3xl font-black text-slate-900">{watchlist.length}</p>
                <TrendingUp className="w-4 h-4 text-emerald-500" />
              </div>
            </div>
            <div className="bg-rose-50 border border-rose-100 rounded-[20px] p-5">
              <p className="text-[10px] font-black uppercase tracking-widest text-rose-500 mb-2 leading-none">Urgent Needs</p>
              <div className="flex items-baseline gap-1">
                <p className="text-3xl font-black text-rose-600">{atRiskCount}</p>
                <AlertTriangle className="w-4 h-4 text-rose-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-[minmax(600px,1.4fr)_1fr] gap-8 items-start">
        {/* SKU Watchlist */}
        <div className="bg-white border border-[#eadfce] rounded-[24px] shadow-sm p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-bold text-lg text-[#1f2937] mb-1">High-demand SKU watchlist</h3>
              <p className="text-sm text-[#6b7280]">Real-time consumption tracking across Heartland trade routes.</p>
            </div>
          </div>

          <div className="space-y-0 border-t border-[#f0e7da]">
            {loading ? (
              <div className="p-10 text-center text-gray-400 font-bold italic tracking-widest text-sm">Fetching supply data...</div>
            ) : watchlist.map((product, index) => (
              <div key={index} className="border-b border-[#f0e7da] py-4 group hover:bg-[#fffcf8] transition-all px-6">
                <div className="grid grid-cols-[1fr_100px_110px_120px] items-center gap-4">
                  {/* SKU Name & Category */}
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-1.5 flex-shrink-0 group-hover:bg-white transition-colors">
                      <img src={product.image} className="w-full h-full object-contain" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-sm text-[#1f2937] truncate mb-0.5">{product.name}</p>
                      <p className="text-[10px] font-black text-[#6b7280] uppercase tracking-wider opacity-60 truncate">{product.category}</p>
                    </div>
                  </div>
                  
                  {/* Sales Velocity */}
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <TrendingUpIcon className="w-3.5 h-3.5 text-emerald-500" />
                      <p className="font-black text-[14px] text-[#1f2937] leading-none">{product.velocity}</p>
                    </div>
                    <p className="text-[9px] uppercase font-black text-[#6b7280] tracking-wide opacity-50 truncate">Unit/Mo</p>
                  </div>
                  
                  {/* Stock Runway */}
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <Activity className={`w-3.5 h-3.5 ${product.runway < 10 ? 'text-rose-500 animate-pulse' : 'text-slate-400'}`} />
                      <p className={`font-black text-[14px] leading-none ${product.runway < 10 ? 'text-rose-600' : 'text-slate-900'}`}>
                        {product.runway}d
                      </p>
                    </div>
                    <p className="text-[9px] uppercase font-black text-[#6b7280] tracking-wide opacity-50 truncate">Runway</p>
                  </div>

                  {/* Actions - Unified Dimension */}
                  <div className="flex justify-end">
                    {!draftOrder[product.id] ? (
                      <button
                        onClick={() => addToDraft(product.id, product.suggestedQty)}
                        className="h-10 w-full bg-[#ff6900] text-white rounded-[12px] font-black text-[10px] uppercase tracking-widest hover:bg-orange-600 transition-all shadow-sm active:scale-95 flex items-center justify-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Restock
                      </button>
                    ) : (
                      <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 p-0.5 rounded-[12px] shadow-inner h-10 w-full justify-between overflow-hidden">
                        <button
                          onClick={() => updateDraftQty(product.id, -10)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white transition-all text-slate-500 flex-shrink-0"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-black text-[11px] text-slate-900 min-w-0 text-center truncate">
                          {draftOrder[product.id]}
                        </span>
                        <button
                          onClick={() => updateDraftQty(product.id, 10)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white transition-all text-slate-500 flex-shrink-0"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Supplier Matrix - ONE PER ROW */}
        <div className="bg-white border border-slate-200 rounded-[28px] shadow-sm p-7 overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-black text-xl text-slate-900 mb-1">Supplier Matrix</h3>
              <p className="text-sm text-slate-500 font-medium">One-per-row horizontal synchronization.</p>
            </div>
            <button 
              onClick={handleRestockAll}
              className="h-10 px-5 bg-slate-900 text-white rounded-[12px] font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all shadow-md active:scale-95 flex items-center justify-center"
            >
              Restock All
            </button>
          </div>

          <div className="space-y-4">
            {[
              { name: 'East Asia Dispenser', lead: '4d', moq: '180ctn', status: 'Optimal', color: 'emerald' },
              { name: 'Noodles Regional', lead: '7d', moq: '220ctn', status: 'Monitor', color: 'orange' },
              { name: 'Global Snacks Importer', lead: '6d', moq: '120ctn', status: 'Risk', color: 'rose' },
              { name: 'Local Dairy Corp', lead: '2d', moq: '50ctn', status: 'Optimal', color: 'emerald' },
            ].map((sup, idx) => (
              <div key={idx} className="bg-slate-50/50 border border-slate-100 rounded-[12px] p-4 hover:border-slate-300 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center flex-shrink-0 group-hover:bg-slate-50">
                    <Truck className="w-4 h-4 text-slate-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-slate-900 truncate tracking-tight">{sup.name}</h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-wide">{sup.lead} Lead</span>
                      <span className="text-[8px] text-slate-300">•</span>
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-wide">{sup.moq} MOQ</span>
                    </div>
                  </div>
                  <div className="flex justify-end flex-shrink-0">
                    <span className={`px-2 py-1 rounded-md border border-${sup.color}-100 bg-${sup.color}-50 text-${sup.color}-600 text-[8px] font-black uppercase tracking-wider text-center min-w-[64px]`}>
                      {sup.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-5 bg-orange-50 border border-orange-100 rounded-[24px] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center">
                 <TrendingUpIcon className="w-5 h-5 text-orange-600" />
              </div>
              <p className="text-xs text-orange-900 font-bold max-w-[140px] leading-tight">
                Optimized recommendation: 420 cartons.
              </p>
            </div>
            <button className="h-9 px-4 bg-white border border-orange-100 rounded-[10px] text-[10px] font-black uppercase text-orange-600 hover:shadow-sm transition-all flex items-center justify-center gap-1.5 active:scale-95">
              Strategy
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Refresh/Procurement Cart */}
      {Object.keys(draftOrder).length > 0 && (
        <div className="fixed bottom-10 right-10 z-40 animate-in slide-in-from-right-10 duration-500">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-4 bg-[#ff6a00] hover:bg-orange-600 text-white p-2 pl-6 pr-2 rounded-[24px] shadow-2xl shadow-orange-500/40 hover:-translate-y-1 active:scale-95 transition-all ring-4 ring-white"
          >
            <div className="flex flex-col items-start">
              <span className="text-[10px] font-black uppercase tracking-widest opacity-80 leading-tight">Ready to Procurement</span>
              <span className="text-sm font-black whitespace-nowrap">Review & Restock {Object.keys(draftOrder).length} SKUs</span>
            </div>
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
          </button>
        </div>
      )}

      {/* Replenishment Order Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-[32px] w-full max-w-2xl shadow-2xl overflow-hidden transform animate-in slide-in-from-bottom-5 duration-300">
            <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Truck className="w-5 h-5 text-[#ff6900]" />
                  <h2 className="font-black text-2xl text-gray-900 tracking-tight">Replenishment Summary</h2>
                </div>
                <p className="text-gray-500 text-sm font-medium">Coordinate bulk orders across your global suppliers.</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-10 h-10 flex items-center justify-center bg-white hover:bg-gray-100 rounded-[10px] transition-colors border border-gray-100 shadow-sm"
              >
                <X className="w-4 h-4 text-gray-900" />
              </button>
            </div>

            <div className="p-0 max-h-[50vh] overflow-auto">
              {successOrder ? (
                <div className="p-20 text-center flex flex-col items-center animate-in zoom-in-95">
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-xl shadow-green-200/50">
                    <CheckCircle2 className="w-12 h-12 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-2">Supplier Order Raised!</h3>
                  <p className="text-gray-500 font-medium">Stock levels will update as soon as shipping is confirmed.</p>
                </div>
              ) : Object.keys(draftOrder).length === 0 ? (
                <div className="p-20 text-center text-gray-400 font-black uppercase tracking-widest text-sm italic">
                  Draft order is empty
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {Object.entries(draftOrder).map(([id, qty]) => {
                    const product = products.find(p => p.id === id);
                    if (!product) return null;
                    return (
                      <div key={id} className="flex items-center gap-6 p-6 hover:bg-gray-50 transition-colors">
                        <div className="w-16 h-16 bg-white rounded-2xl border border-gray-100 flex items-center justify-center p-2 shadow-sm">
                          <img src={product.image} className="w-full h-full object-contain" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-gray-900 truncate leading-tight mb-1">{product.name}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">Curr Stock: {product.stock}</span>
                            <ChevronRight className="w-3 h-3 text-gray-300" />
                            <span className="text-[10px] font-black uppercase tracking-wider text-green-600">New: {product.stock + qty}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-gray-200 shadow-sm">
                          <button
                            onClick={() => updateDraftQty(id, -10)}
                            className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-black text-lg text-gray-900 min-w-[3rem] text-center">{qty}</span>
                          <button
                            onClick={() => updateDraftQty(id, 10)}
                            className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {!successOrder && Object.keys(draftOrder).length > 0 && (
              <div className="p-8 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center shadow-sm">
                    <Truck className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 leading-none">Estimate Delivery</p>
                    <p className="text-sm font-bold text-gray-700">Tue, Mar 31 (3-5 Days)</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    disabled={isOrdering}
                    className="h-12 px-8 bg-white border border-slate-200 text-slate-900 rounded-[12px] font-black text-sm hover:border-slate-300 hover:shadow-md transition-all active:scale-95"
                  >
                    Modify
                  </button>
                  <button
                    onClick={handleOrder}
                    disabled={isOrdering}
                    className={`h-12 px-10 rounded-[12px] font-black text-sm text-white shadow-lg shadow-orange-200/50 transition-all active:scale-95 flex items-center justify-center gap-2 ${isOrdering ? 'bg-orange-400 cursor-wait' : 'bg-[#ff6900] hover:bg-orange-600'}`}
                  >
                    {isOrdering ? 'Raising Order...' : 'Confirm Order'}
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
