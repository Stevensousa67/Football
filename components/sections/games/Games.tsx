import { getGames } from "@/app/api/espn/games";
import { GameCard } from "./GameCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface GamesProps {
  tournament: string;
}

interface ESPNTeam {
  id: string;
  team: {
    id: string;
    displayName: string;
    shortDisplayName: string;
    abbreviation: string;
    logo: string;
  };
  score?: string;
}

interface ESPNCompetition {
  id: string;
  date: string;
  status: {
    type: {
      id: string;
      name: string;
      state: string;
      completed: boolean;
      description: string;
      detail: string;
      shortDetail: string;
    };
  };
  competitors: ESPNTeam[];
  venue?: {
    fullName: string;
    address?: {
      city: string;
      country: string;
    };
  };
}

interface ESPNEvent {
  id: string;
  name: string;
  date: string;
  competitions: ESPNCompetition[];
}

interface ParsedGame {
  id: string;
  homeTeam: {
    id: string;
    displayName: string;
    shortDisplayName: string;
    abbreviation: string;
    logo: string;
    score?: string;
  };
  awayTeam: {
    id: string;
    displayName: string;
    shortDisplayName: string;
    abbreviation: string;
    logo: string;
    score?: string;
  };
  statusDetail: string;
  venue?: string;
  date: string;
  isCompleted: boolean;
}

function parseGames(events: ESPNEvent[]): ParsedGame[] {
  return events.map((event) => {
    const competition = event.competitions[0];
    // Use direct indexing instead of find+indexOf for O(1) access
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
}

function GamesCarousel({ games, title, subtitle }: { games: ParsedGame[]; title: string; subtitle?: string }) {
  if (games.length === 0) {
    return (
      <div className="w-full text-center py-8">
        <p className="text-muted-foreground">No {title.toLowerCase()} available</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h2 className={`text-xl font-semibold text-center ${subtitle ? 'mb-1' : 'mb-4'}`}>{title}</h2>
      {subtitle && (
        <p className="text-sm text-muted-foreground mb-4 text-center">{subtitle}</p>
      )}
      
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

// Default time window for fetching games
const DEFAULT_DAYS_BACK = 7;
const DEFAULT_DAYS_FORWARD = 7;

export default async function Games({ tournament }: GamesProps) {
  // Fetch games from the last 7 days and upcoming 7 days
  const gamesData = await getGames(tournament, DEFAULT_DAYS_BACK, DEFAULT_DAYS_FORWARD);
  const parsedGames = parseGames(gamesData.events || []);

  // Split into upcoming and past games
  const upcomingGames = parsedGames
    .filter((game) => !game.isCompleted)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()); // Soonest first
  
  const pastGames = parsedGames
    .filter((game) => game.isCompleted)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Most recent first

  return (
    <section className="mt-20 flex flex-col items-center text-center gap-8 px-4">
      <h1 className="text-3xl font-semibold">Games</h1>
      
      <div className="w-full flex flex-col gap-12">
        <GamesCarousel 
          games={upcomingGames} 
          title="Upcoming Games" 
          subtitle={`Next ${DEFAULT_DAYS_FORWARD} days`}
        />
        <GamesCarousel 
          games={pastGames} 
          title="Past Games" 
          subtitle={`Last ${DEFAULT_DAYS_BACK} days`}
        />
      </div>
    </section>
  );
}
