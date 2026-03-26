import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { useMemo } from "react";
import { useCart } from "@/contexts/cart-context";
import { Product } from "@/contexts/products-context";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const firstVariant = product.variants?.[0];
  const images = useMemo(
    () =>
      product.images?.length
        ? product.images
        : ["/products/shared/placeholder.png", "/products/shared/placeholder.png"],
    [product.images]
  );
  const totalStock = product.variants.reduce((sum, variant) => sum + variant.quantity, 0);

  const handleQuickAdd = () => {
    if (!firstVariant) return;
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      size: firstVariant.size,
      color: firstVariant.color,
      quantity: 1,
      image: images[0],
    });
  };

  const badges = [
    product.featured ? { label: "Mas vendido", color: "bg-secondary text-white" } : null,
    totalStock < 6 ? { label: "Stock bajo", color: "bg-primary text-white" } : null,
    !product.featured && totalStock >= 6 ? { label: "Nuevo", color: "bg-black text-white" } : null,
  ].filter(Boolean) as { label: string; color: string }[];

  return (
    <Card className="hidden group relative overflow-hidden border-border/70 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="absolute left-4 top-4 z-10 flex flex-wrap gap-2">
        {badges.map((b) => (
          <Badge key={b.label} className={`${b.color} shadow-md`}>
            {b.label}
          </Badge>
        ))}
      </div>

      <Link href={`/product/${product.slug}`}>
        <div className="relative aspect-[4/5] overflow-hidden rounded-b-none rounded-t-xl border-b border-border bg-muted">
          <Image
            src={images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition duration-500 group-hover:opacity-0"
          />
          <Image
            src={images[1] ?? images[0]}
            alt={`${product.name} flat lay`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover opacity-0 transition duration-500 group-hover:opacity-100"
          />
        </div>
      </Link>

      <CardHeader className="pb-1 pt-4">
        <CardTitle className="flex items-start justify-between gap-3 text-lg text-foreground">
          <span className="line-clamp-2">{product.name}</span>
          <span className="text-xl font-bold text-primary">${product.price.toFixed(2)}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 pb-5">
        <p className="line-clamp-2 text-sm text-mutedForeground">{product.description}</p>
        <div className="flex items-center gap-2 text-xs text-mutedForeground">
          <span>{product.material}</span>
          <span>&bull;</span>
          <span className={totalStock < 6 ? "text-secondary" : "text-primary"}>Stock {totalStock}</span>
        </div>
        <div className="flex gap-2">
          <Button className="w-full" onClick={handleQuickAdd}>
            <ShoppingCart className="h-4 w-4" />
            Agregar
          </Button>
          <Link href={`/product/${product.slug}`} className="w-full">
            <Button variant="outline" className="w-full">
              Ver detalle
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
