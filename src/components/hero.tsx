"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

const heroThumbs = [
  "/products/boxer-brief/protech_dry_black_brief.webp",
  "/products/boxer-brief/protech_dry_white_brief.webp",
  "/products/trunk/test-eeze_2.webp",
];

export function Hero() {
  return (
    <section className="relative isolate flex items-center bg-white">
      <div className="section-max grid w-full gap-10 py-14 lg:grid-cols-[1.05fr,0.95fr] lg:items-center">
        <div className="space-y-6 text-foreground">
          <Badge className="bg-secondary/10 text-secondary">Linea clinica premium</Badge>
          <h1 className="text-4xl font-bold leading-tight md:text-5xl">
            Ropa interior masculina premium
          </h1>
          <p className="max-w-xl text-lg text-mutedForeground">
            Soporte terapeutico, telas hipoalergenicas y acabados invisibles para pacientes que
            necesitan confort diario sin comprometer estilo.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/shop">
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90">
                Comprar ahora
              </Button>
            </Link>
            <Link href="/checkout">
              <Button size="lg" variant="outline" className="text-secondary border-secondary">
                Agenda tu pedido
              </Button>
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[{ title: "Soporte estable", text: "Compresion suave" }, { title: "Higiene activa", text: "Secado rapido" }, { title: "Sin friccion", text: "Costuras planas" }].map((item) => (
              <div key={item.title} className="rounded-lg border border-border bg-white p-3 shadow-sm">
                <p className="text-sm font-semibold text-foreground">{item.title}</p>
                <p className="text-xs text-mutedForeground">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative rounded-2xl border border-border bg-white p-5 shadow-xl">
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-border/70">
            <Image
              src="/products/boxer-brief/protech_dry_1.webp"
              alt="Boxer brief soporte clinico"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {heroThumbs.map((src) => (
              <div key={src} className="relative aspect-[4/5] overflow-hidden rounded-lg border border-border/70">
                <Image src={src} alt="Detalle de producto" fill sizes="160px" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
