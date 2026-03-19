"use client";

import { useRouter } from "next/navigation";
import { AccountingSummary } from "@/components/accounting-summary";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/auth-context";
import { useInventory } from "@/hooks/useInventory";

export default function DashboardPage() {
  const { user, role } = useAuth();
  const router = useRouter();
  const { lowStock } = useInventory();

  const stats = [
    { label: "Ventas hoy", value: 0 },
    { label: "Ventas mes", value: 0 },
    { label: "Balance", value: 0 },
  ];

  const chart = [
    { name: "D-6", total: 320 },
    { name: "D-5", total: 410 },
    { name: "D-4", total: 280 },
    { name: "D-3", total: 560 },
    { name: "D-2", total: 430 },
    { name: "D-1", total: 610 },
    { name: "Hoy", total: 480 },
  ];

  if (!user) {
    router.push("/admin");
    return null;
  }

  return (
    <div className="section-max space-y-8 py-12">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-mutedForeground">Dashboard</p>
          <h1 className="text-3xl font-bold text-foreground">Resumen contable</h1>
          <p className="text-mutedForeground">Rol: {role}</p>
        </div>
      </div>
      <AccountingSummary stats={stats} chart={chart} />
      <Card>
        <CardHeader>
          <CardTitle>Alertas de stock bajo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-mutedForeground">
          {lowStock.map((row) => (
            <div key={`${row.productId}-${row.variant.size}-${row.variant.color}`}>
              {row.name} · {row.variant.size}/{row.variant.color}: {row.variant.quantity} uds
            </div>
          ))}
          {lowStock.length === 0 && <p>Todo en orden.</p>}
        </CardContent>
      </Card>
    </div>
  );
}
