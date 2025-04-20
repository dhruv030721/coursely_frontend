import { Footer, Header } from "@/components"
import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <div className="bg-black h-screen font-geist scrollbar-custom">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout
