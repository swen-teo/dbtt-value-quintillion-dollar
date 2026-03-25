import { Outlet, useNavigate, useLocation } from 'react-router';
import { useState, useEffect } from 'react';
import svgPaths from '../../imports/svg-o7bl7wk5vo';
import imgImageValu from 'figma:asset/dd263ea74eea751edbe19c75046ad4c686cd593c.png';

export default function CustomerLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [accountType, setAccountType] = useState(sessionStorage.getItem('accountType') || 'normal');
  const [shopName, setShopName] = useState(sessionStorage.getItem('shopName') || 'New Merchant');

  useEffect(() => {
    const handleAccountChange = () => {
      setAccountType(sessionStorage.getItem('accountType') || 'normal');
      setShopName(sessionStorage.getItem('shopName') || 'New Merchant');
    };
    window.addEventListener('accountTypeChanged', handleAccountChange);
    return () => window.removeEventListener('accountTypeChanged', handleAccountChange);
  }, []);

  const isActive = (path: string) => {
    return location.pathname.includes(path);
  };

  const getLinkClass = (path: string) => {
    return isActive(path)
      ? 'bg-[#fff7ed] h-[36px] relative rounded-[8px] w-full cursor-pointer'
      : 'h-[36px] relative rounded-[8px] w-full cursor-pointer hover:bg-gray-50';
  };

  const getTextClass = (path: string) => {
    return isActive(path)
      ? 'text-[#ca3500]'
      : 'text-[#4a5565]';
  };

  const getStrokeVar = (path: string) => {
    return isActive(path) ? '#F54900' : '#99A1AF';
  };

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {/* Sidebar - Fixed height, no scroll */}
      <div className="w-[256px] bg-white border-r border-[#e5e7eb] flex flex-col h-screen flex-shrink-0">
        {/* Header */}
        <div className="bg-[#ff6900] h-[64px] flex items-center px-4 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="h-[32px] w-[40px] rounded-[8px] bg-white overflow-hidden">
              <img src={imgImageValu} alt="Valu$" className="w-full h-full object-cover" />
            </div>
            <p className="font-bold text-[16px] text-white tracking-[-0.3125px]">Valu$ Wholesale</p>
          </div>
        </div>

        {/* Navigation - Scrollable middle section */}
        <div className="flex-1 overflow-y-auto p-2 pt-4">
          <div className="flex flex-col gap-1">
            {/* Account */}
            <div className={getLinkClass('account')} onClick={() => navigate('/customer/account')}>
              <div className="absolute left-2 top-2 w-5 h-5">
                <svg className="w-full h-full" fill="none" viewBox="0 0 19.9971 19.9971">
                  <g>
                    <path d={svgPaths.p3734cd40} stroke={getStrokeVar('account')} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66642" />
                    <path d={svgPaths.p2c00b840} stroke={getStrokeVar('account')} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66642" />
                  </g>
                </svg>
              </div>
              <p className={`absolute left-10 top-2 font-medium text-[14px] tracking-[-0.15px] ${getTextClass('account')}`}>Account</p>
            </div>

            {/* Shop */}
            <div className={getLinkClass('shop')} onClick={() => navigate('/customer/shop')}>
              <div className="absolute left-2 top-2 w-5 h-5">
                <svg className="w-full h-full" fill="none" viewBox="0 0 19.9971 19.9971">
                  <g clipPath="url(#clip0_2_460)">
                    <path d={svgPaths.p27d6f4e0} stroke={getStrokeVar('shop')} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66642" />
                    <path d={svgPaths.p38a3ff00} stroke={getStrokeVar('shop')} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66642" />
                    <path d={svgPaths.p3d3922b0} stroke={getStrokeVar('shop')} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66642" />
                    <path d="M1.66642 5.83248H18.3306" stroke={getStrokeVar('shop')} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66642" />
                    <path d={svgPaths.p1b59d880} stroke={getStrokeVar('shop')} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66642" />
                  </g>
                </svg>
              </div>
              <p className={`absolute left-10 top-2 font-medium text-[14px] tracking-[-0.15px] ${getTextClass('shop')}`}>Shop</p>
            </div>

            {/* Quick Order */}
            <div className={getLinkClass('quick-order')} onClick={() => navigate('/customer/quick-order')}>
              <div className="absolute left-2 top-2 w-5 h-5">
                <svg className="w-full h-full" fill="none" viewBox="0 0 19.9971 19.9971">
                  <g clipPath="url(#clip0_2_439)">
                    <path d={svgPaths.p6f6a800} stroke={getStrokeVar('quick-order')} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66642" />
                  </g>
                </svg>
              </div>
              <p className={`absolute left-10 top-2 font-medium text-[14px] tracking-[-0.15px] ${getTextClass('quick-order')}`}>Quick Order</p>
            </div>

            {/* Cart */}
            <div className={getLinkClass('cart')} onClick={() => navigate('/customer/cart')}>
              <div className="absolute left-2 top-2 w-5 h-5">
                <svg className="w-full h-full" fill="none" viewBox="0 0 19.9971 19.9971">
                  <g clipPath="url(#clip0_2_467)">
                    <path d={svgPaths.p5a06400} stroke={getStrokeVar('cart')} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66642" />
                    <path d={svgPaths.p3af58400} stroke={getStrokeVar('cart')} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66642" />
                    <path d={svgPaths.p1f90d40} stroke={getStrokeVar('cart')} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66642" />
                  </g>
                </svg>
              </div>
              <p className={`absolute left-10 top-2 font-medium text-[14px] tracking-[-0.15px] ${getTextClass('cart')}`}>Cart</p>
            </div>

            {/* My Orders */}
            <div className={getLinkClass('my-orders')} onClick={() => navigate('/customer/my-orders')}>
              <div className="absolute left-2 top-2 w-5 h-5">
                <svg className="w-full h-full" fill="none" viewBox="0 0 20 20">
                  <path d="M17.5 7.5L10 12.5L2.5 7.5" stroke={getStrokeVar('my-orders')} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.67" />
                  <path d="M2.5 7.5L10 12.5V19.1667" stroke={getStrokeVar('my-orders')} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.67" />
                  <path d="M17.5 7.5L10 12.5V19.1667" stroke={getStrokeVar('my-orders')} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.67" />
                  <path d="M2.5 7.5L10 2.5L17.5 7.5" stroke={getStrokeVar('my-orders')} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.67" />
                </svg>
              </div>
              <p className={`absolute left-10 top-2 font-medium text-[14px] tracking-[-0.15px] ${getTextClass('my-orders')}`}>My Orders</p>
            </div>

            {/* Payments */}
            <div className={getLinkClass('payments')} onClick={() => navigate('/customer/payments')}>
              <div className="absolute left-2 top-2 w-5 h-5">
                <svg className="w-full h-full" fill="none" viewBox="0 0 20 20">
                  <rect x="2.5" y="4.17" width="15" height="11.67" rx="1.67" stroke={getStrokeVar('payments')} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.67" />
                  <path d="M2.5 8.33H17.5" stroke={getStrokeVar('payments')} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.67" />
                </svg>
              </div>
              <p className={`absolute left-10 top-2 font-medium text-[14px] tracking-[-0.15px] ${getTextClass('payments')}`}>Payments</p>
            </div>
          </div>
        </div>

        {/* Footer - Sticky to bottom */}
        <div className="border-t border-[#e5e7eb] p-4 flex-shrink-0">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-[#f3f4f6] flex items-center justify-center">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 31.9931 31.9931">
                <g clipPath="url(#clip0_2_457)">
                  <path d={svgPaths.p266cec00} fill="#D1D5DC" />
                </g>
              </svg>
            </div>
            <div>
              <p className="font-medium text-[14px] text-[#364153] tracking-[-0.15px]">{shopName}</p>
              <p className={`font-medium text-[12px] ${accountType === 'prime' ? 'text-[#155dfc]' : 'text-gray-500'}`}>
                {accountType === 'prime' ? 'Trade Prime' : 'Normal Account'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:opacity-70" onClick={() => {
            sessionStorage.clear();
            // Also notify any listeners that account type has changed to reset UI
            window.dispatchEvent(new Event('accountTypeChanged'));
            navigate('/');
          }}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 19.9971 19.9971">
              <g>
                <path d={svgPaths.p2f1ee400} stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66642" />
                <path d={svgPaths.p5ead450} stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66642" />
                <path d="M17.4974 9.99854H7.4989" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66642" />
              </g>
            </svg>
            <p className="font-medium text-[14px] text-[#4a5565] tracking-[-0.15px]">Sign Out</p>
          </div>
        </div>
      </div>

      {/* Main Content - Scrollable */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        <Outlet />
      </div>
    </div>
  );
}