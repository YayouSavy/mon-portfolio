"use client";
// → Type : Client Component
// → Raison : repli propre (onError) tant que le fichier n'est pas déposé dans public/
import { useState } from "react";
import Image from "next/image";
import { ImageOff } from "lucide-react";

/** Vraie image de projet (pas une reconstitution), repli discret si le fichier manque encore. */
export default function PhotoVisual({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`grid aspect-[4/3] place-items-center gap-2 rounded-folder border-2 border-dashed border-noir/20 text-ink/50 ${className}`}
      >
        <ImageOff aria-hidden size={22} strokeWidth={1.75} />
        <p className="text-xs">Image à venir</p>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-folder border-2 border-noir shadow-paper ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={640}
        height={480}
        className="h-auto w-full object-cover"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
