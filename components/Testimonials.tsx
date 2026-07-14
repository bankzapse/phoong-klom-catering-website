import type { SiteContent } from "@/lib/content";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

export default function Testimonials({ content }: { content: SiteContent }) {
  const { testimonials } = content;
  if (!testimonials.items.length) return null;
  return (
    <section className="relative bg-ink py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow={testimonials.eyebrow}
          heading={testimonials.heading}
          dark
        />

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {testimonials.items.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <figure className="flex h-full flex-col rounded-sm border border-white/10 bg-ink-soft p-8">
                <div className="font-serif text-5xl leading-none text-gold">“</div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-cream/80">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 border-t border-white/10 pt-4">
                  <div className="font-500 text-cream">{t.name}</div>
                  <div className="mt-0.5 text-xs text-gold">{t.role}</div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
