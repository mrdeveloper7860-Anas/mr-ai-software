import { Reveal } from "@/components/Reveal";

const SectionHeading = ({ eyebrow, title, description, light = false, align = "left" }) => (
  <Reveal className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
    {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
    <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight ${light ? "text-slate-900" : "text-white"}`}>
      {title}
    </h2>
    {description && (
      <p className={`mt-4 text-base md:text-lg leading-relaxed ${light ? "text-slate-600" : "text-slate-400"}`}>
        {description}
      </p>
    )}
  </Reveal>
);

export default SectionHeading;
