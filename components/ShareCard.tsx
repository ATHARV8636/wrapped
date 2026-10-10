"use client";

import { forwardRef } from "react";
import clsx from "clsx";
import { WrappedPayload } from "@/lib/types";

const accentSolid = {
  violet: "bg-violet",
  amber: "bg-amber",
  emerald: "bg-emerald",
};

const ShareCard = forwardRef<HTMLDivElement, { payload: WrappedPayload }>(
  function ShareCard({ payload }, ref) {
    const accent = payload.screens[0]?.accent ?? "violet";

    return (
      <div
        ref={ref}
        className="flex h-[600px] w-[400px] flex-col justify-between bg-surface p-8"
        style={{ fontFamily: "var(--font-body)" }}
      >
        <div>
          <p className="font-mono text-xs tracking-[0.25em] text-dim">WRAPPED · {payload.source.toUpperCase()}</p>
          <h2 className="font-display mt-4 text-3xl font-bold leading-tight text-ink">
            {payload.displayName}&apos;s {new Date().getFullYear()} {payload.source} Wrapped
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {payload.shareStats.map((s) => (
            <div key={s.label} className="flex items-baseline justify-between border-b border-line pb-2">
              <span className="text-sm text-dim">{s.label}</span>
              <span className="font-mono text-lg font-bold text-ink">{s.value}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <span className="font-display text-sm font-semibold text-ink">WRAPPED</span>
          <div className={clsx("h-2 w-2 rounded-full", accentSolid[accent])} />
        </div>
      </div>
    );
  }
);

export default ShareCard;
