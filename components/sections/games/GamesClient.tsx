"use client";

import * as React from "react";
import { DateRange } from "react-day-picker";
import { GameCard } from "./GameCard";
import { DateRangePicker, getDefaultDateRange } from "./DateRangePicker";
import { formatDateForAPI } from "@/app/api/espn/games";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Team {
  id: string;
  displayName: string;
  shortDisplayName: string;
  abbreviation: string;
  logo: string;
  score?: string;
}

interface ParsedGame {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  statusDetail: string;
  venue?: string;
  date: string;
  isCompleted: boolean;
}

interface GamesClientProps {
  tournament: string;
  initialGames: ParsedGame[];
}

function GamesCarousel({ games, title }: { games: ParsedGame[]; title: string }) {
  if (games.length === 0) {
    return (
      <div className="w-full text-center py-8">
        <p className="text-muted-foreground">No {title.toLowerCase()} available</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold text-center mb-4">{title}</h2>
      
      {/* Carousel for all screen sizes - responsive columns */}
      <div className="w-full max-w-5xl mx-auto px-8">
        <Carousel opts={{ align: "start", loop: true }} className="w-full relative">
          <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 z-10" />
          <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 z-10" />
          <CarouselContent className="-ml-2 md:-ml-4 pt-2">
            {games.map((game) => (
              <CarouselItem key={game.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                <GameCard
                  homeTeam={game.homeTeam}
                  awayTeam={game.awayTeam}
                  statusDetail={game.statusDetail}
                  venue={game.venue}
                  date={game.date}
                  isCompleted={game.isCompleted}
                  className="border border-foreground/20 h-full"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}

export function GamesClient({ tournament, initialGames }: GamesClientProps) {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(getDefaultDateRange());
  const [games, setGames] = React.useState<ParsedGame[]>(initialGames);
  const [isLoading, setIsLoading] = React.useState(false);

  const fetchGames = React.useCallback(async (range: DateRange | undefined) => {
    if (!range?.from || !range?.to) return;
    
    setIsLoading(true);
    try {
      const startDate = formatDateForAPI(range.from);
      const endDate = formatDateForAPI(range.to);
      
      const res = await fetch(
        `https://site.api.espn.com/apis/site/v2/sports/soccer/${tournament}/scoreboard?dates=${startDate}-${endDate}`
      );
      
      if (!res.ok) {
        throw new Error('Failed to fetch games');
      }
      
      const data = await res.json();
      const events = data.events || [];
      
      // Parse the games
      const parsedGames: ParsedGame[] = events.map((event: {
        id: string;
        date: string;
        competitions: Array<{
          status?: { type?: { shortDetail?: string; detail?: string; completed?: boolean } };
          venue?: { fullName?: string };
          competitors: Array<{
            team?: {
              id?: string;
              displayName?: string;
              shortDisplayName?: string;
              abbreviation?: string;
              logo?: string;
            };
            score?: string;
          }>;
        }>;
      }) => {
        const competition = event.competitions[0];
        const homeTeamData = competition.competitors[0];
        const awayTeamData = competition.competitors[1];
        
        return {
          id: event.id,
          homeTeam: {
            id: homeTeamData?.team?.id || "",
            displayName: homeTeamData?.team?.displayName || "TBD",
            shortDisplayName: homeTeamData?.team?.shortDisplayName || "TBD",
            abbreviation: homeTeamData?.team?.abbreviation || "TBD",
            logo: homeTeamData?.team?.logo || "",
            score: homeTeamData?.score,
          },
          awayTeam: {
            id: awayTeamData?.team?.id || "",
            displayName: awayTeamData?.team?.displayName || "TBD",
            shortDisplayName: awayTeamData?.team?.shortDisplayName || "TBD",
            abbreviation: awayTeamData?.team?.abbreviation || "TBD",
            logo: awayTeamData?.team?.logo || "",
            score: awayTeamData?.score,
          },
          statusDetail: competition.status?.type?.shortDetail || competition.status?.type?.detail || "Unknown",
          venue: competition.venue?.fullName,
          date: event.date,
          isCompleted: competition.status?.type?.completed || false,
        };
      });
      
      setGames(parsedGames);
    } catch (error) {
      console.error('Error fetching games:', error);
    } finally {
      setIsLoading(false);
    }
  }, [tournament]);

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
    if (range?.from && range?.to) {
      fetchGames(range);
    }
  };

  // Split into upcoming and past games
  const upcomingGames = games
    .filter((game) => !game.isCompleted)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()); // Soonest first
  
  const pastGames = games
    .filter((game) => game.isCompleted)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Most recent first

  return (
    <section className="mt-20 flex flex-col items-center text-center gap-8 px-4">
      <h1 className="text-3xl font-semibold">Games</h1>
      
      {/* Date Range Picker */}
      <div className="flex flex-col items-center gap-2">
        <p className="text-sm text-muted-foreground">Select a date range to view games</p>
        <DateRangePicker
          dateRange={dateRange}
          onDateRangeChange={handleDateRangeChange}
        />
      </div>
      
      {isLoading ? (
        <div className="w-full py-12 text-center">
          <p className="text-muted-foreground">Loading games...</p>
        </div>
      ) : (
        <div className="w-full flex flex-col gap-12">
          <GamesCarousel games={upcomingGames} title="Upcoming Games" />
          <GamesCarousel games={pastGames} title="Past Games" />
        </div>
      )}
    </section>
  );
}
