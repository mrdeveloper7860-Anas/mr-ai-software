import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SEO from "@/components/SEO";
import { Reveal, MaskedLines } from "@/components/Reveal";
import AIChatDemo from "@/components/AIChatDemo";
import { AI_CAPABILITIES } from "@/lib/site";

const PRINCIPLES = [
  { title: "Practical over impressive", desc: "We ship AI that removes hours of work — not demos that look good in a pitch deck." },
  { title: "Human in the loop", desc: "AI assists your team's judgment. Final decisions stay with people who own them." },
  { title: "Fits your workflow", desc: "Solutions integrate with the tools and channels your organization already uses, including WhatsApp." },
  { title: "Honest about limits", desc: "We tell you plainly where AI helps and where it doesn't — before you invest." },
];

const AIAutomation = () => (
  <>
    <SEO
      title="AI & Automation | MR AI Software Technologies"
      description="Practical AI assistants, document intelligence, OCR, chatbots, WhatsApp automation and workflow automation for real business problems."
      path="/ai-automation"
    />
    <section className="relative pt-40 pb-20 lg:pt-48 lg:pb-24 grid-pattern overflow-hidden">
      <div className="absolute inset-0 hero-glow" aria-hidden="true" />
      <div className="container-x relative">
        <p className="eyebrow mb-5">AI & Automation</p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl">
          <MaskedLines
            delay={0.15}
            lines={["Make AI Work", <span key="g" className="text-gradient">for Your Business.</span>]}
          />
        </h1>
        <Reveal delay={0.4}>
          <p className="mt-6 text-base md:text-lg text-slate-400 max-w-2xl leading-relaxed">
            Artificial intelligence should solve real problems — not create unnecessary complexity.
            We design AI capabilities that assist people, automate repetitive work and quietly make
            operations smarter.
          </p>
        </Reveal>
      </div>
    </section>

    <section className="bg-navy-800/40 border-y border-white/[0.06]">
      <div className="container-x py-16 lg:py-20">
        <Reveal>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Capabilities we build</h2>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {AI_CAPABILITIES.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.04}>
              <div
                data-testid={`capability-${c.label.toLowerCase().replace(/\s+/g, "-")}`}
                className="card-dark card-hover p-5 text-center h-full"
              >
                <c.icon size={22} className="mx-auto text-electric" />
                <p className="mt-3 text-sm font-medium text-slate-200">{c.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-navy">
      <div className="container-x py-20 lg:py-28 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <Reveal>
            <p className="eyebrow mb-4">Interactive Concept</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
              See how an MR AI assistant feels to use.
            </h2>
            <p className="mt-4 text-base text-slate-400 leading-relaxed">
              Try the demo console — ask for a business summary, automate reminders or analyze expenses.
              This is a front-end concept with simulated responses; a production assistant connects to
              your real data and systems.
            </p>
          </Reveal>
          <div className="mt-9 space-y-5">
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <div className="flex gap-4">
                  <span className="font-mono text-xs text-gold tracking-widest pt-1">0{i + 1}</span>
                  <div>
                    <h3 className="text-sm font-bold text-white">{p.title}</h3>
                    <p className="mt-1 text-sm text-slate-400 leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal delay={0.1} y={40}>
          <AIChatDemo />
        </Reveal>
      </div>
    </section>

    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-royal-600 via-royal to-[#0B2A5B]" aria-hidden="true" />
      <div className="container-x relative py-16 lg:py-24 text-center">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Have a process that eats hours every week?
          </h2>
          <p className="mt-4 text-blue-100/85 max-w-xl mx-auto">
            Tell us about it. We'll show you exactly how AI and automation could simplify it.
          </p>
          <Link
            to="/contact"
            data-testid="ai-page-cta"
            className="mt-8 inline-flex items-center gap-2 bg-white text-royal-600 font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors duration-300"
          >
            Build an AI Solution <ArrowRight size={16} />
          </Link>
        </Reveal>
      </div>
    </section>
  </>
);

export default AIAutomation;
