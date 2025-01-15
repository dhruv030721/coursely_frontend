
const HomePage = () => {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Background Blur Effects */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute -top-1/4 -right-1/4 w-2/3 h-2/3 bg-red-600/40 rounded-full blur-[200px] animate-blob"></div>
        <div className="absolute -bottom-1/4 -left-1/4 w-2/3 h-2/3 bg-green-600/40 rounded-full blur-[200px] animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col justify-center z-10 container mx-auto px-4 pt-24 text-white font-geist text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-white via-white/80 to-white/60 bg-clip-text text-transparent">
          Master the Markets with
          <br />
          Clarity and Confidence
        </h1>
        <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-10 text-white/80">
          We teach traders everything about Cash, Futures, and Options Trading
          in the Indian Markets. We've guided over 5,000 traders to success.
        </p>
        <div className="flex justify-center space-x-4">
          <button className="px-8 py-3 bg-green-600 hover:bg-green-700 text-black font-light rounded-3xl transition-colors">
            Start Learning
          </button>
          <button className="px-8 py-3 border border-white/30 hover:bg-white/10 text-white font-light rounded-3xl transition-colors">
            View Courses
          </button>
        </div>
      </div>

      {/* Custom Animation for Blob Effect */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(50px, 100px) scale(1.2); }
        }
        .animate-blob {
          animation: blob 15s infinite linear;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}

export default HomePage