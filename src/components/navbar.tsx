"use client";

import Link from "next/link";
import { ShoppingBag, Shield, Store, User } from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "@/contexts/auth-context";
import { useCart } from "@/contexts/cart-context";

export function Navbar() {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur">
      <div className="section-max flex h-16 items-center justify-between">
        <Link href="/" className="text-lg font-bold text-foreground">
          InnerMan
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-mutedForeground md:flex">
          <Link href="/shop" className="hover:text-foreground">
            Catálogo
          </Link>
          <Link href="/checkout" className="hover:text-foreground">
            Checkout
          </Link>
          <Link href="/admin" className="hover:text-foreground flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Admin
          </Link>
          <Link href="/admin/pos" className="hover:text-foreground flex items-center gap-2">
            <Store className="h-4 w-4" />
            POS
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/cart" className="relative">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                  {count}
                </span>
              )}
            </Button>
          </Link>
          {user ? (
            <Button variant="outline" size="sm" onClick={() => logout()}>
              <User className="h-4 w-4" />
              Salir
            </Button>
          ) : (
            <Link href="/admin">
              <Button variant="secondary" size="sm">
                <User className="h-4 w-4" />
                Entrar
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
