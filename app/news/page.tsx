import { getTournamentBySlug } from "@/lib/tournaments"
import { getBaseUrl } from "@/lib/baseUrl"
import { LeagueHeader } from "@/components/shared/LeagueHeader"
import { HeroNewsCard, NewsCard } from "@/components/news/NewsCard"
import { notFound } from "next/navigation"
import type { ESPNArticle } from "@/lib/espn"

interface Props {
  searchParams: Promise<{ league?: string }>
}

export async function generateMetadata({ searchParams }: Props) {
  const { league = "bra.1" } = await searchParams
  const tournament = getTournamentBySlug(league)
  return { title: tournament ? `${tournament.name} News` : "News" }
}

export default async function NewsPage({ searchParams }: Props) {
  const { league = "bra.1" } = await searchParams
  const tournament = getTournamentBySlug(league)

  if (!tournament || !tournament.hasNews) notFound()

  const res = await fetch(`${getBaseUrl()}/api/espn/news?league=${league}`, {
    next: { revalidate: 300 },
  })
  const { articles } = (await res.json()) as { articles: ESPNArticle[] }

  const [hero, ...rest] = articles

  return (
    <div className="py-8 space-y-6">
      <LeagueHeader tournament={tournament} subtitle="Latest News" />

      {articles.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <span className="text-4xl mb-3">📰</span>
          <p className="text-sm font-medium text-muted-foreground">No news available right now.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {hero && <HeroNewsCard article={hero} index={0} />}
          {rest.length > 0 && (
            <div className="grid gap-3 sm:grid-cols-2">
              {rest.map((article, i) => (
                <NewsCard key={article.id} article={article} index={i + 1} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
