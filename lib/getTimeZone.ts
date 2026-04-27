export function getCurrentUtcOffset(): string {
  const now = new Date()
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    timeZoneName: "shortOffset",
  })
  const parts = formatter.formatToParts(now)
  const offsetPart = parts.find((part) => part.type === "timeZoneName")
  return offsetPart ? offsetPart.value.replace("GMT", "UTC/GMT ") : "UTC/GMT -5"
}
