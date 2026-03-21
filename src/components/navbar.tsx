"use client";

import Link from "next/link";
import { ShoppingBag, Shield, Store, User } from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "@/contexts/auth-context";
import { useCart } from "@/contexts/cart-context";

export function Navbar() {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur">
      <div className="section-max flex h-16 items-center justify-between gap-4 text-foreground">
        <Link href="/" className="text-lg font-bold tracking-tight">
          <span className="text-primary">Inner</span>Man
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-mutedForeground md:flex">
          <Link href="/shop" className="font-medium hover:text-foreground">Catalogo</Link>
          <Link href="/cart" className="font-medium hover:text-foreground">Carrito</Link>
          <Link href="/checkout" className="font-medium hover:text-foreground">Checkout</Link>
          <Link href="/account" className="font-medium hover:text-foreground">Cuenta</Link>
          <Link href="/admin" className="flex items-center gap-2 hover:text-foreground">
            <Shield className="h-4 w-4 text-secondary" />
            Admin
          </Link>
          <Link href="/admin/pos" className="flex items-center gap-2 hover:text-foreground">
            <Store className="h-4 w-4 text-secondary" />
            POS
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/cart" className="relative">
            <Button variant="ghost" size="icon" className="relative text-foreground">
              <ShoppingBag className="h-5 w-5" />
              <span
                suppressHydrationWarning
                className={`absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white ${
                  count > 0 ? "animate-pulse-slow" : "opacity-0"
                }`}
              >
                {count}
              </span>
            </Button>
          </Link>
          {user ? (
            <Button variant="outline" size="sm" className="border-border text-foreground" onClick={() => logout()}>
              <User className="h-4 w-4" />
              Salir
            </Button>
          ) : (
            <Link href="/login">
              <Button variant="secondary" size="sm" className="bg-secondary text-white hover:bg-secondary/90">
                <User className="h-4 w-4" />
                Ingresar
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
