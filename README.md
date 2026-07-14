# พุงกลม แคทเทอริ่ง — เว็บไซต์จัดเลี้ยง + ระบบจัดการเนื้อหา

เว็บไซต์บริการจัดเลี้ยงระดับพรีเมียมสไตล์หรูหรา พร้อม **ระบบจัดการเนื้อหา (CMS)** ที่แก้ไขข้อความ รูปภาพ
และช่องทางการติดต่อได้เองผ่านหน้า `/admin` ทำ SEO ภาษาไทยครบถ้วน และพร้อมนำขึ้น Vercel

สร้างด้วย **Next.js 15** (App Router) + **Tailwind CSS** + **Upstash Redis**

---

## 🎨 สิ่งที่มีในเว็บ

- **หน้าแรก (Hero)** — ภาพหรูหรา เต็มจอ พร้อมปุ่มขอใบเสนอราคา
- **เกี่ยวกับเรา** — เรื่องราวร้าน + ตัวเลขสถิติ
- **บริการ** — 4 หมวด (งานแต่ง / บริษัท / โต๊ะจีน-บุฟเฟต์ / งานบุญ)
- **แพ็กเกจ** — 3 แพ็กเกจราคาต่อท่าน (Essential / Premium / Luxury)
- **แกลเลอรี** — ภาพผลงาน
- **รีวิวลูกค้า**
- **ติดต่อ** — เบอร์โทร, อีเมล, LINE, Facebook, ที่อยู่, แผนที่, เวลาทำการ
- **SEO** — title/description/keywords ภาษาไทย, Open Graph, JSON-LD (schema.org `CateringService`), `sitemap.xml`, `robots.txt`

---

## 🖥️ รันในเครื่อง (Local)

```bash
npm install
npm run dev
```

เปิด http://localhost:3000

- หน้าเว็บ: http://localhost:3000
- หน้าจัดการเนื้อหา: http://localhost:3000/admin

> ตอนรันในเครื่อง ถ้ายังไม่ตั้งค่า Upstash การแก้ไขจะถูกบันทึกลงไฟล์ `data/content.local.json` ให้อัตโนมัติ (ใช้ทดสอบได้เลย)

**รหัสผ่านเข้า /admin** — ตั้งในไฟล์ `.env.local` (ดูตัวอย่างที่ `.env.example`)
ค่าเริ่มต้นตอนทดสอบคือ `admin1234` — **กรุณาเปลี่ยนก่อนใช้งานจริง**

---

## ☁️ นำขึ้น Vercel (ทีละขั้น)

### ขั้นที่ 1 — สร้างที่จัดเก็บข้อมูลฟรีด้วย Upstash Redis
เพื่อให้เนื้อหาที่แก้ไขบันทึกถาวรบน Vercel (Vercel รันแบบ serverless แก้ไฟล์ตรง ๆ ไม่ได้)

1. สมัคร/เข้าสู่ระบบที่ https://console.upstash.com (ฟรี)
2. กด **Create Database** → เลือก **Redis** → ตั้งชื่อ เช่น `phoong-klom` → เลือก region ใกล้ไทย (เช่น Singapore) → **Create**
3. ในหน้า database เลื่อนไปหัวข้อ **REST API** จะเห็นค่า 2 ตัว — คัดลอกเก็บไว้:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`

### ขั้นที่ 2 — อัปโหลดโค้ดขึ้น GitHub
```bash
cd phoong-klom-catering
git init
git add .
git commit -m "เว็บไซต์พุงกลม แคทเทอริ่ง"
```
สร้าง repository ใหม่บน GitHub แล้ว push:
```bash
git remote add origin https://github.com/<ชื่อคุณ>/phoong-klom-catering.git
git branch -M main
git push -u origin main
```

### ขั้นที่ 3 — deploy บน Vercel
1. เข้า https://vercel.com → **Add New… → Project**
2. เลือก **Import** repository `phoong-klom-catering` ที่เพิ่ง push
3. Vercel จะตรวจเจอ Next.js อัตโนมัติ — **ยังไม่ต้องกด Deploy** ให้ไปตั้งค่า Environment Variables ก่อน
4. ในหน้า import กด **Environment Variables** แล้วเพิ่มทั้ง 4 ตัวนี้:

   | ชื่อ (Key)                  | ค่า (Value)                              |
   | -------------------------- | ---------------------------------------- |
   | `ADMIN_PASSWORD`           | รหัสผ่านเข้า /admin ที่ตั้งเอง (ตั้งให้เดายาก) |
   | `ADMIN_SESSION_SECRET`     | ข้อความสุ่มยาว ๆ อะไรก็ได้                    |
   | `UPSTASH_REDIS_REST_URL`   | ค่าจาก Upstash ขั้นที่ 1                     |
   | `UPSTASH_REDIS_REST_TOKEN` | ค่าจาก Upstash ขั้นที่ 1                     |

5. กด **Deploy** — รอสักครู่จะได้ลิงก์เว็บ เช่น `https://phoong-klom-catering.vercel.app`

