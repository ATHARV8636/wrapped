"use client";

import { useEffect, useState } from "react";

export default function LoadingScreen({ messages }: { messages: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % messages.length);
    }, 1100);
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-line border-t-violet" />
      <p className="mt-6 font-mono text-sm text-dim" aria-live="polite">
        {messages[index]}
      </p>
    </div>
  );
}
