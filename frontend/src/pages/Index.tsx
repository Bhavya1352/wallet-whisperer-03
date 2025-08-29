const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-blue-900 flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-green-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-blue-400/30 rounded-full blur-lg animate-bounce"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-teal-400/20 rounded-full blur-xl animate-bounce delay-500"></div>
      </div>

      <div className="text-center relative z-10">
        {/* Main Finance Icons with Animation */}
        <div className="mb-8 relative">
          <div className="absolute -top-10 -left-10 text-6xl animate-spin-slow opacity-30">⚙️</div>
          <div className="absolute -top-8 -right-12 text-5xl animate-bounce opacity-40">📈</div>
          
          <div className="relative bg-gradient-to-r from-green-400/20 to-blue-400/20 p-8 rounded-full backdrop-blur-sm border border-white/10">
            <div className="text-8xl mb-4 animate-pulse">💰</div>
            <div className="flex justify-center space-x-4">
              <div className="text-4xl animate-bounce delay-100">📊</div>
              <div className="text-4xl animate-bounce delay-200">💳</div>
              <div className="text-4xl animate-bounce delay-300">🏦</div>
            </div>
          </div>
          
          <div className="absolute -bottom-8 -left-8 text-5xl animate-pulse opacity-50">💎</div>
          <div className="absolute -bottom-6 -right-10 text-4xl animate-spin-slow opacity-40">🎯</div>
        </div>
        
        <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-2xl animate-fade-in">
          💰 Wallet Whisperer
        </h1>
        
        <p className="text-2xl text-green-200 mb-8 drop-shadow-lg animate-slide-up">
          Your Smart Finance Tracker
        </p>
        
        {/* Glass Card with Animated Content */}
        <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/20 hover:bg-white/15 transition-all duration-500">
          <div className="flex justify-center space-x-6 mb-6">
            <div className="relative">
              <div className="text-5xl animate-float">📈</div>
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
            </div>
            <div className="relative">
              <div className="text-5xl animate-float delay-200">💎</div>
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-400 rounded-full animate-ping delay-200"></div>
            </div>
            <div className="relative">
              <div className="text-5xl animate-float delay-400">🎯</div>
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-emerald-400 rounded-full animate-ping delay-400"></div>
            </div>
          </div>
          
          <p className="text-xl text-white font-semibold mb-4">
            🚀 Track • Budget • Achieve
          </p>
          
          {/* Animated Progress Bar */}
          <div className="w-full bg-white/20 rounded-full h-2 mb-4">
            <div className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full animate-progress"></div>
          </div>
          
          <div className="flex justify-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse delay-100"></div>
            <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse delay-200"></div>
          </div>
        </div>
        
        {/* Bottom Animated Icons */}
        <div className="mt-8 flex justify-center space-x-8">
          <div className="text-4xl animate-bounce hover:scale-125 transition-transform cursor-pointer">💸</div>
          <div className="text-4xl animate-bounce delay-100 hover:scale-125 transition-transform cursor-pointer">💰</div>
          <div className="text-4xl animate-bounce delay-200 hover:scale-125 transition-transform cursor-pointer">📊</div>
          <div className="text-4xl animate-bounce delay-300 hover:scale-125 transition-transform cursor-pointer">🏆</div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes progress {
          from { width: 0%; }
          to { width: 75%; }
        }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-fade-in { animation: fade-in 1s ease-out; }
        .animate-slide-up { animation: slide-up 1s ease-out 0.3s both; }
        .animate-progress { animation: progress 3s ease-out infinite; }
      `}</style>
    </div>
  );
};

export default Index;