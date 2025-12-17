import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate(from, { replace: true });
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-[#1a1a1a] rounded-2xl p-8 border border-gray-800 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#FAD502] mb-2">Veertri</h1>
          <p className="text-gray-400">Your Learning Companion</p>
          <div className="text-left text-sm text-gray-500 mt-4">
            <p>Use any username and password to login</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <label className="block text-gray-400 text-sm font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FAD502] transition-colors"
              placeholder="Enter mock username"
              required
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FAD502] transition-colors"
              placeholder="Enter mock password"
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-[#FAD502] text-black font-bold py-3 rounded-lg hover:bg-[#e5c302] transition-colors"
          >
            Sign In
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default Login;
