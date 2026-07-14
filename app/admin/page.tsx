"use client";

import { useEffect, useState } from "react";
import type { SiteContent } from "@/lib/content";

// ── small field helpers ───────────────────────────────────────
function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-neutral-700">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-neutral-400">{hint}</span>}
    </label>
  );
}

const inputCls =
  "w-full rounded-md border border-neutral-300 px-3 py-2 text-sm text-neutral-900 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500";

function Text({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      className={inputCls}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

function Area({
  value,
  onChange,
  rows = 3,
}: {
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <textarea
      className={inputCls}
      rows={rows}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

const TABS = [
  { key: "brand", label: "แบรนด์" },
  { key: "hero", label: "หน้าแรก" },
  { key: "about", label: "เกี่ยวกับเรา" },
  { key: "services", label: "บริการ" },
  { key: "packages", label: "แพ็กเกจ" },
  { key: "gallery", label: "แกลเลอรี" },
  { key: "testimonials", label: "รีวิว" },
  { key: "contact", label: "ติดต่อ" },
  { key: "seo", label: "SEO" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [content, setContent] = useState<SiteContent | null>(null);
  const [tab, setTab] = useState<TabKey>("brand");
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: "ok" | "err"; msg: string } | null>(null);
  const [storageMode, setStorageMode] = useState<string>("");

  useEffect(() => {
    fetch("/api/auth")
      .then((r) => r.json())
      .then((d) => setAuthed(Boolean(d.authed)))
      .catch(() => setAuthed(false));
  }, []);

  useEffect(() => {
    if (authed) {
      fetch("/api/content")
        .then((r) => r.json())
        .then((d) => {
          setContent(d.content);
          setStorageMode(d.storageMode);
        });
    }
  }, [authed]);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setAuthed(true);
      setPassword("");
    } else {
      const d = await res.json().catch(() => ({}));
      setLoginError(d.error || "เข้าสู่ระบบไม่สำเร็จ");
    }
  }

  async function logout() {
    await fetch("/api/auth", { method: "DELETE" });
    setAuthed(false);
    setContent(null);
  }

  async function save() {
    if (!content) return;
    setSaving(true);
    setStatus(null);
    const res = await fetch("/api/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    setSaving(false);
    if (res.ok) {
      setStatus({ type: "ok", msg: "บันทึกเรียบร้อยแล้ว ✓ (เปิดหน้าเว็บเพื่อดูผล)" });
    } else {
      const d = await res.json().catch(() => ({}));
      setStatus({ type: "err", msg: d.error || "บันทึกไม่สำเร็จ" });
    }
  }

  // helper to update nested sections immutably
  function patch<K extends keyof SiteContent>(key: K, value: Partial<SiteContent[K]>) {
    setContent((c) => (c ? { ...c, [key]: { ...c[key], ...value } } : c));
  }

  // ── login screen ────────────────────────────────────────────
  if (authed === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-100 text-neutral-500">
        กำลังโหลด…
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-100 px-4">
        <form
          onSubmit={login}
          className="w-full max-w-sm rounded-xl border border-neutral-200 bg-white p-8 shadow-sm"
        >
          <h1 className="text-center font-serif text-xl font-semibold text-neutral-900">
            ระบบจัดการเนื้อหา
          </h1>
          <p className="mt-1 text-center text-sm text-neutral-500">
            พุงกลม แคทเทอริ่ง
          </p>
          <div className="mt-6">
            <Field label="รหัสผ่านผู้ดูแล">
              <input
                type="password"
                className={inputCls}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />
            </Field>
          </div>
          {loginError && (
            <p className="mt-3 text-sm text-red-600">{loginError}</p>
          )}
          <button
            type="submit"
            className="mt-6 w-full rounded-md bg-amber-600 py-2.5 text-sm font-medium text-white transition-colors hover:bg-amber-700"
          >
            เข้าสู่ระบบ
          </button>
        </form>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-100 text-neutral-500">
        กำลังโหลดเนื้อหา…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-100 pb-32 text-neutral-900">
      {/* Top bar */}
      <header className="sticky top-0 z-20 border-b border-neutral-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div>
            <h1 className="font-serif text-lg font-semibold">ระบบจัดการเนื้อหา</h1>
            <p className="text-xs text-neutral-400">พุงกลม แคทเทอริ่ง</p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/"
              target="_blank"
              className="rounded-md border border-neutral-300 px-3 py-1.5 text-sm text-neutral-600 hover:bg-neutral-50"
            >
              ดูเว็บ ↗
            </a>
            <button
              onClick={logout}
              className="rounded-md border border-neutral-300 px-3 py-1.5 text-sm text-neutral-600 hover:bg-neutral-50"
            >
              ออกจากระบบ
            </button>
          </div>
        </div>
      </header>

      {storageMode === "default" && (
        <div className="mx-auto mt-4 max-w-5xl px-4">
          <div className="rounded-md border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            ⚠️ ยังไม่ได้ตั้งค่าที่จัดเก็บข้อมูล — การแก้ไขจะ<strong>ยังบันทึกไม่ได้</strong> กรุณาตั้งค่า
            Upstash Redis (UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN) บน Vercel ก่อน
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="mx-auto mt-4 max-w-5xl px-4">
        <div className="flex flex-wrap gap-1 rounded-lg border border-neutral-200 bg-white p-1">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                tab === t.key
                  ? "bg-amber-600 text-white"
                  : "text-neutral-600 hover:bg-neutral-100"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Panels */}
      <main className="mx-auto mt-6 max-w-5xl space-y-5 px-4">
        <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
          {tab === "brand" && (
            <div className="space-y-4">
              <Field label="ชื่อร้าน (ภาษาไทย)">
                <Text value={content.brand.nameTh} onChange={(v) => patch("brand", { nameTh: v })} />
              </Field>
              <Field label="ชื่อร้าน (อังกฤษ)">
                <Text value={content.brand.nameEn} onChange={(v) => patch("brand", { nameEn: v })} />
              </Field>
              <Field label="สโลแกน">
                <Text value={content.brand.tagline} onChange={(v) => patch("brand", { tagline: v })} />
              </Field>
              <Field label="ชื่อนิติบุคคล">
                <Text value={content.brand.legalName} onChange={(v) => patch("brand", { legalName: v })} />
              </Field>
              <Field label="เลขทะเบียน">
                <Text value={content.brand.registrationNo} onChange={(v) => patch("brand", { registrationNo: v })} />
              </Field>
            </div>
          )}

          {tab === "hero" && (
            <div className="space-y-4">
              <Field label="ข้อความบนสุด (eyebrow)">
                <Text value={content.hero.eyebrow} onChange={(v) => patch("hero", { eyebrow: v })} />
              </Field>
              <Field label="หัวข้อหลัก" hint="ขึ้นบรรทัดใหม่ได้">
                <Area value={content.hero.title} onChange={(v) => patch("hero", { title: v })} rows={2} />
              </Field>
              <Field label="คำอธิบาย">
                <Area value={content.hero.subtitle} onChange={(v) => patch("hero", { subtitle: v })} />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="ปุ่มหลัก">
                  <Text value={content.hero.ctaPrimary} onChange={(v) => patch("hero", { ctaPrimary: v })} />
                </Field>
                <Field label="ปุ่มรอง">
                  <Text value={content.hero.ctaSecondary} onChange={(v) => patch("hero", { ctaSecondary: v })} />
                </Field>
              </div>
              <Field label="รูปพื้นหลัง (URL)" hint="ใช้ลิงก์รูปจาก Unsplash หรือรูปของคุณเอง">
                <Text value={content.hero.backgroundImage} onChange={(v) => patch("hero", { backgroundImage: v })} />
              </Field>
            </div>
          )}

          {tab === "about" && (
            <div className="space-y-4">
              <Field label="ข้อความบนสุด">
                <Text value={content.about.eyebrow} onChange={(v) => patch("about", { eyebrow: v })} />
              </Field>
              <Field label="หัวข้อ" hint="ขึ้นบรรทัดใหม่ได้">
                <Area value={content.about.heading} onChange={(v) => patch("about", { heading: v })} rows={2} />
              </Field>
              <Field label="เนื้อหา">
                <Area value={content.about.body} onChange={(v) => patch("about", { body: v })} rows={5} />
              </Field>
              <Field label="รูปภาพ (URL)">
                <Text value={content.about.image} onChange={(v) => patch("about", { image: v })} />
              </Field>
              <div>
                <span className="mb-2 block text-sm font-medium text-neutral-700">ตัวเลขสถิติ</span>
                <div className="space-y-2">
                  {content.about.stats.map((s, i) => (
                    <div key={i} className="flex gap-2">
                      <input
                        className={inputCls}
                        placeholder="เช่น 500+"
                        value={s.value}
                        onChange={(e) => {
                          const stats = [...content.about.stats];
                          stats[i] = { ...stats[i], value: e.target.value };
                          patch("about", { stats });
                        }}
                      />
                      <input
                        className={inputCls}
                        placeholder="คำอธิบาย"
                        value={s.label}
                        onChange={(e) => {
                          const stats = [...content.about.stats];
                          stats[i] = { ...stats[i], label: e.target.value };
                          patch("about", { stats });
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === "services" && (
            <ListEditor
              headingFields={
                <>
                  <Field label="ข้อความบนสุด">
                    <Text value={content.services.eyebrow} onChange={(v) => patch("services", { eyebrow: v })} />
                  </Field>
                  <Field label="หัวข้อ">
                    <Text value={content.services.heading} onChange={(v) => patch("services", { heading: v })} />
                  </Field>
                  <Field label="คำอธิบาย">
                    <Area value={content.services.subheading} onChange={(v) => patch("services", { subheading: v })} rows={2} />
                  </Field>
                </>
              }
              items={content.services.items}
              onChange={(items) => patch("services", { items })}
              emptyItem={{ title: "", description: "", image: "" }}
              addLabel="+ เพิ่มบริการ"
              render={(item, update) => (
                <div className="space-y-2">
                  <Text value={item.title} onChange={(v) => update({ ...item, title: v })} placeholder="ชื่อบริการ" />
                  <Area value={item.description} onChange={(v) => update({ ...item, description: v })} rows={2} />
                  <Text value={item.image} onChange={(v) => update({ ...item, image: v })} placeholder="URL รูปภาพ" />
                </div>
              )}
            />
          )}

          {tab === "packages" && (
            <div className="space-y-4">
              <div className="space-y-4 border-b border-neutral-100 pb-4">
                <Field label="ข้อความบนสุด">
                  <Text value={content.packages.eyebrow} onChange={(v) => patch("packages", { eyebrow: v })} />
                </Field>
                <Field label="หัวข้อ">
                  <Text value={content.packages.heading} onChange={(v) => patch("packages", { heading: v })} />
                </Field>
                <Field label="คำอธิบาย">
                  <Area value={content.packages.subheading} onChange={(v) => patch("packages", { subheading: v })} rows={2} />
                </Field>
                <Field label="หมายเหตุ (ท้ายแพ็กเกจ)">
                  <Text value={content.packages.note} onChange={(v) => patch("packages", { note: v })} />
                </Field>
              </div>
              <ArrayBlock
                items={content.packages.items}
                onChange={(items) => patch("packages", { items })}
                emptyItem={{ name: "", price: "", unit: "/ ท่าน", description: "", features: [], featured: false }}
                addLabel="+ เพิ่มแพ็กเกจ"
                render={(item, update) => (
                  <div className="space-y-2">
                    <div className="grid grid-cols-3 gap-2">
                      <input className={inputCls} placeholder="ชื่อแพ็กเกจ" value={item.name} onChange={(e) => update({ ...item, name: e.target.value })} />
                      <input className={inputCls} placeholder="ราคา เช่น ฿450" value={item.price} onChange={(e) => update({ ...item, price: e.target.value })} />
                      <input className={inputCls} placeholder="หน่วย เช่น / ท่าน" value={item.unit} onChange={(e) => update({ ...item, unit: e.target.value })} />
                    </div>
                    <Area value={item.description} onChange={(v) => update({ ...item, description: v })} rows={2} />
                    <textarea
                      className={inputCls}
                      rows={5}
                      placeholder="รายการ (บรรทัดละ 1 รายการ)"
                      value={item.features.join("\n")}
                      onChange={(e) => update({ ...item, features: e.target.value.split("\n").filter(Boolean) })}
                    />
                    <label className="flex items-center gap-2 text-sm text-neutral-600">
                      <input
                        type="checkbox"
                        checked={!!item.featured}
                        onChange={(e) => update({ ...item, featured: e.target.checked })}
                      />
                      แนะนำ (เน้นแพ็กเกจนี้)
                    </label>
                  </div>
                )}
              />
            </div>
          )}

          {tab === "gallery" && (
            <ListEditor
              headingFields={
                <>
                  <Field label="ข้อความบนสุด">
                    <Text value={content.gallery.eyebrow} onChange={(v) => patch("gallery", { eyebrow: v })} />
                  </Field>
                  <Field label="หัวข้อ">
                    <Text value={content.gallery.heading} onChange={(v) => patch("gallery", { heading: v })} />
                  </Field>
                  <Field label="คำอธิบาย">
                    <Area value={content.gallery.subheading} onChange={(v) => patch("gallery", { subheading: v })} rows={2} />
                  </Field>
                </>
              }
              items={content.gallery.items}
              onChange={(items) => patch("gallery", { items })}
              emptyItem={{ image: "", caption: "" }}
              addLabel="+ เพิ่มรูป"
              render={(item, update) => (
                <div className="space-y-2">
                  <Text value={item.image} onChange={(v) => update({ ...item, image: v })} placeholder="URL รูปภาพ" />
                  <Text value={item.caption} onChange={(v) => update({ ...item, caption: v })} placeholder="คำบรรยายรูป" />
                </div>
              )}
            />
          )}

          {tab === "testimonials" && (
            <ListEditor
              headingFields={
                <>
                  <Field label="ข้อความบนสุด">
                    <Text value={content.testimonials.eyebrow} onChange={(v) => patch("testimonials", { eyebrow: v })} />
                  </Field>
                  <Field label="หัวข้อ">
                    <Text value={content.testimonials.heading} onChange={(v) => patch("testimonials", { heading: v })} />
                  </Field>
                </>
              }
              items={content.testimonials.items}
              onChange={(items) => patch("testimonials", { items })}
              emptyItem={{ name: "", role: "", quote: "" }}
              addLabel="+ เพิ่มรีวิว"
              render={(item, update) => (
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <Text value={item.name} onChange={(v) => update({ ...item, name: v })} placeholder="ชื่อลูกค้า" />
                    <Text value={item.role} onChange={(v) => update({ ...item, role: v })} placeholder="ประเภทงาน · จังหวัด" />
                  </div>
                  <Area value={item.quote} onChange={(v) => update({ ...item, quote: v })} rows={3} />
                </div>
              )}
            />
          )}

          {tab === "contact" && (
            <div className="space-y-4">
              <Field label="ข้อความบนสุด">
                <Text value={content.contact.eyebrow} onChange={(v) => patch("contact", { eyebrow: v })} />
              </Field>
              <Field label="หัวข้อ">
                <Text value={content.contact.heading} onChange={(v) => patch("contact", { heading: v })} />
              </Field>
              <Field label="คำอธิบาย">
                <Area value={content.contact.subheading} onChange={(v) => patch("contact", { subheading: v })} rows={2} />
              </Field>
              <Field label="เบอร์โทรศัพท์" hint="บรรทัดละ 1 เบอร์">
                <textarea
                  className={inputCls}
                  rows={3}
                  value={content.contact.phones.join("\n")}
                  onChange={(e) => patch("contact", { phones: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean) })}
                />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="อีเมล">
                  <Text value={content.contact.email} onChange={(v) => patch("contact", { email: v })} />
                </Field>
                <Field label="เวลาทำการ">
                  <Text value={content.contact.hours} onChange={(v) => patch("contact", { hours: v })} />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="LINE ID" hint="เช่น @phoongklom">
                  <Text value={content.contact.lineId} onChange={(v) => patch("contact", { lineId: v })} />
                </Field>
                <Field label="Facebook" hint="ลิงก์เต็ม หรือ ชื่อเพจ">
                  <Text value={content.contact.facebook} onChange={(v) => patch("contact", { facebook: v })} />
                </Field>
              </div>
              <Field label="ที่อยู่">
                <Area value={content.contact.address} onChange={(v) => patch("contact", { address: v })} rows={2} />
              </Field>
              <Field label="ลิงก์แผนที่ (Google Maps embed URL)" hint="ใช้ลิงก์ที่ลงท้ายด้วย &output=embed">
                <Text value={content.contact.mapEmbedUrl} onChange={(v) => patch("contact", { mapEmbedUrl: v })} />
              </Field>
            </div>
          )}

          {tab === "seo" && (
            <div className="space-y-4">
              <Field label="Title (ชื่อหน้าเว็บ)" hint="สำคัญต่อ SEO">
                <Text value={content.seo.title} onChange={(v) => patch("seo", { title: v })} />
              </Field>
              <Field label="Description (คำอธิบายหน้าเว็บ)" hint="แสดงใน Google · 150-160 ตัวอักษร">
                <Area value={content.seo.description} onChange={(v) => patch("seo", { description: v })} rows={3} />
              </Field>
              <Field label="Keywords (คำค้นหา)" hint="คั่นด้วยจุลภาค ,">
                <Area value={content.seo.keywords} onChange={(v) => patch("seo", { keywords: v })} rows={2} />
              </Field>
              <Field label="URL เว็บไซต์">
                <Text value={content.seo.siteUrl} onChange={(v) => patch("seo", { siteUrl: v })} />
              </Field>
              <Field label="รูป OG (แชร์บนโซเชียล)">
                <Text value={content.seo.ogImage} onChange={(v) => patch("seo", { ogImage: v })} />
              </Field>
            </div>
          )}
        </div>
      </main>

      {/* Save bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-neutral-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
          <div className="text-sm">
            {status && (
              <span className={status.type === "ok" ? "text-green-600" : "text-red-600"}>
                {status.msg}
              </span>
            )}
          </div>
          <button
            onClick={save}
            disabled={saving}
            className="rounded-md bg-amber-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-amber-700 disabled:opacity-50"
          >
            {saving ? "กำลังบันทึก…" : "บันทึกการเปลี่ยนแปลง"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── generic array editors ─────────────────────────────────────
function ArrayBlock<T>({
  items,
  onChange,
  emptyItem,
  render,
  addLabel,
}: {
  items: T[];
  onChange: (items: T[]) => void;
  emptyItem: T;
  render: (item: T, update: (next: T) => void) => React.ReactNode;
  addLabel: string;
}) {
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="rounded-lg border border-neutral-200 bg-neutral-50 p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-400">#{i + 1}</span>
            <div className="flex gap-1">
              <button
                onClick={() => {
                  if (i === 0) return;
                  const next = [...items];
                  [next[i - 1], next[i]] = [next[i], next[i - 1]];
                  onChange(next);
                }}
                className="rounded px-2 py-0.5 text-xs text-neutral-500 hover:bg-neutral-200"
                title="เลื่อนขึ้น"
              >
                ↑
              </button>
              <button
                onClick={() => {
                  if (i === items.length - 1) return;
                  const next = [...items];
                  [next[i + 1], next[i]] = [next[i], next[i + 1]];
                  onChange(next);
                }}
                className="rounded px-2 py-0.5 text-xs text-neutral-500 hover:bg-neutral-200"
                title="เลื่อนลง"
              >
                ↓
              </button>
              <button
                onClick={() => onChange(items.filter((_, j) => j !== i))}
                className="rounded px-2 py-0.5 text-xs text-red-500 hover:bg-red-50"
                title="ลบ"
              >
                ลบ
              </button>
            </div>
          </div>
          {render(item, (next) => {
            const copy = [...items];
            copy[i] = next;
            onChange(copy);
          })}
        </div>
      ))}
      <button
        onClick={() => onChange([...items, structuredClone(emptyItem)])}
        className="w-full rounded-lg border border-dashed border-neutral-300 py-2.5 text-sm text-neutral-500 hover:border-amber-500 hover:text-amber-600"
      >
        {addLabel}
      </button>
    </div>
  );
}

function ListEditor<T>({
  headingFields,
  items,
  onChange,
  emptyItem,
  render,
  addLabel,
}: {
  headingFields: React.ReactNode;
  items: T[];
  onChange: (items: T[]) => void;
  emptyItem: T;
  render: (item: T, update: (next: T) => void) => React.ReactNode;
  addLabel: string;
}) {
  return (
    <div className="space-y-4">
      <div className="space-y-4 border-b border-neutral-100 pb-4">{headingFields}</div>
      <ArrayBlock items={items} onChange={onChange} emptyItem={emptyItem} render={render} addLabel={addLabel} />
    </div>
  );
}
