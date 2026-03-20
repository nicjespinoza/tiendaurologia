const faqs = [
  {
    q: "Que tipo de prenda recomiendan para soporte diario?",
    a: "Boxer brief con ajuste medio y costuras planas para minimizar friccion.",
  },
  {
    q: "Puedo cambiar talla si no me ajusta?",
    a: "Si. Gestionamos cambio rapido segun disponibilidad de inventario.",
  },
  {
    q: "El empaque es discreto?",
    a: "Si. El paquete no muestra contenido sensible ni branding externo.",
  },
];

export function FAQAccordion() {
  return (
    <section className="section-max py-10">
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-mutedForeground">
          Preguntas frecuentes
        </p>
        <h3 className="text-2xl font-bold text-foreground">Respuestas rapidas antes de pagar</h3>
      </div>
      <div className="space-y-2">
        {faqs.map((item) => (
          <details key={item.q} className="rounded-xl border border-border bg-white p-4">
            <summary className="cursor-pointer list-none font-semibold text-foreground">
              {item.q}
            </summary>
            <p className="pt-2 text-sm text-mutedForeground">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
