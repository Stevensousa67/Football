import { NextRequest, NextResponse } from "next/server"
import { fetchScoreboard } from "@/app/api/espn/_client"
import { parseGames, buildDateRange } from "@/lib/espn"
import { TOURNAMENTS, type TournamentGroup } from "@/lib/tournaments"

function resolveDateRange(season: string | null, dates: string | null): string {
  if (dates) return dates
  if (season && season !== "current") return `${season}0101-${season}1231`
  return buildDateRange(14, 14)
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const continent = searchParams.get("continent") as TournamentGroup | "all" | null
  const season    = searchParams.get("season")
  const dates     = resolveDateRange(season, searchParams.get("dates"))

  const leagues = TOURNAMENTS.filter((t) => {
    if (!t.hasScoreboard) return false
    if (continent && continent !== "all") return t.group === continent
    return true
  })

  const settled = await Promise.allSettled(
    leagues.map((t) => fetchScoreboard(t.slug, dates))
  )

  const games = settled.flatMap((result, i) => {
    if (result.status === "rejected") return []
    const t = leagues[i]
    return parseGames(result.value, { slug: t.slug, name: t.name, shortName: t.shortName, flag: t.flag })
  })

  return NextResponse.json({ games })
}
