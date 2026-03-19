import { NextResponse } from "next/server";

export async function GET() {
  const token = process.env.TILOPAY_SDK_TOKEN || process.env.NEXT_PUBLIC_TILOPAY_TOKEN;
  if (!token) {
    return NextResponse.json({ error: "Missing Tilopay token" }, { status: 400 });
  }
  return NextResponse.json({ token });
}
