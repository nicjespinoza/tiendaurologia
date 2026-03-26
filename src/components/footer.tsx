import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin, Mail, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      {/* ── Main Footer ── */}
      <div className="section-max py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr,1fr,1fr,1.2fr]">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <Image
<<<<<<< HEAD
                src="/logo/logo1.png"
                alt="Vital Care"
                width={40}
                height={40}
=======
                src="/logo/logo2.png"
                alt="Vital Care"
                width={100}
                height={100}
>>>>>>> redesign-final
              />
              <div>
                <span className="text-lg font-bold tracking-tight">
                  Vital<span className="text-accent">Care</span>
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-white/60 max-w-xs">
              Distribución de equipos médicos, electrocauterios, suplementos y
              productos de autocuidado. Servicio profesional y confiable.
            </p>
            <div className="space-y-2 text-sm text-white/60">
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary-light shrink-0" />
                Jardines de Veracruz 10 C al Sur. -23
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary-light shrink-0" />
                8542-1011 (Claro)
              </p>
            </div>
          </div>

          {/* Categorías */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-[0.15em] text-white/80">
              Categorías
            </h4>
            <nav className="flex flex-col gap-2 text-sm text-white/50">
<<<<<<< HEAD
              <Link href="/shop" className="hover:text-white transition-colors">
                Ginecología
              </Link>
              <Link href="/shop" className="hover:text-white transition-colors">
                Urología
              </Link>
              <Link href="/shop" className="hover:text-white transition-colors">
                Oftalmología
              </Link>
              <Link href="/shop" className="hover:text-white transition-colors">
                Electrocauterios
              </Link>
              <Link href="/shop" className="hover:text-white transition-colors">
=======
              <Link href="/categorias" className="hover:text-white transition-colors">
                Ginecología
              </Link>
              <Link href="/categorias" className="hover:text-white transition-colors">
                Urología
              </Link>
              <Link href="/categorias" className="hover:text-white transition-colors">
                Oftalmología
              </Link>
              <Link href="/categorias" className="hover:text-white transition-colors">
                Electrocauterios
              </Link>
              <Link href="/categorias" className="hover:text-white transition-colors">
>>>>>>> redesign-final
                Suplementos
              </Link>
            </nav>
          </div>

          {/* Información */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-[0.15em] text-white/80">
              Información
            </h4>
            <nav className="flex flex-col gap-2 text-sm text-white/50">
<<<<<<< HEAD
              <Link href="/shop" className="hover:text-white transition-colors">
=======
              <Link href="/categorias" className="hover:text-white transition-colors">
>>>>>>> redesign-final
                Catálogo
              </Link>
              <Link href="/cart" className="hover:text-white transition-colors">
                Carrito
              </Link>
              <Link href="/account" className="hover:text-white transition-colors">
                Mi Cuenta
              </Link>
              <Link href="/privacidad" className="hover:text-white transition-colors">
                Privacidad
              </Link>
              <Link href="/terminos" className="hover:text-white transition-colors">
                Términos
              </Link>
            </nav>
          </div>

          {/* Servicios & Links Externos */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-[0.15em] text-white/80">
              Servicios
            </h4>
            <nav className="flex flex-col gap-2 text-sm text-white/50">
              <span className="text-white/70 font-medium">Renta de Equipos</span>
              <span>Venus · Equipo Láser</span>
              <div className="mt-2 space-y-2">
                <a
                  href="https://newmiuz.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-white transition-colors"
                >
                  Bruma para Almohada
                  <ArrowUpRight className="h-3 w-3" />
                </a>
                <a
                  href="https://www.agaval.com/banda-para-dolor-de-cabeza-y-migra%C3%B1a-253812/p"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-white transition-colors"
                >
                  Bandas Hot/Cold
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-white/10">
        <div className="section-max flex flex-col items-center justify-between gap-3 py-5 text-xs text-white/40 md:flex-row">
          <p>© {new Date().getFullYear()} Vital Care. Todos los derechos reservados.</p>
          <div className="flex items-center gap-1">
            <a href="mailto:soporte@vitalcare.com" className="flex items-center gap-1 hover:text-white/60 transition-colors">
              <Mail className="h-3 w-3" />
              soporte@vitalcare.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
