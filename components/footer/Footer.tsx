import Link from "next/link"
import { MapPin } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { publicSocials } from "@/lib/socialMedia"
import { SocialIconButton } from "@/components/SocialIconButton"
import { getCurrentUtcOffset } from "@/lib/getTimeZone"

const navLinks = [
  { label: "Standings", href: "/standings" },
  { label: "Scores",    href: "/scores"    },
  { label: "News",      href: "/news"      },
]

export default function Footer() {
  const year = new Date().getFullYear()
  const timeOffset = getCurrentUtcOffset()

  return (
    <footer className="relative max-w-5xl mx-auto w-full mb-3 rounded-2xl overflow-hidden bg-gradient-to-t from-white/30 via-white/10 to-white/0 dark:from-black/30 dark:via-black/10 dark:to-black/0 shadow-xs backdrop-blur-[10px]">

      {/* ── Main grid ──────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-8 pt-6 pb-5">

        <div className="space-y-2">
          <p className="font-bold text-base tracking-tight">Steven Sousa</p>
          <p className="text-sm text-muted-foreground leading-snug">
            Freelance Web Developer
          </p>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="size-3 shrink-0" />
            Plymouth, MA · {timeOffset}
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-green-500/30 bg-green-500/10 px-2.5 py-1 text-xs font-semibold text-green-600 dark:text-green-400">
            <span className="size-1.5 rounded-full bg-green-500 animate-pulse" />
            Available for Freelance
          </span>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Navigate
          </p>
          <nav className="flex flex-col gap-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Connect
          </p>
          <div className="flex flex-wrap gap-2">
            {publicSocials.map((social) => (
              <SocialIconButton key={social.name} social={social} size="sm" />
            ))}
          </div>
        </div>

      </div>

      {/* ── Bottom bar ─────────────────────────────────────────── */}
      <Separator />
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-8 py-3">
        <p className="text-xs text-muted-foreground">
          © {year} Steven Sousa. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground">
          Built with Next.js · Deployed on Vercel
        </p>
      </div>

    </footer>
  )
}
