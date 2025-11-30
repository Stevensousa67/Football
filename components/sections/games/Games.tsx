import { getGames } from "@/app/api/espn/games";
import { GamesClient } from "./GamesClient";

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

// Default time window for fetching games
const DEFAULT_DAYS_BACK = 7;
const DEFAULT_DAYS_FORWARD = 7;

export default async function Games({ tournament }: GamesProps) {
  // Fetch games from the last 7 days and upcoming 7 days for initial load
  const gamesData = await getGames(tournament, DEFAULT_DAYS_BACK, DEFAULT_DAYS_FORWARD);
  const initialGames = parseGames(gamesData.events || []);

  return <GamesClient tournament={tournament} initialGames={initialGames} />;
}
