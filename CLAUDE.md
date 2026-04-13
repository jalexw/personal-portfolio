# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

J. Alex Whitman's personal portfolio (jalexw.ca), deployed to Vercel. Next.js 16 App Router + React 19 + Three.js / React Three Fiber for a 3D avatar experience on the landing page. Package manager is **bun** (not npm/yarn/pnpm).

## Commands

```bash
bun install              # install deps (auto-runs via SessionStart hook if node_modules missing)
bun run dev              # dev server on :3000 with Turbopack
bun run build            # production build (runs Sentry source-map upload)
bun run start            # run production build
bun run lint             # `next typegen && eslint` — typegen is required before lint so Next's generated types exist
bun run build:resume-pdf # boots dev server, renders /resume via puppeteer to a PDF, tears it down
```

Single-test command: no test suite is configured. Type-check via `bunx tsc --noEmit`. `bun run lint` runs ESLint over `src/**/*.{ts,tsx,js,jsx}` with the flat config in `eslint.config.cjs`.

## Architecture

### Route structure (App Router)
- `src/app/layout.tsx` — root layout; wraps everything in `ClientProviders` (theme + framer-motion + tooltip + toaster from `@schemavaults/ui`).
- `src/app/(index)/` — the landing page route group. `page.tsx` re-exports `IndexPage` from `src/components/IndexPage/`. The layout is a vertical stack of section components under `src/components/IndexPage/sections/`.
- `src/app/resume/` — standalone `/resume` page, also the PDF source. Components here are resume-specific and not shared with the index page.
- `src/app/api/contact/route.ts` — POST endpoint that validates via the zod schema exported from `ContactFormDialog`, then uses Resend to send both a notification (to contact@jalexw.ca) and a confirmation (to the submitter). `runtime = "nodejs"`.

### The 3D avatar experience
This is the bulk of the non-trivial code. It spans several directories that work together:

- `src/lib/portfolio-experience-load-manager.ts` — `PortfolioExperienceLoadManager` class wrapping Three.js `LoadingManager` + `GLTFLoader`. Loads GLTF assets listed in `experience-asset-definitions.ts` (currently just the avatar `.glb`) and caches them in a Map keyed by asset name.
- `src/components/experience-loader/` — `PortfolioExperienceProvider` owns the load manager in a ref, drives loading via `useEffect`, and exposes state through `PortfolioExperienceContext`. State transitions go through `useExperienceManagerLoadingStatesReducer` and are wrapped in `useTransition`.
- `src/contexts/portfolio-experience-loading-context.ts` — loading state context.
- `src/contexts/portfolio-experience-interactions-state-context.ts` + `...-dispatch-context.ts` — split context pattern (state and dispatch separate) for avatar interaction state, reduced by `src/lib/experience-interactions-state-reducer.ts`.
- `src/components/experience/` — the actual R3F scene: `canvas.tsx` (R3F root), `scene.tsx`, `avatar.tsx` (with `TAvatarRef`), animation hooks (`avatar_animation*`, `useUpdateAnimationMixerClock`, `useUpdateOpacity`), cursor-driven camera movement (`useCursorCameraMovementEffect`), and `ExperienceErrorBoundary`. `dynamic.tsx` is the SSR-disabled dynamic import entry point.
- `scripts/add_mixamo_animations_to_gltf.py` — Python pipeline that bakes Mixamo animations into the GLB served at `/assets/alex_avatar/output/alex_avatar.glb`.

When adding a new 3D asset: register it in `experience-asset-definitions.ts` — the `name`/`url` literal types propagate through the load manager's generics.

### Cross-cutting
- `src/metadata/` — exports typed metadata (name, email, social handles, domain). Most values come from `NEXT_PUBLIC_*` env vars (see `.env.example`). Import from `@/metadata` rather than duplicating strings.
- `src/hooks/useDebug.ts` + `src/lib/isDebugFlagSetInEnvironmentVariables.ts` — gate verbose console logging on a debug flag. Follow the existing `if (debug) console.log(...)` pattern in the experience code.
- Path alias `@/*` → `src/*` (configured in `tsconfig.json`).
- `next.config.ts` — transpiles `three`, `@schemavaults/ui`, `@schemavaults/theme`; configures Turbopack to load `*.svg` via `@svgr/webpack`; wraps the config in `withSentryConfig` (org `j-alex-whitman`, project `jalexw-portfolio`).

### UI / styling
- Tailwind CSS 3 + `@schemavaults/ui` component library (re-exports shadcn-style primitives) + `@schemavaults/theme` (global CSS). These are external workspace packages, not in this repo.
- Theme is light/dark via `BrightnessThemeProvider` with `attribute="class"` and `defaultTheme="system"`.

## Environment

Required env vars are listed in `.env.example`. `RESEND_PRIVATE_KEY` is required for the `/api/contact` route; the public `NEXT_PUBLIC_*` vars drive `src/metadata/` at build time.

## Claude-specific

`.claude/settings.json` registers a `SessionStart` hook that runs `.claude/hooks/install-deps-in-fresh-environment.sh` — this auto-runs `bun install` if `node_modules/` is missing (useful in fresh worktrees / sandboxes).
