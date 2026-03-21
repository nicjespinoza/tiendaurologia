import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { arrayUnion, doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";

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

  // Persistir token de tarjeta para el usuario (solo datos no sensibles)
  try {
    const status = payload?.status ?? payload?.paymentStatus ?? payload?.transactionStatus;
    const success = String(status || "").toLowerCase() === "approved" || status === "00" || status === 0;

    if (db && success) {
      const orderNumber: string = payload?.orderNumber ?? "";
      const userMatch = orderNumber.match(/uid:([^|]+)/);
      const userId: string | undefined = payload?.userId ?? userMatch?.[1];

      const card =
        payload?.card ??
        payload?.payment?.card ??
        payload?.transaction?.card ??
        payload?.cardData ??
        {};

      const tokenTilopay: string | undefined =
        card.token || card.tokenCustomer || payload?.token_customer || payload?.tokenTilopay;
      const last4: string | undefined =
        card.last4 || (typeof card.pan === "string" ? card.pan.slice(-4) : undefined);
      const brand: string | undefined = card.brand || card.type;
      const expiry: string | undefined =
        card.expiry ||
        (card.exp_month && card.exp_year ? `${card.exp_month}/${card.exp_year}` : undefined);

      if (userId && tokenTilopay && last4) {
        const userRef = doc(db, "users", userId);
        await updateDoc(userRef, {
          savedCards: arrayUnion({
            tokenTilopay,
            last4,
            brand: brand ?? "Card",
            expiry: expiry ?? "",
            addedAt: serverTimestamp(),
          }),
        });
      }
    }
  } catch (err) {
    console.error("Tilopay webhook processing error", err);
  }

  return NextResponse.json({ ok: true });
}
