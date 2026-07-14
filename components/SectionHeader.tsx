import Reveal from "./Reveal";

export default function SectionHeader({
  eyebrow,
  heading,
  subheading,
  align = "center",
  dark = false,
}: {
  eyebrow: string;
  heading: string;
  subheading?: string;
  align?: "center" | "left";
  dark?: boolean;
}) {
  const isCenter = align === "center";
  return (
    <div
      className={`${isCenter ? "mx-auto text-center" : "text-left"} max-w-2xl`}
    >
      <Reveal>
        <p className="text-xs tracking-luxe text-gold sm:text-sm">{eyebrow}</p>
      </Reveal>
      <Reveal delay={80}>
        <div className={`gold-rule mt-4 ${isCenter ? "mx-auto" : ""}`} />
      </Reveal>
      <Reveal delay={120}>
        <h2
          className={`mt-6 whitespace-pre-line font-serif text-3xl font-600 leading-tight text-balance sm:text-4xl ${
            dark ? "text-cream" : "text-ink"
          }`}
        >
          {heading}
        </h2>
      </Reveal>
      {subheading && (
        <Reveal delay={180}>
          <p
            className={`mt-5 text-base leading-relaxed ${
              dark ? "text-cream/70" : "text-ink-soft/75"
            }`}
          >
            {subheading}
          </p>
        </Reveal>
      )}
    </div>
  );
}
