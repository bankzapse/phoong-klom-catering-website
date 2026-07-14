import type { SiteContent } from "@/lib/content";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

function Icon({ name }: { name: string }) {
  const common = "h-5 w-5";
  switch (name) {
    case "phone":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3-8.6A2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.4 1.8.7 2.7a2 2 0 01-.5 2.1L8.1 9.9a16 16 0 006 6l1.4-1.2a2 2 0 012.1-.5c.9.3 1.8.6 2.7.7a2 2 0 011.7 2z" />
        </svg>
      );
    case "mail":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m2 7 10 6 10-6" />
        </svg>
      );
    case "pin":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0118 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      );
    case "clock":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
    case "line":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.5 2 2 5.7 2 10.2c0 4 3.5 7.4 8.3 8 .3.1.8.2.9.5.1.3.1.7 0 1l-.1.9c0 .3-.2 1 .9.6 1.1-.5 6-3.5 8.2-6C21.5 13.7 22 12 22 10.2 22 5.7 17.5 2 12 2zM8 12.8H6.2c-.3 0-.5-.2-.5-.5V8.8c0-.3.2-.5.5-.5s.5.2.5.5v3h1.3c.3 0 .5.2.5.5s-.2.5-.5.5zm2-.5c0 .3-.2.5-.5.5s-.5-.2-.5-.5V8.8c0-.3.2-.5.5-.5s.5.2.5.5v3.5zm4.6 0c0 .2-.1.4-.3.5h-.2c-.2 0-.3-.1-.4-.2l-1.8-2.5v2.2c0 .3-.2.5-.5.5s-.5-.2-.5-.5V8.8c0-.2.1-.4.3-.5.2-.1.5 0 .6.2l1.8 2.5V8.8c0-.3.2-.5.5-.5s.5.2.5.5v3.5zm3-2.3c.3 0 .5.2.5.5s-.2.5-.5.5h-1.3v.8h1.3c.3 0 .5.2.5.5s-.2.5-.5.5h-1.8c-.3 0-.5-.2-.5-.5V8.8c0-.3.2-.5.5-.5h1.8c.3 0 .5.2.5.5s-.2.5-.5.5h-1.3v.8h1.3z" />
        </svg>
      );
    case "facebook":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="currentColor">
          <path d="M22 12a10 10 0 10-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0022 12z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Contact({ content }: { content: SiteContent }) {
  const { contact, brand } = content;

  const rows: { icon: string; label: string; value: string; href?: string }[] = [];
  contact.phones.forEach((p) =>
    rows.push({ icon: "phone", label: "โทรศัพท์", value: p, href: `tel:${p.replace(/[^0-9+]/g, "")}` })
  );
  if (contact.email)
    rows.push({ icon: "mail", label: "อีเมล", value: contact.email, href: `mailto:${contact.email}` });
  if (contact.lineId)
    rows.push({
      icon: "line",
      label: "LINE",
      value: contact.lineId,
      href: `https://line.me/ti/p/~${contact.lineId.replace(/^@/, "")}`,
    });
  if (contact.facebook)
    rows.push({ icon: "facebook", label: "Facebook", value: contact.facebook, href: contact.facebook.startsWith("http") ? contact.facebook : `https://facebook.com/${contact.facebook}` });
  if (contact.hours) rows.push({ icon: "clock", label: "เวลาทำการ", value: contact.hours });
  if (contact.address) rows.push({ icon: "pin", label: "ที่อยู่", value: contact.address });

  return (
    <section id="contact" className="bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow={contact.eyebrow}
          heading={contact.heading}
          subheading={contact.subheading}
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="space-y-6">
              {rows.map((r, i) => {
                const inner = (
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
                      <Icon name={r.icon} />
                    </span>
                    <div>
                      <div className="text-xs tracking-wide text-ink-soft/50">
                        {r.label}
                      </div>
                      <div className="mt-1 text-ink transition-colors group-hover:text-gold">
                        {r.value}
                      </div>
                    </div>
                  </div>
                );
                return r.href ? (
                  <a key={i} href={r.href} className="group block" target={r.icon === "facebook" || r.icon === "line" ? "_blank" : undefined} rel="noopener noreferrer">
                    {inner}
                  </a>
                ) : (
                  <div key={i}>{inner}</div>
                );
              })}

              <div className="border-t border-gold/20 pt-6 text-sm text-ink-soft/60">
                <p className="font-500 text-ink-soft/80">{brand.legalName}</p>
                <p className="mt-1">เลขทะเบียน {brand.registrationNo}</p>
              </div>

              <a
                href={`tel:${contact.phones[0]?.replace(/[^0-9+]/g, "") ?? ""}`}
                className="inline-flex rounded-full bg-gold px-8 py-4 text-sm font-500 tracking-wide text-ink shadow-lg shadow-gold/20 transition-all hover:bg-gold-light"
              >
                โทรจองงานเลย
              </a>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="h-full min-h-80 overflow-hidden rounded-sm border border-ink/10">
              <iframe
                title="แผนที่"
                src={contact.mapEmbedUrl}
                className="h-full min-h-80 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
