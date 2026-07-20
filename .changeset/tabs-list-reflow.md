---
"@pplethai/components": patch
---

Fix `TabsList` overflowing narrow containers. The tab list now uses `w-max max-w-full flex-wrap` with `min-h-10` / `h-auto` so triggers stay on one row when space allows and wrap onto additional rows only when the container is narrower than the tabs.
