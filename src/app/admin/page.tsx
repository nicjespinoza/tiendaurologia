"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/auth-context";

export default function AdminLanding() {
  const { user, signInEmail, signInGoogle, role } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setError(null);
    try {
      await signInEmail(email, password);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("No se pudo iniciar sesion");
      }
    }
  };

  if (user) {
    return (
      <div className="section-max space-y-6 py-12">
        <h1 className="text-3xl font-bold text-foreground">Panel administrativo</h1>
        <p className="text-mutedForeground">Rol detectado: {role}</p>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { href: "/admin/dashboard", label: "Dashboard" },
            { href: "/admin/products", label: "Productos" },
            { href: "/admin/inventory", label: "Inventario" },
            { href: "/admin/orders", label: "Pedidos online" },
            { href: "/admin/accounting", label: "Contabilidad" },
            { href: "/admin/pos", label: "POS Tienda" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group rounded-xl border border-border/70 bg-white px-4 py-3 text-foreground hover:border-primary"
            >
              <span className="flex items-center justify-between">
                {link.label}
                <ArrowRight className="h-4 w-4 text-mutedForeground group-hover:text-primary" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="section-max py-12">
      <div className="mx-auto max-w-md">
        <Card className="border-border/70">
          <CardHeader>
            <CardTitle>Acceso administrador / cajero</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label>Contrasena</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button className="w-full" onClick={handleLogin}>
              Entrar
            </Button>
            <Button variant="secondary" className="w-full" onClick={() => signInGoogle()}>
              Continuar con Google
            </Button>
            {error && <p className="text-sm text-secondary">{error}</p>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
