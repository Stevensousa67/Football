export async function getGames(tournament: string) {
  const res = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/soccer/${tournament}/scoreboard`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch games data", { cause: res.status });
  }

  const data = await res.json();
  return data;
}
