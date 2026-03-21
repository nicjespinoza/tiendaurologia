"use client";

import { useState } from "react";
import { AdminDataTable } from "@/components/admin/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

type SupplierRow = {
  id: string;
  name: string;
  contact: string;
  email: string;
  purchases: number;
  lastPurchase: string;
};

const seed: SupplierRow[] = [
  { id: "SUP-1", name: "Textiles Norte", contact: "+505 8888 2211", email: "ventas@textilesnorte.com", purchases: 3200, lastPurchase: "2026-02-20" },
  { id: "SUP-2", name: "Premium Fabrics", contact: "+505 8888 3322", email: "hola@pfabrics.com", purchases: 2100, lastPurchase: "2026-02-28" },
];

export default function SuppliersPage() {
  const [rows, setRows] = useState(seed);
  const [form, setForm] = useState({ name: "", contact: "", email: "" });

  const addSupplier = () => {
    if (!form.name) return;
    setRows((prev) => [
      {
        id: `SUP-${Date.now()}`,
        name: form.name,
        contact: form.contact,
        email: form.email,
        purchases: 0,
        lastPurchase: new Date().toISOString().slice(0, 10),
      },
      ...prev,
    ]);
    setForm({ name: "", contact: "", email: "" });
  };

  return (
    <div className="space-y-6 py-8">
      <AdminDataTable<SupplierRow>
        title="Proveedores"
        data={rows}
        searchKeys={["name", "email", "contact"]}
        exportFile="proveedores.csv"
        actionsSlot={
          <Button size="sm" variant="secondary" onClick={addSupplier}>
            Agregar proveedor
          </Button>
        }
        columns={[
          { key: "name", header: "Nombre" },
          { key: "contact", header: "Contacto" },
          { key: "email", header: "Email" },
          { key: "purchases", header: "Compras", render: (r) => `$${r.purchases.toFixed(2)}` },
          { key: "lastPurchase", header: "Última compra" },
        ]}
      />

      <Card className="border-gray-200">
        <CardContent className="grid gap-3 md:grid-cols-3 p-4">
          <Input placeholder="Nombre proveedor" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input placeholder="Contacto" value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} />
          <Input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </CardContent>
      </Card>
    </div>
  );
}
