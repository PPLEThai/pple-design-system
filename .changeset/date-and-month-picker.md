---
"@pplethai/components": minor
---

Add date and month picker components:

- `Calendar` — day-grid calendar built on react-day-picker (v10), styled with design tokens and defaulting to the Thai locale. Supports `single`, `multiple`, and `range` modes.
- `DatePicker` — trigger + popover date picker with `single` and `range` modes, controlled/uncontrolled value, configurable `dateFormat`, and pass-through `calendarProps`.
- `MonthCalendar` / `MonthPicker` — inline month-grid primitive and a trigger + popover convenience for selecting a month and year, with `minDate`/`maxDate` support.

Also re-exports the `DateRange` type for range-mode consumers.
