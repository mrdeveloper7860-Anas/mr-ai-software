import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowRight, ShieldCheck } from "lucide-react";
import Logo from "@/components/Logo";
import { NAV_LINKS } from "@/lib/site";
import { isAdminAuthenticated } from "@/lib/adminApi";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsAuth(isAdminAuthenticated());
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      data-testid="navbar"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? "bg-navy/85 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="container-x flex items-center justify-between h-[72px]" aria-label="Main navigation">
        <Link to="/" data-testid="navbar-brand-logo" aria-label="MR AI — Home" className="shrink-0">
          <Logo />
        </Link>

        <ul className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                data-testid={link.testid}
                className={({ isActive }) =>
                  `px-3.5 py-2 text-sm font-medium rounded-lg transition-colors duration-300 ${
                    isActive ? "text-white bg-white/[0.07]" : "text-slate-400 hover:text-white hover:bg-white/[0.05]"
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <Link
            to={isAuth ? "/admin" : "/admin/login"}
            data-testid="navbar-admin-login-btn"
            className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:border-electric/50 text-slate-300 hover:text-white text-xs sm:text-sm font-medium transition-all duration-300"
          >
            <ShieldCheck size={15} className="text-electric" />
            <span>{isAuth ? "Dashboard" : "Admin Login"}</span>
          </Link>

          <Link
            to="/contact"
            data-testid="navbar-cta-consultation"
            className="hidden lg:inline-flex items-center gap-2 bg-royal hover:bg-royal-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors duration-300"
          >
            Request a Consultation
            <ArrowRight size={15} />
          </Link>
          <button
            type="button"
            data-testid="navbar-mobile-toggle"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-xl border border-white/10 text-white hover:bg-white/[0.06] transition-colors"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="navbar-mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden bg-navy/95 backdrop-blur-xl border-b border-white/10"
          >
            <ul className="container-x py-4 space-y-1">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.to}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.3 }}
                >
                  <NavLink
                    to={link.to}
                    data-testid={`mobile-${link.testid}`}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-xl text-base font-medium ${
                        isActive ? "text-white bg-white/[0.08]" : "text-slate-300 hover:bg-white/[0.05]"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.li>
              ))}
              <li className="pt-2">
                <Link
                  to={isAuth ? "/admin" : "/admin/login"}
                  className="flex items-center justify-center gap-2 border border-white/10 bg-white/[0.04] text-slate-200 hover:text-white font-medium px-5 py-3 rounded-xl text-sm"
                >
                  <ShieldCheck size={16} className="text-electric" />
                  <span>{isAuth ? "Admin Dashboard" : "Admin Login"}</span>
                </Link>
              </li>
              <li className="pt-1">
                <Link
                  to="/contact"
                  data-testid="mobile-navbar-cta-consultation"
                  className="flex items-center justify-center gap-2 bg-royal text-white font-semibold px-5 py-3.5 rounded-xl"
                >
                  Request a Consultation <ArrowRight size={16} />
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
