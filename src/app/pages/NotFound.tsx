import { useNavigate } from 'react-router';
import { Home } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="font-bold text-9xl text-[#ff6900] mb-4">404</h1>
        <h2 className="font-bold text-3xl text-gray-900 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#ff6900] to-[#ff8534] text-white px-6 py-3 rounded-xl font-bold hover:shadow-xl transition-all"
        >
          <Home className="w-5 h-5" />
          Go Home
        </button>
      </div>
    </div>
  );
}