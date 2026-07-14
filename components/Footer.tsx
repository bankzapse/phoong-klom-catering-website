import type { SiteContent } from "@/lib/content";

export default function Footer({ content }: { content: SiteContent }) {
  const { brand, contact } = content;
  const year = 2026;

  return (
    <footer className="bg-ink py-14 text-cream">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="font-serif text-2xl font-600 text-cream">
              {brand.nameTh}
            </div>
            <div className="mt-1 text-[11px] tracking-luxe text-gold">
              {brand.nameEn}
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/60">
              {brand.tagline} — บริการจัดเลี้ยงครบวงจร ดูแลทุกรายละเอียดของงานคุณ
            </p>
          </div>

          <div>
            <h4 className="text-xs tracking-luxe text-gold">เมนู</h4>
            <ul className="mt-4 space-y-2 text-sm text-cream/70">
              <li><a href="#about" className="hover:text-gold">เกี่ยวกับเรา</a></li>
              <li><a href="#services" className="hover:text-gold">บริการ</a></li>
              <li><a href="#packages" className="hover:text-gold">แพ็กเกจ</a></li>
              <li><a href="#gallery" className="hover:text-gold">ผลงาน</a></li>
              <li><a href="#contact" className="hover:text-gold">ติดต่อ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs tracking-luxe text-gold">ติดต่อ</h4>
            <ul className="mt-4 space-y-2 text-sm text-cream/70">
              {contact.phones.map((p) => (
                <li key={p}>
                  <a href={`tel:${p.replace(/[^0-9+]/g, "")}`} className="hover:text-gold">
                    {p}
                  </a>
                </li>
              ))}
              {contact.email && (
                <li>
                  <a href={`mailto:${contact.email}`} className="hover:text-gold">
                    {contact.email}
                  </a>
                </li>
              )}
              <li className="max-w-xs pt-1 text-cream/50">{contact.address}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-cream/40">
          <p>{brand.legalName} · เลขทะเบียน {brand.registrationNo}</p>
          <p className="mt-2">
            © {year} {brand.nameTh}. สงวนลิขสิทธิ์.
          </p>
        </div>
      </div>
    </footer>
  );
}
