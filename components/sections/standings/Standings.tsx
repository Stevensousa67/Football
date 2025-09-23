import { getStandings } from '@/app/api/espn/standings';
import { StandingsTable } from './StandingsTable';

interface StandingsProps {
  tournament: string;
  season: string;
}

export default async function Standings({ tournament, season }: StandingsProps) {
  const standingsData = await getStandings(tournament, season);

  return (
    <section id="standings-section" className="mt-30 mb-10 p-6 flex flex-col text-center gap-8">
      <h1 className="text-3xl font-semibold">Standings</h1>
      <StandingsTable data={standingsData} />
    </section>
  );
}