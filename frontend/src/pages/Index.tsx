const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-cyan-500 to-blue-600 flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          <div className="text-8xl mb-4">💰</div>
          <div className="text-6xl mb-2">📊</div>
          <div className="text-4xl">💳</div>
        </div>
        
        <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg">
          💰 Wallet Whisperer
        </h1>
        
        <p className="text-2xl text-white/90 mb-8 drop-shadow">
          Your Smart Finance Tracker
        </p>
        
        <div className="bg-white/20 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-white/30">
          <div className="flex justify-center space-x-4 mb-6">
            <div className="text-4xl">📈</div>
            <div className="text-4xl">💎</div>
            <div className="text-4xl">🎯</div>
          </div>
          
          <p className="text-xl text-white font-semibold">
            🚀 Track • Budget • Achieve
          </p>
          
          <div className="mt-6 flex justify-center space-x-2">
            <div className="w-3 h-3 bg-white/60 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-white/60 rounded-full animate-pulse delay-100"></div>
            <div className="w-3 h-3 bg-white/60 rounded-full animate-pulse delay-200"></div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-center space-x-6">
          <div className="text-3xl animate-bounce">💸</div>
          <div className="text-3xl animate-bounce delay-100">💰</div>
          <div className="text-3xl animate-bounce delay-200">📊</div>
        </div>
      </div>
    </div>
  );
};

export default Index;