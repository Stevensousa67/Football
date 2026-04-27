---
name: Football Hub
description: >
  A real-time football data dashboard covering World Cup, CONMEBOL, and
  international competitions. Built with a monochromatic-with-accent design
  language: achromatic neutrals for the chrome, emerald green as the single
  brand accent, and pervasive glassmorphism that keeps heavy data tables
  feeling airy.

colors:
  # ── Light-mode semantic palette (OKLCH) ──────────────────────────────────
  light:
    background:           "oklch(1 0 0)"           # pure white
    foreground:           "oklch(0.145 0 0)"        # near-black
    card:                 "oklch(1 0 0)"
    card-foreground:      "oklch(0.145 0 0)"
    popover:              "oklch(1 0 0)"
    popover-foreground:   "oklch(0.145 0 0)"
    primary:              "oklch(0.205 0 0)"        # very dark gray
    primary-foreground:   "oklch(0.985 0 0)"        # near-white
    secondary:            "oklch(0.97 0 0)"         # very light gray
    secondary-foreground: "oklch(0.205 0 0)"
    muted:                "oklch(0.97 0 0)"
    muted-foreground:     "oklch(0.556 0 0)"        # mid gray
    accent:               "oklch(0.97 0 0)"
    accent-foreground:    "oklch(0.205 0 0)"
    destructive:          "oklch(0.577 0.245 27.325)"  # red
    border:               "oklch(0.922 0 0)"        # soft gray
    input:                "oklch(0.922 0 0)"
    ring:                 "oklch(0.708 0 0)"

  # ── Dark-mode semantic palette ────────────────────────────────────────────
  dark:
    background:           "oklch(0.145 0 0)"        # near-black
    foreground:           "oklch(0.985 0 0)"        # near-white
    card:                 "oklch(0.205 0 0)"        # dark gray
    card-foreground:      "oklch(0.985 0 0)"
    popover:              "oklch(0.205 0 0)"
    popover-foreground:   "oklch(0.985 0 0)"
    primary:              "oklch(0.922 0 0)"        # light gray (inverted)
    primary-foreground:   "oklch(0.205 0 0)"
    secondary:            "oklch(0.269 0 0)"        # dark gray
    secondary-foreground: "oklch(0.985 0 0)"
    muted:                "oklch(0.269 0 0)"
    muted-foreground:     "oklch(0.708 0 0)"        # mid-light gray
    accent:               "oklch(0.269 0 0)"
    accent-foreground:    "oklch(0.985 0 0)"
    destructive:          "oklch(0.704 0.191 22.216)"  # lighter red
    border:               "oklch(1 0 0 / 10%)"     # white 10% alpha
    input:                "oklch(1 0 0 / 15%)"
    ring:                 "oklch(0.556 0 0)"

  # ── Semantic accent colors (status & qualification zones) ─────────────────
  accents:
    live-bg:              "oklch(0.837 0.132 159 / 15%)"   # emerald-500/15
    live-text-light:      "oklch(0.532 0.132 159)"         # emerald-600
    live-text-dark:       "oklch(0.765 0.163 163)"         # emerald-400
    live-dot:             "oklch(0.696 0.17 162)"          # emerald-500
    live-border:          "oklch(0.696 0.17 162 / 20%)"

    zone-emerald-bg:      "oklch(0.696 0.17 162 / 15%)"
    zone-emerald-text:    "oklch(0.453 0.123 157)"         # emerald-700
    zone-green-bg:        "oklch(0.723 0.19 148 / 10%)"
    zone-green-text:      "oklch(0.448 0.145 145)"         # green-700
    zone-amber-bg:        "oklch(0.769 0.188 84 / 15%)"
    zone-amber-text:      "oklch(0.502 0.139 82)"          # amber-700
    zone-orange-bg:       "oklch(0.702 0.195 45 / 15%)"
    zone-orange-text:     "oklch(0.48 0.139 42)"           # orange-700
    zone-blue-bg:         "oklch(0.623 0.214 255 / 15%)"
    zone-blue-text:       "oklch(0.445 0.148 254)"         # blue-700
    zone-red-bg:          "oklch(0.638 0.249 28 / 15%)"
    zone-red-text:        "oklch(0.505 0.191 27)"          # red-600
    zone-purple-bg:       "oklch(0.585 0.196 295 / 15%)"
    zone-purple-text:     "oklch(0.425 0.153 294)"         # purple-700

    positive-gd:          "oklch(0.505 0.14 156)"          # emerald-600 / emerald-400
    negative-gd:          "oklch(0.505 0.191 27)"          # red-600 / red-400

    available-bg:         "oklch(0.723 0.19 148 / 10%)"
    available-border:     "oklch(0.723 0.19 148 / 30%)"
    available-text-light: "oklch(0.448 0.145 145)"
    available-text-dark:  "oklch(0.723 0.19 148)"

  # ── Page background gradients ─────────────────────────────────────────────
  gradients:
    body-light: "linear-gradient(to bottom, white 0%, white 60%, oklch(0.922 0 0) 100%)"
    body-dark:  "linear-gradient(to bottom, black 0%, black 60%, oklch(0.269 0 0) 100%)"
    hero-overlay: "linear-gradient(to top, oklch(0 0 0 / 70%) 0%, oklch(0 0 0 / 10%) 50%, transparent 100%)"
    footer-light: "linear-gradient(to top, oklch(1 0 0 / 30%) 0%, oklch(1 0 0 / 10%) 50%, transparent 100%)"
    footer-dark:  "linear-gradient(to top, oklch(0 0 0 / 30%) 0%, oklch(0 0 0 / 10%) 50%, transparent 100%)"

