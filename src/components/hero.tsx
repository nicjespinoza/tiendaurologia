"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { ArrowRight, Shield, Headphones, Heart } from "lucide-react";
import { Hero3DScene } from "./hero-3d-scene";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* ── Background Gradient & 3D Scene ── */}
      <div className="hero-gradient absolute inset-0 -z-10" />
      <Hero3DScene />


      {/* ── Decorative Elements ── */}
      <div className="absolute right-0 top-0 -z-10 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute -left-20 bottom-0 -z-10 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />

      <div className="section-max grid gap-10 pt-48 pb-20 md:pt-64 md:pb-28 lg:grid-cols-2 lg:items-center lg:gap-16">
        {/* ── Left Content ── */}
        <div className="space-y-7 animate-slide-in-left">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur-sm border border-white/10">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            VITE CARE
          </div>

          <h1 className="text-4xl font-bold leading-[1.1] text-white md:text-5xl lg:text-6xl">
            Modernizando la {" "}
            <span className="relative">
              Medicina
              <span className="absolute -bottom-1 left-0 h-1 w-full rounded-full bg-accent/60" />
            </span>
          </h1>

          <p className="max-w-lg text-base leading-relaxed text-white/75 md:text-lg">
            Distribución de equipos de ginecología, urología, oftalmología,
            electrocauterios, suplementos y línea de autocuidado. Servicio
            integral y renta de equipos especializados.
          </p>

          <div className="flex flex-wrap gap-3 pt-1">
            <Link href="/categorias">
              <Button
                size="lg"
                className="bg-[#008237] text-white hover:bg-[#008237]/90 shadow-lg shadow-[#008237]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#008237]/30 group"
              >
                Ver Catálogo
                <ArrowRight className="ml-1.5 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/#contacto">
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
              >
                Contáctanos
              </Button>
            </Link>
          </div>

          {/* ── Trust Stats ── */}
          <div className="grid grid-cols-3 gap-4 pt-4">
            {[
              { icon: Shield, label: "Equipos\nCertificados" },
              { icon: Headphones, label: "Soporte\nTécnico" },
              { icon: Heart, label: "Renta de\nEquipos" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2.5 rounded-xl bg-white/5 px-3 py-3 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:bg-white/10"
              >
                <item.icon className="h-5 w-5 shrink-0 text-accent" />
                <p className="text-xs font-medium text-white/80 whitespace-pre-line leading-tight">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right Media ── */}
        <div className="relative animate-slide-in-right hidden lg:block">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl shadow-black/30 border border-white/10">
            <video
              src="/video/hero.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent pointer-events-none" />
          </div>

          {/* ── Floating Badge ── */}
          <div className="absolute -bottom-4 -left-4 rounded-2xl bg-white p-4 shadow-xl shadow-primary/10 animate-float">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10">
                <Shield className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-sm font-bold text-navy">Calidad Premium</p>
                <p className="text-xs text-mutedForeground">Equipos certificados</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
