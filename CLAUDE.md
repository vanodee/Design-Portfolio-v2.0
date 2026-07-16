# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Next.js 16 (App Router) + React 19 personal design portfolio, content-managed via a separate Sanity Studio CMS in `sanity/`. Styling is Sass Modules (`*.module.scss` co-located per component/page) — no Tailwind or CSS-in-JS in the main app.

## Commands

Run from the repo root for the Next.js app:
- `npm run dev` — dev server
- `npm run build` — production build
- `npm run lint` — ESLint (flat config, `eslint-config-next`)
- `npm test` — Vitest

The Sanity Studio is a **separate project** with its own `package.json`/lockfile in `sanity/` (not an npm workspace). Run its scripts (`dev`, `build`, `deploy`) from inside `sanity/`, not the root.

## Two-project layout

- Root: the Next.js site (App Router pages in `app/`, data fetching in `lib/`).
- `sanity/`: the Sanity Studio CMS — independent dependencies, own ESLint config, own Prettier config (`semi: false, printWidth: 100, bracketSpacing: false, singleQuote: true`) that applies only to Studio code.

## Sanity integration — schema/query coupling

`lib/queries.ts` has one large GROQ query (`allProjectsQuery`) that uses conditional projections per project category (Web Apps, Websites, UX Case Studies, Logos & Branding) to fetch different field sets from a single `project` schema. When adding or changing a project category's fields, both sides must be updated together:
- `sanity/schemaTypes/` (e.g. `webAppFields.ts`, `websiteFields.ts`, `uxCaseStudyFields.ts`, `logoBrandingFields.ts`)
- the matching conditional projection in `lib/queries.ts`

`lib/sanity.client.ts` only hits the Sanity CDN in production (`useCdn: process.env.NODE_ENV === 'production'`) — expect fresher-but-slower data in dev.

`sanity/SCHEMA.md`, `sanity/FRONTEND_INTEGRATION.md`, and `sanity/OPTIMIZATION_CHECKLIST.md` are standalone reference docs for other projects consuming this same Sanity dataset (and for tracking known gaps in this one) — `SCHEMA.md` covers the content model (document types, every field per project category, the `categoryName` sync mechanism), `FRONTEND_INTEGRATION.md` covers how this repo's frontend actually fetches/renders it (query catalog including inline non-`lib/queries.ts` queries, image/video URL + hotspot handling, category-dispatch rendering, static-asset dependencies like the live-link CTA icons, known gotchas like the home page's positional category indexing), and `OPTIMIZATION_CHECKLIST.md` tracks known Sanity integration gaps and their solution paths. All three are gitignored (local-only, not committed).

**Whenever any Sanity-related change lands in this repo — new/changed fields in `sanity/schemaTypes/`, new/changed GROQ queries anywhere in `app/` or `lib/queries.ts`, new document types, changes to how images/videos/routing are handled, or any fix that touches an item tracked in `OPTIMIZATION_CHECKLIST.md` — update all three docs as part of that change, not just whichever one seems most relevant:**
- `SCHEMA.md` — if the content model itself changed (fields, types, document types).
- `FRONTEND_INTEGRATION.md` — if how the data is fetched, queried, or rendered changed.
- `OPTIMIZATION_CHECKLIST.md` — check off / update the status of any item the change addresses, and add a new entry if the change surfaces a new gap.
This applies even when only one of the three seems obviously affected — check all three before considering a Sanity-related change complete.

## React Compiler

`reactCompiler: true` is enabled in `next.config.ts`. Manual `useMemo`/`useCallback` are largely unnecessary — don't add them by default.

## Env vars

Next.js app needs `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` in `.env.local` (gitignored, no `.env.example` committed). The Sanity Studio needs its own `.env` in `sanity/` with `SANITY_STUDIO_PROJECT_ID` / `SANITY_STUDIO_DATASET`.

## Testing

Vitest + React Testing Library (`vitest.config.ts`, `vitest.setup.ts`). Run with `npm test`. Component tests are co-located next to the component (e.g. `app/components/DigitalClock/DigitalClock.test.tsx`). This is a fresh setup with minimal coverage — add tests for new/changed logic as you go rather than assuming existing components are covered.

## Workflow

- Commits go directly to `main` — no branches/PRs.
- Pushing to `main` triggers an auto-deploy on Vercel, so treat pushes as deploys.
- Commit messages are prefixed by category: `[t]` task, `[i]` install/add a dependency, `[u]` uninstall/remove a dependency. Follow this convention for commits that clearly fit one of the three; use a plain descriptive message otherwise.

### Sequencing for `sanity/OPTIMIZATION_CHECKLIST.md` work specifically

We stay on `main` for this work (no feature branches), which means every push is a production
deploy — so multi-step Sanity changes must be sequenced across separate pushes, never combined
into one:
1. Ship the schema/type change alone first (new fields/document types) — additive only, nothing
   in the frontend depends on it yet, so it's safe to deploy.
2. Populate the new content in the Sanity Studio (the user does this — see the notify-first rule
   in this project's memory) before the next step ships.
3. Only then ship the frontend query/render change that starts depending on the new
   field/document existing. Never land steps 1 and 3 in the same commit/push — if content isn't
   populated yet, that push would deploy a frontend expecting data that isn't there.
