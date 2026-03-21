"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CreditCard, Home, ListChecks, User } from "lucide-react";

type SectionKey = "orders" | "addresses" | "payments" | "profile";

interface Props {
  active: SectionKey;
  onSelect: (key: SectionKey) => void;
  name: string;
  email: string;
}

const items: Array<{ key: SectionKey; label: string; icon: React.ReactNode }> = [
  { key: "orders", label: "Mis compras", icon: <ListChecks className="h-4 w-4" /> },
  { key: "addresses", label: "Direcciones", icon: <Home className="h-4 w-4" /> },
  { key: "payments", label: "Metodos de pago", icon: <CreditCard className="h-4 w-4" /> },
  { key: "profile", label: "Perfil", icon: <User className="h-4 w-4" /> },
];

export default function UserSidebar({ active, onSelect, name, email }: Props) {
  return (
    <Card className="h-fit w-full max-w-xs border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-100 p-5">
        <p className="text-sm text-gray-500">Cuenta</p>
        <p className="text-lg font-semibold text-[#042A8F]">{name}</p>
        <p className="text-xs text-gray-500">{email}</p>
      </div>

      <div className="flex flex-col gap-2 p-4">
        {items.map((item) => (
          <Button
            key={item.key}
            variant="ghost"
            className={cn(
              "justify-start gap-2 rounded-lg border border-transparent text-sm font-medium",
              active === item.key
                ? "border-[#2E7618] bg-[#2E7618]/10 text-[#2E7618]"
                : "text-gray-700 hover:border-gray-200 hover:bg-gray-50"
            )}
            onClick={() => onSelect(item.key)}
          >
            {item.icon}
            {item.label}
          </Button>
        ))}
      </div>
    </Card>
  );
}
