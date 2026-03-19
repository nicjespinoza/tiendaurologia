import { CartItem } from "@/contexts/cart-context";
import { Button } from "./ui/button";

type Props = {
  items: CartItem[];
  onQtyChange: (item: CartItem, qty: number) => void;
  onRemove: (item: CartItem) => void;
};

export function POSCart({ items, onQtyChange, onRemove }: Props) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="space-y-4 rounded-xl border border-border/60 bg-white p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Ticket</h3>
        <span className="text-sm text-mutedForeground">
          {items.length} Ã­tems Â· ${total.toFixed(2)}
        </span>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={`${item.id}-${item.size}-${item.color}`}
            className="flex items-center justify-between rounded-lg border border-border/50 bg-white px-3 py-2"
          >
            <div>
              <p className="text-foreground font-semibold">{item.name}</p>
              <p className="text-xs text-mutedForeground">
                {item.size} Â· {item.color}
              </p>
              <p className="text-xs text-mutedForeground">
                ${item.price.toFixed(2)} c/u
              </p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                className="h-10 w-16 rounded border border-border bg-white px-2 text-center text-sm"
                value={item.quantity}
                onChange={(e) => onQtyChange(item, Number(e.target.value))}
              />
              <Button variant="ghost" size="sm" onClick={() => onRemove(item)}>
                Eliminar
              </Button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-sm text-mutedForeground">Agrega productos al ticket.</p>
        )}
      </div>
      <div className="flex items-center justify-between text-foreground">
        <span className="text-lg font-semibold">Total</span>
        <span className="text-xl font-bold text-primary">${total.toFixed(2)}</span>
      </div>
    </div>
  );
}

