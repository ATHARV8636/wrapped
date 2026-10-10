import Link from "next/link";

export default function Navbar() {
  return (
    <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
      <Link href="/" className="font-display text-lg font-bold tracking-tight focus-ring rounded">
        WRAPPED
      </Link>
      <nav className="flex items-center gap-6 text-sm text-dim">
        <Link href="/create" className="focus-ring rounded hover:text-ink transition-colors">
          Create
        </Link>
        <Link
          href="/wrapped/demo"
          className="focus-ring rounded border border-line px-4 py-2 hover:text-ink hover:border-violet transition-colors"
        >
          Try Demo
        </Link>
      </nav>
    </header>
  );
}
