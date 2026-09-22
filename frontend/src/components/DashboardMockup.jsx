import { useState } from "react";
import { LayoutDashboard, Users, IndianRupee, Receipt, BarChart3, Settings, Search, Bell } from "lucide-react";

const STATS = [
  { label: "Collected Today", value: "₹42,300", delta: "+12 receipts", icon: IndianRupee },
  { label: "Pending Fees", value: "₹1,84,500", delta: "86 students", icon: Receipt },
  { label: "Active Students", value: "1,240", delta: "3 classes full", icon: Users },
  { label: "Expenses (Month)", value: "₹28,750", delta: "7 entries", icon: BarChart3 },
];

const BARS = [42, 58, 50, 71, 64, 80, 76, 92, 68, 84, 95, 88];
const MONTHS = ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

const TRANSACTIONS = [
  { id: "RCP-1042", name: "Class 10 — A. Verma", detail: "Term 2 Fee", amount: "+ ₹4,500" },
  { id: "RCP-1041", name: "Class 8 — R. Khan", detail: "Transport Fee", amount: "+ ₹1,200" },
  { id: "EXP-0218", name: "Office Supplies", detail: "Stationery", amount: "− ₹3,400" },
  { id: "RCP-1040", name: "Class 12 — S. Gupta", detail: "Exam Fee", amount: "+ ₹800" },
  { id: "RCP-1039", name: "Class 6 — M. Ali", detail: "Term 2 Fee", amount: "+ ₹4,500" },
];

const NAV = [LayoutDashboard, Users, IndianRupee, Receipt, BarChart3, Settings];

const DashboardMockup = () => {
  const [tab, setTab] = useState("overview");

  return (
    <div data-testid="flagship-dashboard" className="card-dark overflow-hidden shadow-2xl shadow-royal/20">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.07] bg-navy-700/50">
        <span className="flex gap-1.5">
          <i className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <i className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
          <i className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        </span>
        <span className="flex-1 text-center font-mono text-[11px] text-slate-500 truncate">
          app.mrai-fee-management — dashboard
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-gold border border-gold/30 rounded-full px-2.5 py-0.5 shrink-0">
          Demo Data
        </span>
      </div>

      <div className="flex">
        <div className="hidden sm:flex flex-col items-center gap-1.5 py-4 px-2.5 border-r border-white/[0.06]">
          {NAV.map((Icon, i) => (
            <span
              key={i}
              className={`w-9 h-9 rounded-lg flex items-center justify-center ${i === 0 ? "bg-royal/25 text-electric" : "text-slate-600"}`}
            >
              <Icon size={16} />
            </span>
          ))}
        </div>

        <div className="flex-1 p-4 sm:p-5 min-w-0">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div>
              <p className="text-sm font-semibold text-white">Fee Dashboard</p>
              <p className="text-[11px] text-slate-500">Sunrise Public School — Academic Year 2026-27</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-navy-700 flex items-center justify-center text-slate-500"><Search size={14} /></span>
              <span className="w-8 h-8 rounded-lg bg-navy-700 flex items-center justify-center text-slate-500"><Bell size={14} /></span>
            </div>
          </div>

          <div className="mt-4 flex gap-2" role="tablist" aria-label="Dashboard views">
            {["overview", "transactions"].map((t) => (
              <button
                key={t}
                role="tab"
                aria-selected={tab === t}
                data-testid={`flagship-dashboard-tab-${t}`}
                onClick={() => setTab(t)}
                className={`text-xs font-semibold px-3.5 py-1.5 rounded-lg capitalize transition-colors duration-300 ${
                  tab === t ? "bg-royal text-white" : "text-slate-400 hover:text-white bg-navy-700/60"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {tab === "overview" ? (
            <>
              <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-3">
                {STATS.map((s) => (
                  <div key={s.label} className="rounded-xl bg-navy-700/50 border border-white/[0.06] p-3">
                    <s.icon size={15} className="text-electric" />
                    <p className="mt-2 text-base font-bold text-white">{s.value}</p>
                    <p className="text-[10px] text-slate-500 truncate">{s.label} · {s.delta}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-xl bg-navy-700/50 border border-white/[0.06] p-4">
                <p className="text-[11px] font-semibold text-slate-400 mb-3">Monthly Collections</p>
                <div className="flex items-end gap-1.5 h-28">
                  {BARS.map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1.5 min-w-0">
                      <div
                        className="w-full rounded-t-md bg-gradient-to-t from-royal to-electric/70"
                        style={{ height: `${h}%`, opacity: i === BARS.length - 1 ? 1 : 0.55 + (h / 220) }}
                      />
                      <span className="text-[8px] text-slate-600 hidden md:block">{MONTHS[i]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="mt-4 rounded-xl bg-navy-700/50 border border-white/[0.06] divide-y divide-white/[0.05]">
              {TRANSACTIONS.map((t) => (
                <div key={t.id} className="flex items-center justify-between gap-3 px-4 py-3">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-200 truncate">{t.name}</p>
                    <p className="text-[10px] text-slate-500">{t.id} · {t.detail}</p>
                  </div>
                  <span className={`text-xs font-mono font-semibold shrink-0 ${t.amount.startsWith("+") ? "text-emerald-400" : "text-rose-400"}`}>
                    {t.amount}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardMockup;
