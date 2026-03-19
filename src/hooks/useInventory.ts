"use client";

import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { Product, VariantStock } from "@/contexts/products-context";

export function useInventory() {
  const [inventory, setInventory] = useState<
    { productId: string; variant: VariantStock; name: string }[]
  >([]);

  useEffect(() => {
    if (!db) return;

    const q = query(collection(db, "products"));
    const unsub = onSnapshot(q, (snapshot) => {
      const rows: { productId: string; variant: VariantStock; name: string }[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data() as Product;
        (data.variants || []).forEach((variant) =>
          rows.push({ productId: doc.id, variant, name: data.name })
        );
      });
      setInventory(rows);
    });
    return () => unsub();
  }, []);

  const lowStock = inventory.filter((row) => row.variant.quantity < 5);

  return { inventory, lowStock };
}
