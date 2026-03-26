"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, User, Menu, X, Phone, MapPin, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "@/contexts/auth-context";
import { useCart } from "@/contexts/cart-context";

const CATEGORIAS_SUBMENU = [
  {
    title: "Equipos",
    items: [
      { label: "Ginecología", href: "/categorias?cat=ginecologia" },
      { label: "Urología (Venus)", href: "/categorias?cat=urologia" },
      { label: "Oftalmología", href: "/categorias?cat=oftalmologia" },
      { label: "Equipos Electrocauterios", href: "/categorias?cat=electrocauterios" },
    ],
  },
  {
    title: "Material de reposición",
    items: [
      { label: "Mascarilla", href: "/categorias?cat=material" },
      { label: "Inyecciones", href: "/categorias?cat=material" },
      { label: "Guantes", href: "/categorias?cat=material" },
    ],
  },
  {
    title: "Suplementos",
    items: [
      { label: "Megamen", href: "/categorias?cat=suplementos" },
      { label: "Litholite", href: "/categorias?cat=suplementos" },
      { label: "Citralith", href: "/categorias?cat=suplementos" },
    ],
  },
  {
    title: "Línea de bienestar",
    items: [
      { label: "Bruma para Almohada", href: "/categorias?cat=autocuidado" },
      { label: "Bandas para dolor", href: "/categorias?cat=autocuidado" },
    ],
  },
];

const SERVICIOS_SUBMENU = [
  {
    title: "Servicios",
    items: [
      { label: "Renta de equipos Venus", href: "/servicios" },
      { label: "Renta de equipo Laser", href: "/servicios" },
    ],
  },
  {
    title: "Soporte",
    items: [
      { label: "Soporte técnico continuo", href: "/servicios#soporte" },
      { label: "Instalación y Capacitación", href: "/servicios#soporte" },
    ],
  },
];

const navLinks = [
  { href: "/categorias", label: "Categorías", submenu: CATEGORIAS_SUBMENU },
  { href: "/servicios", label: "Servicio y Soporte", submenu: SERVICIOS_SUBMENU },
  { href: "/empresa", label: "Nuestra Empresa" },
  { href: "/blog", label: "Blog" },
];

