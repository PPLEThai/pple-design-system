# People's Party Design Systems

**Documentation:** [https://components.pplethai.org/](https://components.pplethai.org/)

Monorepo for **@pplethai/components** — the People's Party React design system built on shadcn/ui.

## Packages

| Package | Description |
|---------|-------------|
| [`@pplethai/components`](./packages/components) | Publishable React component library |
| [`docs`](./apps/docs) | Vite documentation site |

## Development

```bash
bun install       # Bun version is pinned in .bun-version
bun run dev       # docs site at http://localhost:5173
bun run build     # build library + docs
bun run test      # vitest in packages/components
bun run check     # format check + lint + typecheck + test + build (what CI runs)
```

## Consumer setup

```bash
bun add @pplethai/components react react-dom react-hook-form zod
```

```tsx
import "@pplethai/components/styles.css";
import { Button, Card, cn } from "@pplethai/components";
import { Form, FormTextField } from "@pplethai/components/form";
```

### Tailwind CSS v4 theme

```css
/* your app's main stylesheet (Tailwind CSS v4) */
@import "tailwindcss";
@import "@pplethai/components/theme.css";
@source "../node_modules/@pplethai/components/dist";
```

`theme.css` carries the design tokens (colors, type scale, radius, animations, dark variant) and
base styles. The `@source` path is relative to the stylesheet; point it at the installed package
so Tailwind keeps the classes the components use. Tailwind CSS v3 and `tailwind-preset` are no
longer supported (removed in 2.0.0).

### Fonts

Headings use **Anakotmai** (medium only) from the party CDN. Body uses **IBM Plex Sans Thai Looped** via `@fontsource` (400 and 600).

## Publishing

Uses [Changesets](https://github.com/changesets/changesets). Releases run from [`.github/workflows/release.yml`](./.github/workflows/release.yml) via [npm trusted publishing](https://docs.npmjs.com/trusted-publishers/) (GitHub OIDC — no `NPM_TOKEN` secret).

### One-time npm setup

On [npm → @pplethai/components → Settings → Trusted publishing](https://www.npmjs.com/package/@pplethai/components/settings), add a **GitHub Actions** trusted publisher:

| Field | Value |
|-------|-------|
| Repository owner | `PPLEThai` |
| Repository name | `pple-design-system` |
| Workflow filename | `release.yml` |
| Environment | *(leave empty unless you add a GitHub Environment)* |

The workflow filename must match exactly (including `.yml`). After the first successful OIDC publish, you can remove the `NPM_TOKEN` repository secret if it is still configured.

### Docs site (Cloudflare Pages)

Run **Deploy Docs to Cloudflare Pages** from the Actions tab (manual workflow). Add repository secrets:

- `CLOUDFLARE_API_TOKEN` — API token with **Cloudflare Pages — Edit** permission
- `CLOUDFLARE_ACCOUNT_ID` — your Cloudflare account ID
- `CLOUDFLARE_PAGES_PROJECT_NAME` — Cloudflare Pages project name (e.g. `pple-design-systems-docs`)

Create a Pages project with the same name as `CLOUDFLARE_PAGES_PROJECT_NAME` before deploying.

## License

MIT
