"use client";

import Image from "next/image";
import type { Client } from "@/content/schema";
import { cn } from "@/lib/utils";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";

function ClientMark({ client }: { client: Client }) {
  return client.logo ? (
    <Image
      src={client.logo.src}
      alt={client.logo.alt}
      width={client.logo.width}
      height={40}
      className="h-8 w-auto shrink-0 object-contain grayscale transition-[filter] duration-300 hover:grayscale-0"
    />
  ) : (
    <span className="shrink-0 whitespace-nowrap font-mono text-sm uppercase tracking-wide text-grey-500 transition-colors duration-300 hover:text-ink-800">
      {client.name}
    </span>
  );
}

/** FR-TRUST-01..05 — PRD §8.3. Hidden entirely if the collection is empty. */
export function LogoWall({ clients }: { clients: Client[] }) {
  const reducedMotion = useReducedMotionSafe();
  if (clients.length === 0) return null;

  const useMarquee = clients.length >= 8 && !reducedMotion;

  if (!useMarquee) {
    return (
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
        {clients.map((c, i) => (
          <ClientMark key={`${c.name}-${i}`} client={c} />
        ))}
      </div>
    );
  }

  const loop = [...clients, ...clients];

  return (
    <div className="group overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className="flex w-max animate-[marquee_36s_linear_infinite] items-center gap-12 group-hover:[animation-play-state:paused]">
        {loop.map((c, i) => (
          <ClientMark key={`${c.name}-${i}`} client={c} />
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
