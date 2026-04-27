const SITE_API = "https://site.api.espn.com/apis/site/v2/sports/soccer"
const SITE_V2_API = "https://site.api.espn.com/apis/v2/sports/soccer"

async function espnFetch<T>(url: string, revalidate = 300): Promise<T> {
  const res = await fetch(url, { next: { revalidate } })
  if (!res.ok) throw new Error(`ESPN ${res.status}: ${url}`)
  return res.json() as Promise<T>
}

export function fetchStandings(league: string, season?: string) {
  const base = `${SITE_V2_API}/${league}/standings`
  return espnFetch<import("@/lib/espn").ESPNStandingsData>(
    season ? `${base}?season=${season}` : base,
    300,
  )
}

export function fetchScoreboard(league: string, dateRange?: string) {
  const base = `${SITE_API}/${league}/scoreboard`
  return espnFetch<import("@/lib/espn").ESPNScoreboardData>(
    dateRange ? `${base}?dates=${dateRange}` : base,
    60,
  )
}

export function fetchNews(league: string) {
  return espnFetch<import("@/lib/espn").ESPNNewsData>(`${SITE_API}/${league}/news`, 300)
}
