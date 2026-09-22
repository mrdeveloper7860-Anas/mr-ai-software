import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import SEO from "@/components/SEO";
import { Reveal, MaskedLines } from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import NeuralVisual from "@/components/NeuralVisual";
import AIChatDemo from "@/components/AIChatDemo";
import DashboardMockup from "@/components/DashboardMockup";
import Marquee from "@/components/Marquee";
import { COMPANY, PRINCIPLES, SOLUTIONS, AI_CAPABILITIES, PRODUCTS, FLAGSHIP_FEATURES, WHY_MR_AI, PROCESS_STEPS } from "@/lib/site";

const CHIPS = [
  { label: "Neural Engine", className: "top-[8%] left-[4%]", delay: "0s" },
  { label: "Automation Workflow", className: "top-[22%] right-[0%]", delay: "1.2s" },
  { label: "Cloud Sync", className: "bottom-[26%] left-[0%]", delay: "2s" },
  { label: "AI Reports", className: "bottom-[8%] right-[8%]", delay: "0.6s" },
];

const Hero = () => {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 45, damping: 18 });
  const sy = useSpring(my, { stiffness: 45, damping: 18 });
  const px = useTransform(sx, (v) => v * 22);
  const py = useTransform(sy, (v) => v * 18);
  const px2 = useTransform(sx, (v) => v * -12);
  const py2 = useTransform(sy, (v) => v * -10);

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      data-testid="hero-section"
      className="relative min-h-screen flex items-center overflow-hidden grid-pattern"
    >
      <div className="absolute inset-0 hero-glow" aria-hidden="true" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-royal/20 blur-[140px]" aria-hidden="true" />

      <div className="container-x relative z-10 pt-32 pb-20 lg:pt-40 grid lg:grid-cols-12 gap-14 items-center">
        <div className="lg:col-span-6">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="eyebrow mb-6"
          >
            {COMPANY.legal} · Mahoba, India
          </motion.p>

          <h1 className="text-4xl sm:text-5xl lg:text-[3.7rem] font-extrabold tracking-tight leading-[1.04] text-white">
            <MaskedLines
              delay={0.25}
              lines={[
                "Building the Future with",
                <span key="g" className="text-gradient">Artificial Intelligence</span>,
                "& Software Innovation.",
              ]}
            />
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
          >
            <p className="mt-6 text-base md:text-lg text-slate-400 leading-relaxed max-w-xl">
              Intelligent software, practical AI and digital solutions designed to simplify the way
              organizations work. {COMPANY.brand} builds custom software, AI-powered automation and
              digital platforms that turn complex processes into simple, efficient experiences.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                data-testid="hero-cta-button"
                className="inline-flex items-center gap-2 bg-royal hover:bg-royal-600 text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-royal/40"
              >
                Start a Project <ArrowRight size={16} />
              </Link>
              <Link
                to="/solutions"
                data-testid="hero-cta-secondary"
                className="inline-flex items-center gap-2 border border-white/15 hover:border-electric/50 text-slate-200 hover:text-white font-semibold px-7 py-3.5 rounded-xl transition-colors duration-300"
              >
                Explore Solutions
              </Link>
            </div>
            <p className="mt-8 font-mono text-xs tracking-widest text-slate-600 uppercase">
              {COMPANY.tagline2}
            </p>
          </motion.div>
        </div>

        <div className="lg:col-span-6 relative h-[380px] sm:h-[460px] lg:h-[560px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
            style={{ x: px, y: py }}
          >
            <NeuralVisual />
          </motion.div>
          <motion.div className="absolute inset-0 pointer-events-none" style={{ x: px2, y: py2 }} aria-hidden="true">
            {CHIPS.map((chip) => (
              <span
                key={chip.label}
                className={`absolute ${chip.className} float-slow bg-navy-800/80 backdrop-blur-md border border-white/10 rounded-lg px-3.5 py-2 font-mono text-[11px] text-electric shadow-lg shadow-navy/60`}
                style={{ animationDelay: chip.delay }}
              >
                {chip.label}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="font-mono text-[10px] tracking-[0.3em] text-slate-600 uppercase">Scroll</span>
        <span className="w-px h-10 bg-gradient-to-b from-electric/70 to-transparent" />
      </motion.div>
    </section>
  );
};

const TrustStrip = () => (
  <section data-testid="trust-strip" className="bg-mist text-slate-900 grid-pattern-light">
    <div className="container-x py-20 lg:py-28">
      <Reveal>
        <p className="eyebrow !text-royal mb-4">Our Principles</p>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight max-w-2xl">
          Technology Built Around Real Problems
        </h2>
      </Reveal>
      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200 rounded-2xl overflow-hidden border border-slate-200">
        {PRINCIPLES.map((p, i) => (
          <motion.div
            key={p.num}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="bg-white p-8 group hover:bg-slate-50 transition-colors duration-300"
            data-testid={`principle-${p.title.toLowerCase()}`}
          >
            <span className="font-mono text-xs text-royal tracking-widest">{p.num}</span>
            <h3 className="mt-3 text-lg font-bold group-hover:text-royal transition-colors duration-300">{p.title}</h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const BENTO_SPANS = [
  "lg:col-span-7", "lg:col-span-5", "lg:col-span-4", "lg:col-span-4", "lg:col-span-4", "lg:col-span-12",
];

const SolutionsBento = () => (
  <section data-testid="solutions-bento" className="bg-navy relative">
    <div className="container-x py-20 lg:py-32">
      <SectionHeading
        eyebrow="Core Solutions"
        title="One Technology Partner. Multiple Digital Possibilities."
        description="Six disciplines, one engineering standard — every solution designed to make everyday work simpler."
      />
      <div className="mt-14 grid lg:grid-cols-12 gap-5">
        {SOLUTIONS.map((s, i) => (
          <Reveal key={s.slug} delay={i * 0.06} className={BENTO_SPANS[i]}>
            <Link
              to={`/solutions#${s.slug}`}
              data-testid={`solution-card-${s.slug}`}
              className={`card-dark card-hover group relative h-full block p-8 overflow-hidden ${
                i === 5 ? "lg:flex lg:items-center lg:gap-8" : ""
              }`}
            >
              <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-royal/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" aria-hidden="true" />
              <div className="relative">
                <div className="flex items-start justify-between">
                  <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-royal/30 to-electric/10 border border-white/10 flex items-center justify-center text-electric group-hover:from-royal group-hover:to-royal-600 group-hover:text-white transition-all duration-500">
                    <s.icon size={22} />
                  </span>
                  <span className="font-mono text-xs text-slate-600">{s.num}</span>
                </div>
                <h3 className="mt-6 text-lg sm:text-xl font-semibold text-white tracking-tight">{s.title}</h3>
                <p className="mt-2.5 text-sm text-slate-400 leading-relaxed max-w-md">{s.desc}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-electric opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-400">
                  Learn more <ArrowUpRight size={14} />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const AISection = () => (
  <section data-testid="ai-automation-section" className="relative bg-[#0B0E17] overflow-hidden">
    <div className="absolute inset-0 grid-pattern opacity-60" aria-hidden="true" />
    <div className="absolute top-0 left-1/4 w-[600px] h-[400px] rounded-full bg-royal/15 blur-[130px]" aria-hidden="true" />
    <div className="container-x relative py-20 lg:py-32 grid lg:grid-cols-2 gap-14 items-center">
      <div>
        <SectionHeading
          eyebrow="AI & Automation"
          title="Make AI Work for Your Business."
          description="Artificial intelligence should solve real problems — not create unnecessary complexity. We build AI that assists people, removes repetitive work and fits into existing operations."
        />
        <div className="mt-8 flex flex-wrap gap-2.5">
          {AI_CAPABILITIES.map((c, i) => (
            <motion.span
              key={c.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="inline-flex items-center gap-2 text-xs font-medium text-slate-300 border border-white/10 hover:border-electric/40 hover:text-electric rounded-full px-3.5 py-2 bg-navy-800/60 transition-colors duration-300 cursor-default"
            >
              <c.icon size={13} className="text-electric" />
              {c.label}
            </motion.span>
          ))}
        </div>
        <Reveal delay={0.15}>
          <Link
            to="/ai-automation"
            data-testid="ai-section-cta"
            className="mt-9 inline-flex items-center gap-2 bg-royal hover:bg-royal-600 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors duration-300"
          >
            Build an AI Solution <ArrowRight size={16} />
          </Link>
        </Reveal>
      </div>
      <Reveal delay={0.1} y={40}>
        <AIChatDemo />
      </Reveal>
    </div>
  </section>
);

const STATUS_STYLES = {
  "In Development": "text-gold border-gold/40 bg-gold/10",
  "Coming Soon": "text-slate-400 border-white/15 bg-white/[0.04]",
};

const ProductsSection = () => (
  <section data-testid="products-section" className="bg-mist text-slate-900">
    <div className="container-x py-20 lg:py-32">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <SectionHeading
          light
          eyebrow="Product Ecosystem"
          title="Software Products for Everyday Business."
          description="MR AI is building modular software platforms designed to simplify everyday operations across multiple industries."
        />
        <Reveal delay={0.1}>
          <Link to="/products" data-testid="products-view-all" className="inline-flex items-center gap-2 text-royal font-semibold hover:gap-3 transition-all duration-300 shrink-0">
            View all products <ArrowRight size={16} />
          </Link>
        </Reveal>
      </div>
      <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {PRODUCTS.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.06}>
            <Link
              to={`/products/${p.slug}`}
              data-testid={`product-card-${p.slug}`}
              className="group h-full block bg-white border border-slate-200 rounded-2xl p-7 hover:border-royal/40 hover:shadow-xl hover:shadow-royal/5 hover:-translate-y-1 transition-all duration-400"
            >
              <div className="flex items-start justify-between">
                <span className="w-11 h-11 rounded-xl bg-royal/[0.07] text-royal flex items-center justify-center group-hover:bg-royal group-hover:text-white transition-colors duration-400">
                  <p.icon size={20} />
                </span>
                <span className={`font-mono text-[10px] uppercase tracking-widest border rounded-full px-2.5 py-1 ${STATUS_STYLES[p.status]}`}>
                  {p.status}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-bold tracking-tight">{p.name}</h3>
              <p className="mt-1 text-sm font-medium text-royal">{p.desc}</p>
              <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">{p.detail}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-royal opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                View product <ArrowRight size={14} />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const FlagshipSection = () => (
  <section data-testid="flagship-section" className="bg-navy relative overflow-hidden">
    <div className="absolute -bottom-40 right-0 w-[700px] h-[500px] rounded-full bg-royal/10 blur-[140px]" aria-hidden="true" />
    <div className="container-x relative py-20 lg:py-32 grid lg:grid-cols-12 gap-14 items-center">
      <div className="lg:col-span-5">
        <Reveal>
          <p className="eyebrow mb-4">Flagship Product</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
            MR AI Fee Management
          </h2>
          <p className="mt-4 text-base md:text-lg text-slate-400 leading-relaxed">
            A practical digital fee and transaction management system designed to simplify
            educational institution operations — from collection to receipts to reporting.
          </p>
        </Reveal>
        <div className="mt-7 flex flex-wrap gap-2">
          {FLAGSHIP_FEATURES.map((f, i) => (
            <motion.span
              key={f}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="text-xs text-slate-300 border border-white/10 rounded-lg px-3 py-1.5 bg-navy-800/70"
            >
              {f}
            </motion.span>
          ))}
        </div>
        <Reveal delay={0.15}>
          <Link
            to="/products/fee-management"
            data-testid="flagship-explore-cta"
            className="mt-9 inline-flex items-center gap-2 border border-electric/40 text-electric hover:bg-electric/10 font-semibold px-7 py-3.5 rounded-xl transition-colors duration-300"
          >
            Explore Product <ArrowRight size={16} />
          </Link>
        </Reveal>
      </div>
      <Reveal delay={0.1} y={40} className="lg:col-span-7">
        <DashboardMockup />
      </Reveal>
    </div>
  </section>
);

const WhySection = () => (
  <section data-testid="why-section" className="bg-mist text-slate-900 grid-pattern-light">
    <div className="container-x py-20 lg:py-32">
      <SectionHeading
        light
        eyebrow="Why MR AI"
        title="Built for the Way Businesses Actually Work."
        description="We measure success by how much simpler your workday becomes — not by how much technology we sell you."
      />
      <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {WHY_MR_AI.map((w, i) => (
          <Reveal key={w.title} delay={i * 0.06}>
            <div className="h-full bg-white border border-slate-200 rounded-2xl p-7 hover:border-royal/40 hover:shadow-lg transition-all duration-400 group">
              <span className="w-11 h-11 rounded-xl bg-royal/[0.07] text-royal flex items-center justify-center group-hover:bg-royal group-hover:text-white transition-colors duration-400">
                <w.icon size={20} />
              </span>
              <h3 className="mt-5 text-lg font-bold tracking-tight">{w.title}</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">{w.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const ProcessSection = () => (
  <section data-testid="process-section" className="bg-navy relative">
    <div className="container-x py-20 lg:py-32">
      <SectionHeading
        eyebrow="How We Work"
        title="A Clear Path From Problem to Product."
        description="Five disciplined steps. No mystery, no jargon — you always know where your project stands."
      />
      <div className="mt-16 relative">
        <div className="absolute top-6 left-0 right-0 h-px bg-gradient-to-r from-transparent via-royal/50 to-transparent hidden lg:block" aria-hidden="true" />
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-6">
          {PROCESS_STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="relative"
              data-testid={`process-step-${i + 1}`}
            >
              <div className="flex lg:flex-col items-start gap-4 lg:gap-0">
                <span className="relative z-10 w-12 h-12 rounded-xl bg-navy-800 border border-electric/30 flex items-center justify-center text-electric shrink-0">
                  <step.icon size={19} />
                </span>
                <div className="lg:mt-6">
                  <span className="font-mono text-xs text-gold tracking-widest">{step.num}</span>
                  <h3 className="mt-1.5 text-base font-bold text-white uppercase tracking-wide">{step.title}</h3>
                  <p className="mt-1.5 text-sm text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const VisionSection = () => (
  <section data-testid="vision-section" className="relative bg-[#0A0C13] overflow-hidden">
    <div className="absolute inset-0 hero-glow opacity-70" aria-hidden="true" />
    <div className="container-x relative py-20 lg:py-28 text-center">
      <Reveal>
        <p className="eyebrow mb-5">Our Vision</p>
        <h2 className="text-2xl sm:text-3xl lg:text-[2.6rem] font-bold tracking-tight text-white max-w-4xl mx-auto leading-snug">
          Technology simple enough for <span className="text-gradient">everyday users</span>, powerful enough
          for <span className="text-gradient">modern organizations</span> and intelligent enough to
          grow with <span className="gold-underline">the future</span>.
        </h2>
        <p className="mt-6 text-slate-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
          Starting from Mahoba, Uttar Pradesh — building practical technology for businesses, schools,
          healthcare and offices across India, with global ambition.
        </p>
      </Reveal>
    </div>
    <Marquee items={["Simplicity", "Security", "Scalability", "Intelligence", "Trust", "Innovation", "Growth"]} />
  </section>
);

const CTASection = () => (
  <section data-testid="cta-section" className="relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-royal-600 via-royal to-[#0B2A5B]" aria-hidden="true" />
    <div className="absolute inset-0 grid-pattern opacity-40" aria-hidden="true" />
    <div className="container-x relative py-20 lg:py-28 text-center">
      <Reveal>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
          Let's Build Something Intelligent.
        </h2>
        <p className="mt-5 text-base md:text-lg text-blue-100/85 max-w-2xl mx-auto leading-relaxed">
          From a simple business problem to a complete digital platform — MR AI can help turn ideas into technology.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Link
            to="/contact"
            data-testid="cta-start-project"
            className="inline-flex items-center gap-2 bg-white text-royal-600 font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors duration-300"
          >
            Start a Project <ArrowRight size={16} />
          </Link>
          <a
            href={`mailto:${COMPANY.email}`}
            data-testid="cta-talk-to-mrai"
            className="inline-flex items-center gap-2 border border-white/40 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-colors duration-300"
          >
            Talk to MR AI
          </a>
        </div>
      </Reveal>
    </div>
  </section>
);

const Home = () => (
  <>
    <SEO
      title="MR AI Software Technologies | AI, Software & Digital Solutions"
      description="MR AI Software Technologies builds custom software, AI solutions, automation, cloud applications and digital transformation solutions for modern organizations."
      path="/"
    />
    <Hero />
    <TrustStrip />
    <SolutionsBento />
    <AISection />
    <ProductsSection />
    <FlagshipSection />
    <WhySection />
    <ProcessSection />
    <VisionSection />
    <CTASection />
  </>
);

export default Home;
