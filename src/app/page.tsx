"use client";

import { useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Hero } from "@/components/hero";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useProducts } from "@/contexts/products-context";

const categories = [
  {
    title: "Soporte post-operatorio",
    desc: "Cintura suave, compresion moderada y sujecion estable.",
    img: "/products/trunk/post-op-care/model-front.png",
  },
  {
    title: "Control de humedad",
    desc: "Microfibra respirable para incontinencia leve y confort diario.",
    img: "/products/brief/continence-soft/flat-lay.png",
  },
  {
    title: "Uso prolongado",
    desc: "Algodon hipoalergenico con costuras planas anti-friccion.",
    img: "/products/boxer-brief/support-plus/model-front.png",
  },
  {
    title: "Soporte deportivo",
    desc: "Trunks ligeros con ventilacion y estabilidad lumbar.",
    img: "/products/trunk/post-op-care/flat-lay.png",
  },
];

export default function Home() {
  const { products, loading } = useProducts();
  const featured = useMemo(() => products.filter((p) => p.featured).slice(0, 8), [products]);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (direction: "next" | "prev") => {
    const el = carouselRef.current;
    if (!el) return;
    const amount = direction === "next" ? 320 : -320;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <div className="bg-background text-foreground">
      <Hero />

      {/* Categorias */}
      <section className="section-max space-y-6 pb-10 pt-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-mutedForeground">Categorias</p>
            <h2 className="text-3xl font-bold text-foreground">Encuentra la prenda ideal</h2>
          </div>
          <Link href="/shop">
            <Button variant="outline">Ver catalogo</Button>
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {categories.map((cat) => (
            <Card
              key={cat.title}
              className="group relative overflow-hidden border-border/80 bg-white transition duration-500 hover:-translate-y-1 hover:border-secondary"
            >
              <div className="absolute inset-0">
                <Image
                  src={cat.img}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover opacity-90 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              </div>
              <CardContent className="relative flex h-full flex-col justify-end space-y-2 p-6">
                <Badge className="w-fit bg-secondary text-white shadow-lg shadow-secondary/30">
                  {cat.title}
                </Badge>
                <p className="text-white/90">{cat.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Mas vendidos con carousel */}
      <section className="section-max space-y-4 pb-16">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-mutedForeground">Mas vendidos</p>
            <h2 className="text-3xl font-bold text-foreground">Recomendados por pacientes</h2>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => scrollCarousel("prev")}>
              ←
            </Button>
            <Button variant="outline" size="sm" onClick={() => scrollCarousel("next")}>
              →
            </Button>
          </div>
        </div>

        <div
          ref={carouselRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4"
          style={{ scrollBehavior: "smooth" }}
        >
          {loading &&
            Array.from({ length: 5 }).map((_, idx) => (
              <div
                key={`skeleton-${idx}`}
                className="min-w-[260px] max-w-[260px] snap-start rounded-xl border border-border bg-white p-4 shadow-sm"
              >
                <div className="aspect-[4/5] animate-pulse rounded-lg bg-gray-100" />
                <div className="mt-3 h-4 w-3/4 animate-pulse rounded bg-gray-100" />
                <div className="mt-2 h-4 w-1/2 animate-pulse rounded bg-gray-100" />
              </div>
            ))}

          {!loading &&
            featured.map((product) => (
              <div key={product.id} className="min-w-[260px] max-w-[260px] snap-start">
                <ProductCard product={product} />
              </div>
            ))}

          {!loading && featured.length === 0 && (
            <div className="w-full rounded-xl border border-dashed border-border p-6 text-mutedForeground">
              Aun no hay productos destacados. Agrega algunos en Firestore.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
