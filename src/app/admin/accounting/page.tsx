"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { useState } from "react";

type Movement = {
  id: string;
  type: string;
  amount: number;
  description: string;
  method: string;
};

type FormState = {
  type: string;
  amount: number;
  description: string;
  method: string;
};

const seed: Movement[] = [
  { id: "1", type: "venta online", amount: 89.5, description: "ORD-123", method: "Tilopay" },
  { id: "2", type: "venta POS", amount: 54.0, description: "Ticket-22", method: "Efectivo" },
];

export default function AccountingPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [movements, setMovements] = useState<Movement[]>(seed);
  const [form, setForm] = useState<FormState>({
    type: "venta online",
    amount: 0,
    description: "",
    method: "Tilopay",
  });

  if (!user) {
    router.push("/admin");
    return null;
  }

  const addMovement = () => {
    const newId =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `mv-${Date.now()}`;
    setMovements((prev) => [...prev, { id: newId, ...form, amount: Number(form.amount) }]);
    setForm({ ...form, amount: 0, description: "" });
  };

  return (
    <div className="section-max space-y-8 py-12">
      <header>
        <p className="text-sm uppercase tracking-[0.2em] text-mutedForeground">Contabilidad</p>
        <h1 className="text-3xl font-bold text-foreground">Movimientos</h1>
      </header>
      <div className="grid gap-6 lg:grid-cols-[1.5fr,1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Historico</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-mutedForeground">
            {movements.map((m) => (
              <div
                key={m.id}
                className="flex items-center justify-between rounded-lg border border-border/60 bg-white px-3 py-2"
              >
                <div>
                  <p className="text-foreground font-semibold">{m.type}</p>
                  <p>{m.description}</p>
                  <p>Metodo: {m.method}</p>
                </div>
                <p className="text-primary font-semibold">${m.amount.toFixed(2)}</p>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Agregar movimiento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {(["type", "description", "method"] as const).map((field) => (
              <div key={field} className="grid gap-1.5">
                <Label className="capitalize">{field}</Label>
                <Input
                  value={form[field]}
                  onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                />
              </div>
            ))}
            <div className="grid gap-1.5">
              <Label>Monto</Label>
              <Input
                type="number"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })}
              />
            </div>
            <Button className="w-full" onClick={addMovement}>
              Guardar
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


