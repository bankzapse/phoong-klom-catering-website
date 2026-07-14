import Image from "next/image";
import type { SiteContent } from "@/lib/content";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

export default function Gallery({ content }: { content: SiteContent }) {
  const { gallery } = content;
  return (
    <section id="gallery" className="bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow={gallery.eyebrow}
          heading={gallery.heading}
          subheading={gallery.subheading}
        />

        <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-3">
          {gallery.items.map((g, i) => (
            <Reveal
              key={i}
              delay={(i % 3) * 90}
              className={i % 5 === 0 ? "md:row-span-2" : ""}
            >
              <figure
                className={`group relative overflow-hidden rounded-sm ${
                  i % 5 === 0 ? "aspect-[3/4] md:h-full" : "aspect-square"
                }`}
              >
                <Image
                  src={g.image}
                  alt={g.caption}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <figcaption className="p-5 text-sm font-500 text-cream">
                    {g.caption}
                  </figcaption>
                </div>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
