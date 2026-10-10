import { GithubStats, GoodreadsStats, LeetCodeStats } from "./types";

export function githubPersonality(stats: GithubStats): {
  title: string;
  blurb: string;
} {
  const langCount = stats.languageBreakdown.length;
  if (stats.totalStars > 200) {
    return {
      title: "The Builder",
      blurb: `Your projects earned ${stats.totalStars} stars this year — people don't just use what you build, they follow it.`,
    };
  }
  if (langCount >= 6) {
    return {
      title: "The Explorer",
      blurb: `You wrote real code in ${langCount} different languages. Most people pick a lane — you built a map.`,
    };
  }
  if (stats.reposCreatedThisYear >= 8) {
    return {
      title: "The Consistent Coder",
      blurb: `${stats.reposCreatedThisYear} new repositories this year. Shipping isn't a phase for you, it's a habit.`,
    };
  }
  if (stats.followers > stats.following * 2 && stats.followers > 20) {
    return {
      title: "The Open Source Anchor",
      blurb: `${stats.followers} people follow your work. You've become someone others build on.`,
    };
  }
  return {
    title: "The Steady Hand",
    blurb: `Quiet, deliberate progress across ${stats.publicRepos} repositories. Not every builder needs an audience.`,
  };
}

export function leetcodePersonality(stats: LeetCodeStats): {
  title: string;
  blurb: string;
} {
  const hardRatio = stats.totalSolved ? stats.hardSolved / stats.totalSolved : 0;
  const mediumRatio = stats.totalSolved ? stats.mediumSolved / stats.totalSolved : 0;
  if (hardRatio > 0.2) {
    return {
      title: "Hard Mode Hero",
      blurb: `${stats.hardSolved} hard problems solved. You don't warm up — you go straight for the ones that push back.`,
    };
  }
  if (mediumRatio > 0.5) {
    return {
      title: "Medium Master",
      blurb: `The bulk of your ${stats.totalSolved} solves sit right in the medium tier — the zone where real interview prep happens.`,
    };
  }
  if (stats.totalSolved > 300) {
    return {
      title: "Consistency King",
      blurb: `${stats.totalSolved} problems solved is a volume game, and you've clearly been playing it all year.`,
    };
  }
  return {
    title: "Beginner Breaker",
    blurb: `${stats.totalSolved} problems in, and the foundation is set. Every algorithm master started exactly here.`,
  };
}

export function goodreadsPersonality(stats: GoodreadsStats): {
  title: string;
  blurb: string;
} {
  const avgPages = stats.booksRead ? stats.pagesRead / stats.booksRead : 0;
  if (stats.booksRead > 40) {
    return {
      title: "The Speed Reader",
      blurb: `${stats.booksRead} books this year — that's roughly one every nine days.`,
    };
  }
  if (avgPages > 400) {
    return {
      title: "The Deep Diver",
      blurb: `Averaging ${Math.round(avgPages)} pages per book, you don't skim — you live in these worlds for a while.`,
    };
  }
  if (stats.averageRating >= 4.3) {
    return {
      title: "The Curator",
      blurb: `An average rating of ${stats.averageRating.toFixed(1)} stars means you pick carefully, and it shows.`,
    };
  }
  return {
    title: "The Explorer",
    blurb: `${stats.booksRead} books across a wide spread of authors — you read to wander, not to stay in one lane.`,
  };
}
