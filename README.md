# People's Party Design Systems

Monorepo for **@pplethai/components** — the People's Party React design system built on shadcn/ui.

## Packages

| Package | Description |
|---------|-------------|
| [`@pplethai/components`](./packages/components) | Publishable React component library |
| [`docs`](./apps/docs) | Vite documentation site |

## Development

```bash
pnpm install
pnpm dev          # docs site at http://localhost:5173
pnpm build        # build library + docs
pnpm test         # vitest in packages/components
```

## Consumer setup

```bash
pnpm add @pplethai/components react react-dom react-hook-form zod
```

```tsx
import "@pplethai/components/styles.css";
import { Button, Card, cn } from "@pplethai/components";
import { Form, FormTextField } from "@pplethai/components/form";
```

### Tailwind preset

```ts
import type { Config } from "tailwindcss";
import preset from "@pplethai/components/tailwind-preset";

export default {
  presets: [preset],
  content: ["./src/**/*.{ts,tsx}", "./node_modules/@pplethai/components/dist/**/*.js"],
} satisfies Config;
```

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
