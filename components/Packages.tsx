import type { SiteContent } from "@/lib/content";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

export default function Packages({ content }: { content: SiteContent }) {
  const { packages } = content;
  return (
    <section id="packages" className="bg-cream-deep py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow={packages.eyebrow}
          heading={packages.heading}
          subheading={packages.subheading}
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {packages.items.map((p, i) => (
            <Reveal key={p.name} delay={i * 100}>
              <div
                className={`relative flex h-full flex-col rounded-sm border p-8 transition-all duration-300 hover:-translate-y-2 ${
                  p.featured
                    ? "border-gold bg-ink text-cream shadow-2xl shadow-gold/10"
                    : "border-ink/10 bg-cream text-ink hover:border-gold/50"
                }`}
              >
                {p.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-4 py-1 text-[11px] font-500 tracking-luxe text-ink">
                    ยอดนิยม
                  </span>
                )}
                <h3
                  className={`font-serif text-2xl font-600 ${
                    p.featured ? "text-gold" : "text-ink"
                  }`}
                >
                  {p.name}
                </h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-serif text-4xl font-700">{p.price}</span>
                  <span
                    className={`text-sm ${
                      p.featured ? "text-cream/60" : "text-ink-soft/60"
                    }`}
                  >
                    {p.unit}
                  </span>
                </div>
                <p
                  className={`mt-3 text-sm leading-relaxed ${
                    p.featured ? "text-cream/70" : "text-ink-soft/70"
                  }`}
                >
                  {p.description}
                </p>

                <ul className="mt-6 flex-1 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <svg
                        className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 011.4-1.4l3.8 3.8 6.8-6.8a1 1 0 011.4 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span
                        className={p.featured ? "text-cream/85" : "text-ink-soft/85"}
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`mt-8 rounded-full py-3 text-center text-sm font-500 tracking-wide transition-all ${
                    p.featured
                      ? "bg-gold text-ink hover:bg-gold-light"
                      : "border border-ink/20 text-ink hover:border-gold hover:text-gold"
                  }`}
                >
                  ขอใบเสนอราคา
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-10 text-center text-sm text-ink-soft/60">
            {packages.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
