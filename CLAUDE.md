# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm install          # install all workspace dependencies
pnpm dev              # build components then start docs site at http://localhost:5173
pnpm build            # build @pplethai/components + docs
pnpm test             # run Vitest in packages/components (jsdom, single run)
pnpm lint             # ESLint across the whole monorepo
pnpm typecheck        # tsc -b from root (covers all packages)
pnpm changeset        # open Changesets CLI to record a user-facing change

# scoped commands
pnpm --filter @pplethai/components test:watch   # vitest in watch mode
pnpm --filter @pplethai/components build        # tsup ESM+CJS + CSS
pnpm --filter docs dev                          # docs Vite dev server only
```

## Architecture

This is a **pnpm monorepo** with two workspaces:

| Path | Package | Role |
|---|---|---|
| `packages/components` | `@pplethai/components` | Published React component library |
| `apps/docs` | `docs` (private) | Vite documentation site consuming the library |

### `packages/components`

**Build** — `tsup` produces two entry points:
- `dist/index.{js,cjs,d.ts}` — all UI and layout exports
- `dist/form.{js,cjs,d.ts}` — react-hook-form integration (`Form*` components)

CSS is built separately via `tailwindcss -i src/styles/globals.css -o dist/styles.css`.

**Exports**
- `@pplethai/components` → `src/index.ts` (Button, Card, Navbar, Icon, layout primitives, etc.)
- `@pplethai/components/form` → `src/form/index.ts` (FormTextField, FormSelectField, FormCheckboxField + raw shadcn form primitives)
- `@pplethai/components/styles.css` → compiled CSS consumers must import
- `@pplethai/components/tailwind-preset` → `tailwind.preset.ts` (re-exports theme + plugins from `tailwind.config.ts`)

**Source layout**
- `src/components/ui/` — shadcn/ui-based primitives (one file per component)
- `src/components/layout/` — `Stack`, `Inline`, `Container` layout primitives
- `src/components/navbar.tsx`, `logo.tsx`, `icon.tsx` — brand-specific components
- `src/form/fields.tsx` — higher-level controlled form fields (wraps shadcn form + react-hook-form)
- `src/lib/utils.ts` — `cn()` (clsx + tailwind-merge)
- `src/lib/variants.ts` — shared CVA variant sets (`gapVariants`, `containerVariants`)
- `src/lib/gradients.ts` — gradient token map
- `src/styles/globals.css` — CSS variables, dark mode, custom animations, Sonner overrides

**Design tokens** — all colors are CSS custom properties (`--primary`, `--secondary`, etc.) defined in `globals.css`; never hardcode hex values in components. Dark mode is class-based (`darkMode: ["class"]`).

**Typography** — headings use `font-heading` (Anakotmai from CDN), body uses `font-body` (IBM Plex Sans Thai Looped via `@fontsource`). Font size scale is multiplied by `1.2` in `tailwind.config.ts`.

### `apps/docs`

Vite + React Router v7 SPA. Imports `@pplethai/components` via `workspace:*` (uses the `development` export condition pointing directly at `src/index.ts`, so no rebuild needed during docs dev). Each page in `src/pages/` demonstrates one component category.

## Conventions

- Use `cn()` for all className composition.
- Export `*Variants` (CVA) alongside components that have variants.
- Multi-part components use compound APIs (e.g. `Card.Header` pattern via named exports like `CardHeader`).
- Icons: use `lucide-react` via the `Icon` wrapper or direct import.
- Tests: Vitest + `@testing-library/react` with jsdom. Add smoke tests in `packages/components/src/`.
- Run `pnpm changeset` for any user-facing change before opening a PR.

## Publishing & CI

- Releases use [Changesets](https://github.com/changesets/changesets). Requires `NPM_TOKEN` in GitHub secrets.
- Docs are deployed to Cloudflare Pages via a manual GitHub Actions workflow (`CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID` secrets required).
