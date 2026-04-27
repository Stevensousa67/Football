import { NextRequest, NextResponse } from "next/server"
import { fetchStandings } from "@/app/api/espn/_client"
import { parseStandings } from "@/lib/espn"

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const league = searchParams.get("league")
  const season = searchParams.get("season") ?? undefined

  if (!league) {
    return NextResponse.json({ error: "Missing required param: league" }, { status: 400 })
  }

  try {
    const raw = await fetchStandings(league, season)
    const rows = parseStandings(raw)
    return NextResponse.json({ rows })
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to fetch standings"
    return NextResponse.json({ error: message }, { status: 502 })
  }
}
