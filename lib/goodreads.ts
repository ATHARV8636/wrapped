import Papa from "papaparse";
import { GoodreadsStats } from "./types";

export class GoodreadsParseError extends Error {}

interface RawRow {
  Title?: string;
  Author?: string;
  "My Rating"?: string;
  "Number of Pages"?: string;
  "Date Read"?: string;
  "Exclusive Shelf"?: string;
}

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export function parseGoodreadsCsv(fileText: string): GoodreadsStats {
  const parsed = Papa.parse<RawRow>(fileText, {
    header: true,
    skipEmptyLines: true,
  });

  if (parsed.errors.length && (!parsed.data || parsed.data.length === 0)) {
    throw new GoodreadsParseError(
      "This file couldn't be read as a Goodreads export. Make sure you're uploading the CSV from Goodreads > My Books > Export Library."
    );
  }

  const rows = (parsed.data ?? []).filter(
    (r) => r.Title && (!r["Exclusive Shelf"] || r["Exclusive Shelf"] === "read")
  );

  if (rows.length === 0) {
    throw new GoodreadsParseError(
      "No completed books were found in this file. Books need an 'Exclusive Shelf' value of 'read'."
    );
  }

  let pagesRead = 0;
  let ratingSum = 0;
  let ratingCount = 0;
  const authorCounts: Record<string, number> = {};
  const monthCounts: Record<string, number> = Object.fromEntries(MONTHS.map((m) => [m, 0]));
  let highestRated: { title: string; rating: number } | null = null;
  let longest: { title: string; pages: number } | null = null;
  let shortest: { title: string; pages: number } | null = null;

  for (const row of rows) {
    const pages = parseInt(row["Number of Pages"] ?? "", 10);
    if (!Number.isNaN(pages) && pages > 0) {
      pagesRead += pages;
      if (!longest || pages > longest.pages) longest = { title: row.Title!, pages };
      if (!shortest || pages < shortest.pages) shortest = { title: row.Title!, pages };
    }

    const rating = parseInt(row["My Rating"] ?? "", 10);
    if (!Number.isNaN(rating) && rating > 0) {
      ratingSum += rating;
      ratingCount += 1;
      if (!highestRated || rating > highestRated.rating) {
        highestRated = { title: row.Title!, rating };
      }
    }

    if (row.Author) {
      authorCounts[row.Author] = (authorCounts[row.Author] ?? 0) + 1;
    }

    const dateRead = row["Date Read"];
    if (dateRead) {
      const d = new Date(dateRead);
      if (!Number.isNaN(d.getTime())) {
        const m = MONTHS[d.getMonth()];
        monthCounts[m] += 1;
      }
    }
  }

  const mostReadAuthor =
    Object.entries(authorCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "—";

  return {
    booksRead: rows.length,
    pagesRead,
    averageRating: ratingCount ? ratingSum / ratingCount : 0,
    highestRatedBook: highestRated?.title ?? rows[0].Title ?? "—",
    mostReadAuthor,
    longestBook: longest,
    shortestBook: shortest,
    booksByMonth: MONTHS.map((m) => ({ label: m, value: monthCounts[m] })),
  };
}
