import type { Metadata } from "next";
import { Noto_Serif_Thai, Noto_Sans_Thai } from "next/font/google";
import { getContent } from "@/lib/storage";
import "./globals.css";

const serif = Noto_Serif_Thai({
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

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
    <html lang="th" className={`${serif.variable} ${sans.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
