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
      <div className="flex justify-between items-center mt-2.5 p-3 max-w-7xl mx-auto  ">
        <Link
          to="/"
          className="flex items-center text-2xl font-bold tracking-widest gap-3"
        >
          {" "}
          <img
            src={logo}
            height={50}
            width={50}
            className="bg-[#f8f4eb] fill"
          />{" "}
          Travel With Us
        </Link>

        <div className="flex gap-8 items-center text-xl font-normal">
          <Link to="/pricing">Pricing</Link>
          <Link to="/product">Product</Link>
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">{email}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowLoginModal(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
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
