import { NextRequest, NextResponse } from "next/server";
import { fetchGithubStats, GithubFetchError } from "@/lib/github";

export async function GET(req: NextRequest) {
  const username = req.nextUrl.searchParams.get("username")?.trim();

  if (!username) {
    return NextResponse.json({ error: "Missing username." }, { status: 400 });
  }

  if (!/^[a-zA-Z0-9-]{1,39}$/.test(username)) {
    return NextResponse.json(
      { error: "That doesn't look like a valid GitHub username." },
      { status: 400 }
    );
  }

  try {
    const stats = await fetchGithubStats(username);
    return NextResponse.json(stats);
  } catch (err) {
    if (err instanceof GithubFetchError) {
      return NextResponse.json({ error: err.message }, { status: err.status || 502 });
    }
    return NextResponse.json(
      { error: "Something went wrong talking to GitHub." },
      { status: 500 }
    );
  }
}
