---
"@pplethai/components": patch
---

Fix pickers not clearing when a controlled `value` is set back to `undefined`. `DatePicker`, `MonthPicker`, `TimePicker`, and `DateTimePicker` now correctly return to their placeholder when a controlled consumer clears the selection after a value was set (including `DatePicker mode="range"`). The shared `useControllableState` helper now latches to controlled mode once a defined `value` has been seen, so `undefined` no longer falls back to stale internal state.
