import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { Product } from "@/contexts/products-context";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const firstVariant = product.variants?.[0];

  const handleQuickAdd = () => {
    if (!firstVariant) return;
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      size: firstVariant.size,
      color: firstVariant.color,
      quantity: 1,
      image: product.images?.[0] ?? "",
    });
  };

  return (
    <Card className="group relative overflow-hidden">
      {product.featured && (
        <Badge className="absolute right-4 top-4 bg-secondary text-black shadow-lg">Recomendado</Badge>
      )}
      <Link href={`/product/${product.slug}`}>
        <div className="aspect-[4/5] overflow-hidden rounded-lg border border-border/50">
          <img
            src={product.images?.[0] ?? "/products/shared/placeholder.png"}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = "/products/shared/placeholder.png";
            }}
          />
        </div>
      </Link>
      <CardHeader className="pt-4">
        <CardTitle className="flex items-center justify-between text-lg text-foreground">
          <span>{product.name}</span>
          <span className="text-primary">${product.price.toFixed(2)}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="line-clamp-2 text-sm text-mutedForeground">{product.description}</p>
        <div className="flex gap-2 text-xs text-mutedForeground">
          <span>{product.material}</span>
          <span>&bull;</span>
          <span>{product.type}</span>
        </div>
        <div className="flex gap-2">
          <Button className="w-full" onClick={handleQuickAdd}>
            <ShoppingCart className="h-4 w-4" />
            Agregar
          </Button>
          <Link href={`/product/${product.slug}`} className="w-full">
            <Button variant="outline" className="w-full">
              Ver
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
