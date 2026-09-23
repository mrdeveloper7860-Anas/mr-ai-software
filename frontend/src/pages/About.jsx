import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import SEO from "@/components/SEO";
import { Reveal, MaskedLines } from "@/components/Reveal";
import Marquee from "@/components/Marquee";
import { COMPANY, FOUNDERS, PRINCIPLES } from "@/lib/site";

const About = () => (
  <>
    <SEO
      title="About Us | MR AI Software Technologies"
      description="MR AI Software Technologies Private Limited is an Indian technology company from Mahoba, Uttar Pradesh, focused on software, AI, automation and digital transformation."
      path="/about"
    />
    <section className="relative pt-40 pb-20 lg:pt-48 lg:pb-24 grid-pattern overflow-hidden">
      <div className="absolute inset-0 hero-glow" aria-hidden="true" />
      <div className="container-x relative">
        <p className="eyebrow mb-5">About MR AI</p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl">
          <MaskedLines delay={0.15} lines={["Technology", <span key="g" className="text-gradient">With a Purpose.</span>]} />
        </h1>
        <Reveal delay={0.4}>
          <p className="mt-6 text-base md:text-lg text-slate-400 max-w-2xl leading-relaxed">
            {COMPANY.legal} is an Indian technology company focused on software development,
            artificial intelligence, automation and digital transformation.
          </p>
          <p className="mt-4 text-base md:text-lg text-slate-400 max-w-2xl leading-relaxed">
            Based in {COMPANY.location}, the company aims to build practical technology that makes
            complex work simpler, faster and more accessible.
          </p>
        </Reveal>
      </div>
    </section>

    <section className="bg-mist text-slate-900">
      <div className="container-x py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12">
          <Reveal>
            <div className="bg-white border border-slate-200 rounded-2xl p-8 lg:p-10 h-full">
              <p className="eyebrow !text-royal">Our Mission</p>
              <p className="mt-4 text-xl sm:text-2xl font-bold tracking-tight leading-snug">{COMPANY.mission}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="bg-white border border-slate-200 rounded-2xl p-8 lg:p-10 h-full">
              <p className="eyebrow !text-royal">Our Vision</p>
              <p className="mt-4 text-xl sm:text-2xl font-bold tracking-tight leading-snug">{COMPANY.vision}</p>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.num} delay={i * 0.06}>
              <div className="border-l-2 border-royal/60 pl-5 py-1">
                <span className="font-mono text-xs text-royal tracking-widest">Chapter {p.num}</span>
                <h3 className="mt-2 text-lg font-bold">{p.title}</h3>
                <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-navy">
      <div className="container-x py-20 lg:py-28">
        <Reveal>
          <p className="eyebrow mb-4">Founding Team</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
            The People Behind MR AI
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl">
            Five founders, one conviction: real-world work deserves better software.
          </p>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {FOUNDERS.map((f, i) => (
            <Reveal key={f.name} delay={i * 0.07}>
              <div
                data-testid={`founder-card-${f.initials.toLowerCase()}`}
                className="card-dark card-hover p-6 sm:p-7 text-center h-full flex flex-col items-center justify-between"
              >
                <div className="relative mx-auto w-24 h-24">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-royal via-royal-600 to-electric/50 p-[2px]">
                    <div className="w-full h-full rounded-full bg-navy-800 flex items-center justify-center">
                      <span className="text-xl font-extrabold text-gradient">{f.initials}</span>
                    </div>
                  </div>
                  <span className="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full bg-gold border-2 border-navy-800" aria-hidden="true" />
                </div>
                <div className="mt-4">
                  <h3 className="text-base font-bold text-white leading-snug">{f.name}</h3>
                  <p className="mt-1 text-xs font-mono uppercase tracking-widest text-slate-500">Founder</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-[#0A0C13] border-t border-white/[0.06]">
      <div className="container-x py-16 lg:py-24 text-center">
        <Reveal>
          <p className="eyebrow mb-4">Our Presence</p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white max-w-2xl mx-auto">
            Rooted in Uttar Pradesh. Building for India. Aiming for the world.
          </h2>
          <div className="mt-8 grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto text-left">
            <div className="card-dark border border-white/10 p-5 rounded-2xl">
              <span className="eyebrow flex items-center gap-1.5"><MapPin size={13} /> Regional Office</span>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">{COMPANY.regionalAddress}</p>
            </div>
            <div className="card-dark border border-white/10 p-5 rounded-2xl">
              <span className="eyebrow flex items-center gap-1.5"><MapPin size={13} /> Corporate Office</span>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">{COMPANY.corporateAddress}</p>
            </div>
          </div>
        </Reveal>
      </div>
      <Marquee items={["Simplicity", "Security", "Scalability", "Intelligence", "Trust", "Innovation", "Growth"]} />
      <div className="container-x pb-20 text-center">
        <Reveal>
          <Link
            to="/contact"
            data-testid="about-cta"
            className="inline-flex items-center gap-2 bg-royal hover:bg-royal-600 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors duration-300"
          >
            Work With Us <ArrowRight size={16} />
          </Link>
        </Reveal>
      </div>
    </section>
  </>
);

export default About;
