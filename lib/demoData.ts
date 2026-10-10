import { GithubStats, GoodreadsStats, LeetCodeStats } from "./types";

export const demoGithub: GithubStats = {
  username: "demo-coder",
  avatarUrl: "https://avatars.githubusercontent.com/u/9919?v=4",
  publicRepos: 18,
  followers: 246,
  following: 58,
  totalStars: 342,
  totalForks: 71,
  topLanguage: "JavaScript",
  languageBreakdown: [
    { label: "JavaScript", value: 38 },
    { label: "TypeScript", value: 27 },
    { label: "Python", value: 14 },
    { label: "Go", value: 9 },
    { label: "Rust", value: 7 },
    { label: "CSS", value: 5 },
    { label: "Shell", value: 4 },
  ],
  topRepo: {
    name: "ExpenseFlow Lite",
    stars: 128,
    forks: 34,
    description: "A minimal, self-hosted budget tracker with zero external dependencies.",
    language: "TypeScript",
  },
  reposCreatedThisYear: 6,
  accountCreated: "2019-03-14",
};

export const demoLeetCode: LeetCodeStats = {
  username: "demo-coder",
  totalSolved: 335,
  easySolved: 120,
  mediumSolved: 180,
  hardSolved: 35,
  acceptanceRate: 61.4,
  ranking: 84213,
  isEstimated: false,
};

export const demoGoodreads: GoodreadsStats = {
  booksRead: 42,
  pagesRead: 14820,
  averageRating: 4.3,
  highestRatedBook: "Project Hail Mary",
  mostReadAuthor: "Brandon Sanderson",
  longestBook: { title: "The Way of Kings", pages: 1007 },
  shortestBook: { title: "The Little Prince", pages: 96 },
  booksByMonth: [
    { label: "Jan", value: 5 },
    { label: "Feb", value: 3 },
    { label: "Mar", value: 4 },
    { label: "Apr", value: 2 },
    { label: "May", value: 4 },
    { label: "Jun", value: 3 },
    { label: "Jul", value: 5 },
    { label: "Aug", value: 3 },
    { label: "Sep", value: 4 },
    { label: "Oct", value: 3 },
    { label: "Nov", value: 3 },
    { label: "Dec", value: 3 },
  ],
};
