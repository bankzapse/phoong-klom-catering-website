import { NextResponse } from "next/server";
import { checkPassword, createSession, destroySession, isAuthed } from "@/lib/auth";

export const dynamic = "force-dynamic";

// GET → is the current visitor logged in?
export async function GET() {
  return NextResponse.json({ authed: await isAuthed() });
}

// POST { password } → log in
export async function POST(req: Request) {
  let password = "";
  try {
    const body = await req.json();
    password = String(body.password ?? "");
  } catch {
    return NextResponse.json({ ok: false, error: "คำขอไม่ถูกต้อง" }, { status: 400 });
  }

  if (!checkPassword(password)) {
    return NextResponse.json({ ok: false, error: "รหัสผ่านไม่ถูกต้อง" }, { status: 401 });
  }

  await createSession();
  return NextResponse.json({ ok: true });
}

// DELETE → log out
export async function DELETE() {
  await destroySession();
  return NextResponse.json({ ok: true });
}
