"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/auth-context";

const dummyOrders = [
  { id: "ORD-123", status: "pagado", total: 89.5, customer: "Carlos" },
  { id: "ORD-124", status: "pendiente", total: 54.0, customer: "Diego" },
];

export default function OrdersPage() {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) {
    router.push("/admin");
    return null;
  }

  return (
    <div className="section-max space-y-8 py-12">
      <header>
        <p className="text-sm uppercase tracking-[0.2em] text-mutedForeground">Pedidos</p>
        <h1 className="text-3xl font-bold text-foreground">Pedidos online</h1>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>Ãšltimos pedidos</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          {dummyOrders.map((order) => (
            <div key={order.id} className="rounded-lg border border-border/60 bg-white p-3">
              <p className="font-semibold text-foreground">{order.id}</p>
              <p className="text-sm text-mutedForeground">Cliente: {order.customer}</p>
              <p className="text-sm text-mutedForeground">Estado: {order.status}</p>
              <p className="text-primary font-semibold">${order.total.toFixed(2)}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

