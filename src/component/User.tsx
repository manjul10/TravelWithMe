import { logout } from "../redux/authSlice";
import { useAppDispatch } from "../hooks/hooks";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

const User = () => {
    const { email } = useSelector((state: RootState) => state.auth);
  
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const name = email ? email.split("@")[0] : "Handsome";
  return (
    <div
      className="absolute top-8 right-8 bg-[#2d3439] p-3 rounded-lg shadow-2xl
      z-1001 flex items-center gap-4 text-white"
    >
      <img
        src="https://i.pravatar.cc/100"
        alt="avatar"
        className="h-10 w-10 rounded-full border-2 border-gray-500"
      />
      <span className="font-bold text-sm">Welcome, {name}</span>
      <button
        onClick={handleLogout}
        className="bg-black/30 px-3 py-1 rounded text-[10px] uppercase font-bold
      hover:bg-black/60 transition-colors"
      >
        Logout
      </button>
    </div>
  );
};

export default User;
