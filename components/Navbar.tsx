"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#about", label: "เกี่ยวกับเรา" },
  { href: "#services", label: "บริการ" },
  { href: "#packages", label: "แพ็กเกจ" },
  { href: "#gallery", label: "ผลงาน" },
  { href: "#contact", label: "ติดต่อ" },
];

export default function Navbar({
  brandTh,
  brandEn,
  phone,
}: {
  brandTh: string;
  brandEn: string;
  phone: string;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const telHref = `tel:${phone.replace(/[^0-9+]/g, "")}`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-ink/95 backdrop-blur-md shadow-lg shadow-black/20 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <a href="#top" className="group flex flex-col leading-none">
          <span className="font-serif text-xl font-600 tracking-wide text-cream sm:text-2xl">
            {brandTh}
          </span>
          <span className="mt-0.5 text-[10px] tracking-luxe text-gold">
            {brandEn}
          </span>
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative text-sm text-cream/80 transition-colors hover:text-gold"
            >
              {l.label}
            </a>
          ))}
          <a
            href={telHref}
            className="rounded-full border border-gold/60 px-5 py-2 text-sm text-gold transition-all hover:bg-gold hover:text-ink"
          >
            โทร {phone}
          </a>
        </div>

        <button
          aria-label="เมนู"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span
            className={`h-0.5 w-6 bg-cream transition-all ${
              open ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-cream transition-all ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`h-0.5 w-6 bg-cream transition-all ${
              open ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden bg-ink/98 backdrop-blur-md transition-all duration-500 lg:hidden ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-1 px-6 py-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-white/5 py-3 text-cream/80 transition-colors hover:text-gold"
            >
              {l.label}
            </a>
          ))}
          <a
            href={telHref}
            className="mt-3 rounded-full bg-gold px-5 py-3 text-center text-sm font-500 text-ink"
          >
            โทร {phone}
          </a>
        </div>
      </div>
    </header>
  );
}
