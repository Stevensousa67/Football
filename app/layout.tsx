import type { Metadata } from "next"
import { Geist_Mono, Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/header/Navbar"
import Footer from "@/components/footer/Footer"
import { Toaster } from "@/components/ui/sonner"
import { cn } from "@/lib/utils"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const fontMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
  title: "Football Hub",
  description: "Your home for World Cup & CONMEBOL football — live scores, standings, and news.",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("font-sans", inter.variable, fontMono.variable)}
    >
      <body className="antialiased min-h-screen flex flex-col bg-linear-to-b from-white via-white via-60% to-gray-300 dark:from-black dark:via-black dark:via-60% dark:to-gray-800">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main
            className="grow flex flex-col max-w-5xl w-full pt-24 px-4"
            style={{ position: "relative", left: "50vw", transform: "translateX(-50%)" }}
          >
            {children}
          </main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
