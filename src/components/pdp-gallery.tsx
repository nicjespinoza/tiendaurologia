"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
  name: string;
  images: string[];
};

export function PdpGallery({ name, images }: Props) {
  const list = images.length ? images : ["/products/shared/placeholder.png"];
  const [current, setCurrent] = useState(list[0]);
  const [lightbox, setLightbox] = useState(false);

  return (
    <div className="space-y-4">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border/70 bg-muted">
        <Image
          src={current}
          alt={name}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="cursor-zoom-in object-cover"
          onClick={() => setLightbox(true)}
        />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {list.slice(0, 8).map((img) => (
          <button
            key={img}
            type="button"
            onClick={() => setCurrent(img)}
            className={`relative aspect-[4/5] overflow-hidden rounded-lg border ${
              current === img ? "border-primary" : "border-border/70"
            }`}
          >
            <Image src={img} alt={`${name} miniatura`} fill sizes="120px" className="object-cover" />
          </button>
        ))}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setLightbox(false)}
        >
          <div className="relative h-[80vh] w-[90vw] max-w-4xl">
            <Image src={current} alt={`${name} ampliada`} fill sizes="90vw" className="object-contain" />
          </div>
        </div>
      )}
    </div>
  );
}
