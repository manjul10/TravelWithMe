import { useState } from "react";
import bgImage from "../assets/bg.jpg";
import heroImage from "../assets/hero.png";
import LoginModal from "../layout/LoginModal";

const Home = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <>
      <div className="max-w-7xl mx-auto px-8 py-12 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          {/* Left Content */}
          <div className="flex-1 space-y-12">
            <div className="space-y-6">
              <h2 className="text-sm font-bold tracking-[0.4em] text-gray-400 uppercase">
                / We track your adventures /
              </h2>
              <h1 className="text-6xl lg:text-8xl font-serif text-gray-900 leading-tight">
                THE <br />
                <span className="italic">PERFECT</span> <br />
                JOURNEY
              </h1>
              <p className="text-lg text-gray-500 max-w-md leading-relaxed">
                WorldWise keeps track of your footsteps into every city you can think of. Never forget your wonderful experiences.
              </p>
            </div>

            <button
              onClick={() => setShowLoginModal(true)}
              className="px-12 py-4 bg-gray-900 text-white rounded-full font-bold text-sm tracking-widest hover:bg-gray-800 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              START
            </button>
          </div>

          {/* Right Content - Visual Card */}
          <div className="flex-1 relative w-full max-w-2xl">
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl transform lg:rotate-2 hover:rotate-0 transition-transform duration-500 aspect-[4/3]">
              <img
                src={bgImage}
                alt="Travel Background"
                className="object-cover h-full w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              
              {/* Floating Info Card */}
              <div className="absolute top-10 right-10 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xl max-w-[200px] space-y-3">
                <h3 className="font-bold text-sm text-gray-900">Unique routes & memories</h3>
              </div>
            </div>
            
            {/* Secondary Image Overlay (like the house in reference) */}
            <div className="absolute -bottom-10 -left-10 w-2/3 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-[#f8f4eb] hidden lg:block">
              <img src={heroImage} alt="Hero" className="w-full h-full object-cover aspect-video" />
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-32 flex flex-col lg:flex-row items-end justify-between gap-12 border-t border-gray-200 pt-12">
          <div className="space-y-4 max-w-xs">
             <div className="bg-orange-200/50 p-6 rounded-[2rem] space-y-2">
                <h4 className="font-bold text-orange-800 text-sm">Best Locations</h4>
                <p className="text-xs text-orange-700/80 font-medium">We combine nature and travel comfort in every step of your journey.</p>
             </div>
          </div>
          
          <div className="flex items-center gap-8">
             <div className="flex -space-x-3">
                <img src="https://i.pravatar.cc/100?u=1" className="w-10 h-10 rounded-full border-2 border-[#f8f4eb]" alt="user" />
                <img src="https://i.pravatar.cc/100?u=2" className="w-10 h-10 rounded-full border-2 border-[#f8f4eb]" alt="user" />
             </div>
             <div>
                <p className="text-3xl font-serif italic text-gray-900 leading-none">12m+</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Customers</p>
             </div>
             <div className="max-w-[200px]">
                <p className="text-sm font-bold text-gray-800 leading-tight">WE CAN COMBINE NATURE & TRAVEL COMFORT</p>
             </div>
          </div>
        </div>
      </div>
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
    </>
  );
};

export default Home;

