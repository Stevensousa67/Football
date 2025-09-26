export async function getNews(tournament: string) {
  const res = await fetch(
    `https://site.web.api.espn.com/apis/v2/sports/soccer/${tournament}/news`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data", { cause: res.status });
  }

  const data = await res.json();
  return data;
}
