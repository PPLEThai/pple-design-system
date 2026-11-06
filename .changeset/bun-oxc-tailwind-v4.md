---
"@pplethai/components": major
---

Move to Tailwind CSS v4, React 19.3, and a Bun + oxc toolchain.

**Breaking:** `@pplethai/components/tailwind-preset` is removed; Tailwind CSS v3 is no longer supported.
Tailwind v4 apps import the theme instead:

```css
@import "tailwindcss";
@import "@pplethai/components/theme.css";
@source "../node_modules/@pplethai/components/dist";
```

Apps that only import `@pplethai/components/styles.css` need no change: the build removes Tailwind v4's
cascade layers from it, so app CSS beside it keeps the precedence it had in 1.x. Tailwind v4 apps import
`theme.css` instead of `styles.css`. Component APIs and exports
are unchanged, and the docs site renders the same as 1.4.3.
