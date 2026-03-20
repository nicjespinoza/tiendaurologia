const steps = ["Contacto", "Envio", "Pago"];

export function CheckoutStepper({ current = 3 }: { current?: 1 | 2 | 3 }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      {steps.map((step, idx) => {
        const active = idx + 1 <= current;
        return (
          <div key={step} className="flex items-center gap-2">
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                active ? "bg-primary text-white" : "bg-muted text-mutedForeground"
              }`}
            >
              {idx + 1}
            </span>
            <span className={`text-sm ${active ? "text-foreground" : "text-mutedForeground"}`}>
              {step}
            </span>
            {idx < steps.length - 1 && <span className="mx-1 h-px w-6 bg-border" />}
          </div>
        );
      })}
    </div>
  );
}
