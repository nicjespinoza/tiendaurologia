"use client";

import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/auth-context";

export type SavedCard = {
  tokenTilopay: string;
  last4: string;
  brand?: string;
  expiry?: string;
};

export function useSavedCards() {
  const { user } = useAuth();
  const [cards, setCards] = useState<SavedCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !db) {
      setCards([]);
      setLoading(false);
      return;
    }
    const ref = doc(db, "users", user.uid);
    const unsub = onSnapshot(ref, (snap) => {
      const data = snap.data();
      setCards((data?.savedCards as SavedCard[]) ?? []);
      setLoading(false);
    });
    return () => unsub();
  }, [user]);

  return { cards, loading };
}
