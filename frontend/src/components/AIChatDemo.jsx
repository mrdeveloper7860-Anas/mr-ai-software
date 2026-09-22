import { useEffect, useRef, useState } from "react";
import { Send, Sparkles, User } from "lucide-react";

const PRESETS = [
  "Create this month's business summary.",
  "Automate fee reminder messages.",
  "Which expenses grew this quarter?",
];

const RESPONSES = {
  [PRESETS[0]]:
    "Here is your business summary for this month: collections are tracking at 87% of target, two expense categories need review, and receipts were issued on time across all branches. I've grouped the details by department for your review. (Sample response)",
  [PRESETS[1]]:
    "Done — I've drafted a reminder schedule: a polite message three days before the due date, another on the due date, and an escalation note for accounts pending beyond one week. Each message can be sent over WhatsApp or SMS. (Sample response)",
  [PRESETS[2]]:
    "Two categories stand out this quarter: maintenance rose noticeably after equipment servicing, and travel increased with client visits. Everything else stayed within its usual range. I can break this down by vendor if useful. (Sample response)",
};

const FALLBACK =
  "In a live deployment, the assistant would connect to your business data and answer this with real numbers, documents and workflows. This demo shows how the interaction feels. (Sample response)";

const AIChatDemo = () => {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hello. I'm the MR AI assistant concept. Ask me to summarize business data, automate reminders or analyze expenses — I'll show you how it would work." },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const timer = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => () => clearInterval(timer.current), []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const ask = (preset) => {
    if (typing) return;
    const question = (preset ?? input).trim();
    if (!question) return;
    const full = RESPONSES[question] || FALLBACK;
    const words = full.split(" ");
    setInput("");
    setTyping(true);
    setMessages((m) => [...m, { role: "user", text: question }, { role: "ai", text: "" }]);
    let i = 0;
    timer.current = setInterval(() => {
      i += 1;
      const partial = words.slice(0, i).join(" ");
      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1] = { role: "ai", text: partial };
        return copy;
      });
      if (i >= words.length) {
        clearInterval(timer.current);
        setTyping(false);
      }
    }, 42);
  };

  return (
    <div data-testid="ai-chat-demo" className="card-dark overflow-hidden shadow-2xl shadow-royal/10">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.07] bg-navy-700/40">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
          </span>
          <span className="text-sm font-semibold text-white">MR AI Assistant</span>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-widest text-gold border border-gold/30 rounded-full px-3 py-1">
          Interactive Demo
        </span>
      </div>

      <div ref={scrollRef} className="h-[340px] overflow-y-auto p-5 space-y-4" aria-live="polite">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
            {msg.role === "ai" && (
              <span className="shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-royal to-electric/60 flex items-center justify-center">
                <Sparkles size={14} className="text-white" />
              </span>
            )}
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-royal text-white rounded-br-md"
                  : `bg-navy-700/70 text-slate-300 rounded-tl-md ${typing && i === messages.length - 1 ? "typing-caret" : ""}`
              }`}
            >
              {msg.text}
            </div>
            {msg.role === "user" && (
              <span className="shrink-0 w-8 h-8 rounded-lg bg-navy-600 flex items-center justify-center">
                <User size={14} className="text-slate-300" />
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="px-5 pb-3 flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button
            key={p}
            type="button"
            data-testid={`ai-preset-${PRESETS.indexOf(p)}`}
            onClick={() => ask(p)}
            disabled={typing}
            className="text-xs text-slate-300 border border-white/10 hover:border-electric/50 hover:text-electric rounded-full px-3.5 py-1.5 transition-colors duration-300 disabled:opacity-40"
          >
            {p}
          </button>
        ))}
      </div>

      <form
        className="p-4 border-t border-white/[0.07] flex items-center gap-3"
        onSubmit={(e) => { e.preventDefault(); ask(); }}
      >
        <input
          data-testid="ai-chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask the assistant…"
          aria-label="Ask the AI assistant"
          className="flex-1 bg-navy-700/60 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-electric/60 focus:outline-none transition-colors"
        />
        <button
          type="submit"
          data-testid="ai-chat-send-button"
          disabled={typing || !input.trim()}
          aria-label="Send message"
          className="w-10 h-10 rounded-xl bg-royal hover:bg-royal-600 flex items-center justify-center text-white transition-colors disabled:opacity-40"
        >
          <Send size={16} />
        </button>
      </form>
      <p className="px-5 pb-4 text-[11px] text-slate-600">
        Front-end demonstration with simulated responses — not connected to a live AI system.
      </p>
    </div>
  );
};

export default AIChatDemo;
