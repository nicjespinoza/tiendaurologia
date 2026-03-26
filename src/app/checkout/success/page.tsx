import { CheckCircle2, PartyPopper } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CheckoutSuccessPage() {
  return (
    <div className="relative overflow-hidden bg-white py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(46,118,24,0.08),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(4,42,143,0.08),transparent_30%)]" />
      <div className="section-max relative grid gap-6 text-center">
        <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <PartyPopper className="h-8 w-8" />
        </div>
        <h1 className="text-3xl font-bold text-foreground">Pago confirmado</h1>
        <p className="text-mutedForeground">
          Gracias por confiar en InnerMan. Tu pedido se procesara en minutos y recibiras confirmacion por correo.
        </p>
        <div className="mx-auto flex flex-col items-center gap-2 rounded-2xl border border-border bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2 text-primary">
            <CheckCircle2 className="h-5 w-5" />
            Pago seguro con Tilopay
          </div>
          <div className="text-sm text-mutedForeground">Envio discreto, sin logos visibles.</div>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/categorias">
            <Button variant="outline">Seguir comprando</Button>
          </Link>
          <Link href="/">
            <Button className="bg-primary text-white hover:bg-primary/90">Ir al inicio</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
