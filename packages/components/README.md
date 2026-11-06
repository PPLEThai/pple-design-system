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

`styles.css` has no cascade layers, the same as 1.x, so an app's own CSS keeps the precedence it had
before 2.0. Apps on Tailwind CSS v4 import `theme.css` below instead; loading `styles.css` beside an
app's own Tailwind v4 build lets its unlayered base styles override the app's layered utilities.

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

## Browser support

Safari 16.4+ (iOS 16.4+), Chrome 111+, Firefox 128+: the Tailwind CSS v4 baseline. Older browsers,
including iOS 15 WebViews, are not supported from 2.0.0.

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
