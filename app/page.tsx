import { getContent } from "@/lib/storage";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Packages from "@/components/Packages";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";

// Re-fetch content on every request so CMS edits appear immediately.
export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await getContent();

  return (
    <>
      <JsonLd content={content} />
      <Navbar
        brandTh={content.brand.nameTh}
        brandEn={content.brand.nameEn}
        phone={content.contact.phones[0] ?? ""}
      />
      <main>
        <Hero content={content} />
        <About content={content} />
        <Services content={content} />
        <Packages content={content} />
        <Gallery content={content} />
        <Testimonials content={content} />
        <Contact content={content} />
      </main>
      <Footer content={content} />
    </>
  );
}
