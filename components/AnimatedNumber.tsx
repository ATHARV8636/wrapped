"use client";

import { useEffect, useRef, useState } from "react";

export default function AnimatedNumber({
  value,
  active,
  duration = 1400,
}: {
  value: string | number;
  active: boolean;
  duration?: number;
}) {
  const numeric = typeof value === "number" ? value : parseFloat(String(value).replace(/[^0-9.-]/g, ""));
  const isNumeric = !Number.isNaN(numeric);
  const [display, setDisplay] = useState(isNumeric ? 0 : value);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    if (!isNumeric) {
      setDisplay(value);
      return;
    }
    if (!active) {
      setDisplay(0);
      return;
    }

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setDisplay(numeric);
      return;
    }

    const start = performance.now();
    const from = 0;

    function tick(now: number) {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(from + (numeric - from) * eased));
      if (progress < 1) {
        frame.current = requestAnimationFrame(tick);
      }
    }

    frame.current = requestAnimationFrame(tick);
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [active, numeric, isNumeric, duration, value]);

  return <span>{isNumeric ? display.toLocaleString() : display}</span>;
}