typography:
  fonts:
    sans:    "Inter, ui-sans-serif, system-ui, sans-serif"
    mono:    "Geist Mono, ui-monospace, monospace"
    heading: "Inter, ui-sans-serif, system-ui, sans-serif"   # same as sans

  scale:
    # Display / hero
    hero-emoji:   { size: "3.75rem", weight: "400" }         # text-6xl
    h1-hero:      { size: "2.25rem", weight: "700", tracking: "-0.025em" }  # text-4xl font-bold tracking-tight
    h1-page:      { size: "1.5rem",  weight: "700", tracking: "-0.025em" }  # text-2xl
    h2-section:   { size: "1.875rem", responsive-max: "2.25rem", weight: "700", tracking: "-0.025em" }
    h3-card:      { size: "1.125rem", weight: "600" }        # text-lg font-semibold

    # Eyebrow / overline labels
    eyebrow:      { size: "0.75rem", weight: "600", transform: "uppercase", tracking: "0.2em" }

    # Navigation
    nav-link:     { size: "1rem",   weight: "500" }          # text-md (same as base)

    # Body
    body-lg:      { size: "1.125rem", weight: "400", leading: "relaxed" }
    body:         { size: "0.875rem", weight: "400", leading: "normal" }
    body-sm:      { size: "0.75rem",  weight: "400" }

    # Data / tabular
    score:        { size: "1.5rem",  weight: "700", variant: "tabular-nums", leading: "none" }
    stat:         { size: "0.875rem", weight: "700", variant: "tabular-nums" }
    stat-muted:   { size: "0.875rem", weight: "400", variant: "tabular-nums" }
    table-header: { size: "0.75rem", weight: "600", transform: "uppercase", tracking: "0.05em" }

    # Meta / caption
    meta:         { size: "0.6875rem", weight: "400" }       # text-[11px]
    micro:        { size: "0.625rem",  weight: "400" }       # text-[10px]

    # Badges
    badge:        { size: "0.75rem",  weight: "500" }
    badge-micro:  { size: "0.625rem", weight: "700" }

