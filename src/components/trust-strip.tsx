import { ShieldCheck, Truck, Wallet, PackageCheck } from "lucide-react";

const items = [
  { icon: ShieldCheck, title: "Compra segura", text: "Pago protegido con Tilopay" },
  { icon: Truck, title: "Envio discreto", text: "Empaque neutro en 24-72h" },
  { icon: Wallet, title: "Cambios faciles", text: "Soporte rapido post compra" },
  { icon: PackageCheck, title: "Calidad premium", text: "Textiles suaves y durables" },
];

export function TrustStrip() {
  return (
    <section className="section-max py-6">
      <div className="grid gap-3 rounded-2xl border border-border bg-white p-4 md:grid-cols-4">
        {items.map((item) => (
          <article key={item.title} className="hover-lift flex items-start gap-3 rounded-lg bg-muted p-3">
            <item.icon className="mt-0.5 h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-semibold text-foreground">{item.title}</p>
              <p className="text-xs text-mutedForeground">{item.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
