"use client";

import { format } from "date-fns";
import { AdminDataTable } from "@/components/admin/data-table";
import { Card } from "@/components/ui/card";

type ClientRow = {
  name: string;
  idNumber: string;
  phone: string;
  email: string;
  address: string;
  createdAt: string;
  totalSpent: number;
};

const mockClients: ClientRow[] = [
  {
    name: "Carlos Duarte",
    idNumber: "0010212850067L",
    phone: "+505 8888 0001",
    email: "carlos@cliente.com",
    address: "Residencial Altos, Managua",
    createdAt: "2026-02-10T12:00:00Z",
    totalSpent: 520.5,
  },
  {
    name: "Luis Vega",
    idNumber: "0010212850068M",
    phone: "+505 8888 0002",
    email: "luis@cliente.com",
    address: "Ciudad Jardin, Managua",
    createdAt: "2026-01-22T12:00:00Z",
    totalSpent: 310.0,
  },
];

export default function AdminClientsPage() {
  return (
    <div className="space-y-6 py-8">
      <AdminDataTable<ClientRow>
        title="Clientes"
        data={mockClients}
        searchKeys={["name", "email", "idNumber", "phone"]}
        exportFile="clientes.csv"
        columns={[
          { key: "name", header: "Nombre" },
          { key: "idNumber", header: "Cédula" },
          { key: "phone", header: "Teléfono" },
          { key: "email", header: "Email" },
          { key: "address", header: "Dirección" },
          {
            key: "createdAt",
            header: "Registro",
            render: (row) => format(new Date(row.createdAt), "dd/MM/yyyy"),
          },
          {
            key: "totalSpent",
            header: "Total gastado",
            render: (row) => `$${row.totalSpent.toFixed(2)}`,
          },
        ]}
      />
      <Card className="p-4 text-sm text-mutedForeground">
        Conecta esta tabla a Firestore con `users` y agrega `totalSpent` desde `orders` cuando tengas el backend listo.
      </Card>
    </div>
  );
}
