import Image from "next/image";
import type { SiteContent } from "@/lib/content";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

export default function Services({ content }: { content: SiteContent }) {
  const { services } = content;
  return (
    <section id="services" className="bg-ink py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow={services.eyebrow}
          heading={services.heading}
          subheading={services.subheading}
          dark
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.items.map((s, i) => (
            <Reveal key={s.title} delay={i * 90}>
              <article className="group relative h-96 overflow-hidden rounded-sm">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-serif text-xl font-600 text-cream">
                    {s.title}
                  </h3>
                  <div className="gold-rule mt-3 opacity-70" />
                  <p className="mt-3 max-h-0 overflow-hidden text-sm leading-relaxed text-cream/75 opacity-0 transition-all duration-500 group-hover:max-h-40 group-hover:opacity-100">
                    {s.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
