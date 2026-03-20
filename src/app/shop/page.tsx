"use client";

import { useMemo, useRef, useState } from "react";
import { SlidersHorizontal, Filter, X } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useProducts } from "@/contexts/products-context";

const TYPES = ["boxer brief", "trunk", "brief", "calzoncillo terapeutico"];
const SIZES = ["S", "M", "L", "XL", "2XL", "3XL"];
const COLORS = ["negro", "blanco", "gris", "navy", "verde oscuro"];
const MATERIALS = ["algodon hipoalergenico", "modal", "microfibra"];

type SortBy = "featured" | "priceAsc" | "priceDesc";

type DrawerState = "closed" | "open";

export default function ShopPage() {
  const { products, filter, setFilter, loading } = useProducts();
  const [sortBy, setSortBy] = useState<SortBy>("featured");
  const [drawer, setDrawer] = useState<DrawerState>("closed");

  const sortedProducts = useMemo(() => {
    const list = [...products];
    if (sortBy === "priceAsc") return list.sort((a, b) => a.price - b.price);
    if (sortBy === "priceDesc") return list.sort((a, b) => b.price - a.price);
    return list.sort((a, b) => Number(b.featured) - Number(a.featured));
  }, [products, sortBy]);

  const activeFilters = [filter.type, filter.size, filter.color, filter.material].filter(Boolean);

  const Filters = (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <SlidersHorizontal className="h-4 w-4 text-primary" />
          Filtros
        </p>
        <Button variant="ghost" size="sm" onClick={() => setFilter({})} className="text-mutedForeground">
          Limpiar
        </Button>
      </div>

      <div className="space-y-3">
        <Label>Tipo</Label>
        <Select
          value={filter.type ?? ""}
          onChange={(e) => setFilter({ ...filter, type: e.target.value || undefined })}
        >
          <option value="">Todos</option>
          {TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </Select>
      </div>

      <div className="space-y-3">
        <Label>Talla</Label>
        <Select
          value={filter.size ?? ""}
          onChange={(e) => setFilter({ ...filter, size: e.target.value || undefined })}
        >
          <option value="">Todas</option>
          {SIZES.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </Select>
      </div>

      <div className="space-y-3">
        <Label>Color</Label>
        <div className="flex flex-wrap gap-2">
          {COLORS.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => setFilter({ ...filter, color })}
              className={`h-9 w-9 rounded-full border-2 transition ${
                filter.color === color ? "border-secondary scale-105" : "border-border"
              }`}
              style={{ backgroundColor: color === "verde oscuro" ? "#2E7618" : color === "navy" ? "#042A8F" : color }}
              aria-label={`Color ${color}`}
            />
          ))}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setFilter({ ...filter, color: undefined })}
            className="text-xs text-mutedForeground"
          >
            Quitar color
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        <Label>Material</Label>
        <Select
          value={filter.material ?? ""}
          onChange={(e) => setFilter({ ...filter, material: e.target.value || undefined })}
        >
          <option value="">Todos</option>
          {MATERIALS.map((material) => (
            <option key={material} value={material}>
              {material}
            </option>
          ))}
        </Select>
      </div>
    </div>
  );

  return (
    <div className="section-max space-y-8 py-12">
      <header className="space-y-3">
        <p className="text-sm uppercase tracking-[0.2em] text-mutedForeground">Catalogo clinico</p>
        <h1 className="text-3xl font-bold text-foreground">Tienda premium de soporte urologico</h1>
        <p className="max-w-3xl text-mutedForeground">
          Filtra por tipo, talla y color. Todas las prendas mantienen la paleta negro/blanco con acentos en verde #2E7618 y navy #042A8F para un look discreto y clinico.
        </p>
      </header>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm text-mutedForeground">
          <Button variant="outline" size="sm" className="md:hidden" onClick={() => setDrawer("open")}>
            <Filter className="h-4 w-4" />
            Filtros
          </Button>
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {activeFilters.map((value) => (
                <span
                  key={value}
                  className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
                >
                  {value}
                  <X className="h-3 w-3" />
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 text-sm">
          <span className="text-mutedForeground">Ordenar</span>
          <Select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortBy)} className="w-40">
            <option value="featured">Relevancia</option>
            <option value="priceAsc">Precio: menor a mayor</option>
            <option value="priceDesc">Precio: mayor a menor</option>
          </Select>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[280px,1fr]">
        <aside className="hidden rounded-2xl border border-border/70 bg-white p-5 shadow-sm lg:block">
          {Filters}
        </aside>

        {drawer === "open" && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden" onClick={() => setDrawer("closed")}>
            <div
              className="absolute left-0 top-0 h-full w-[78%] max-w-xs overflow-y-auto border-r border-border bg-white p-5 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-4 flex items-center justify-between">
                <p className="text-base font-semibold text-foreground">Filtrar</p>
                <Button variant="ghost" size="icon" onClick={() => setDrawer("closed")}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              {Filters}
            </div>
          </div>
        )}

        <div className="space-y-6">
          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 9 }).map((_, idx) => (
                <Card key={idx} className="space-y-3 rounded-xl border border-border bg-white p-4">
                  <div className="aspect-[4/5] animate-pulse rounded-lg bg-gray-100" />
                  <div className="h-4 w-3/4 animate-pulse rounded bg-gray-100" />
                  <div className="h-4 w-1/2 animate-pulse rounded bg-gray-100" />
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
              {sortedProducts.length === 0 && (
                <div className="col-span-full rounded-2xl border border-dashed border-border bg-white p-8 text-center">
                  <p className="text-lg font-semibold text-foreground">No encontramos productos</p>
                  <p className="mt-1 text-sm text-mutedForeground">Ajusta filtros o limpia la busqueda para ver mas opciones.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
