import { LeetCodeStats } from "./types";

export class LeetCodeFetchError extends Error {}

/**
 * LeetCode has no official public REST API. This uses the same unofficial
 * GraphQL endpoint the LeetCode website itself calls client-side. It can
 * change or block server-side requests without notice — if it fails, the
 * caller should fall back to Demo Mode rather than fabricate numbers.
 */
export async function fetchLeetCodeStats(username: string): Promise<LeetCodeStats> {
  const query = `
    query userStats($username: String!) {
      matchedUser(username: $username) {
        username
        submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
          }
        }
      }
      userContestRanking(username: $username) {
        rating
        globalRanking
      }
    }
  `;

  let res: Response;
  try {
    res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables: { username } }),
      next: { revalidate: 3600 },
    });
  } catch {
    throw new LeetCodeFetchError(
      "Could not reach LeetCode's servers. Try Demo Mode instead."
    );
  }

  if (!res.ok) {
    throw new LeetCodeFetchError(
      "LeetCode's data endpoint is unavailable right now. Try Demo Mode instead."
    );
  }

  const json = await res.json();
  const matchedUser = json?.data?.matchedUser;

  if (!matchedUser) {
    throw new LeetCodeFetchError(`No LeetCode user named "${username}" was found.`);
  }

  const counts: Record<string, number> = {};
  for (const entry of matchedUser.submitStatsGlobal?.acSubmissionNum ?? []) {
    counts[entry.difficulty] = entry.count;
  }

  const easySolved = counts["Easy"] ?? 0;
  const mediumSolved = counts["Medium"] ?? 0;
  const hardSolved = counts["Hard"] ?? 0;
  const totalSolved = counts["All"] ?? easySolved + mediumSolved + hardSolved;

  const ranking = json?.data?.userContestRanking?.globalRanking ?? null;

  return {
    username: matchedUser.username,
    totalSolved,
    easySolved,
    mediumSolved,
    hardSolved,
    acceptanceRate: null,
    ranking,
    isEstimated: false,
  };
}
