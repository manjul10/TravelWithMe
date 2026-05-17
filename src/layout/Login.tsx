import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === "user@example.com" && password === "password") {
      dispatch(login(email));
      navigation("/");
    }
  };

  return (
    <div className="flex items-center justify-center py-24 bg-[#f8f4eb] min-h-screen">
      <form
        onSubmit={handleLogin}
        className="bg-white p-10 rounded-[2.5rem] shadow-2xl w-full max-w-md space-y-8"
      >
        <div className="space-y-2">
           <h2 className="text-xs font-bold tracking-[0.3em] text-gray-400 uppercase">/ Welcome Back /</h2>
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
          className="w-full bg-gray-900 text-white p-4 rounded-full font-bold text-xs tracking-widest hover:bg-gray-800 transition-all shadow-lg"
        >
          CONTINUE
        </button>
      </form>
    </div>

  );
};

export default Login;