import { JourneyStep, Input, Button } from "@/components"
import { BarChart3, BookOpen, LineChart, TrendingUp } from "lucide-react"

const Aboutus = () => {
  return (
    <div id="AboutSection" className="relative bg-black">
      <div className="absolute h-full top-0 left-0 w-full overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 -right-1/4 w-2/3 h-2/3 bg-red-900/40 rounded-full blur-[300px] animate-blob"></div>
        <div className="absolute -bottom-1/4 -left-1/4 w-2/3 h-2/3 bg-green-900/40 rounded-full blur-[300px] animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative pt-16 sm:pt-20 lg:pt-32 px-4 sm:px-6 lg:px-8">
        {/* Hero section */}
        <div className="mb-12 sm:mb-16 text-center">
          <h1 className="mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
            About <span className="bg-gradient-to-r from-red-800 to-red-950 bg-clip-text text-transparent">Us</span>
          </h1>
          <div className="mx-auto max-w-3xl rounded-xl border border-white/10 bg-white/5 p-4 sm:p-6 lg:p-8 backdrop-blur-md backdrop-filter">
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed">
              Welcome to our platform, where stock market insights meet disciplined trading strategies.
            </p>
          </div>
        </div>

        <div className="w-full flex mb-12 sm:mb-16 justify-center">
          <img src="https://res.cloudinary.com/dkkawe9gq/image/upload/v1749964887/NISM_CERTIFICATE_MFD_page-0001_p3b5ud.webp" alt="" className="w-[80%] md:w-[50%] rounded-xl border border-zinc-500 shadow-xl shadow-zinc-900 p-1"/>
        </div>

        {/* Founder's Journey */}
        <div className="mb-16 sm:mb-20 max-w-7xl mx-auto">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6 lg:p-8 shadow-xl backdrop-blur-md backdrop-filter">
            <h2 className="mb-6 sm:mb-8 text-2xl sm:text-3xl font-bold text-white text-center sm:text-left">My Journey</h2>

            <div className="space-y-6 sm:space-y-8">
              <JourneyStep
                icon={<TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400" />}
                title="The Beginning"
                content="My journey into the stock market began during the COVID-19 pandemic, inspired by a simple social media post. At a time when most businesses worldwide had come to a standstill, the stock market remained active. It was clear that individuals with the right knowledge and skills could still generate consistent income. This sparked my interest in learning and eventually pursuing trading professionally."
              />

              <JourneyStep
                icon={<BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-green-400" />}
                title="The Reality"
                content="Initially, like many beginners, I believed the myth often portrayed on social media – that quick and easy profits were achievable. However, reality proved to be far different. After two to three years of hard work, research, and learning, I realized the importance of gaining the correct knowledge."
              />

              <JourneyStep
                icon={<BarChart3 className="h-6 w-6 sm:h-8 sm:w-8 text-purple-400" />}
                title="The System"
                content="I developed my own trading system after understanding a fundamental principle of the stock market: 'Following a flawed system will lead to failure, but adhering to a proven system with discipline can significantly increase your chances of success.'"
              />

              <JourneyStep
                icon={<LineChart className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400" />}
                title="The Expertise"
                content="Today, I have honed my expertise in intraday trading and investing, backed by years of trial, error, and disciplined practice. My approach emphasizes the importance of realistic expectations. Unlike the common misconception of generating 15-20% returns every month, I advocate for a sustainable mindset. Setting reasonable goals, such as a monthly return of 4-7%, ensures consistent growth without undue stress."
              />
            </div>
          </div>
        </div>

        {/* Mission section */}
        <div className="max-w-7xl mx-auto mb-16 sm:mb-20">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6 lg:p-8 shadow-xl backdrop-blur-md backdrop-filter">
            <h2 className="mb-4 sm:mb-6 text-2xl sm:text-3xl font-bold text-white text-center sm:text-left">Our Mission</h2>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              Our mission is to help individuals like you navigate the stock market with the right tools, strategies,
              and expectations. By combining practical knowledge with disciplined execution, we aim to make the stock
              market a reliable source of wealth creation for everyone.
            </p>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center pb-16 sm:pb-20">
          <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 lg:p-10 backdrop-blur-md backdrop-filter">
            <h2 className="mb-4 sm:mb-6 text-2xl sm:text-3xl font-bold text-white">Join Our Journey</h2>
            <p className="mb-6 sm:mb-8 text-base sm:text-lg text-gray-300 leading-relaxed">
              Join us on this journey of financial empowerment, and let's unlock the potential of the stock market
              together!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-x-4 items-start sm:items-end text-start">
              <Input
                name="email"
                label="Email"
                required
                placeholder="Write your email to subscribe to get more updates"
                type="email"
                divClasses="w-full text-white"
                innerDivClasses="bg-white/5"
                inputClasses="py-2 sm:py-1 px-2 text-xs sm:text-xs"
              />
              <Button
                btnClass="w-full sm:w-auto rounded-md px-4 sm:px-6 py-3 border-b bg-white/5 border-zinc-400 gap-x-1 text-white hover:bg-white/10 hover:scale-105 transition text-sm sm:text-xs"
                handler={() => { }}
                name="Subscribe"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Aboutus