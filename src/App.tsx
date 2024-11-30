import { Sparkles, Zap } from 'lucide-react';

const ComingSoonPage = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative flex items-center justify-center p-4">
      {/* Gradient Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-indigo-900 opacity-70 animate-gradient-x"></div>
      
      {/* Floating Geometric Shapes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-10 left-10 w-48 h-48 bg-purple-500/20 rounded-full blur-2xl animate-float animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-2xl animate-float-delayed animate-pulse"></div>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 max-w-2xl w-full bg-gray-900/60 backdrop-blur-lg rounded-3xl border border-white/10 shadow-2xl p-10 text-center">
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center bg-gray-800/50 px-4 py-2 rounded-full border border-white/10">
            <Zap className="mr-2 text-yellow-400 animate-pulse" size={20} />
            <span className="text-sm font-medium text-gray-300">Next-Gen Platform</span>
          </div>
        </div>
        
        <h1 className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-600">
          YayinStocks
        </h1>
        
        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
          Revolutionizing stock trading with cutting-edge technology. We're building the future of financial empowerment.
        </p>
        
        <div className="flex justify-center items-center space-x-4">
          <div className="flex items-center bg-gray-800/50 px-4 py-2 rounded-lg border border-white/10">
            <Sparkles className="mr-2 text-emerald-400" size={20} />
            <span className="text-sm font-medium text-gray-300">Launching Soon</span>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="absolute bottom-6 left-0 w-full text-center text-gray-500 text-sm z-10">
        <p>© 2024 YayinStocks. The Future of Trading Starts Here.</p>
      </div>
      
      {/* Subtle Animated Lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent animate-line-move"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent animate-line-move-delayed"></div>
      </div>
    </div>
  );
};

export default ComingSoonPage;