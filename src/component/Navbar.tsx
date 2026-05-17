import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import LoginModal from "../layout/LoginModal";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { logout } from "../redux/authSlice";

const Navbar = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn, email } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const handleLogout = () =>{
    dispatch(logout());
    navigate("/")
  }

  const handleCloseModal = () => {
    setShowLoginModal(false);
  };

  return (
    <>
      <div className="flex justify-between items-center py-6 px-8 max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center text-xl font-bold tracking-[0.2em] gap-3 uppercase text-gray-800"
        >
          {" "}
          <img
            src={logo}
            height={32}
            width={32}
            className="opacity-90"
          />{" "}
          Travel With Us
        </Link>

        <div className="flex gap-10 items-center text-sm font-semibold uppercase tracking-widest text-gray-600">
          <Link to="/pricing" className="hover:text-gray-900 transition-colors">Pricing</Link>
          <Link to="/product" className="hover:text-gray-900 transition-colors">Product</Link>
          {isLoggedIn ? (
            <div className="flex items-center gap-6">
              <span className="text-xs font-bold text-gray-400 tracking-normal normal-case">{email}</span>
              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-red-500 text-white rounded-full text-xs hover:bg-red-600 transition-all shadow-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowLoginModal(true)}
              className="px-8 py-2.5 bg-gray-900 text-white rounded-full text-xs hover:bg-gray-800 transition-all shadow-lg"
            >
              Login
            </button>
          )}
        </div>
      </div>
      {showLoginModal && <LoginModal onClose={handleCloseModal} />}
    </>
  );
};

export default Navbar;
