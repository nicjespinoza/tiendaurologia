const steps = [
  {
    title: "Elige tipo y talla",
    text: "Filtra boxer brief, trunk o brief segun tu necesidad de soporte.",
  },
  {
    title: "Selecciona variante",
    text: "Confirma color y stock en tiempo real antes de agregar al carrito.",
  },
  {
    title: "Paga y recibe",
    text: "Completa checkout y recibe en empaque discreto con seguimiento.",
  },
];

export function HowItWorks() {
  return (
    <section className="section-max py-10">
      <div className="mb-4 flex items-end justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-mutedForeground">
            Como comprar
          </p>
          <h3 className="text-2xl font-bold text-foreground">Flujo rapido y seguro</h3>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {steps.map((step, index) => (
          <article key={step.title} className="hover-lift rounded-xl border border-border bg-white p-5">
            <p className="mb-3 text-sm font-bold text-secondary">Paso {index + 1}</p>
            <h4 className="mb-2 text-lg font-semibold text-foreground">{step.title}</h4>
            <p className="text-sm leading-relaxed text-mutedForeground">{step.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
