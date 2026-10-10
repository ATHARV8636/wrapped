"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { RotateCcw, Download, Link as LinkIcon, Share2 } from "lucide-react";
import { WrappedPayload } from "@/lib/types";
import StoryScreen from "./StoryScreen";
import ProgressBar from "./ProgressBar";
import ShareCard from "./ShareCard";

export default function WrappedStory({ payload }: { payload: WrappedPayload }) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const shareCardRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [shareOpen, setShareOpen] = useState(false);
  const [copyState, setCopyState] = useState<"idle" | "copied">("idle");

  const total = payload.screens.length;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    function onScroll() {
      if (!el) return;
      const index = Math.round(el.scrollTop / el.clientHeight);
      setCurrent(Math.min(total - 1, Math.max(0, index)));
    }

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [total]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const el = containerRef.current;
      if (!el) return;
      if (e.key === "ArrowDown" || e.key === " ") {
        el.scrollTo({ top: (current + 1) * el.clientHeight, behavior: "smooth" });
      } else if (e.key === "ArrowUp") {
        el.scrollTo({ top: (current - 1) * el.clientHeight, behavior: "smooth" });
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current]);

  const handleShareOpen = useCallback(() => setShareOpen(true), []);

  const handleDownload = useCallback(async () => {
    if (!shareCardRef.current) return;
    const { toPng } = await import("html-to-image");
    const dataUrl = await toPng(shareCardRef.current, { pixelRatio: 2 });
    const link = document.createElement("a");
    link.download = `${payload.displayName}-${payload.source}-wrapped.png`;
    link.href = dataUrl;
    link.click();
  }, [payload]);

  const handleCopyLink = useCallback(async () => {
    const url = `${window.location.origin}/wrapped/${payload.id}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopyState("copied");
      setTimeout(() => setCopyState("idle"), 2000);
    } catch {
      // Clipboard API can be unavailable; fall through silently.
    }
  }, [payload]);

  const handleNativeShare = useCallback(async () => {
    const url = `${window.location.origin}/wrapped/${payload.id}`;
    const text = `See my ${new Date().getFullYear()} ${payload.source} Wrapped 🚀`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "My Wrapped", text, url });
      } catch {
        // User cancelled the native share sheet — nothing to do.
      }
    } else {
      await handleCopyLink();
    }
  }, [payload, handleCopyLink]);

  return (
    <div className="relative bg-canvas">
      <ProgressBar total={total} current={current} accent={payload.screens[current]?.accent ?? "violet"} />

      <div ref={containerRef} className="story-scroll">
        {payload.screens.map((screen, i) => (
          <StoryScreen key={screen.id} data={screen} active={i === current} onShare={handleShareOpen} />
        ))}
      </div>

      {/* Off-screen node used purely as a render target for html-to-image */}
      <div className="pointer-events-none fixed -left-[9999px] top-0">
        <ShareCard ref={shareCardRef} payload={payload} />
      </div>

      {shareOpen && (
        <div
          className="fixed inset-0 z-40 flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center"
          role="dialog"
          aria-modal="true"
          onClick={() => setShareOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-t-3xl border border-line bg-surface p-6 sm:rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-display text-xl font-bold">Share your year</h3>
            <p className="mt-1 text-sm text-dim">Download an image or send the link.</p>

            <div className="mt-5 flex flex-col gap-3">
              <button
                onClick={handleDownload}
                className="focus-ring flex items-center justify-center gap-2 rounded-xl bg-violet px-4 py-3 font-semibold text-base"
              >
                <Download size={18} /> Download story card
              </button>
              <button
                onClick={handleNativeShare}
                className="focus-ring flex items-center justify-center gap-2 rounded-xl border border-line bg-surface2 px-4 py-3 font-semibold"
              >
                <Share2 size={18} /> Share
              </button>
              <button
                onClick={handleCopyLink}
                className="focus-ring flex items-center justify-center gap-2 rounded-xl border border-line bg-surface2 px-4 py-3 font-semibold"
              >
                <LinkIcon size={18} /> {copyState === "copied" ? "Link copied!" : "Copy link"}
              </button>
              <button
                onClick={() => router.push("/create")}
                className="focus-ring flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm text-dim hover:text-ink"
              >
                <RotateCcw size={16} /> Start again
              </button>
            </div>

            <button
              onClick={() => setShareOpen(false)}
              className="focus-ring mt-4 w-full text-center text-sm text-dim hover:text-ink"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
