// ============================================================================
// ESPN types, parsers, and utilities.
// All external ESPN fetch calls live in app/api/espn/_client.ts.
// ============================================================================

// ─── Raw ESPN Types ───────────────────────────────────────────────────────────

export interface ESPNTeam {
  id: string
  displayName: string
  shortDisplayName?: string
  abbreviation?: string
  name?: string
  logos?: Array<{ href: string; width?: number; height?: number }>
  logo?: string
  color?: string
}

export interface ESPNStat {
  name: string
  value: number | string
  displayValue?: string
  shortDisplayName?: string
}

export interface ESPNStandingsEntry {
  team: ESPNTeam
  stats: ESPNStat[]
}

export interface ESPNStandingsData {
  name?: string
  season?: { year: number; displayName?: string }
  children?: Array<{
    name?: string
    standings?: { entries: ESPNStandingsEntry[] }
  }>
}

export interface ESPNCompetitor {
  id: string
  homeAway: "home" | "away"
  score?: string
  winner?: boolean
  team: ESPNTeam
}

export interface ESPNCompetitionStatus {
  clock?: number
  displayClock?: string
  period?: number
  type: {
    id: string
    name: string
    state: "pre" | "in" | "post"
    completed: boolean
    description: string
    detail: string
    shortDetail: string
  }
}

export interface ESPNCompetition {
  id: string
  date: string
  status: ESPNCompetitionStatus
  competitors: ESPNCompetitor[]
  venue?: {
    fullName: string
    address?: { city?: string; country?: string }
  }
  broadcasts?: Array<{ names: string[] }>
}

export interface ESPNEvent {
  id: string
  date: string
  name: string
  shortName: string
  season?: { year?: number; slug?: string }
  competitions: ESPNCompetition[]
}

export interface ESPNScoreboardData {
  leagues?: Array<{
    id: string
    name: string
    season?: { year: number }
    logos?: Array<{ href: string }>
  }>
  events?: ESPNEvent[]
}

export interface ESPNArticle {
  id: string
  type?: string
  headline: string
  description?: string
  published?: string
  images?: Array<{ url: string; alt?: string; width?: number; height?: number }>
  links?: { web?: { href: string }; mobile?: { href: string } }
  categories?: Array<{ description?: string }>
}

export interface ESPNNewsData {
  header?: string
  articles?: ESPNArticle[]
}

// ─── Parsed / transformed types ───────────────────────────────────────────────

export interface StandingRow {
  rank: number
  teamId: string
  teamName: string
  teamAbbr: string
  teamLogo: string
  points: number
  gamesPlayed: number
  wins: number
  draws: number
  losses: number
  goalsFor: number
  goalsAgainst: number
  goalDiff: number
}

export interface GameTournament {
  slug: string
  name: string
  shortName: string
  flag?: string
}

export interface ParsedGame {
  id: string
  date: string
  homeTeam: { id: string; name: string; abbr: string; logo: string; score?: string }
  awayTeam: { id: string; name: string; abbr: string; logo: string; score?: string }
  status: { state: "pre" | "in" | "post"; description: string; detail: string; shortDetail: string }
  venue?: string
  venueCity?: string
  tournament?: GameTournament
  /** Season phase slug from ESPN (e.g. "group-stage", "quarter-final"). Null for league-format seasons. */
  seasonSlug?: string
}

// ─── Data transformers ────────────────────────────────────────────────────────

export function parseStandings(data: ESPNStandingsData): StandingRow[] {
  const entries = data.children?.[0]?.standings?.entries ?? []

  return entries
    .map((entry) => {
      const s = (name: string) => {
        const stat = entry.stats.find((x) => x.name === name)
        if (!stat) return 0
        return typeof stat.value === "number" ? stat.value : Number(stat.value) || 0
      }
      const logo =
        entry.team.logos?.[0]?.href ??
        entry.team.logo ??
        ""

      return {
        rank: s("rank"),
        teamId: entry.team.id,
        teamName: entry.team.displayName ?? entry.team.name ?? "Unknown",
        teamAbbr: entry.team.abbreviation ?? "",
        teamLogo: logo,
        points: s("points"),
        gamesPlayed: s("gamesPlayed"),
        wins: s("wins"),
        draws: s("ties"),
        losses: s("losses"),
        goalsFor: s("pointsFor"),
        goalsAgainst: s("pointsAgainst"),
        goalDiff: s("pointDifferential"),
      } satisfies StandingRow
    })
    .sort((a, b) => a.rank - b.rank)
}

export function parseGames(data: ESPNScoreboardData, tournament?: GameTournament): ParsedGame[] {
  return (data.events ?? []).map((event) => {
    const comp = event.competitions[0]
    const home = comp.competitors.find((c) => c.homeAway === "home") ?? comp.competitors[0]
    const away = comp.competitors.find((c) => c.homeAway === "away") ?? comp.competitors[1]

    const teamFor = (c: ESPNCompetitor) => ({
      id: c.team.id,
      name: c.team.displayName ?? c.team.name ?? "",
      abbr: c.team.abbreviation ?? c.team.shortDisplayName ?? "",
      logo: c.team.logos?.[0]?.href ?? c.team.logo ?? "",
      score: c.score,
    })

    return {
      id: event.id,
      date: event.date,
      homeTeam: teamFor(home),
      awayTeam: teamFor(away),
      status: {
        state: comp.status.type.state,
        description: comp.status.type.description,
        detail: comp.status.type.detail,
        shortDetail: comp.status.type.shortDetail,
      },
      venue: comp.venue?.fullName,
      venueCity: comp.venue?.address?.city,
      tournament,
      seasonSlug: event.season?.slug,
    } satisfies ParsedGame
  })
}

// ─── Date helpers ─────────────────────────────────────────────────────────────

function pad(n: number) {
  return String(n).padStart(2, "0")
}

function fmtDate(d: Date) {
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`
}

export function buildDateRange(daysBack = 7, daysForward = 7): string {
  const now = new Date()
  const start = new Date(now.getTime() - daysBack * 86_400_000)
  const end = new Date(now.getTime() + daysForward * 86_400_000)
  return `${fmtDate(start)}-${fmtDate(end)}`
}

export function isToday(dateStr: string): boolean {
  const d = new Date(dateStr)
  const now = new Date()
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  )
}
