"use client";

import clsx from "clsx";

export default function ProgressBar({
  total,
  current,
  accent,
}: {
  total: number;
  current: number;
  accent: "violet" | "amber" | "emerald";
}) {
  const accentClass = {
    violet: "bg-violet",
    amber: "bg-amber",
    emerald: "bg-emerald",
  }[accent];

  return (
    <div
      className="fixed top-0 left-0 right-0 z-30 flex gap-1.5 px-4 pt-4 font-mono"
      role="progressbar"
      aria-valuenow={current + 1}
      aria-valuemin={1}
      aria-valuemax={total}
    >
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-white/15">
          <div
            className={clsx(
              "h-full rounded-full transition-all duration-500 ease-out",
              accentClass
            )}
            style={{ width: i < current ? "100%" : i === current ? "100%" : "0%" }}
          />
        </div>
      ))}
    </div>
  );
}
