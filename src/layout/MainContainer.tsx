import Map from "./Map";
import Sidebar from "./Sidebar";

import { useState } from "react";

const MainContainer = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className="flex h-screen bg-[#F8F9FA] overflow-hidden relative">
      {/* Sidebar with dynamic width */}
      <div 
        className={`fixed inset-y-0 left-0 z-[2000] transition-all duration-300 transform ${
          isSidebarOpen ? "translate-x-0 w-80" : "-translate-x-full w-80"
        } lg:relative lg:translate-x-0 lg:block`}
      >
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>
      
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 lg:px-8 shrink-0 z-[1001]">
           <div className="flex items-center gap-4">
              <button 
                onClick={toggleSidebar}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              
              <div className="hidden sm:flex items-center relative w-64 lg:w-96">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </span>
                <input 
                  type="text" 
                  placeholder="Search your journeys..." 
                  className="w-full bg-gray-50 border-none rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-purple-500 transition-all outline-none"
                />
              </div>
           </div>
           
           <div className="flex items-center gap-3 lg:gap-6">
              <div className="hidden md:flex gap-4 text-gray-400">
                <button className="hover:text-purple-600 transition-colors">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                   </svg>
                </button>
              </div>
              <div className="flex items-center gap-2 lg:gap-3 border-l pl-4 lg:pl-6 border-gray-100">
                 <div className="text-right hidden sm:block">
                    <p className="text-sm font-semibold text-gray-900 leading-none mb-1">Alex John</p>
                    <p className="text-[10px] text-gray-500 leading-none font-bold uppercase tracking-wider">Explorer</p>
                 </div>
                 <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-purple-100 overflow-hidden border-2 border-white shadow-sm ring-1 ring-purple-100">
                    <img src="https://i.pravatar.cc/100" alt="avatar" />
                 </div>
              </div>
           </div>
        </header>

        {/* Map Area */}
        <main className="flex-1 relative">
          <Map onMapClick={() => setIsSidebarOpen(true)} />
        </main>
      </div>
    </div>
  );
};

export default MainContainer;
