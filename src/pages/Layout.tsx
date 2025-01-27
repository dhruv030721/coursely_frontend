import { Header } from "@/components"
import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <div className="bg-black h-screen font-geist">
      <Header />
      <Outlet />
    </div>
  )
}

export default Layout
