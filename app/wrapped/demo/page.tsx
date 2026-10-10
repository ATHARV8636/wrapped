"use client";

import { useState } from "react";
import { Github, Code2, BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WrappedStory from "@/components/WrappedStory";
import { buildGithubWrapped, buildGoodreadsWrapped, buildLeetCodeWrapped } from "@/lib/storyBuilder";
import { demoGithub, demoGoodreads, demoLeetCode } from "@/lib/demoData";
import { SourceKind } from "@/lib/types";

export default function DemoPage() {
  const [chosen, setChosen] = useState<SourceKind | null>(null);

  if (chosen === "github") {
    return <WrappedStory payload={buildGithubWrapped(demoGithub, true)} />;
  }
  if (chosen === "leetcode") {
    return <WrappedStory payload={buildLeetCodeWrapped(demoLeetCode, true)} />;
  }
  if (chosen === "goodreads") {
    return <WrappedStory payload={buildGoodreadsWrapped(demoGoodreads, true)} />;
  }

  return (
    <main className="min-h-screen bg-canvas">
      <Navbar />
      <section className="mx-auto max-w-3xl px-6 pt-16 text-center">
        <p className="font-mono text-xs tracking-[0.2em] text-violet">DEMO MODE</p>
        <h1 className="mt-3 font-display text-4xl font-bold">Pick a sample story</h1>
        <p className="mt-2 text-dim">
          This uses realistic sample data — no account or upload required.
        </p>
      </section>

      <section className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-5 px-6 sm:grid-cols-3">
        <button
          onClick={() => setChosen("github")}
          className="focus-ring flex flex-col items-center gap-3 rounded-2xl border border-line bg-surface p-6 hover:border-violet transition-colors"
        >
          <Github className="text-violet" size={28} />
          <span className="font-display font-bold">GitHub</span>
        </button>
        <button
          onClick={() => setChosen("leetcode")}
          className="focus-ring flex flex-col items-center gap-3 rounded-2xl border border-line bg-surface p-6 hover:border-amber transition-colors"
        >
          <Code2 className="text-amber" size={28} />
          <span className="font-display font-bold">LeetCode</span>
        </button>
        <button
          onClick={() => setChosen("goodreads")}
          className="focus-ring flex flex-col items-center gap-3 rounded-2xl border border-line bg-surface p-6 hover:border-emerald transition-colors"
        >
          <BookOpen className="text-emerald" size={28} />
          <span className="font-display font-bold">Goodreads</span>
        </button>
      </section>

      <div className="mt-20">
        <Footer />
      </div>
    </main>
  );
}
