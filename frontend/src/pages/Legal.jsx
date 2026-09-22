import SEO from "@/components/SEO";
import { Reveal } from "@/components/Reveal";
import { COMPANY } from "@/lib/site";

const LegalShell = ({ title, updated, children, testid }) => (
  <section data-testid={testid} className="relative pt-40 pb-24 lg:pt-48 grid-pattern">
    <div className="absolute inset-x-0 top-0 h-[420px] hero-glow" aria-hidden="true" />
    <div className="container-x relative max-w-3xl">
      <Reveal>
        <p className="eyebrow mb-4">Legal</p>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">{title}</h1>
        <p className="mt-3 font-mono text-xs text-slate-500 tracking-widest uppercase">Last updated: {updated}</p>
        <div className="mt-10 space-y-8 text-slate-300 leading-relaxed text-[15px]">{children}</div>
      </Reveal>
    </div>
  </section>
);

const H = ({ children }) => <h2 className="text-lg font-bold text-white tracking-tight pt-2">{children}</h2>;

export const PrivacyPolicy = () => (
  <>
    <SEO
      title="Privacy Policy | MR AI Software Technologies"
      description="How MR AI Software Technologies collects, uses and protects information shared through this website."
      path="/privacy-policy"
    />
    <LegalShell title="Privacy Policy" updated="July 2026" testid="privacy-policy-page">
      <p>
        {COMPANY.legal} ("MR AI", "we", "us") respects your privacy. This policy explains what
        information we collect through this website and how we use it.
      </p>
      <div>
        <H>Information we collect</H>
        <p className="mt-2">
          When you submit our contact form, we collect your name, organization, email address,
          phone number, the service you are interested in and your project description. We also
          receive standard technical information (such as browser type) that web servers typically log.
        </p>
      </div>
      <div>
        <H>How we use it</H>
        <p className="mt-2">
          We use the information you provide solely to respond to your inquiry, discuss potential
          work and maintain a record of our communication. We do not sell your information, and we
          do not use it for unrelated marketing without your consent.
        </p>
      </div>
      <div>
        <H>Storage and security</H>
        <p className="mt-2">
          Inquiry data is stored in our secured database and delivered to our team by email. We apply
          reasonable technical and organizational measures to protect it. No method of transmission
          over the internet is completely secure, and we encourage you not to share sensitive
          credentials or financial details through the form.
        </p>
      </div>
      <div>
        <H>Your choices</H>
        <p className="mt-2">
          You may ask us to update or delete the information you have shared by emailing
          {" "}<a href={`mailto:${COMPANY.email}`} className="text-electric hover:underline">{COMPANY.email}</a>.
        </p>
      </div>
      <div>
        <H>Changes to this policy</H>
        <p className="mt-2">
          We may update this policy as our services evolve. The "last updated" date above reflects
          the latest revision.
        </p>
      </div>
    </LegalShell>
  </>
);

export const Terms = () => (
  <>
    <SEO
      title="Terms & Conditions | MR AI Software Technologies"
      description="Terms governing the use of the MR AI Software Technologies website and engagement of its services."
      path="/terms"
    />
    <LegalShell title="Terms & Conditions" updated="July 2026" testid="terms-page">
      <p>
        These terms govern your use of the {COMPANY.legal} website. By using this website, you
        accept these terms. Specific project work is governed by separate written agreements.
      </p>
      <div>
        <H>About the content on this website</H>
        <p className="mt-2">
          Product cards, dashboards and interfaces shown on this website may include items marked
          "Demo", "Demo Data", "UI Concept", "In Development" or "Coming Soon". These are
          illustrative materials and do not represent commercially launched products or deployed
          customer systems unless explicitly stated.
        </p>
      </div>
      <div>
        <H>Intellectual property</H>
        <p className="mt-2">
          The MR AI name, logo, website design and original content are the property of
          {" "}{COMPANY.legal}. You may not reuse them without written permission.
        </p>
      </div>
      <div>
        <H>Acceptable use</H>
        <p className="mt-2">
          You agree not to misuse this website, attempt to disrupt its operation, or submit
          unlawful, misleading or malicious content through its forms.
        </p>
      </div>
      <div>
        <H>No warranty</H>
        <p className="mt-2">
          This website is provided "as is" for general information. While we work hard to keep it
          accurate, we do not warrant that all content is complete or error-free. Engagements,
          deliverables, timelines and warranties for actual software work are defined in individual
          agreements signed with clients.
        </p>
      </div>
      <div>
        <H>Governing law</H>
        <p className="mt-2">
          These terms are governed by the laws of India, with jurisdiction in the courts of
          Uttar Pradesh.
        </p>
      </div>
      <div>
        <H>Contact</H>
        <p className="mt-2">
          Questions about these terms:{" "}
          <a href={`mailto:${COMPANY.email}`} className="text-electric hover:underline">{COMPANY.email}</a> · {COMPANY.phone} · {COMPANY.location}.
        </p>
      </div>
    </LegalShell>
  </>
);
