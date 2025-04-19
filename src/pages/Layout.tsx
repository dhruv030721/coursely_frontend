import { Footer, Header } from "@/components"
import { Outlet } from "react-router-dom"
import Marquee from "react-fast-marquee";

const Layout = () => {
  return (
    <div className="bg-black h-screen font-geist scrollbar-custom">
      <Marquee className="bg-black text-white text-sm font-bold py-2 font-dm_sans" speed={50} gradient={false}><span className="text-lg text-yellow-500 mr-1">20%</span>OFF for New User🎉</Marquee>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout
