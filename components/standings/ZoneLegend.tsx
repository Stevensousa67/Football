import { cn } from "@/lib/utils"
import { type QualificationZone, ZONE_CLASSES } from "@/lib/tournaments"

interface ZoneLegendProps {
  zones: QualificationZone[]
}

export function ZoneLegend({ zones }: ZoneLegendProps) {
  if (!zones.length) return null

  return (
    <div className="flex flex-wrap gap-x-5 gap-y-2 px-1 pt-3">
      {zones.map((zone) => {
        const cls = ZONE_CLASSES[zone.color]
        return (
          <div key={zone.label} className="flex items-center gap-1.5">
            <span className={cn("size-2.5 rounded-full shrink-0", cls.dot)} />
            <span className="text-xs text-muted-foreground">{zone.label}</span>
          </div>
        )
      })}
    </div>
  )
}
