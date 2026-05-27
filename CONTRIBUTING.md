# Contributing

## Adding a component

1. Add or update the component in `packages/components/src/components/ui/`.
2. Use `cn()` and export `*Variants` for variant-driven components.
3. Export from `packages/components/src/index.ts`.
4. Add a docs example in `apps/docs/src/pages/`.
5. Run `pnpm changeset` for user-facing changes.

## Conventions

- Compound APIs for multi-part components (e.g. `Card.Header`, `Dialog.Content`).
- Brand tokens via CSS variables — no hardcoded hex in components.
- Icons: `lucide-react` via `Icon` wrapper or direct import.
- Tests: add Vitest smoke tests in `packages/components/src/`.
