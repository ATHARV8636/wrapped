"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Code2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import LoadingScreen from "@/components/LoadingScreen";
import ErrorState from "@/components/ErrorState";
import { buildLeetCodeWrapped } from "@/lib/storyBuilder";
import { saveWrapped } from "@/lib/storage";
import { LeetCodeStats } from "@/lib/types";

type Status = "idle" | "loading" | "error";

export default function LeetCodeCreatePage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!username.trim()) return;
    setStatus("loading");
    setError("");

    try {
      const res = await fetch(`/api/leetcode?username=${encodeURIComponent(username.trim())}`);
      const json = await res.json();

      if (!res.ok) {
        setError(
          json.error ??
            "LeetCode doesn't offer an official public API, so live lookups can be unreliable. Try Demo Mode to see the full experience."
        );
        setStatus("error");
        return;
      }

      const stats = json as LeetCodeStats;
      const payload = buildLeetCodeWrapped(stats, false);
      saveWrapped(payload);
      router.push(`/wrapped/${payload.id}`);
    } catch {
      setError("Couldn't reach the server. Check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "loading") {
    return (
      <main className="min-h-screen bg-canvas">
        <Navbar />
        <LoadingScreen
          messages={[
            "Counting submissions...",
            "Sorting by difficulty...",
            "Calculating your ranking...",
            "Discovering your problem-solver personality...",
          ]}
        />
      </main>
    );
  }

  if (status === "error") {
    return (
      <main className="min-h-screen bg-canvas">
        <Navbar />
        <ErrorState message={error} demoHref="/wrapped/demo" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-canvas">
      <Navbar />
      <section className="mx-auto max-w-md px-6 pt-16 text-center">
        <Code2 className="mx-auto text-amber" size={32} />
        <h1 className="mt-4 font-display text-3xl font-bold">LeetCode Wrapped</h1>
        <p className="mt-2 text-dim">Enter a public LeetCode username to generate your problem-solving year.</p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="leetcoder123"
            className="focus-ring rounded-xl border border-line bg-surface px-4 py-3 text-center font-mono outline-none"
            autoFocus
          />
          <button
            type="submit"
            className="focus-ring rounded-full bg-amber px-6 py-3 font-semibold text-base transition-transform hover:scale-105"
          >
            Generate My Wrapped
          </button>
        </form>

        <p className="mt-6 text-xs text-dim">
          LeetCode has no official public API, so live results depend on data it exposes
          voluntarily. If a lookup fails, Demo Mode shows the full experience with sample data.
        </p>
      </section>
    </main>
  );
}