spacing:
  # Base unit: 4px (Tailwind default)
  section-y:       "5rem"     # py-20  (80px)
  section-y-sm:    "2.5rem"   # pb-10 (40px)
  content-max-w:   "64rem"    # max-w-5xl (1024px)
  content-px:      "1rem"     # px-4 (16px)
  navbar-px:       "2rem"     # px-8 (32px)
  navbar-height:   "3.75rem"  # h-[60px]
  navbar-top:      "1rem"     # top-4 (16px)
  navbar-pt-clear: "6rem"     # pt-24 (96px) — main content clears fixed nav
  card-gap:        "0.75rem"  # gap-3 (12px) — score card grid
  card-px:         "1.5rem"   # px-6 (24px)
  card-px-sm:      "1rem"     # px-4 (16px)
  icon-xs:         "0.75rem"  # size-3 (12px)
  icon-sm:         "1rem"     # size-4 (16px)
  icon-md:         "1.75rem"  # size-7 (28px)
  icon-lg:         "3rem"     # size-12 (48px)
  contact-grid-gap: "2.5rem"  # gap-10 (40px); md: 4rem (64px)

radii:
  # Base token: 0.625rem (10px)
  base:   "0.625rem"    # --radius
  sm:     "0.375rem"    # base * 0.6
  md:     "0.5rem"      # base * 0.8
  lg:     "0.625rem"    # = base
  xl:     "0.875rem"    # base * 1.4
  "2xl":  "1.125rem"    # base * 1.8  → rounded-2xl (cards, footer, mobile menu)
  "3xl":  "1.375rem"    # base * 2.2  → rounded-3xl (badge pill)
  "4xl":  "1.625rem"    # base * 2.6  → rounded-4xl (buttons, base card)
  full:   "9999px"      # rounded-full (navbar, tabs, filter chips)

  # Applied per component
  navbar:           "9999px"   # pill
  card-base:        "1.625rem" # shadcn Card default (rounded-4xl)
  card-data:        "1.125rem" # ScoreCard / StandingsTable / NewsCard override
  footer:           "1.125rem"
  mobile-menu:      "1.125rem"
  button:           "1.625rem" # pill-ish (rounded-4xl)
  badge:            "1.375rem" # rounded-3xl
  tab-list:         "9999px"
  tab-trigger:      "9999px"
  filter-chip:      "9999px"
  social-btn:       "0.75rem"  # rounded-xl
  position-badge:   "0.5rem"   # rounded-lg (standings rank chip)
  thumbnail:        "0.75rem"  # rounded-xl (news card thumb)
  image-hero:       "1.125rem" # rounded-2xl top corners via card

elevation:
  # Box-shadow scale
  xs:   "0 1px 2px 0 oklch(0 0 0 / 5%)"
  sm:   "0 1px 3px 0 oklch(0 0 0 / 10%), 0 1px 2px -1px oklch(0 0 0 / 10%)"
  md:   "0 4px 6px -1px oklch(0 0 0 / 10%), 0 2px 4px -2px oklch(0 0 0 / 10%)"
  lg:   "0 10px 15px -3px oklch(0 0 0 / 10%), 0 4px 6px -4px oklch(0 0 0 / 10%)"
  xl:   "0 20px 25px -5px oklch(0 0 0 / 10%), 0 8px 10px -6px oklch(0 0 0 / 10%)"

  # Named usages
  navbar-top:    "xl"    # prominent when at page top
  navbar-scroll: "xs"    # recedes into chrome when scrolled
  card:          "md"    # shadcn Card base shadow (+ ring-1 ring-foreground/5)
  card-hover:    "md"    # same tier, slight intensification via border
  mobile-menu:   "xl"

  # Ring (subtle outline-style elevation)
  card-ring-light: "0 0 0 1px oklch(0.145 0 0 / 5%)"
  card-ring-dark:  "0 0 0 1px oklch(0.985 0 0 / 10%)"