export function Navbar() {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ── Top Bar ── */}
      <div className={`hidden py-2 text-[12px] transition-all duration-300 md:block ${isScrolled ? "bg-navy" : "bg-[#71B320]"} text-white z-50 relative`}>
        <div className="section-max flex items-center justify-between font-medium">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5" />
              Jardines de Veracruz 10 C al Sur. -23
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5" />
              +505 8542-1011
            </span>
          </div>
        </div>
      </div>

      {/* ── Main Nav ── */}
      <header
        className={`fixed left-0 right-0 z-40 transition-all duration-300 ${isScrolled
          ? "top-0 bg-white shadow-md border-b border-border h-20"
          : "top-8 bg-transparent h-24 border-transparent"
          }`}
      >
        <div className="section-max flex h-full items-center justify-between gap-4">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            {/* AQUÍ CAMBIAS EL TAMAÑO: isScrolled (Pequeño) / No Scrolled (Grande) */}
            <div className={`relative transition-all duration-500 group-hover:scale-105 ${isScrolled
              ? "w-24 h-24" // <-- Tamaño al hacer Scroll
              : "w-24 h-24 md:w-28 md:h-28" // <-- Tamaño al Inicio
              }`}>
              <Image
                src={isScrolled ? "/logo/logo1.png" : "/logo/logo2.png"}
                alt="Vital Care"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className={`text-lg md:text-2xl font-bold tracking-tight leading-tight transition-colors duration-300 ${isScrolled ? "" : "text-white"}`}>
                <span style={{ color: isScrolled ? '#338EAE' : 'inherit' }}>Equipos</span> <span style={{ color: isScrolled ? '#71B320' : 'inherit' }}>Médicos</span>
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 lg:flex h-full">
            {navLinks.map((link) => (
              <div key={link.label} className="group relative h-full flex items-center">
                <Link
                  href={link.href}
                  className={`flex items-center gap-1 rounded-lg px-4 py-2 text-[14px] font-semibold transition-all duration-300 ${isScrolled ? "text-navy/80 hover:text-[#71B320]" : "text-white hover:text-white/80"
                    }`}
                  style={{ color: isScrolled ? '#338EAE' : undefined }}
                  onMouseEnter={(e) => {
                    if (isScrolled) e.currentTarget.style.color = '#71B320';
                  }}
                  onMouseLeave={(e) => {
                    if (isScrolled) e.currentTarget.style.color = '#338EAE';
                  }}
                >
                  {link.label}
                  {link.submenu && <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-180 opacity-60`} />}
                </Link>

                {/* Mega Menu Dropdown */}
                {link.submenu && (
                  <div className="invisible absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 z-50">
                    <div className="bg-white rounded-[1.5rem] shadow-2xl border border-border/50 overflow-hidden w-[700px] p-8 grid grid-cols-2 gap-8 animate-in fade-in slide-in-from-top-2">
                      {link.submenu.map((sub) => (
                        <div key={sub.title} className="space-y-4">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-[#71B320] border-b border-[#71B320]/10 pb-2">
                            {sub.title}
                          </h4>
                          <ul className="space-y-2">
                            {sub.items.map((item) => (
                              <li key={item.label}>
                                <Link
                                  href={item.href}
                                  className="text-[13px] hover:text-[#71B320] transition-colors block font-medium"
                                  style={{ color: '#338EAE' }}
                                >
                                  {item.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop Right */}
          <div className="flex items-center gap-4">
            <Link href="/cart" className="relative group">
              <div className={`p-2 rounded-lg transition-all ${isScrolled ? "text-navy hover:bg-muted" : "text-white hover:bg-white/10"}`}>
                <ShoppingBag className="h-5 w-5" />
              </div>
              <span
                suppressHydrationWarning
                className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#71B320] text-[10px] font-bold text-white shadow-md shadow-[#71B320]/20"
              >
                {count}
              </span>
            </Link>

            {user ? (
              <Button
                variant="outline"
                size="sm"
                className={`transition-all rounded-lg font-bold text-[12px] ${isScrolled ? "border-navy text-navy hover:bg-muted" : "border-white text-white hover:bg-white/10"}`}
                onClick={() => logout()}
              >
                <User className="h-4 w-4 mr-1.5" />
                Salir
              </Button>
            ) : (
              <Link href="/login">
                <Button
                  size="sm"
                  className="bg-[#71B320] text-white hover:bg-[#619c1b] shadow-md shadow-emerald-500/20 transition-all duration-300 font-bold px-5 py-2 rounded-lg"
                >
                  <User className="h-4 w-4 mr-1.5" />
                  Ingresar
                </Button>
              </Link>
            )}

            {/* Mobile Toggle */}
            <button
              className={`rounded-lg p-2 lg:hidden transition-colors ${isScrolled ? "text-navy hover:bg-muted" : "text-white hover:bg-white/10"}`}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Refined */}
        {mobileOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-2xl lg:hidden p-8 rounded-b-2xl animate-fade-in max-h-[80vh] overflow-y-auto border-t">
            <nav className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <div key={link.label} className="space-y-4">
                  <Link
                    href={link.href}
                    onClick={() => !link.submenu && setMobileOpen(false)}
                    className="text-lg font-bold text-navy flex justify-between group"
                  >
                    {link.label}
                    {link.submenu && <ChevronDown className="h-5 w-5 text-[#71B320]" />}
                  </Link>
                  {link.submenu && (
                    <div className="grid grid-cols-1 gap-6 pl-4 border-l-2 border-muted">
                      {link.submenu.map((sub) => (
                        <div key={sub.title} className="space-y-3">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-[#71B320]">{sub.title}</p>
                          <ul className="space-y-2">
                            {sub.items.map((item) => (
                              <li key={item.label}>
                                <Link
                                  href={item.href}
                                  onClick={() => setMobileOpen(false)}
                                  className="text-sm font-bold text-[#338EAE] hover:text-[#71B320]"
                                >
                                  {item.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
