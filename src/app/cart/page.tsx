"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderSummaryCard } from "@/components/order-summary-card";

export default function CartPage() {
  const { items, total, updateQty, removeItem } = useCart();

  const changeQty = (id: string, size: string, color: string, delta: number) => {
    const item = items.find((i) => i.id === id && i.size === size && i.color === color);
    if (!item) return;
    const next = Math.max(1, item.quantity + delta);
    updateQty(id, size, color, next);
  };

  return (
    <div className="section-max grid gap-6 py-12 lg:grid-cols-[1.6fr,0.9fr]">
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Carrito</h1>
          <p className="text-mutedForeground">Revisa cantidades antes de pagar.</p>
        </div>

        <Card className="border-border/70">
          <CardHeader>
            <CardTitle className="text-lg">Productos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {items.map((item) => (
              <div
                key={`${item.id}-${item.size}-${item.color}`}
                className="grid grid-cols-[auto,1fr,auto] items-center gap-3 rounded-lg border border-border/60 bg-white p-3"
              >
                <div className="relative h-20 w-16 overflow-hidden rounded-md border border-border/60 bg-muted">
                  <Image
                    src={item.image || "/products/shared/placeholder.png"}
                    alt={item.name}
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                </div>
                <div className="space-y-1 text-sm">
                  <p className="font-semibold text-foreground">{item.name}</p>
                  <p className="text-mutedForeground">
                    {item.size} • {item.color}
                  </p>
                  <p className="text-primary font-semibold">${item.price.toFixed(2)}</p>
                  <div className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs text-mutedForeground">
                    Envio discreto
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={() => changeQty(item.id, item.size, item.color, -1)}>
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                    <Button variant="outline" size="icon" onClick={() => changeQty(item.id, item.size, item.color, 1)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-secondary"
                    onClick={() => removeItem(item.id, item.size, item.color)}
                  >
                    <Trash2 className="h-4 w-4" />
                    Eliminar
                  </Button>
                </div>
              </div>
            ))}

            {items.length === 0 && (
              <div className="rounded-xl border border-dashed border-border p-8 text-center">
                <p className="font-semibold text-foreground">Tu carrito esta vacio</p>
                <p className="mt-1 text-sm text-mutedForeground">Agrega productos para continuar.</p>
                <Link href="/shop" className="mt-4 inline-block">
                  <Button>Ir al catalogo</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="lg:sticky lg:top-20">
        <OrderSummaryCard
          subtotal={total}
          total={total}
          shippingText="Se calcula en checkout"
          ctaHref={items.length ? "/checkout" : undefined}
          ctaLabel="Ir a checkout"
        />
      </div>
    </div>
  );
}
