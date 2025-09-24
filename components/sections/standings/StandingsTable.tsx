import Image from 'next/image';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface StandingsTableProps {
  data: any; // Replace 'any' with the actual type of your standings data
}

export function StandingsTable({ data }: StandingsTableProps) {
  const entries = data?.children?.[0]?.standings?.entries ?? [];
  const get = (entry: any, name: string) => entry?.stats?.find((stat: any) => stat.name === name)?.value ?? '-';
  const sorted = [...entries].sort((a, b) => (get(a, 'rank') as number) - (get(b, 'rank') as number));

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
        {sorted.map((entry: any) => {
          const teamName = entry.team?.displayName || entry.team?.name || "Unknown";
          const logo = entry.team?.logos?.[0]?.href;
          return (
          <TableRow key={entry.team.id}>
            <TableCell className="text-left">{get(entry, 'rank')}</TableCell>
            <TableCell className="text-left"><div className="flex items-center">{logo && (
              <Image src={logo} alt={teamName} width={22} height={22} className="inline mr-2" />
            )}{teamName}</div></TableCell>
            <TableCell className="text-right">{get(entry, 'points')}</TableCell>
            <TableCell className="text-right">{get(entry, 'gamesPlayed')}</TableCell>
            <TableCell className="text-right">{get(entry, 'wins')}</TableCell>
            <TableCell className="text-right">{get(entry, 'ties')}</TableCell>
            <TableCell className="text-right">{get(entry, 'losses')}</TableCell>
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