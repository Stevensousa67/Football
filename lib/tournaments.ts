// ============================================================================
// Tournament Configuration
// Scalable registry of all supported ESPN soccer competitions.
// To add a new league: append an entry to TOURNAMENTS and it becomes
// available everywhere in the app automatically.
// ============================================================================

export type TournamentGroup =
  | "world-cup"
  | "conmebol"
  | "europe"
  | "concacaf"
  | "africa"
  | "asia"

export type ZoneColor = "emerald" | "green" | "amber" | "orange" | "blue" | "red" | "purple"

export interface QualificationZone {
  start: number       // first position in zone (inclusive)
  end: number         // last position in zone (inclusive)
  label: string       // full zone label
  shortLabel: string  // abbreviated
  color: ZoneColor
}

export interface Tournament {
  slug: string        // ESPN API league slug
  name: string        // Full display name
  shortName: string   // Abbreviated display name
  group: TournamentGroup
  flag?: string       // Emoji flag / icon
  season?: string     // Current active season year (e.g. "2025")
  hasStandings?: boolean
  hasScoreboard?: boolean
  hasNews?: boolean
  zones?: QualificationZone[]
}

// Maps ZoneColor → complete Tailwind class strings (never dynamically constructed)
export const ZONE_CLASSES: Record<ZoneColor, { badge: string; dot: string }> = {
  emerald: {
    badge: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
    dot: "bg-emerald-500",
  },
  green: {
    badge: "bg-green-500/10 text-green-700 dark:text-green-400",
    dot: "bg-green-500",
  },
  amber: {
    badge: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
    dot: "bg-amber-500",
  },
  orange: {
    badge: "bg-orange-500/15 text-orange-700 dark:text-orange-400",
    dot: "bg-orange-500",
  },
  blue: {
    badge: "bg-blue-500/15 text-blue-700 dark:text-blue-400",
    dot: "bg-blue-500",
  },
  red: {
    badge: "bg-red-500/15 text-red-700 dark:text-red-400",
    dot: "bg-red-500",
  },
  purple: {
    badge: "bg-purple-500/15 text-purple-700 dark:text-purple-400",
    dot: "bg-purple-500",
  },
}

export function getZone(position: number, zones?: QualificationZone[]): QualificationZone | null {
  if (!zones) return null
  return zones.find((z) => position >= z.start && position <= z.end) ?? null
}

export const TOURNAMENT_GROUPS: Record<TournamentGroup, { label: string; order: number }> = {
  "world-cup": { label: "World Cup", order: 0 },
  "conmebol":  { label: "CONMEBOL",  order: 1 },
  "europe":    { label: "Europe",    order: 2 },
  "concacaf":  { label: "CONCACAF",  order: 3 },
  "africa":    { label: "Africa",    order: 4 },
  "asia":      { label: "Asia",      order: 5 },
}

