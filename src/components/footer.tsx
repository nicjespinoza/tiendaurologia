import Link from "next/link";
import { Lock, Truck } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white py-10 text-foreground">
      <div className="section-max grid gap-6 md:grid-cols-[1.3fr,1fr]">
        <div className="space-y-2">
          <p className="text-lg font-semibold"><span className="text-primary">Inner</span>Man UroCare</p>
          <p className="text-sm text-mutedForeground">
            Ropa interior masculina premium para bienestar urologico, envios discretos y pagos seguros.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm text-mutedForeground">
          <div className="space-y-2">
            <p className="text-foreground">Informacion</p>
            <Link href="/shop" className="hover:text-foreground">Catalogo</Link>
            <Link href="/checkout" className="hover:text-foreground">Checkout</Link>
            <Link href="/admin" className="hover:text-foreground">Admin</Link>
          </div>
          <div className="space-y-2">
            <p className="text-foreground">Soporte</p>
            <a href="mailto:soporte@innerman.com" className="hover:text-foreground">soporte@innerman.com</a>
            <Link href="/privacidad" className="hover:text-foreground">Privacidad</Link>
            <Link href="/terminos" className="hover:text-foreground">Terminos</Link>
          </div>
        </div>
      </div>

      <div className="section-max mt-6 grid gap-3 rounded-2xl border border-border bg-white p-4 text-sm text-mutedForeground md:grid-cols-3">
        <div className="flex items-center gap-2">
          <Lock className="h-4 w-4 text-primary" />
          Pago seguro con Tilopay
        </div>
        <div className="flex items-center gap-2">
          <Truck className="h-4 w-4 text-primary" />
          Envio discreto a Nicaragua
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary">
            Confianza clinica
          </span>
        </div>
      </div>
    </footer>
  );
}
