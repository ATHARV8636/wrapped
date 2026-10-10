import { GithubStats, GoodreadsStats, LeetCodeStats, StoryScreenData, WrappedPayload } from "./types";
import { githubPersonality, goodreadsPersonality, leetcodePersonality } from "./personality";

function id() {
  return Math.random().toString(36).slice(2, 10);
}

function eraForLanguage(lang: string): string {
  const eras: Record<string, string> = {
    JavaScript: "The Full-Stack Era",
    TypeScript: "The Type-Safe Era",
    Python: "The Automation Era",
    Go: "The Systems Era",
    Rust: "The Performance Era",
    Java: "The Enterprise Era",
    "C++": "The Low-Level Era",
    Ruby: "The Rapid-Ship Era",
  };
  return eras[lang] ?? "The Builder Era";
}

export function buildGithubWrapped(stats: GithubStats, isDemo: boolean): WrappedPayload {
  const personality = githubPersonality(stats);
  const screens: StoryScreenData[] = [
    {
      id: id(),
      accent: "violet",
      variant: "intro",
      kicker: "GITHUB WRAPPED",
      headline: `${stats.username}'s year in code`,
      body: "Scroll to see how the year actually looked, one commit at a time.",
    },
    {
      id: id(),
      accent: "violet",
      variant: "stat",
      kicker: "YOU BUILT",
      headline: "public repositories",
      value: stats.publicRepos,
    },
    {
      id: id(),
      accent: "violet",
      variant: "stat",
      kicker: "YOUR FAVORITE LANGUAGE WAS",
      headline: stats.topLanguage,
      body: `Used across ${stats.languageBreakdown.length} languages this year.`,
    },
    {
      id: id(),
      accent: "violet",
      variant: "grid",
      kicker: "LANGUAGE BREAKDOWN",
      headline: "Where your code lived",
      chart: stats.languageBreakdown,
    },
    stats.topRepo
      ? {
          id: id(),
          accent: "violet",
          variant: "list",
          kicker: "YOUR BIGGEST PROJECT",
          headline: stats.topRepo.name,
          body: stats.topRepo.description || "No description provided.",
          items: [
            { label: "Stars", value: stats.topRepo.stars },
            { label: "Forks", value: stats.topRepo.forks },
            { label: "Language", value: stats.topRepo.language || "—" },
          ],
        }
      : {
          id: id(),
          accent: "violet",
          variant: "list",
          kicker: "YOUR PROJECTS",
          headline: "Building quietly",
          body: "No standout repo yet — the next one could be it.",
        },
    {
      id: id(),
      accent: "violet",
      variant: "personality",
      kicker: "YOUR CODING PERSONALITY",
      headline: personality.title,
      body: personality.blurb,
    },
    {
      id: id(),
      accent: "violet",
      variant: "grid",
      kicker: "YOUR YEAR IN NUMBERS",
      headline: "The full picture",
      items: [
        { label: "Repositories", value: stats.publicRepos },
        { label: "Stars earned", value: stats.totalStars },
        { label: "Forks", value: stats.totalForks },
        { label: "Followers", value: stats.followers },
      ],
    },
    {
      id: id(),
      accent: "violet",
      variant: "summary",
      kicker: "YOUR CODING ERA",
      headline: eraForLanguage(stats.topLanguage),
      body: `Powered by ${stats.topLanguage} and ${stats.publicRepos} shipped repositories.`,
    },
    {
      id: id(),
      accent: "violet",
      variant: "share",
      kicker: "THAT'S A WRAP",
      headline: "Share your year",
      body: "Download a card or copy your link.",
    },
  ];

  return {
    id: id(),
    source: "github",
    isDemo,
    generatedAt: new Date().toISOString(),
    displayName: stats.username,
    avatarUrl: stats.avatarUrl,
    screens,
    shareStats: [
      { label: "Repos", value: String(stats.publicRepos) },
      { label: "Stars", value: String(stats.totalStars) },
      { label: "Top language", value: stats.topLanguage },
      { label: "Personality", value: personality.title },
    ],
  };
}

