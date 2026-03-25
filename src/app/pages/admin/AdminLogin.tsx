import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Lock, Mail, Shield, ArrowRight } from 'lucide-react';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#ff6900] to-[#ff8534] rounded-2xl mb-6 shadow-2xl shadow-orange-500/20">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Admin Portal</h1>
          <p className="text-gray-400">Valu$ Wholesale Operations</p>
        </div>

        {/* Login Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-8 mb-6">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-white/10 border-2 border-white/20 rounded-xl focus:ring-2 focus:ring-[#ff6900] focus:border-transparent transition-all text-white placeholder:text-gray-500"
                  placeholder="admin@valus.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-white/10 border-2 border-white/20 rounded-xl focus:ring-2 focus:ring-[#ff6900] focus:border-transparent transition-all text-white placeholder:text-gray-500"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#ff6900] to-[#ff8534] text-white py-3.5 rounded-xl font-bold hover:shadow-2xl hover:shadow-orange-500/30 transition-all flex items-center justify-center gap-2 group"
            >
              Sign In to Admin Portal
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>

        {/* Demo Credentials */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 mb-6">
          <p className="text-xs font-semibold text-white mb-2 uppercase tracking-wide">Demo Access</p>
          <p className="text-xs text-gray-300">
            <span className="font-semibold">Email:</span> admin@valus.com<br />
            <span className="font-semibold">Password:</span> admin123
          </p>
        </div>

        {/* Back Link */}
        <div className="text-center">
          <button
            onClick={() => navigate('/')}
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            ← Back to Customer Login
          </button>
        </div>
      </div>
    </div>
  );
}