export async function getStandings(tournament: string, season: string) {
  const res = await fetch(
    `https://site.web.api.espn.com/apis/v2/sports/soccer/${tournament}/standings?season=${season}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data", { cause: res.status });
  }

  const data = await res.json();
  return data;
}
