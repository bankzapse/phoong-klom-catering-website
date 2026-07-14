import { NextResponse } from "next/server";
import { getContent, saveContent, storageMode } from "@/lib/storage";
import { isAuthed } from "@/lib/auth";
import { defaultContent } from "@/lib/content";

export const dynamic = "force-dynamic";

// GET → current content (used by the admin editor to prefill)
export async function GET() {
  const content = await getContent();
  return NextResponse.json({ content, storageMode: storageMode() });
}

// PUT → save content (admin only)
export async function PUT(req: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ ok: false, error: "ไม่ได้รับอนุญาต" }, { status: 401 });
  }

  let incoming;
  try {
    incoming = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "ข้อมูลไม่ถูกต้อง" }, { status: 400 });
  }

  // Merge over defaults so required keys always exist, then persist.
  const content = { ...defaultContent, ...incoming };

  try {
    await saveContent(content);
  } catch (err) {
    const message = err instanceof Error ? err.message : "บันทึกไม่สำเร็จ";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
