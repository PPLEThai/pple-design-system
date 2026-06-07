---
"@pplethai/components": patch
---

Placeholder text in `Input`, `Textarea`, `Select`, `MultiSelect`, and `Autocomplete` is now faded (`text-muted-foreground/60`) so it's visually distinct from entered text. The `Select` trigger also now correctly targets the placeholder via `data-[placeholder]` instead of the non-functional `placeholder:` pseudo-class.
