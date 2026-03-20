type SizeOption = {
  size: string;
  stock: number;
};

type Props = {
  options: SizeOption[];
  selected: string;
  onChange: (size: string) => void;
};

export function SizeSelector({ options, selected, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const disabled = opt.stock <= 0;
        const isActive = selected === opt.size;
        return (
          <button
            key={opt.size}
            type="button"
            disabled={disabled}
            onClick={() => onChange(opt.size)}
            className={`min-w-[64px] rounded-lg border px-4 py-2 text-sm font-semibold transition ${
              disabled
                ? "cursor-not-allowed border-border bg-muted text-mutedForeground/70"
                : isActive
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-white text-foreground hover:border-primary"
            }`}
          >
            {opt.size}
          </button>
        );
      })}
    </div>
  );
}
