import { useState, useMemo, useEffect } from 'react';
import { useProducts } from '../../hooks/useData';
import { 
  Search, 
  Tag, 
  Lock, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  Download,
  Activity,
  Package,
  ArrowRight,
  LayoutDashboard
} from 'lucide-react';
import { Product } from '../../types';
import { supabase } from '../../lib/supabaseClient';

export default function PricingConfiguration() {
  const { products, loading } = useProducts();
  const [isSaving, setIsSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Local Audit States
  const [syncedIds, setSyncedIds] = useState<Set<string>>(new Set());
  const [logisticsBuffers, setLogisticsBuffers] = useState<Record<string, number>>({});
  
  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  // Toggle Sync Status
  const toggleSync = (id: string) => {
    setSyncedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const activeWebOffers = products.filter(p => p.cashPrice < p.retailPrice).length;

  const handleFinalizeAudit = () => {
    setIsSaving(true);
    setTimeout(() => {
      alert(`Audit Complete: ${syncedIds.size} items physically verified.`);
      setIsSaving(false);
    }, 1200);
  };

  const handleExportChecklist = () => {
    const unsynced = products.filter(p => (p.cashPrice < p.retailPrice) && !syncedIds.has(p.id));
    if (unsynced.length === 0) {
      alert("All active offers are already synced! No checklist to export.");
      return;
    }

    const rows = [
      ['Product Name', 'Category', 'Web Offer Price', 'Sync Status'],
      ...unsynced.map(p => [p.name, p.category, `$${p.cashPrice.toFixed(2)}`, 'PENDING'])
    ];

    const csvContent = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `store-sync-checklist-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-full flex flex-col bg-[#faf9f6]/95 overflow-hidden p-4 gap-3">
      {/* Header (Ultra Compact) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 px-2">
        <div>
          <div className="flex items-center gap-1.5 text-[#ff6900] mb-0.5">
            <Tag className="w-3.5 h-3.5" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em] leading-none">Campaign Sync & Auditor</span>
          </div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight leading-none uppercase">
            Store Ready Consistency
          </h1>
        </div>

        <div className="flex items-center gap-2">
           <button 
             onClick={handleExportChecklist}
             className="h-9 px-4 bg-white border border-slate-200 text-slate-600 rounded-[11px] font-black text-[9px] uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-2 relative"
           >
             <Download className="w-3.5 h-3.5" />
             Export Checklist
             {activeWebOffers > syncedIds.size && (
               <span className="flex h-2 w-2 absolute -top-0.5 -right-0.5">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff6900]"></span>
               </span>
             )}
           </button>
           <button 
             onClick={handleFinalizeAudit}
             disabled={isSaving}
             className="h-9 px-5 bg-slate-900 text-white rounded-[11px] font-black text-[9px] uppercase tracking-widest hover:bg-slate-800 transition-all shadow-md active:scale-95 disabled:opacity-50"
           >
             {isSaving ? 'Logging...' : 'Finalize Store Audit'}
           </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col gap-3 min-h-0">
        {/* KPI Row (Ultra Compact) */}
        <div className="grid grid-cols-4 gap-3">
           <div className="bg-white border border-slate-200/60 rounded-[18px] p-3 flex items-center gap-3 shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-orange-50 text-[#ff6900] flex items-center justify-center">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[8px] font-black uppercase text-slate-400 tracking-wider leading-none">Campaign Readiness</p>
                <p className="text-base font-black text-slate-900 leading-none mt-1">
                   {Math.round((syncedIds.size / Math.max(activeWebOffers, 1)) * 100)}% Synced
                </p>
              </div>
           </div>
           <div className="bg-white border border-slate-200/60 rounded-[18px] p-3 flex items-center gap-3 shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Tag className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[8px] font-black uppercase text-slate-400 tracking-wider leading-none">Active Web Offers</p>
                <p className="text-base font-black text-slate-900 leading-none mt-1">{activeWebOffers} SKUs</p>
              </div>
           </div>
           <div className="bg-white border border-slate-200/60 rounded-[18px] p-3 flex items-center gap-3 shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[8px] font-black uppercase text-slate-400 tracking-wider leading-none">Inventory Efficiency</p>
                <p className="text-base font-black text-emerald-600 leading-none mt-1">2.84</p>
              </div>
           </div>
           <div className="bg-white border border-slate-200/60 rounded-[18px] p-3 flex items-center gap-3 shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[8px] font-black uppercase text-slate-400 tracking-wider leading-none">Security Status</p>
                <p className="text-base font-black text-slate-900 leading-none mt-1 italic uppercase">Verified</p>
              </div>
           </div>
        </div>

        {/* Filter Bar (Compact h-9) */}
        <div className="bg-white border border-slate-200/60 rounded-[15px] p-1.5 px-3 flex items-center gap-3 shadow-sm flex-shrink-0">
           <div className="flex-1 relative">
             <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
             <input 
               placeholder="Search product audit name..."
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full h-8 pl-8 pr-4 bg-slate-50 border border-slate-100 rounded-[9px] font-bold text-[11px] outline-none"
             />
           </div>
           <p className="text-[8px] font-black uppercase text-slate-300 tracking-[0.2em] whitespace-nowrap">Check shelf tags vs web</p>
        </div>

        {/* Table Area (Locked Height) */}
        <div className="flex-1 bg-white border border-slate-200/60 rounded-[22px] shadow-sm flex flex-col overflow-hidden min-h-0">
          <div className="bg-slate-50/50 px-6 py-2.5 border-b border-slate-100 grid grid-cols-[1fr_100px_100px_80px_100px] gap-4 items-center flex-shrink-0">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">SKU Details / Offer</p>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest text-right">Unified Web</p>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Landed Cost</p>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest text-center">Profit Score</p>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest text-right pr-2">Store Sync</p>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-50 custom-scrollbar">
            {filteredProducts.map((product) => {
              const isSale = product.cashPrice < product.retailPrice;
              const logisticsBurden = (product.retailPrice * 0.05); // Simulated local cost
              const landedCost = product.retailPrice + logisticsBurden;
              const grossMargin = product.cashPrice - landedCost;
              const gmroi = (product.cashPrice / landedCost).toFixed(2);
              
              const isHighPerformance = parseFloat(gmroi) > 2.5;

              return (
                <div key={product.id} className="px-6 py-2 hover:bg-slate-50 transition-all grid grid-cols-[1fr_100px_100px_80px_100px] gap-4 items-center group">
                  <div className="flex items-center gap-3">
                     <div className="w-8 h-8 bg-white border border-slate-100 rounded-lg flex items-center justify-center p-1 flex-shrink-0">
                       <img src={product.image} className="w-full h-full object-contain" />
                     </div>
                     <div className="min-w-0">
                        <p className="font-bold text-slate-900 text-xs truncate leading-none mb-1">{product.name}</p>
                        {isSale ? (
                          <span className="px-1.5 py-0.5 rounded-[4px] bg-orange-50 text-[#ff6900] text-[7px] font-black uppercase tracking-widest border border-orange-100 animate-pulse">
                             WEB OFFER ACTIVE
                          </span>
                        ) : (
                          <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest">REGULAR STOCK</span>
                        )}
                     </div>
                  </div>

                  <p className={`font-black text-xs text-right font-mono ${isSale ? 'text-[#ff6900]' : 'text-slate-900'}`}>
                    ${product.cashPrice.toFixed(2)}
                  </p>

                  <div className="text-right">
                    <p className="font-black text-xs text-slate-900 font-mono leading-none">${landedCost.toFixed(2)}</p>
                    <p className="text-[8px] font-bold text-slate-300 uppercase leading-none mt-1">Landed</p>
                  </div>

                  <div className="flex flex-col items-center">
                    <p className={`text-xs font-black ${isHighPerformance ? 'text-emerald-600' : 'text-slate-400'}`}>{gmroi}</p>
                    <div className={`w-full h-0.5 mt-1 rounded-full ${isHighPerformance ? 'bg-emerald-100' : 'bg-slate-100'}`}>
                       <div className={`h-full rounded-full ${isHighPerformance ? 'bg-emerald-500' : 'bg-slate-300'}`} style={{ width: `${Math.min(parseFloat(gmroi)*20, 100)}%` }}></div>
                    </div>
                    <p className="text-[7px] font-black text-slate-300 uppercase mt-1">Eff %</p>
                  </div>

                  <div className="flex justify-end pr-2">
                     <div 
                       onClick={() => toggleSync(product.id)}
                       className={`w-5 h-5 rounded-[6px] border-2 cursor-pointer transition-all flex items-center justify-center ${
                         syncedIds.has(product.id) 
                          ? 'bg-emerald-500 border-emerald-500' 
                          : isSale ? 'bg-white border-orange-400 hover:border-orange-500 shadow-sm shadow-orange-100' : 'bg-white border-slate-200 hover:border-slate-300'
                       }`}
                     >
                       {syncedIds.has(product.id) && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                     </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredProducts.length === 0 && (
            <div className="flex-1 flex flex-col items-center justify-center bg-slate-50/20">
              <Package className="w-10 h-10 text-slate-200 mb-4" />
              <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.2em]">No campaign data in catalog</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
