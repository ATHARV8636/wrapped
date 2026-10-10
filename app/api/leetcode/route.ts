import { NextRequest, NextResponse } from "next/server";
import { fetchLeetCodeStats, LeetCodeFetchError } from "@/lib/leetcode";

export async function GET(req: NextRequest) {
  const username = req.nextUrl.searchParams.get("username")?.trim();

  if (!username) {
    return NextResponse.json({ error: "Missing username." }, { status: 400 });
  }

  if (!/^[a-zA-Z0-9_-]{1,32}$/.test(username)) {
    return NextResponse.json(
      { error: "That doesn't look like a valid LeetCode username." },
      { status: 400 }
    );
  }

  try {
    const stats = await fetchLeetCodeStats(username);
    return NextResponse.json(stats);
  } catch (err) {
    if (err instanceof LeetCodeFetchError) {
      return NextResponse.json({ error: err.message }, { status: 502 });
    }
    return NextResponse.json(
      { error: "Something went wrong talking to LeetCode." },
      { status: 500 }
    );
  }
}
