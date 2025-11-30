"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

interface Team {
  id: string;
  displayName: string;
  shortDisplayName: string;
  abbreviation: string;
  logo: string;
  score?: string;
}

interface GameCardProps {
  homeTeam: Team;
  awayTeam: Team;
  statusDetail: string;
  venue?: string;
  date?: string;
  isCompleted: boolean;
  className?: string;
}

export function GameCard({
  homeTeam,
  awayTeam,
  statusDetail,
  venue,
  date,
  isCompleted,
  className,
}: GameCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="h-full"
    >
      <Card
        className={`flex h-full p-0 transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30 ${className || ""}`}
      >
        <CardContent className="flex flex-col w-full p-4 gap-4">
          {/* Status Badge */}
          <div className="flex justify-center">
            <span
              className={`text-xs font-medium px-3 py-1 rounded-full ${
                isCompleted
                  ? "bg-muted text-muted-foreground"
                  : "bg-primary/10 text-primary"
              }`}
            >
              {statusDetail}
            </span>
          </div>

          {/* Teams Container */}
          <div className="flex items-center justify-between gap-4">
            {/* Away Team */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <div className="relative w-16 h-16">
                <Image
                  src={awayTeam.logo}
                  alt={awayTeam.displayName}
                  fill
                  className="object-contain"
                  sizes="64px"
                />
              </div>
              <span className="text-xs font-medium text-center line-clamp-2">
                {awayTeam.shortDisplayName}
              </span>
              {isCompleted && (
                <span className="text-2xl font-bold">{awayTeam.score ?? "-"}</span>
              )}
            </div>

            {/* VS or Score Divider */}
            <div className="flex flex-col items-center gap-1">
              {isCompleted ? (
                <span className="text-sm text-muted-foreground font-medium">FT</span>
              ) : (
                <>
                  <span className="text-sm font-semibold text-muted-foreground">VS</span>
                  {date && (
                    <span className="text-xs text-muted-foreground text-center">
                      {new Date(date).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  )}
                  {date && (
                    <span className="text-xs text-muted-foreground">
                      {new Date(date).toLocaleTimeString(undefined, {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  )}
                </>
              )}
            </div>

            {/* Home Team */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <div className="relative w-16 h-16">
                <Image
                  src={homeTeam.logo}
                  alt={homeTeam.displayName}
                  fill
                  className="object-contain"
                  sizes="64px"
                />
              </div>
              <span className="text-xs font-medium text-center line-clamp-2">
                {homeTeam.shortDisplayName}
              </span>
              {isCompleted && (
                <span className="text-2xl font-bold">{homeTeam.score ?? "-"}</span>
              )}
            </div>
          </div>

          {/* Venue */}
          {venue && (
            <div className="text-center">
              <span className="text-xs text-muted-foreground">{venue}</span>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
