import { LineChart, Shield, TrendingUp, Users } from 'lucide-react';
import { TfiTwitter } from "react-icons/tfi";
import { IoLogoFacebook } from "react-icons/io5";
import { RiInstagramFill } from "react-icons/ri";
import { AiOutlineYoutube } from "react-icons/ai";
import { LuMousePointerClick } from "react-icons/lu";
import { CourseCard } from "@/components"
import { Link } from "react-router-dom";
import video_background from '@/assets/background.mp4';
import warrent_buffet from "@/assets/warren_buffet.jpg";
import Marquee from "react-fast-marquee";


const HomePage = () => {
  const features = [
    {
      icon: <LineChart className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-green-500" />,
      title: "Proven Trading Systems",
      description: "Time-tested strategies developed through years of market experience and real-world trading success"
    },
    {
      icon: <Shield className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-green-500" />,
      title: "Disciplined Approach",
      description: "Learn to trade with a structured methodology that focuses on consistent results and risk management"
    },
    {
      icon: <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-green-500" />,
      title: "Sustainable Growth",
      description: "Build long-term wealth through proven strategies that prioritize steady returns over risky trades"
    },
    {
      icon: <Users className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-green-500" />,
      title: "Financial Empowerment",
      description: "Join a community of dedicated traders and unlock your potential in the stock market"
    }
  ];

  const social_media = [
    {
      icon: <TfiTwitter className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-green-500" />,
      title: "Twitter"
    },
    {
      icon: <IoLogoFacebook className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-green-500" />,
      title: "Facebook",
    },
    {
      icon: <RiInstagramFill className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-green-500" />,
      title: "Instagram",
    },
    {
      icon: <AiOutlineYoutube className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-green-500" />,
      title: "Youtube",

    }
  ];

  const courses = [
    {
      id: 7,
      title: 'Value Investing: Warren Buffett Method',
      instructor: 'Thomas Baker',
      description: 'Discover the investment strategies used by Warren Buffett to build long-term wealth.',
      level: 'Beginner',
      rating: 4.9,
      students: 25467,
      duration: '26 hours',
      price: 139.99,
      category: 'Investing',
      image: 'https://th.bing.com/th/id/OIP.xNz_Q8NqgfBrM_EfLxbU3AHaE7?w=255&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
      featured: true
    },
    {
      id: 8,
      title: 'Candlestick Patterns and Chart Reading',
      instructor: 'Andrew Wilson',
      description: 'Master Japanese candlestick patterns to identify market reversals and continuations.',
      level: 'Intermediate',
      rating: 4.6,
      students: 11243,
      duration: '16 hours',
      price: 79.99,
      category: 'Technical Analysis',
      image: 'https://th.bing.com/th/id/OIP.xNz_Q8NqgfBrM_EfLxbU3AHaE7?w=255&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
      featured: false
    }
  ]

  const Keywords = [
    "Fundamental & Technical Analysis",
    "Options & Futures Trading",
    "Risk Management & Capital Preservation"
  ]


  return (
    <div className="relative min-h-screen bg-black overflow-hidden" id='HomeSection'>
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
          className="absolute w-full h-full object-cover opacity-5"
        >
          <source src={video_background} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* ========================================= */}
      {/* Hero Section */}
      {/* ========================================= */}
      <section className="relative h-[80vh] md:min-h-screen flex flex-col justify-center z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 text-white font-geist text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight bg-gradient-to-r from-white via-white/80 to-white/60 bg-clip-text text-transparent">
          Master the Markets with
          <br />
          Clarity and Confidence with Jalay
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-xl max-w-xs sm:max-w-lg md:max-w-2xl mx-auto mb-8 sm:mb-10 text-white/50 px-4 sm:px-0">
          We teach traders everything about Cash, Futures, and Options Trading
          in the Indian Markets. We've guided over 5,000 traders to success.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 px-4 sm:px-0">
          <div className='relative'>
            <button className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-green-800 border border-green-200 animate-in hover:bg-green-900 text-white font-bold rounded-3xl transition-colors animate-pulse text-sm sm:text-base">
              <a href="http://p.njw.bz/46976" target='__blank__' >Open Your Mutual Fund Account</a>
            </button>
            <LuMousePointerClick className='absolute -right-2 sm:right-0 animate-mousePointer' color='green' size={24} />
          </div>
          <button className="w-[70vw] sm:w-auto px-6 sm:px-8 py-3 border border-white/30 hover:bg-white/10 text-white font-light rounded-3xl transition-colors text-sm sm:text-base">
            <Link to="/courses">View Courses</Link>
          </button>
        </div>
      </section>

      {/* ========================================= */}
      {/* Keywords Marquee */}
      {/* ========================================= */}
      <div className='mt-12 sm:mt-16 lg:mt-24 h-12 sm:h-16 flex items-center rotate-1 sm:rotate-2 relative -top-10 sm:-top-20 z-20 border-t-2 border-b-2 border-zinc-800 shadow-lg'>
        <div className='text-white whitespace-nowrap relative bg-black h-full text-center flex items-center font-geist text-sm sm:text-lg lg:text-xl before:h-full before:w-6 sm:before:w-10 before:absolute before:-right-4 sm:before:-right-8 before:bg-gradient-to-r before:from-black before:to-transparent before:z-10'>
          <p className='pr-3 sm:pr-5 px-4 sm:px-10 font uppercase flex gap-x-2'>
            What we Provide <span className="text-yellow-500 mr-2 sm:mr-3 text-lg sm:text-xl">?</span>
          </p>
        </div>
        <Marquee className="text-white bg-black text-sm sm:text-lg lg:text-xl font-bold uppercase h-full font-geist" speed={100} direction='right' gradient={false}>
          {Keywords.map((keyword, index) => (
            <div key={index}>
              <span className="text-yellow-500 mr-2 sm:mr-3 text-lg sm:text-xl">•</span>
              <span key={index} className="text-green-500 font-bold mx-4 sm:mx-6 lg:mx-10">{keyword}</span>
            </div>
          ))}
        </Marquee>
      </div>

      {/* ========================================= */}
      {/* Discount Marquee */}
      {/* ========================================= */}
      <div className='mb-12 sm:mb-16 lg:mb-24 h-12 sm:h-16 flex items-center -rotate-1 relative -top-2 sm:-top-5  z-20 border-t-2 border-b-2 border-zinc-800 shadow-lg'>
        <div className='text-white relative bg-black h-full text-center flex items-center font-geist text-sm sm:text-lg lg:text-xl before:h-full before:w-6 sm:before:w-10 before:absolute before:-right-4 sm:before:-right-8 before:bg-gradient-to-r before:from-black before:to-transparent before:z-10'>
          <p className='pr-3 sm:pr-5 px-4 sm:px-10 font uppercase flex gap-x-2'>
            Discounts <span className='text-green-700 font-bold'>%</span>
          </p>
        </div>
        <Marquee className="text-white bg-black text-sm sm:text-lg lg:text-xl font-bold uppercase h-full font-geist" speed={100} gradient={false}>
          <span className="text-yellow-500 mr-2 sm:mr-3 text-lg sm:text-xl">20%</span>OFF for New User
        </Marquee>
      </div>

      <div className='flex flex-col space-y-20 sm:space-y-32 lg:space-y-40'>
        {/* ========================================= */}
        {/* Why Choose Us */}
        {/* ========================================= */}
        <section className="text-white text-center space-y-6 sm:space-y-8 lg:space-y-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-5">Why Choose Us?</h2>
            <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto px-4 sm:px-0">Join thousands of successful traders who have transformed their trading journey with our expert guidance</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 px-2 sm:px-4 md:px-10">
            {features.map((data, index) => (
              <div key={index} className="border border-zinc-600 text-white bg-zinc-800/50 shadow-lg z-10 rounded-3xl flex flex-col justify-center items-center p-6 sm:p-8 lg:p-10 gap-y-3 sm:gap-y-4 lg:gap-y-5">
                <div className='animate-pulse'>{data.icon}</div>
                <h1 className="text-lg sm:text-xl lg:text-2xl font-caveat font-semibold text-center">{data.title}</h1>
                <div className="text-gray-400 text-sm sm:text-base text-center leading-relaxed">{data.description}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================= */}
        {/* Social Media */}
        {/* ========================================= */}
        <section className="text-white text-center space-y-6 sm:space-y-8 lg:space-y-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-5">Social Media</h2>
            <p className="text-gray-300 text-sm sm:text-base">Follow us for more updates, tips, and strategies!</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 lg:gap-24 px-2 sm:px-4 md:px-10">
            {social_media.map((data, index) => (
              <div key={index} className="cursor-pointer border-zinc-600 relative text-white bg-zinc-800/50 shadow-lg z-10 rounded-3xl flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8 gap-y-3 sm:gap-y-4 lg:gap-y-5 hover:scale-105 transition before:content-[''] before:absolute before:-top-1 sm:before:-top-2 before:-left-1 sm:before:-left-2 before:border-green-700 before:w-12 sm:before:w-16 lg:before:w-20 before:h-12 sm:before:h-16 lg:before:h-20 before:rounded-ss-3xl before:bg-transparent before:border-t before:border-l 
              after:absolute after:-bottom-1 sm:after:-bottom-2 after:-right-1 sm:after:-right-2 after:border-green-700 after:w-12 sm:after:w-16 lg:after:w-20 after:h-12 sm:after:h-16 lg:after:h-20 after:rounded-ee-3xl after:bg-transparent after:border-b after:border-r">
                <div className=''>{data.icon}</div>
                <h1 className="text-lg sm:text-xl lg:text-2xl font-caveat font-semibold">{data.title}</h1>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================= */}
        {/* Our Mentor */}
        {/* ========================================= */}
        <section className="text-white text-center space-y-6 sm:space-y-8 lg:space-y-10 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-5">Meet your <span className='text-green-500'>Mentor</span></h2>
            <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">Meet our mentor, a trusted guide and advisor dedicated to supporting and inspiring our journey.</p>
          </div>
          <div className="flex flex-col w-full sm:w-4/5 md:w-3/4 lg:w-1/2 xl:w-2/5 md:flex-row justify-center items-center gap-6 sm:gap-8 lg:gap-10">
            <img src={warrent_buffet} alt="Mentor" className="rounded-full w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 object-cover border border-zinc-300 flex-shrink-0" />
            <div className="text-center md:text-left">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-caveat font-semibold">Yashdeep Chorasiya</h1>
              <p className="text-gray-400 text-sm sm:text-base">Expert Trader and Mentor</p>
              <p className="w-[50vw] mt-3 sm:mt-4 text-sm">With over 10 years of experience in the financial markets, John has a proven track record of success and is passionate about sharing his knowledge with others.</p>
            </div>
          </div>
        </section>

        {/* ========================================= */}
        {/* Upcoming Courses */}
        {/* ========================================= */}
        <section className="text-white text-center space-y-6 sm:space-y-8 lg:space-y-10 container mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24 lg:pb-32 flex flex-col items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-5">What would you like to <span className='text-green-500'>Learn?</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-6">
            {courses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;