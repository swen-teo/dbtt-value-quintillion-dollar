import { useNavigate } from 'react-router';
import { Package, CreditCard, Tag, Store, ChevronRight } from 'lucide-react';
import imgImageValu from "figma:asset/dd263ea74eea751edbe19c75046ad4c686cd593c.png";
import imgImage7 from "figma:asset/7f65eb07c329ff5d9926c56e9f3d93d75449a566.png";

export default function LandingHome() {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-orange-50 min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#ff6900] to-[#ff8534] shadow-lg">
        <div className="max-w-[1440px] mx-auto px-8 py-4 flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-12 rounded-xl bg-white p-1.5 shadow-lg">
              <img src={imgImageValu} alt="Valu$" className="w-full h-full object-cover rounded-lg" />
            </div>
            <div>
              <p className="font-bold text-white text-lg tracking-tight">Valu$ Wholesale</p>
              <p className="text-xs text-orange-100">B2B Solutions</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-6">
            <button 
              onClick={() => navigate('/login')}
              className="bg-white text-[#ff6900] px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              Log In
            </button>
            <button
              onClick={() => navigate('/onboarding')}
              className="bg-white text-[#ff6900] px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              Apply for Wholesale
            </button>
          </div>
        </div>
      </div>

      {/* Mini Nav */}
      <div className="bg-white border-b-2 border-gray-100 shadow-sm">
        <div className="max-w-[1440px] mx-auto px-8 py-5">
          <div className="flex items-center justify-center gap-16">
            {/* In-Store Pickup */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-orange-50 rounded-xl flex items-center justify-center transition-all">
                <Package className="w-5 h-5 text-[#ff6900]" />
              </div>
              <span className="text-gray-700 text-sm font-semibold transition-colors">
                In-Store Pickup
              </span>
            </div>

            {/* Membership */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl flex items-center justify-center transition-all">
                <CreditCard className="w-5 h-5 text-[#155dfc]" />
              </div>
              <span className="text-gray-700 text-sm font-semibold transition-colors">
                Membership
              </span>
            </div>

            {/* Active Promos */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-orange-50 rounded-xl flex items-center justify-center transition-all">
                <Tag className="w-5 h-5 text-[#ff6900]" />
              </div>
              <span className="text-gray-700 text-sm font-semibold transition-colors">
                Active Promos
              </span>
            </div>

            {/* Find A Store */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl flex items-center justify-center transition-all">
                <Store className="w-5 h-5 text-[#155dfc]" />
              </div>
              <span className="text-gray-700 text-sm font-semibold transition-colors">
                Find A Store
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-0">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-orange-100 via-white to-blue-50 p-16 flex flex-col justify-center min-h-[500px]">
              <div className="absolute inset-0 bg-gradient-to-r from-[#ff6900]/10 to-transparent" />

              <div className="max-w-2xl relative z-10">
                <h1 className="text-7xl font-bold text-gray-900 mb-2 tracking-tight">
                  Wholesale Pricing
                </h1>
                <h1 className="text-7xl font-bold bg-gradient-to-r from-[#ff6900] to-[#155dfc] bg-clip-text text-transparent mb-6 tracking-tight">
                  For Everything!
                </h1>
                <p className="text-gray-600 text-xl mb-8 leading-relaxed">
                  Stock your shelves with the best deals on beverages, snacks, and household essentials. 
                  Buy now, pay later with our flexible BNPL system.
                </p>
                <button 
                  onClick={() => navigate('/onboarding')}
                  className="group bg-gradient-to-r from-[#ff6900] to-[#ff8534] text-white px-10 py-4 rounded-2xl text-lg font-bold shadow-xl hover:shadow-2xl hover:shadow-orange-500/30 transition-all inline-flex items-center gap-2"
                >
                  Discover More
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Promotional Banners */}
            <div className="bg-gradient-to-br from-gray-50 to-white p-6 space-y-6">
              {[
                { title: 'Weekly Hotsale From', discount: '45', price: '$10.99', subtitle: 'For a family of 4' },
                { title: 'Member Exclusive', discount: '35', price: '$8.99', subtitle: 'Trade Prime Only' },
                { title: 'Clearance Sale', discount: '50', price: '$6.99', subtitle: 'Limited Stock' },
              ].map((promo, index) => (
                <div 
                  key={index} 
                  className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 relative overflow-hidden shadow-xl hover:shadow-2xl transition-all group border-2 border-orange-400"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full -ml-12 -mb-12" />
                  
                  <div className="flex items-start justify-between relative z-10">
                    <div className="flex-1">
                      <p className="text-white text-xl font-bold mb-3">{promo.title}</p>
                      <div className="flex items-baseline gap-2 mb-6">
                        <span className="text-6xl font-bold text-white">{promo.discount}</span>
                        <span className="text-3xl font-bold text-white">%</span>
                        <span className="text-2xl font-bold text-white">OFF</span>
                      </div>
                      <button 
                        onClick={() => navigate('/login')}
                        className="bg-white text-[#ff6900] px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all inline-flex items-center gap-2 group-hover:gap-3"
                      >
                        Shop Now
                        <ChevronRight className="w-4 h-4" />
                      </button>
                      <div className="mt-4 bg-white/20 backdrop-blur-sm rounded-xl p-3 inline-block">
                        <p className="text-white text-sm font-bold">
                          Only {promo.price}<br />
                          {promo.subtitle}
                        </p>
                      </div>
                    </div>
                    <div className="w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0 ml-4 shadow-lg border-4 border-white/30">
                      <img src={imgImage7} alt="Product" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-br from-gray-50 to-white py-16">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-900 mb-3">Ready to Get Started?</h2>
              <p className="text-gray-600 text-lg">Join thousands of retailers using Valu$ for wholesale procurement</p>
            </div>
            <div className="flex items-center justify-center gap-6">
              <button
                onClick={() => navigate('/onboarding')}
                className="group bg-gradient-to-r from-[#ff6900] to-[#ff8534] text-white px-12 py-5 rounded-2xl text-lg font-bold shadow-xl hover:shadow-2xl hover:shadow-orange-500/30 transition-all inline-flex items-center gap-3"
              >
                Apply for Wholesale Account
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigate('/login')}
                className="bg-white text-[#ff6900] px-12 py-5 rounded-2xl text-lg font-bold shadow-lg hover:shadow-xl border-2 border-orange-200 hover:border-orange-300 transition-all"
              >
                Log In to Your Account
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t-2 border-gray-100 shadow-inner">
        <div className="max-w-[1440px] mx-auto px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[#ff6900] to-[#ff8534] rounded-xl flex items-center justify-center shadow-lg">
                  <p className="font-bold text-white text-lg">V$</p>
                </div>
                <p className="font-bold text-xl text-gray-900">Valu$</p>
              </div>
              <p className="text-sm text-gray-600">Singapore's leading B2B wholesale platform for traditional retailers.</p>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><button onClick={() => navigate('/login')} className="hover:text-[#ff6900] transition-colors">Customer Login</button></li>
                <li><button onClick={() => navigate('/admin/login')} className="hover:text-[#ff6900] transition-colors">Admin Portal</button></li>
                <li><button onClick={() => navigate('/onboarding')} className="hover:text-[#ff6900] transition-colors">Getting Started</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>BNPL Solutions</li>
                <li>Wholesale Pricing</li>
                <li>Island-wide Pickup</li>
                <li>Trade Membership</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>support@valus.sg</li>
                <li>+65 6XXX XXXX</li>
                <li>Mon-Fri: 9AM-6PM</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t-2 border-gray-100 pt-8 text-center">
            <p className="text-gray-600 text-sm">
              © 2026 Valu$ Wholesale Solutions. All rights reserved. Wholesale only.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
