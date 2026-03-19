"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/contexts/cart-context";
import { TilopayButton } from "@/components/tilopay-button";

export default function CheckoutPage() {
  const { items, total, clear } = useCart();
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    country: "NI",
  });
  const [status, setStatus] = useState<string | null>(null);
  const [orderId] = useState(
    () => `ORD-${typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : "local"}`
  );

  const handleSuccess = () => {
    setStatus("Pago exitoso. Gracias por tu compra.");
    clear();
  };

  return (
    <div className="section-max grid gap-8 py-12 lg:grid-cols-[2fr,1fr]">
      <Card>
        <CardHeader>
          <CardTitle>Datos de envío</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          {(
            [
              { name: "email", label: "Correo" },
              { name: "firstName", label: "Nombre" },
              { name: "lastName", label: "Apellidos" },
              { name: "address", label: "Dirección" },
              { name: "city", label: "Ciudad" },
            ] as const
          ).map((field) => (
            <div key={field.name} className="grid gap-2">
              <Label>{field.label}</Label>
              <Input
                value={form[field.name]}
                onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                placeholder={field.label}
              />
            </div>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Resumen</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="space-y-2 text-sm text-mutedForeground">
            {items.map((item) => (
              <li key={`${item.id}-${item.size}-${item.color}`} className="flex justify-between">
                <span>
                  {item.name} ({item.size}/{item.color}) x {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between text-lg font-semibold text-foreground">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <TilopayButton
            amount={total}
            orderId={orderId}
            email={form.email}
            firstName={form.firstName}
            lastName={form.lastName}
            onSuccess={handleSuccess}
            onError={(m) => setStatus(m)}
          />
          {status && <p className="text-sm text-primary">{status}</p>}
          <Button variant="ghost" onClick={() => clear()} className="w-full">
            Vaciar carrito
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
