"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, LogIn, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!password) {
      setError("Password is required!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setTimeout(() => {
          router.replace("/dashboard");
        }, 500);
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Network error or server unavailable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/m.png')",
        }}
      >
        {/* Light overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/10"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Login Card - Transparent Background */}
          <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-blue-950/20 p-8 shadow-2xl">
            {/* Card Header */}
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-950/10 to-blue-900/10">
                <Lock className="h-8 w-8 text-blue-950" />
              </div>
              <h2 className="mb-2 font-sans text-2xl font-semibold text-blue-950">
                Admin Login
              </h2>
              <p className="font-sans text-sm text-blue-950/80">
                Enter your password to access the dashboard
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 animate-slideIn rounded-xl bg-red-100/80 border border-red-300 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
                    <svg className="h-4 w-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="font-sans text-sm font-medium text-red-700">{error}</p>
                </div>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLogin}>
              {/* Password Input */}
              <div className="mb-6">
                <label className="mb-2 block font-sans text-sm font-medium text-blue-950">
                  Password
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Lock className="h-5 w-5 text-blue-950/60" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="font-sans w-full rounded-xl  bg-white py-3.5 pl-10 pr-12 text-blue-950 placeholder-blue-950/50"
                    placeholder="Enter your password"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-blue-950/60 hover:text-blue-950" />
                    ) : (
                      <Eye className="h-5 w-5 text-blue-950/60 hover:text-blue-950" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
          <button
  type="submit"
  disabled={loading}
  className={`font-sans w-full rounded-xl
  bg-blue-950 text-white
  
  py-3.5 font-medium shadow-lg
  transition-all duration-300
  ${
    loading
      ? "cursor-not-allowed opacity-70"
      : "hover:bg-white hover:text-blue-950 hover:border-blue-950 hover:scale-[1.02] hover:shadow-xl"
  }`}
>

                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Authenticating...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <LogIn className="h-5 w-5" />
                    Login to Dashboard
                  </span>
                )}
              </button>

              {/* Help Text */}
              <div className="mt-6 text-center">
                <p className="font-sans text-xs text-blue-950/70">
                  This is a secured admin panel. Unauthorized access is prohibited.
                </p>
                <p className="mt-1 font-sans text-xs text-blue-950/50">
                  © {new Date().getFullYear()} Hisar Medical Diagnostic & Hospitals LLP
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateY(-10px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}