motion:
  # Easing functions
  ease-out:      "cubic-bezier(0, 0, 0.2, 1)"
  ease-in-out:   "cubic-bezier(0.4, 0, 0.2, 1)"  # mobile menu slide

  # Duration tokens
  instant:       "150ms"  # hover color transitions
  fast:          "200ms"  # card hover shadow, border
  base:          "250ms"  # table row entrance, news card entrance
  comfortable:   "280ms"  # score card entrance
  slow:          "300ms"  # nav link underline
  deliberate:    "350ms"  # hero news card entrance
  smooth:        "400ms"  # thumbnail image scale on hover
  expressive:    "500ms"  # navbar mount, image fade-in
  fluid:         "550ms"  # contact section reveal
  menu:          "700ms"  # mobile menu slide open/close

  # Entrance animations (Framer Motion)
  card-enter:
    from:        { opacity: 0, y: "16px" }
    duration:    "280ms"
    ease:        "easeOut"
    stagger:     "40ms"

  table-row-enter:
    from:        { opacity: 0, x: "-12px" }
    duration:    "250ms"
    ease:        "easeOut"
    stagger:     "30ms"

  hero-card-enter:
    from:        { opacity: 0, y: "20px" }
    duration:    "350ms"
    ease:        "easeOut"

  section-reveal:
    from:        { opacity: 0, y: "24px" }
    duration:    "550ms"
    ease:        "easeOut"
    trigger:     "inView"
    margin:      "-80px"

  navbar-mount:
    animation:   "fade-in slide-in-from-top-full"
    duration:    "500ms"
    ease:        "easeOut"
    fill-mode:   "forwards"

  scores-grid-stagger: "35ms"

  # Hover interactions
  image-scale-hero:  "scale(1.02), 500ms ease"
  image-scale-thumb: "scale(1.04), 400ms ease"

  # Theme toggle (CSS transitions)
  theme-icon:
    property:    "transform opacity"
    duration:    "150ms"
    ease:        "ease"

  # Mobile menu keyframe
  slide-menu:
    duration:    "700ms"
    easing:      "cubic-bezier(0.4, 0, 0.2, 1)"
    from:        { transform: "translateY(-20px)", maxHeight: "0", opacity: 0 }
    to:          { transform: "translateY(0)",     maxHeight: "600px", opacity: 1 }

effects:
  # Glassmorphism presets
  glass-navbar-top:    { backdropBlur: "10px", bg: "background / 30%", border: "foreground / 30%" }
  glass-navbar-scroll: { backdropBlur: "10px", bg: "background / 80%", border: "transparent" }
  glass-card:          { backdropBlur: "4px",  bg: "card / 60%" }
  glass-footer:        { backdropBlur: "10px", bg: "gradient (see gradients.footer-*)" }

  antialiasing: true
  tabular-nums: true    # all score/stat values use tabular-nums for stability

borders:
  default:      "1px solid border"
  card-data:    "1px solid border / 60%"     # slightly faded
  card-footer:  "1px solid border / 30%"
  table-header: "1px solid border / 50%"
  table-row:    "1px solid border / 30%"
  tab-list:     "1px solid border / 50%"

breakpoints:
  # Tailwind defaults
  sm:  "640px"
  md:  "768px"
  lg:  "1024px"   # content max-width hits here
  xl:  "1280px"
  "2xl": "1536px"

  # Score grid columns
  scores-grid: { default: 1, sm: 2, lg: 3 }
  # Standings columns hidden at breakpoints: GP/W/D/L hidden below sm, GF/GA/GD below md
---

## Visual Identity

Football Hub is a **monochromatic glassmorphism dashboard**. The palette is entirely
achromatic — pure whites, near-blacks, and graduated grays in OKLCH — with a single
chromatic accent: **emerald green** reserved exclusively for live-game indicators, active
navigation state, and qualification-zone badges. This restraint ensures that the moment
a match goes live or a nav link becomes active, the eye goes there immediately.

---

## Background & Atmosphere

The page body carries a subtle **fade-to-gray gradient** — light-mode fades from white to
a soft cool-gray at the bottom; dark mode mirrors this from near-black to a muted dark
gray. The gradient gives depth to an otherwise flat surface and makes the floating
glassmorphic layers feel like they're hovering above a lit stadium floor.

