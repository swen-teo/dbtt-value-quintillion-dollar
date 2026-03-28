import { useState, useEffect } from 'react';
import { 
  Truck, 
  Package, 
  Map as MapIcon, 
  Activity, 
  ArrowRight, 
  CheckCircle2, 
  Warehouse,
  Navigation,
  Plus,
  ShieldCheck,
  Download,
  Search,
  Store,
  Clock,
  LayoutDashboard
} from 'lucide-react';
import { useNavigate } from 'react-router';

export default function LogisticsHubCollections() {
  const navigate = useNavigate();
  // Get admin role from sessionStorage (set during login)
  const adminRole = sessionStorage.getItem('adminRole') || 'heartland_outlet_manager';
  
  // RBAC states
  const isHubManager = adminRole === 'warehouse_hub_manager';
  
  const [activeTab, setActiveTab] = useState<'request' | 'hub'>(isHubManager ? 'hub' : 'request');
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [processingStatus, setProcessingStatus] = useState<Record<string, string>>({});
  const [isDownloading, setIsDownloading] = useState(false);

  // New Request Form State
  const [requestForm, setRequestForm] = useState({
    hub: 'Bedok Central Hub',
    item: '',
    quantity: ''
  });

  const incomingRequests = [
    { id: 'REQ-101', shop: 'Mama Shop #493', zone: 'East', priority: 'high', units: 450, time: '2h ago' },
    { id: 'REQ-102', shop: 'Jurong Gateway', zone: 'West', priority: 'medium', units: 220, time: '4h ago' },
    { id: 'REQ-103', shop: 'AMK Central', zone: 'North', priority: 'high', units: 580, time: '5h ago' },
    { id: 'REQ-104', shop: 'Tampines Hub', zone: 'East', priority: 'low', units: 120, time: '6h ago' },
    { id: 'REQ-105', shop: 'Woodlands Mart', zone: 'North', priority: 'medium', units: 310, time: '8h ago' },
    { id: 'REQ-106', shop: 'Clementi Mall #02', zone: 'West', priority: 'high', units: 440, time: '9h ago' },
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
    <div className="h-full flex flex-col bg-[#faf9f6]/95 overflow-hidden p-4 gap-3">
      {/* Page Header (Ultra Compact) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 px-2">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-[#ff6900] mb-0.5">
            <Navigation className="w-3.5 h-3.5" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em] leading-none">Logistics Center</span>
          </div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight leading-none uppercase">
            Supply Chain Orchestration
          </h1>
        </div>

        <div className="flex items-center gap-2 bg-white px-2.5 h-8 rounded-[11px] border border-slate-200 shadow-sm">
           <div className="flex items-center gap-1.5 pr-2.5 border-r border-slate-100">
              {isHubManager ? <Warehouse className="w-3.5 h-3.5 text-slate-400" /> : <Store className="w-3.5 h-3.5 text-slate-400" />}
              <span className="text-[8px] font-black uppercase tracking-widest leading-none text-slate-400">Access:</span>
           </div>
           <p className="text-[8px] font-black uppercase tracking-widest text-[#1b2a4a] leading-none">
              {isHubManager ? 'Hub Manager' : 'Outlet Manager'}
           </p>
        </div>
      </div>

      {/* Main Tab Switcher (Compact h-8) */}
      <div className="flex bg-white/50 p-1 rounded-[12px] border border-gray-200 w-fit backdrop-blur-sm ml-2">
        <button
          onClick={() => setActiveTab('request')}
          className={`flex items-center gap-2 px-5 h-7 rounded-[8px] font-black text-[9px] uppercase tracking-widest transition-all ${
            activeTab === 'request' 
              ? 'bg-slate-900 text-white' 
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Plus className="w-3.5 h-3.5" />
          Request Restock
        </button>
        
        {isHubManager && (
          <button
            onClick={() => setActiveTab('hub')}
            className={`flex items-center gap-2 px-5 h-7 rounded-[8px] font-black text-[9px] uppercase tracking-widest transition-all ${
              activeTab === 'hub' 
                ? 'bg-[#ff6900] text-white' 
                : 'text-slate-400 hover:text-[#ff6900]'
            }`}
          >
            <Navigation className="w-3.5 h-3.5" />
            Hub Portal
          </button>
        )}
      </div>

      {activeTab === 'request' ? (
        /* Request Restock View (Shop Perspective) - 'Ultra Fit' */
        <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-3 animate-in fade-in duration-300">
          <div className="flex flex-col gap-3 min-h-0">
            <div className="bg-white rounded-[18px] p-4 shadow-sm border border-slate-200/60 flex-shrink-0">
              <div className="mb-4">
                <h2 className="text-base font-black text-[#1b2a4a] tracking-tight uppercase leading-none">Post New Request</h2>
                <p className="text-slate-400 text-[8px] font-black uppercase tracking-widest mt-1.5 leading-none">Inventory Replenishment Order</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[8px] font-black uppercase text-slate-400 tracking-widest ml-0.5 opacity-60">Fulfillment Hub</label>
                  <select 
                    value={requestForm.hub}
                    onChange={(e) => setRequestForm({...requestForm, hub: e.target.value})}
                    className="w-full h-8 px-2.5 bg-slate-50 border border-slate-200 rounded-[8px] font-bold text-xs outline-none transition-all"
                  >
                    <option>Bedok Hub (E)</option>
                    <option>Jurong Hub (W)</option>
                    <option>Woodlands (N)</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[8px] font-black uppercase text-slate-400 tracking-widest ml-0.5 opacity-60">SKU Search</label>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input 
                      placeholder="Product..."
                      className="w-full h-8 pl-8 pr-2.5 bg-slate-50 border border-slate-200 rounded-[8px] font-bold text-xs outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[8px] font-black uppercase text-slate-400 tracking-widest ml-0.5 opacity-60">Units</label>
                  <input 
                    type="number"
                    placeholder="Qty"
                    className="w-full h-8 px-2.5 bg-slate-50 border border-slate-200 rounded-[8px] font-bold text-xs outline-none transition-all"
                  />
                </div>
                <div className="flex items-end">
                  <button className="w-full h-8 bg-slate-900 text-white rounded-[8px] font-black text-[9px] uppercase tracking-widest hover:bg-slate-800 transition-all shadow-sm flex items-center justify-center gap-1.5">
                    Submit
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Fulfillment Stream (Internal Scroll) */}
            <div className="flex-1 overflow-hidden bg-white rounded-[18px] shadow-sm border border-slate-200/60 flex flex-col">
               <div className="px-5 py-3 border-b border-slate-50 flex-shrink-0">
                  <h3 className="text-sm font-black text-[#1b2a4a] tracking-tight leading-none uppercase">Fulfillment Stream</h3>
               </div>
               <div className="flex-1 overflow-y-auto divide-y divide-slate-50 custom-scrollbar">
                  {[
                    { id: 'ORD-921', item: 'Thai Fragrant Rice 5kg', qty: 240, status: 'In Transit', date: 'Today' },
                    { id: 'ORD-920', item: 'Cooking Oil Premium 2L', qty: 150, status: 'Confirmed', date: 'Yesterday' },
                    { id: 'ORD-919', item: 'Omega 6 Eggs 30s', qty: 100, status: 'Completed', date: '2d ago' },
                    { id: 'ORD-918', item: 'Canned Sardines 425g', qty: 300, status: 'Completed', date: '3d ago' },
                  ].map((order) => (
                    <div key={order.id} className="p-3 px-5 flex items-center justify-between hover:bg-slate-50/50 transition-all group">
                       <div className="flex items-center gap-3 min-w-0">
                          <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-[#ff6900] flex-shrink-0 group-hover:bg-white transition-colors">
                             <Truck className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                             <p className="font-bold text-[#1b2a4a] text-xs leading-none truncate">{order.item}</p>
                             <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1 leading-none">{order.id} • {order.qty} Units</p>
                          </div>
                       </div>
                       <div className="text-right flex-shrink-0">
                          <span className={`px-2 py-0.5 rounded-[5px] font-black text-[8px] uppercase tracking-widest border ${
                             order.status === 'In Transit' ? 'bg-orange-50 text-[#ff6900] border-orange-100' : 
                             order.status === 'Completed' ? 'bg-slate-50 text-slate-300 border-slate-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                          }`}>
                            {order.status}
                          </span>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          {/* Outlet Identity (Right Bar) */}
          <div className="flex flex-col gap-3 min-h-0 overflow-hidden">
            <div className="flex-1 bg-[#1b2a4a] rounded-[18px] p-5 text-white shadow-lg relative overflow-hidden flex flex-col">
               <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl -mr-12 -mt-12"></div>
               <Store className="w-6 h-6 text-[#ff6900] mb-5 flex-shrink-0" />
               <h3 className="text-base font-black tracking-tight mb-1 leading-none uppercase">Outlet ID</h3>
               <p className="text-blue-200/40 text-[9px] font-bold leading-relaxed mb-6 uppercase tracking-wider">Bedok South Heartland #493</p>
               
               <div className="mt-auto space-y-2.5 pt-4 border-t border-white/10 flex-shrink-0">
                  <div className="flex justify-between items-center bg-white/5 p-2 px-2.5 rounded-lg border border-white/5">
                    <span className="text-[7px] font-black uppercase text-blue-200/30 tracking-widest">Hub</span>
                    <span className="text-[9px] font-bold font-mono text-white">B-HQ-7</span>
                  </div>
                  <div className="flex justify-between items-center bg-white/5 p-2 px-2.5 rounded-lg border border-white/5">
                    <span className="text-[7px] font-black uppercase text-blue-200/30 tracking-widest">Zone</span>
                    <span className="text-[9px] font-bold text-orange-400">EAST-04</span>
                  </div>
               </div>
            </div>

            <button 
              onClick={() => navigate('/admin/dashboard')}
              className="w-full bg-white border border-slate-200 h-8 rounded-[10px] font-black text-[8px] uppercase tracking-widest text-slate-400 hover:border-[#ff6900] hover:text-[#ff6900] hover:shadow-sm transition-all flex items-center justify-center gap-1.5 flex-shrink-0"
            >
              <LayoutDashboard className="w-3 h-3" />
              HQ Dashboard
            </button>
          </div>
        </div>
      ) : (
        /* Hub Portal View (Management Perspective) - 'Ultra Fit' */
        <div className="flex-1 overflow-hidden grid grid-cols-1 xl:grid-cols-[280px_1fr] gap-3 animate-in fade-in duration-300">
          
          <div className="flex flex-col gap-3 min-h-0 overflow-hidden">
            <div className="flex-1 bg-white rounded-[18px] p-5 border border-slate-200/60 shadow-sm flex flex-col">
              <div className="flex items-center gap-2.5 mb-5 flex-shrink-0">
                <div className="w-7 h-7 bg-orange-50 rounded-lg flex items-center justify-center text-[#ff6900]">
                  <MapIcon className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 leading-none text-xs uppercase tracking-tight">Topology</h3>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2.5 flex-1 content-start overflow-hidden">
                {[
                   { id: 'North', count: 12 },
                   { id: 'East', count: 8 },
                   { id: 'West', count: 18 },
                   { id: 'Central', count: 24 }
                ].map(zone => (
                  <button
                    key={zone.id}
                    onClick={() => setSelectedZone(selectedZone === zone.id ? null : zone.id)}
                    className={`relative p-3 rounded-[15px] transition-all flex flex-col items-center justify-center gap-0 border-2 h-20 ${
                      selectedZone === zone.id 
                        ? `bg-slate-900 border-slate-900 text-white shadow-md z-10` 
                        : 'bg-white border-slate-100 hover:border-slate-200'
                    }`}
                  >
                    <p className={`text-[7px] font-black uppercase tracking-[0.2em] leading-none mb-1.5 ${selectedZone === zone.id ? 'text-blue-300' : 'text-slate-300'}`}>
                      {zone.id}
                    </p>
                    <p className={`text-xl font-black leading-none ${selectedZone === zone.id ? 'text-white' : 'text-slate-900'}`}>{zone.count}</p>
                    <p className={`text-[6px] font-black uppercase tracking-widest mt-1 ${selectedZone === zone.id ? 'text-white/30' : 'text-slate-400'}`}>Stores</p>
                  </button>
                ))}
              </div>

              <div className="mt-5 flex-shrink-0">
                <button 
                  onClick={handleDownloadManifest}
                  disabled={isDownloading}
                  className="w-full h-9 bg-slate-900 text-white rounded-[10px] font-black text-[9px] uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-1.5 shadow-sm disabled:opacity-50 active:scale-95"
                >
                  {isDownloading ? (
                    '...'
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" />
                      Manifest
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-[18px] p-4 text-white shadow-lg relative overflow-hidden flex-shrink-0">
               <ShieldCheck className="w-6 h-6 mb-2.5 opacity-40" />
               <p className="text-[8px] font-black leading-tight uppercase tracking-widest">Logistics Health: Verified</p>
            </div>
          </div>

          <div className="flex-1 bg-white rounded-[18px] overflow-hidden shadow-sm border border-slate-200/60 flex flex-col">
            <div className="p-4 px-6 border-b border-slate-50 flex items-center justify-between flex-shrink-0">
              <div>
                <h2 className="text-base font-black text-[#1b2a4a] tracking-tight leading-none uppercase">
                  {selectedZone ? `${selectedZone} Demand` : 'Global Hub Demand'}
                </h2>
                <div className="flex items-center gap-1 mt-1.5">
                   <Activity className="w-2.5 h-2.5 text-emerald-500" />
                   <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none">Synced Feed</span>
                </div>
              </div>
              <button
                onClick={handleBatchApprove}
                disabled={filteredRequests.every(s => processingStatus[s.id])}
                className="h-8 px-4 bg-[#ff6900] text-white rounded-[10px] font-black text-[9px] uppercase tracking-widest hover:bg-orange-600 transition-all shadow-md active:scale-95 disabled:opacity-50"
              >
                Approve All
              </button>
            </div>

            <div className="flex-1 overflow-hidden flex flex-col">
              <div className="bg-slate-50/80 px-6 py-2 border-b border-slate-100 grid grid-cols-[1fr_80px_80px_100px] gap-3 items-center flex-shrink-0">
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Origin</p>
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Zone</p>
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Units</p>
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest text-right pr-2">Action</p>
              </div>
              
              <div className="flex-1 overflow-y-auto divide-y divide-slate-50 custom-scrollbar">
                {filteredRequests.map((shop) => (
                  <div key={shop.id} className="px-6 py-2 hover:bg-slate-50/50 transition-all group grid grid-cols-[1fr_80px_80px_100px] gap-3 items-center">
                     <div className="flex items-center gap-3 min-w-0">
                        <div className="w-7 h-7 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-[#ff6900] shadow-sm flex-shrink-0 group-hover:bg-orange-50 transition-colors">
                          <Truck className="w-4 h-4 opacity-70" />
                        </div>
                        <p className="font-bold text-slate-900 text-xs truncate leading-none">{shop.shop}</p>
                     </div>
                     
                     <div>
                        <p className="font-black text-slate-900 text-[10px] uppercase leading-none">{shop.zone}</p>
                     </div>

                     <p className="font-black text-slate-900 text-xs leading-none">+{shop.units}</p>

                     <div className="flex justify-end pr-1">
                      <button
                        onClick={() => handleAction(shop.id)}
                        disabled={!!processingStatus[shop.id]}
                        className={`h-7 w-full rounded-[8px] font-black text-[8px] uppercase tracking-widest transition-all shadow-sm flex items-center justify-center gap-1 ${
                          processingStatus[shop.id] === 'done'
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                            : processingStatus[shop.id] === 'loading'
                            ? 'bg-slate-100 text-slate-300 cursor-wait'
                            : 'bg-white border text-slate-900 hover:border-[#ff6900] hover:text-[#ff6900]'
                        }`}
                      >
                        {processingStatus[shop.id] === 'done' ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
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
      )}
    </div>
  );
}
