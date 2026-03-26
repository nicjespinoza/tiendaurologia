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

const schema = z.object({
  email: z.string().email("Correo invalido"),
  password: z.string().min(6, "Minimo 6 caracteres"),
});

type FormData = z.infer<typeof schema>;

export function LoginForm() {
  const { signInEmail, signInGoogle } = useAuth();
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
      await signInEmail(data.email, data.password);
      router.push("/");
    } catch (err) {
      const message = err instanceof Error ? err.message : "No se pudo iniciar sesion";
      setStatus(message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-1.5">
        <Label>Correo</Label>
        <Input type="email" {...register("email")} />
        {errors.email && <p className="text-xs text-secondary">{errors.email.message}</p>}
      </div>
      <div className="grid gap-1.5">
        <Label>Contrasena</Label>
        <Input type="password" {...register("password")} />
        {errors.password && <p className="text-xs text-secondary">{errors.password.message}</p>}
      </div>
      {status && <p className="text-sm text-secondary">{status}</p>}
      <Button type="submit" className="w-full bg-primary text-white" disabled={isSubmitting}>
        {isSubmitting ? "Entrando..." : "Entrar"}
      </Button>
      <Button type="button" variant="outline" className="w-full" onClick={() => signInGoogle()}>
        Continuar con Google
      </Button>
    </form>
  );
}
