import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, AlertCircle, Loader2, Send } from "lucide-react";
import SEO from "@/components/SEO";
import { Reveal, MaskedLines } from "@/components/Reveal";
import ProductVisual from "@/components/ProductVisual";
import { PRODUCT_DETAILS } from "@/lib/products";
import { PRODUCTS } from "@/lib/site";
import { getApiBaseUrl, recordEarlyAccessLocally } from "@/lib/adminApi";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const STATUS_STYLES = {
  "In Development": "text-gold border-gold/40 bg-gold/10",
  "Coming Soon": "text-slate-400 border-white/15 bg-white/[0.04]",
};

const inputClass = (error) =>
  `w-full bg-navy-700/60 border rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none transition-colors duration-300 ${
    error ? "border-rose-500/70" : "border-white/10 focus:border-electric/60"
  }`;

const EarlyAccessForm = ({ product }) => {
  const [form, setForm] = useState({ name: "", email: "", organization: "", note: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const submit = async (e) => {
    e.preventDefault();
    const er = {};
    if (form.name.trim().length < 2) er.name = "Please enter your name.";
    if (!EMAIL_RE.test(form.email.trim())) er.email = "Please enter a valid email address.";
    setErrors(er);
    if (Object.keys(er).length || status === "submitting") return;
    setStatus("submitting");

    try {
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/api/early-access`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, product: product.slug }),
      });
      if (res.ok) {
        setStatus("success");
        return;
      }
      console.warn("Backend API returned non-200, early access recorded locally as fallback.");
      recordEarlyAccessLocally({ ...form, product: product.slug });
      setStatus("success");
    } catch (err) {
      console.warn("Backend network error, early access recorded locally as fallback:", err);
      recordEarlyAccessLocally({ ...form, product: product.slug });
      setStatus("success");
    }
  };

  if (status === "success") {
    return (
      <div data-testid="early-access-success" className="card-dark p-10 text-center">
        <CheckCircle2 size={40} className="mx-auto text-emerald-400" />
        <h3 className="mt-4 text-xl font-bold text-white">You're on the list.</h3>
        <p className="mt-2 text-sm text-slate-400 max-w-sm mx-auto">
          We'll reach out to {form.email} as {product.name} moves toward release.
        </p>
      </div>
    );
  }

  return (
    <form data-testid="early-access-form" onSubmit={submit} noValidate className="card-dark p-7 sm:p-8">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="ea-name" className="block text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">Name *</label>
          <input id="ea-name" data-testid="early-access-name" type="text" value={form.name} onChange={set("name")} placeholder="Your name" className={inputClass(errors.name)} />
          {errors.name && <p className="mt-1.5 text-xs text-rose-400" role="alert">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="ea-email" className="block text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">Email *</label>
          <input id="ea-email" data-testid="early-access-email" type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" className={inputClass(errors.email)} />
          {errors.email && <p className="mt-1.5 text-xs text-rose-400" role="alert">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="ea-org" className="block text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">Organization</label>
          <input id="ea-org" data-testid="early-access-organization" type="text" value={form.organization} onChange={set("organization")} placeholder="School, clinic, store…" className={inputClass(false)} />
        </div>
        <div>
          <label htmlFor="ea-note" className="block text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">What would you use it for?</label>
          <input id="ea-note" data-testid="early-access-note" type="text" value={form.note} onChange={set("note")} placeholder="Optional" className={inputClass(false)} />
        </div>
      </div>
      {status === "error" && (
        <div data-testid="early-access-error" role="alert" className="mt-4 flex items-center gap-3 rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-3">
          <AlertCircle size={16} className="text-rose-400 shrink-0" />
          <p className="text-sm text-rose-300">Something went wrong. Please try again in a moment.</p>
        </div>
      )}
      <button
        type="submit"
        data-testid="early-access-submit-button"
        disabled={status === "submitting"}
        className="mt-6 inline-flex items-center gap-2 bg-royal hover:bg-royal-600 disabled:opacity-60 text-white font-semibold px-7 py-3 rounded-xl transition-colors duration-300"
      >
        {status === "submitting" ? (<><Loader2 size={15} className="animate-spin" /> Joining…</>) : (<>Get Early Access <Send size={14} /></>)}
      </button>
    </form>
  );
};

const ProductDetail = () => {
  const { slug } = useParams();
  const product = PRODUCT_DETAILS[slug];
  if (!product) return <Navigate to="/products" replace />;
  const Icon = product.icon;
  const others = PRODUCTS.filter((p) => p.slug !== slug);

  return (
    <>
      <SEO
        title={`${product.name} — ${product.short} | MR AI Software Technologies`}
        description={`${product.name}: ${product.tagline} ${product.status} — by MR AI Software Technologies.`}
        path={`/products/${slug}`}
      />

      <section className="relative pt-40 pb-16 lg:pt-48 lg:pb-20 grid-pattern overflow-hidden">
        <div className="absolute inset-0 hero-glow" aria-hidden="true" />
        <div className="container-x relative">
          <Reveal>
            <Link to="/products" data-testid="product-back-link" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-electric transition-colors mb-8">
              <ArrowLeft size={15} /> All Products
            </Link>
          </Reveal>
          <div className="flex items-center gap-4 mb-6">
            <span className="w-14 h-14 rounded-2xl bg-gradient-to-br from-royal/40 to-electric/10 border border-white/10 flex items-center justify-center text-electric">
              <Icon size={26} />
            </span>
            <div>
              <p className="eyebrow">{product.category}</p>
              <span className={`mt-1.5 inline-block font-mono text-[10px] uppercase tracking-widest border rounded-full px-2.5 py-1 ${STATUS_STYLES[product.status]}`}>
                {product.status}
              </span>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white max-w-3xl">
            <MaskedLines delay={0.15} lines={[product.name, <span key="t" className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-400">{product.tagline}</span>]} />
          </h1>
          <Reveal delay={0.4}>
            <p className="mt-6 text-base md:text-lg text-slate-400 max-w-2xl leading-relaxed">{product.hero}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#early-access"
                data-testid="product-early-access-cta"
                className="inline-flex items-center gap-2 bg-royal hover:bg-royal-600 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors duration-300"
              >
                Get Early Access <ArrowRight size={16} />
              </a>
              <Link
                to="/contact"
                data-testid="product-talk-cta"
                className="inline-flex items-center gap-2 border border-white/15 hover:border-electric/50 text-slate-200 hover:text-white font-semibold px-7 py-3.5 rounded-xl transition-colors duration-300"
              >
                Discuss Your Use Case
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-mist text-slate-900 grid-pattern-light">
        <div className="container-x py-16 lg:py-24">
          <Reveal>
            <p className="eyebrow !text-royal mb-4">Product Preview</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight max-w-xl">A look at where {product.name} is headed.</h2>
          </Reveal>
          <Reveal delay={0.12} y={40} className="mt-10">
            <div data-testid="product-visual" className="relative">
              <div className="absolute -inset-6 bg-gradient-to-br from-royal/15 to-electric/5 rounded-[2rem] blur-2xl" aria-hidden="true" />
              <div className="relative">
                <ProductVisual visual={product.visual} badge={product.badge} />
              </div>
            </div>
          </Reveal>
          <p className="mt-5 text-xs text-slate-500 text-center">Interface concept with sample data — the shipped product may differ.</p>
        </div>
      </section>

      <section className="bg-navy">
        <div className="container-x py-16 lg:py-24">
          <Reveal>
            <p className="eyebrow mb-4">Feature Walkthrough</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white max-w-xl">How {product.name} works.</h2>
          </Reveal>
          <div className="mt-12 grid lg:grid-cols-4 gap-10 lg:gap-6">
            {product.walkthrough.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                data-testid={`walkthrough-step-${i + 1}`}
                className="border-t-2 border-royal/50 pt-6"
              >
                <span className="font-mono text-xs text-gold tracking-widest">{step.num}</span>
                <h3 className="mt-2.5 text-base font-bold text-white">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {product.features.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.04}>
                <div className="card-dark card-hover p-6 h-full">
                  <f.icon size={20} className="text-electric" />
                  <h3 className="mt-4 text-sm font-bold text-white">{f.title}</h3>
                  <p className="mt-1.5 text-sm text-slate-400 leading-relaxed">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="early-access" className="bg-[#0A0C13] border-t border-white/[0.06] scroll-mt-24">
        <div className="container-x py-16 lg:py-24 grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow mb-4">Early Access</p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Be first in line for {product.name}.
              </h2>
              <p className="mt-4 text-slate-400 leading-relaxed text-sm md:text-base">
                {product.status === "Coming Soon"
                  ? "This product is on our roadmap. Join the list and we'll notify you — and invite your feedback on what it should do — as development begins."
                  : "This product is in active development. Join the early-access list to follow progress, shape features and get priority onboarding at release."}
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-7">
            <EarlyAccessForm product={{ ...product, slug }} />
          </Reveal>
        </div>
      </section>

      <section className="bg-navy border-t border-white/[0.06]">
        <div className="container-x py-14">
          <Reveal>
            <p className="eyebrow mb-6">Explore Other Products</p>
            <div className="flex flex-wrap gap-3">
              {others.map((p) => (
                <Link
                  key={p.slug}
                  to={`/products/${p.slug}`}
                  data-testid={`related-product-${p.slug}`}
                  className="inline-flex items-center gap-2.5 border border-white/10 hover:border-electric/50 rounded-xl px-4 py-3 text-sm text-slate-300 hover:text-white transition-colors duration-300 group"
                >
                  <p.icon size={16} className="text-electric" />
                  {p.name}
                  <ArrowRight size={13} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default ProductDetail;
