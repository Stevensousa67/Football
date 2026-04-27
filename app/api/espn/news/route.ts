import { NextRequest, NextResponse } from "next/server"
import { fetchNews } from "@/app/api/espn/_client"

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const league = searchParams.get("league")

  if (!league) {
    return NextResponse.json({ error: "Missing required param: league" }, { status: 400 })
  }

  try {
    const raw = await fetchNews(league)
    const articles = raw.articles ?? []
    return NextResponse.json({ articles })
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to fetch news"
    return NextResponse.json({ error: message }, { status: 502 })
  }
}
