import Image from "next/image"
import type { SocialMedia } from "@/lib/socialMedia"

const sizeMap = {
  sm: {
    button:
      "inline-flex size-9 items-center justify-center rounded-xl border border-border bg-card/50 hover:bg-muted transition-colors",
    icon: 16,
  },
  md: {
    button:
      "inline-flex size-10 items-center justify-center rounded-xl border border-border bg-card hover:bg-muted transition-colors shadow-sm",
    icon: 18,
  },
}

interface SocialIconButtonProps {
  social: SocialMedia
  size?: "sm" | "md"
}

export function SocialIconButton({ social, size = "md" }: SocialIconButtonProps) {
  const s = sizeMap[size]
  const invertClass = social.isBlack ? "dark:invert" : ""

  if (social.type === "email") {
    return (
      <a href={social.url} title={social.name} aria-label="Send an email" className={s.button}>
        <Image src={social.icon} alt={social.name} width={s.icon} height={s.icon} className={invertClass} />
      </a>
    )
  }

  return (
    <a
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      title={social.name}
      className={s.button}
    >
      <Image src={social.icon} alt={social.name} width={s.icon} height={s.icon} className={invertClass} />
    </a>
  )
}
