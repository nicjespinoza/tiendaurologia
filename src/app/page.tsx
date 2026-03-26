"use client";

import { useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Hero } from "@/components/hero";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/contexts/products-context";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Phone,
  MapPin,
  Clock,
  Stethoscope,
  Zap,
  Package,
  Pill,
  Sparkles,
  MonitorSmartphone,
  ArrowUpRight,
} from "lucide-react";

/* ── Categories ── */
const categories = [
  {
    title: "Ginecología",
    desc: "Equipos especializados para diagnóstico y tratamiento ginecológico.",
    img: "/images/cat-ginecologia.png",
    icon: Stethoscope,
<<<<<<< HEAD
    color: "from-primary to-teal",
=======

>>>>>>> redesign-final
  },
  {
    title: "Urología + Venus",
    desc: "Instrumentación urológica avanzada y equipo Venus para procedimientos.",
    img: "/images/cat-urologia.png",
    icon: MonitorSmartphone,
<<<<<<< HEAD
    color: "from-teal to-primary-light",
=======

>>>>>>> redesign-final
  },
  {
    title: "Oftalmología",
    desc: "Equipos de precisión para exploración y cirugía oftalmológica.",
    img: "/images/cat-oftalmologia.png",
    icon: Sparkles,
<<<<<<< HEAD
    color: "from-primary-dark to-primary",
=======

>>>>>>> redesign-final
  },
  {
    title: "Electrocauterios",
    desc: "Unidades de electrocirugía profesional para procedimientos seguros.",
    img: "/images/cat-electrocauterios.png",
    icon: Zap,
<<<<<<< HEAD
    color: "from-secondary to-secondary-dark",
=======

>>>>>>> redesign-final
  },

];

