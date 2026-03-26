"use client";

import { collection, DocumentData, onSnapshot, query } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { db } from "@/lib/firebase";

export type VariantStock = {
  size: string;
  color: string;
  quantity: number;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  material: string;
  description: string;
  type: string;
  colors: string[];
  sizes: string[];
  images: string[];
  variants: VariantStock[];
  featured?: boolean;
};

type Filter = {
  type?: string;
  size?: string;
  color?: string;
  material?: string;
};

type ProductsContextValue = {
  products: Product[];
  loading: boolean;
  filter: Filter;
  setFilter: (filter: Filter) => void;
};

const ProductsContext = createContext<ProductsContextValue | undefined>(undefined);

const demoProducts: Product[] = [
  {
    id: "demo-1",
    name: "Boxer Brief Support Plus",
    slug: "boxer-brief-support-plus",
    price: 32.5,
    material: "algodon hipoalergenico",
    description:
      "Ideal para dolor testicular leve y uso prolongado, con soporte firme y costura plana anti friccion.",
    type: "boxer brief",
    colors: ["negro", "blanco"],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "/products/boxer-brief/protech_dry_1.webp",
      "/products/boxer-brief/protech_dry_black_brief.webp",
      "/products/boxer-brief/protech_dry_white.webp",
      "/products/boxer-brief/protech_dry_white_brief.webp",
      "/products/shared/protech_dry_1.webp",
    ],
    variants: [
      { size: "M", color: "negro", quantity: 12 },
      { size: "L", color: "negro", quantity: 9 },
      { size: "M", color: "blanco", quantity: 11 },
    ],
    featured: true,
  },
  {
    id: "demo-2",
    name: "Trunk Post Op Care",
    slug: "trunk-post-op-care",
    price: 30,
    material: "modal",
    description:
      "Diseno para recuperacion post operatoria con presion moderada y cintura suave de ajuste estable.",
    type: "trunk",
    colors: ["negro", "verde medico"],
    sizes: ["M", "L", "XL", "2XL"],
    images: [
      "/products/trunk/test-eeze_1.webp",
      "/products/trunk/test-eeze_2.webp",
      "/products/trunk/test-eeze_3.webp",
      "/products/trunk/test-eeze_4.webp",
      "/products/shared/protech_dry_1.webp",
    ],
    variants: [
      { size: "M", color: "verde medico", quantity: 7 },
      { size: "L", color: "negro", quantity: 5 },
      { size: "XL", color: "negro", quantity: 6 },
    ],
    featured: true,
  },
  {
    id: "demo-3",
    name: "Brief Continence Soft",
    slug: "brief-continence-soft",
    price: 28.4,
    material: "microfibra",
    description:
      "Breve de alta absorcion para incontinencia ligera, tejido respirable y secado rapido para mayor seguridad.",
    type: "brief",
    colors: ["negro", "gris"],
    sizes: ["M", "L", "XL", "2XL", "3XL"],
    images: [
      "/products/brief/cathwear_2.webp",
      "/products/brief/cathwear_4.webp",
      "/products/brief/continence-soft/flat-lay.png",
      "/products/shared/protech_dry_1.webp",
    ],
    variants: [
      { size: "M", color: "gris", quantity: 10 },
      { size: "L", color: "negro", quantity: 6 },
      { size: "XL", color: "negro", quantity: 8 },
    ],
    featured: true,
  },
];

const mapProduct = (docData: DocumentData): Product => ({
  id: docData.id,
  name: docData.name,
  slug: docData.slug,
  price: docData.price,
  material: docData.material,
  description: docData.description,
  type: docData.type,
  colors: docData.colors ?? [],
  sizes: docData.sizes ?? [],
  images: docData.images ?? [],
  variants: docData.variants ?? [],
  featured: docData.featured ?? false,
});

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => (db ? [] : demoProducts));
  const [filter, setFilter] = useState<Filter>({});
  const [loading, setLoading] = useState(Boolean(db));

  useEffect(() => {
    if (!db) return;

    const baseRef = collection(db, "products");
    const q = query(baseRef);
    const unsub = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => mapProduct({ id: doc.id, ...doc.data() }));
      setProducts(list.length > 0 ? list : demoProducts);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (filter.type && p.type !== filter.type) return false;
      if (filter.size && !p.sizes.includes(filter.size)) return false;
      if (filter.color && !p.colors.includes(filter.color)) return false;
      if (filter.material && p.material !== filter.material) return false;
      return true;
    });
  }, [products, filter]);

  return (
    <ProductsContext.Provider value={{ products: filtered, loading, filter, setFilter }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProducts must be used within ProductsProvider");
  return ctx;
}
