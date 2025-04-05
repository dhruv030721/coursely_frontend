import { Header } from "@/components"
import { Outlet } from "react-router-dom"
import Marquee from "react-fast-marquee";

const Layout = () => {
  return (
    <div className="bg-black h-screen font-geist">
      <Marquee className="bg-black text-white text-sm  font-bold py-2 font-dm_sans" speed={50} gradient={false}><span className="font-geist text-lg text-yellow-500 mr-1">20%</span>OFF on new course🎉</Marquee>
      <Header />
      <Outlet />
    </div>
  )
}

export default Layout
