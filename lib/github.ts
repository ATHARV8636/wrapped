import { GithubStats } from "./types";

const GITHUB_API = "https://api.github.com";

function authHeaders(): HeadersInit {
  const token = process.env.GITHUB_TOKEN;
  return {
    Accept: "application/vnd.github+json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export class GithubFetchError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export async function fetchGithubStats(username: string): Promise<GithubStats> {
  const userRes = await fetch(`${GITHUB_API}/users/${encodeURIComponent(username)}`, {
    headers: authHeaders(),
    next: { revalidate: 3600 },
  });

  if (userRes.status === 404) {
    throw new GithubFetchError(`No GitHub user named "${username}" was found.`, 404);
  }
  if (userRes.status === 403) {
    throw new GithubFetchError(
      "GitHub's API rate limit was hit. Try again in a few minutes, or use Demo Mode.",
      403
    );
  }
  if (!userRes.ok) {
    throw new GithubFetchError("GitHub's API is unavailable right now.", userRes.status);
  }

  const user = await userRes.json();

  const reposRes = await fetch(
    `${GITHUB_API}/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`,
    { headers: authHeaders(), next: { revalidate: 3600 } }
  );

  if (!reposRes.ok) {
    throw new GithubFetchError("Could not load repositories for this user.", reposRes.status);
  }

  const repos: any[] = await reposRes.json();

  const languageTotals: Record<string, number> = {};
  let totalStars = 0;
  let totalForks = 0;
  let reposCreatedThisYear = 0;
  const currentYear = new Date().getFullYear();

  let topRepo: GithubStats["topRepo"] = null;

  for (const repo of repos) {
    totalStars += repo.stargazers_count ?? 0;
    totalForks += repo.forks_count ?? 0;

    if (repo.language) {
      languageTotals[repo.language] = (languageTotals[repo.language] ?? 0) + 1;
    }

    const createdYear = new Date(repo.created_at).getFullYear();
    if (createdYear === currentYear) reposCreatedThisYear += 1;

    if (!topRepo || (repo.stargazers_count ?? 0) > topRepo.stars) {
      topRepo = {
        name: repo.name,
        stars: repo.stargazers_count ?? 0,
        forks: repo.forks_count ?? 0,
        description: repo.description ?? "",
        language: repo.language ?? "—",
      };
    }
  }

  const languageBreakdown = Object.entries(languageTotals)
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 7);

  const topLanguage = languageBreakdown[0]?.label ?? "—";

  return {
    username: user.login,
    avatarUrl: user.avatar_url,
    publicRepos: user.public_repos ?? repos.length,
    followers: user.followers ?? 0,
    following: user.following ?? 0,
    totalStars,
    totalForks,
    topLanguage,
    languageBreakdown,
    topRepo,
    reposCreatedThisYear,
    accountCreated: user.created_at,
  };
}
