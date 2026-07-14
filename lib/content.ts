// ─────────────────────────────────────────────────────────────
//  Content model + Thai default content for พุงกลม แคทเทอริ่ง
//  This is the single source of truth that the CMS edits.
// ─────────────────────────────────────────────────────────────

export type Service = {
  title: string;
  description: string;
  image: string;
};

export type Package = {
  name: string;
  price: string;
  unit: string;
  description: string;
  features: string[];
  featured?: boolean;
};

export type GalleryItem = {
  image: string;
  caption: string;
};

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
};

export type SiteContent = {
  brand: {
    nameTh: string;
    nameEn: string;
    tagline: string;
    legalName: string;
    registrationNo: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    backgroundImage: string;
  };
  about: {
    eyebrow: string;
    heading: string;
    body: string;
    image: string;
    stats: { value: string; label: string }[];
  };
  services: {
    eyebrow: string;
    heading: string;
    subheading: string;
    items: Service[];
  };
  packages: {
    eyebrow: string;
    heading: string;
    subheading: string;
    items: Package[];
    note: string;
  };
  gallery: {
    eyebrow: string;
    heading: string;
    subheading: string;
    items: GalleryItem[];
  };
  testimonials: {
    eyebrow: string;
    heading: string;
    items: Testimonial[];
  };
  contact: {
    eyebrow: string;
    heading: string;
    subheading: string;
    phones: string[];
    email: string;
    address: string;
    lineId: string;
    facebook: string;
    hours: string;
    mapEmbedUrl: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string;
    siteUrl: string;
    ogImage: string;
  };
};

