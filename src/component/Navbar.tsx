import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"
import LoginModal from "../layout/LoginModal";

const Navbar = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleCloseModal = () => {
    setShowLoginModal(false);
  };

  return (
    <>
      <div className="flex justify-between items-center mt-2.5 max-w-7xl mx-auto  ">
        <div className="flex gap-2.5 items-center">
          <Link to="/"> <img src={logo} height={50} width={50} className="bg-[#f8f4eb] fill"/></Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/product">Product</Link>
        </div>
        <button 
          onClick={handleLoginClick}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Login
        </button>
      </div>
      {showLoginModal && <LoginModal onClose={handleCloseModal} />}
    </>
  );
};

export default Navbar;
