import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export function Hero() {
  return (
    <section className="section-max grid gap-10 py-16 lg:grid-cols-2 lg:items-center">
      <div className="space-y-6">
        <Badge>Cuidado urologico diario</Badge>
        <h1 className="text-4xl font-bold leading-tight text-black md:text-5xl">
          Ropa interior para pacientes de urologia con comodidad terapeutica.
        </h1>
        <p className="text-lg text-mutedForeground">
          Diseños para reducir friccion, mejorar ventilacion y dar soporte estable en casos de
          prostatitis, varicocele, incontinencia leve y recuperacion post procedimiento.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/shop">
            <Button size="lg">Ver catalogo clinico</Button>
          </Link>
          <Link href="/checkout">
            <Button size="lg" variant="secondary">
              Solicitar pedido
            </Button>
          </Link>
        </div>
        <div className="flex gap-6 text-sm text-mutedForeground">
          <div>
            <p className="font-semibold text-black">Textil</p>
            <p>Algodon hipoalergenico y modal suave</p>
          </div>
          <div>
            <p className="font-semibold text-black">Soporte</p>
            <p>Compresion moderada sin presion excesiva</p>
          </div>
          <div>
            <p className="font-semibold text-black">Higiene</p>
            <p>Secado rapido y control de humedad</p>
          </div>
        </div>
      </div>
      <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-white via-green-50 to-blue-50 p-6 shadow-lg shadow-black/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,166,62,0.18),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(4,42,143,0.12),transparent_35%)]" />
        <div className="relative grid gap-4">
          <div className="aspect-[4/5] overflow-hidden rounded-xl border border-border bg-white">
            <img
              src="/products/boxer-brief/support-plus/model-front.png"
              alt="Boxer brief terapeutico para soporte urologico"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="grid grid-cols-3 gap-3 text-xs text-mutedForeground">
            {[
              "/products/boxer-brief/support-plus/flat-lay.png",
              "/products/trunk/post-op-care/model-front.png",
              "/products/brief/continence-soft/flat-lay.png",
            ].map((src) => (
              <div
                key={src}
                className="aspect-[4/5] overflow-hidden rounded-lg border border-border/50"
              >
                <img src={src} alt="Detalle de producto urologico" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
