import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { Button } from "./ui/button";

type SummaryProps = {
  subtotal: number;
  shippingText?: string;
  total: number;
  ctaHref?: string;
  ctaLabel?: string;
};

export function OrderSummaryCard({
  subtotal,
  shippingText = "Se calcula en checkout",
  total,
  ctaHref,
  ctaLabel = "Continuar",
}: SummaryProps) {
  return (
    <aside className="rounded-xl border border-border bg-white p-5 shadow-sm shadow-black/10">
      <h3 className="mb-4 text-lg font-semibold text-foreground">Resumen de compra</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-mutedForeground">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-mutedForeground">
          <span>Envio</span>
          <span>{shippingText}</span>
        </div>
        <div className="mt-2 flex justify-between border-t border-border pt-3 text-base font-semibold text-foreground">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      <div className="mt-4 rounded-lg bg-muted p-3 text-xs text-mutedForeground">
        <p className="mb-2 flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-primary" />
          Pago seguro y datos protegidos
        </p>
        <p>Empaque discreto y soporte post compra.</p>
      </div>
      {ctaHref && (
        <Link href={ctaHref} className="mt-4 block">
          <Button className="w-full">{ctaLabel}</Button>
        </Link>
      )}
    </aside>
  );
}
