"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, Upload } from "lucide-react";
import Navbar from "@/components/Navbar";
import LoadingScreen from "@/components/LoadingScreen";
import ErrorState from "@/components/ErrorState";
import { parseGoodreadsCsv, GoodreadsParseError } from "@/lib/goodreads";
import { buildGoodreadsWrapped } from "@/lib/storyBuilder";
import { saveWrapped } from "@/lib/storage";

type Status = "idle" | "loading" | "error";

export default function GoodreadsCreatePage() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleFile(file: File) {
    if (!file.name.toLowerCase().endsWith(".csv")) {
      setError("Please upload a .csv file exported from Goodreads.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setError("");

    try {
      const text = await file.text();
      const stats = parseGoodreadsCsv(text);
      const payload = buildGoodreadsWrapped(stats, false);
      saveWrapped(payload);
      router.push(`/wrapped/${payload.id}`);
    } catch (err) {
      setError(
        err instanceof GoodreadsParseError
          ? err.message
          : "Something went wrong reading that file."
      );
      setStatus("error");
    }
  }

  if (status === "loading") {
    return (
      <main className="min-h-screen bg-canvas">
        <Navbar />
        <LoadingScreen
          messages={[
            "Reading your library...",
            "Counting pages...",
            "Finding your favorite author...",
            "Discovering your reading personality...",
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
        <BookOpen className="mx-auto text-emerald" size={32} />
        <h1 className="mt-4 font-display text-3xl font-bold">Goodreads Wrapped</h1>
        <p className="mt-2 text-dim">
          Upload your Goodreads library export to generate your reading year.
        </p>

        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const file = e.dataTransfer.files?.[0];
            if (file) handleFile(file);
          }}
          className="focus-ring mt-8 flex cursor-pointer flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-line bg-surface px-6 py-12 transition-colors hover:border-emerald"
        >
          <Upload className="text-emerald" size={24} />
          <p className="font-semibold">Drop your CSV here, or click to browse</p>
          <p className="text-xs text-dim">Goodreads → My Books → Import/Export → Export Library</p>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept=".csv"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />
      </section>
    </main>
  );
}
