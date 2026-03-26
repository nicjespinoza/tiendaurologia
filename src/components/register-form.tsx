"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/auth-context";
import { Card } from "@/components/ui/card";
import { Loader2, ShieldCheck } from "lucide-react";

const schema = z.object({
  firstName: z.string().min(2, "Requerido"),
  lastName: z.string().min(2, "Requerido"),
  idNumber: z
    .string()
    .regex(/^[0-9]{13}[A-Za-z]$/, "Debe ser 13 d�gitos y una letra final; sin guiones"),
  phone: z.string().min(8, "Tel�fono inv�lido"),
  email: z.string().email("Correo inv�lido"),
  address: z.string().min(5, "Direcci�n inv�lida"),
  password: z.string().min(6, "M�nimo 6 caracteres"),
});

type FormData = z.infer<typeof schema>;

export function RegisterForm() {
  const { registerUser } = useAuth();
  const router = useRouter();
  const [status, setStatus] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setStatus(null);
    try {
      const geo = await fetchGeo();
      await registerUser(data, geo);
      router.push("/account");
    } catch (err: any) {
      let message = "No se pudo registrar. Intenta de nuevo en unos segundos.";
      const code = err?.code ?? err?.message;
      if (typeof code === "string" && code.includes("email-already-in-use")) {
        message = "Este correo ya tiene una cuenta. Inicia sesion o usa Recuperar contrasena.";
      }
      setStatus(message);
    }
  };

  return (
    <Card className="border border-white/30 bg-white/90 shadow-2xl backdrop-blur">
      <div className="flex items-center gap-3 rounded-2xl bg-primary/10 px-4 py-3 text-primary">
        <ShieldCheck className="h-5 w-5" />
        <p className="text-sm font-semibold">Tus datos estan protegidos y verificados</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6">
        {[{ name: "firstName", label: "Nombre" }, { name: "lastName", label: "Apellidos" }, { name: "idNumber", label: "C�dula" }, { name: "phone", label: "Tel�fono" }, { name: "email", label: "Correo" }, { name: "address", label: "Direcci�n" }].map((field) => (
          <div key={field.name} className="grid gap-1.5">
            <Label>{field.label}</Label>
            <Input
              {...register(field.name as keyof FormData)}
              className="bg-white/80"
              maxLength={field.name === "idNumber" ? 14 : undefined}
              placeholder={field.name === "idNumber" ? "Ingresa la c�dula sin guiones; 13 d�gitos y letra" : undefined}
              onInput={(e) => {
                if (field.name === "idNumber") {
                  const target = e.target as HTMLInputElement;
                  target.value = target.value.replace(/[^0-9A-Za-z]/g, "").slice(0, 14);
                }
              }}
            />
            {errors[field.name as keyof FormData] && (
              <p className="text-xs text-secondary">
                {errors[field.name as keyof FormData]?.message as string}
              </p>
            )}
          </div>
        ))}
        <div className="grid gap-1.5">
          <Label>Contrase�a</Label>
          <Input type="password" {...register("password")} className="bg-white/80" />
          {errors.password && <p className="text-xs text-secondary">{errors.password.message}</p>}
        </div>
        {status && <p className="text-sm text-secondary">{status}</p>}
        <Button type="submit" className="w-full bg-primary text-white" disabled={isSubmitting}>
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Creando...
            </span>
          ) : (
            "Crear cuenta"
          )}
        </Button>
      </form>
    </Card>
  );
}

async function fetchGeo() {
  try {
    const res = await fetch("https://ipapi.co/json/");
    if (!res.ok) return {};
    const data = await res.json();
    return {
      ip: data.ip,
      country: data.country_name,
      region: data.region,
      city: data.city,
      zip: data.postal,
      lat: typeof data.latitude === "number" ? data.latitude : undefined,
      lng: typeof data.longitude === "number" ? data.longitude : undefined,
      timeZone: data.timezone,
    };
  } catch {
    return {};
  }
}
