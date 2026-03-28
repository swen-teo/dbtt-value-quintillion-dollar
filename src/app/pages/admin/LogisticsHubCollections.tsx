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
    <div className="min-h-screen bg-[#f9f4ea] p-8 space-y-8 font-sans">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-[#ff6900] mb-2">
            <Navigation className="w-5 h-5" />
            <span className="text-xs font-black uppercase tracking-[0.2em]">Logistics Command Center</span>
          </div>
          <h1 className="text-4xl font-extrabold text-[#1b2a4a] tracking-tight">
            Supply Chain Orchestration
          </h1>
          <p className="text-[#6b7280] mt-1 font-medium italic">
            {isHubManager 
              ? 'Multi-zone fulfillment & high-capacity hub operations interface.' 
              : 'Local inventory replenishment & heartland outlet restock portal.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
           <div className="bg-white border-2 border-slate-100 rounded-2xl px-4 py-3 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-[#ff6900]">
                {isHubManager ? <Warehouse className="w-5 h-5" /> : <Store className="w-5 h-5" />}
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider leading-none">Access Level</p>
                <p className="text-sm font-bold text-slate-900 mt-1">
                  {isHubManager ? 'Warehouse Hub Manager' : 'Heartland Outlet Manager'}
                </p>
              </div>
           </div>
        </div>
      </div>

      {/* Main Tab Control */}
      <div className="flex bg-white/50 p-1.5 rounded-[20px] border border-gray-200 w-fit backdrop-blur-sm">
        <button
          onClick={() => setActiveTab('request')}
          className={`flex items-center gap-3 px-8 h-12 rounded-[16px] font-bold text-sm tracking-wide transition-all ${
            activeTab === 'request' 
              ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/20' 
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Plus className="w-4 h-4" />
          Request Restock
        </button>
        
        {isHubManager && (
          <button
            onClick={() => setActiveTab('hub')}
            className={`flex items-center gap-3 px-8 h-12 rounded-[16px] font-bold text-sm tracking-wide transition-all ${
              activeTab === 'hub' 
                ? 'bg-gradient-to-r from-[#ff6900] to-[#ff8534] text-white shadow-xl shadow-orange-500/20' 
                : 'text-slate-500 hover:text-orange-600'
            }`}
          >
            <Navigation className="w-4 h-4" />
            Hub Portal
          </button>
        )}
      </div>

      {activeTab === 'request' ? (
        /* Request Restock View - Clean Premium Redesign */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-[#1b2a4a]">Post New Request</h2>
                  <p className="text-gray-400 text-sm font-medium">Daily inventory replenishment order</p>
                </div>
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
                  <Activity className="w-6 h-6" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Fulfillment Hub</label>
                  <select 
                    value={requestForm.hub}
                    onChange={(e) => setRequestForm({...requestForm, hub: e.target.value})}
                    className="w-full h-14 px-4 bg-slate-50 border-2 border-transparent rounded-2xl font-bold text-slate-900 focus:border-[#ff6900] focus:bg-white outline-none transition-all appearance-none"
                  >
                    <option>Bedok Central Hub (East)</option>
                    <option>Jurong West Hub (West)</option>
                    <option>Woodlands Central (North)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">SKU Search</label>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      placeholder="Product name..."
                      className="w-full h-14 pl-12 pr-4 bg-slate-50 border-2 border-transparent rounded-2xl font-bold text-slate-900 focus:border-[#ff6900] focus:bg-white outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Unit Quantity</label>
                  <input 
                    type="number"
                    placeholder="e.g. 500"
                    className="w-full h-14 px-4 bg-slate-50 border-2 border-transparent rounded-2xl font-bold text-slate-900 focus:border-[#ff6900] focus:bg-white outline-none transition-all"
                  />
                </div>
                <div className="flex items-end">
                  <button className="w-full h-14 bg-[#1b2a4a] text-white rounded-2xl font-bold hover:shadow-2xl hover:shadow-slate-900/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 uppercase tracking-widest text-xs">
                    Dispatch Request
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Tracking List */}
            <div className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-gray-100">
               <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-[#1b2a4a]">Fulfillment Stream</h3>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Active Restock Tickets</p>
                  </div>
               </div>
               <div className="divide-y divide-slate-50">
                  {[
                    { id: 'ORD-921', item: 'Thai Fragrant Rice 5kg', qty: 240, status: 'In Transit', date: 'Today' },
                    { id: 'ORD-920', item: 'Cooking Oil Premium 2L', qty: 150, status: 'Confirmed', date: 'Yesterday' },
                  ].map((order) => (
                    <div key={order.id} className="p-8 flex items-center justify-between hover:bg-slate-50/50 transition-all group">
                      <div className="flex items-center gap-5">
                         <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center text-[#ff6900] group-hover:scale-110 transition-transform">
                            <Truck className="w-7 h-7" />
                         </div>
                         <div>
                            <p className="font-bold text-[#1b2a4a] text-lg leading-tight">{order.item}</p>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{order.id} • {order.qty} Units</p>
                         </div>
                      </div>
                      <div className="text-right">
                         <span className={`px-4 py-1.5 rounded-full font-bold text-[10px] uppercase tracking-wide border-2 ${
                            order.status === 'In Transit' ? 'bg-orange-50 text-[#ff6900] border-orange-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                         }`}>
                           {order.status}
                         </span>
                         <div className="flex items-center justify-end gap-1.5 mt-2 text-slate-400">
                           <Clock className="w-3 h-3" />
                           <p className="text-[10px] font-bold uppercase">{order.date}</p>
                         </div>
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          {/* User Profile Bar - Integrated Styled */}
          <div className="space-y-6">
            <div className="bg-[#1b2a4a] rounded-[32px] p-8 text-white shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl -mr-24 -mt-24"></div>
               <Store className="w-10 h-10 text-[#ff6900] mb-8" />
               <h3 className="text-2xl font-bold tracking-tight mb-2">Outlet Identity</h3>
               <p className="text-blue-200/60 text-sm font-medium leading-relaxed mb-8 italic">SHOP-493 (Bedok South Heartland) is currently synchronized with HQ logistics.</p>
               
               <div className="space-y-5 pt-8 border-t border-white/10">
                  <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl">
                    <span className="text-[10px] font-black uppercase text-blue-200/40 tracking-widest">Active Hub Connection</span>
                    <span className="text-xs font-bold font-mono tracking-tighter">B-HQ-7</span>
                  </div>
                  <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl">
                    <span className="text-[10px] font-black uppercase text-blue-200/40 tracking-widest">Zone Placement</span>
                    <span className="text-xs font-bold text-orange-400">EAST-04</span>
                  </div>
               </div>
            </div>

            <button 
              onClick={() => navigate('/admin/dashboard')}
              className="w-full bg-white border-2 border-slate-100 p-6 rounded-[32px] font-bold text-slate-900 hover:border-orange-500 hover:shadow-xl transition-all flex items-center justify-center gap-3 shadow-sm"
            >
              <LayoutDashboard className="w-5 h-5 text-slate-400" />
              Return to Dashboard
            </button>
          </div>
        </div>
      ) : (
        /* Hub Portal View - Premium Orchestration UI */
        <div className="grid grid-cols-1 xl:grid-cols-[420px_1fr] gap-8 animate-in fade-in slide-in-from-right-4 duration-700">
          
          <div className="space-y-6">
            <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-[#ff6900]">
                  <MapIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1b2a4a]">Network Topology</h3>
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Regional Zone Filtering</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                   { id: 'North', count: 12, bg: 'bg-emerald-50 text-emerald-600' },
                   { id: 'East', count: 8, bg: 'bg-orange-50 text-[#ff6900]' },
                   { id: 'West', count: 18, bg: 'bg-blue-50 text-blue-600' },
                   { id: 'Central', count: 24, bg: 'bg-purple-50 text-purple-600' }
                ].map(zone => (
                  <button
                    key={zone.id}
                    onClick={() => setSelectedZone(selectedZone === zone.id ? null : zone.id)}
                    className={`relative p-6 rounded-[24px] transition-all flex flex-col items-center justify-center gap-1 border-2 h-36 ${
                      selectedZone === zone.id 
                        ? `bg-slate-900 border-slate-900 text-white shadow-2xl shadow-slate-900/40 scale-105 z-10` 
                        : 'bg-white border-slate-50 hover:border-slate-200'
                    }`}
                  >
                    <p className={`text-[10px] font-black uppercase tracking-[0.2em] mb-2 ${selectedZone === zone.id ? 'text-blue-300' : 'text-slate-300'}`}>
                      {zone.id}
                    </p>
                    <p className={`text-4xl font-extrabold ${selectedZone === zone.id ? 'text-white' : 'text-slate-900'}`}>{zone.count}</p>
                    <p className={`text-[8px] font-bold uppercase tracking-widest mt-2 ${selectedZone === zone.id ? 'text-white/40' : 'text-slate-400'}`}>Connected Stores</p>
                  </button>
                ))}
              </div>

              <button 
                onClick={handleDownloadManifest}
                disabled={isDownloading}
                className="w-full mt-8 h-16 bg-[#1b2a4a] text-white rounded-2xl font-bold hover:shadow-2xl hover:shadow-slate-900/20 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs disabled:opacity-50 group"
              >
                {isDownloading ? (
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
                    Download Dispatch Manifest
                  </>
                )}
              </button>
            </div>

            <div className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-[32px] p-8 text-white shadow-xl relative overflow-hidden group">
               <ShieldCheck className="w-10 h-10 mb-6 group-hover:rotate-12 transition-transform" />
               <h3 className="text-xl font-bold mb-2 tracking-tight">System Integrity</h3>
               <p className="text-white/70 text-sm leading-relaxed mb-6 font-medium">Auto-fulfillment mode is active. Orders are queued for logistics review based on zone density.</p>
               <div className="flex items-center gap-2 px-4 py-2 bg-black/10 rounded-xl w-fit border border-white/10">
                 <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                 <span className="text-[10px] font-black uppercase tracking-widest">HQ Real-Time Active</span>
               </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-gray-100">
              <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gradient-to-r from-white to-slate-50">
                <div>
                  <h2 className="text-2xl font-bold text-[#1b2a4a] tracking-tight">
                    {selectedZone ? `${selectedZone} Zone Orchestration` : 'Aggregated Demand Stream'}
                  </h2>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 rounded-lg border border-emerald-100">
                      <Activity className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">Synchronized Feed</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleBatchApprove}
                  disabled={filteredRequests.every(s => processingStatus[s.id])}
                  className="h-14 px-8 bg-[#ff6900] text-white rounded-2xl font-bold hover:shadow-xl hover:shadow-orange-500/20 transition-all active:scale-[0.98] disabled:opacity-50 uppercase tracking-widest text-xs"
                >
                  Bulk Approve Zone
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-100">
                      <th className="px-8 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Origin Outlet</th>
                      <th className="px-8 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Sector</th>
                      <th className="px-8 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Replenish</th>
                      <th className="px-8 py-4 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredRequests.map((shop) => (
                      <tr key={shop.id} className="hover:bg-slate-50/50 transition-all group">
                        <td className="px-8 py-6">
                           <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-[#ff6900] shadow-sm flex-shrink-0 group-hover:scale-110 transition-transform">
                                <Truck className="w-6 h-6" />
                              </div>
                              <div>
                                <p className="font-bold text-slate-900 text-base">{shop.shop}</p>
                                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest font-mono italic">{shop.id} • {shop.time}</span>
                              </div>
                           </div>
                        </td>
                        <td className="px-8 py-6">
                           <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-lg border border-slate-100">
                              <span className="w-2 h-2 rounded-full bg-[#ff6900]"></span>
                              <p className="font-bold text-slate-900 text-sm">{shop.zone}</p>
                           </div>
                        </td>
                        <td className="px-8 py-6">
                           <p className="font-extrabold text-slate-900 text-lg">+{shop.units}</p>
                           <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Units</p>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <button
                            onClick={() => handleAction(shop.id)}
                            disabled={!!processingStatus[shop.id]}
                            className={`h-11 px-6 rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-sm inline-flex items-center gap-2 ${
                              processingStatus[shop.id] === 'done'
                                ? 'bg-emerald-50 text-emerald-600 border-2 border-emerald-100 overflow-hidden'
                                : processingStatus[shop.id] === 'loading'
                                ? 'bg-slate-100 text-slate-400 cursor-wait'
                                : 'bg-white border-2 border-slate-100 text-[#1b2a4a] hover:border-[#ff6900] hover:text-[#ff6900]'
                            }`}
                          >
                            {processingStatus[shop.id] === 'done' ? (
                              <>
                                <CheckCircle2 className="w-4 h-4" />
                                Done
                              </>
                            ) : (
                              <>
                                {processingStatus[shop.id] === 'loading' ? 'Syncing' : 'Fulfill'}
                                <ArrowRight className="w-4 h-4" />
                              </>
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
