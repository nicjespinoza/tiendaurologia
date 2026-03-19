import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: "default" | "outline" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide",
        variant === "default"
          ? "bg-primary text-white shadow shadow-primary/40"
          : "border border-border text-secondary",
        className
      )}
      {...props}
    />
  );
}
