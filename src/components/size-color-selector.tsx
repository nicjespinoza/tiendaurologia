import { Select } from "./ui/select";
import { Label } from "./ui/label";
import { VariantStock } from "@/contexts/products-context";

type Props = {
  variants: VariantStock[];
  selectedSize: string;
  selectedColor: string;
  onChange: (size: string, color: string) => void;
};

export function SizeColorSelector({
  variants,
  selectedSize,
  selectedColor,
  onChange,
}: Props) {
  const sizes = Array.from(new Set(variants.map((v) => v.size)));
  const colors = Array.from(new Set(variants.map((v) => v.color)));

  return (
    <div className="grid gap-3">
      <div className="grid gap-1.5">
        <Label>Talla</Label>
        <Select
          value={selectedSize}
          onChange={(e) => onChange(e.target.value, selectedColor)}
        >
          <option value="">Selecciona</option>
          {sizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </Select>
      </div>
      <div className="grid gap-1.5">
        <Label>Color</Label>
        <Select
          value={selectedColor}
          onChange={(e) => onChange(selectedSize, e.target.value)}
        >
          <option value="">Selecciona</option>
          {colors.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </Select>
      </div>
    </div>
  );
}
