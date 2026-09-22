import DashboardMockup from "@/components/DashboardMockup";

const Bar = ({ className = "" }) => <span className={`block h-1.5 rounded bg-white/15 ${className}`} />;

const Frame = ({ children, label }) => (
  <div className="card-dark overflow-hidden shadow-2xl shadow-royal/20">
    <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.07] bg-navy-700/50">
      <span className="flex gap-1.5">
        <i className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
        <i className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
        <i className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
      </span>
      <span className="flex-1" />
      <span className="font-mono text-[10px] uppercase tracking-widest text-gold border border-gold/30 rounded-full px-2.5 py-0.5 shrink-0">
        {label}
      </span>
    </div>
    <div className="h-[340px] sm:h-[400px]">{children}</div>
  </div>
);

const Campus = () => (
  <div className="flex h-full">
    <div className="hidden sm:flex w-14 flex-col gap-2 p-3 border-r border-white/[0.06]">
      {[0, 1, 2, 3, 4].map((i) => <span key={i} className={`h-8 rounded-lg ${i === 1 ? "bg-royal/35" : "bg-white/[0.06]"}`} />)}
    </div>
    <div className="flex-1 p-4 sm:p-5 space-y-3 min-w-0">
      <div className="flex items-center justify-between">
        <Bar className="w-28" />
        <span className="font-mono text-[9px] text-emerald-400 border border-emerald-400/30 rounded px-2 py-0.5">Present 92%</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {["Class 10-A", "Class 9-B", "Class 8-A"].map((c, i) => (
          <div key={c} className="rounded-lg bg-navy-700/60 border border-white/[0.06] p-2.5">
            <p className="text-[10px] font-semibold text-slate-300">{c}</p>
            <p className="text-[9px] text-slate-500 mt-0.5">{[38, 41, 35][i]} students</p>
          </div>
        ))}
      </div>
      <div className="rounded-lg bg-navy-700/60 border border-white/[0.06] p-3">
        <p className="text-[9px] font-mono uppercase tracking-widest text-slate-500 mb-2">Today's Attendance</p>
        <div className="grid grid-cols-12 gap-1">
          {Array.from({ length: 36 }).map((_, i) => (
            <span key={i} className={`aspect-square rounded-sm ${[3, 11, 22, 30].includes(i) ? "bg-rose-400/50" : "bg-emerald-400/40"}`} />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-lg bg-gradient-to-br from-royal/25 to-electric/10 border border-white/[0.06] p-3">
          <p className="text-[9px] text-slate-400">Fee Collection</p>
          <p className="text-sm font-bold text-white mt-1">₹38,400</p>
        </div>
        <div className="rounded-lg bg-navy-700/60 border border-white/[0.06] p-3">
          <p className="text-[9px] text-slate-400">Notices Sent</p>
          <p className="text-sm font-bold text-white mt-1">126</p>
        </div>
      </div>
    </div>
  </div>
);

const Clinic = () => (
  <div className="flex h-full">
    <div className="w-2/5 border-r border-white/[0.06] p-4 space-y-2 min-w-0">
      <p className="text-[9px] font-mono uppercase tracking-widest text-slate-500">Today's Queue</p>
      {[["09:00", "Token 04"], ["09:20", "Token 05"], ["09:40", "Token 06"], ["10:00", "Token 07"], ["10:20", "Token 08"]].map(([t, tok], i) => (
        <div key={tok} className={`flex items-center gap-2.5 rounded-lg px-3 py-2 border ${i === 0 ? "bg-royal/20 border-royal/40" : "bg-navy-700/50 border-white/[0.05]"}`}>
          <span className="font-mono text-[10px] text-electric shrink-0">{t}</span>
          <Bar className="flex-1" />
          <span className="text-[9px] text-slate-500 shrink-0">{tok}</span>
        </div>
      ))}
    </div>
    <div className="flex-1 p-4 sm:p-5 space-y-3 min-w-0">
      <div className="flex items-center gap-3">
        <span className="w-9 h-9 rounded-full bg-gradient-to-br from-royal to-electric/50 flex items-center justify-center text-[10px] font-bold text-white">RK</span>
        <div className="flex-1"><Bar className="w-24" /><Bar className="w-16 mt-1.5 opacity-60" /></div>
        <span className="font-mono text-[9px] text-gold border border-gold/30 rounded px-2 py-0.5">Follow-up</span>
      </div>
      <div className="rounded-lg bg-navy-700/60 border border-white/[0.06] p-3 space-y-2">
        <p className="text-[9px] font-mono uppercase tracking-widest text-slate-500">Vitals</p>
        {[["BP", 72], ["Pulse", 58], ["SpO2", 94]].map(([k, v]) => (
          <div key={k} className="flex items-center gap-2">
            <span className="text-[9px] text-slate-500 w-8">{k}</span>
            <div className="flex-1 h-1.5 rounded bg-white/[0.07]"><div className="h-full rounded bg-gradient-to-r from-royal to-electric" style={{ width: `${v}%` }} /></div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2">
        <span className="h-9 rounded-lg bg-royal/30 border border-royal/40 flex items-center justify-center text-[10px] text-blue-200">Prescription</span>
        <span className="h-9 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-[10px] text-slate-400">Bill · ₹650</span>
      </div>
    </div>
  </div>
);

const Pos = () => (
  <div className="flex h-full">
    <div className="flex-1 p-4 grid grid-cols-3 gap-2 content-start min-w-0">
      {["Rice 5kg", "Atta 10kg", "Oil 1L", "Sugar", "Tea 250g", "Salt", "Dal 1kg", "Soap", "Biscuits"].map((item, i) => (
        <span key={item} className={`h-14 rounded-lg border flex items-center justify-center text-center px-1 text-[10px] leading-tight ${i === 2 ? "bg-royal/30 border-royal/40 text-blue-200" : "bg-navy-700/50 border-white/[0.06] text-slate-400"}`}>
          {item}
        </span>
      ))}
    </div>
    <div className="w-2/5 border-l border-white/[0.06] p-4 flex flex-col min-w-0">
      <p className="text-[9px] font-mono uppercase tracking-widest text-slate-500">Current Bill</p>
      <div className="mt-3 flex-1 space-y-2">
        {[["Oil 1L", "₹145"], ["Rice 5kg", "₹320"], ["Tea 250g", "₹140"]].map(([k, v]) => (
          <div key={k} className="flex justify-between items-center text-[11px]">
            <span className="text-slate-300">{k}</span>
            <span className="font-mono text-slate-400">{v}</span>
          </div>
        ))}
        <div className="border-t border-dashed border-white/10 pt-2 flex justify-between text-[12px] font-bold">
          <span className="text-white">Total</span>
          <span className="font-mono text-electric">₹605</span>
        </div>
      </div>
      <div className="space-y-2">
        <span className="block h-9 rounded-lg bg-royal text-center leading-9 text-[11px] font-bold text-white">Collect Payment</span>
        <span className="block h-8 rounded-lg bg-white/[0.05] border border-white/[0.08] text-center leading-8 text-[10px] text-slate-400">Print Receipt</span>
      </div>
    </div>
  </div>
);

const Hr = () => (
  <div className="p-4 sm:p-5 h-full flex flex-col gap-3">
    <div className="flex items-center justify-between">
      <Bar className="w-32" />
      <span className="font-mono text-[9px] text-electric border border-electric/30 rounded px-2 py-0.5">Payroll Ready</span>
    </div>
    <div className="rounded-lg bg-navy-700/60 border border-white/[0.06] divide-y divide-white/[0.05] flex-1">
      {[["A. Sharma", "Present 24/26", "₹32,000"], ["R. Verma", "Present 25/26", "₹28,500"], ["S. Khan", "Present 22/26", "₹26,000"], ["M. Gupta", "Present 26/26", "₹41,000"]].map(([n, a, s], i) => (
        <div key={n} className="flex items-center gap-3 px-3.5 py-2.5">
          <span className={`w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bold text-white shrink-0 ${i === 0 ? "bg-gradient-to-br from-royal to-electric/60" : "bg-navy-600"}`}>{n[0]}</span>
          <span className="text-[11px] text-slate-200 font-medium w-20 truncate">{n}</span>
          <span className="text-[10px] text-slate-500 flex-1 hidden sm:block">{a}</span>
          <span className="font-mono text-[11px] text-slate-300">{s}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
        </div>
      ))}
    </div>
    <div className="grid grid-cols-3 gap-2">
      {[["Net Payroll", "₹1.27L"], ["On Leave", "3"], ["Payslips", "Sent"]].map(([k, v]) => (
        <div key={k} className="rounded-lg bg-navy-700/60 border border-white/[0.06] p-2.5 text-center">
          <p className="text-[9px] text-slate-500">{k}</p>
          <p className="text-[12px] font-bold text-white mt-0.5">{v}</p>
        </div>
      ))}
    </div>
  </div>
);

const Property = () => (
  <div className="flex h-full">
    <div className="flex-1 p-4 sm:p-5 min-w-0">
      <div className="flex items-center justify-between mb-3">
        <Bar className="w-28" />
        <div className="flex gap-3 text-[9px] text-slate-500">
          <span className="flex items-center gap-1"><i className="w-2 h-2 rounded-sm bg-white/15" />Available</span>
          <span className="flex items-center gap-1"><i className="w-2 h-2 rounded-sm bg-gold/70" />Booked</span>
          <span className="flex items-center gap-1"><i className="w-2 h-2 rounded-sm bg-royal" />Sold</span>
        </div>
      </div>
      <div className="grid grid-cols-6 gap-1.5">
        {Array.from({ length: 30 }).map((_, i) => {
          const state = [2, 5, 9, 14, 17, 23].includes(i) ? "bg-royal" : [1, 7, 12, 20, 26].includes(i) ? "bg-gold/70" : "bg-white/[0.08]";
          return <span key={i} className={`aspect-[4/3] rounded ${state} border border-white/[0.04]`} />;
        })}
      </div>
      <div className="mt-3 rounded-lg bg-navy-700/60 border border-white/[0.06] p-3 flex items-center justify-between">
        <div><p className="text-[9px] text-slate-500">Plot A-14 · Mr. Yadav</p><p className="text-[10px] text-slate-300 mt-0.5">Instalment 3 of 6 due 05 Aug</p></div>
        <span className="font-mono text-[10px] text-gold">₹85,000</span>
      </div>
    </div>
    <div className="hidden sm:flex w-2/5 border-l border-white/[0.06] p-4 flex-col gap-2 min-w-0">
      <p className="text-[9px] font-mono uppercase tracking-widest text-slate-500">Payment Schedule</p>
      {[["Booking", "Paid", "bg-emerald-400/15 text-emerald-400"], ["Instalment 1", "Paid", "bg-emerald-400/15 text-emerald-400"], ["Instalment 2", "Paid", "bg-emerald-400/15 text-emerald-400"], ["Instalment 3", "Due 05 Aug", "bg-gold/15 text-gold"], ["Instalment 4", "Upcoming", "bg-white/[0.05] text-slate-500"]].map(([k, v, c]) => (
        <div key={k} className="flex items-center justify-between rounded-lg bg-navy-700/50 border border-white/[0.05] px-3 py-2">
          <span className="text-[10px] text-slate-300">{k}</span>
          <span className={`text-[9px] rounded px-1.5 py-0.5 ${c}`}>{v}</span>
        </div>
      ))}
    </div>
  </div>
);

const Assistant = () => (
  <div className="p-4 sm:p-5 h-full flex flex-col gap-2.5">
    <div className="flex items-center gap-2.5">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
      </span>
      <Bar className="w-28" />
      <span className="ml-auto font-mono text-[9px] text-slate-600">Connected: Fee Management</span>
    </div>
    <div className="flex-1 space-y-2.5 overflow-hidden">
      <div className="self-start max-w-[80%] rounded-2xl rounded-tl-sm bg-white/[0.06] px-3.5 py-2.5">
        <p className="text-[11px] text-slate-300">Good morning. Collections yesterday: ₹38,400 across 11 receipts. 12 accounts have instalments due this week.</p>
      </div>
      <div className="flex justify-end">
        <div className="max-w-[70%] rounded-2xl rounded-br-sm bg-royal/50 px-3.5 py-2.5">
          <p className="text-[11px] text-white">Remind all 12 on WhatsApp, politely.</p>
        </div>
      </div>
      <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white/[0.06] px-3.5 py-2.5">
        <p className="text-[11px] text-slate-300">Reminder scheduled for 10:00 AM with a friendly template. I'll confirm here once delivered.</p>
        <div className="mt-2 flex gap-1.5">
          <span className="text-[9px] rounded-md bg-emerald-400/15 text-emerald-400 px-2 py-0.5">Approved by you</span>
          <span className="text-[9px] rounded-md bg-white/[0.06] text-slate-500 px-2 py-0.5">WhatsApp</span>
        </div>
      </div>
    </div>
    <div className="flex items-center gap-2 rounded-xl bg-navy-700/60 border border-white/[0.08] px-3.5 py-2.5">
      <Bar className="flex-1" />
      <span className="w-7 h-7 rounded-lg bg-royal flex items-center justify-center">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
      </span>
    </div>
  </div>
);

const VARIANTS = { campus: Campus, clinic: Clinic, pos: Pos, hr: Hr, property: Property, assistant: Assistant };

const ProductVisual = ({ visual, badge }) => {
  if (visual === "dashboard") return <DashboardMockup />;
  const Inner = VARIANTS[visual] || Campus;
  return (
    <Frame label={badge}>
      <Inner />
    </Frame>
  );
};

export default ProductVisual;