export default function Home() {
  const { products, loading } = useProducts();
  const featured = useMemo(
    () => products.filter((p) => p.featured).slice(0, 8),
    [products]
  );
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

      {/* ═══════════════════════════════ CATEGORIES ═══════════════════════════════ */}
      <section id="equipos" className="gradient-light py-20">
        <div className="section-max space-y-10">
          {/* Section Header */}
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Nuestras Categorías
            </span>
<<<<<<< HEAD
            <h2 className="text-3xl font-bold text-navy md:text-4xl">
=======
            <h2 className="text-3xl font-bold md:text-4xl" style={{ color: '#008f39' }}>
>>>>>>> redesign-final
              Equipos Médicos Especializados
            </h2>
            <p className="text-mutedForeground">
              Distribuimos equipos de alta calidad para las principales especialidades médicas.
            </p>
          </div>

          {/* Category Grid — Aspen-style cards */}
          <div className="flex flex-wrap justify-center gap-5">
            {categories.map((cat, idx) => (
              <div
                key={cat.title}
                className="category-card group cursor-pointer hover-lift bg-white rounded-2xl border border-border shadow-sm w-full sm:w-[calc(50%-1.25rem)] lg:w-[calc(33.333%-1.25rem)]"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden rounded-t-2xl">
                  <Image
                    src={cat.img}
                    alt={cat.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="category-card-img object-cover transition-transform duration-700"
                  />
<<<<<<< HEAD
                  <div className={`category-card-overlay absolute inset-0 bg-gradient-to-t ${cat.color} opacity-60 transition-opacity duration-500`} />
                  <div className="absolute bottom-3 left-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm border border-white/10">
                      <cat.icon className="h-5 w-5 text-white" />
=======
                  <div className={`category-card-overlay absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-60 transition-opacity duration-500`} />
                  <div className="absolute bottom-3 left-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 backdrop-blur-sm border border-white/20 shadow-sm">
                      <cat.icon className="h-5 w-5" style={{ color: '#0b8bb6' }} />
>>>>>>> redesign-final
                    </div>
                  </div>
                </div>
                {/* Content */}
                <div className="p-5 space-y-2">
<<<<<<< HEAD
                  <h3 className="text-lg font-bold text-navy group-hover:text-primary transition-colors">
=======
                  <h3 className="text-lg font-bold group-hover:text-primary transition-colors" style={{ color: '#008f39' }}>
>>>>>>> redesign-final
                    {cat.title}
                  </h3>
                  <p className="text-sm text-mutedForeground leading-relaxed">
                    {cat.desc}
                  </p>
                  <div className="flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 pt-1">
                    Ver más <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ SUPLEMENTOS HIGHLIGHT ═══════════════════════════ */}
<<<<<<< HEAD
      <section id="suplementos" className="relative overflow-hidden py-24 bg-white">
=======
      <section id="suplementos" className="relative overflow-hidden py-6 bg-white">
>>>>>>> redesign-final
        <div className="section-max">
          <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
            <div className="space-y-4">
              <span className="inline-block text-sm font-bold uppercase tracking-[0.3em]" style={{ color: '#338EAE' }}>
                Suplementos Médicos
              </span>
              <h2 className="text-4xl font-bold md:text-5xl lg:text-6xl leading-tight" style={{ color: '#008237' }}>
                Megamen: Litholite & Citralith
              </h2>
              <p className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-medium" style={{ color: '#338EAE' }}>
                Suplementos de grado profesional formulados para el soporte urológico. <br className="hidden md:block" />
                Calidad certificada y disponibilidad inmediata para su práctica clínica.
              </p>
            </div>

<<<<<<< HEAD
            <Link href="/shop">
              <Button
                size="lg"
                className="text-white hover:opacity-90 shadow-xl transition-all duration-300 group px-12 py-8 text-xl rounded-2xl"
                style={{ backgroundColor: '#008237' }}
              >
                Conocer más
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>

            <div className="relative w-full aspect-[21/9] rounded-[3rem] overflow-hidden shadow-2xl shadow-black/10 border border-border mt-12">
              <Image
                src="/images/cat-suplementos.png"
                alt="Suplementos Megamen"
                fill
                sizes="100vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
            </div>
=======
            <Link href="/categorias">
              <Button
                size="default"
                className="text-white hover:opacity-90 shadow-lg transition-all duration-300 group px-8 py-6 rounded-xl font-semibold"
                style={{ backgroundColor: '#008237' }}
              >
                Conocer más
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>

            <div className="w-full pt-4">
              <div className="relative aspect-[21/9] w-full overflow-hidden rounded-[2rem] shadow-2xl border border-border">
                <Image
                  src="/images/cat-suplementos.png"
                  alt="Suplementos Profesionales"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ LÍNEA DESCANSO & AUTOCUIDADO ═══════════════════════ */}
      <section className="py-12 bg-white">
        <div className="section-max space-y-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.3em]" style={{ color: '#0b8bb6' }}>
              Línea de Descanso
            </span>
            <h2 className="text-3xl font-bold md:text-4xl" style={{ color: '#008f39' }}>
              Bienestar y Autocuidado
            </h2>
            <p className="text-sm md:text-base font-medium" style={{ color: '#0b8bb6' }}>
              Productos especializados para mejorar la calidad de descanso y alivio del dolor.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {/* Bruma Almohada */}
            <a
              href="https://newmiuz.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group hover-lift overflow-hidden rounded-[2.5rem] border border-border bg-white shadow-sm w-full sm:w-[calc(50%-1rem)] lg:w-[400px]"
            >
              <div className="relative aspect-square overflow-hidden bg-muted">
                <Image
                  src="/images/newmiuz.jpg"
                  alt="Bruma para Almohada"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="inline-flex items-center gap-2 rounded-2xl bg-white/95 backdrop-blur-md px-4 py-2 text-xs font-bold shadow-xl border border-white" style={{ color: '#0b8bb6' }}>
                    <Sparkles className="h-3.5 w-3.5" style={{ color: '#008f39' }} />
                    New Miuz
                  </span>
                </div>
              </div>
              <div className="p-8 space-y-3">
                <h3 className="text-xl font-bold text-navy group-hover:text-primary transition-colors">
                  Bruma para Almohada
                </h3>
                <p className="text-sm text-mutedForeground leading-relaxed">
                  Spray aromático diseñado para mejorar la calidad del sueño y el descanso nocturno.
                </p>
                <div className="flex items-center gap-1.5 text-sm font-bold pt-1" style={{ color: '#008f39' }}>
                  Explorar marca <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </div>
            </a>

            {/* Bandas Hot/Cold */}
            <a
              href="https://agaval.vtexassets.com/arquivos/ids/2758058-1200-1200?v=638876775208400000&width=1200&height=1200&aspect=true"
              target="_blank"
              rel="noopener noreferrer"
              className="group hover-lift overflow-hidden rounded-[2.5rem] border border-border bg-white shadow-sm w-full sm:w-[calc(50%-1rem)] lg:w-[400px]"
            >
              <div className="relative aspect-square overflow-hidden bg-muted">
                <Image
                  src="/images/migrana.jpg"
                  alt="Bandas para dolor de cabeza Hot/Cold"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="inline-flex items-center gap-2 rounded-2xl bg-white/95 backdrop-blur-md px-4 py-2 text-xs font-bold shadow-xl border border-white" style={{ color: '#0b8bb6' }}>
                    <Sparkles className="h-3.5 w-3.5" style={{ color: '#008f39' }} />
                    Agaval
                  </span>
                </div>
              </div>
              <div className="p-8 space-y-3">
                <h3 className="text-xl font-bold text-navy group-hover:text-primary transition-colors">
                  Bandas Hot/Cold para Migraña
                </h3>
                <p className="text-sm text-mutedForeground leading-relaxed">
                  Bandas terapéuticas de frío/calor para el alivio rápido del dolor de cabeza y migraña.
                </p>
                <div className="flex items-center gap-1.5 text-sm font-bold pt-1" style={{ color: '#008f39' }}>
                  Explorar producto <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ======================== SERVICIOS - RENTA DE EQUIPOS ======================== */}
      <section id="servicios" className="relative isolate overflow-hidden py-24 lg:py-32 bg-[#0a0f1c]">
        {/* Background Effects Premium */}
        <div className="hero-gradient absolute inset-0 -z-10" />
        <div className="absolute right-10 top-20 -z-10 h-[520px] w-[520px] rounded-full bg-white/5 blur-3xl opacity-30" />
        <div className="absolute -left-32 bottom-10 h-96 w-96 rounded-full bg-emerald-500/10 blur-[140px]" />

        <div className="section-max space-y-20">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
              <span className="text-emerald-400 text-sm font-bold uppercase tracking-[3.5px]">Servicios</span>
            </div>

            <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tighter leading-none">
              Renta de Equipos <span className="text-emerald-400">de Alta Tecnología</span>
            </h2>

            <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              Equipamiento médico especializado con instalación, capacitación y soporte técnico continuo.
            </p>
          </div>

          <div className="space-y-28">
            {/* 1. Equipo Venus - Primero */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Contenido */}
              <div className="space-y-10">
                <div className="relative pl-8 border-l-4 border-sky-500">
                  <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
                    Equipo Venus
                  </h3>
                  <p className="text-lg text-white/80 leading-relaxed">
                    Tecnología de última generación para tratamientos estéticos y urológicos
                    mínimamente invasivos.
                  </p>
                </div>
              </div>

              {/* Imagen */}
              <div className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl shadow-black/60 border border-white/10 group">
                <Image
                  src="/images/services-rental.png"
                  alt="Equipo Venus"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>
            </div>

            {/* 2. Equipos Láser - Segundo */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Imagen */}
              <div className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl shadow-black/60 border border-white/10 group lg:order-2">
                <Image
                  src="/images/laser-equipo.png"
                  alt="Equipos Láser Especializados"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>

              {/* Contenido */}
              <div className="space-y-10 lg:order-1">
                <div className="relative pl-8 border-l-4 border-emerald-500">
                  <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
                    Equipos Láser
                  </h3>
                  <p className="text-lg text-white/80 leading-relaxed">
                    Tecnología avanzada para tratamientos quirúrgicos y estéticos de alta precisión.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Botón Único Grande y Centrado - Verde Premium */}
          <div className="flex justify-center pt-12">
            <Button
              asChild
              size="lg"
              className="group relative overflow-hidden bg-emerald-600 hover:bg-emerald-500 
                   text-white font-semibold text-xl px-14 py-8 rounded-3xl 
                   shadow-2xl shadow-emerald-950/60 transition-all duration-500 
                   hover:shadow-emerald-500/30 hover:-translate-y-1 active:scale-[0.985]"
            >
              <Link href="/#contacto" className="flex items-center gap-4">
                Solicitar Cotización
                <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-2" />
              </Link>
            </Button>
>>>>>>> redesign-final
          </div>
        </div>
      </section>

<<<<<<< HEAD
      {/* ═══════════════════════ LÍNEA DESCANSO & AUTOCUIDADO ═══════════════════════ */}
      <section className="py-20 bg-white">
        <div className="section-max space-y-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Línea de Descanso
            </span>
            <h2 className="text-3xl font-bold text-navy md:text-4xl">
              Bienestar y Autocuidado
            </h2>
            <p className="text-mutedForeground">
              Productos especializados para mejorar la calidad de descanso y
              alivio del dolor.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Bruma Almohada */}
            <a
              href="https://newmiuz.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group hover-lift overflow-hidden rounded-2xl border border-border bg-white shadow-sm"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src="/images/cat-descanso.png"
                  alt="Bruma para Almohada"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white border border-white/20">
                    <Sparkles className="h-3 w-3" />
                    New Miuz
                  </span>
                </div>
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-bold text-navy group-hover:text-primary transition-colors">
                  Bruma para Almohada
                </h3>
                <p className="text-sm text-mutedForeground">
                  Spray aromático diseñado para mejorar la calidad del sueño y el descanso nocturno.
                </p>
                <div className="flex items-center gap-1 text-sm font-medium text-secondary">
                  Ver producto <ArrowUpRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </a>

            {/* Bandas Hot/Cold */}
            <a
              href="https://www.agaval.com/banda-para-dolor-de-cabeza-y-migra%C3%B1a-253812/p"
              target="_blank"
              rel="noopener noreferrer"
              className="group hover-lift overflow-hidden rounded-2xl border border-border bg-white shadow-sm"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src="/images/cat-descanso.png"
                  alt="Bandas para dolor de cabeza Hot/Cold"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white border border-white/20">
                    <Sparkles className="h-3 w-3" />
                    Agaval
                  </span>
                </div>
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-bold text-navy group-hover:text-primary transition-colors">
                  Bandas Hot/Cold para Migraña
                </h3>
                <p className="text-sm text-mutedForeground">
                  Bandas terapéuticas de frío/calor para el alivio rápido del dolor de cabeza y migraña.
                </p>
                <div className="flex items-center gap-1 text-sm font-medium text-secondary">
                  Ver producto <ArrowUpRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ SERVICIOS ═══════════════════════════ */}

      <section id="servicios" className="relative overflow-hidden py-24 bg-navy">
        <div className="section-max space-y-12">
          {/* Header Centered */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="inline-block text-sm font-bold uppercase tracking-[0.3em] transition-all duration-300" style={{ color: '#338eae' }}>
              Servicios
            </span>
            <h2 className="text-4xl font-bold text-white md:text-5xl leading-tight">
              Renta de Equipos Especializados
            </h2>
            <p className="text-white/80 text-lg leading-relaxed">
              Ofrecemos renta de equipos de alta tecnología para su práctica. <br className="hidden md:block" />
              Incluye instalación, capacitación y soporte técnico continuo.
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="space-y-8">
              <div className="grid gap-6">
                <div
                  className="rounded-3xl bg-white/5 border border-white/10 p-8 backdrop-blur-md hover:bg-white/10 transition-all duration-500 group border-l-4"
                  style={{ borderLeftColor: '#338eae' }}
                >
                  <h4 className="text-2xl font-bold text-white mb-3 group-hover:translate-x-1 transition-transform">Equipo Venus</h4>
                  <p className="text-base text-white/60 leading-relaxed">
                    Tecnología avanzada para tratamientos estéticos y urológicos.
                  </p>
                </div>
              </div>

              <div className="flex justify-center lg:justify-start pt-2">
                <Link href="/#contacto">
                  <Button
                    size="lg"
                    className="text-white hover:opacity-90 shadow-2xl transition-all duration-300 group px-10 py-7 text-lg rounded-2xl"
                    style={{ backgroundColor: '#338eae' }}
                  >
                    Solicitar Cotización
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/40 border border-white/10 hidden lg:block">
              <Image
                src="/images/services-rental.png"
                alt="Renta de equipos médicos Vital Care"
                fill
                sizes="50vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ PRODUCTOS DESTACADOS ═══════════════════════════ */}
      <section className="py-20 gradient-light">
        <div className="section-max space-y-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Catálogo
              </span>
              <h2 className="text-3xl font-bold text-navy">
                Productos Destacados
              </h2>
            </div>
=======
      {/* ═══════════════════════════ PRODUCTOS DESTACADOS ═══════════════════════════ */}
      <section className="py-20 gradient-light">
        <div className="section-max space-y-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Catálogo
              </span>
              <h2 className="text-3xl font-bold text-navy">
                Productos Destacados
              </h2>
            </div>
>>>>>>> redesign-final
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-xl border-border hover:bg-primary hover:text-white hover:border-primary transition-all"
                onClick={() => scrollCarousel("prev")}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-xl border-border hover:bg-primary hover:text-white hover:border-primary transition-all"
                onClick={() => scrollCarousel("next")}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
<<<<<<< HEAD
              <Link href="/shop" className="ml-2">
=======
              <Link href="/categorias" className="ml-2">
>>>>>>> redesign-final
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-white transition-all group"
                >
                  Ver todo
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </Link>
            </div>
          </div>

          <div
            ref={carouselRef}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 scroll-shadow"
            style={{ scrollBehavior: "smooth" }}
          >
            {loading &&
              Array.from({ length: 5 }).map((_, idx) => (
                <div
                  key={`skeleton-${idx}`}
                  className="min-w-[260px] max-w-[260px] snap-start rounded-2xl border border-border bg-white p-4 shadow-sm"
                >
                  <div className="aspect-[4/5] animate-pulse rounded-xl bg-muted" />
                  <div className="mt-3 h-4 w-3/4 animate-pulse rounded bg-muted" />
                  <div className="mt-2 h-4 w-1/2 animate-pulse rounded bg-muted" />
                </div>
              ))}

            {!loading &&
              featured.map((product) => (
                <div key={product.id} className="min-w-[260px] max-w-[260px] snap-start">
                  <ProductCard product={product} />
                </div>
              ))}

            {!loading && featured.length === 0 && (
              <div className="w-full rounded-2xl border border-dashed border-border p-8 text-center text-mutedForeground">
                Aún no hay productos destacados. Agrega algunos en el admin.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ CONTACTO ═══════════════════════════ */}
      <section id="contacto" className="py-20 bg-white">
        <div className="section-max">
          <div className="mx-auto max-w-3xl text-center space-y-6">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Contacto
            </span>
            <h2 className="text-3xl font-bold text-navy md:text-4xl">
              ¿Necesita más información?
            </h2>
            <p className="text-mutedForeground max-w-xl mx-auto">
              Estamos para servirle. Contáctenos para cotizaciones, renta de
              equipos o cualquier consulta sobre nuestros productos.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              {
                icon: Phone,
                title: "Teléfono",
                detail: "8542-1011 (Claro)",
                sub: "Lunes a Viernes, 8am - 6pm",
                bgColor: "bg-primary/5",
                iconColor: "text-primary",
              },
              {
                icon: MapPin,
                title: "Dirección",
                detail: "Jardines de Veracruz 10 C al Sur. -23",
                sub: "Veracruz, México",
                bgColor: "bg-accent/5",
                iconColor: "text-accent",
              },
              {
                icon: Clock,
                title: "Horario",
                detail: "Lunes a Viernes",
                sub: "8:00 AM – 6:00 PM",
                bgColor: "bg-secondary/5",
                iconColor: "text-secondary",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="hover-lift rounded-2xl border border-border bg-white p-6 text-center shadow-sm"
              >
                <div className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${item.bgColor}`}>
                  <item.icon className={`h-6 w-6 ${item.iconColor}`} />
                </div>
                <h3 className="text-lg font-bold text-navy mb-1">{item.title}</h3>
                <p className="text-sm font-medium text-foreground">{item.detail}</p>
                <p className="text-xs text-mutedForeground mt-1">{item.sub}</p>
              </div>
            ))}
          </div>
          {/* ═══════════════════════════ MAPA ═══════════════════════════ */}
          <div className="mt-20 overflow-hidden rounded-[2.5rem] border border-border bg-muted shadow-2xl h-[450px] relative group">
            <iframe
<<<<<<< HEAD
              title="Vital Care Map"
=======
              title="Vital Care"
>>>>>>> redesign-final
              src="https://maps.google.com/maps?q=12.122755520080776,-86.22870630267866&t=&z=17&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale-[0.1] contrast-[1.1] transition-all duration-700 group-hover:grayscale-0"
            />
            <div className="absolute top-6 left-6 p-5 rounded-3xl bg-white/95 backdrop-blur-md shadow-xl border border-white/20 max-w-[260px] animate-fade-in">
              <div className="flex items-center gap-3 mb-2.5">
                <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center shadow-md shadow-primary/20">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <h4 className="font-bold text-navy text-lg leading-tight">Vital Care</h4>
              </div>
              <p className="text-sm text-mutedForeground leading-relaxed">
                Jardines de Veracruz 10 C al Sur. -23
              </p>
              <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-primary">
                <Clock className="h-3.5 w-3.5" />
<<<<<<< HEAD
                Lunes - Viernes 8:00 AM – 6:00 PM
=======
                Lunes - Viernes 9:00 AM – 5:00 PM
>>>>>>> redesign-final
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
