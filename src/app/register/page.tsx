"use client";

import Link from "next/link";
import { RegisterForm } from "@/components/register-form";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#008f39] py-16">
      <div className="section-max flex items-center justify-center">
        <div className="w-full max-w-3xl rounded-3xl border border-primary/20 bg-white p-10 shadow-xl">
          <div className="space-y-2 text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-secondary">Registro</p>
            <h1 className="text-3xl font-bold text-foreground">Crear cuenta</h1>
            <p className="text-mutedForeground">
              Completa tus datos para gestionar pedidos y acceder a beneficios clinicos.
            </p>
          </div>

          <div className="mt-8 grid gap-6">
            <RegisterForm />
          </div>

          <div className="mt-8 flex items-center justify-between rounded-2xl bg-primary/5 px-4 py-3 text-sm">
            <span className="text-foreground">�Ya tienes cuenta?</span>
            <Link href="/login">
              <button className="rounded-lg bg-secondary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-secondary/90">
                Iniciar sesion
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
