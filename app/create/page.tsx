import { Github, Code2, BookOpen, Sparkles } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SourceCard from "@/components/SourceCard";

export default function CreatePage() {
  return (
    <main className="min-h-screen bg-canvas">
      <Navbar />
      <section className="mx-auto max-w-4xl px-6 pt-12 text-center">
        <h1 className="font-display text-4xl font-bold">Choose your data</h1>
        <p className="mt-3 text-dim">Pick a source, and we'll build your story from it.</p>
      </section>

      <section className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-5 px-6 sm:grid-cols-3">
        <SourceCard
          href="/create/github"
          icon={Github}
          title="GitHub Wrapped"
          description="Discover your coding activity, repositories, commits and languages."
          accent="violet"
        />
        <SourceCard
          href="/create/leetcode"
          icon={Code2}
          title="LeetCode Wrapped"
          description="See your problem-solving streaks, solved problems and difficulty breakdown."
          accent="amber"
        />
        <SourceCard
          href="/create/goodreads"
          icon={BookOpen}
          title="Goodreads Wrapped"
          description="Turn your reading history into a beautiful reading story."
          accent="emerald"
        />
      </section>

      <section className="mx-auto mt-10 max-w-4xl px-6 text-center">
        <Link
          href="/wrapped/demo"
          className="focus-ring inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-semibold text-dim hover:text-ink hover:border-violet transition-colors"
        >
          <Sparkles size={16} /> Just want to look around? Try Demo Mode
        </Link>
      </section>

      <div className="mt-20">
        <Footer />
      </div>
    </main>
  );
}
