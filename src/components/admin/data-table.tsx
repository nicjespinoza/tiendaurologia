"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { exportToCsv } from "./export-csv";

type Column<T> = {
  key: keyof T;
  header: string;
  render?: (row: T) => React.ReactNode;
};

type Props<T extends Record<string, any>> = {
  title: string;
  data: T[];
  columns: Column<T>[];
  searchKeys?: (keyof T)[];
  exportFile?: string;
  actionsSlot?: React.ReactNode;
};

export function AdminDataTable<T extends Record<string, any>>({
  title,
  data,
  columns,
  searchKeys = [],
  exportFile,
  actionsSlot,
}: Props<T>) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return data;
    const q = query.toLowerCase();
    return data.filter((row) =>
      searchKeys.some((key) => String(row[key] ?? "").toLowerCase().includes(q))
    );
  }, [data, query, searchKeys]);

  return (
    <Card className="border-gray-200 shadow-sm">
      <CardContent className="space-y-4 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-mutedForeground">{title}</p>
            <p className="text-xs text-mutedForeground/80">Vista administrativa</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Input
              placeholder="Buscar..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-52"
            />
            {exportFile && (
              <Button
                variant="outline"
                onClick={() => exportToCsv(exportFile, filtered)}
                className="text-sm"
              >
                Exportar CSV
              </Button>
            )}
            {actionsSlot}
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-100 bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((col) => (
                  <th key={String(col.key)} className="px-4 py-3 text-left text-xs font-semibold text-gray-500">
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, idx) => (
                <tr key={idx} className="border-b last:border-0 hover:bg-gray-50/60">
                  {columns.map((col) => (
                    <td key={String(col.key)} className="px-4 py-3 text-gray-800">
                      {col.render ? col.render(row) : String(row[col.key] ?? "")}
                    </td>
                  ))}
                </tr>
              ))}
              {!filtered.length && (
                <tr>
                  <td colSpan={columns.length} className="px-4 py-6 text-center text-mutedForeground">
                    Sin registros.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
