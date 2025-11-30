"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

function formatGameDate(dateString: string) {
  const gameDate = new Date(dateString);
  return gameDate.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

function formatGameTime(dateString: string) {
  const gameDate = new Date(dateString);
  return gameDate.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
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
        className={`flex flex-col h-full p-0 transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30 ${className || ""}`}
      >
        <CardHeader className="flex items-center justify-center pb-2 pt-4 px-4">
          <Badge variant={isCompleted ? "secondary" : "default"}>
            {statusDetail}
          </Badge>
        </CardHeader>

        <CardContent className="flex flex-col flex-1 px-4 pb-2 gap-4">
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
                <>
                  <span className="text-sm text-muted-foreground font-medium">FT</span>
                  {date && (
                    <span className="text-xs text-muted-foreground text-center">
                      {formatGameDate(date)}
                    </span>
                  )}
                </>
              ) : (
                <>
                  <span className="text-sm font-semibold text-muted-foreground">VS</span>
                  {date && (
                    <span className="text-xs text-muted-foreground text-center">
                      {formatGameDate(date)}
                    </span>
                  )}
                  {date && (
                    <span className="text-xs text-muted-foreground">
                      {formatGameTime(date)}
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
        </CardContent>

        {/* Venue */}
        {venue && (
          <CardFooter className="justify-center pt-0 pb-4 px-4">
            <span className="text-xs text-muted-foreground text-center">{venue}</span>
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
}
