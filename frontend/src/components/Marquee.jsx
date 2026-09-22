const Marquee = ({ items, dark = true }) => (
  <div className="marquee py-6 select-none" aria-hidden="true">
    <div className="marquee-track">
      {[0, 1].map((half) => (
        <div key={half} className="flex items-center shrink-0">
          {items.map((item, i) => (
            <span key={i} className="flex items-center shrink-0">
              <span className={`font-mono text-sm uppercase tracking-[0.35em] px-8 ${dark ? "text-slate-600" : "text-slate-400"}`}>
                {item}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-gold/60 shrink-0" />
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
);

export default Marquee;
