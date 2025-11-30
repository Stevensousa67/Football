"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { GameCardProps } from "@/lib/utils";

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
    <div className="h-full p-1">
      <Card
        className={`flex flex-col h-full p-0 ${className || ""}`}
      >
          <CardHeader className="flex items-center justify-center pb-2 pt-4 px-4">
            <Badge variant="default">
              {statusDetail}
            </Badge>
          </CardHeader>

          <CardContent className={`flex flex-col flex-1 px-4 ${isCompleted ? "gap-2" : "pb-2 gap-4"}`}>
            {/* Teams Container - Home team on LEFT, Away team on RIGHT */}
            <div className="flex items-center justify-between gap-4">
              {/* Home Team (Left) */}
              <div className={`flex flex-col items-center flex-1 ${isCompleted ? "gap-1" : "gap-2"}`}>
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
                  <span className="text-xl font-bold">{homeTeam.score ?? "-"}</span>
                )}
              </div>

              {/* VS or Date Divider */}
              <div className="flex flex-col items-center gap-1">
                {isCompleted ? (
                  <>
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

              {/* Away Team (Right) */}
              <div className={`flex flex-col items-center flex-1 ${isCompleted ? "gap-1" : "gap-2"}`}>
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
                  <span className="text-xl font-bold">{awayTeam.score ?? "-"}</span>
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
    </div>
  );
}
