import { getBaseUrl } from "@/lib/baseUrl"
import { buildDateRange } from "@/lib/espn"
import { ScoresGrid } from "@/components/scores/ScoresGrid"
import type { ParsedGame } from "@/lib/espn"

export const metadata = { title: "Scores & Fixtures" }

interface Props {
  searchParams: Promise<{ league?: string; continent?: string; season?: string }>
}

export default async function ScoresPage({ searchParams }: Props) {
  const { league, continent, season } = await searchParams

  const params = new URLSearchParams()
  if (continent && continent !== "all") params.set("continent", continent)
  if (season && season !== "current") {
    params.set("season", season)
  } else {
    params.set("dates", buildDateRange(14, 14))
  }

  const res = await fetch(`${getBaseUrl()}/api/espn/scores?${params}`, {
    next: { revalidate: 60 },
  })
  const { games } = (await res.json()) as { games: ParsedGame[] }

  return (
    <div className="py-8 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Scores & Fixtures</h1>
        <p className="text-sm text-muted-foreground">
          Results and upcoming matches across all competitions
        </p>
      </div>

      <ScoresGrid
        games={games}
        initialLeague={league}
        continent={continent ?? "all"}
        season={season ?? "current"}
      />
    </div>
  )
}
