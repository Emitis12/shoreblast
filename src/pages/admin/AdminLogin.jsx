
import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  LockKeyhole,
  Mail,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowLeft,
  Loader2,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

const AdminLogin = () => {
  const { user, isAdmin, loading, signIn } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#091b2b] text-white">
        <Loader2 className="animate-spin" size={32} />
      </div>
    );
  }

  if (user && isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSubmitting(true);

    try {
      await signIn(email.trim(), password);
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(
        err.message || "Unable to sign in. Please check your credentials."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#091b2b] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#183f5c] opacity-30 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#c69a55] opacity-10 blur-3xl" />

      <div className="relative w-full max-w-md">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-300 hover:text-[#c69a55] mb-8 text-sm transition"
        >
          <ArrowLeft size={17} />
          Back to Website
        </Link>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-[#10283f] px-8 py-9 text-center">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-5">
              <ShieldCheck size={34} className="text-[#c69a55]" />
            </div>

            <p className="text-[#c69a55] text-xs font-bold tracking-[0.3em] uppercase mb-2">
              Shore Blast Energy
            </p>

            <h1 className="text-white text-2xl font-bold">
              Administrator Portal
            </h1>

            <p className="text-gray-300 text-sm mt-2">
              Secure access to website management
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Administrator Email
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="email"
                  required
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter administrator email"
                  className="w-full border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-[#c69a55] focus:ring-2 focus:ring-[#c69a55]/20 transition"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full border border-gray-200 rounded-xl py-3.5 pl-12 pr-12 outline-none focus:border-[#c69a55] focus:ring-2 focus:ring-[#c69a55]/20 transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#10283f]"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div
                role="alert"
                className="mb-5 bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 text-sm"
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#10283f] hover:bg-[#183f5c] disabled:opacity-60 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition"
            >
              {submitting ? (
                <>
                  <Loader2 size={19} className="animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  <LockKeyhole size={18} />
                  Secure Login
                </>
              )}
            </button>

            <div className="mt-7 pt-6 border-t border-gray-100 text-center">
              <p className="text-xs text-gray-400">
                <ShieldCheck size={14} className="inline mr-1 text-green-600" />
                Restricted access · Authorized administrator only
              </p>
            </div>
          </form>
        </div>

        <p className="text-center text-gray-500 text-xs mt-6">
          © {new Date().getFullYear()} Shore Blast Energy. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
