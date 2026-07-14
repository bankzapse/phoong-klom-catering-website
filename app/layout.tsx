import type { Metadata } from "next";
import { getContent } from "@/lib/storage";
import "./globals.css";

// Fonts are loaded via <link> in <head> (see below) instead of next/font/google
// so the build has no network dependency on Google Fonts — the font family names
// are wired up through --font-serif / --font-sans in globals.css.

export async function generateMetadata(): Promise<Metadata> {
  const c = await getContent();
  return {
    metadataBase: new URL(c.seo.siteUrl),
    title: {
      default: c.seo.title,
      template: `%s | ${c.brand.nameTh}`,
    },
    description: c.seo.description,
    keywords: c.seo.keywords,
    authors: [{ name: c.brand.legalName }],
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      locale: "th_TH",
      url: c.seo.siteUrl,
      siteName: c.brand.nameTh,
      title: c.seo.title,
      description: c.seo.description,
      images: [{ url: c.seo.ogImage, width: 1200, height: 630, alt: c.brand.nameTh }],
    },
    twitter: {
      card: "summary_large_image",
      title: c.seo.title,
      description: c.seo.description,
      images: [c.seo.ogImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;500;600&family=Noto+Serif+Thai:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
