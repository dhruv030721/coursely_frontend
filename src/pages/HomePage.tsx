import { LineChart, Shield, TrendingUp, Users } from 'lucide-react';
import { TfiTwitter } from "react-icons/tfi";
import { IoLogoFacebook } from "react-icons/io5";
import { RiInstagramFill } from "react-icons/ri";
import { AiOutlineYoutube } from "react-icons/ai";
import { LuMousePointerClick } from "react-icons/lu";
import { Footer } from "@/components"
import video_background from '@/assets/background.mp4';

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

  const social_media = [
    {
      icon: <TfiTwitter className="w-12 h-12 text-green-500" />,
      title: "Twitter"
    },
    {
      icon: <IoLogoFacebook className="w-12 h-12 text-green-500" />,
      title: "Facebook",
    },
    {
      icon: <RiInstagramFill className="w-12 h-12 text-green-500" />,
      title: "Instagram",
    },
    {
      icon: <AiOutlineYoutube className="w-12 h-12 text-green-500" />,
      title: "Youtube",

    }
  ];


  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* ========================================= */}
      {/* Background and Blur Effect */}
      {/* ========================================= */}
      <div className="absolute top-0 left-0 w-full h-screen pointer-events-none">
        <div className="absolute -top-1/4 -right-1/4 w-2/3 h-2/3 bg-red-600/40 rounded-full blur-[200px] animate-blob"></div>
        <div className="absolute -bottom-1/4 -left-1/4 w-2/3 h-2/3 bg-green-600/40 rounded-full blur-[200px] animate-blob animation-delay-4000"></div>
        <video
          autoPlay
          loop
          muted
          className="absolute  w-full h-full object-cover opacity-5"
        >
          <source src={video_background} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
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
          <div className='relative'>
            <button className="px-8 py-3 bg-green-900 border border-green-200 animate-in hover:bg-green-700 text-white font-bold rounded-3xl transition-colors animate-pulse">
              Open Your Mutual Fund Account
            </button>
            <LuMousePointerClick className='absolute right-0 animate-mousePointer' color='green' size={30} />
          </div>
          <button className="px-8 py-3 border border-white/30 hover:bg-white/10 text-white font-light rounded-3xl transition-colors">
            View Courses
          </button>
        </div>
      </section>

      <div className='flex flex-col space-y-40'>
        {/* ========================================= */}
        {/* Why Choose Us */}
        {/* ========================================= */}
        <section className="text-white text-center space-y-10 container mx-auto px-4">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">Why Choose Us?</h2>
            <p className="text-gray-300">Join thousands of successful traders who have transformed their trading journey with our expert guidance</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-10">
            {features.map((data, index) => (
              <div key={index} className="border border-zinc-600 text-white bg-zinc-800/50 shadow-lg z-10 rounded-3xl flex flex-col justify-center items-center p-10 gap-y-5">
                <div className='animate-pulse'>{data.icon}</div>
                <h1 className="text-2xl font-caveat font-semibold">{data.title}</h1>
                <div className="text-gray-400">{data.description}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================= */}
        {/* Social Media */}
        {/* ========================================= */}
        <section className="text-white text-center space-y-10 container mx-auto px-4">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">Social Media</h2>
            <p className="text-gray-300">Follow us for more updates, tips, and strategies!</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-24 px-4 md:px-10">
            {social_media.map((data, index) => (
              <div key={index} className=" cursor-pointer border-zinc-600 relative text-white bg-zinc-800/50 shadow-lg z-10 rounded-3xl flex flex-col justify-center items-center p-8 gap-y-5 hover:scale-105 transition before:content-[''] before:absolute before:-top-2 before:-left-2 before:border-green-700 before:w-20 before:h-20 before:rounded-t-3xl before:rounded-r-none before:bg-transparent before:border-t before:border-l 
              after:absolute after:-bottom-2 after:-right-2 after:border-green-700 after:w-20 after:h-20 after:rounded-b-3xl after:rounded-l-none after:bg-transparent after:border-b after:border-r">
                <div className=''>{data.icon}</div>
                <h1 className="text-2xl font-caveat font-semibold">{data.title}</h1>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================= */}
        {/* Our Mentor */}
        {/* ========================================= */}
        <section className="text-white text-center space-y-10 container mx-auto px-4">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">Our Mentor</h2>
            <p className="text-gray-300">Meet our mentor, a trusted guide and advisor dedicated to supporting and inspiring our journey.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-10">

          </div>
        </section>

        {/* ========================================= */}
        {/* Footer */}
        {/* ========================================= */}
        <Footer />
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

         @keyframes mousePointer {
          0%, 100% { transform: translate(-10px, -10px) scale(1.2); }
          50% { transform: translate(15px, 15px) scale(1.0); }
        }
        .animate-mousePointer {
          animation: mousePointer 1s infinite linear;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default HomePage;