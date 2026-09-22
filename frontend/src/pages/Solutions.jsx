import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import SEO from "@/components/SEO";
import { Reveal } from "@/components/Reveal";
import { SOLUTIONS } from "@/lib/site";

const HIGHLIGHTS = {
  "custom-software": ["Workflow-first design", "Web dashboards & internal tools", "Integrations with existing systems", "Maintainable, documented code"],
  "ai-solutions": ["AI assistants for staff & customers", "Document intelligence & OCR", "Automated reports & summaries", "Intelligent search across records"],
  "business-automation": ["WhatsApp & SMS reminders", "Approval & follow-up workflows", "Data-entry elimination", "Scheduled report generation"],
  "cloud-solutions": ["Cloud-ready architecture", "Access from anywhere", "Automated backups", "Scales with your usage"],
  "web-mobile": ["Responsive websites", "Customer portals", "Mobile applications", "Fast, accessible experiences"],
  "digital-transformation": ["Paper-to-digital migration", "Process mapping & redesign", "Staff training & onboarding", "Gradual, disruption-free rollout"],
};

const Solutions = () => (
  <>
    <SEO
      title="Solutions | MR AI Software Technologies"
      description="Custom software, AI solutions, business automation, cloud, web & mobile and digital transformation services from MR AI Software Technologies."
      path="/solutions"
    />
    <section className="relative pt-40 pb-20 lg:pt-48 lg:pb-24 grid-pattern overflow-hidden">
      <div className="absolute inset-0 hero-glow" aria-hidden="true" />
      <div className="container-x relative">
        <Reveal>
          <p className="eyebrow mb-4">Solutions</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white max-w-3xl">
            One Technology Partner. <span className="text-gradient">Multiple Digital Possibilities.</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-slate-400 max-w-2xl leading-relaxed">
            Whether you need a single tool or a complete digital operation, every engagement starts
            with your problem — and ends with software your team actually enjoys using.
          </p>
        </Reveal>
      </div>
    </section>

    {SOLUTIONS.map((s, i) => (
      <section
        key={s.slug}
        id={s.slug}
        data-testid={`solution-detail-${s.slug}`}
        className={i % 2 === 0 ? "bg-mist text-slate-900" : "bg-navy text-white"}
      >
        <div className="container-x py-16 lg:py-24 grid lg:grid-cols-12 gap-10 items-start scroll-mt-24">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="flex items-center gap-4">
                <span className={`w-14 h-14 rounded-2xl flex items-center justify-center ${i % 2 === 0 ? "bg-royal/[0.08] text-royal" : "bg-royal/20 text-electric border border-white/10"}`}>
                  <s.icon size={26} />
                </span>
                <span className={`font-mono text-sm tracking-widest ${i % 2 === 0 ? "text-royal" : "text-slate-500"}`}>{s.num}</span>
              </div>
              <h2 className="mt-5 text-2xl sm:text-3xl font-bold tracking-tight">{s.title}</h2>
              <p className={`mt-2 text-base font-medium ${i % 2 === 0 ? "text-royal" : "text-electric"}`}>{s.desc}</p>
              <p className={`mt-4 text-base leading-relaxed ${i % 2 === 0 ? "text-slate-600" : "text-slate-400"}`}>{s.detail}</p>
              <Link
                to="/contact"
                data-testid={`solution-cta-${s.slug}`}
                className={`mt-7 inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-xl transition-colors duration-300 ${
                  i % 2 === 0 ? "bg-royal text-white hover:bg-royal-600" : "border border-electric/40 text-electric hover:bg-electric/10"
                }`}
              >
                Discuss this solution <ArrowRight size={15} />
              </Link>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <ul className={`grid sm:grid-cols-2 gap-4 rounded-2xl border p-7 ${
                i % 2 === 0 ? "bg-white border-slate-200" : "bg-navy-800 border-white/[0.08]"
              }`}>
                {HIGHLIGHTS[s.slug].map((h) => (
                  <li key={h} className="flex items-start gap-3">
                    <span className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${i % 2 === 0 ? "bg-emerald-500/10 text-emerald-600" : "bg-emerald-400/10 text-emerald-400"}`}>
                      <Check size={12} />
                    </span>
                    <span className={`text-sm leading-relaxed ${i % 2 === 0 ? "text-slate-700" : "text-slate-300"}`}>{h}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>
    ))}
  </>
);

export default Solutions;
