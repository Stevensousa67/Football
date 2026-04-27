import { getTournamentBySlug } from "@/lib/tournaments"
import { getBaseUrl } from "@/lib/baseUrl"
import { LeagueHeader } from "@/components/shared/LeagueHeader"
import { StandingsTable } from "@/components/standings/StandingsTable"
import { notFound } from "next/navigation"
import type { StandingRow } from "@/lib/espn"

interface Props {
  searchParams: Promise<{ league?: string }>
}

export async function generateMetadata({ searchParams }: Props) {
  const { league = "bra.1" } = await searchParams
  const tournament = getTournamentBySlug(league)
  return {
    title: tournament ? `${tournament.name} Standings` : "Standings",
  }
}

export default async function StandingsPage({ searchParams }: Props) {
  const { league = "bra.1" } = await searchParams
  const tournament = getTournamentBySlug(league)

  if (!tournament || !tournament.hasStandings) notFound()

  const params = new URLSearchParams({ league })
  if (tournament.season) params.set("season", tournament.season)

  const res = await fetch(`${getBaseUrl()}/api/espn/standings?${params}`, {
    next: { revalidate: 300 },
  })
  const { rows } = (await res.json()) as { rows: StandingRow[] }

  return (
    <div className="py-8 space-y-6">
      <LeagueHeader
        tournament={tournament}
        subtitle={`${rows.length} clubs · ${tournament.season ?? ""} season`}
      />
      <StandingsTable rows={rows} zones={tournament.zones} />
    </div>
  )
}
