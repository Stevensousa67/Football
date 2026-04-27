import Contact from "@/components/contact/Contact"

export default function Page() {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
        <span className="text-6xl">⚽</span>
        <h1 className="text-4xl font-bold tracking-tight">Football Hub</h1>
        <p className="text-muted-foreground text-lg max-w-md">
          Your home for World Cup &amp; CONMEBOL football — live scores, standings, and news.
        </p>
      </div>
      <Contact />
    </>
  )
}
