---
"@pplethai/components": patch
---

Fix `TabsList` overflowing narrow containers. The tab list now wraps (`flex-wrap`) within `max-w-full` and grows with `min-h-10` / `h-auto` instead of a fixed `h-10`, so triggers reflow onto additional rows when the container is narrower than the tabs.