export const TOURNAMENTS: Tournament[] = [
  // ── World Cup ─────────────────────────────────────────────────────────────
  {
    slug: "fifa.world",
    name: "FIFA World Cup",
    shortName: "World Cup",
    group: "world-cup",
    flag: "🌍",
    hasStandings: true,
    hasScoreboard: true,
    hasNews: true,
  },
  {
    slug: "fifa.worldq.conmebol",
    name: "WC Qualifying — CONMEBOL",
    shortName: "WCQ CONMEBOL",
    group: "world-cup",
    flag: "🌎",
    hasStandings: true,
    hasScoreboard: true,
    hasNews: true,
  },

  // ── CONMEBOL Continental ──────────────────────────────────────────────────
  {
    slug: "conmebol.libertadores",
    name: "Copa Libertadores",
    shortName: "Libertadores",
    group: "conmebol",
    flag: "🏆",
    hasStandings: true,
    hasScoreboard: true,
    hasNews: true,
  },
  {
    slug: "conmebol.sudamericana",
    name: "Copa Sudamericana",
    shortName: "Sudamericana",
    group: "conmebol",
    flag: "🏅",
    hasStandings: true,
    hasScoreboard: true,
    hasNews: true,
  },
  {
    slug: "conmebol.america",
    name: "Copa América",
    shortName: "Copa América",
    group: "conmebol",
    flag: "🌎",
    hasStandings: true,
    hasScoreboard: true,
    hasNews: true,
  },
  {
    slug: "conmebol.recopa",
    name: "Recopa Sudamericana",
    shortName: "Recopa",
    group: "conmebol",
    flag: "⭐",
    hasScoreboard: true,
  },

  // ── CONMEBOL National Leagues ─────────────────────────────────────────────
  // {
  //   slug: "arg.1",
  //   name: "Argentine Liga Profesional",
  //   shortName: "Liga Pro ARG",
  //   group: "conmebol",
  //   flag: "🇦🇷",
  //   season: "2025",
  //   hasStandings: true,
  //   hasScoreboard: true,
  //   hasNews: true,
  // },
  {
    slug: "bra.1",
    name: "Brazilian Série A",
    shortName: "Brasileirão",
    group: "conmebol",
    flag: "🇧🇷",
    season: "2026",
    hasStandings: true,
    hasScoreboard: true,
    hasNews: true,
    zones: [
      { start: 1,  end: 4,  label: "Copa Libertadores",            shortLabel: "Libertadores", color: "emerald" },
      { start: 5,  end: 6,  label: "Copa Libertadores (Playoffs)", shortLabel: "Lib. (Q)",     color: "green"   },
      { start: 7,  end: 12, label: "Copa Sudamericana",            shortLabel: "Sudamericana", color: "amber"   },
      { start: 17, end: 20, label: "Relegation",                   shortLabel: "Relegation",   color: "red"     },
    ],
  },
  // {
  //   slug: "chi.1",
  //   name: "Chilean Primera División",
  //   shortName: "Primera CHL",
  //   group: "conmebol",
  //   flag: "🇨🇱",
  //   hasStandings: true,
  //   hasScoreboard: true,
  // },
  // {
  //   slug: "col.1",
  //   name: "Colombian Primera A",
  //   shortName: "Liga COL",
  //   group: "conmebol",
  //   flag: "🇨🇴",
  //   hasStandings: true,
  //   hasScoreboard: true,
  // },
  // {
  //   slug: "par.1",
  //   name: "Paraguayan Primera División",
  //   shortName: "Primera PAR",
  //   group: "conmebol",
  //   flag: "🇵🇾",
  //   hasStandings: true,
  //   hasScoreboard: true,
  // },
  // {
  //   slug: "per.1",
  //   name: "Peruvian Liga 1",
  //   shortName: "Liga 1 PER",
  //   group: "conmebol",
  //   flag: "🇵🇪",
  //   hasStandings: true,
  //   hasScoreboard: true,
  // },
  // {
  //   slug: "uru.1",
  //   name: "Liga AUF Uruguaya",
  //   shortName: "Liga URU",
  //   group: "conmebol",
  //   flag: "🇺🇾",
  //   hasStandings: true,
  //   hasScoreboard: true,
  // },
  // {
  //   slug: "bol.1",
  //   name: "Bolivian Liga Profesional",
  //   shortName: "Liga BOL",
  //   group: "conmebol",
  //   flag: "🇧🇴",
  //   hasStandings: true,
  //   hasScoreboard: true,
  // },
  // {
  //   slug: "ecu.1",
  //   name: "LigaPro Ecuador",
  //   shortName: "LigaPro ECU",
  //   group: "conmebol",
  //   flag: "🇪🇨",
  //   hasStandings: true,
  //   hasScoreboard: true,
  // },
  // {
  //   slug: "ven.1",
  //   name: "Venezuelan Primera División",
  //   shortName: "Primera VEN",
  //   group: "conmebol",
  //   flag: "🇻🇪",
  //   hasStandings: true,
  //   hasScoreboard: true,
  // },

  // ── Europe (add when ready — just uncomment) ──────────────────────────────
  // { slug: "eng.1", name: "English Premier League", shortName: "Premier League", group: "europe", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", hasStandings: true, hasScoreboard: true, hasNews: true },
  // { slug: "esp.1", name: "Spanish LALIGA",          shortName: "LaLiga",         group: "europe", flag: "🇪🇸", hasStandings: true, hasScoreboard: true, hasNews: true },
  // { slug: "ger.1", name: "German Bundesliga",        shortName: "Bundesliga",     group: "europe", flag: "🇩🇪", hasStandings: true, hasScoreboard: true, hasNews: true },
  // { slug: "ita.1", name: "Italian Serie A",          shortName: "Serie A",        group: "europe", flag: "🇮🇹", hasStandings: true, hasScoreboard: true, hasNews: true },
  // { slug: "fra.1", name: "French Ligue 1",           shortName: "Ligue 1",        group: "europe", flag: "🇫🇷", hasStandings: true, hasScoreboard: true, hasNews: true },
]

// ── Helpers ────────────────────────────────────────────────────────────────

export function getTournamentsByGroup(group: TournamentGroup): Tournament[] {
  return TOURNAMENTS.filter((t) => t.group === group)
}

export function getTournamentBySlug(slug: string): Tournament | undefined {
  return TOURNAMENTS.find((t) => t.slug === slug)
}

export function getTournamentGroups(): TournamentGroup[] {
  const groups = [...new Set(TOURNAMENTS.map((t) => t.group))]
  return groups.sort(
    (a, b) => TOURNAMENT_GROUPS[a].order - TOURNAMENT_GROUPS[b].order,
  )
}

export const DEFAULT_TOURNAMENT = TOURNAMENTS[0]