Cards, the navbar, and the footer are all **semi-transparent with backdrop blur**,
borrowing the "frosted glass" idiom throughout. Opacity and blur strength are intentionally
graduated: the navbar starts at 30% background opacity while at the top of the page (letting
the gradient breathe through) and transitions to 80% once scrolled — a quiet shift that
anchors navigation without sudden jumps.

---

## Navigation

The navbar is a **floating pill** — fixed, centered, horizontally centered at viewport
middle, and elevated `top-4` above the page edge so it appears to float free of the
viewport frame. It holds a circular avatar/logo on the left, text links in the center
(desktop), and a theme toggle on the right.

Nav links use a **green underline reveal** animation: a 0-width `h-1 rounded-xl bg-green-500`
bar beneath each link grows to full width on hover and stays at full width on the active
route. This is the primary location where the brand green appears in navigation chrome.

On mobile, the nav collapses to a hamburger; tapping opens a slide-down drawer — an
`overflow-hidden` container animated with a 700ms `cubic-bezier(0.4,0,0.2,1)` keyframe
that expands `maxHeight` from 0 → 600px, giving it a natural accordion feel rather than
a blink-in. Closing reverses the same keyframe.

---

## Cards

Two card shapes coexist:

1. **Base shadcn Card** (`rounded-4xl`) — the default, highly rounded container used as a
   structural wrapper in the contact section and wherever a card functions as a layout
   region rather than a data unit.

2. **Data Cards** (`rounded-2xl`) — ScoreCard, NewsCard, and StandingsTable container all
   override to `rounded-2xl`. This is a deliberate loosening: data-dense components look
   friendlier with a slightly tighter radius, and the contrast between the two tiers
   creates a subtle hierarchy (layout shell vs. content atom).

All cards share `bg-card/60 backdrop-blur-sm`, meaning they're glassy by default.
Hover state lifts `shadow-sm` → `shadow-md` and brightens the border from `border/60%`
to `border/80%`, producing a tactile pop without any translateY jump.

---

## Score Cards

Each ScoreCard is a **self-contained match summary**:

- **Header row**: a `StatusBadge` (live/post/pre) on the left; tournament flag + short name
  on the right as an outline badge.
- **Body**: two team columns with a 48px logo, team name, and score (2xl bold tabular-nums)
  flanking a centered divider that shows either the match time (pre) or a muted "vs" label
  (post/live).
- **Footer**: venue, date, and round separated by faint dividers — all in the `text-[11px]`
  micro scale with muted-foreground/70 opacity, so the chrome never competes with the score.

Live matches get the full emerald treatment: pulsing dot, emerald-tinted badge background,
emerald border. Completed matches use a secondary gray badge. Upcoming matches use an
outline badge with the scheduled time.

Winner highlighting: the winning team's name and score shift from `text-muted-foreground`
to `text-foreground font-semibold` / `font-bold`. The loser doesn't get a penalty style —
contrast is used positively, not punitively.

---

## Standings Table

The table lives inside a `rounded-2xl border/60 bg-card/50 backdrop-blur-sm` container.
Table headers are uppercase, tracked-wider, `text-xs font-semibold` in muted-foreground —
classic data-grid chrome that recedes behind the content.

**Position badges** are `size-8 rounded-lg` chips. Their color is driven by qualification
zones: emerald for Champions League/Libertadores-equivalent, green for playoff routes,
amber for secondary cups, red for relegation, and neutral (`text-muted-foreground`) for
mid-table. Each zone color uses an alpha-15% background tint paired with a saturated text
color — the "soft tinted chip" pattern used consistently across badges in this UI.

**Goal difference** column uses semantic coloring inline: `text-emerald-600` for positive,
`text-red-600` for negative, muted for zero — a direct data-to-color mapping that requires
no legend.

Rows enter left-to-right via Framer Motion (`x: -12 → 0`), staggered at 30ms per row,
making the table feel populated progressively rather than appearing as a single flash.

---

## News

The news layout leads with a **HeroNewsCard**: a full-width aspect-video image with an
absolute overlay text block anchored to the bottom. A `gradient-to-top from-black/70`
scrim ensures white headline text reads cleanly over any image. On hover, the image
scales to `1.02` over 500ms — a subtle zoom that signals interactivity without distorting
the layout.

