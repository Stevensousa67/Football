const MS_PER_DAY = 24 * 60 * 60 * 1000;

export function formatDateForAPI(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
}

export async function getGames(tournament: string, daysBack: number = 7, daysForward: number = 7) {
  const today = new Date();
  
  // Calculate date range using milliseconds for reliable date arithmetic
  const startDate = new Date(today.getTime() - (daysBack * MS_PER_DAY));
  const endDate = new Date(today.getTime() + (daysForward * MS_PER_DAY));
  
  const dateRange = `${formatDateForAPI(startDate)}-${formatDateForAPI(endDate)}`;
  
  const res = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/soccer/${tournament}/scoreboard?dates=${dateRange}`
  );

  if (!res.ok) {
    throw new Error(
      `Failed to fetch games data for tournament "${tournament}" (status: ${res.status})`,
      { cause: res.status }
    );
  }

  const data = await res.json();
  return data;
}
