import { useState, useMemo, useEffect } from 'react';
import { useProducts } from '../../hooks/useData';
import { 
  Search, 
  Tag, 
  Lock, 
  ChevronRight, 
  CheckCircle2, 
  Download,
  Activity,
  Package,
  ArrowRight,
  LayoutDashboard,
  Printer,
  MapPin,
  Clock,
  X,
  ShieldCheck,
  Zap,
  AlertCircle
} from 'lucide-react';
import { Product } from '../../types';
import { supabase } from '../../lib/supabaseClient';

export default function PricingConfiguration() {
  const { products, loading } = useProducts();
  const [isSaving, setIsSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [selectedTag, setSelectedTag] = useState<Product | null>(null);
  
  // Local Audit States
  const [syncedIds, setSyncedIds] = useState<Set<string>>(new Set());

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  // Toggle Sync Status
  const toggleSync = (id: string) => {
    if (isVerified) return; // Lock if verified
    setSyncedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const activeOffers = products.filter(p => p.cashPrice < p.retailPrice);
  const auditProgress = Math.round((syncedIds.size / Math.max(activeOffers.length, 1)) * 100);

  const handleExport = () => {
    const rows = [
      ['Product', 'Location', 'Web Price', 'Sync Status', 'Audit Date'],
      ...products.map(p => [
        p.name, 
        `Aisle ${Math.floor(Math.random()*10)+1} • L${Math.floor(Math.random()*4)+1}`, 
        `$${p.cashPrice.toFixed(2)}`, 
        syncedIds.has(p.id) ? 'SYNCED' : 'PENDING',
        new Date().toLocaleString()
      ])
    ];

    const csvContent = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `valu-store-audit-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFinalizeAndExport = () => {
    if (auditProgress < 100) {
      alert("Checklist Incomplete: Please verify all 100% of labels before finalizing.");
      return;
    }
    setIsSaving(true);
    setTimeout(() => {
      setIsVerified(true);
      handleExport();
      setIsSaving(false);
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col bg-[#faf9f6]/95 overflow-hidden p-4 gap-3 relative">
      
      {/* Success Managed Store State */}
      {isVerified && (
        <div className="absolute inset-0 z-50 bg-white/60 backdrop-blur-md flex items-center justify-center animate-in fade-in duration-700">
           <div className="bg-white border border-slate-200 p-10 rounded-[40px] shadow-2xl flex flex-col items-center text-center max-w-sm animate-in zoom-in-95 duration-500">
              <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                <ShieldCheck className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 leading-tight uppercase tracking-tight">Store Verified</h2>
              <p className="text-slate-400 text-sm mt-3 font-bold uppercase tracking-widest leading-relaxed">
                Physical label sync is complete and audit log has been exported.
              </p>
              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between w-full">
                 <div className="text-left">
                    <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest leading-none">Timestamp</p>
                    <p className="text-xs font-bold text-slate-900 mt-1">{new Date().toLocaleTimeString()}</p>
                 </div>
                 <button 
                   onClick={() => setIsVerified(false)}
                   className="h-9 px-6 bg-slate-900 text-white rounded-[11px] font-black text-[9px] uppercase tracking-widest"
                 >
                   Reset Audit
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* Header (Ultra Tactical) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 px-2">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-[#ff6900] mb-0.5">
            <Zap className="w-3.5 h-3.5" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em] leading-none">Store Compliance Mission</span>
          </div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight leading-none uppercase">
             Ready-to-Sell Audit
          </h1>
        </div>

        <div className="flex items-center gap-2">
           <div className="flex flex-col items-end mr-3">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Audit Progress</p>
              <div className="flex items-center gap-3">
                 <div className="w-32 h-2.5 bg-slate-200 rounded-full overflow-hidden border border-slate-100">
                    <div 
                      className="h-full bg-gradient-to-r from-[#ff6900] to-orange-400 transition-all duration-1000 ease-out"
                      style={{ width: `${auditProgress}%` }}
                    />
                 </div>
                 <span className="text-[10px] font-black text-slate-900 leading-none">{auditProgress}%</span>
              </div>
           </div>
           
           <button 
             onClick={handleFinalizeAndExport}
             disabled={isSaving || isVerified}
             className={`h-9 px-6 rounded-[11px] font-black text-[9px] uppercase tracking-widest transition-all shadow-md active:scale-95 ${
               auditProgress === 100 
                ? 'bg-[#ff6900] text-white hover:bg-orange-600 hover:scale-[1.02] hover:shadow-orange-200' 
                : 'bg-white border border-slate-200 text-slate-400 opacity-60'
             }`}
           >
             {isSaving ? 'Processing...' : 'Finalize & Export'}
           </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col gap-3 min-h-0">
        {/* Filter Bar (Compact h-9) */}
        <div className="bg-white border border-slate-200/60 rounded-[15px] p-1.5 px-3 flex items-center justify-between shadow-sm flex-shrink-0">
           <div className="flex-1 relative">
             <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
             <input 
               placeholder="Search product audit name..."
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full h-8 pl-8 pr-4 bg-slate-50 border border-slate-100 rounded-[9px] font-bold text-[11px] outline-none"
             />
           </div>
           <div className="flex items-center gap-4 pl-6 text-slate-400">
              <div className="flex items-center gap-1.5">
                 <Package className="w-3.5 h-3.5" />
                 <span className="text-[9px] font-black uppercase tracking-widest">{activeOffers.length} Campaigns</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-orange-50 rounded-full border border-orange-100">
                 <AlertCircle className="w-3.5 h-3.5 text-[#ff6900]" />
                 <span className="text-[9px] font-black uppercase tracking-widest text-[#ff6900]">
                    {activeOffers.length - syncedIds.size} Labels Pending
                 </span>
              </div>
           </div>
        </div>

        {/* Audit Table (Locked Viewport) */}
        <div className="flex-1 bg-white border border-slate-200/60 rounded-[22px] shadow-sm flex flex-col overflow-hidden min-h-0">
          <div className="bg-slate-50/50 px-6 py-2.5 border-b border-slate-100 grid grid-cols-[100px_1fr_120px_140px_100px] gap-4 items-center flex-shrink-0">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Location</p>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">SKU Details</p>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Must Match (Web)</p>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Campaign Expiry</p>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest text-right pr-2">Actions</p>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-50 custom-scrollbar">
            {filteredProducts.map((product, idx) => {
              const aisle = (idx % 8) + 1;
              const level = (idx % 4) + 1;
              const endsIn = (idx % 5) + 1;
              const isSale = product.cashPrice < product.retailPrice;

              return (
                <div key={product.id} className="px-6 py-2 hover:bg-slate-50 transition-all grid grid-cols-[100px_1fr_120px_140px_100px] gap-4 items-center group">
                  <div className="flex items-center gap-2 text-slate-400">
                    <MapPin className="w-3.5 h-3.5" />
                    <p className="font-bold text-[11px] uppercase tracking-tighter">A{aisle} • L{level}</p>
                  </div>

                  <div className="flex items-center gap-3 min-w-0">
                     <div className="w-9 h-9 bg-white border border-slate-100 rounded-lg flex items-center justify-center p-1 flex-shrink-0">
                       <img src={product.image} className="w-full h-full object-contain" />
                     </div>
                     <p className="font-bold text-slate-900 text-xs truncate leading-none">{product.name}</p>
                  </div>

                  <p className={`font-black text-sm font-mono ${isSale ? 'text-[#ff6900]' : 'text-slate-900'}`}>
                    ${product.cashPrice.toFixed(2)}
                  </p>

                  <div>
                     <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Ends in {endsIn} Days</p>
                     <div className="w-full h-1 bg-slate-100 rounded-full mt-1.5 overflow-hidden">
                        <div className="h-full bg-slate-300 rounded-full" style={{ width: `${(endsIn/5)*100}%` }} />
                     </div>
                  </div>

                  <div className="flex justify-end pr-2 gap-2">
                     <button 
                       onClick={() => setSelectedTag(product)}
                       className="w-8 h-8 rounded-lg border border-slate-100 bg-white flex items-center justify-center text-slate-400 hover:text-[#ff6900] hover:border-orange-200 hover:scale-110 hover:shadow-sm transition-all active:scale-95"
                     >
                       <Printer className="w-4 h-4" />
                     </button>
                     <div 
                       onClick={() => toggleSync(product.id)}
                       className={`w-8 h-8 rounded-lg border-2 cursor-pointer transition-all flex items-center justify-center hover:scale-110 ${
                         syncedIds.has(product.id) 
                          ? 'bg-emerald-500 border-emerald-500 shadow-lg shadow-emerald-100' 
                          : 'bg-white border-slate-200 hover:border-[#ff6900] hover:border-opacity-50'
                       }`}
                     >
                       {syncedIds.has(product.id) && <CheckCircle2 className="w-5 h-5 text-white" />}
                     </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tag Mockup Modal */}
      {selectedTag && (
        <div className="fixed inset-0 z-[60] bg-slate-950/40 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
           <div className="bg-white rounded-[32px] w-full max-w-[420px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                 <div>
                    <h3 className="text-base font-black text-slate-900 leading-none tracking-tight uppercase">Tag Mockup</h3>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1.5 leading-none italic">Verifying print layout...</p>
                 </div>
                 <button 
                   onClick={() => setSelectedTag(null)}
                   className="w-9 h-9 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors"
                 >
                   <X className="w-4 h-4" />
                 </button>
              </div>

              <div className="p-8 bg-slate-50 flex items-center justify-center">
                 {/* The Official Valu$ Shelf Tag Design */}
                 <div className="w-[300px] aspect-[4/3] bg-white border-[3px] border-slate-900 rounded-lg p-5 shadow-lg relative flex flex-col justify-between">
                    <div className="flex items-center justify-between border-b-[2px] border-slate-900 pb-2">
                       <p className="text-[14px] font-black bg-slate-900 text-white px-2 py-0.5 rounded leading-none">V$</p>
                       <p className="text-[10px] font-black uppercase tracking-widest leading-none">WHOLESALE</p>
                    </div>
                    
                    <div className="mt-4">
                       <p className="text-[12px] font-black text-slate-900 uppercase leading-none truncate">{selectedTag.name}</p>
                       <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">{selectedTag.category} • {selectedTag.unit}</p>
                    </div>

                    <div className="flex items-end justify-between mt-4">
                       <div>
                          <div className="flex gap-0.5 mb-1.5">
                             {[1,2,3,4,5,6,1,2,3,1,2,3,1].map(i => <div key={Math.random()} className="w-0.5 bg-slate-900" style={{ height: `${Math.floor(Math.random()*12)+8}px` }} />)}
                          </div>
                          <p className="text-[8px] font-bold tracking-widest leading-none">003921 {selectedTag.id.slice(0,6)}</p>
                       </div>
                       <div className="text-right">
                          <p className="text-[8px] font-black uppercase leading-none mb-1 text-slate-400">Shelf Price</p>
                          <p className="text-[42px] font-black leading-none tracking-tighter">${selectedTag.cashPrice.toFixed(2).split('.')[0]}<span className="text-[20px] align-top">.{selectedTag.cashPrice.toFixed(2).split('.')[1]}</span></p>
                       </div>
                    </div>

                    <div className="absolute top-1/2 -right-3 -translate-y-1/2 rotate-90 origin-center text-[10px] font-black text-slate-200">
                       V$-CAMPAIGN-04
                    </div>
                 </div>
              </div>

              <div className="p-6 bg-white border-t border-slate-50 flex gap-3">
                 <button 
                   onClick={() => setSelectedTag(null)}
                   className="flex-1 h-11 border border-slate-200 text-slate-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all font-mono"
                 >
                   Cancel
                 </button>
                 <button 
                   onClick={() => {
                     alert(`Tag for ${selectedTag.name} sent to network printer #04.`);
                     setSelectedTag(null);
                   }}
                   className="flex-1 h-11 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2"
                 >
                   <Printer className="w-4 h-4" />
                   Confirm Print
                 </button>
              </div>
           </div>
        </div>
      )}

    </div>
  );
}
