import { useState, useEffect } from 'react';
import { 
  Truck, 
  Package, 
  Map as MapIcon, 
  Activity, 
  ClipboardList, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle,
  Warehouse,
  Navigation,
  Plus,
  UserCircle,
  ShieldCheck,
  ChevronRight,
  Download
} from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';

export default function LogisticsHubCollections() {
  const [userRole, setUserRole] = useState<'normalShop' | 'heartlandShop'>('normalShop');
  const [activeTab, setActiveTab] = useState<'central' | 'heartland'>('central');
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [processingStatus, setProcessingStatus] = useState<Record<string, string>>({});
  const [isDownloading, setIsDownloading] = useState(false);

  // Simulation effect for Supabase role check
  useEffect(() => {
    async function checkProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Query the types/profiles etc assigned by the user
        const { data: profile } = await supabase
          .from('profiles')
          .select('type')
          .eq('id', user.id)
          .single();
        
        if (profile?.type?.includes('heartland')) {
          setUserRole('heartlandShop');
        } else {
          setUserRole('normalShop');
        }
      }
    }
    checkProfile();
  }, []);

  // Mock Shop Restock Data (Heartland Portal)
  const shopRestocks = [
    { id: 'S-701', shop: 'Bedok North Depot', zone: 'East', priority: 'high', units: 450, stockLevel: 12 },
    { id: 'S-702', shop: 'Jurong Gateway', zone: 'West', priority: 'medium', units: 220, stockLevel: 35 },
    { id: 'S-703', shop: 'AMK Central Shop', zone: 'North', priority: 'high', units: 580, stockLevel: 8 },
    { id: 'S-704', shop: 'Tampines Hub Store', zone: 'East', priority: 'low', units: 120, stockLevel: 62 },
    { id: 'S-705', shop: 'Woodlands Mart', zone: 'North', priority: 'medium', units: 310, stockLevel: 28 },
    { id: 'S-706', shop: 'Clementi Mall #02', zone: 'West', priority: 'high', units: 440, stockLevel: 15 },
  ];

  const filteredRestocks = selectedZone 
    ? shopRestocks.filter(s => s.zone === selectedZone)
    : shopRestocks;

  const handleAction = (id: string) => {
    setProcessingStatus(prev => ({ ...prev, [id]: 'loading' }));
    setTimeout(() => {
      setProcessingStatus(prev => ({ ...prev, [id]: 'done' }));
    }, 1500);
  };

  const handleBatchApprove = () => {
    const toApprove = filteredRestocks.filter(s => !processingStatus[s.id]);
    toApprove.forEach(s => handleAction(s.id));
  };

  const handleDownloadManifest = () => {
    setIsDownloading(true);
    setTimeout(() => {
      const content = "MANIFEST ID: HUB-29001\nROUTE: NORTH-EAST DISTRIBUTION\nUNITS: 1240\nDATE: 2026-03-28\nSTATUS: VERIFIED";
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'dispatch-manifest.pdf'; // Simplified PDF sim
      a.click();
      URL.revokeObjectURL(url);
      setIsDownloading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#faf9f6]/90 p-6">
      {/* Simulation Header / Auth Bar */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-black text-2xl text-slate-900 tracking-tighter flex items-center gap-2">
            <Warehouse className="w-7 h-7 text-[#ff6900]" />
            Logistics Command Center
          </h1>
          <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-0.5">Central Hub Operations Hub</p>
        </div>

        {/* Profile Simulation Switcher */}
        <div className="flex items-center gap-3 bg-white p-1 rounded-[14px] border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 px-3 py-1.5 text-slate-400 border-r border-slate-100">
            <UserCircle className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest leading-none">Profile Switcher</span>
          </div>
          <button
            onClick={() => { setUserRole('normalShop'); setActiveTab('central'); }}
            className={`px-4 h-8 rounded-[10px] font-black text-[9px] uppercase tracking-widest transition-all ${
              userRole === 'normalShop' ? 'bg-slate-900 text-white' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Normal Shop
          </button>
          <button
            onClick={() => setUserRole('heartlandShop')}
            className={`px-4 h-8 rounded-[10px] font-black text-[9px] uppercase tracking-widest transition-all ${
              userRole === 'heartlandShop' ? 'bg-[#ff6900] text-white' : 'text-slate-400 hover:text-[#ff6900]'
            }`}
          >
            Heartland
          </button>
        </div>
      </div>

      {/* Main Tab Switcher */}
      <div className="flex items-center gap-4 mb-8">
        <div className="flex bg-white p-1 rounded-[14px] border border-slate-200 shadow-sm">
          <button
            onClick={() => setActiveTab('central')}
            className={`flex items-center gap-2 px-6 h-9 rounded-[10px] font-black text-[9px] uppercase tracking-widest transition-all ${
              activeTab === 'central' ? 'bg-slate-100 text-slate-900 border border-slate-200 shadow-sm' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Warehouse className="w-4 h-4" />
            Central Hub
          </button>
          
          {/* Conditional Heartland Portal Tab - Completely hidden for non-heartland roles */}
          {userRole === 'heartlandShop' && (
            <button
              onClick={() => setActiveTab('heartland')}
              className={`flex items-center gap-2 px-6 h-9 rounded-[10px] font-black text-[9px] uppercase tracking-widest transition-all ${
                activeTab === 'heartland' ? 'bg-orange-50 text-[#ff6900] border border-orange-100' : 'text-slate-400 hover:text-[#ff6900]'
              }`}
            >
              <Navigation className="w-4 h-4" />
              Heartland Portal
            </button>
          )}
        </div>
        
        {userRole !== 'heartlandShop' && (
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-100/50 rounded-[12px] border border-slate-200/50">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
            <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest italic leading-none">Heartland Shop Restricted</p>
          </div>
        )}
      </div>

      {activeTab === 'central' || userRole !== 'heartlandShop' ? (
        /* Central Hub View (Pioneer Road HQ) */
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6 animate-in fade-in duration-500">
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-sm overflow-hidden relative">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="font-black text-xl text-slate-900 tracking-tight">Pick & Pack Queue</h2>
                  <p className="text-slate-400 font-bold text-[9px] uppercase tracking-widest mt-1">Pioneer Road HQ • Central Hub</p>
                </div>
                <button className="h-9 px-5 bg-slate-50 border border-slate-200 text-slate-900 rounded-[10px] font-black text-[9px] uppercase tracking-widest hover:bg-white hover:shadow-sm transition-all focus:ring-2 focus:ring-[#ff6900]/20 outline-none">
                  Refresh Data
                </button>
              </div>

              <div className="space-y-3">
                {[
                  { id: 'HUB-29001', route: 'Regional - North Zone', items: 1240, status: 'Ready' },
                  { id: 'HUB-29002', route: 'Direct - Valu$ AMK Hub', items: 820, status: 'Picking' },
                  { id: 'HUB-29003', route: 'Regional - West Zone', items: 1560, status: 'Ready' },
                  { id: 'HUB-29004', route: 'Direct - Bedok Central', items: 430, status: 'Ready' },
                ].map((order) => (
                  <div key={order.id} className="group bg-slate-50 border border-slate-100 rounded-[16px] p-5 hover:border-[#ff6900] transition-all">
                    <div className="grid grid-cols-[1fr_auto_auto] items-center gap-6">
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                          <Package className="w-5 h-5 text-slate-400" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-bold text-slate-900 text-sm truncate uppercase tracking-tight">Bulk Manifest #{order.id}</h4>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{order.route} • {order.items} Units</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-2.5 py-1 rounded-[6px] font-black text-[9px] uppercase tracking-[0.1em] ${
                          order.status === 'Picking' ? 'bg-orange-50 text-[#ff6900] border border-orange-100' : 'bg-white text-slate-400 border border-slate-200'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <button className="h-9 px-5 bg-white border border-slate-200 text-slate-900 rounded-[10px] font-black text-[9px] uppercase tracking-widest hover:border-[#ff6900] hover:text-[#ff6900] transition-all flex items-center gap-2 active:scale-95">
                        Start
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-900 rounded-[24px] p-7 text-white shadow-xl">
              <h3 className="font-black text-[10px] uppercase tracking-widest mb-6 flex items-center gap-2 text-white/40">
                <ClipboardList className="w-4 h-4 text-[#ff6900]" />
                Logistics Assets
              </h3>
              <div className="space-y-3">
                {['Tampines Distribution', 'North Regional HQ', 'Jurong West Hub'].map((loc, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 p-4 rounded-[14px] hover:bg-white/10 transition-all cursor-pointer flex items-center justify-between group">
                    <div>
                      <p className="font-bold text-sm tracking-tight">{loc}</p>
                      <p className="text-[8px] font-black uppercase text-white/20 tracking-widest mt-1">Status: Confirmed</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>
              <button 
                onClick={handleDownloadManifest}
                disabled={isDownloading}
                className="w-full mt-6 h-10 bg-white/5 hover:bg-white/10 border border-white/10 rounded-[12px] font-black text-[9px] uppercase tracking-widest text-white/80 transition-all flex items-center justify-center gap-2"
              >
                {isDownloading ? (
                  'Generating PDF...'
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    Download PDF Manifest
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Heartland Portal View (Shop Management) - ONLY VISIBLE IF userRole === 'heartlandShop' */
        <div className="grid grid-cols-1 xl:grid-cols-[380px_1fr] gap-6 animate-in fade-in duration-500">
          
          {/* Interactive Regional Map Visual */}
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-[24px] p-7 shadow-sm">
              <h3 className="font-black text-[9px] uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                <MapIcon className="w-3.5 h-3.5" />
                Regional Distribution
              </h3>
              
              <div className="relative aspect-square bg-slate-50 border border-slate-100 rounded-[20px] overflow-hidden p-5 grid grid-cols-2 gap-3 pb-8">
                {[
                   { id: 'North', count: 12 },
                   { id: 'East', count: 8 },
                   { id: 'West', count: 15 },
                   { id: 'Central', count: 22 }
                ].map(zone => (
                  <button
                    key={zone.id}
                    onClick={() => setSelectedZone(selectedZone === zone.id ? null : zone.id)}
                    className={`relative p-3 rounded-[16px] transition-all flex flex-col items-center justify-center gap-1 border-2 ${
                      selectedZone === zone.id 
                        ? 'bg-[#ff6900]/10 border-[#ff6900]' 
                        : 'bg-white border-transparent hover:border-slate-200'
                    }`}
                  >
                    <p className={`text-[9px] font-black uppercase tracking-wider ${selectedZone === zone.id ? 'text-[#ff6900]' : 'text-slate-300'}`}>
                      {zone.id}
                    </p>
                    <p className="text-xl font-black text-slate-900">{zone.count}</p>
                    <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest">Active Shops</p>
                  </button>
                ))}
                
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#ff6900] rounded-full border-2 border-white z-20"></div>
              </div>

              <div className="mt-6">
                <div className="bg-orange-50/50 border border-orange-100 p-4 rounded-[16px] flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-[#ff6900]" />
                  <p className="text-[9px] text-slate-500 font-bold leading-tight uppercase tracking-wide">
                    Priority Alert: 8 depots require inventory synchronization.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-[24px] overflow-hidden shadow-sm">
              <div className="p-7 border-b border-slate-50 flex items-center justify-between">
                <div>
                  <h2 className="font-black text-xl text-slate-900 tracking-tight leading-none uppercase">
                    {selectedZone ? `${selectedZone} Zone Restocks` : 'Shop Portal Requests'}
                  </h2>
                  <p className="text-slate-400 font-bold text-[9px] uppercase tracking-widest mt-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    Regional System Synced
                  </p>
                </div>
                <button
                  onClick={handleBatchApprove}
                  disabled={filteredRestocks.every(s => processingStatus[s.id])}
                  className="h-9 px-6 bg-slate-900 text-white rounded-[10px] font-black text-[9px] uppercase tracking-widest hover:bg-slate-800 transition-all shadow-md active:scale-95 disabled:opacity-50"
                >
                  Approve Zone
                </button>
              </div>

              <div className="overflow-hidden">
                <div className="bg-slate-50/50 px-8 py-3 grid grid-cols-[1fr_100px_100px_120px] gap-4">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Depot ID / Shop</p>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Inventory</p>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Requested</p>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest text-right pr-1">Action</p>
                </div>

                <div className="divide-y divide-slate-100">
                  {filteredRestocks.map((shop) => (
                    <div key={shop.id} className="px-8 py-4 hover:bg-slate-50/50 transition-all group grid grid-cols-[1fr_100px_100px_120px] gap-4 items-center">
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-[#ff6900] shadow-sm flex-shrink-0 group-hover:bg-orange-50 transition-colors">
                          <Truck className="w-4 h-4 opacity-70" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-slate-800 text-[13px] truncate">{shop.shop}</p>
                          <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest font-mono">{shop.id} • {shop.zone}</span>
                        </div>
                      </div>

                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <div className={`w-1.5 h-1.5 rounded-full ${shop.stockLevel < 20 ? 'bg-rose-500 animate-pulse' : 'bg-slate-300'}`}></div>
                          <p className={`font-black text-[13px] ${shop.stockLevel < 20 ? 'text-rose-600' : 'text-slate-900'}`}>{shop.stockLevel}%</p>
                        </div>
                        <p className="text-[8px] font-black uppercase text-slate-300 tracking-widest">Current Health</p>
                      </div>

                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <Plus className="w-3 h-3 text-[#ff6900]" />
                          <p className="font-black text-[13px] text-slate-900">{shop.units}</p>
                        </div>
                        <p className="text-[8px] font-black uppercase text-slate-300 tracking-widest">Proposed Restock</p>
                      </div>

                      <div className="flex justify-end">
                        <button
                          onClick={() => handleAction(shop.id)}
                          disabled={!!processingStatus[shop.id]}
                          className={`h-8 w-full rounded-[10px] font-black text-[9px] uppercase tracking-widest transition-all shadow-sm flex items-center justify-center gap-1.5 ${
                            processingStatus[shop.id] === 'done'
                              ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                              : processingStatus[shop.id] === 'loading'
                              ? 'bg-slate-50 text-slate-300 cursor-wait'
                              : 'bg-white border border-slate-200 text-slate-900 hover:border-[#ff6900] hover:text-[#ff6900]'
                          }`}
                        >
                          {processingStatus[shop.id] === 'done' ? (
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          ) : (
                            <>
                              {processingStatus[shop.id] === 'loading' ? '...' : 'Approve'}
                              <ArrowRight className="w-3 h-3" />
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
