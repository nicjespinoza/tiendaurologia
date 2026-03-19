export function Footer() {
  return (
    <footer className="border-t border-border bg-white py-8">
      <div className="section-max flex flex-col gap-2 text-sm text-mutedForeground md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold text-foreground">InnerMan UroCare</p>
          <p>Ropa interior masculina orientada a bienestar urologico y confort diario.</p>
        </div>
        <div className="flex gap-4">
          <a href="mailto:soporte@innerman.com" className="hover:text-foreground">
            soporte@innerman.com
          </a>
          <a href="/terminos" className="hover:text-foreground">
            Terminos
          </a>
          <a href="/privacidad" className="hover:text-foreground">
            Privacidad
          </a>
        </div>
      </div>
    </footer>
  );
}
