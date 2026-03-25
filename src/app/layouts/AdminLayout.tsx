import { Outlet, useNavigate, useLocation } from 'react-router';
import { LayoutDashboard, Package, MapPin, LogOut } from 'lucide-react';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname.includes(path);
  };

  const navItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/orders', label: 'Order Management', icon: Package },
    { path: '/admin/pickup-scheduling', label: 'Pickup Scheduling', icon: MapPin },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Sidebar - Fixed height, no scroll */}
      <div className="w-[280px] bg-white border-r-2 border-gray-100 text-gray-900 flex flex-col h-screen flex-shrink-0 shadow-sm">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#ff6900] to-[#ff8534] h-[72px] flex items-center px-6 flex-shrink-0 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
              <p className="font-bold text-white text-xl">V$</p>
            </div>
            <p className="font-bold text-white text-lg">Valu$ Admin</p>
          </div>
        </div>

        {/* Navigation - Scrollable middle section */}
        <div className="flex-1 overflow-y-auto p-4 pt-6">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <div
                  key={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${
                    active
                      ? 'bg-gradient-to-r from-[#ff6900] to-[#ff8534] text-white shadow-lg shadow-orange-500/20'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                  onClick={() => navigate(item.path)}
                >
                  <Icon className="w-5 h-5" />
                  <p className="font-semibold text-sm">{item.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer - Sticky to bottom */}
        <div className="border-t-2 border-gray-100 p-6 flex-shrink-0 bg-gradient-to-br from-gray-50 to-white">
          <div className="mb-4">
            <p className="font-bold text-sm text-gray-900">Admin User</p>
            <p className="text-xs text-gray-600">Operations Manager</p>
          </div>
          <div
            className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors text-gray-700 hover:text-gray-900"
            onClick={() => navigate('/admin/login')}
          >
            <LogOut className="w-5 h-5" />
            <p className="font-semibold text-sm">Sign Out</p>
          </div>
        </div>
      </div>

      {/* Main Content - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}