export function buildLeetCodeWrapped(stats: LeetCodeStats, isDemo: boolean): WrappedPayload {
  const personality = leetcodePersonality(stats);
  const screens: StoryScreenData[] = [
    {
      id: id(),
      accent: "amber",
      variant: "intro",
      kicker: "LEETCODE WRAPPED",
      headline: `${stats.username}'s problem-solving year`,
      body: stats.isEstimated
        ? "Built from the best publicly available data for this profile."
        : "Every problem, every difficulty, one story.",
    },
    {
      id: id(),
      accent: "amber",
      variant: "stat",
      kicker: "YOU SOLVED",
      headline: "problems total",
      value: stats.totalSolved,
    },
    {
      id: id(),
      accent: "amber",
      variant: "grid",
      kicker: "DIFFICULTY BREAKDOWN",
      headline: "How you spent your reps",
      chart: [
        { label: "Easy", value: stats.easySolved },
        { label: "Medium", value: stats.mediumSolved },
        { label: "Hard", value: stats.hardSolved },
      ],
    },
    {
      id: id(),
      accent: "amber",
      variant: "list",
      kicker: "YOUR NUMBERS",
      headline: "The stat line",
      items: [
        { label: "Acceptance rate", value: stats.acceptanceRate ? `${stats.acceptanceRate.toFixed(1)}%` : "—" },
        { label: "Global ranking", value: stats.ranking ? `#${stats.ranking.toLocaleString()}` : "—" },
        { label: "Hard problems", value: stats.hardSolved },
      ],
    },
    {
      id: id(),
      accent: "amber",
      variant: "personality",
      kicker: "YOUR PROBLEM-SOLVER PERSONALITY",
      headline: personality.title,
      body: personality.blurb,
    },
    {
      id: id(),
      accent: "amber",
      variant: "summary",
      kicker: "YOUR ALGORITHM ERA",
      headline: stats.hardSolved > 40 ? "The Hard-Mode Era" : "The Fundamentals Era",
      body: `${stats.totalSolved} problems deep and still climbing.`,
    },
    {
      id: id(),
      accent: "amber",
      variant: "share",
      kicker: "THAT'S A WRAP",
      headline: "Share your year",
      body: "Download a card or copy your link.",
    },
  ];

  return {
    id: id(),
    source: "leetcode",
    isDemo,
    generatedAt: new Date().toISOString(),
    displayName: stats.username,
    screens,
    shareStats: [
      { label: "Solved", value: String(stats.totalSolved) },
      { label: "Hard", value: String(stats.hardSolved) },
      { label: "Personality", value: personality.title },
    ],
  };
}

export function buildGoodreadsWrapped(stats: GoodreadsStats, isDemo: boolean): WrappedPayload {
  const personality = goodreadsPersonality(stats);
  const screens: StoryScreenData[] = [
    {
      id: id(),
      accent: "emerald",
      variant: "intro",
      kicker: "GOODREADS WRAPPED",
      headline: "Your reading year",
      body: "Every page you turned, tallied into one story.",
    },
    {
      id: id(),
      accent: "emerald",
      variant: "stat",
      kicker: "YOU READ",
      headline: "books",
      value: stats.booksRead,
    },
    {
      id: id(),
      accent: "emerald",
      variant: "stat",
      kicker: "THAT'S",
      headline: "pages turned",
      value: stats.pagesRead.toLocaleString(),
    },
    {
      id: id(),
      accent: "emerald",
      variant: "grid",
      kicker: "BOOKS BY MONTH",
      headline: "Your reading rhythm",
      chart: stats.booksByMonth,
    },
    {
      id: id(),
      accent: "emerald",
      variant: "list",
      kicker: "STANDOUTS",
      headline: stats.highestRatedBook,
      body: `Your most-read author was ${stats.mostReadAuthor}.`,
      items: [
        { label: "Longest book", value: stats.longestBook ? `${stats.longestBook.title} (${stats.longestBook.pages}p)` : "—" },
        { label: "Shortest book", value: stats.shortestBook ? `${stats.shortestBook.title} (${stats.shortestBook.pages}p)` : "—" },
        { label: "Average rating", value: stats.averageRating.toFixed(1) },
      ],
    },
    {
      id: id(),
      accent: "emerald",
      variant: "personality",
      kicker: "YOUR READING PERSONALITY",
      headline: personality.title,
      body: personality.blurb,
    },
    {
      id: id(),
      accent: "emerald",
      variant: "share",
      kicker: "THAT'S A WRAP",
      headline: "Share your year",
      body: "Download a card or copy your link.",
    },
  ];

  return {
    id: id(),
    source: "goodreads",
    isDemo,
    generatedAt: new Date().toISOString(),
    displayName: "Your",
    screens,
    shareStats: [
      { label: "Books", value: String(stats.booksRead) },
      { label: "Pages", value: stats.pagesRead.toLocaleString() },
      { label: "Personality", value: personality.title },
    ],
  };
}
