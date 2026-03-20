"use client";

import { notFound, useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { ChevronDown, CircleCheck, ShieldCheck, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PdpGallery } from "@/components/pdp-gallery";
import { ColorSwatches } from "@/components/color-swatches";
import { SizeSelector } from "@/components/size-selector";
import { useProducts } from "@/contexts/products-context";
import { useCart } from "@/contexts/cart-context";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { products } = useProducts();
  const { addItem } = useCart();
  const product = useMemo(() => products.find((p) => p.slug === slug), [products, slug]);

  const initialColor = product?.colors?.[0] ?? "";
  const initialSize =
    product?.variants.find((v) => v.quantity > 0)?.size ?? product?.variants[0]?.size ?? "";

  const [selectedColor, setSelectedColor] = useState(initialColor);
  const [selectedSize, setSelectedSize] = useState(initialSize);

  const availableSizes = useMemo(() => {
    if (!product) return [];
    const sizes = Array.from(new Set(product.variants.map((v) => v.size)));
    return sizes.map((size) => {
      const stock = product.variants
        .filter((v) => (selectedColor ? v.color === selectedColor : true) && v.size === size)
        .reduce((sum, v) => sum + v.quantity, 0);
      return { size, stock };
    });
  }, [product, selectedColor]);

  const selectedVariant = product?.variants.find(
    (v) => v.size === selectedSize && (!selectedColor || v.color === selectedColor)
  );

  const handleAdd = () => {
    if (!product || !selectedVariant) return;
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      size: selectedVariant.size,
      color: selectedVariant.color,
      quantity: 1,
      image: product.images?.[0] ?? "/products/shared/placeholder.png",
    });
  };

  const isLowStock = (selectedVariant?.quantity ?? 0) < 6;

  const bulletPoints = [
    "Costuras planas anti-friccion",
    "Textil hipoalergenico y respirable",
    "Cintura anatomica que evita puntos de presion",
  ];

  if (!product) return notFound();

  return (
    <div className="section-max grid gap-10 py-12 lg:grid-cols-[1.05fr,0.95fr]">
      <PdpGallery name={product.name} images={product.images ?? []} />

      <Card className="h-fit border-border/70">
        <CardContent className="space-y-6 p-6">
          <div className="space-y-3">
            <Badge className="bg-secondary/10 text-secondary">{product.type}</Badge>
            <h1 className="text-3xl font-bold text-foreground lg:text-4xl">{product.name}</h1>
            <p className="text-3xl font-semibold text-primary">${product.price.toFixed(2)}</p>
            <p className="leading-relaxed text-mutedForeground">{product.description}</p>
            <ul className="space-y-2 text-sm text-mutedForeground">
              {bulletPoints.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CircleCheck className="h-4 w-4 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold text-foreground">Color</p>
            <ColorSwatches
              colors={product.colors ?? []}
              selected={selectedColor}
              onChange={(color) => setSelectedColor(color)}
            />
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold text-foreground">Talla</p>
            <SizeSelector options={availableSizes} selected={selectedSize} onChange={setSelectedSize} />
          </div>

          <div className="flex items-center gap-3 text-sm text-mutedForeground">
            <span>Disponibilidad</span>
            <span className={isLowStock ? "font-semibold text-secondary" : "font-semibold text-primary"}>
              {selectedVariant?.quantity ?? 0} unidades
            </span>
          </div>

          <Button
            className="w-full bg-primary text-white hover:bg-primary/90"
            size="lg"
            disabled={!selectedVariant || (selectedVariant?.quantity ?? 0) <= 0}
            onClick={handleAdd}
          >
            Anadir al carrito
          </Button>

          <div className="grid gap-2 rounded-xl border border-border bg-muted p-4 text-sm text-mutedForeground">
            <p className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" /> Pago seguro y datos protegidos
            </p>
            <p className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-primary" /> Envio discreto y rapido
            </p>
          </div>

          <div className="space-y-2">
            {[
              { title: "Detalles", content: "Material premium, refuerzos planos y banda elastica suave con memoria." },
              { title: "Medidas", content: "Usa tu talla habitual; si dudas entre dos, elige la mayor para menor presion." },
            ].map((item) => (
              <details key={item.title} className="group rounded-lg border border-border bg-white p-3">
                <summary className="flex cursor-pointer items-center justify-between text-sm font-semibold text-foreground">
                  {item.title}
                  <ChevronDown className="h-4 w-4 text-mutedForeground transition group-open:rotate-180" />
                </summary>
                <p className="pt-2 text-sm text-mutedForeground">{item.content}</p>
              </details>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
