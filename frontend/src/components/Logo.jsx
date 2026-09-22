const LogoMark = ({ size = 38 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" role="img" aria-label="MR AI logo">
    <defs>
      <linearGradient id="mrai-mark" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#0057D9" />
        <stop offset="1" stopColor="#0B2A5B" />
      </linearGradient>
      <linearGradient id="mrai-trace" x1="6" y1="40" x2="42" y2="10" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#00E5FF" />
        <stop offset="1" stopColor="#3D85E8" />
      </linearGradient>
    </defs>
    <rect x="1.5" y="1.5" width="45" height="45" rx="12" fill="url(#mrai-mark)" stroke="rgba(255,255,255,0.18)" />
    <text x="24" y="30" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="17" fill="#FFFFFF" letterSpacing="-0.5">MR</text>
    <path d="M8 37 H17 L21 33 H28 L32 37 H40" stroke="url(#mrai-trace)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="8" cy="37" r="1.8" fill="#00E5FF" />
    <circle cx="40" cy="37" r="1.8" fill="#00E5FF" />
    <circle cx="28" cy="33" r="2.1" fill="#D4AF37" />
  </svg>
);

const Logo = ({ compact = false }) => (
  <span className="inline-flex items-center gap-2.5">
    <LogoMark />
    {!compact && (
      <span className="text-lg font-extrabold tracking-tight text-white leading-none">
        MR&nbsp;AI
      </span>
    )}
  </span>
);

export default Logo;
export { LogoMark };
