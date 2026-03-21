"use client";

import { useState } from "react";
import { AdminDataTable } from "@/components/admin/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

type ReturnRow = {
  id: string;
  orderId: string;
  customer: string;
  reason: string;
  status: "Solicitada" | "Aprobada" | "Reembolsada";
  requestedAt: string;
};

const initialData: ReturnRow[] = [
  {
    id: "RET-1001",
    orderId: "ORD-100",
    customer: "Carlos Duarte",
    reason: "Talla incorrecta",
    status: "Solicitada",
    requestedAt: "2026-03-01",
  },
  {
    id: "RET-1002",
    orderId: "ORD-102",
    customer: "Luis Vega",
    reason: "Defecto de fabrica",
    status: "Aprobada",
    requestedAt: "2026-02-28",
  },
];

export default function ReturnsPage() {
  const [rows, setRows] = useState<ReturnRow[]>(initialData);
  const [form, setForm] = useState({ orderId: "", customer: "", reason: "" });

  const addReturn = () => {
    if (!form.orderId || !form.customer) return;
    const newRow: ReturnRow = {
      id: `RET-${Date.now()}`,
      orderId: form.orderId,
      customer: form.customer,
      reason: form.reason || "No indicado",
      status: "Solicitada",
      requestedAt: new Date().toISOString().slice(0, 10),
    };
    setRows([newRow, ...rows]);
    setForm({ orderId: "", customer: "", reason: "" });
  };

  const updateStatus = (id: string, status: ReturnRow["status"]) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  return (
    <div className="space-y-6 py-8">
      <AdminDataTable<ReturnRow>
        title="Devoluciones"
        data={rows}
        searchKeys={["orderId", "customer", "status"]}
        exportFile="devoluciones.csv"
        actionsSlot={
          <Button variant="secondary" size="sm" onClick={addReturn}>
            Crear devolución
          </Button>
        }
        columns={[
          { key: "id", header: "ID" },
          { key: "orderId", header: "Pedido" },
          { key: "customer", header: "Cliente" },
          { key: "reason", header: "Motivo" },
          { key: "status", header: "Estado" },
          { key: "requestedAt", header: "Fecha" },
          {
            key: "status",
            header: "Acciones",
            render: (row) => (
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => updateStatus(row.id, "Aprobada")}>
                  Aprobar
                </Button>
                <Button size="sm" variant="outline" onClick={() => updateStatus(row.id, "Reembolsada")}>
                  Reembolsar
                </Button>
              </div>
            ),
          },
        ]}
      />

      <Card className="border-gray-200">
        <CardContent className="space-y-3 p-4">
          <p className="text-sm font-semibold text-foreground">Crear devolución rápida</p>
          <div className="grid gap-3 md:grid-cols-3">
            <Input placeholder="Pedido ID" value={form.orderId} onChange={(e) => setForm({ ...form, orderId: e.target.value })} />
            <Input placeholder="Cliente" value={form.customer} onChange={(e) => setForm({ ...form, customer: e.target.value })} />
            <Input placeholder="Motivo" value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