const U = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const defaultContent: SiteContent = {
  brand: {
    nameTh: "พุงกลม แคทเทอริ่ง",
    nameEn: "PHOONGKLOM CATERING",
    tagline: "จัดเลี้ยงระดับพรีเมียม เชียงใหม่",
    legalName: "ห้างหุ้นส่วนจำกัด พุงกลม แคทเทอริ่ง",
    registrationNo: "0503567002941",
  },
  hero: {
    eyebrow: "PREMIUM CATERING · CHIANG MAI",
    title: "รังสรรค์ทุกงานเลี้ยง\nให้เป็นความทรงจำที่หรูหรา",
    subtitle:
      "บริการจัดเลี้ยงครบวงจรระดับพรีเมียม อาหารรสเลิศ การบริการที่ประณีต ดูแลทุกรายละเอียดเพื่องานสำคัญของคุณในเชียงใหม่และทั่วภาคเหนือ",
    ctaPrimary: "ขอใบเสนอราคา",
    ctaSecondary: "ดูแพ็กเกจจัดเลี้ยง",
    backgroundImage: U("photo-1414235077428-338989a2e8c0"),
  },
  about: {
    eyebrow: "เกี่ยวกับเรา",
    heading: "ความประณีตในทุกจาน\nการดูแลในทุกรายละเอียด",
    body: "พุงกลม แคทเทอริ่ง คือทีมงานจัดเลี้ยงมืออาชีพจากเชียงใหม่ ที่ใส่ใจในการคัดสรรวัตถุดิบคุณภาพ ปรุงด้วยความพิถีพิถัน และนำเสนออย่างสวยงามในทุกงาน ไม่ว่าจะเป็นงานแต่งงาน งานเลี้ยงบริษัท งานบุญ หรืองานสังสรรค์ส่วนตัว เราพร้อมออกแบบเมนูและบรรยากาศให้เหมาะกับสไตล์งานของคุณ พร้อมทีมบริการที่เป็นมืออาชีพในทุกขั้นตอน",
    image: U("photo-1555244162-803834f70033"),
    stats: [
      { value: "500+", label: "งานที่จัดเลี้ยง" },
      { value: "15+", label: "ปีประสบการณ์" },
      { value: "100%", label: "ความประทับใจ" },
    ],
  },
  services: {
    eyebrow: "บริการของเรา",
    heading: "จัดเลี้ยงครบทุกรูปแบบงาน",
    subheading:
      "ตั้งแต่งานอบอุ่นเป็นกันเอง ไปจนถึงงานหรูหราระดับพรีเมียม เราดูแลให้ครบทุกความต้องการ",
    items: [
      {
        title: "งานแต่งงาน",
        description:
          "จัดเลี้ยงงานมงคลสมรสอย่างหรูหรา ทั้งบุฟเฟต์ โต๊ะจีน และค็อกเทล พร้อมการตกแต่งที่งดงาม",
        image: U("photo-1519671482749-fd09be7ccebf", 900),
      },
      {
        title: "งานเลี้ยงบริษัท",
        description:
          "งานสัมมนา งานเลี้ยงปีใหม่ งานเปิดตัวสินค้า บริการมืออาชีพ ตรงเวลา ดูแลครบทุกขั้นตอน",
        image: U("photo-1517248135467-4c7edcad34c4", 900),
      },
      {
        title: "โต๊ะจีน & บุฟเฟต์",
        description:
          "เมนูหลากหลายรสชาติต้นตำรับ คัดสรรวัตถุดิบสดใหม่ จัดเสิร์ฟอย่างประณีตทุกจาน",
        image: U("photo-1555939594-58d7cb561ad1", 900),
      },
      {
        title: "งานบุญ & งานเลี้ยงพิเศษ",
        description:
          "งานบุญ งานบวช งานวันเกิด งานเลี้ยงรุ่น ออกแบบเมนูและบริการให้เหมาะกับทุกโอกาส",
        image: U("photo-1533089860892-a7c6f0a88666", 900),
      },
    ],
  },
  packages: {
    eyebrow: "แพ็กเกจจัดเลี้ยง",
    heading: "แพ็กเกจที่ตอบโจทย์ทุกงบประมาณ",
    subheading:
      "ราคาเริ่มต้นต่อท่าน สามารถปรับเมนูและจำนวนได้ตามความต้องการ ติดต่อเพื่อรับใบเสนอราคาที่เหมาะกับงานของคุณ",
    items: [
      {
        name: "Essential",
        price: "฿250",
        unit: "/ ท่าน",
        description: "เหมาะสำหรับงานเลี้ยงเป็นกันเอง งานประชุม และงานขนาดเล็ก",
        features: [
          "อาหารคาว 5 รายการ",
          "ของหวาน 1 รายการ",
          "เครื่องดื่ม & น้ำดื่ม",
          "อุปกรณ์จัดเลี้ยงครบชุด",
          "ทีมบริการหน้างาน",
        ],
      },
      {
        name: "Premium",
        price: "฿450",
        unit: "/ ท่าน",
        description: "แพ็กเกจยอดนิยม สำหรับงานแต่งงานและงานเลี้ยงบริษัท",
        features: [
          "อาหารคาว 8 รายการ",
          "ของหวาน 2 รายการ",
          "ซุ้มอาหาร & เครื่องดื่มพิเศษ",
          "การตกแต่งโต๊ะอาหาร",
          "ทีมบริการมืออาชีพเต็มรูปแบบ",
          "พนักงานเสิร์ฟแต่งกายสุภาพ",
        ],
        featured: true,
      },
      {
        name: "Luxury",
        price: "฿750",
        unit: "/ ท่าน",
        description: "งานระดับพรีเมียม บริการเหนือระดับในทุกรายละเอียด",
        features: [
          "อาหารคาวระดับพรีเมียม 10+ รายการ",
          "ของหวาน & เบเกอรี่พิเศษ",
          "ซุ้มอาหารสด & บาร์เครื่องดื่ม",
          "การตกแต่งสถานที่ครบวงจร",
          "เชฟประจำงาน & ทีมบริการ VIP",
          "ที่ปรึกษาวางแผนงานเฉพาะบุคคล",
        ],
      },
    ],
    note: "* ราคาอาจเปลี่ยนแปลงตามเมนู จำนวนแขก และสถานที่จัดงาน กรุณาติดต่อเพื่อรับใบเสนอราคาที่แม่นยำ",
  },
  gallery: {
    eyebrow: "ผลงานของเรา",
    heading: "บรรยากาศงานเลี้ยงที่เราภูมิใจ",
    subheading: "รวมภาพบรรยากาศและอาหารจากงานจริงที่เราได้ดูแล",
    items: [
      { image: U("photo-1467003909585-2f8a72700288", 800), caption: "อาหารจานพรีเมียม" },
      { image: U("photo-1504674900247-0877df9cc836", 800), caption: "เมนูซิกเนเจอร์" },
      { image: U("photo-1600891964092-4316c288032e", 800), caption: "การจัดจานอย่างประณีต" },
      { image: U("photo-1546069901-ba9599a7e63c", 800), caption: "สลัด & อาหารเพื่อสุขภาพ" },
      { image: U("photo-1552566626-52f8b828add9", 800), caption: "บรรยากาศงานเลี้ยง" },
      { image: U("photo-1555939594-58d7cb561ad1", 800), caption: "เมนูสเต็กระดับภัตตาคาร" },
    ],
  },
  testimonials: {
    eyebrow: "เสียงจากลูกค้า",
    heading: "ความประทับใจที่เราได้รับ",
    items: [
      {
        name: "คุณศิริพร",
        role: "งานแต่งงาน · เชียงใหม่",
        quote:
          "อาหารอร่อยมาก การบริการประทับใจสุดๆ แขกในงานชมกันไม่ขาด ดูแลเราตั้งแต่ต้นจนจบงานเลย ประทับใจจริงๆ ค่ะ",
      },
      {
        name: "คุณธนกร",
        role: "งานเลี้ยงบริษัท · ลำพูน",
        quote:
          "จัดงานเลี้ยงปีใหม่บริษัท 300 คน ทีมงานมืออาชีพมาก ตรงเวลา อาหารคุณภาพดี ราคาสมเหตุสมผล แนะนำเลยครับ",
      },
      {
        name: "คุณวิภาดา",
        role: "งานบุญ · สารภี",
        quote:
          "ประทับใจในความใส่ใจ ตั้งแต่การเลือกเมนูจนถึงการเก็บงาน สะอาด เรียบร้อย อาหารรสชาติถูกปากทุกคนในงานเลยค่ะ",
      },
    ],
  },
  contact: {
    eyebrow: "ติดต่อเรา",
    heading: "พร้อมดูแลงานสำคัญของคุณ",
    subheading:
      "ปรึกษาและขอใบเสนอราคาได้ฟรี ทีมงานของเรายินดีให้คำแนะนำในการวางแผนงานเลี้ยงของคุณ",
    phones: ["082-551-7966", "089-261-6445"],
    email: "info@phoong-klom-catering.com",
    address:
      "359/112 โครงการสุขสมฤทัย หมู่ที่ 4 ตำบลยางเนิ้ง อำเภอสารภี จังหวัดเชียงใหม่ 50140",
    lineId: "",
    facebook: "",
    hours: "ทุกวัน 08:00 - 20:00 น.",
    mapEmbedUrl:
      "https://www.google.com/maps?q=%E0%B8%95%E0%B8%B3%E0%B8%9A%E0%B8%A5%E0%B8%A2%E0%B8%B2%E0%B8%87%E0%B9%80%E0%B8%99%E0%B8%B4%E0%B9%89%E0%B8%87%20%E0%B8%AA%E0%B8%B2%E0%B8%A3%E0%B8%A0%E0%B8%B5%20%E0%B9%80%E0%B8%8A%E0%B8%B5%E0%B8%A2%E0%B8%87%E0%B9%83%E0%B8%AB%E0%B8%A1%E0%B9%88&output=embed",
  },
  seo: {
    title: "พุงกลม แคทเทอริ่ง | บริการจัดเลี้ยงระดับพรีเมียม เชียงใหม่",
    description:
      "พุงกลม แคทเทอริ่ง บริการจัดเลี้ยงครบวงจรระดับพรีเมียมในเชียงใหม่ งานแต่งงาน งานเลี้ยงบริษัท โต๊ะจีน บุฟเฟต์ งานบุญ อาหารรสเลิศ บริการมืออาชีพ ขอใบเสนอราคาฟรี โทร 082-551-7966",
    keywords:
      "จัดเลี้ยงเชียงใหม่, แคทเทอริ่งเชียงใหม่, catering เชียงใหม่, จัดเลี้ยงงานแต่ง เชียงใหม่, โต๊ะจีนเชียงใหม่, บุฟเฟต์นอกสถานที่ เชียงใหม่, จัดเลี้ยงบริษัท, พุงกลม แคทเทอริ่ง, จัดเลี้ยงสารภี, จัดเลี้ยงลำพูน",
    siteUrl: "https://phoong-klom-catering.com",
    ogImage: U("photo-1414235077428-338989a2e8c0", 1200),
  },
};
