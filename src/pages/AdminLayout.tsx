import { SideBar } from "@/components";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {

  return (
    <div className="min-h-screen flex text-white bg-zinc-950">

      {/* Sidebar */}
      <SideBar />

      {/* Main Section */}
      <Outlet />
    </div>
  );
};

export default AdminLayout;