Below the hero, a grid of compact **NewsCards** uses a horizontal thumbnail (80–96px
square, `rounded-xl`) + text layout. The external-link icon fades from `opacity-40`
to `opacity-70` on group hover, a micro-detail that confirms the card is a link.

---

## Typography Hierarchy

The type scale is split into four distinct registers:

| Register | Examples | Characteristics |
|---|---|---|
| **Display** | Page H1, section H2 | Bold, tight tracking, large |
| **Eyebrow** | "Contact", "Navigate", "Find me on" | 12px, 600, uppercase, `tracking-[0.2em]` |
| **Data** | Scores, standings stats | `tabular-nums`, bold or semibold |
| **Chrome** | Meta dates, venue, micro labels | 11px–10px, muted-foreground/60–70 |

The eyebrow label pattern is used aggressively — it introduces every major section and
column header, providing scannable entry points into dense data.

---

## Badges

Badges follow a unified **soft tinted chip** pattern: 15% alpha background in the zone
color + matched text color, with `border-transparent` by default. The pill shape
(`rounded-3xl`) and `h-5` fixed height ensure consistent vertical rhythm when inline with
text. In data contexts (filter chips, tab badges, standings zone chips) the same shape
widens to accommodate labels. In the live indicator the chip gains a `border-emerald-500/20`.

---

## Footer

The footer is a **floating glass card** — `rounded-2xl`, slightly separated from the
viewport bottom (`mb-3`), with a gradient-to-transparent top edge and `backdrop-blur-[10px]`
matching the navbar. It uses a 3-column responsive grid: brand identity (name, title,
location, availability badge), navigation links, and social icon buttons. The
"Available for Freelance" badge is a green pulsing-dot chip, mirroring the live-match
badge pattern — reusing the semantic green for "something active now."

---

## Motion Philosophy

Animation in Football Hub is **entrance-focused and staggered**. Elements don't animate
on idle or loop (except the live pulse dot and the available-for-work dot). Every meaningful
view transition — page sections, card grids, table rows — uses a `y` or `x` offset fade-in
coordinated by Framer Motion's `staggerChildren`. The stagger increments are small
(30–40ms) so the cascade reads as "data loading in" rather than theatrical choreography.

Hover states use pure CSS transitions at 150–300ms: fast enough to feel responsive, slow
enough to be intentional. Image scale transforms (`1.02`–`1.04`) use the longest durations
(400–500ms) since images are heavyweight elements that reward a slower reveal.

The navbar entrance uses Tailwind's `animate-in` with `slide-in-from-top-full` at 500ms —
a single deliberate drop-in that orients the user on first load without repeating.

---

## Color Usage Rules

1. **Emerald green is the only chromatic color in the UI chrome.** It appears on: active
   nav underlines, live-match badges, pulsing status dots, and the "available" indicator.
2. **All other status colors** (zone qualifications, goal-difference tints) are used inside
   data components only, never in navigation or layout chrome.
3. **Opacity layering** replaces color mixing: borders at `/30`–`/60`, overlays at `/15`,
   glass backgrounds at `/30`–`/80`. This lets the underlying gradient surface remain
   visible through every layer.
4. **Dark mode inverts luminance, not hue.** The primary color in dark mode is a light gray
   (`oklch(0.922 0 0)`) — the same achromatic logic, just flipped.

---

## Accessibility Notes

- All interactive cards use full-card `<a>` overlays with `aria-label` set to the card
  title, ensuring keyboard and screen-reader access without duplicate tab stops.
- The theme toggle icon swap uses `sr-only` span for accessible labels.
- Navigation uses a `<ul>` list with `aria-expanded` on the mobile hamburger.
- Table headers use semantic `<th>` elements with consistent scope.
- All icon-only buttons (social, theme) carry `aria-label` or `title` attributes.
- Score values use `tabular-nums` to prevent layout shift as live scores update.
