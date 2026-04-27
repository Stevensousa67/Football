"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { getZone, ZONE_CLASSES, type QualificationZone } from "@/lib/tournaments"
import { ZoneLegend } from "./ZoneLegend"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { StandingRow } from "@/lib/espn"

interface StandingsTableProps {
  rows: StandingRow[]
  zones?: QualificationZone[]
}

const MotionTableRow = motion.create(TableRow)

export function StandingsTable({ rows, zones }: StandingsTableProps) {
  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-border/60 bg-card/50 backdrop-blur-sm overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <Table className="min-w-[580px]">
            <TableHeader>
              <TableRow className="border-b border-border/50 bg-muted/30 hover:bg-muted/30">
                <TableHead className="w-14 text-xs font-semibold uppercase tracking-wider">#</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Team</TableHead>
                <TableHead className="text-right text-xs font-semibold uppercase tracking-wider">Pts</TableHead>
                <TableHead className="hidden sm:table-cell text-right text-xs font-semibold uppercase tracking-wider">GP</TableHead>
                <TableHead className="hidden sm:table-cell text-right text-xs font-semibold uppercase tracking-wider">W</TableHead>
                <TableHead className="hidden sm:table-cell text-right text-xs font-semibold uppercase tracking-wider">D</TableHead>
                <TableHead className="hidden sm:table-cell text-right text-xs font-semibold uppercase tracking-wider">L</TableHead>
                <TableHead className="hidden md:table-cell text-right text-xs font-semibold uppercase tracking-wider">GF</TableHead>
                <TableHead className="hidden md:table-cell text-right text-xs font-semibold uppercase tracking-wider">GA</TableHead>
                <TableHead className="hidden md:table-cell text-right text-xs font-semibold uppercase tracking-wider">GD</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {rows.map((row, i) => {
                const zone = getZone(row.rank, zones)
                const zoneCls = zone ? ZONE_CLASSES[zone.color] : null
                const gdPositive = row.goalDiff > 0
                const gdNeutral  = row.goalDiff === 0

                return (
                  <MotionTableRow
                    key={row.teamId}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, delay: i * 0.03, ease: "easeOut" }}
                    className="border-b border-border/30 last:border-0 hover:bg-accent/40 transition-colors duration-150 cursor-default"
                  >
                    {/* Position */}
                    <TableCell className="w-14 py-3">
                      <span className={cn(
                        "inline-flex size-8 items-center justify-center rounded-lg text-sm font-bold transition-colors",
                        zoneCls ? zoneCls.badge : "text-muted-foreground",
                      )}>
                        {row.rank}
                      </span>
                    </TableCell>

                    {/* Team */}
                    <TableCell className="py-2.5">
                      <div className="flex items-center gap-2.5">
                        {row.teamLogo ? (
                          <div className="relative size-7 shrink-0">
                            <Image
                              src={row.teamLogo}
                              alt={row.teamName}
                              fill
                              sizes="28px"
                              className="object-contain"
                            />
                          </div>
                        ) : (
                          <div className="size-7 shrink-0 rounded-full bg-muted" />
                        )}
                        <div className="min-w-0">
                          <span className="font-semibold text-sm leading-none block truncate">
                            {row.teamName}
                          </span>
                          <span className="text-xs text-muted-foreground hidden xs:block">
                            {row.teamAbbr}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    {/* Points */}
                    <TableCell className="text-right py-2.5">
                      <span className="text-sm font-bold tabular-nums">{row.points}</span>
                    </TableCell>

                    {/* GP, W, D, L */}
                    <TableCell className="hidden sm:table-cell text-right text-sm tabular-nums text-muted-foreground">{row.gamesPlayed}</TableCell>
                    <TableCell className="hidden sm:table-cell text-right text-sm tabular-nums">{row.wins}</TableCell>
                    <TableCell className="hidden sm:table-cell text-right text-sm tabular-nums text-muted-foreground">{row.draws}</TableCell>
                    <TableCell className="hidden sm:table-cell text-right text-sm tabular-nums">{row.losses}</TableCell>

                    {/* GF, GA, GD */}
                    <TableCell className="hidden md:table-cell text-right text-sm tabular-nums text-muted-foreground">{row.goalsFor}</TableCell>
                    <TableCell className="hidden md:table-cell text-right text-sm tabular-nums text-muted-foreground">{row.goalsAgainst}</TableCell>
                    <TableCell className={cn(
                      "hidden md:table-cell text-right text-sm tabular-nums font-medium",
                      gdPositive ? "text-emerald-600 dark:text-emerald-400" :
                      gdNeutral  ? "text-muted-foreground" :
                                   "text-red-600 dark:text-red-400",
                    )}>
                      {gdPositive ? `+${row.goalDiff}` : row.goalDiff}
                    </TableCell>
                  </MotionTableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </div>

      {zones && zones.length > 0 && <ZoneLegend zones={zones} />}
    </div>
  )
}
