import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ============================================================================
// Constants
// ============================================================================

export const DEFAULT_DAYS_BACK = 7;
export const DEFAULT_DAYS_FORWARD = 7;

// ============================================================================
// Games Section Types
// ============================================================================

// ESPN API Response Types
export interface ESPNTeam {
  id: string;
  team: {
    id: string;
    displayName: string;
    shortDisplayName: string;
    abbreviation: string;
    logo: string;
  };
  score?: string;
}

export interface ESPNCompetition {
  id: string;
  date: string;
  status: {
    type: {
      id: string;
      name: string;
      state: string;
      completed: boolean;
      description: string;
      detail: string;
      shortDetail: string;
    };
  };
  competitors: ESPNTeam[];
  venue?: {
    fullName: string;
    address?: {
      city: string;
      country: string;
    };
  };
}

export interface ESPNEvent {
  id: string;
  name: string;
  date: string;
  competitions: ESPNCompetition[];
}

// Parsed/Transformed Types
export interface GameTeam {
  id: string;
  displayName: string;
  shortDisplayName: string;
  abbreviation: string;
  logo: string;
  score?: string;
}

export interface ParsedGame {
  id: string;
  homeTeam: GameTeam;
  awayTeam: GameTeam;
  statusDetail: string;
  venue?: string;
  date: string;
  isCompleted: boolean;
}

// Component Prop Types
export interface GamesProps {
  tournament: string;
}

export interface GamesClientProps {
  tournament: string;
  initialGames: ParsedGame[];
}

export interface GameCardProps {
  homeTeam: GameTeam;
  awayTeam: GameTeam;
  statusDetail: string;
  venue?: string;
  date?: string;
  isCompleted: boolean;
  className?: string;
}

// ============================================================================
// News Section Types
// ============================================================================

export interface ESPNArticle {
  id: string;
  headline: string;
  description?: string;
  images?: { url: string; alt?: string; width?: number; height?: number }[];
  links?: { web?: { href: string } };
}

export interface NewsArticle {
  id: string;
  headline: string;
  description?: string;
  images?: { url: string; alt?: string; width?: number; height?: number }[];
  links?: { web?: { href: string } };
}

export interface NewsProps {
  tournament: string;
}

export interface NewsCardProps {
  article: NewsArticle;
  className?: string;
}

// ============================================================================
// Standings Section Types
// ============================================================================

export interface StandingsStat {
  name: string;
  value: string | number;
}

export interface StandingsTeam {
  id: string;
  displayName?: string;
  name?: string;
  logos?: { href: string }[];
}

export interface StandingsEntry {
  team: StandingsTeam;
  stats?: StandingsStat[];
}

export interface Standings {
  entries: StandingsEntry[];
}

export interface StandingsData {
  children?: { standings?: Standings }[];
}

export interface StandingsProps {
  tournament: string;
  season: string;
}

export interface StandingsTableProps {
  data: StandingsData;
}
