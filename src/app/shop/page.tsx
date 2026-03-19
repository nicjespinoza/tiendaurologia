"use client";

import { ProductCard } from "@/components/product-card";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { useProducts } from "@/contexts/products-context";

const TYPES = ["boxer brief", "trunk", "brief", "calzoncillo terapeutico"];
const SIZES = ["S", "M", "L", "XL", "2XL", "3XL"];
const COLORS = ["negro", "blanco", "gris", "verde medico"];
const MATERIALS = ["algodon hipoalergenico", "modal", "microfibra"];

export default function ShopPage() {
  const { products, filter, setFilter } = useProducts();

  return (
    <div className="section-max space-y-8 py-12">
      <header className="flex flex-col gap-2">
        <p className="text-sm uppercase tracking-[0.2em] text-mutedForeground">Catalogo clinico</p>
        <h1 className="text-3xl font-bold text-foreground">Ropa interior para pacientes de urologia</h1>
        <p className="text-mutedForeground">
          Filtra por tipo, talla, color y material. Inventario pensado para comodidad terapeutica.
        </p>
      </header>
      <div className="grid gap-4 rounded-xl border border-border/60 bg-white p-4 md:grid-cols-4">
        <div className="grid gap-2">
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
        <div className="grid gap-2">
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
        <div className="grid gap-2">
          <Label>Color</Label>
          <Select
            value={filter.color ?? ""}
            onChange={(e) => setFilter({ ...filter, color: e.target.value || undefined })}
          >
            <option value="">Todos</option>
            {COLORS.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </Select>
        </div>
        <div className="grid gap-2">
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
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {products.length === 0 && (
          <p className="text-mutedForeground">
            No hay productos que coincidan con los filtros actuales.
          </p>
        )}
      </div>
    </div>
  );
}

