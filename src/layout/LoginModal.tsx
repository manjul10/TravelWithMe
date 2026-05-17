import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

interface LoginModalProps {
  onClose: () => void;
}

const LoginModal = ({ onClose }: LoginModalProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === "traveller@example.com" && password === "password") {
      dispatch(login(email));
      onClose();
      navigate("/app/cities");
    }else{
      alert("Invalid Credentials!")
    }
  };

  

  return (
    <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex items-center justify-center z-[5000] p-4">
      <div className="bg-white p-10 rounded-[3rem] shadow-2xl w-full max-w-md relative animate-in fade-in zoom-in duration-300">
        <button
          onClick={onClose}
          className="absolute top-8 right-8 text-gray-400 hover:text-gray-900 transition-colors p-2 hover:bg-gray-100 rounded-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <form onSubmit={handleLogin} className="space-y-8">
          <div className="space-y-2">
             <h2 className="text-xs font-bold tracking-[0.3em] text-gray-400 uppercase">/ Authorization /</h2>
             <h1 className="text-4xl font-serif text-gray-900">Login</h1>
          </div>

          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-gray-900 transition-all outline-none"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-gray-900 transition-all outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 text-white p-4 rounded-full font-bold text-xs tracking-widest hover:bg-gray-800 transition-all shadow-xl transform active:scale-95"
          >
            CONTINUE
          </button>
        </form>
      </div>
    </div>
  );

};

export default LoginModal;
