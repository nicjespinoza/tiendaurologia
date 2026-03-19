"use client";

import { doc, setDoc } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { db } from "@/lib/firebase";
import { useAuth } from "./auth-context";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
  image: string;
};

type CartContextValue = {
  items: CartItem[];
  total: number;
  addItem: (item: CartItem) => void;
  updateQty: (id: string, size: string, color: string, quantity: number) => void;
  removeItem: (id: string, size: string, color: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);
const STORAGE_KEY = "innerman-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  });
  const { user } = useAuth();

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
    if (user && db) {
      const ref = doc(db, "carts", user.uid);
      setDoc(ref, { items }, { merge: true }).catch(console.error);
    }
  }, [items, user]);

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (p) => p.id === item.id && p.size === item.size && p.color === item.color
      );
      if (existingIndex >= 0) {
        const copy = [...prev];
        copy[existingIndex].quantity += item.quantity;
        return copy;
      }
      return [...prev, item];
    });
  };

  const updateQty = (id: string, size: string, color: string, quantity: number) => {
    setItems((prev) =>
      prev.map((p) =>
        p.id === id && p.size === size && p.color === color ? { ...p, quantity } : p
      )
    );
  };

  const removeItem = (id: string, size: string, color: string) => {
    setItems((prev) => prev.filter((p) => !(p.id === id && p.size === size && p.color === color)));
  };

  const clear = () => setItems([]);

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  return (
    <CartContext.Provider value={{ items, total, addItem, updateQty, removeItem, clear }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