เสร็จแล้ว! เข้าจัดการเนื้อหาที่ `https://<ลิงก์ของคุณ>/admin`

> 💡 ถ้าจะแก้ Environment Variables ทีหลัง: Vercel → เลือกโปรเจกต์ → **Settings → Environment Variables**
> แก้เสร็จต้องกด **Redeploy** หนึ่งครั้ง

### ขั้นที่ 4 (ภายหลัง) — ผูกโดเมนจริง `phoong-klom-catering.com`
ตอนพร้อมใช้โดเมนจริง: Vercel → โปรเจกต์ → **Settings → Domains** → ใส่ `phoong-klom-catering.com`
แล้วทำตามที่ Vercel แนะนำ (ตั้งค่า DNS ที่ผู้ให้บริการโดเมน) จากนั้นแก้ค่า **URL เว็บไซต์** ในหน้า `/admin → SEO`
ให้เป็น `https://phoong-klom-catering.com`

---

## ✏️ วิธีใช้ระบบจัดการเนื้อหา (/admin)

1. เข้า `/admin` → ใส่รหัสผ่าน (`ADMIN_PASSWORD`)
2. เลือกแท็บที่ต้องการแก้ (แบรนด์ / หน้าแรก / เกี่ยวกับเรา / บริการ / แพ็กเกจ / แกลเลอรี / รีวิว / ติดต่อ / SEO)
3. แก้ข้อความหรือ URL รูปภาพ — เพิ่ม/ลบ/เลื่อนลำดับรายการได้ (บริการ, แพ็กเกจ, รูป, รีวิว)
4. กด **บันทึกการเปลี่ยนแปลง** → เปิดหน้าเว็บจริงจะเห็นผลทันที

### เปลี่ยนรูปภาพ
ช่อง "รูปภาพ (URL)" ใส่ลิงก์รูปได้ 2 แบบ:
- **รูปฟรีจาก Unsplash** — ไปที่ https://unsplash.com หาภาพที่ชอบ คลิกขวาที่รูป → Copy Image Address แล้ววางลงช่อง
- **รูปของร้านเอง** — อัปโหลดรูปขึ้นบริการเก็บรูป (เช่น imgur, Cloudinary) แล้วนำลิงก์มาวาง

> ระบบรองรับรูปจาก `images.unsplash.com` อยู่แล้ว ถ้าจะใช้รูปจากเว็บอื่น ต้องเพิ่ม hostname ในไฟล์
> `next.config.mjs` (หัวข้อ `images.remotePatterns`) แล้ว deploy ใหม่

### เปลี่ยนช่องทางติดต่อ
แท็บ **ติดต่อ** แก้เบอร์โทร (บรรทัดละ 1 เบอร์), อีเมล, LINE ID, Facebook, ที่อยู่, เวลาทำการ และลิงก์แผนที่ได้ทั้งหมด

---

## 🔧 ข้อมูลเทคนิค

| เรื่อง            | รายละเอียด                                                        |
| ---------------- | ---------------------------------------------------------------- |
| เนื้อหาเริ่มต้น    | `lib/content.ts`                                                 |
| ที่จัดเก็บข้อมูล   | `lib/storage.ts` (Upstash Redis → ไฟล์ในเครื่อง → ค่าเริ่มต้น)      |
| ระบบล็อกอิน      | `lib/auth.ts` (cookie + HMAC)                                    |
| API             | `app/api/content` (GET/PUT), `app/api/auth` (login/logout)      |
| หน้าจัดการ       | `app/admin/page.tsx`                                             |
| ส่วนต่าง ๆ ของเว็บ | `components/`                                                    |

### Environment variables (สรุป)
ดูไฟล์ `.env.example` — คัดลอกเป็น `.env.local` สำหรับรันในเครื่อง

| ตัวแปร                     | จำเป็น | คำอธิบาย                                        |
| ------------------------- | :---: | ---------------------------------------------- |
| `ADMIN_PASSWORD`          |  ✔    | รหัสผ่านเข้า `/admin`                            |
| `ADMIN_SESSION_SECRET`    |  แนะนำ | คีย์เซ็นเซสชัน (ถ้าไม่ตั้งใช้ `ADMIN_PASSWORD` แทน) |
| `UPSTASH_REDIS_REST_URL`  |  ✔*   | URL ของ Upstash Redis                          |
| `UPSTASH_REDIS_REST_TOKEN`|  ✔*   | Token ของ Upstash Redis                         |

\* จำเป็นบน Vercel เพื่อให้แก้ไขเนื้อหาแล้วบันทึกได้ — ถ้าไม่ตั้ง เว็บจะแสดงเนื้อหาเริ่มต้นอย่างเดียว (แก้ไม่ได้)
