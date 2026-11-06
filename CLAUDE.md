# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun install           # install all workspace dependencies (Bun pinned in .bun-version)
bun run dev           # build components then start docs site at http://localhost:5173
bun run build         # build @pplethai/components + docs
bun run test          # run Vitest in packages/components (jsdom, single run)
bun run lint          # oxlint (type-aware + TypeScript diagnostics) across the repo
bun run format        # oxfmt (also sorts Tailwind classes)
bun run typecheck     # tsc -b from root (covers all packages)
bun run check         # everything CI runs; must be green before a PR
bun run changeset     # open Changesets CLI to record a user-facing change

# scoped commands
bun run --filter @pplethai/components test:watch   # vitest in watch mode
bun run --filter @pplethai/components build        # tsdown ESM+CJS + CSS
bun run --filter docs dev                          # docs Vite dev server only
```

## Architecture

This is a **Bun workspace monorepo** with two workspaces:

| Path | Package | Role |
|---|---|---|
| `packages/components` | `@pplethai/components` | Published React component library |
| `apps/docs` | `docs` (private) | Vite documentation site consuming the library |

### `packages/components`

**Build** — `tsdown` produces two entry points (`.d.ts` via the TypeScript 7 `tsgo` backend):
- `dist/index.{js,cjs,d.ts}` — all UI and layout exports
- `dist/form.{js,cjs,d.ts}` — react-hook-form integration (`Form*` components)

CSS is built separately via `tailwindcss -i src/styles/globals.css -o dist/styles.css` (Tailwind CSS v4), then
`scripts/flatten-css-layers-cli.ts` removes the `@layer` blocks so `dist/styles.css` keeps the 1.x cascade: app CSS
outside any layer must not override component utilities. `theme.css` keeps its layers (Tailwind v4 apps own the cascade).

**Exports**
- `@pplethai/components` → `src/index.ts` (Button, Card, Navbar, Icon, layout primitives, etc.)
- `@pplethai/components/form` → `src/form/index.ts` (FormTextField, FormSelectField, FormCheckboxField + raw shadcn form primitives)
- `@pplethai/components/styles.css` → compiled CSS consumers must import
- `@pplethai/components/theme.css` → `src/styles/theme.css` (Tailwind v4 `@theme` tokens + base styles for consumers)

**Source layout**
- `src/components/ui/` — shadcn/ui-based primitives (one file per component)
- `src/components/layout/` — `Stack`, `Inline`, `Container` layout primitives
- `src/components/navbar.tsx`, `logo.tsx`, `icon.tsx` — brand-specific components
- `src/form/fields.tsx` — higher-level controlled form fields (wraps shadcn form + react-hook-form)
- `src/lib/utils.ts` — `cn()` (clsx + tailwind-merge)
- `src/lib/variants.ts` — shared CVA variant sets (`gapVariants`, `containerVariants`)
- `src/lib/gradients.ts` — gradient token map
- `src/styles/theme.css` — Tailwind v4 theme: `@theme` tokens, CSS variables, dark mode, custom utilities/animations, Sonner overrides
- `src/styles/globals.css` — entry for the standalone `dist/styles.css` (`@import "tailwindcss"` + `theme.css`)

**Design tokens** — all colors are CSS custom properties (`--primary`, `--secondary`, etc.) defined in `theme.css`; never hardcode hex values in components. Dark mode is class-based (`@custom-variant dark` in `theme.css`).

**Typography** — headings use `font-heading` (Anakotmai from CDN), body uses `font-body` (IBM Plex Sans Thai Looped via `@fontsource`). Font size scale is Tailwind's default multiplied by `1.2` (`--text-*` in `theme.css`).

### `apps/docs`

Vite + React Router v7 SPA. Imports `@pplethai/components` via `workspace:*` (uses the `development` export condition pointing directly at `src/index.ts`, so no rebuild needed during docs dev). Each page in `src/pages/` demonstrates one component category.

## Conventions

- Use `cn()` for all className composition.
- Export `*Variants` (CVA) alongside components that have variants.
- Multi-part components use compound APIs (e.g. `Card.Header` pattern via named exports like `CardHeader`).
- Icons: use `lucide-react` via the `Icon` wrapper or direct import.
- Tests: Vitest + `@testing-library/react` with jsdom. Add smoke tests in `packages/components/src/`.
- Prefer `gap-*` on flex/grid containers over `space-x/y-*`: Tailwind v4 moved `space-*` to margin-bottom, which inline children ignore.
- Run `bun run changeset` for any user-facing change before opening a PR.

## Publishing & CI

- Releases use [Changesets](https://github.com/changesets/changesets) with [npm trusted publishing](https://docs.npmjs.com/trusted-publishers/) from `release.yml` (OIDC; configure the trusted publisher on npm for `PPLEThai/pple-design-system` / `release.yml`).
- Docs are deployed to Cloudflare Pages via a manual GitHub Actions workflow (`CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_PAGES_PROJECT_NAME` secrets required).
