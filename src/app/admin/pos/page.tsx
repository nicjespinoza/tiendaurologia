"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, CreditCard, HandCoins, Banknote } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { useProducts } from "@/contexts/products-context";
import { useCart } from "@/contexts/cart-context";
import { POSCart } from "@/components/pos-cart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TilopayButton } from "@/components/tilopay-button";

export default function POSPage() {
  const { user, role } = useAuth();
  const router = useRouter();
  const { products } = useProducts();
  const { items, addItem, updateQty, removeItem, clear, total } = useCart();
  const [query, setQuery] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"Tilopay" | "Efectivo" | "Transferencia">(
    "Efectivo"
  );
  const [orderId] = useState(
    () => `POS-${typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : "local"}`
  );

  useEffect(() => {
    if (!user) {
      router.replace("/admin");
    } else if (!["admin", "cashier"].includes(role || "")) {
      router.replace("/");
    }
  }, [user, role, router]);

  if (!user || !["admin", "cashier"].includes(role || "")) return null;

  const filtered = products.filter(
    (product) =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.slug.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="section-max space-y-8 py-12">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-mutedForeground">POS</p>
          <h1 className="text-3xl font-bold text-foreground">Caja tienda fisica</h1>
        </div>
        <div className="flex items-center gap-2 text-xs text-mutedForeground">
          <HandCoins className="h-4 w-4 text-primary" />
          Total: ${total.toFixed(2)}
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1.4fr,1fr]">
        <Card className="border-border/70">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Buscar producto
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Nombre o codigo"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <div className="grid gap-3 md:grid-cols-2">
              {filtered.map((product) => (
                <div
                  key={product.id}
                  className="rounded-lg border border-border/60 bg-white p-3 text-sm text-mutedForeground"
                >
                  <p className="font-semibold text-foreground">{product.name}</p>
                  <p>${product.price.toFixed(2)}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() =>
                      addItem({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        size: product.variants?.[0]?.size ?? "M",
                        color: product.variants?.[0]?.color ?? "negro",
                        quantity: 1,
                        image: product.images?.[0] ?? "",
                      })
                    }
                  >
                    Agregar
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <POSCart
            items={items}
            onQtyChange={(item, qty) => updateQty(item.id, item.size, item.color, qty)}
            onRemove={(item) => removeItem(item.id, item.size, item.color)}
          />

          <Card className="border-border/70">
            <CardHeader>
              <CardTitle>Metodo de pago</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Tilopay", value: "Tilopay", icon: CreditCard },
                  { label: "Efectivo", value: "Efectivo", icon: HandCoins },
                  { label: "Transferencia", value: "Transferencia", icon: Banknote },
                ].map((method) => (
                  <Button
                    key={method.value}
                    variant={paymentMethod === method.value ? "secondary" : "outline"}
                    onClick={() =>
                      setPaymentMethod(method.value as "Tilopay" | "Efectivo" | "Transferencia")
                    }
                  >
                    <method.icon className="mr-2 h-4 w-4" />
                    {method.label}
                  </Button>
                ))}
              </div>

              {paymentMethod === "Tilopay" ? (
                <TilopayButton
                  amount={total}
                  orderId={orderId}
                  email="cliente@tienda.com"
                  onSuccess={() => clear()}
                  onError={() => {}}
                />
              ) : (
                <Button className="w-full" onClick={() => clear()}>
                  Finalizar venta {paymentMethod}
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
