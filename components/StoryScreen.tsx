"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import { StoryScreenData } from "@/lib/types";
import AnimatedNumber from "./AnimatedNumber";

const accentText = {
  violet: "text-violet",
  amber: "text-amber",
  emerald: "text-emerald",
};

const accentBg = {
  violet: "from-violet-soft via-canvas to-canvas",
  amber: "from-amber-soft via-canvas to-canvas",
  emerald: "from-emerald-soft via-canvas to-canvas",
};

const accentSolid = {
  violet: "bg-violet",
  amber: "bg-amber",
  emerald: "bg-emerald",
};

export default function StoryScreen({
  data,
  active,
  onShare,
}: {
  data: StoryScreenData;
  active: boolean;
  onShare?: () => void;
}) {
  const maxChart = data.chart ? Math.max(...data.chart.map((c) => c.value), 1) : 1;

  return (
    <section
      className={clsx(
        "story-screen relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b px-6 text-center",
        accentBg[data.accent]
      )}
    >
      <div className="bg-grain pointer-events-none absolute inset-0" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={active ? { opacity: 1, y: 0 } : { opacity: 0.4, y: 12 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 flex w-full max-w-md flex-col items-center"
      >
        {data.kicker && (
          <p className={clsx("mb-4 font-mono text-xs tracking-[0.25em]", accentText[data.accent])}>
            {data.kicker}
          </p>
        )}

        {data.variant === "stat" && (
          <>
            <div className="font-display text-6xl font-bold leading-none sm:text-7xl">
              <AnimatedNumber value={data.value ?? 0} active={active} />
            </div>
            <p className="font-display mt-3 text-2xl text-dim">{data.headline}</p>
          </>
        )}

        {(data.variant === "intro" || data.variant === "summary") && (
          <>
            <h1 className="text-balance font-display text-4xl font-bold leading-tight sm:text-5xl">
              {data.headline}
            </h1>
            {data.body && <p className="mt-4 text-balance text-lg text-dim">{data.body}</p>}
          </>
        )}

        {data.variant === "personality" && (
          <>
            <div
              className={clsx(
                "mb-6 flex h-24 w-24 items-center justify-center rounded-full",
                accentSolid[data.accent]
              )}
            >
              <span className="text-4xl">✦</span>
            </div>
            <h1 className="text-balance font-display text-4xl font-bold leading-tight sm:text-5xl">
              {data.headline}
            </h1>
            {data.body && <p className="mt-4 text-balance text-lg text-dim">{data.body}</p>}
          </>
        )}

        {data.variant === "list" && (
          <>
            <h2 className="text-balance font-display text-3xl font-bold leading-tight sm:text-4xl">
              {data.headline}
            </h2>
            {data.body && <p className="mt-3 text-balance text-dim">{data.body}</p>}
            {data.items && (
              <div className="mt-6 grid w-full grid-cols-1 gap-2">
                {data.items.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between rounded-xl border border-line bg-surface/60 px-4 py-3"
                  >
                    <span className="text-sm text-dim">{item.label}</span>
                    <span className="font-mono font-semibold">{item.value}</span>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {data.variant === "grid" && (
          <>
            <h2 className="text-balance font-display text-3xl font-bold leading-tight sm:text-4xl">
              {data.headline}
            </h2>
            {data.chart && (
              <div className="mt-8 flex w-full items-end justify-center gap-2">
                {data.chart.map((entry, i) => (
                  <div key={entry.label} className="flex flex-1 flex-col items-center gap-2">
                    <span className="font-mono text-xs text-dim">{entry.value}</span>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={active ? { height: `${(entry.value / maxChart) * 120}px` } : { height: 0 }}
                      transition={{ duration: 0.7, delay: i * 0.06, ease: "easeOut" }}
                      className={clsx("w-full rounded-t-md", accentSolid[data.accent])}
                    />
                    <span className="font-mono text-[10px] text-dim">{entry.label}</span>
                  </div>
                ))}
              </div>
            )}
            {data.items && (
              <div className="mt-6 grid w-full grid-cols-2 gap-3">
                {data.items.map((item) => (
                  <div key={item.label} className="rounded-xl border border-line bg-surface/60 p-4 text-left">
                    <p className="text-xs text-dim">{item.label}</p>
                    <p className="font-mono text-xl font-bold">{item.value}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {data.variant === "share" && (
          <>
            <h1 className="text-balance font-display text-4xl font-bold leading-tight sm:text-5xl">
              {data.headline}
            </h1>
            {data.body && <p className="mt-3 text-balance text-dim">{data.body}</p>}
            <button
              onClick={onShare}
              className={clsx(
                "focus-ring mt-8 rounded-full px-8 py-3 font-semibold text-base transition-transform hover:scale-105",
                accentSolid[data.accent]
              )}
            >
              Share my Wrapped
            </button>
          </>
        )}
      </motion.div>
    </section>
  );
}
