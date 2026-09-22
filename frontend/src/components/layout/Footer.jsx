import { Link } from "react-router-dom";
import { Linkedin, Instagram, Facebook, Youtube, Github, Mail, Phone, MapPin } from "lucide-react";
import Logo from "@/components/Logo";
import { COMPANY, SOCIALS } from "@/lib/site";

const SOCIAL_ICONS = { LinkedIn: Linkedin, Instagram, Facebook, YouTube: Youtube, GitHub: Github };

const COLUMNS = [
  {
    title: "Solutions",
    links: [
      { label: "Custom Software", to: "/solutions" },
      { label: "Business Automation", to: "/solutions" },
      { label: "Cloud Solutions", to: "/solutions" },
      { label: "Web & Mobile", to: "/solutions" },
      { label: "Digital Transformation", to: "/solutions" },
    ],
  },
  {
    title: "Products",
    links: [
      { label: "MR AI Fee Management", to: "/products/fee-management" },
      { label: "MR EduTech", to: "/products/edutech" },
      { label: "MR HealthTech", to: "/products/healthtech" },
      { label: "MR Commerce", to: "/products/commerce" },
      { label: "MR AI Assistant", to: "/products/ai-assistant" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About MR AI", to: "/about" },
      { label: "AI & Automation", to: "/ai-automation" },
      { label: "Portfolio", to: "/portfolio" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", to: "/privacy-policy" },
      { label: "Terms & Conditions", to: "/terms" },
      { label: "Admin Portal", to: "/admin" },
    ],
  },
];

const Footer = () => (
  <footer data-testid="footer" className="bg-[#0B0D14] border-t border-white/[0.07]">
    <div className="container-x py-16 lg:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
        <div className="lg:col-span-4">
          <Link to="/" aria-label="MR AI — Home"><Logo /></Link>
          <p className="mt-5 text-sm font-semibold text-slate-200">{COMPANY.legal}</p>
          <p className="mt-2 text-sm text-slate-500 leading-relaxed max-w-xs">{COMPANY.tagline}.</p>
          <ul className="mt-6 space-y-3 text-sm text-slate-400">
            <li className="flex items-center gap-3">
              <Mail size={15} className="text-electric shrink-0" />
              <a data-testid="footer-email-link" href={`mailto:${COMPANY.email}`} className="hover:text-white transition-colors">{COMPANY.email}</a>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={15} className="text-electric shrink-0" />
              <a data-testid="footer-phone-link" href={COMPANY.phoneHref} className="hover:text-white transition-colors">{COMPANY.phone}</a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={15} className="text-electric shrink-0 mt-0.5" />
              <span>{COMPANY.location}</span>
            </li>
          </ul>
          <div className="mt-6 flex items-center gap-2">
            {SOCIALS.map((name) => {
              const Icon = SOCIAL_ICONS[name];
              return (
                <span
                  key={name}
                  data-testid={`footer-social-${name.toLowerCase()}`}
                  title={`${name} — coming soon`}
                  aria-label={`${name} profile (coming soon)`}
                  className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-slate-500 cursor-not-allowed"
                >
                  <Icon size={16} />
                </span>
              );
            })}
          </div>
          <p className="mt-3 text-xs text-slate-600">Social profiles launching soon.</p>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title} className="lg:col-span-2">
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-slate-500">{col.title}</h3>
            <ul className="mt-5 space-y-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm text-slate-400 hover:text-electric transition-colors duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-14 pt-8 border-t border-white/[0.07] flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-slate-500 text-center sm:text-left">
          © 2026 {COMPANY.legal}. All rights reserved.
        </p>
        <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 text-xs font-mono text-slate-500 text-center sm:text-right">
          <span>{COMPANY.tagline2}</span>
          <span className="text-white/20">•</span>
          <Link to="/admin" className="text-slate-500 hover:text-electric transition-colors">
            Staff Portal
          </Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
