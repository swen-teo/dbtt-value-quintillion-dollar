import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Lock, Mail, ArrowRight } from 'lucide-react';
import imgImageValu from 'figma:asset/dd263ea74eea751edbe19c75046ad4c686cd593c.png';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    /* Reset mock state on fresh login */
    sessionStorage.clear();
    localStorage.clear();

    const demoRecurring = [
      { id: 'REC-001', name: 'Premium Cola (24x330ml)', qty: 5, frequency: 'Weekly', totalPrice: 112.50, nextDate: 'Apr 02, 2026' },
      { id: 'REC-002', name: 'Instant Noodles (40 packs)', qty: 10, frequency: 'Monthly', totalPrice: 220.00, nextDate: 'Apr 15, 2026' }
    ];
    sessionStorage.setItem('recurringOrders', JSON.stringify(demoRecurring));

    const demoOrders = [
      { id: 'ORD-9982', shopName: 'Valu$ AMK', customerName: 'Retailer Demo', totalAmount: 1450.00, items: [{ product: { name: 'Bulk Soda' }, quantity: 10 }], status: 'completed', paymentMethod: 'card', pickupLocation: 'Main Warehouse', pickupType: 'immediate', pickupDate: '2026-03-24' },
      { id: 'ORD-9983', shopName: 'Valu$ Bedok', customerName: 'Retailer Demo', totalAmount: 320.00, items: [{ product: { name: 'Premium Rice' }, quantity: 2 }], status: 'cancelled', paymentMethod: 'card', pickupLocation: 'Valu$ Tampines', pickupType: 'scheduled', pickupDate: '2026-03-25' },
      { id: 'ORD-9985', shopName: 'Valu$ Tampines', customerName: 'Retailer Demo', totalAmount: 840.50, items: [{ product: { name: 'Snack Box' }, quantity: 5 }], status: 'ready', paymentMethod: 'bnpl', pickupLocation: 'Valu$ Tampines', pickupType: 'scheduled', pickupDate: '2026-03-27' },
      { id: 'ORD-9986', shopName: 'Valu$ Jurong', customerName: 'Retailer Demo', totalAmount: 2150.00, items: [{ product: { name: 'Drinks Carton' }, quantity: 20 }], status: 'pending', paymentMethod: 'card', pickupLocation: 'Jurong East Hub', pickupType: 'immediate', pickupDate: '2026-03-28' }
    ];
    localStorage.setItem('lastOrder', JSON.stringify(demoOrders[2]));
    localStorage.setItem('allOrders', JSON.stringify(demoOrders));
    localStorage.setItem('orders', JSON.stringify(demoOrders)); // Used by Admin Portal

    if (email === 'demo@mamashop.com' && password === 'demo123') {
      // Seed Existing User State
      sessionStorage.setItem('accountType', 'prime');
      sessionStorage.setItem('grabLinked', 'true');
      sessionStorage.setItem('grabEmail', 'demo@mamashop.com');
      sessionStorage.setItem('recurringCardLinked', 'true');
      
      // Business Profile
      sessionStorage.setItem('shopName', 'Mama Shop Wholesale');
      sessionStorage.setItem('contactPerson', 'Retailer Demo');
      sessionStorage.setItem('email', 'demo@mamashop.com');
      sessionStorage.setItem('phone', '+65 8888 7777');
      sessionStorage.setItem('address', '123 Bedok North Rd, #01-45, Singapore 460123');
      sessionStorage.setItem('uen', '201988888G');

      const demoRecurring = [
        { id: 'REC-001', name: 'Premium Cola (24x330ml)', qty: 5, frequency: 'Weekly', totalPrice: 112.50, nextDate: 'Apr 02, 2026' },
        { id: 'REC-002', name: 'Instant Noodles (40 packs)', qty: 10, frequency: 'Monthly', totalPrice: 220.00, nextDate: 'Apr 15, 2026' }
      ];
      sessionStorage.setItem('recurringOrders', JSON.stringify(demoRecurring));

      const demoOrders = [
        { id: 'ORD-9982', createdAt: '2026-03-22T10:00:00Z', total: 1450.00, items: [{ product: { name: 'Bulk Soda' }, quantity: 10 }], status: 'Collected', paymentMethod: 'card', pickupLocation: 'Main Warehouse', pickupDate: '2026-03-24' },
        { id: 'ORD-9983', createdAt: '2026-03-23T09:15:00Z', total: 320.00, items: [{ product: { name: 'Premium Rice' }, quantity: 2 }], status: 'Cancelled', paymentMethod: 'card', pickupLocation: 'Valu$ Tampines', pickupDate: '2026-03-24' },
        { id: 'ORD-9985', createdAt: '2026-03-25T14:30:00Z', total: 840.50, items: [{ product: { name: 'Snack Box' }, quantity: 5 }], status: 'Ready For Pickup', paymentMethod: 'bnpl', pickupLocation: 'Valu$ Tampines', pickupDate: '2026-03-27' }
      ];
      localStorage.setItem('lastOrder', JSON.stringify(demoOrders[2]));
      localStorage.setItem('allOrders', JSON.stringify(demoOrders));
      
      window.dispatchEvent(new Event('accountTypeChanged'));
      navigate('/customer/shop');
    } else if (email === 'admin@valus.com' && password === 'admin123') {
      navigate('/admin/dashboard');
    } else {
      alert('Invalid credentials. Access is currently limited to Demo Accounts.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-16 w-20 rounded-2xl bg-gradient-to-br from-[#ff6900] to-[#ff8534] p-2 shadow-lg shadow-orange-500/20">
              <img src={imgImageValu} alt="Valu$" className="w-full h-full object-cover rounded-xl" />
            </div>
            <div className="text-left">
              <h1 className="font-bold text-3xl text-gray-900 tracking-tight">Valu$</h1>
              <p className="text-sm text-gray-600">Wholesale Trade</p>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-gray-600">Sign in to access your wholesale account</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-6">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ff6900] focus:border-transparent transition-all text-gray-900 placeholder:text-gray-400"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ff6900] focus:border-transparent transition-all text-gray-900"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#ff6900] focus:ring-[#ff6900]" />
                <span className="text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-[#ff6900] font-semibold hover:text-[#ff8534]">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#ff6900] to-[#ff8534] text-white py-3.5 rounded-xl font-bold hover:shadow-xl hover:shadow-orange-500/20 transition-all flex items-center justify-center gap-2 group"
            >
              Sign In to Shop
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Admin Link removed as it's unified under normal login */}
        </div>

        {/* New Member Link */}
        <div className="text-center mb-6">
          <p className="text-sm text-gray-600 mb-3">New to Valu$ Wholesale?</p>
          <button
            onClick={() => {
              sessionStorage.clear();
              localStorage.clear();
              window.dispatchEvent(new Event('accountTypeChanged'));
              navigate('/onboarding');
            }}
            className="inline-flex items-center gap-2 text-[#ff6900] font-bold hover:text-[#ff8534] transition-colors"
          >
            Register Your Business
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Demo Credentials */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-4">
          <p className="text-xs font-semibold text-blue-900 mb-2 uppercase tracking-wide">Demo Access</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold text-blue-800 mb-1">Customer</p>
              <p className="text-xs text-blue-700">
                <span className="font-semibold">Email:</span> demo@mamashop.com<br />
                <span className="font-semibold">Password:</span> demo123
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-blue-800 mb-1">Admin</p>
              <p className="text-xs text-blue-700">
                <span className="font-semibold">Email:</span> admin@valus.com<br />
                <span className="font-semibold">Password:</span> admin123
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}