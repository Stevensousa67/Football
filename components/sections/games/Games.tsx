import { getGames } from "@/app/api/espn/games";
import { GamesClient } from "./GamesClient";
import { type GamesProps, type ESPNEvent, type ParsedGame, DEFAULT_DAYS_BACK, DEFAULT_DAYS_FORWARD } from "@/lib/utils";
import ErrorDisplay from "@/components/ErrorDisplay";

function parseGames(events: ESPNEvent[]): ParsedGame[] {
  return events.map((event) => {
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
}

export default async function Games({ tournament }: GamesProps) {
  try {
    // Fetch games from the last 7 days and upcoming 7 days for initial load
    const gamesData = await getGames(tournament, DEFAULT_DAYS_BACK, DEFAULT_DAYS_FORWARD);
    const initialGames = parseGames(gamesData.events || []);

    return (
      <section className="mt-20 flex flex-col items-center text-center gap-8 px-4">
        <h1 className="text-3xl font-semibold">Games</h1>
        <GamesClient tournament={tournament} initialGames={initialGames} />
      </section>
    );
  } catch (error) {
    console.error(`Failed to load games for ${tournament}:`, error);
    return (
      <section className="mt-20 flex flex-col items-center text-center gap-8 px-4">
        <h1 className="text-3xl font-semibold">Games</h1>
        <ErrorDisplay message="Failed to load games information. Please try again later." />
      </section>
    );
  }
}
