import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { ShieldCheck, Lock, Mail, Eye, EyeOff, Loader2, AlertCircle, ArrowLeft } from "lucide-react";
import Logo from "@/components/Logo";
import SEO from "@/components/SEO";
import { Reveal } from "@/components/Reveal";
import { adminLogin, isAdminAuthenticated } from "@/lib/adminApi";

const AdminLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/admin";

  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // If already logged in, redirect to admin
  if (isAdminAuthenticated()) {
    navigate(from, { replace: true });
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!usernameOrEmail.trim() || !password) {
      setError("Please enter both username/email and password.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      await adminLogin(usernameOrEmail, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || "Invalid login credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Admin Portal Login | MR AI Software Technologies"
        description="Secure administrator access to manage inquiries, leads, and platform activities."
        path="/admin/login"
      />

      <section className="min-h-screen relative pt-28 pb-16 lg:pt-36 lg:pb-24 grid-pattern flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 hero-glow opacity-80" aria-hidden="true" />

        <div className="container-x relative max-w-md w-full px-4">
          <Reveal>
            <div className="mb-6 flex justify-between items-center">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-electric transition-colors"
              >
                <ArrowLeft size={14} />
                Back to Website
              </Link>
              <span className="eyebrow flex items-center gap-1.5">
                <ShieldCheck size={13} className="text-electric" />
                Staff Portal
              </span>
            </div>

            <div className="card-dark border border-white/10 p-7 sm:p-9 shadow-2xl relative backdrop-blur-xl">
              <div className="flex flex-col items-center text-center mb-8">
                <Link to="/" aria-label="MR AI Homepage" className="mb-3">
                  <Logo />
                </Link>
                <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Admin Sign In
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Access client queries, leads & early access requests
                </p>
              </div>

              {error && (
                <div
                  role="alert"
                  className="mb-5 flex items-start gap-3 rounded-xl border border-rose-500/40 bg-rose-500/10 p-3.5 text-xs text-rose-300"
                >
                  <AlertCircle size={16} className="shrink-0 mt-0.5 text-rose-400" />
                  <p>{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                    Email or Username
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text"
                      value={usernameOrEmail}
                      onChange={(e) => {
                        setUsernameOrEmail(e.target.value);
                        setError("");
                      }}
                      placeholder="admin@mrai.in or admin"
                      autoComplete="username"
                      required
                      className="w-full bg-navy-800/80 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-electric/60 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider">
                      Password
                    </label>
                  </div>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError("");
                      }}
                      placeholder="••••••••••••"
                      autoComplete="current-password"
                      required
                      className="w-full bg-navy-800/80 border border-white/10 rounded-xl pl-10 pr-11 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-electric/60 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-2 bg-royal hover:bg-royal-600 active:scale-[0.99] text-white font-medium py-3 px-5 rounded-xl transition-all shadow-lg shadow-royal/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        <ShieldCheck size={16} />
                        Sign In to Dashboard
                      </>
                    )}
                  </button>
                </div>
              </form>

              <div className="mt-6 pt-5 border-t border-white/[0.08] text-center">
                <p className="text-xs text-slate-500">
                  Default credentials: <code className="text-electric font-mono bg-white/[0.05] px-1.5 py-0.5 rounded">admin</code> / <code className="text-electric font-mono bg-white/[0.05] px-1.5 py-0.5 rounded">Admin@MR2026!</code>
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default AdminLogin;
