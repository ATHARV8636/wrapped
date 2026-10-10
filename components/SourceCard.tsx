import Link from "next/link";
import { LucideIcon } from "lucide-react";
import clsx from "clsx";

const accentBorder = {
  violet: "hover:border-violet",
  amber: "hover:border-amber",
  emerald: "hover:border-emerald",
};

const accentText = {
  violet: "text-violet",
  amber: "text-amber",
  emerald: "text-emerald",
};

export default function SourceCard({
  href,
  icon: Icon,
  title,
  description,
  accent,
}: {
  href: string;
  icon: LucideIcon;
  title: string;
  description: string;
  accent: "violet" | "amber" | "emerald";
}) {
  return (
    <Link
      href={href}
      className={clsx(
        "focus-ring group flex flex-col rounded-2xl border border-line bg-surface p-6 transition-colors",
        accentBorder[accent]
      )}
    >
      <Icon className={clsx("mb-4", accentText[accent])} size={28} strokeWidth={1.75} />
      <h3 className="font-display text-xl font-bold">{title}</h3>
      <p className="mt-2 text-sm text-dim">{description}</p>
      <span className={clsx("mt-4 text-sm font-semibold", accentText[accent])}>
        Get started →
      </span>
    </Link>
  );
}
