import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import { useNvigation } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigation = useNvigation();

const handleLogin = (e: React.FormEvent) => { 
  e.preventDefault();
 
  if (email === "user@example.com" && password === "password") {   
    dispatch(login(email));
    navigation("/"); 
  }
};

  return (  
    <div className = "min-h-screen flex items-center justify-center bg-gray-100">
      <form 
      onSubmit={handleLogin} 
      className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 className= "text-2xl font-bold mb-4">Login</h1>

      <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full p-3 mb-4 border rounded"
      />

      <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full p-3 mb-4 border rounded"
      />

      <button 
      type="submit"
      className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600"
      >
      Login
      </button>
      </form>
    </div>
  );
};
export default Login;