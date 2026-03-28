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

    try {
      const spUrl = (import.meta as any).env.VITE_SUPABASE_URL;
      if (spUrl && spUrl !== 'YOUR_SUPABASE_PROJECT_URL' && !spUrl.includes('placeholder')) {
        const { supabase } = await import('../lib/supabaseClient');
        
        // Check admins table first
        const { data: adminData, error: adminError } = await supabase
          .from('admins')
          .select('*')
          .eq('email', email)
          .eq('password', password)
          .single();

        if (adminData && !adminError) {
          navigate('/admin/dashboard');
          return;
        }

        // Then check customers table
        const { data, error } = await supabase
          .from('customers')
          .select('*')
          .eq('email', email)
          .eq('password', password)
          .single();

        if (data && !error) {
          sessionStorage.setItem('accountType', data.membership_tier === 'prime' ? 'prime' : 'standard');
          sessionStorage.setItem('shopName', data.shop_name);
          sessionStorage.setItem('contactPerson', data.contact_person);
          sessionStorage.setItem('email', data.email);
          sessionStorage.setItem('phone', data.phone);
          sessionStorage.setItem('address', data.address || '');
          sessionStorage.setItem('uen', data.uen || '');
          sessionStorage.setItem('customerId', data.id); // store the UUID

          window.dispatchEvent(new Event('accountTypeChanged'));
          navigate('/customer/shop');
          return;
        }
      }
    } catch (err) {
      console.error("Error logging in via Supabase:", err);
    }
    
    alert('Invalid credentials. Email or password not found.');
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