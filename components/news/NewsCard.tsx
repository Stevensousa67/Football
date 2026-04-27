"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import type { ESPNArticle } from "@/lib/espn"

const MotionCard = motion.create(Card)

function formatDate(dateStr?: string) {
  if (!dateStr) return ""
  return new Date(dateStr).toLocaleDateString(undefined, {
    month: "short", day: "numeric", year: "numeric",
  })
}

// ── Hero article (first item) ─────────────────────────────────────────────────

export function HeroNewsCard({ article, index = 0 }: { article: ESPNArticle; index?: number }) {
  const img  = article.images?.[0]
  const href = article.links?.web?.href ?? "#"

  return (
    <MotionCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04, ease: "easeOut" }}
      className="group relative overflow-hidden border-border/60 bg-card/60 shadow-sm hover:shadow-lg hover:border-border/80 transition-all duration-250 rounded-2xl cursor-pointer p-0 gap-0"
    >
      {/* Accessible full-card link overlay */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 z-10"
        aria-label={article.headline}
      />

      {/* Image */}
      <div className="relative w-full aspect-video bg-muted overflow-hidden">
        {img?.url ? (
          <Image
            src={img.url}
            alt={img.alt ?? article.headline}
            fill
            sizes="(max-width: 768px) 100vw, 70vw"
            className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
            <span className="text-5xl opacity-20">⚽</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* Overlay text */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/70 mb-1.5">
            {formatDate(article.published)}
          </p>
          <h2 className="text-lg sm:text-xl font-bold text-white leading-snug line-clamp-3">
            {article.headline}
          </h2>
        </div>
      </div>

      {/* Description */}
      {article.description && (
        <CardContent className="px-5 py-4 flex items-start justify-between gap-3">
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {article.description}
          </p>
          <ExternalLink className="size-4 text-muted-foreground/50 shrink-0 mt-0.5 group-hover:text-muted-foreground transition-colors" />
        </CardContent>
      )}
    </MotionCard>
  )
}

// ── Regular article card ──────────────────────────────────────────────────────

export function NewsCard({ article, index = 0 }: { article: ESPNArticle; index?: number }) {
  const img  = article.images?.[0]
  const href = article.links?.web?.href ?? "#"

  return (
    <MotionCard
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.04, ease: "easeOut" }}
      className="group relative border-border/60 bg-card/60 backdrop-blur-sm shadow-sm hover:shadow-md hover:border-border/80 transition-all duration-200 rounded-2xl cursor-pointer p-0 gap-0"
    >
      {/* Accessible full-card link overlay */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 z-10"
        aria-label={article.headline}
      />

      <CardContent className="flex gap-3.5 p-3.5">
        {/* Thumbnail */}
        <div className={cn(
          "relative shrink-0 rounded-xl overflow-hidden bg-muted",
          "w-20 h-20 sm:w-24 sm:h-24",
        )}>
          {img?.url ? (
            <Image
              src={img.url}
              alt={img.alt ?? article.headline}
              fill
              sizes="96px"
              className="object-cover group-hover:scale-[1.04] transition-transform duration-400"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl opacity-20">⚽</span>
            </div>
          )}
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0 flex flex-col justify-between gap-1.5">
          <h3 className="text-sm font-semibold leading-snug line-clamp-3 group-hover:text-foreground/80 transition-colors">
            {article.headline}
          </h3>
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] text-muted-foreground/70">
              {formatDate(article.published)}
            </span>
            <ExternalLink className="size-3.5 text-muted-foreground/40 shrink-0 group-hover:text-muted-foreground/70 transition-colors" />
          </div>
        </div>
      </CardContent>
    </MotionCard>
  )
}
