import { Outlet } from "react-router-dom";
import logo from "../assets/logo.png";
import AppNav from "../component/AppNav";
const Sidebar = ({ onClose }: { onClose?: () => void }) => {
  return (
    <div className="bg-white border-r border-gray-100 h-full flex flex-col shadow-2xl lg:shadow-sm">
      {/* Brand Header */}
      <div className="p-8 flex items-center justify-between bg-gray-50/50">
        <div className="flex items-center gap-4">
          <div className="bg-purple-600 p-3 rounded-2xl shadow-xl shadow-purple-100 transform -rotate-3 hover:rotate-0 transition-transform cursor-pointer">
            <img src={logo} alt="logo" className="h-6 w-6 brightness-0 invert" />
          </div>
          <div>
            <h1 className="text-xl font-black text-gray-900 leading-none tracking-tight">
              Travel
            </h1>
            <p className="text-[10px] font-extrabold text-purple-600 uppercase tracking-[0.3em] mt-1">
              With Us
            </p>
          </div>
        </div>
        
        {/* Mobile Close Button */}
        <button 
          onClick={onClose}
          className="lg:hidden p-2 hover:bg-gray-200 rounded-full transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      {/* Navigation & Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-4 py-6">
        <section className="mb-10">
          <h3 className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">
            Exploration
          </h3>
          <AppNav />
        </section>

        <section className="bg-purple-50/50 rounded-3xl p-4 border border-purple-100/50">
           <h3 className="px-2 text-[10px] font-bold text-purple-400 uppercase tracking-[0.2em] mb-4">
            Location Details
          </h3>
          <div className="min-h-[200px]">
            <Outlet />
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="p-6 border-t border-gray-50 bg-gray-50/30">
        <div className="flex flex-col items-center gap-2">
          <p className="text-[10px] text-gray-400 font-medium italic">
            &copy; {new Date().getFullYear()} Travel With Us Inc.
          </p>
          <div className="flex gap-4">
             <div className="w-1.5 h-1.5 rounded-full bg-purple-200"></div>
             <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
             <div className="w-1.5 h-1.5 rounded-full bg-purple-200"></div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Sidebar;
