# @pplethai/components

People's Party design system — React + TypeScript components on shadcn/ui.

## Install

```bash
bun add @pplethai/components react react-dom react-hook-form zod
```

```tsx
import "@pplethai/components/styles.css";
import { Button, Logo, Navbar, Stack, cn, buttonVariants } from "@pplethai/components";
```

## Tailwind CSS v4

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
| `@pplethai/components/theme.css` | Tailwind CSS v4 theme (tokens + base styles) |

## Typography

- **Headings:** Anakotmai (medium 500 only) — loaded from `storage.googleapis.com/pple-media/fonts`
- **Body:** IBM Plex Sans Thai Looped (400, 600) — bundled via `@fontsource`

## Brand colors

- Primary: `#FF6A13`
- Secondary: `#002B49`
- Neutrals: `#212121`, `#464646`
- Destructive: `#C13200`
