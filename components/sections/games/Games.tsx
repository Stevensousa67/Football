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
    const homeTeamData = competition.competitors.find(
      (c: ESPNTeam) => c.team && competition.competitors.indexOf(c) === 0
    );
    const awayTeamData = competition.competitors.find(
      (c: ESPNTeam) => c.team && competition.competitors.indexOf(c) === 1
    );

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
      <h2 className="text-xl font-semibold mb-4 text-center">{title}</h2>
      
      {/* Grid layout for larger screens */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-6 justify-center items-stretch">
        {games.slice(0, 3).map((game) => (
          <div key={game.id} className="h-full">
            <GameCard
              homeTeam={game.homeTeam}
              awayTeam={game.awayTeam}
              statusDetail={game.statusDetail}
              venue={game.venue}
              date={game.date}
              isCompleted={game.isCompleted}
              className="border border-foreground/20 h-full"
            />
          </div>
        ))}
      </div>

      {/* Carousel for smaller screens */}
      <div className="w-full max-w-4xl mx-auto lg:hidden">
        <Carousel opts={{ align: "start", loop: true }} className="w-full relative">
          <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10 sm:-left-2 md:-left-4" />
          <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10 sm:-right-2 md:-right-4" />
          <CarouselContent className="-ml-2 md:-ml-4 pt-2">
            {games.map((game) => (
              <CarouselItem key={game.id} className="pl-2 md:pl-4 basis-full md:basis-1/2">
                <GameCard
                  homeTeam={game.homeTeam}
                  awayTeam={game.awayTeam}
                  statusDetail={game.statusDetail}
                  venue={game.venue}
                  date={game.date}
                  isCompleted={game.isCompleted}
                  className="border border-foreground/20 mx-auto h-full"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}

export default async function Games({ tournament }: GamesProps) {
  const gamesData = await getGames(tournament);
  const parsedGames = parseGames(gamesData.events || []);

  const upcomingGames = parsedGames.filter((game) => !game.isCompleted);
  const pastGames = parsedGames.filter((game) => game.isCompleted);

  return (
    <section className="mt-20 flex flex-col items-center text-center gap-8 px-4">
      <h1 className="text-3xl font-semibold">Games</h1>
      
      <div className="w-full flex flex-col gap-12">
        <GamesCarousel games={upcomingGames} title="Upcoming Games" />
        <GamesCarousel games={pastGames} title="Past Games" />
      </div>
    </section>
  );
}
