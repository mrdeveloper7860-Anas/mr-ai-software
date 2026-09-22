import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SEO from "@/components/SEO";
import { Reveal } from "@/components/Reveal";
import { PORTFOLIO } from "@/lib/site";

const ConceptVisual = ({ index }) => {
  const variants = [
    <div key="v0" className="p-5 h-full flex flex-col gap-2.5">
      <div className="flex gap-2">
        <span className="h-8 flex-1 rounded-lg bg-royal/25" />
        <span className="h-8 flex-1 rounded-lg bg-electric/15" />
        <span className="h-8 flex-1 rounded-lg bg-white/[0.06]" />
      </div>
      <div className="flex-1 rounded-lg bg-white/[0.05] flex items-end gap-1.5 p-3">
        {[45, 70, 55, 85, 65, 95, 78].map((h, i) => (
          <span key={i} className="flex-1 rounded-t bg-gradient-to-t from-royal to-electric/70" style={{ height: `${h}%`, opacity: 0.5 + h / 250 }} />
        ))}
      </div>
      <div className="space-y-1.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex justify-between items-center rounded-md bg-white/[0.04] px-3 py-1.5">
            <span className="h-1.5 w-20 rounded bg-white/15" />
            <span className="h-1.5 w-8 rounded bg-emerald-400/40" />
          </div>
        ))}
      </div>
    </div>,
    <div key="v1" className="p-5 h-full relative">
      <div className="absolute inset-5 rounded-lg border border-white/[0.08] grid-pattern" />
      {[[20, 30], [60, 20], [75, 55], [35, 65], [55, 45]].map(([x, y], i) => (
        <span key={i} className="absolute flex flex-col items-center" style={{ left: `${x}%`, top: `${y}%` }}>
          <span className={`w-3 h-3 rounded-full ${i === 2 ? "bg-gold" : "bg-electric"} shadow-lg`} />
          <span className="mt-1 h-1 w-8 rounded bg-white/15" />
        </span>
      ))}
      <span className="absolute bottom-7 left-7 h-6 w-24 rounded-md bg-royal/30" />
    </div>,
    <div key="v2" className="p-5 h-full flex gap-3">
      <div className="w-14 rounded-lg bg-white/[0.05] flex flex-col gap-2 p-2">
        {[0, 1, 2, 3].map((i) => <span key={i} className={`h-6 rounded ${i === 0 ? "bg-royal/40" : "bg-white/[0.07]"}`} />)}
      </div>
      <div className="flex-1 space-y-2">
        <div className="h-7 rounded-lg bg-white/[0.06]" />
        <div className="grid grid-cols-2 gap-2">
          {[0, 1].map((i) => <span key={i} className="h-14 rounded-lg bg-white/[0.05]" />)}
        </div>
        <div className="h-16 rounded-lg bg-gradient-to-r from-royal/25 to-electric/10" />
      </div>
    </div>,
    <div key="v3" className="p-5 h-full flex flex-col gap-2.5">
      <div className="h-8 rounded-lg bg-white/[0.06] flex items-center px-3"><span className="h-1.5 w-28 rounded bg-white/15" /></div>
      <div className="flex-1 grid grid-cols-3 gap-2">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <span key={i} className={`rounded-lg ${i === 1 ? "bg-royal/30" : "bg-white/[0.05]"}`} />
        ))}
      </div>
    </div>,
    <div key="v4" className="p-5 h-full flex flex-col justify-end gap-2.5">
      <div className="self-start max-w-[75%] rounded-2xl rounded-tl-sm bg-white/[0.07] px-3.5 py-2.5"><span className="block h-1.5 w-32 rounded bg-white/15" /></div>
      <div className="self-end max-w-[70%] rounded-2xl rounded-br-sm bg-royal/40 px-3.5 py-2.5"><span className="block h-1.5 w-24 rounded bg-white/25" /></div>
      <div className="self-start max-w-[80%] rounded-2xl rounded-tl-sm bg-white/[0.07] px-3.5 py-2.5 space-y-1.5">
        <span className="block h-1.5 w-36 rounded bg-white/15" />
        <span className="block h-1.5 w-24 rounded bg-electric/30" />
      </div>
      <div className="h-9 rounded-xl bg-white/[0.05] border border-white/[0.08]" />
    </div>,
  ];
  return variants[index % variants.length];
};

const Portfolio = () => (
  <>
    <SEO
      title="Portfolio | MR AI Software Technologies"
      description="Selected work and product concepts from MR AI — fee management, real estate planning, business software and AI automation."
      path="/portfolio"
    />
    <section className="relative pt-40 pb-20 lg:pt-48 lg:pb-24 grid-pattern overflow-hidden">
      <div className="absolute inset-0 hero-glow" aria-hidden="true" />
      <div className="container-x relative">
        <Reveal>
          <p className="eyebrow mb-4">Portfolio</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white max-w-3xl">
            Work in Progress, <span className="text-gradient">Shown Honestly.</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-slate-400 max-w-2xl leading-relaxed">
            A look at what we're building and exploring. Items labeled "UI Concept" are design
            explorations — not deployed customer products.
          </p>
        </Reveal>
      </div>
    </section>

    <section className="bg-navy border-t border-white/[0.06]">
      <div className="container-x py-20 lg:py-28 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PORTFOLIO.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.06} className={i === 0 ? "sm:col-span-2 lg:col-span-1" : ""}>
            <article
              data-testid={`portfolio-card-${i}`}
              className="card-dark card-hover overflow-hidden h-full flex flex-col group"
            >
              <div className="relative h-48 bg-navy-700/40 border-b border-white/[0.06]">
                <ConceptVisual index={i} />
                <span className={`absolute top-3 right-3 font-mono text-[10px] uppercase tracking-widest rounded-full px-2.5 py-1 border ${
                  p.label === "DEMO" ? "text-gold border-gold/40 bg-navy/80" : "text-slate-400 border-white/15 bg-navy/80"
                }`}>
                  {p.label}
                </span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h2 className="text-lg font-bold text-white tracking-tight">{p.name}</h2>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed flex-1">{p.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="text-[11px] text-slate-500 border border-white/10 rounded-md px-2 py-1">{t}</span>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>

    <section className="bg-mist text-slate-900">
      <div className="container-x py-16 lg:py-24 text-center">
        <Reveal>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Your project could be next.</h2>
          <p className="mt-3 text-slate-600 max-w-xl mx-auto">
            We take on a focused number of builds so every client gets senior attention.
          </p>
          <Link
            to="/contact"
            data-testid="portfolio-cta"
            className="mt-7 inline-flex items-center gap-2 bg-royal hover:bg-royal-600 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors duration-300"
          >
            Start a Project <ArrowRight size={16} />
          </Link>
        </Reveal>
      </div>
    </section>
  </>
);

export default Portfolio;
