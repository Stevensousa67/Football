"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

interface NavLinkItem {
  name: string
  href: string
}

const navLinks: NavLinkItem[] = [
  { name: "Standings", href: "/standings" },
  { name: "Scores", href: "/scores" },
  { name: "News", href: "/news" },
]

interface NavbarLinksProps {
  className?: string
  onLinkClick?: () => void
}

export default function NavbarLinks({ className, onLinkClick }: NavbarLinksProps) {
  const pathname = usePathname()

  return (
    <ul className={className}>
      {navLinks.map((link) => {
        const isActive = pathname === link.href
        return (
          <li
            key={link.name}
            className="relative group cursor-pointer text-md font-medium text-muted-foreground hover:text-foreground"
          >
            <Link
              href={link.href}
              onClick={onLinkClick}
              className={`no-underline block transition-colors ${isActive ? "text-foreground" : ""}`}
            >
              {link.name}
            </Link>
            <span
              className={`absolute left-0 bottom-[-5px] h-1 rounded-xl bg-green-500 transition-all duration-300 ${
                isActive ? "w-full" : "w-0 group-hover:w-full"
              }`}
            />
          </li>
        )
      })}
    </ul>
  )
}
