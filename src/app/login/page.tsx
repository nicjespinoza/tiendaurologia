"use client";

import Link from "next/link";
import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#008f39] py-16">
      <div className="section-max flex items-center justify-center">
        <div className="w-full max-w-xl rounded-3xl border border-primary/20 bg-white p-8 shadow-xl">
          <div className="space-y-2 text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-secondary">Acceso</p>
            <h1 className="text-3xl font-bold text-foreground">Iniciar sesion</h1>
            <p className="text-mutedForeground">
              Ingresa con tu correo y contrasena o continua con Google.
            </p>
          </div>

          <div className="mt-6">
            <LoginForm />
          </div>

          <div className="mt-6 flex items-center justify-between rounded-2xl bg-primary/5 px-4 py-3 text-sm">
            <span className="text-foreground">¿No tienes cuenta?</span>
            <Link href="/register">
              <button className="rounded-lg bg-secondary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-secondary/90">
                Registrarse
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
