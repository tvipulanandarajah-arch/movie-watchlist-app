import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import Button from "../components/atoms/button";
import Input from "../components/atoms/input";

const RegisterPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);
  const { register, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLocalError(null);

    if (!name.trim() || !email.trim() || !password.trim()) {
      setLocalError("All fields are required");
      return;
    }
    if (password !== confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setLocalError("Password must be at least 6 characters");
      return;
    }

    try {
      await register({ name, email, password });
      navigate("/");
    } catch {
      // error handled in AuthContext
    }
  };

  const displayError = localError || error;

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 rounded-2xl p-8 w-full max-w-md shadow-2xl border border-gray-700">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">🎬 MovieMark</h1>
          <p className="text-gray-400">Create your account</p>
        </div>

        {/* Error */}
        {displayError && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg mb-6 flex items-center justify-between">
            <span className="text-sm">{displayError}</span>
            <button
              onClick={() => { setLocalError(null); clearError(); }}
              className="text-red-400 hover:text-red-300"
            >✕</button>
          </div>
        )}

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="text-gray-400 text-sm mb-1 block">Name</label>
            <Input value={name} onChange={setName} placeholder="Your name" fullWidth disabled={isLoading} />
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-1 block">Email</label>
            <Input value={email} onChange={setEmail} placeholder="Your email" type="email" fullWidth disabled={isLoading} />
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-1 block">Password</label>
            <Input value={password} onChange={setPassword} placeholder="Min 6 characters" type="password" fullWidth disabled={isLoading} />
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-1 block">Confirm Password</label>
            <Input value={confirmPassword} onChange={setConfirmPassword} placeholder="Repeat password" type="password" fullWidth disabled={isLoading} />
          </div>

          <div className="pt-2">
            <Button
              label={isLoading ? "Creating account..." : "Create Account"}
              onClick={handleSubmit}
              disabled={isLoading}
              variant="primary"
              fullWidth
            />
          </div>
        </div>

        {/* Login Link */}
        <p className="text-center text-gray-400 text-sm mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;