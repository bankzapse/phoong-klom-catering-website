import type { SiteContent } from "@/lib/content";

export default function JsonLd({ content }: { content: SiteContent }) {
  const { brand, contact, seo } = content;

  const schema = {
    "@context": "https://schema.org",
    "@type": "CateringService",
    name: brand.nameTh,
    alternateName: brand.nameEn,
    legalName: brand.legalName,
    description: seo.description,
    url: seo.siteUrl,
    image: seo.ogImage,
    telephone: contact.phones.map((p) => p.replace(/[^0-9+]/g, "")),
    email: contact.email || undefined,
    priceRange: "฿฿",
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address,
      addressLocality: "สารภี",
      addressRegion: "เชียงใหม่",
      postalCode: "50140",
      addressCountry: "TH",
    },
    areaServed: [
      { "@type": "City", name: "เชียงใหม่" },
      { "@type": "City", name: "ลำพูน" },
    ],
    openingHours: "Mo-Su 08:00-20:00",
    sameAs: [contact.facebook].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
