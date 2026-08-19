import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-[#F3F4F6]">
      {/* Pinned top navigation */}
      <Navbar />

      {/* Main page content area */}
      <main className="flex flex-1 w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
