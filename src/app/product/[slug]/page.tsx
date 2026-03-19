"use client";

import { notFound, useParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SizeColorSelector } from "@/components/size-color-selector";
import { useProducts } from "@/contexts/products-context";
import { useCart } from "@/contexts/cart-context";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { products } = useProducts();
  const { addItem } = useCart();
  const product = products.find((p) => p.slug === slug);
  const [selectedSize, setSelectedSize] = useState(product?.variants?.[0]?.size ?? "");
  const [selectedColor, setSelectedColor] = useState(product?.variants?.[0]?.color ?? "");

  if (!product) return notFound();

  const selectedVariant =
    product.variants.find((v) => v.size === selectedSize && v.color === selectedColor) ??
    product.variants[0];

  const handleAdd = () => {
    if (!selectedVariant) return;
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      size: selectedVariant.size,
      color: selectedVariant.color,
      quantity: 1,
      image: product.images?.[0] ?? "",
    });
  };

  return (
    <div className="section-max grid gap-10 py-12 lg:grid-cols-2">
      <div className="space-y-4">
        <div className="aspect-[4/5] overflow-hidden rounded-xl border border-border/60">
          <img
            src={product.images?.[0] ?? "/products/shared/placeholder.png"}
            alt={product.name}
            className="h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "/products/shared/placeholder.png";
            }}
          />
        </div>
        <div className="grid grid-cols-3 gap-3">
          {product.images?.slice(1, 4).map((img) => (
            <div key={img} className="aspect-[4/5] overflow-hidden rounded-lg border border-border/50">
              <img
                src={img}
                alt={`${product.name} view`}
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/products/shared/placeholder.png";
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <Card className="space-y-6">
        <CardContent className="space-y-6">
          <div>
            <Badge className="mb-2">{product.type}</Badge>
            <h1 className="text-3xl font-bold text-foreground">{product.name}</h1>
            <p className="text-lg text-primary">${product.price.toFixed(2)}</p>
          </div>
          <p className="text-mutedForeground leading-relaxed">{product.description}</p>
          <div className="flex gap-2 text-sm text-mutedForeground">
            <span>{product.material}</span> <span>•</span>
            <span>Stock: {selectedVariant?.quantity ?? 0}</span>
          </div>
          <SizeColorSelector
            variants={product.variants}
            selectedSize={selectedSize}
            selectedColor={selectedColor}
            onChange={(size, color) => {
              setSelectedSize(size);
              setSelectedColor(color);
            }}
          />
          <Button className="w-full" onClick={handleAdd}>
            Añadir al carrito
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
