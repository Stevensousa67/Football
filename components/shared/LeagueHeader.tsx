import { Badge } from "@/components/ui/badge"
import type { Tournament } from "@/lib/tournaments"

interface LeagueHeaderProps {
  tournament: Tournament
  subtitle?: string
}

export function LeagueHeader({ tournament, subtitle }: LeagueHeaderProps) {
  return (
    <div className="flex items-center gap-4 pb-2">
      <span className="text-4xl leading-none" role="img" aria-label={tournament.name}>
        {tournament.flag}
      </span>
      <div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <h1 className="text-2xl font-bold tracking-tight">{tournament.name}</h1>
          {tournament.season && (
            <Badge variant="outline" className="text-xs font-medium text-muted-foreground">
              {tournament.season}
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-0.5">
          {subtitle ?? tournament.shortName}
        </p>
      </div>
    </div>
  )
}
