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
  Download,
  Search,
  Store
} from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';

export default function LogisticsHubCollections() {
  const [userRole, setUserRole] = useState<'normalShop' | 'hubShop'>('normalShop');
  const [activeTab, setActiveTab] = useState<'request' | 'hub'>('request');
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [processingStatus, setProcessingStatus] = useState<Record<string, string>>({});
  const [isDownloading, setIsDownloading] = useState(false);

  // New Request Form State
  const [requestForm, setRequestForm] = useState({
    hub: 'Bedok Central Hub',
    item: '',
    quantity: ''
  });

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
        
        if (profile?.type?.includes('hub')) {
          setUserRole('hubShop');
        } else {
          setUserRole('normalShop');
        }
      }
    }
    checkProfile();
  }, []);

  // Mock Shop Restock Data (For Hub Portal management)
  const incomingRequests = [
    { id: 'REQ-101', shop: 'Mama Shop #493', zone: 'East', priority: 'high', units: 450, time: '2h ago' },
    { id: 'REQ-102', shop: 'Jurong Gateway', zone: 'West', priority: 'medium', units: 220, time: '4h ago' },
    { id: 'REQ-103', shop: 'AMK Central', zone: 'North', priority: 'high', units: 580, time: '5h ago' },
    { id: 'REQ-104', shop: 'Tampines Hub', zone: 'East', priority: 'low', units: 120, time: '6h ago' },
  ];

  const filteredRequests = selectedZone 
    ? incomingRequests.filter(s => s.zone === selectedZone)
    : incomingRequests;

  const handleAction = (id: string) => {
    setProcessingStatus(prev => ({ ...prev, [id]: 'loading' }));
    setTimeout(() => {
      setProcessingStatus(prev => ({ ...prev, [id]: 'done' }));
    }, 1500);
  };

  const handleBatchApprove = () => {
    const toApprove = filteredRequests.filter(s => !processingStatus[s.id]);
    toApprove.forEach(s => handleAction(s.id));
  };

  const handleDownloadManifest = () => {
    setIsDownloading(true);
    setTimeout(() => {
      const content = "DISPATCH MANIFEST\nLOGISTICS HUB: BEDOK CENTRAL\nDATE: 2026-03-28\nTOTAL REQ: 4\nSTATUS: VERIFIED";
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'hub-dispatch-manifest.pdf';
      a.click();
      URL.revokeObjectURL(url);
      setIsDownloading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#faf9f6]/95 p-6 space-y-8">
      {/* Simulation Header / Auth Bar */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-black text-2xl text-slate-900 tracking-tighter flex items-center gap-2">
            <Navigation className="w-7 h-7 text-[#ff6900]" />
            Logistics Command
          </h1>
          <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-0.5">Supply Chain Orchestration Hub</p>
        </div>

        {/* Profile Simulation Switcher */}
        <div className="flex items-center gap-3 bg-white p-1 rounded-[14px] border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 px-3 py-1.5 text-slate-400 border-r border-slate-100">
            <UserCircle className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest leading-none">Profile</span>
          </div>
          <button
            onClick={() => { setUserRole('normalShop'); setActiveTab('request'); }}
            className={`px-4 h-8 rounded-[10px] font-black text-[9px] uppercase tracking-widest transition-all ${
              userRole === 'normalShop' ? 'bg-slate-900 text-white' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Normal Shop
          </button>
          <button
            onClick={() => setUserRole('hubShop')}
            className={`px-4 h-8 rounded-[10px] font-black text-[9px] uppercase tracking-widest transition-all ${
              userRole === 'hubShop' ? 'bg-[#ff6900] text-white font-black' : 'text-slate-400 hover:text-[#ff6900]'
            }`}
          >
            Hub Store
          </button>
        </div>
      </div>

      {/* Main Tab Switcher */}
      <div className="flex items-center gap-4">
        <div className="flex bg-white p-1 rounded-[15px] border border-slate-200 shadow-sm">
          <button
            onClick={() => setActiveTab('request')}
            className={`flex items-center gap-2 px-6 h-9 rounded-[11px] font-black text-[9px] uppercase tracking-widest transition-all ${
              activeTab === 'request' ? 'bg-slate-100 text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Plus className="w-4 h-4" />
            Request Restock
          </button>
          
          {/* Conditional Hub Portal Tab - Only visible to hubShop role */}
          {userRole === 'hubShop' && (
            <button
              onClick={() => setActiveTab('hub')}
              className={`flex items-center gap-2 px-6 h-9 rounded-[11px] font-black text-[9px] uppercase tracking-widest transition-all ${
                activeTab === 'hub' ? 'bg-orange-50 text-[#ff6900] shadow-sm' : 'text-slate-400 hover:text-[#ff6900]'
              }`}
            >
              <Navigation className="w-4 h-4" />
              Hub Portal
            </button>
          )}
        </div>
        
        {userRole !== 'hubShop' && (
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-100/50 rounded-[12px] border border-slate-200/50">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
            <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest italic leading-none">Hub Restricted</p>
          </div>
        )}
      </div>

      {activeTab === 'request' || userRole !== 'hubShop' ? (
        /* Request Restock View (Normal Shop Perspective) */
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 animate-in fade-in duration-500">
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-[28px] p-8 shadow-sm">
              <div className="mb-10">
                <h2 className="font-black text-2xl text-slate-900 tracking-tight flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                    <Package className="w-5 h-5 text-slate-400" />
                  </div>
                  Post New Restock Request
                </h2>
                <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-2">Inventory Replenishment from Hub Store</p>
              </div>

              {/* Restock Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Select Nearest Hub</label>
                  <select 
                    value={requestForm.hub}
                    onChange={(e) => setRequestForm({...requestForm, hub: e.target.value})}
                    className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-[12px] font-bold text-sm focus:ring-2 focus:ring-[#ff6900]/20 outline-none transition-all"
                  >
                    <option>Bedok Central Hub (East)</option>
                    <option>Jurong West Hub (West)</option>
                    <option>Woodlands Central (North)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Search SKU</label>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      placeholder="Product name or code..."
                      className="w-full h-11 pl-11 pr-4 bg-slate-50 border border-slate-200 rounded-[12px] font-bold text-sm focus:ring-2 focus:ring-[#ff6900]/20 outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Quantity Requested</label>
                  <input 
                    type="number"
                    placeholder="E.g. 500 units"
                    className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-[12px] font-bold text-sm focus:ring-2 focus:ring-[#ff6900]/20 outline-none transition-all"
                  />
                </div>
                <div className="flex items-end">
                  <button className="w-full h-11 bg-slate-900 text-white rounded-[12px] font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all shadow-md active:scale-95 flex items-center justify-center gap-2">
                    Submit Request to Hub
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Recent Orders List for the Shop */}
            <div className="bg-white border border-slate-200 rounded-[28px] overflow-hidden shadow-sm">
               <div className="p-8 border-b border-slate-50">
                  <h3 className="font-black text-lg text-slate-900 tracking-tight">Active Request Status</h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Real-time Fulfillment Tracking</p>
               </div>
               <div className="divide-y divide-slate-100">
                  {[
                    { id: 'ORD-921', item: 'Thai Fragrant Rice 5kg', qty: 240, status: 'In Transit', date: 'Today' },
                    { id: 'ORD-920', item: 'Cooking Oil Premium 2L', qty: 150, status: 'Confirmed', date: 'Yesterday' },
                  ].map((order) => (
                    <div key={order.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-all">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-[#ff6900]">
                            <Truck className="w-5 h-5" />
                         </div>
                         <div>
                            <p className="font-bold text-slate-900 text-sm">{order.item}</p>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{order.id} • {order.qty} Units</p>
                         </div>
                      </div>
                      <div className="text-right">
                         <span className={`px-2.5 py-1 rounded-[6px] font-black text-[9px] uppercase tracking-widest ${
                            order.status === 'In Transit' ? 'bg-orange-50 text-[#ff6900] border border-orange-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                         }`}>
                           {order.status}
                         </span>
                         <p className="text-[9px] text-slate-400 font-bold mt-1.5 uppercase italic">{order.date}</p>
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#1b1b1e] rounded-[28px] p-8 text-white shadow-xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 -translate-x-8 -translate-y-8 rounded-full blur-2xl group-hover:bg-[#ff6900]/10 transition-all duration-700"></div>
               <Store className="w-8 h-8 text-[#ff6900] mb-6" />
               <h3 className="font-black text-xl tracking-tight mb-2">Shop Profile</h3>
               <p className="text-white/40 text-xs font-medium leading-relaxed mb-6 italic">Shop #493 is currently assigned to the Bedok Regional Logistics Hub for all restock request fulfillments.</p>
               <div className="space-y-4 pt-6 border-t border-white/5">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase text-white/30 tracking-widest">Linked Hub</span>
                    <span className="text-xs font-bold font-mono">BEDOK-HQ-7</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase text-white/30 tracking-widest">Active Tickets</span>
                    <span className="text-xs font-bold text-[#ff6900]">2 Active</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      ) : (
        /* Hub Portal View (Hub Management Perspective) - Aggregates Requests from all Shops */
        <div className="grid grid-cols-1 xl:grid-cols-[380px_1fr] gap-8 animate-in fade-in duration-500">
          
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-[28px] p-8 shadow-sm">
              <h3 className="font-black text-[10px] uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                <MapIcon className="w-3.5 h-3.5" />
                Regional Supply Network
              </h3>
              
              <div className="relative aspect-square bg-slate-50 border border-slate-100 rounded-[24px] overflow-hidden p-6 grid grid-cols-2 gap-4">
                {[
                   { id: 'North', count: 12 },
                   { id: 'East', count: 8 },
                   { id: 'West', count: 18 },
                   { id: 'Central', count: 24 }
                ].map(zone => (
                  <button
                    key={zone.id}
                    onClick={() => setSelectedZone(selectedZone === zone.id ? null : zone.id)}
                    className={`relative p-4 rounded-[20px] transition-all flex flex-col items-center justify-center gap-1 border-2 ${
                      selectedZone === zone.id 
                        ? 'bg-[#ff6900]/10 border-[#ff6900] shadow-sm' 
                        : 'bg-white border-transparent hover:border-slate-200 shadow-sm'
                    }`}
                  >
                    <p className={`text-[10px] font-black uppercase tracking-wider ${selectedZone === zone.id ? 'text-[#ff6900]' : 'text-slate-300'}`}>
                      {zone.id}
                    </p>
                    <p className="text-2xl font-black text-slate-900">{zone.count}</p>
                    <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest leading-none">Registered Stores</p>
                  </button>
                ))}
                
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#ff6900] rounded-full border-2 border-white z-20 shadow-[0_0_20px_rgba(255,105,0,0.5)]"></div>
              </div>

              {/* PDF Manifest Moved Here - Only accessible to Hub Manager */}
              <button 
                onClick={handleDownloadManifest}
                disabled={isDownloading}
                className="w-full mt-8 h-12 bg-slate-900 text-white rounded-[14px] font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95 disabled:opacity-50"
              >
                {isDownloading ? (
                  'Syncing Data...'
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    Download PDF Manifest
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-[28px] overflow-hidden shadow-sm">
              <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                <div>
                  <h2 className="font-black text-2xl text-slate-900 tracking-tight leading-none">
                    {selectedZone ? `${selectedZone} Zone Requests` : 'Incoming Hub Orders'}
                  </h2>
                  <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-2 flex items-center gap-1.5 leading-none">
                    <Activity className="w-3 h-3 text-emerald-500" />
                    Centralized Supply Chain Feed
                  </p>
                </div>
                <button
                  onClick={handleBatchApprove}
                  disabled={filteredRequests.every(s => processingStatus[s.id])}
                  className="h-10 px-6 bg-[#ff6900] text-white rounded-[12px] font-black text-[10px] uppercase tracking-widest hover:bg-orange-600 transition-all shadow-md active:scale-95 disabled:opacity-50"
                >
                  Approve All Zone
                </button>
              </div>

              <div className="overflow-hidden">
                <div className="bg-slate-50/50 px-8 py-3 grid grid-cols-[1fr_100px_100px_120px] gap-4">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Origin Shop / Depot</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Zone</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Required</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-right pr-2">Action</p>
                </div>

                <div className="divide-y divide-slate-100">
                  {filteredRequests.map((shop) => (
                    <div key={shop.id} className="px-8 py-5 hover:bg-slate-50/50 transition-all group grid grid-cols-[1fr_100px_100px_120px] gap-4 items-center">
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-[#ff6900] shadow-sm flex-shrink-0 group-hover:bg-orange-50 transition-colors">
                          <Truck className="w-5 h-5 opacity-70" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-slate-900 text-sm truncate">{shop.shop}</p>
                          <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest font-mono italic">{shop.id} • {shop.time}</span>
                        </div>
                      </div>

                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                           <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                           <p className="font-black text-[13px] text-slate-900">{shop.zone}</p>
                        </div>
                        <p className="text-[9px] font-black uppercase text-slate-300 tracking-widest">Sector</p>
                      </div>

                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                           <Plus className="w-3 h-3 text-[#ff6900]" />
                           <p className="font-black text-[13px] text-slate-900">{shop.units}</p>
                        </div>
                        <p className="text-[9px] font-black uppercase text-slate-300 tracking-widest">Units</p>
                      </div>

                      <div className="flex justify-end pr-1">
                        <button
                          onClick={() => handleAction(shop.id)}
                          disabled={!!processingStatus[shop.id]}
                          className={`h-9 w-full rounded-[10px] font-black text-[9px] uppercase tracking-widest transition-all shadow-sm flex items-center justify-center gap-1.5 ${
                            processingStatus[shop.id] === 'done'
                              ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                              : processingStatus[shop.id] === 'loading'
                              ? 'bg-slate-50 text-slate-300 cursor-wait'
                              : 'bg-white border border-slate-200 text-slate-900 hover:border-[#ff6900] hover:text-[#ff6900]'
                          }`}
                        >
                          {processingStatus[shop.id] === 'done' ? (
                            <CheckCircle2 className="w-4 h-4" />
                          ) : (
                            <>
                              {processingStatus[shop.id] === 'loading' ? '...' : 'Fulfill'}
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
