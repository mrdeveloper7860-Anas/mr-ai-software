import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import SEO from "@/components/SEO";
import { Reveal } from "@/components/Reveal";
import DashboardMockup from "@/components/DashboardMockup";
import { PRODUCTS, FLAGSHIP_FEATURES } from "@/lib/site";

const STATUS_STYLES = {
  "In Development": "text-gold border-gold/40 bg-gold/10",
  "Coming Soon": "text-slate-500 border-slate-300 bg-slate-100",
};

const Products = () => (
  <>
    <SEO
      title="Products | MR AI Software Technologies"
      description="Modular software platforms from MR AI — fee management, education, healthcare, commerce, office and AI assistant products."
      path="/products"
    />
    <section className="relative pt-40 pb-20 lg:pt-48 lg:pb-24 grid-pattern overflow-hidden">
      <div className="absolute inset-0 hero-glow" aria-hidden="true" />
      <div className="container-x relative">
        <Reveal>
          <p className="eyebrow mb-4">Products</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white max-w-3xl">
            Software Products for <span className="text-gradient">Everyday Business.</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-slate-400 max-w-2xl leading-relaxed">
            MR AI is building modular software platforms designed to simplify everyday operations
            across multiple industries. Products shown here are in active development — status is
            marked honestly on every card.
          </p>
        </Reveal>
      </div>
    </section>

    <section className="bg-mist text-slate-900">
      <div className="container-x py-20 lg:py-28">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PRODUCTS.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.05}>
              <Link
                to={`/products/${p.slug}`}
                data-testid={`products-page-card-${p.slug}`}
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
                <h2 className="mt-5 text-lg font-bold tracking-tight">{p.name}</h2>
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

    <section className="bg-navy relative overflow-hidden">
      <div className="absolute -bottom-40 right-0 w-[700px] h-[500px] rounded-full bg-royal/10 blur-[140px]" aria-hidden="true" />
      <div className="container-x relative py-20 lg:py-32">
        <div className="grid lg:grid-cols-12 gap-14 items-center">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow mb-4">Flagship Product</p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
                MR AI Fee Management
              </h2>
              <p className="mt-4 text-base md:text-lg text-slate-400 leading-relaxed">
                A practical digital fee and transaction management system designed to simplify
                educational institution operations.
              </p>
            </Reveal>
            <ul className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {FLAGSHIP_FEATURES.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-slate-300">
                  <Check size={14} className="text-emerald-400 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Reveal delay={0.15}>
              <Link
                to="/products/fee-management"
                data-testid="flagship-page-cta"
                className="mt-9 inline-flex items-center gap-2 bg-royal hover:bg-royal-600 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors duration-300"
              >
                Request Early Access <ArrowRight size={16} />
              </Link>
            </Reveal>
          </div>
          <Reveal delay={0.1} y={40} className="lg:col-span-7">
            <DashboardMockup />
          </Reveal>
        </div>
      </div>
    </section>
  </>
);

export default Products;
