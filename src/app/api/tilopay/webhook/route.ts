import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export async function POST(req: NextRequest) {
  const payload = await req.json();

  // Persist minimal webhook data for auditoría.
  if (db && payload?.orderNumber) {
    const ref = doc(db, "webhooks", payload.orderNumber);
    await setDoc(
      ref,
      {
        receivedAt: serverTimestamp(),
        payload,
      },
      { merge: true }
    );
  }

  return NextResponse.json({ ok: true });
}
