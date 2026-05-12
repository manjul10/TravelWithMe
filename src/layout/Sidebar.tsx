import { Outlet } from "react-router-dom";
import logo from "../assets/logo.png";
import AppNav from "../component/AppNav";
const Sidebar = () => {
  return (
    <div className="bg-[#2d3439] text-white h-screen p-8 flex flex-col">
      <div className="flex items-center justify-center gap-4 mb-10">
        <img src={logo} alt="logo" className="h-14 w-14" />
        <span className="text-4xl font-bold tracking-widest text-gray-100">
          Travel With Us
        </span>
      </div>
      <AppNav />
      <div className="mt-8 grow overflow-y-auto">
        <Outlet />
      </div>
      <footer className="mt-auto text-center text-sm text-gray-400 pt-4">
        <p>
          &copy; Copyright {new Date().getFullYear()} by Travel With Us Inc.
        </p>
      </footer>
    </div>
  );
};

export default Sidebar;
