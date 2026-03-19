"use client";

import Link from "next/link";
import { useCart } from "@/contexts/cart-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CartPage() {
  const { items, total, updateQty, removeItem } = useCart();

  return (
    <div className="section-max space-y-8 py-12">
      <header>
        <h1 className="text-3xl font-bold text-foreground">Carrito</h1>
        <p className="text-mutedForeground">Persistente en localStorage y sincroniza si inicias sesiÃ³n.</p>
      </header>
      <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Productos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {items.map((item) => (
              <div
                key={`${item.id}-${item.size}-${item.color}`}
                className="flex flex-col gap-3 rounded-lg border border-border/50 bg-white p-3 md:flex-row md:items-center md:justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 overflow-hidden rounded-md border border-border/60">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{item.name}</p>
                    <p className="text-sm text-mutedForeground">
                      {item.size} Â· {item.color}
                    </p>
                    <p className="text-sm text-primary">${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) =>
                      updateQty(item.id, item.size, item.color, Number(e.target.value))
                    }
                    className="h-10 w-16 rounded border border-border bg-white px-2 text-center text-sm"
                  />
                  <Button variant="ghost" onClick={() => removeItem(item.id, item.size, item.color)}>
                    Eliminar
                  </Button>
                </div>
              </div>
            ))}
            {items.length === 0 && (
              <p className="text-mutedForeground">Tu carrito estÃ¡ vacÃ­o.</p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Resumen</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm text-mutedForeground">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-mutedForeground">
              <span>EnvÃ­o estimado</span>
              <span>Calculado en checkout</span>
            </div>
            <div className="flex justify-between text-lg font-semibold text-foreground">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Link href="/checkout">
              <Button className="w-full">Ir a pagar</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

