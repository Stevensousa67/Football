import { getStandings } from '@/app/api/espn/standings';
import { StandingsTable } from './StandingsTable';
import type { StandingsProps } from "@/lib/utils";
import ErrorDisplay from "@/components/ErrorDisplay";

export default async function Standings({ tournament, season }: StandingsProps) {
  try {
    const standingsData = await getStandings(tournament, season);

    return (
      <section id="standings-section" className="mt-20 flex flex-col text-center gap-8 px-4">
        <h1 className="text-3xl font-semibold">Standings</h1>
        <StandingsTable data={standingsData} />
      </section>
    );
  } catch (error) {
    console.error(`Failed to load standings for ${tournament}:`, error);
    return (
      <section id="standings-section" className="mt-20 flex flex-col text-center gap-8 px-4">
        <h1 className="text-3xl font-semibold">Standings</h1>
        <ErrorDisplay message="Failed to load standings. Please try again later." />
      </section>
    );
  }
}