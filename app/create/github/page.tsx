"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Github } from "lucide-react";
import Navbar from "@/components/Navbar";
import LoadingScreen from "@/components/LoadingScreen";
import ErrorState from "@/components/ErrorState";
import { buildGithubWrapped } from "@/lib/storyBuilder";
import { saveWrapped } from "@/lib/storage";
import { GithubStats } from "@/lib/types";

type Status = "idle" | "loading" | "error";

export default function GithubCreatePage() {
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
      const res = await fetch(`/api/github?username=${encodeURIComponent(username.trim())}`);
      const json = await res.json();

      if (!res.ok) {
        setError(json.error ?? "Something went wrong.");
        setStatus("error");
        return;
      }

      const stats = json as GithubStats;
      const payload = buildGithubWrapped(stats, false);
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
            "Counting commits...",
            "Finding your favorite language...",
            "Analyzing your projects...",
            "Discovering your coding personality...",
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
        <Github className="mx-auto text-violet" size={32} />
        <h1 className="mt-4 font-display text-3xl font-bold">GitHub Wrapped</h1>
        <p className="mt-2 text-dim">Enter a public GitHub username to generate your year in code.</p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="octocat"
            className="focus-ring rounded-xl border border-line bg-surface px-4 py-3 text-center font-mono outline-none"
            autoFocus
          />
          <button
            type="submit"
            className="focus-ring rounded-full bg-violet px-6 py-3 font-semibold transition-transform hover:scale-105"
          >
            Generate My Wrapped
          </button>
        </form>

        <p className="mt-6 text-xs text-dim">
          We only read public profile and repository data. Nothing is stored on our servers.
        </p>
      </section>
    </main>
  );
}
