type Props = {
  colors: string[];
  selected: string;
  onChange: (color: string) => void;
};

const colorMap: Record<string, string> = {
  negro: "#000000",
  black: "#000000",
  blanco: "#ffffff",
  white: "#ffffff",
  gris: "#e5e7eb",
  gray: "#e5e7eb",
  "verde oscuro": "#2E7618",
  verde: "#2E7618",
  navy: "#042A8F",
  azul: "#042A8F",
};

export function ColorSwatches({ colors, selected, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {colors.map((color) => {
        const hex = colorMap[color.toLowerCase()] ?? "#000000";
        const isActive = selected === color;
        return (
          <button
            key={color}
            type="button"
            onClick={() => onChange(color)}
            className={`h-11 w-11 rounded-full border-2 transition focus:outline-none ${
              isActive ? "border-primary scale-105" : "border-border"
            }`}
            style={{ backgroundColor: hex }}
            aria-label={`Color ${color}`}
          />
        );
      })}
    </div>
  );
}
