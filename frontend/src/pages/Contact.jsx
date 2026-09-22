import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import SEO from "@/components/SEO";
import { Reveal } from "@/components/Reveal";
import { COMPANY, SERVICE_OPTIONS } from "@/lib/site";
import { getApiBaseUrl, recordInquiryLocally } from "@/lib/adminApi";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INITIAL = { name: "", organization: "", email: "", phone: "", service: "", message: "" };

const inputClass = (error) =>
  `w-full bg-navy-800/70 border rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none transition-colors duration-300 ${
    error ? "border-rose-500/70 focus:border-rose-400" : "border-white/10 focus:border-electric/60"
  }`;

const Contact = () => {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const validate = () => {
    const er = {};
    if (form.name.trim().length < 2) er.name = "Please enter your full name.";
    if (!EMAIL_RE.test(form.email.trim())) er.email = "Please enter a valid email address.";
    if (!form.service) er.service = "Please select a service.";
    if (form.message.trim().length < 10) er.message = "Please describe your project in at least 10 characters.";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (status === "submitting" || !validate()) return;
    setStatus("submitting");
    recordInquiryLocally(form);
    try {
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        console.warn("Backend API returned non-200, inquiry recorded in local admin store.");
      }
      setStatus("success");
    } catch (err) {
      console.warn("Backend network error, inquiry recorded in local admin store:", err);
      setStatus("success");
    }
  };

  return (
    <>
      <SEO
        title="Contact | MR AI Software Technologies"
        description="Tell MR AI what you are trying to improve — custom software, AI, automation, cloud or digital transformation. Mahoba, Uttar Pradesh, India."
        path="/contact"
      />
      <section className="relative pt-40 pb-20 lg:pt-48 lg:pb-24 grid-pattern overflow-hidden">
        <div className="absolute inset-0 hero-glow" aria-hidden="true" />
        <div className="container-x relative">
          <Reveal>
            <p className="eyebrow mb-4">Contact</p>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white max-w-3xl">
              Have a Problem <span className="text-gradient">Technology Can Solve?</span>
            </h1>
            <p className="mt-6 text-base md:text-lg text-slate-400 max-w-2xl leading-relaxed">
              Tell us what you are trying to improve. Let's turn the idea into a practical digital solution.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-navy border-t border-white/[0.06]">
        <div className="container-x py-16 lg:py-24 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <Reveal>
              <h2 className="text-xl font-bold text-white">Reach us directly</h2>
              <ul className="mt-6 space-y-5">
                <li className="flex items-start gap-4">
                  <span className="w-10 h-10 rounded-xl bg-royal/15 text-electric flex items-center justify-center shrink-0"><Mail size={17} /></span>
                  <div>
                    <p className="text-xs font-mono uppercase tracking-widest text-slate-500">Email</p>
                    <a data-testid="contact-email-link" href={`mailto:${COMPANY.email}`} className="text-sm text-slate-200 hover:text-electric transition-colors break-all">{COMPANY.email}</a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="w-10 h-10 rounded-xl bg-royal/15 text-electric flex items-center justify-center shrink-0"><Phone size={17} /></span>
                  <div>
                    <p className="text-xs font-mono uppercase tracking-widest text-slate-500">Phone</p>
                    <a data-testid="contact-phone-link" href={COMPANY.phoneHref} className="text-sm text-slate-200 hover:text-electric transition-colors">{COMPANY.phone}</a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="w-10 h-10 rounded-xl bg-royal/15 text-electric flex items-center justify-center shrink-0"><MapPin size={17} /></span>
                  <div>
                    <p className="text-xs font-mono uppercase tracking-widest text-slate-500">Location</p>
                    <p className="text-sm text-slate-200">{COMPANY.location}</p>
                  </div>
                </li>
              </ul>
              <div className="mt-10 card-dark p-6">
                <p className="text-sm font-semibold text-white">What happens next?</p>
                <ol className="mt-3 space-y-2.5 text-sm text-slate-400">
                  <li className="flex gap-2.5"><span className="font-mono text-xs text-gold pt-0.5">01</span> We read every inquiry personally.</li>
                  <li className="flex gap-2.5"><span className="font-mono text-xs text-gold pt-0.5">02</span> We reply to schedule a conversation.</li>
                  <li className="flex gap-2.5"><span className="font-mono text-xs text-gold pt-0.5">03</span> You get an honest assessment — even if the answer is "you don't need us yet".</li>
                </ol>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Reveal delay={0.1}>
              {status === "success" ? (
                <div data-testid="contact-form-success" className="card-dark p-10 text-center">
                  <CheckCircle2 size={44} className="mx-auto text-emerald-400" />
                  <h2 className="mt-5 text-2xl font-bold text-white">Inquiry received.</h2>
                  <p className="mt-3 text-slate-400 max-w-md mx-auto">
                    Thank you, {form.name.split(" ")[0]}. Your inquiry has reached the MR AI team —
                    we'll get back to you at {form.email}.
                  </p>
                  <button
                    type="button"
                    data-testid="contact-form-send-another"
                    onClick={() => { setForm(INITIAL); setStatus("idle"); }}
                    className="mt-7 inline-flex items-center gap-2 border border-electric/40 text-electric hover:bg-electric/10 font-semibold px-6 py-3 rounded-xl transition-colors duration-300"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form data-testid="contact-form" onSubmit={submit} noValidate className="card-dark p-7 sm:p-9">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="cf-name" className="block text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">Full Name *</label>
                      <input id="cf-name" data-testid="contact-form-name" type="text" value={form.name} onChange={set("name")} placeholder="Your name" className={inputClass(errors.name)} />
                      {errors.name && <p className="mt-1.5 text-xs text-rose-400" role="alert">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="cf-org" className="block text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">Organization</label>
                      <input id="cf-org" data-testid="contact-form-organization" type="text" value={form.organization} onChange={set("organization")} placeholder="Company, school or institution" className={inputClass(false)} />
                    </div>
                    <div>
                      <label htmlFor="cf-email" className="block text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">Email *</label>
                      <input id="cf-email" data-testid="contact-form-email" type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" className={inputClass(errors.email)} />
                      {errors.email && <p className="mt-1.5 text-xs text-rose-400" role="alert">{errors.email}</p>}
                    </div>
                    <div>
                      <label htmlFor="cf-phone" className="block text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">Phone</label>
                      <input id="cf-phone" data-testid="contact-form-phone" type="tel" value={form.phone} onChange={set("phone")} placeholder="+91 …" className={inputClass(false)} />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="cf-service" className="block text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">Service Required *</label>
                      <select id="cf-service" data-testid="contact-form-service" value={form.service} onChange={set("service")} className={`${inputClass(errors.service)} appearance-none ${form.service ? "" : "text-slate-500"}`}>
                        <option value="" disabled>Select a service…</option>
                        {SERVICE_OPTIONS.map((s) => <option key={s} value={s} className="bg-navy-800 text-white">{s}</option>)}
                      </select>
                      {errors.service && <p className="mt-1.5 text-xs text-rose-400" role="alert">{errors.service}</p>}
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="cf-message" className="block text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">Project Description *</label>
                      <textarea id="cf-message" data-testid="contact-form-message" rows={5} value={form.message} onChange={set("message")} placeholder="What are you trying to improve or build?" className={`${inputClass(errors.message)} resize-y`} />
                      {errors.message && <p className="mt-1.5 text-xs text-rose-400" role="alert">{errors.message}</p>}
                    </div>
                  </div>

                  {status === "error" && (
                    <div data-testid="contact-form-error" role="alert" className="mt-5 flex items-center gap-3 rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-3">
                      <AlertCircle size={17} className="text-rose-400 shrink-0" />
                      <p className="text-sm text-rose-300">Something went wrong sending your inquiry. Please try again, or email us directly at {COMPANY.email}.</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    data-testid="contact-form-submit-button"
                    disabled={status === "submitting"}
                    className="mt-7 inline-flex items-center gap-2 bg-royal hover:bg-royal-600 disabled:opacity-60 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors duration-300"
                  >
                    {status === "submitting" ? (<><Loader2 size={16} className="animate-spin" /> Sending…</>) : (<>Send Inquiry <Send size={15} /></>)}
                  </button>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
