import { Outlet, useNavigate, useLocation } from 'react-router';
import { Home, DollarSign, TrendingUp, Truck, ShoppingCart, LayoutDashboard } from 'lucide-react';
import svgPaths from '../../imports/svg-kqu6c8wr23';
import imgImageValu from 'figma:asset/dd263ea74eea751edbe19c75046ad4c686cd593c.png';

export default function NewAdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname.includes(path);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#f9f4ea]">
      {/* Sidebar */}
      <div className="w-[255px] bg-white border-r border-[rgba(59,58,159,0.12)] flex flex-col h-screen flex-shrink-0">
        {/* Header */}
        <div className="bg-[#ff6900] h-[73px] flex items-center px-6 border-b border-[#e5e7eb]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#f26522] rounded-lg flex items-center justify-center">
              <div className="w-10 h-8 rounded-lg overflow-hidden">
                <img src={imgImageValu} alt="Valu$" className="w-full h-full object-cover" />
              </div>
            </div>
            <p className="font-bold text-white text-base">Valu$ Wholesale</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto p-3 pt-[18px]">
          <div className="flex flex-col gap-1">
            {/* Dashboard */}
            <div
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg cursor-pointer transition-all ${
                location.pathname === '/admin' || location.pathname === '/admin/dashboard'
                  ? 'bg-[#fff7ed] text-[#ca3500]'
                  : 'text-[#4a5565] hover:bg-gray-50'
              }`}
              onClick={() => navigate('/admin/dashboard')}
            >
              <LayoutDashboard className="w-5 h-5" />
              <p className="font-semibold text-base">Dashboard</p>
            </div>

            {/* Catalog */}
            <div
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg cursor-pointer transition-all ${
                isActive('/admin/catalog') && !isActive('/admin/catalog/pricing') && !isActive('/admin/catalog/forecasting')
                  ? 'bg-[#fff7ed] text-[#ca3500]'
                  : 'text-[#4a5565] hover:bg-gray-50'
              }`}
              onClick={() => navigate('/admin/catalog')}
            >
              <Home className="w-5 h-5" />
              <p className="font-semibold text-base">Catalog</p>
            </div>

            {/* Pricing Configuration */}
            <div
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg cursor-pointer transition-all ${
                isActive('/admin/catalog/pricing')
                  ? 'bg-[#fff7ed] text-[#ca3500]'
                  : 'text-[#4a5565] hover:bg-gray-50'
              }`}
              onClick={() => navigate('/admin/catalog/pricing')}
            >
              <DollarSign className="w-5 h-5" />
              <p className="font-semibold text-base">Pricing Configuration</p>
            </div>

            {/* AI Forecasting */}
            <div
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg cursor-pointer transition-all ${
                isActive('/admin/catalog/forecasting')
                  ? 'bg-[#fff7ed] text-[#ca3500]'
                  : 'text-[#4a5565] hover:bg-gray-50'
              }`}
              onClick={() => navigate('/admin/catalog/forecasting')}
            >
              <TrendingUp className="w-5 h-5" />
              <p className="font-semibold text-base">AI Forecasting</p>
            </div>

            {/* Logistics Center */}
            <div
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg cursor-pointer transition-all ${
                isActive('/admin/logistics')
                  ? 'bg-[#fff7ed] text-[#ca3500]'
                  : 'text-[#4a5565] hover:bg-gray-50'
              }`}
              onClick={() => navigate('/admin/logistics/hub-collections')}
            >
              <Truck className="w-5 h-5" />
              <p className="font-semibold text-base">Logistics Center</p>
            </div>

            {/* Shop Orders */}
            <div
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg cursor-pointer transition-all ${
                isActive('/admin/orders')
                  ? 'bg-[#fff7ed] text-[#ca3500]'
                  : 'text-[#4a5565] hover:bg-gray-50'
              }`}
              onClick={() => navigate('/admin/orders')}
            >
              <ShoppingCart className="w-5 h-5" />
              <p className="font-semibold text-base">Shop Orders</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[#e5e7eb] p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-[#f3f4f6] flex items-center justify-center">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 32 32">
                <g clipPath="url(#clip0)">
                  <path d={svgPaths.p24aaca80} fill="#D1D5DC" />
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect fill="white" height="32" width="32" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div>
              <p className="font-medium text-sm text-[#364153]">Valu$ 6767</p>
              <p className="font-medium text-xs text-[#155dfc]">Trade Prime</p>
            </div>
          </div>
          <div
            className="flex items-center gap-2 cursor-pointer hover:opacity-70"
            onClick={() => navigate('/admin/login')}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20">
              <path
                d="M7.5 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H7.5"
                stroke="#99A1AF"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.66667"
              />
              <path
                d="M13.3333 14.1667L17.5 10L13.3333 5.83334"
                stroke="#99A1AF"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.66667"
              />
              <path
                d="M17.5 10H7.5"
                stroke="#99A1AF"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.66667"
              />
            </svg>
            <p className="font-medium text-sm text-[#4a5565]">Sign Out</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}