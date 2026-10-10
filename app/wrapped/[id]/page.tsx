"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import WrappedStory from "@/components/WrappedStory";
import { loadWrapped } from "@/lib/storage";
import { WrappedPayload } from "@/lib/types";

export default function WrappedByIdPage() {
  const params = useParams<{ id: string }>();
  const [payload, setPayload] = useState<WrappedPayload | null | undefined>(undefined);

  useEffect(() => {
    setPayload(loadWrapped(params.id));
  }, [params.id]);

  if (payload === undefined) {
    return <div className="min-h-screen bg-canvas" />;
  }

  if (payload === null) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-canvas px-6 text-center">
        <h1 className="font-display text-2xl font-bold">This story isn't on this device</h1>
        <p className="max-w-sm text-dim">
          Wrapped stories are stored locally in your browser, so links only work on the device
          that generated them. Try creating a new one.
        </p>
        <Link
          href="/create"
          className="focus-ring rounded-full bg-violet px-6 py-3 font-semibold"
        >
          Create your Wrapped
        </Link>
      </main>
    );
  }

  return <WrappedStory payload={payload} />;
}
