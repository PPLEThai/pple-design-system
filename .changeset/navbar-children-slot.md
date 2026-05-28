---
"@pplethai/components": minor
---

Navbar now accepts `children` as a trailing slot — rendered to the right of the links on desktop and at the top of the mobile dropdown panel. Useful for login buttons, notification bells, theme toggles, etc. When the navbar is in `dark` variant, children are wrapped in a `.dark` scope so design tokens automatically flip to dark-mode values.
