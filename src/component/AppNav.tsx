import { NavLink } from "react-router-dom";

const AppNav = () => {
  return (
    <div>
      <ul className="flex justify-around bg-white p-4 rounded-lg text-black">
        <li>
          <NavLink
            to="cities"
            className={({ isActive }) =>
              `px-6 py-2 rounded-md uppercase text-sm font-semibold tracking-wider
      transition-colors ${
        isActive
          ? "bg-[#242a2e] text-white"
          : "text-gray-900 hover:bg-[#3a4045]"
      }`
            }
          >
            Cities
          </NavLink>
        </li>
        <li>
          <NavLink
            to="countries"
            className={({ isActive }) =>
              `px-6 py-2 rounded-md uppercase text-sm font-semibold tracking-wider
      transition-colors ${
        isActive
          ? "bg-[#242a2e] text-white"
          : "text-gray-900 hover:bg-[#3a4045]"
      }`
            }
          >
            Countries
          </NavLink>
        </li>
        <li>
          <NavLink
            to="insight"
            className={({ isActive }) =>
              `px-6 py-2 rounded-md uppercase text-sm font-semibold tracking-wider
      transition-colors ${
        isActive
          ? "bg-[#242a2e] text-white"
          : "text-gray-900 hover:bg-[#3a4045]"
      }`
            }
          >
           Insight
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default AppNav;
