"use client";

import Link from "next/link";
import { Hero } from "@/components/hero";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/contexts/products-context";

export default function Home() {
  const { products } = useProducts();
  const featured = products.filter((p) => p.featured).slice(0, 3);

  return (
    <div className="bg-background text-foreground">
      <Hero />
      <section className="section-max space-y-6 pb-16">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-mutedForeground">
              Linea clinica urologica
            </p>
            <h2 className="text-3xl font-bold text-foreground">Productos mas solicitados</h2>
          </div>
          <Link href="/shop">
            <Button variant="outline">Ver catalogo</Button>
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {featured.length === 0 && (
            <p className="text-mutedForeground">
              Agrega productos en Firestore dentro de la coleccion `products`.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
