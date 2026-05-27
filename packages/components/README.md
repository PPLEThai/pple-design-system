# @pplethai/components

People's Party design system — React + TypeScript components on shadcn/ui.

## Install

```bash
pnpm add @pplethai/components react react-dom react-hook-form zod
```

```tsx
import "@pplethai/components/styles.css";
import { Button, Logo, Navbar, Stack, cn, buttonVariants } from "@pplethai/components";
```

## Form kit

```tsx
import { Form, FormTextField, FormCheckboxField } from "@pplethai/components/form";
```

## Exports

| Entry | Description |
|-------|-------------|
| `@pplethai/components` | Components, `cn`, variants, layout primitives, `Icon`, `Logo`, `Navbar` |
| `@pplethai/components/form` | Form primitives + field helpers |
| `@pplethai/components/styles.css` | Compiled styles + fonts |
| `@pplethai/components/tailwind-preset` | Tailwind theme extension |

## Typography

- **Headings:** Anakotmai (medium 500 only) — loaded from `storage.googleapis.com/pple-media/fonts`
- **Body:** IBM Plex Sans Thai Looped (400, 600) — bundled via `@fontsource`

## Brand colors

- Primary: `#FF6A13`
- Secondary: `#002B49`
- Neutrals: `#212121`, `#464646`
- Destructive: `#C13200`
