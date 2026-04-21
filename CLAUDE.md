# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

You are an expert Next.js 16 senior engineer specialized in utilizing TypeScript 6, Tailwind CSS 4, Shadcn/ui components, and Vercel. Adhere to the absolute best practices of each technology in the stack. Below are the documentation links for each so that you can always reference in order to have the upmost best solutions and implementations.

Next.js 16: https://nextjs.org/docs
React 19: https://react.dev/reference/react
TypeScript 6: https://www.typescriptlang.org/docs/
Tailwind CSS 4: https://tailwindcss.com/docs
Shadcn/ui: https://ui.shadcn.com/docs/

## Commands

```bash
npm run dev        # Start dev server with Turbopack
npm run build      # Production build
npm run lint       # ESLint
npm run format     # Prettier (formats all .ts/.tsx files)
npm run typecheck  # TypeScript type checking (no emit)
```

## Architecture

Next.js 16 app router project using React 19, Tailwind CSS v4, and shadcn/ui.

**Key directories:**
- `app/` — Next.js app router pages and layouts
- `app/api/resend/route.ts` — POST endpoint for sending contact form emails via Resend
- `components/ui/` — shadcn/ui components (add via `npx shadcn@latest add <component>`) utilizng BaseUI
- `components/Email.tsx` — React Email template for the contact form notification
- `lib/utils.ts` — `cn()` helper (clsx + tailwind-merge)

**Email flow:** `POST /api/resend` accepts `{ name, email, message }`, renders `ContactEmail` via `@react-email/components`, and sends with the Resend SDK. Requires `RESEND_API_KEY` in `.env`.

**Styling:** Tailwind v4 with CSS-variable-based theming. Dark mode is class-based (`.dark`). Use `cn()` for conditional class merging. Prettier is configured to auto-sort Tailwind classes using `prettier-plugin-tailwindcss` against `app/globals.css`.

**Formatting conventions:** no semicolons, double quotes, 2-space indent, trailing commas (ES5), LF line endings.

**UI conventions:** you MUST utilize ONLY shadcn/ui components for any and all UI elements. All styling MUST be done using ONLY Tailwind CSS classes. You have creative liberty on which components to utilize. 

**Shadcn preset:** the current and applied shadcn preset is "--preset b1VlIttK". You must NOT update the fonts.

**Skills:** 
***For any UI/UX related requests:***, utilize the ui-ux-pro-max skill. Every design MUST be professional, smooth, engaging, and breath taking. People need to look at it and think that the website is worth $1M. Also refer to the .agents/skills/shadcn directory for shadcn ui rules and skills.
***For any copy related requests:*** utilize the "marketing-skills@marketingskills" to write professional, non-generic, engaging, and psychologically triggering copies.
***Code Simplification:*** Upon every request, ALWAYS use the "code-simplifier@claude-plugins-official" skill to simplify the implementation. The objective is to adhere to absolute best practices across all technologies in the tech stack and enable scalability and performance.
***CLAUDE.md Updates:*** You can update the CLAUDE.md file as the codebase grows and scales so that future requests can better understand the architecture. Use the "claude-md-management@claude-plugins-official" skills to do so.
