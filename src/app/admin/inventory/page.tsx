"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/auth-context";
import { useInventory } from "@/hooks/useInventory";

export default function InventoryPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { inventory } = useInventory();

  if (!user) {
    router.push("/admin");
    return null;
  }

  return (
    <div className="section-max space-y-8 py-12">
      <header>
        <p className="text-sm uppercase tracking-[0.2em] text-mutedForeground">Inventario</p>
        <h1 className="text-3xl font-bold text-foreground">Stock en tiempo real</h1>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>Variantes</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          {inventory.map((row) => (
            <div
              key={`${row.productId}-${row.variant.size}-${row.variant.color}`}
              className="rounded-lg border border-border/60 bg-white px-3 py-2 text-sm text-mutedForeground"
            >
              <p className="text-foreground font-semibold">{row.name}</p>
              <p>
                {row.variant.size} - {row.variant.color}
              </p>
              <p className={row.variant.quantity < 5 ? "text-primary" : ""}>
                Stock: {row.variant.quantity}
              </p>
            </div>
          ))}
          {inventory.length === 0 && <p>No hay datos de inventario.</p>}
        </CardContent>
      </Card>
    </div>
  );
}


