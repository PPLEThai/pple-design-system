---
"@pplethai/components": patch
---

Fix `Button` rendering:

- `variant="outline"`: border and text now use the foreground token in dark mode so the button is visible on dark navy surfaces (previously navy-on-navy).
- `variant="ghost"`: hover background and text now use the foreground token in dark mode so hover stays legible against the dark surface (previously navy text blended into the dark background).
- Gradient hover animation (`.gradient-hover-animate`): overshoot `background-position` by 1px on both rest (`-1px center`) and hover end (`calc(100% + 1px) center`) so the 200% gradient image extends past the container edges throughout the animation. Eliminates a subpixel sliver where the surface beneath would bleed through (showed up as a stray white edge on destructive buttons and a white outline on the right of outline buttons).
