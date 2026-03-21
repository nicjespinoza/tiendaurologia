"use client";

import { useState } from "react";
import { AdminDataTable } from "@/components/admin/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

type EmployeeRow = {
  id: string;
  name: string;
  role: string;
  salary: number;
  paymentDay: string;
  status: "Activo" | "Inactivo";
};

const seed: EmployeeRow[] = [
  { id: "EMP-1", name: "Ana Morales", role: "Gerente tienda", salary: 900, paymentDay: "25 de cada mes", status: "Activo" },
  { id: "EMP-2", name: "Diego Lopez", role: "Cajero POS", salary: 600, paymentDay: "25 de cada mes", status: "Activo" },
];

export default function EmployeesPage() {
  const [rows, setRows] = useState(seed);
  const [form, setForm] = useState({ name: "", role: "", salary: "" });

  const addEmployee = () => {
    if (!form.name || !form.role) return;
    setRows((prev) => [
      {
        id: `EMP-${Date.now()}`,
        name: form.name,
        role: form.role,
        salary: Number(form.salary || 0),
        paymentDay: "25 de cada mes",
        status: "Activo",
      },
      ...prev,
    ]);
    setForm({ name: "", role: "", salary: "" });
  };

  return (
    <div className="space-y-6 py-8">
      <AdminDataTable<EmployeeRow>
        title="Empleados"
        data={rows}
        searchKeys={["name", "role", "status"]}
        exportFile="empleados.csv"
        actionsSlot={
          <Button size="sm" variant="secondary" onClick={addEmployee}>
            Agregar empleado
          </Button>
        }
        columns={[
          { key: "name", header: "Nombre" },
          { key: "role", header: "Cargo" },
          { key: "salary", header: "Salario", render: (r) => `$${r.salary.toFixed(2)}` },
          { key: "paymentDay", header: "Pago" },
          { key: "status", header: "Estado" },
        ]}
      />

      <Card className="border-gray-200">
        <CardContent className="grid gap-3 md:grid-cols-3 p-4">
          <Input placeholder="Nombre" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input placeholder="Cargo" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
          <Input placeholder="Salario" value={form.salary} onChange={(e) => setForm({ ...form, salary: e.target.value })} />
        </CardContent>
      </Card>
    </div>
  );
}
