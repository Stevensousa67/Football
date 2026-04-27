"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { MapPin, CalendarDays, Trophy } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { ParsedGame } from "@/lib/espn"

const MotionCard = motion.create(Card)

// ── Phase / round label ───────────────────────────────────────────────────────

const PHASE_MAP: Record<string, string> = {
  "group-stage":         "Group Stage",
  "round-of-64":         "Round of 64",
  "round-of-32":         "Round of 32",
  "round-of-16":         "Round of 16",
  "last-16":             "Round of 16",
  "quarter-final":       "Quarter-Final",
  "quarter-finals":      "Quarter-Final",
  "semi-final":          "Semi-Final",
  "semi-finals":         "Semi-Final",
  "third-place":         "3rd Place",
  "final":               "Final",
  "playoff":             "Playoff",
  "play-off":            "Play-off",
  "play-offs":           "Play-offs",
  "qualifying":          "Qualifying",
  "qualification":       "Qualifying",
  "preliminary-round":   "Preliminary Round",
  "first-round":         "1st Round",
  "second-round":        "2nd Round",
  "third-round":         "3rd Round",
  "fourth-round":        "4th Round",
}

/** Returns a human-readable round/phase label, or null for league-format season slugs. */
function formatPhase(slug?: string): string | null {
  if (!slug) return null
  // Suppress season-name slugs (contain a 4-digit year like "2026-brasileiro-serie-a")
  if (/\d{4}/.test(slug)) return null
  if (PHASE_MAP[slug]) return PHASE_MAP[slug]
  // Fallback: title-case the slug
  const label = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
  return label
}

// ── Sub-components ────────────────────────────────────────────────────────────

function StatusBadge({ state, detail }: { state: "pre" | "in" | "post"; detail: string }) {
  if (state === "in") {
    return (
      <Badge className="gap-1.5 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20">
        <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
        {detail}
      </Badge>
    )
  }
  if (state === "post") {
    return (
      <Badge variant="secondary" className="text-muted-foreground">
        {detail}
      </Badge>
    )
  }
  return (
    <Badge variant="outline" className="text-muted-foreground">
      {detail}
    </Badge>
  )
}

function TeamSide({
  team,
  isCompleted,
  isWinner,
}: {
  team: ParsedGame["homeTeam"]
  isCompleted: boolean
  isWinner?: boolean
}) {
  return (
    <div className="flex flex-col items-center gap-1.5 flex-1">
      {team.logo ? (
        <div className="relative size-12">
          <Image src={team.logo} alt={team.name} fill sizes="48px" className="object-contain" />
        </div>
      ) : (
        <div className="size-12 rounded-full bg-muted" />
      )}
      <span className={cn(
        "text-xs font-medium text-center leading-tight line-clamp-2 w-full",
        isWinner ? "text-foreground font-semibold" : "text-muted-foreground",
      )}>
        {team.name}
      </span>
      {isCompleted && (
        <span className={cn(
          "text-2xl font-bold tabular-nums leading-none",
          isWinner ? "text-foreground" : "text-muted-foreground",
        )}>
          {team.score ?? "–"}
        </span>
      )}
    </div>
  )
}

// ── ScoreCard ─────────────────────────────────────────────────────────────────

interface ScoreCardProps {
  game: ParsedGame
  index?: number
}

export function ScoreCard({ game, index = 0 }: ScoreCardProps) {
  const isCompleted = game.status.state === "post"
  const isLive      = game.status.state === "in"
  const homeWinner  = isCompleted && Number(game.homeTeam.score) > Number(game.awayTeam.score)
  const awayWinner  = isCompleted && Number(game.awayTeam.score) > Number(game.homeTeam.score)

  const matchDate = new Date(game.date)
  const timeStr   = matchDate.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })
  const dateShort = matchDate.toLocaleDateString(undefined, { month: "short", day: "numeric" })
  const dateFull  = matchDate.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric", year: "numeric" })

  const phase = formatPhase(game.seasonSlug)
  const hasFooter = !!(game.venue || (isCompleted && dateFull) || phase)

  return (
    <MotionCard
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, delay: index * 0.04, ease: "easeOut" }}
      className="border-border/60 bg-card/60 backdrop-blur-sm shadow-sm hover:shadow-md hover:border-border/80 transition-all duration-200 overflow-hidden rounded-2xl"
    >
      {/* Status + Tournament row */}
      <div className="px-4 pt-3.5 pb-0 flex items-center justify-between gap-2">
        <StatusBadge state={game.status.state} detail={game.status.shortDetail} />
        <div className="flex items-center gap-2 shrink-0">
          {!isCompleted && !isLive && (
            <span className="text-xs text-muted-foreground">{dateShort}</span>
          )}
          {game.tournament && (
            <Badge variant="outline" className="gap-1 text-[10px] font-medium text-muted-foreground shrink-0 py-0.5">
              {game.tournament.flag && <span aria-hidden="true">{game.tournament.flag}</span>}
              {game.tournament.shortName}
            </Badge>
          )}
        </div>
      </div>

      {/* Teams + score */}
      <CardContent className="px-4 pt-3 pb-3.5">
        <div className="flex items-start gap-2">
          <TeamSide team={game.homeTeam} isCompleted={isCompleted} isWinner={homeWinner} />

          <div className="flex flex-col items-center justify-center gap-1 pt-3 px-1 min-w-[44px]">
            {isCompleted ? (
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">vs</span>
            ) : (
              <>
                <span className="text-xs font-semibold text-muted-foreground">{timeStr}</span>
                <span className="text-[10px] text-muted-foreground/60">vs</span>
              </>
            )}
          </div>

          <TeamSide team={game.awayTeam} isCompleted={isCompleted} isWinner={awayWinner} />
        </div>
      </CardContent>

      {/* Footer: venue / date (FT) / round */}
      {hasFooter && (
        <CardFooter className="border-t border-border/30 px-4 py-2.5 flex flex-col items-start gap-1.5">
          {/* Venue row */}
          {game.venue && (
            <div className="flex items-center gap-1.5 w-full">
              <MapPin className="size-3 text-muted-foreground/60 shrink-0" />
              <span className="text-[11px] text-muted-foreground/70 truncate">
                {game.venueCity ? `${game.venue}, ${game.venueCity}` : game.venue}
              </span>
            </div>
          )}

          {/* Date row — only for completed games */}
          {isCompleted && (
            <div className="flex items-center gap-1.5 w-full">
              <CalendarDays className="size-3 text-muted-foreground/60 shrink-0" />
              <span className="text-[11px] text-muted-foreground/70">{dateFull}</span>
            </div>
          )}

          {/* Round / phase row */}
          {phase && (
            <>
              {(game.venue || isCompleted) && <Separator className="opacity-50" />}
              <div className="flex items-center gap-1.5 w-full">
                <Trophy className="size-3 text-muted-foreground/60 shrink-0" />
                <span className="text-[11px] font-medium text-muted-foreground/80">{phase}</span>
              </div>
            </>
          )}
        </CardFooter>
      )}
    </MotionCard>
  )
}
