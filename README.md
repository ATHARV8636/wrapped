# Wrapped — Your Year, Wrapped.

Turn your GitHub, LeetCode, or Goodreads data into a beautiful, animated,
scrollable year-in-review story — like Spotify Wrapped, but for what you
built, solved, or read.

![Wrapped](https://img.shields.io/badge/status-demo--ready-7C6FFF)

## Features

- **Three data sources**: GitHub (live REST API), LeetCode (best-effort via
  its unofficial GraphQL endpoint, with graceful fallback), and Goodreads
  (CSV export upload, parsed entirely client-side).
- **Demo Mode**: the full experience works with zero credentials, using
  realistic sample data, clearly labeled as a demo.
- **Full-screen animated story**: 7–10 scroll-snapped screens per source,
  built with Framer Motion — animated counters, staggered bar charts,
  a personality reveal, and a share screen.
- **Shareable story cards**: exports a branded PNG via `html-to-image`, plus
  native Web Share API support with a copy-link fallback.
- **Personality engine**: each source computes a "personality" (e.g. *The
  Builder*, *Hard Mode Hero*, *The Speed Reader*) from real thresholds in
  the data, not randomly.
- Responsive, keyboard-navigable (arrow keys / space to advance), and
  respects `prefers-reduced-motion`.

## Tech stack

- [Next.js 15](https://nextjs.org) (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/) for animation
- [Recharts-style bar rendering](https://recharts.org) primitives (hand-rolled SVG/CSS bars for full animation control)
- [Papa Parse](https://www.papaparse.com) for Goodreads CSV parsing
- [html-to-image](https://github.com/bubkoo/html-to-image) for shareable PNG export
- [Lucide React](https://lucide.dev) icons

## Folder structure

```
app/
  page.tsx                  Landing page
  create/page.tsx           Data source picker
  create/github/page.tsx    GitHub username → generate
  create/leetcode/page.tsx  LeetCode username → generate
  create/goodreads/page.tsx CSV upload → generate
  wrapped/demo/page.tsx     Demo mode source picker
  wrapped/[id]/page.tsx     Renders a generated story by id
  api/github/route.ts       Server-side GitHub REST fetch + normalize
  api/leetcode/route.ts     Server-side LeetCode GraphQL proxy
components/
  WrappedStory.tsx          Story orchestrator (scroll, progress, share)
  StoryScreen.tsx           Renders each screen variant
  ProgressBar.tsx           Segmented Instagram-style progress bar
  AnimatedNumber.tsx        Count-up animation
  ShareCard.tsx             Off-screen node rendered to PNG
  SourceCard.tsx, Navbar.tsx, Footer.tsx, LoadingScreen.tsx, ErrorState.tsx
lib/
  types.ts                  Shared TypeScript interfaces
  github.ts / leetcode.ts   Fetchers + normalizers
  goodreads.ts              CSV parser
  storyBuilder.ts           Raw stats → ordered story screens
  personality.ts            Personality classification rules
  demoData.ts                Static sample datasets
  storage.ts                localStorage helpers
```

Business logic (`lib/`) is kept fully separate from UI (`components/`, `app/`).

## Installation

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

| Variable | Required | Purpose |
|---|---|---|
| `GITHUB_TOKEN` | No | Raises the GitHub API rate limit from 60 to 5,000 req/hr. Create a classic token with no scopes at [github.com/settings/tokens](https://github.com/settings/tokens). |

**The app works fully without any environment variables** — Demo Mode never touches an API, and GitHub lookups work unauthenticated (just at a lower rate limit).

### GitHub setup

No setup required for basic use. The `/api/github` route calls the public
GitHub REST API (`api.github.com`) with no auth by default. If you expect
heavy traffic, add `GITHUB_TOKEN`.

### LeetCode setup

LeetCode has **no official public API**. This project calls the same
unofficial GraphQL endpoint (`leetcode.com/graphql`) the LeetCode website
itself uses client-side. This can break or rate-limit without notice — that's
inherent to using an undocumented endpoint, not a bug in this code. When it
fails, the UI shows a clear error and points to Demo Mode rather than
fabricating numbers.

### Goodreads setup

Goodreads' official API has long been closed to new developers, so this
project uses CSV import instead:

1. Go to [goodreads.com/review/import](https://www.goodreads.com/review/import)
2. Click **Export Library**
3. Upload the downloaded CSV on the `/create/goodreads` page

Everything is parsed in the browser — the file is never sent to a server.

### Demo Mode

Visit `/wrapped/demo` (or click **Try Demo** anywhere) to see the full story
experience for all three sources using realistic, clearly-labeled sample
data — no account, upload, or API call required.

## How sharing works

Generated stories are stored in the browser's `localStorage`, keyed by a
random id, and the story screen at `/wrapped/[id]` reads from that key. This
keeps the project fully static/serverless-friendly for a portfolio deploy —
there's no database. The practical implication: a `/wrapped/[id]` link only
resolves on the device that generated it. The **Download story card** and
**native share** options generate a self-contained PNG image, which is the
recommended way to actually share results with someone else.

If you want cross-device shareable links, the natural next step is swapping
`lib/storage.ts` for a real datastore (Vercel KV, Postgres via Neon/Supabase,
etc.) — the rest of the app doesn't need to change.

## Deployment (Vercel)

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. (Optional) Add `GITHUB_TOKEN` under **Settings → Environment Variables**.
4. Deploy. No build configuration is required — Vercel auto-detects Next.js.

## Future improvements

- Persist generated stories server-side (Vercel KV / Postgres) for real
  cross-device shareable links.
- "Compare Wrapped" — put two usernames' stats side by side.
- Achievement badges (e.g. 🔥 100-day streak) once real streak data is tracked.
- LeetCode contest-history and submission-calendar screens if a more stable
  data source becomes available.

## License

MIT — do whatever you'd like with this.
