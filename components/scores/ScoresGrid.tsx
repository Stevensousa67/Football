"use client"

import { useState, useMemo, useRef, useEffect, useTransition } from "react"
import { useRouter, usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Globe, CalendarDays, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { ScoreCard } from "./ScoreCard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { ParsedGame, GameTournament } from "@/lib/espn"

// ── Constants ─────────────────────────────────────────────────────────────────

const CONTINENT_OPTIONS = [
  { value: "all",       label: "All Continents" },
  { value: "world-cup", label: "World Cup / FIFA" },
  { value: "conmebol",  label: "South America" },
  { value: "europe",    label: "Europe" },
  { value: "concacaf",  label: "CONCACAF" },
  { value: "africa",    label: "Africa" },
  { value: "asia",      label: "Asia" },
] as const

const CURRENT_YEAR = new Date().getFullYear()
const SEASON_OPTIONS = [
  { value: "current", label: "Current Season" },
  ...Array.from({ length: 6 }, (_, i) => ({
    value: String(CURRENT_YEAR - i),
    label: `${CURRENT_YEAR - i} Season`,
  })),
]

// ── Sub-components ────────────────────────────────────────────────────────────

function TournamentFilterBar({
  tournaments,
  selected,
  onSelect,
}: {
  tournaments: GameTournament[]
  selected: string | null
  onSelect: (slug: string | null) => void
}) {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={scrollRef}
      className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none"
      style={{ WebkitOverflowScrolling: "touch" }}
      role="group"
      aria-label="Filter by tournament"
    >
      <Button
        variant={selected === null ? "default" : "outline"}
        size="sm"
        onClick={() => onSelect(null)}
        className="rounded-full shrink-0 h-8 px-4 text-xs font-medium transition-all duration-200"
        aria-pressed={selected === null}
      >
        All
      </Button>

      {tournaments.map((t) => (
        <Button
          key={t.slug}
          variant={selected === t.slug ? "default" : "outline"}
          size="sm"
          onClick={() => onSelect(t.slug)}
          className="rounded-full shrink-0 h-8 px-4 text-xs font-medium gap-1.5 transition-all duration-200"
          aria-pressed={selected === t.slug}
        >
          {t.flag && <span aria-hidden="true">{t.flag}</span>}
          {t.shortName}
        </Button>
      ))}
    </div>
  )
}

function EmptyState({ type }: { type: "results" | "fixtures" }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <p className="text-sm font-medium text-muted-foreground">
        {type === "results" ? "No recent results" : "No upcoming fixtures"}
      </p>
      <p className="text-xs text-muted-foreground/60 mt-1">Check back soon for match updates.</p>
    </div>
  )
}

const GRID_VARIANTS = {
  hidden: {},
  show: { transition: { staggerChildren: 0.035 } },
}

// ── ScoresGrid ────────────────────────────────────────────────────────────────

interface ScoresGridProps {
  games: ParsedGame[]
  initialLeague?: string
  continent: string
  season: string
}

export function ScoresGrid({ games, initialLeague, continent, season }: ScoresGridProps) {
  const router  = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()
  const [selectedLeague, setSelectedLeague] = useState<string | null>(initialLeague ?? null)

  // Reset tournament pill when continent or season changes (games set changes entirely)
  useEffect(() => {
    setSelectedLeague(null)
  }, [continent, season])

  const tournaments = useMemo(() => {
    const seen = new Set<string>()
    const list: GameTournament[] = []
    for (const g of games) {
      if (g.tournament && !seen.has(g.tournament.slug)) {
        seen.add(g.tournament.slug)
        list.push(g.tournament)
      }
    }
    return list
  }, [games])

  const filtered = useMemo(
    () => (selectedLeague ? games.filter((g) => g.tournament?.slug === selectedLeague) : games),
    [games, selectedLeague],
  )

  const live     = filtered.filter((g) => g.status.state === "in")
  const results  = filtered.filter((g) => g.status.state === "post")
  const fixtures = filtered.filter((g) => g.status.state === "pre")

  const defaultTab     = live.length > 0 || results.length > 0 ? "results" : "fixtures"
  const resultsSorted  = [...live, ...results].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  const fixturesSorted = fixtures.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  function navigate(nextContinent: string, nextSeason: string) {
    const params = new URLSearchParams()
    if (nextContinent !== "all") params.set("continent", nextContinent)
    if (nextSeason !== "current") params.set("season", nextSeason)
    const qs = params.size ? `?${params}` : ""
    startTransition(() => router.push(`${pathname}${qs}`))
  }

  return (
    <div className={cn("space-y-0 transition-opacity duration-300", isPending && "opacity-50 pointer-events-none")}>
      <Tabs defaultValue={defaultTab}>

        {/* ── Row 1: Tabs + filter selects ─────────────────────────────── */}
        <div className="flex flex-col gap-3 pb-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Results / Fixtures toggle */}
          <TabsList className="rounded-full p-1 h-auto bg-muted/40 border border-border/50 w-fit">
            <TabsTrigger value="results" className="rounded-full gap-1.5 text-sm">
              Results
              <Badge
                variant="secondary"
                className="size-5 p-0 flex items-center justify-center text-[10px] font-bold rounded-full"
              >
                {live.length + results.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="fixtures" className="rounded-full gap-1.5 text-sm">
              Fixtures
              <Badge
                variant="secondary"
                className="size-5 p-0 flex items-center justify-center text-[10px] font-bold rounded-full"
              >
                {fixtures.length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          {/* Continent + Season selects */}
          <div className="flex items-center gap-2 shrink-0">
            {isPending && (
              <Loader2 className="size-3.5 shrink-0 animate-spin text-muted-foreground" aria-label="Loading" />
            )}

            {/* Season */}
            <Select
              value={season}
              onValueChange={(val: string | null) => val && navigate(continent, val)}
            >
              <SelectTrigger size="sm" className="gap-1.5 min-w-[148px] cursor-pointer">
                <CalendarDays className="size-3.5 shrink-0 text-muted-foreground" />
                <SelectValue placeholder="Season" />
              </SelectTrigger>
              <SelectContent align="end">
                {SEASON_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Continent */}
            <Select
              value={continent}
              onValueChange={(val: string | null) => val && navigate(val, season)}
            >
              <SelectTrigger size="sm" className="gap-1.5 min-w-[160px] cursor-pointer">
                <Globe className="size-3.5 shrink-0 text-muted-foreground" />
                <SelectValue placeholder="All Continents" />
              </SelectTrigger>
              <SelectContent align="end">
                {CONTINENT_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* ── Row 2: Tournament pills ───────────────────────────────────── */}
        {tournaments.length > 1 && (
          <div className="pb-4">
            <TournamentFilterBar
              tournaments={tournaments}
              selected={selectedLeague}
              onSelect={setSelectedLeague}
            />
          </div>
        )}

        {/* ── Tab content ───────────────────────────────────────────────── */}
        <TabsContent value="results">
          {resultsSorted.length === 0 ? (
            <EmptyState type="results" />
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedLeague ?? "all"}
                variants={GRID_VARIANTS}
                initial="hidden"
                animate="show"
                className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
              >
                {resultsSorted.map((game, i) => (
                  <ScoreCard key={game.id} game={game} index={i} />
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </TabsContent>

        <TabsContent value="fixtures">
          {fixturesSorted.length === 0 ? (
            <EmptyState type="fixtures" />
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedLeague ?? "all"}
                variants={GRID_VARIANTS}
                initial="hidden"
                animate="show"
                className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
              >
                {fixturesSorted.map((game, i) => (
                  <ScoreCard key={game.id} game={game} index={i} />
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
