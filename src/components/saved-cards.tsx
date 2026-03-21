"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Plus } from "lucide-react";

export type SavedCard = {
  id: string;
  brand: string;
  last4: string;
  isDefault?: boolean;
  tokenTilopay?: string;
  expiry?: string;
};

interface Props {
  cards: SavedCard[];
  onAdd?: () => void;
  onSetDefault?: (id: string) => void;
  onDelete?: (id: string) => void;
  onUse?: (token: string) => void;
}

export default function SavedCards({ cards, onAdd, onSetDefault, onDelete, onUse }: Props) {
  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl font-semibold text-[#042A8F]">
            Metodos de pago
          </CardTitle>
          <p className="text-sm text-gray-500">
            Guarda tus tarjetas para pagar mas rapido con Tilopay.
          </p>
        </div>
        {onAdd && (
          <Button
            className="bg-[#2E7618] text-white hover:bg-[#255f13]"
            onClick={onAdd}
          >
            <Plus className="mr-2 h-4 w-4" />
            Añadir nueva
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-3">
        {cards.map((card) => (
          <div
            key={card.id}
            className="flex items-center justify-between rounded-lg border border-gray-100 bg-white p-4 shadow-[0_10px_30px_-25px_rgba(0,0,0,0.3)]"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#042A8F]/10 text-[#042A8F]">
                <CreditCard className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">
                  {card.brand} • {card.last4}
                </p>
                <p className="text-xs text-gray-500">Procesado por Tilopay</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {card.isDefault && (
                <Badge className="bg-[#2E7618]/10 text-[#2E7618]">
                  Predeterminado
                </Badge>
              )}
              {!card.isDefault && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[#042A8F]"
                  onClick={() => onSetDefault?.(card.id)}
                >
                  Predeterminar
                </Button>
              )}
              {onUse ? (
                <Button
                  size="sm"
                  className="bg-[#2E7618] text-white"
                  onClick={() => onUse(card.tokenTilopay ?? card.id)}
                >
                  Usar esta tarjeta
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDelete?.(card.id)}
                >
                  Eliminar
                </Button>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
