import Image from "next/image";
import type { SiteContent } from "@/lib/content";
import Reveal from "./Reveal";

export default function About({ content }: { content: SiteContent }) {
  const { about } = content;
  return (
    <section id="about" className="bg-cream py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
            <Image
              src={about.image}
              alt={about.heading}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-4 hidden h-32 w-32 border-b-2 border-r-2 border-gold sm:block" />
          <div className="absolute -left-4 -top-6 hidden h-32 w-32 border-l-2 border-t-2 border-gold sm:block" />
        </Reveal>

        <div>
          <Reveal>
            <p className="text-xs tracking-luxe text-gold sm:text-sm">
              {about.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={80}>
            <div className="gold-rule mt-4" />
          </Reveal>
          <Reveal delay={120}>
            <h2 className="mt-6 whitespace-pre-line font-serif text-3xl font-600 leading-tight text-ink text-balance sm:text-4xl">
              {about.heading}
            </h2>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-6 text-base leading-relaxed text-ink-soft/80">
              {about.body}
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-gold/20 pt-8">
              {about.stats.map((s) => (
                <div key={s.label}>
                  <div className="font-serif text-3xl font-600 text-gold sm:text-4xl">
                    {s.value}
                  </div>
                  <div className="mt-1 text-xs text-ink-soft/70 sm:text-sm">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
