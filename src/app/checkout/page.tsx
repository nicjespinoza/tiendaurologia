"use client";

import { useMemo, useState } from "react";
import { MapPin, Mail, CreditCard } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/contexts/cart-context";
import { TilopayButton } from "@/components/tilopay-button";
import { CheckoutStepper } from "@/components/checkout-stepper";
import { OrderSummaryCard } from "@/components/order-summary-card";
import { useAuth } from "@/contexts/auth-context";
import { useSavedCards } from "@/hooks/useSavedCards";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

const REQUIRED_FIELDS = ["email", "firstName", "lastName", "address", "city"] as const;

type CheckoutForm = {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  country: string;
};

export default function CheckoutPage() {
  const { items, total, clear } = useCart();
  const { user } = useAuth();
  const { cards } = useSavedCards();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [form, setForm] = useState<CheckoutForm>({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    country: "NI",
  });
  const [status, setStatus] = useState<string | null>(null);
  const [orderId] = useState(() => `ORD-${crypto.randomUUID?.() ?? Date.now()}`);
  const [saveCard, setSaveCard] = useState(false);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const isFormValid = useMemo(
    () => REQUIRED_FIELDS.every((field) => form[field].trim().length > 0) && form.email.includes("@"),
    [form]
  );

  const nextStep = () =>
    setStep((s) => {
      if (s >= 3) return 3;
      return (s + 1) as 1 | 2 | 3;
    });

  const prevStep = () =>
    setStep((s) => {
      if (s <= 1) return 1;
      return (s - 1) as 1 | 2 | 3;
    });

  const handleSuccess = () => {
    setStatus("Pago exitoso. Gracias por tu compra.");
    clear();
  };

  return (
    <div className="section-max space-y-6 py-12">
      <header>
        <p className="text-sm uppercase tracking-[0.2em] text-mutedForeground">Checkout seguro</p>
        <h1 className="text-3xl font-bold text-foreground">Finaliza tu compra</h1>
      </header>

      <CheckoutStepper current={step} />

      <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
        <Card className="border-border/70">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {step === 1 && <Mail className="h-4 w-4 text-primary" />}
              {step === 2 && <MapPin className="h-4 w-4 text-primary" />}
              {step === 3 && <CreditCard className="h-4 w-4 text-primary" />}
              {step === 1 ? "Datos de contacto" : step === 2 ? "Envio" : "Pago"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {step === 1 && (
              <div className="grid gap-4 md:grid-cols-2">
                {([
                  { name: "email", label: "Correo" },
                  { name: "firstName", label: "Nombre" },
                  { name: "lastName", label: "Apellidos" },
                ] as const).map((field) => (
                  <div key={field.name} className="grid gap-2">
                    <Label>{field.label}</Label>
                    <Input
                      value={form[field.name]}
                      onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                      placeholder={field.label}
                    />
                  </div>
                ))}
              </div>
            )}

            {step === 2 && (
              <div className="grid gap-4 md:grid-cols-2">
                {([
                  { name: "address", label: "Direccion" },
                  { name: "city", label: "Ciudad" },
                  { name: "country", label: "Pais" },
                ] as const).map((field) => (
                  <div key={field.name} className="grid gap-2">
                    <Label>{field.label}</Label>
                    <Input
                      value={form[field.name]}
                      onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                      placeholder={field.label}
                    />
                  </div>
                ))}
              </div>
            )}

            {step === 3 && (
              <div className="space-y-3 text-sm text-mutedForeground">
                <p>Confirma tu pago con Tilopay. Recibiras un comprobante al correo.</p>

                {user && cards.length > 0 && (
                  <div className="space-y-2 rounded-lg border border-gray-200 p-3">
                    <p className="text-sm font-semibold text-foreground">Usar tarjeta guardada</p>
                    <div className="space-y-2">
                      {cards.map((card) => (
                        <label
                          key={card.tokenTilopay ?? card.last4}
                          className={cn(
                            "flex cursor-pointer items-center justify-between rounded-md border px-3 py-2",
                            selectedCard === card.tokenTilopay
                              ? "border-primary bg-primary/5"
                              : "border-gray-200"
                          )}
                        >
                          <div>
                            <p className="text-sm font-semibold text-foreground">
                              {card.brand ?? "Tarjeta"} •••• {card.last4}
                            </p>
                            {card.expiry && <p className="text-xs text-mutedForeground">Exp: {card.expiry}</p>}
                          </div>
                          <input
                            type="radio"
                            name="savedCard"
                            checked={selectedCard === card.tokenTilopay}
                            onChange={() => setSelectedCard(card.tokenTilopay ?? null)}
                          />
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2">
                  <Checkbox
                    id="saveCard"
                    checked={saveCard}
                    disabled={!user || !!selectedCard}
                    onCheckedChange={(v) => setSaveCard(!!v)}
                  />
                  <Label htmlFor="saveCard" className="text-sm text-mutedForeground">
                    Guardar tarjeta para futuras compras (Tilopay)
                  </Label>
                </div>

                <TilopayButton
                  amount={total}
                  orderId={user ? `${orderId}|uid:${user.uid}` : orderId}
                  email={form.email}
                  firstName={form.firstName}
                  lastName={form.lastName}
                  userId={user?.uid}
                  cardToken={selectedCard ?? undefined}
                  saveCard={saveCard}
                  onSuccess={handleSuccess}
                  onError={(message) => setStatus(message)}
                />
                {status && <p className="text-primary">{status}</p>}
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              {step > 1 && (
                <Button variant="ghost" onClick={prevStep}>
                  Atras
                </Button>
              )}
              {step < 3 && (
                <Button
                  onClick={nextStep}
                  disabled={!isFormValid && step === 1}
                  className="bg-primary text-white hover:bg-primary/90"
                >
                  Continuar
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <OrderSummaryCard subtotal={total} total={total} shippingText="Se calcula por destino" />
          <Card className="border-border/70">
            <CardContent className="space-y-2 p-4 text-sm text-mutedForeground">
              {items.map((item) => (
                <div key={`${item.id}-${item.size}-${item.color}`} className="flex justify-between gap-3">
                  <span className="line-clamp-2 text-foreground">
                    {item.name} ({item.size}/{item.color}) x {item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="pt-2 text-xs text-secondary">Pago seguro y envio discreto.</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
