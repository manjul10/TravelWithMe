import { NavLink } from "react-router-dom";

const AppNav = () => {
  return (
    <nav className="flex flex-col gap-1.5 px-2">
      <NavLink
        to="cities"
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
            isActive
              ? "bg-purple-600 text-white shadow-lg shadow-purple-200"
              : "text-gray-500 hover:bg-purple-50 hover:text-purple-600"
          }`
        }
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span>Cities List</span>
      </NavLink>

      <NavLink
        to="countries"
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
            isActive
              ? "bg-purple-600 text-white shadow-lg shadow-purple-200"
              : "text-gray-500 hover:bg-purple-50 hover:text-purple-600"
          }`
        }
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Countries</span>
      </NavLink>

      <NavLink
        to="insight"
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
            isActive
              ? "bg-purple-600 text-white shadow-lg shadow-purple-200"
              : "text-gray-500 hover:bg-purple-50 hover:text-purple-600"
          }`
        }
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <span>AI Insights</span>
      </NavLink>
    </nav>
  );
};

export default AppNav;
