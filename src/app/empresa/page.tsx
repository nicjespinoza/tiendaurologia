"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Users, 
  History, 
  Target, 
  Eye, 
  ShieldCheck, 
  Lightbulb, 
  Handshake, 
  HeartPulse, 
  ArrowRight,
  UserPlus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function EmpresaPage() {
  const team = [
    {
      name: "Lic. Sayra Solis",
      role: "Fundadora & CEO",
      desc: "Lidera la visión estratégica de Vital Care con un enfoque en la humanización de la tecnología médica.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&h=400&auto=format&fit=crop"
    },
    {
      name: "Dr. Horacio Aleman",
      role: "Director Médico y Capacitación",
      desc: "Especialista en integración clínica y responsable de la excelencia técnica en nuestros protocolos.",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&h=400&auto=format&fit=crop"
    },
    {
      name: "Ing. Joseph Espinoza",
      role: "Gerente de TI y Soporte Técnico",
      desc: "Arquitecto de soluciones tecnológicas y garante de la continuidad operativa de nuestros clientes.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&h=400&auto=format&fit=crop"
    },
    {
      name: "Ana Torres",
      role: "Directora Comercial",
      desc: "Gestiona las alianzas estratégicas y asegura que cada clínica reciba la solución óptima para sus necesidades.",
      image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=400&h=400&auto=format&fit=crop"
    }
  ];

  const values = [
    { title: "Excelencia", icon: ShieldCheck, desc: "Buscamos la perfección en cada equipo y servicio que entregamos." },
    { title: "Innovación", icon: Lightbulb, desc: "A la vanguardia de las últimas tendencias médicas mundiales." },
    { title: "Integridad", icon: Handshake, desc: "Actuamos con transparencia y ética total en cada proceso." },
    { title: "Cliente", icon: HeartPulse, desc: "Nuestra prioridad es el éxito y bienestar de los profesionales." },
    { title: "Responsabilidad", icon: Users, desc: "Compromiso real con la salud social y el medio ambiente." }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* ── HERO SECTION ── */}
      <section className="relative isolate overflow-hidden py-24 sm:py-32">
        <div className="hero-gradient absolute inset-0 -z-10" />
        <div className="absolute right-0 top-0 -z-10 h-96 w-96 rounded-full bg-white/5 blur-3xl opacity-20" />
        
        <div className="section-max grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-slide-in-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur-sm border border-white/10">
              Sobre Nosotros
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl leading-tight">
              Acerca de <span className="text-emerald-400">Vital Care</span>
            </h1>
            <p className="text-xl leading-8 text-white/80 max-w-xl">
              Más que equipos médicos. Somos tu aliado estratégico en salud, transformando la práctica clínica en Centroamérica.
            </p>
            <div className="flex items-center gap-x-6 pt-4">
              <Button 
                onClick={() => document.getElementById('equipo')?.scrollIntoView({ behavior: 'smooth' })}
                size="lg" 
                className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-xl transition-all hover:-translate-y-1"
              >
                Conoce nuestro equipo
              </Button>
            </div>
          </div>

          <div className="relative aspect-[16/10] lg:aspect-square w-full rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/60 border border-white/10 animate-slide-in-right">
            <Image
              src="/image/local.jpg"
              alt="Ubicación Vital Care"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        </div>
      </section>

      {/* ── NUESTRA HISTORIA ── */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="section-max">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 text-emerald-600 font-bold uppercase tracking-widest text-sm">
                <History className="h-5 w-5" />
                Cómo nacimos
              </div>
              <h2 className="text-4xl font-bold text-navy tracking-tight">Nuestra Trayectoria</h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Vital Care nació en 2025 en Managua, Nicaragua, de la visión profesional de la salud que vivían en carne propia las limitaciones de acceso a tecnología médica de calidad en Centroamérica.
                </p>
                <p>
                  Nuestra fundadora, el <span className="text-navy font-semibold">Lic. Sayra Solis</span>, decidió traer al mercado la marca Vital Care en urología y rápidamente expandimos a ginecología, oftalmología, electrocauterios, material de reposición, suplementos especializados y una línea completa de autocuidado.
                </p>
                <p>
                  Hoy somos el proveedor de referencia de clínicas y hospitales en la región, gracias a nuestro compromiso con la calidad, la innovación y un soporte técnico que realmente marca la diferencia.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-100 relative z-10">
                <Image 
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop"
                  alt="Equipo médico tecnología"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 h-64 w-64 bg-emerald-500/10 rounded-full blur-3xl" />
              <div className="absolute -top-10 -left-10 h-64 w-64 bg-sky-500/10 rounded-full blur-3xl opacity-50" />
            </div>
          </div>
        </div>
      </section>

      {/* ── PROPÓSITO: MISIÓN, VISIÓN, VALORES ── */}
      <section className="py-24 bg-slate-50">
        <div className="section-max space-y-20">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-navy">Nuestro Propósito</h2>
            <div className="h-1.5 w-24 bg-emerald-500 mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 flex gap-6 group hover:shadow-xl transition-all duration-500">
              <div className="h-14 w-14 rounded-2xl bg-emerald-50 items-center justify-center flex shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                <Target className="h-8 w-8" />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-navy">Misión</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Proporcionar soluciones médicas integrales de última generación que eleven la calidad de atención en salud y faciliten el trabajo diario de los profesionales.
                </p>
              </div>
            </div>
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 flex gap-6 group hover:shadow-xl transition-all duration-500">
              <div className="h-14 w-14 rounded-2xl bg-sky-50 items-center justify-center flex shrink-0 group-hover:bg-sky-500 group-hover:text-white transition-colors">
                <Eye className="h-8 w-8" />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-navy">Visión</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Ser la empresa líder en equipamiento médico en Centroamérica, reconocida por innovación, sostenibilidad y excelencia en servicio.
                </p>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {values.map((v, i) => (
              <Card key={i} className="border border-gray-100 hover:border-emerald-300 transition-all duration-300 hover:-translate-y-2 overflow-hidden shadow-none hover:shadow-lg">
                <CardContent className="pt-8 text-center space-y-4">
                  <v.icon className="h-10 w-10 mx-auto text-emerald-600" />
                  <h4 className="font-bold text-navy">{v.title}</h4>
                  <p className="text-xs text-muted-foreground">{v.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── EQUIPO ── */}
      <section id="equipo" className="py-24 bg-white">
        <div className="section-max space-y-16">
          <div className="text-center space-y-3">
            <span className="text-sky-600 font-bold uppercase tracking-widest text-sm">Vital Care Team</span>
            <h2 className="text-4xl font-bold text-navy">El equipo detrás de MedVenus</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <div key={i} className="group text-center space-y-6">
                <div className="relative mx-auto h-48 w-48 overflow-hidden rounded-full border-4 border-emerald-50 transition-colors group-hover:border-emerald-500">
                  <Image 
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-bold text-navy">{member.name}</h4>
                  <p className="text-emerald-600 font-semibold text-sm">{member.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed px-4 italic">
                    "{member.desc}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CIERRE CTA ── */}
      <section className="py-24 relative overflow-hidden">
        <div className="hero-gradient absolute inset-0 -z-10" />
        <div className="section-max text-center space-y-8">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="text-white/70 font-bold uppercase tracking-[0.4em] text-xs">Juntos por la salud</span>
            <h3 className="text-4xl font-bold text-white tracking-tight">Listos para transformar la salud juntos</h3>
            <p className="text-white/80 text-lg">
              Convertimos la tecnología médica en el motor de crecimiento de tu práctica clínica.
            </p>
          </div>
          <Link href="/contacto">
            <Button size="lg" className="bg-white text-navy hover:bg-emerald-50 px-12 py-8 rounded-2xl font-bold text-xl shadow-2xl transition-all hover:scale-105 active:scale-95 group">
              Contactar con nosotros
              <ArrowRight className="ml-2 h-6 w-6 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

// Página generada para coincidir 100% con el estilo del proyecto existente
