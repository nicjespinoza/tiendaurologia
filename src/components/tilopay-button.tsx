import { useState } from "react";
import { Button } from "./ui/button";
import { startTilopayPayment } from "@/lib/tilopay";

type Props = {
  amount: number;
  orderId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  onSuccess?: () => void;
  onError?: (message: string) => void;
};

export function TilopayButton({
  amount,
  orderId,
  email,
  firstName,
  lastName,
  onSuccess,
  onError,
}: Props) {
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    setLoading(true);
    const token = process.env.NEXT_PUBLIC_TILOPAY_TOKEN;
    if (!token) {
      setLoading(false);
      onError?.("Falta NEXT_PUBLIC_TILOPAY_TOKEN");
      return;
    }
    try {
      const result = await startTilopayPayment({
        token,
        currency: "USD",
        language: "es",
        amount,
        billToEmail: email,
        billToFirstName: firstName,
        billToLastName: lastName,
        orderNumber: orderId,
        redirect: `${window.location.origin}/checkout/success`,
        capture: 1,
        subscription: 0,
      });

      const message =
        typeof result === "object" && result !== null && "message" in result
          ? String((result as { message?: string }).message ?? "")
          : "";

      if (message === "Success" || result === undefined) {
        onSuccess?.();
      } else {
        onError?.(message || "Error al procesar pago");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        onError?.(err.message);
      } else {
        onError?.("No se pudo iniciar Tilopay");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div id="result" className="hidden" />
      <Button onClick={handlePay} disabled={loading} className="w-full">
        {loading ? "Procesando..." : "Pagar con Tilopay"}
      </Button>
    </>
  );
}
