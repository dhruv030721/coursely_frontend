import { LineChart, Shield, TrendingUp, Users } from 'lucide-react';

const HomePage = () => {

  const features = [
    {
      icon: <LineChart className="w-12 h-12 text-green-500" />,
      title: "Proven Trading Systems",
      description: "Time-tested strategies developed through years of market experience and real-world trading success"
    },
    {
      icon: <Shield className="w-12 h-12 text-green-500" />,
      title: "Disciplined Approach",
      description: "Learn to trade with a structured methodology that focuses on consistent results and risk management"
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-green-500" />,
      title: "Sustainable Growth",
      description: "Build long-term wealth through proven strategies that prioritize steady returns over risky trades"
    },
    {
      icon: <Users className="w-12 h-12 text-green-500" />,
      title: "Financial Empowerment",
      description: "Join a community of dedicated traders and unlock your potential in the stock market"
    }
  ];


  return (
    <div className="relative min-h-screen bg-black overflow-hidden">


      {/* ========================================= */}
      {/* Background and Blur Effect */}
      {/* ========================================= */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute -top-1/4 -right-1/4 w-2/3 h-2/3 bg-red-600/40 rounded-full blur-[200px] animate-blob"></div>
        <div className="absolute -bottom-1/4 -left-1/4 w-2/3 h-2/3 bg-green-600/40 rounded-full blur-[200px] animate-blob animation-delay-4000"></div>
      </div>


      {/* ========================================= */}
      {/* Hero Section */}
      {/* ========================================= */}
      <section className="relative min-h-screen flex flex-col justify-center z-10 container mx-auto px-4 pt-24 text-white font-geist text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-white via-white/80 to-white/60 bg-clip-text text-transparent">
          Master the Markets with
          <br />
          Clarity and Confidence
        </h1>
        <p className="text-xl md:text-xl max-w-2xl mx-auto mb-10 text-white/50">
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
      </section>


      {/* ========================================= */}
      {/* Why Choose Us */}
      {/* ========================================= */}
      <section className="text-white text-center space-y-10 mb-36">
        <div className='space-y-5'>
          <h1 className="text-white text-center text-5xl font-bold">Why Choose Us?</h1>
          <p className="text-gray-300">Join thousands of successful traders who have transformed their trading journey with our expert guidance</p>
        </div>
        <div className="flex space-x-5 px-10">
          {features.map((data) => {
            return (<div className="border border-zinc-600 text-white bg-zinc-800/50 shadow-lg z-10 rounded-3xl flex flex-col justify-center items-center p-10 gap-y-5">
              <div className='animate-bounce'>{data.icon}</div>
              <h1 className="text-xl font-semibold">{data.title}</h1>
              <p className="text-sm">{data.description}</p>
            </div>)
          })}
        </div>
      </section>


      {/* ========================================= */}
      {/* Our Mentor */}
      {/* ========================================= */}
      {/* <section className='mb-10'>
        <div className='space-y-5'>
          <h1 className="text-white text-center text-5xl font-bold">Our Mentor</h1>
          <p className="text-gray-300">Join thousands of successful traders who have transformed their trading journey with our expert guidance</p>
        </div>
      </section> */}


      {/* ========================================= */}
      {/* Footer */}
      {/* ========================================= */}
      <section>
        <div>
          <div>
            {/* Logo */}
          </div>
          <div>
            {/* Quick Links */}
          </div>
          <div>
            {/* Social Media */}
          </div>
        </div>
        <div>
          <h1></h1>
        </div>
      </section>



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