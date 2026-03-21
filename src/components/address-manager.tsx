"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Home, Plus } from "lucide-react";

export type UserAddress = {
  id: string;
  label: string;
  line1: string;
  city: string;
  country: string;
  phone: string;
  isDefault?: boolean;
};

interface Props {
  addresses: UserAddress[];
  onAdd?: () => void;
  onSetDefault?: (id: string) => void;
  onEdit?: (address: UserAddress) => void;
}

export default function AddressManager({ addresses, onAdd, onSetDefault, onEdit }: Props) {
  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl font-semibold text-[#042A8F]">
            Direcciones
          </CardTitle>
          <p className="text-sm text-gray-500">
            Administra tus direcciones de envio y factura.
          </p>
        </div>
        {onAdd && (
          <Button
            className="bg-[#2E7618] text-white hover:bg-[#255f13]"
            onClick={onAdd}
          >
            <Plus className="mr-2 h-4 w-4" />
            Nueva direccion
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {addresses.map((addr, idx) => (
          <div
            key={addr.id}
            className="rounded-lg border border-gray-100 bg-white p-4 shadow-[0_10px_30px_-25px_rgba(0,0,0,0.3)]"
          >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                    <Home className="h-4 w-4 text-[#2E7618]" />
                    {addr.label}
                  {addr.isDefault && (
                    <Badge className="bg-[#2E7618]/10 text-[#2E7618]">
                      Predeterminado
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600">{addr.line1}</p>
                <p className="text-sm text-gray-600">
                  {addr.city}, {addr.country}
                </p>
                <p className="text-sm text-gray-600">{addr.phone}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => onEdit?.(addr)}>
                  Editar
                </Button>
                {!addr.isDefault && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-[#042A8F]"
                    onClick={() => onSetDefault?.(addr.id)}
                  >
                    Predeterminar
                  </Button>
                )}
              </div>
            </div>
            {idx < addresses.length - 1 && <Separator className="mt-4" />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
