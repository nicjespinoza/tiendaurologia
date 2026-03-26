"use client";

import { useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export type OrderItem = { name: string; qty: number; price: number };

export type Order = {
  id: string;
  status: "pendiente" | "enviado" | "entregado";
  createdAt: string;
  total: number;
  tracking: string;
  items: OrderItem[];
};

interface Props {
  orders: Order[];
  loading?: boolean;
}

export default function OrderHistoryTable({ orders, loading }: Props) {
  const [selected, setSelected] = useState<Order | null>(null);

  const sorted = useMemo(
    () =>
      [...orders].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
    [orders]
  );

  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-[#042A8F]">
          Mis compras
        </CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b text-left text-gray-500">
              <th className="px-3 py-2">Pedido</th>
              <th className="px-3 py-2">Fecha</th>
              <th className="px-3 py-2">Estado</th>
              <th className="px-3 py-2">Tracking</th>
              <th className="px-3 py-2 text-right">Total</th>
              <th className="px-3 py-2 text-right">Detalle</th>
            </tr>
          </thead>
          <tbody>
            {(loading ? Array.from({ length: 3 }) : sorted).map((order: any, idx) => (
              <tr
                key={loading ? `skeleton-${idx}` : order.id}
                className="border-b last:border-0"
              >
                {loading ? (
                  <>
                    <td className="px-3 py-3">
                      <SkeletonBar />
                    </td>
                    <td className="px-3 py-3">
                      <SkeletonBar />
                    </td>
                    <td className="px-3 py-3">
                      <SkeletonBar />
                    </td>
                    <td className="px-3 py-3">
                      <SkeletonBar />
                    </td>
                    <td className="px-3 py-3">
                      <SkeletonBar />
                    </td>
                    <td className="px-3 py-3 text-right">
                      <SkeletonBar short />
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-3 py-3 font-semibold text-gray-800">{order.id}</td>
                    <td className="px-3 py-3 text-gray-600">{order.createdAt}</td>
                    <td className="px-3 py-3">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-3 py-3 text-gray-700">{order.tracking}</td>
                    <td className="px-3 py-3 text-right font-semibold text-[#2E7618]">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="px-3 py-3 text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-[#042A8F] text-[#042A8F]"
                        onClick={() => setSelected(order)}
                      >
                        Ver
                      </Button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-[#042A8F]">
              Detalle {selected?.id}
            </DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex justify-between">
                <span>Estado</span>
                <StatusBadge status={selected.status} />
              </div>
              <div className="flex justify-between">
                <span>Tracking</span>
                <span className="font-medium">{selected.tracking}</span>
              </div>
              <div className="rounded-lg border border-gray-100 bg-gray-50 p-3">
                <p className="mb-2 text-xs uppercase tracking-wide text-gray-500">
                  Items
                </p>
                <div className="space-y-2">
                  {selected.items.map((item) => (
                    <div key={item.name} className="flex justify-between">
                      <span>
                        {item.qty} x {item.name}
                      </span>
                      <span className="font-medium">
                        ${(item.price * item.qty).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between text-base font-semibold text-[#2E7618]">
                <span>Total</span>
                <span>${selected.total.toFixed(2)}</span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
}

function StatusBadge({ status }: { status: Order["status"] }) {
  const map = {
    pendiente: { label: "Pendiente", className: "bg-[#042A8F]/10 text-[#042A8F]" },
    enviado: { label: "Enviado", className: "bg-amber-100 text-amber-700" },
    entregado: { label: "Entregado", className: "bg-[#2E7618]/10 text-[#2E7618]" },
  };
  const data = map[status];
  return (
    <Badge className={`rounded-full px-3 py-1 text-xs ${data.className}`}>
      {data.label}
    </Badge>
  );
}

function SkeletonBar({ short }: { short?: boolean }) {
  return (
    <span
      className={`block h-3 rounded-full bg-gray-200 ${
        short ? "w-12 ml-auto" : "w-24"
      } animate-pulse`}
    />
  );
}
