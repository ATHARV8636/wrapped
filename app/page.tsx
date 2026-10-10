"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Code2, BookOpen, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const floatingStats = [
  { label: "1,284 commits", accent: "text-violet", delay: 0 },
  { label: "247 problems solved", accent: "text-amber", delay: 0.6 },
  { label: "36 books read", accent: "text-emerald", delay: 1.2 },
  { label: "92,430 lines changed", accent: "text-violet", delay: 1.8 },
];

const steps = [
  { title: "Choose your data", body: "GitHub, LeetCode, or Goodreads — pick the year you want told." },
  { title: "Generate your stats", body: "We pull, calculate, and normalize the numbers that matter." },
  { title: "Experience your year", body: "Scroll through a full-screen animated story, built just for you." },
  { title: "Share your story", body: "Download a card or send the link — no account required." },
];

export default function LandingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-canvas">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-violet/20 blur-[120px]" />

      <Navbar />

      <section className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 pt-16 text-center sm:pt-24">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-balance font-display text-5xl font-bold leading-[1.05] sm:text-7xl"
        >
          Your Year.
          <br />
          <span className="text-violet">Wrapped.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-balance mt-6 max-w-lg text-lg text-dim"
        >
          Turn your GitHub commits, LeetCode problems, or Goodreads books into a story worth sharing.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/create"
            className="focus-ring flex items-center gap-2 rounded-full bg-violet px-7 py-3.5 font-semibold transition-transform hover:scale-105"
          >
            Generate My Wrapped <ArrowRight size={18} />
          </Link>
          <Link
            href="/wrapped/demo"
            className="focus-ring rounded-full border border-line px-7 py-3.5 font-semibold text-dim hover:text-ink hover:border-violet transition-colors"
          >
            Try Demo
          </Link>
        </motion.div>

        <div className="relative mt-20 h-40 w-full max-w-2xl">
          {floatingStats.map((s) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: [0, -10, 0] }}
              transition={{
                opacity: { duration: 0.6, delay: s.delay },
                y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: s.delay },
              }}
              className={`absolute rounded-xl border border-line bg-surface/80 px-4 py-2 font-mono text-xs backdrop-blur ${s.accent}`}
              style={{
                left: `${(floatingStats.indexOf(s) % 2) * 55}%`,
                top: `${Math.floor(floatingStats.indexOf(s) / 2) * 70}px`,
              }}
            >
              {s.label}
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto mt-16 max-w-5xl px-6">
        <h2 className="text-center font-display text-3xl font-bold">How it works</h2>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-4">
          {steps.map((step, i) => (
            <div key={step.title} className="rounded-2xl border border-line bg-surface p-5">
              <p className="font-mono text-xs text-violet">0{i + 1}</p>
              <h3 className="mt-3 font-display font-bold">{step.title}</h3>
              <p className="mt-2 text-sm text-dim">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto mt-20 max-w-5xl px-6">
        <h2 className="text-center font-display text-3xl font-bold">Supported platforms</h2>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-5">
            <Github className="text-violet" />
            <span className="font-display font-semibold">GitHub</span>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-5">
            <Code2 className="text-amber" />
            <span className="font-display font-semibold">LeetCode</span>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-5">
            <BookOpen className="text-emerald" />
            <span className="font-display font-semibold">Goodreads</span>
          </div>
        </div>
      </section>

      <div className="mt-24">
        <Footer />
      </div>
    </main>
  );
}
