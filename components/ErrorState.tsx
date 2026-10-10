import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function ErrorState({
  message,
  demoHref,
}: {
  message: string;
  demoHref: string;
}) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-6 text-center">
      <AlertTriangle className="text-amber" size={32} />
      <p className="mt-4 text-dim">{message}</p>
      <div className="mt-6 flex gap-3">
        <Link
          href={demoHref}
          className="focus-ring rounded-full bg-violet px-5 py-2.5 font-semibold text-base"
        >
          Try Demo instead
        </Link>
        <Link
          href="/create"
          className="focus-ring rounded-full border border-line px-5 py-2.5 font-semibold text-dim hover:text-ink"
        >
          Back
        </Link>
      </div>
    </div>
  );
}
