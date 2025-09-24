import Image from 'next/image';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Define interfaces for the data structure
interface Stat {
  name: string;
  value: string | number;
}

interface Team {
  id: string;
  displayName?: string;
  name?: string;
  logos?: { href: string }[];
}

interface Entry {
  team: Team;
  stats?: Stat[];
}

interface Standings {
  entries: Entry[];
}

interface Data {
  children?: { standings?: Standings }[];
}

interface StandingsTableProps {
  data: Data;
}

export function StandingsTable({ data }: StandingsTableProps) {
  const entries = data?.children?.[0]?.standings?.entries ?? [];

  // Memoize the get function to avoid redundant stat lookups
  const getStat = (entry: Entry, name: string): number => {
    const value = entry.stats?.find((stat) => stat.name === name)?.value ?? '-';
    return value === '-' ? 0 : Number(value);
  };

  // Sort entries once and reuse
  const sortedEntries = entries.length
    ? [...entries].sort((a, b) => getStat(a, 'rank') - getStat(b, 'rank'))
    : [];

  return (
    <Table>
      <TableHeader>
        <TableRow className="text-muted">
          <TableHead>Position</TableHead>
          <TableHead>Team</TableHead>
          <TableHead className="text-right">P</TableHead>
          <TableHead className="text-right">MP</TableHead>
          <TableHead className="text-right">W</TableHead>
          <TableHead className="text-right">D</TableHead>
          <TableHead className="text-right">L</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedEntries.map((entry) => {
          const { team } = entry;
          const teamName = team.displayName || team.name || 'Unknown';
          const logo = team.logos?.[0]?.href;

          return (
            <TableRow key={team.id}>
              <TableCell className="text-left">{getStat(entry, 'rank')}</TableCell>
              <TableCell className="text-left">
                <div className="flex items-center">
                  {logo && (
                    <Image src={logo} alt={teamName} width={22} height={22} className="inline mr-2"/>
                  )}
                  {teamName}
                </div>
              </TableCell>
              <TableCell className="text-right">{getStat(entry, 'points')}</TableCell>
              <TableCell className="text-right">{getStat(entry, 'gamesPlayed')}</TableCell>
              <TableCell className="text-right">{getStat(entry, 'wins')}</TableCell>
              <TableCell className="text-right">{getStat(entry, 'ties')}</TableCell>
              <TableCell className="text-right">{getStat(entry, 'losses')}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={7}>Source: ESPN</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}