export type SourceKind = "github" | "leetcode" | "goodreads";

export interface StoryScreenData {
  id: string;
  kicker?: string;
  headline: string;
  value?: string | number;
  suffix?: string;
  body?: string;
  accent: "violet" | "amber" | "emerald";
  variant:
    | "intro"
    | "stat"
    | "list"
    | "personality"
    | "grid"
    | "summary"
    | "share";
  items?: { label: string; value: string | number }[];
  chart?: { label: string; value: number }[];
}

export interface WrappedPayload {
  id: string;
  source: SourceKind;
  isDemo: boolean;
  generatedAt: string;
  displayName: string;
  avatarUrl?: string;
  screens: StoryScreenData[];
  shareStats: { label: string; value: string }[];
}

export interface GithubStats {
  username: string;
  avatarUrl: string;
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
  totalForks: number;
  topLanguage: string;
  languageBreakdown: { label: string; value: number }[];
  topRepo: { name: string; stars: number; forks: number; description: string; language: string } | null;
  reposCreatedThisYear: number;
  accountCreated: string;
}

export interface LeetCodeStats {
  username: string;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  acceptanceRate: number | null;
  ranking: number | null;
  isEstimated: boolean;
}

export interface GoodreadsStats {
  booksRead: number;
  pagesRead: number;
  averageRating: number;
  highestRatedBook: string;
  mostReadAuthor: string;
  longestBook: { title: string; pages: number } | null;
  shortestBook: { title: string; pages: number } | null;
  booksByMonth: { label: string; value: number }[];
}
