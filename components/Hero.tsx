import Image from "next/image";
import type { SiteContent } from "@/lib/content";

export default function Hero({ content }: { content: SiteContent }) {
  const { hero, contact } = content;
  const tel = contact.phones[0]?.replace(/[^0-9+]/g, "") ?? "";

  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={hero.backgroundImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="animate-slow-zoom object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/60 to-ink/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-32">
        <div className="max-w-3xl">
          <p
            className="animate-fade-up text-xs tracking-luxe text-gold sm:text-sm"
            style={{ animationDelay: "0.1s", opacity: 0 }}
          >
            {hero.eyebrow}
          </p>
          <div className="gold-rule mt-6 animate-fade-up" style={{ animationDelay: "0.2s", opacity: 0 }} />
          <h1
            className="mt-8 animate-fade-up whitespace-pre-line font-serif text-4xl font-600 leading-tight text-cream text-balance sm:text-5xl lg:text-6xl"
            style={{ animationDelay: "0.3s", opacity: 0 }}
          >
            {hero.title}
          </h1>
          <p
            className="mt-8 max-w-2xl animate-fade-up text-base leading-relaxed text-cream/80 sm:text-lg"
            style={{ animationDelay: "0.45s", opacity: 0 }}
          >
            {hero.subtitle}
          </p>
          <div
            className="mt-10 flex animate-fade-up flex-wrap gap-4"
            style={{ animationDelay: "0.6s", opacity: 0 }}
          >
            <a
              href="#contact"
              className="rounded-full bg-gold px-8 py-4 text-sm font-500 tracking-wide text-ink shadow-lg shadow-gold/20 transition-all hover:bg-gold-light hover:shadow-gold/40"
            >
              {hero.ctaPrimary}
            </a>
            <a
              href="#packages"
              className="rounded-full border border-cream/40 px-8 py-4 text-sm font-500 tracking-wide text-cream transition-all hover:border-gold hover:text-gold"
            >
              {hero.ctaSecondary}
            </a>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#about"
        aria-label="เลื่อนลง"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-cream/60 transition-colors hover:text-gold"
      >
        <svg width="24" height="36" viewBox="0 0 24 36" fill="none">
          <rect x="1" y="1" width="22" height="34" rx="11" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="12" cy="10" r="3" fill="currentColor">
            <animate attributeName="cy" values="10;20;10" dur="1.8s" repeatCount="indefinite" />
          </circle>
        </svg>
      </a>

      {tel && (
        <a
          href={`tel:${tel}`}
          className="sr-only"
        >
          โทรหาเรา
        </a>
      )}
    </section>
  );
}
