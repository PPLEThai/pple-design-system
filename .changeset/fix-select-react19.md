---
"@pplethai/components": patch
---

Fix Select, Autocomplete, MultiSelect, and other popover dropdowns closing immediately on React 19 and in mobile WebViews by upgrading Radix Select, guarding all Popover dismiss handlers (pointer, interact, focus), marking popover anchors, and using controlled values in FormSelectField.
