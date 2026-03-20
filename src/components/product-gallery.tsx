"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

type Props = {
  name: string;
  images: string[];
};

export function ProductGallery({ name, images }: Props) {
  const fallback = "/products/shared/placeholder.png";
  const list = useMemo(() => (images.length ? images : [fallback]), [images]);
  const [current, setCurrent] = useState(list[0]);

  return (
    <div className="space-y-4">
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-border/60 bg-muted">
        <Image
          src={current}
          alt={name}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {list.slice(0, 8).map((img) => (
          <button
            key={img}
            type="button"
            onClick={() => setCurrent(img)}
            className={`relative aspect-[4/5] overflow-hidden rounded-lg border ${
              current === img ? "border-primary" : "border-border/60"
            }`}
          >
            <Image src={img} alt={`${name} vista`} fill sizes="160px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
