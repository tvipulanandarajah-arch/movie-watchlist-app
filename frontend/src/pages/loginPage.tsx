import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import Button from "../components/atoms/button";
import Input from "../components/atoms/input";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email.trim() || !password.trim()) return;
    try {
      await login({ email, password });
      navigate("/");
    } catch {
      // error is handled in AuthContext
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div
      className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center"
      onKeyDown={handleKeyDown}
    >
      <div className="bg-gray-800 rounded-2xl p-8 w-full max-w-md shadow-2xl border border-gray-700">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">🎬 MovieMark</h1>
          <p className="text-gray-400">Sign in to your account</p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg mb-6 flex items-center justify-between">
            <span className="text-sm">{error}</span>
            <button onClick={clearError} className="text-red-400 hover:text-red-300">✕</button>
          </div>
        )}

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="text-gray-400 text-sm mb-1 block">Email</label>
            <Input
              value={email}
              onChange={setEmail}
              placeholder="Enter your email"
              type="email"
              fullWidth
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="text-gray-400 text-sm mb-1 block">Password</label>
            <Input
              value={password}
              onChange={setPassword}
              placeholder="Enter your password"
              type="password"
              fullWidth
              disabled={isLoading}
            />
          </div>

          <div className="pt-2">
            <Button
              label={isLoading ? "Signing in..." : "Sign In"}
              onClick={handleSubmit}
              disabled={isLoading || !email.trim() || !password.trim()}
              variant="primary"
              fullWidth
            />
          </div>
        </div>

        {/* Register Link */}
        <p className="text-center text-gray-400 text-sm mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-400 hover:text-blue-300 font-medium">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;