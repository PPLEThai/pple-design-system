# @pplethai/components

## 1.4.0

### Minor Changes

- b695ce2: Add `TimePicker` and `DateTimePicker` components. `TimePicker` is a 24-hour time picker that can show or hide a seconds column (`HH:MM` or `HH:MM:SS`), with a configurable minute/second `step`. `DateTimePicker` combines a calendar and time selector in a single bordered trigger, yielding one `Date` with both day and time. The shared inline `TimeScroller` and `formatTime` helper are also exported.
- b695ce2: `DatePicker`, `TimePicker`, `MonthPicker`, and `DateTimePicker` now render the OS-native input (`<input type="date|time|month|datetime-local">`) on touch-first mobile devices where the browser supports it, giving users the native wheel/dialog instead of the custom popover. The displayed value keeps the same locale-aware (Thai) formatting as the popover trigger — the native control is rendered transparently to capture the tap while a styled overlay shows the formatted label. Desktop continues to use the popover. Pass `native={false}` to always use the popover, or `native` to force the native control when supported. DatePicker `mode="range"` always uses the popover (there is no native range input). Exposes the shared `NativePickerInput` component and the `useNativePicker` / `dateToNativeValue` / `nativeValueToDate` helpers.

### Patch Changes

- b695ce2: Align DatePicker and MonthPicker trigger styling with the Input component (shared border, sizing, and focus treatment) instead of the outline button look, and add a clear (×) button to both that appears once a value is selected.

## 1.3.1

### Patch Changes

- 4eff042: fix modal issue

## 1.3.0

### Minor Changes

- 925464e: Add date and month picker components:
  - `Calendar` — day-grid calendar built on react-day-picker (v10), styled with design tokens and defaulting to the Thai locale. Supports `single`, `multiple`, and `range` modes.
  - `DatePicker` — trigger + popover date picker with `single` and `range` modes, controlled/uncontrolled value, configurable `dateFormat`, and pass-through `calendarProps`.
  - `MonthCalendar` / `MonthPicker` — inline month-grid primitive and a trigger + popover convenience for selecting a month and year, with `minDate`/`maxDate` support.

  Also re-exports the `DateRange` type for range-mode consumers.

## 1.2.1

### Patch Changes

- 24c8a7c: Placeholder text in `Input`, `Textarea`, `Select`, `MultiSelect`, and `Autocomplete` is now faded (`text-muted-foreground/60`) so it's visually distinct from entered text. The `Select` trigger also now correctly targets the placeholder via `data-[placeholder]` instead of the non-functional `placeholder:` pseudo-class.

## 1.2.0

### Minor Changes

- 12015f6: Navbar now accepts `children` as a trailing slot — rendered to the right of the links on desktop and at the top of the mobile dropdown panel. Useful for login buttons, notification bells, theme toggles, etc. When the navbar is in `dark` variant, children are wrapped in a `.dark` scope so design tokens automatically flip to dark-mode values.

### Patch Changes

- 12015f6: Fix `Button` rendering:
  - `variant="outline"`: border and text now use the foreground token in dark mode so the button is visible on dark navy surfaces (previously navy-on-navy).
  - `variant="ghost"`: hover background and text now use the foreground token in dark mode so hover stays legible against the dark surface (previously navy text blended into the dark background).
  - Gradient hover animation (`.gradient-hover-animate`): overshoot `background-position` by 1px on both rest (`-1px center`) and hover end (`calc(100% + 1px) center`) so the 200% gradient image extends past the container edges throughout the animation. Eliminates a subpixel sliver where the surface beneath would bleed through (showed up as a stray white edge on destructive buttons and a white outline on the right of outline buttons).

- 12015f6: Bumped contrast on the primary button gradient (`--gradient-primary-button`) in both light and dark modes — lighter highlight stop and darker shadow stop so the gradient feels less flat. Middle brand-orange stop is unchanged.

## 1.1.2

### Patch Changes

- Fix Select, Autocomplete, MultiSelect, and other popover dropdowns closing immediately on React 19 and in mobile WebViews by upgrading Radix Select, guarding all Popover dismiss handlers (pointer, interact, focus), marking popover anchors, and using controlled values in FormSelectField.
- 5e363b1: Fix Select, Autocomplete, MultiSelect, and other popover dropdowns closing immediately on React 19 and in mobile WebViews by upgrading Radix Select, guarding all Popover dismiss handlers (pointer, interact, focus), marking popover anchors, and using controlled values in FormSelectField.

## 1.1.1

### Patch Changes

- 5e363b1: Fix Select and popover dropdowns closing immediately on React 19 and in mobile WebViews by upgrading Radix Select, aligning shared Radix layers, ignoring spurious empty value sync in forms, and using controlled values in FormSelectField.
- e806701: Add Navbar home navigation: logo and title share one clickable brand link with customizable `home` target and `renderHomeLink` (mirrors menu `renderLink` for routers). Pass `home={false}` to disable.

## 1.1.0

### Minor Changes

- 50e6f62: Add `Spinner` component for loading states. Omit `value` for an indeterminate spinning loop, or pass `value` (0–`max`) for a determinate circular progress. Supports `size` (`sm` / `default` / `lg` / `xl`), custom `strokeWidth`, and accessible `label`. Color is driven by `currentColor` so it adapts to surrounding `text-*` classes.
- a108977: Add `Stepper` + `StepperItem` for multi-step forms and wizards. Compound API with a `value` prop (0-indexed current step) on the root and per-step `title` / `description` on items. Supports `orientation="horizontal" | "vertical"`, marks the current step with `aria-current="step"`, and renders a checkmark for completed steps.

## 1.0.2

### Patch Changes

- 9b66033: bump

## 1.0.1

### Patch Changes

- d3bc245: fix badge border
- d3bc245: fix navbar in mini-app
- d3bc245: fix checkbox animation

## 1.0.0

### Major Changes

- 90de1b6: Initial design system

### Minor Changes

- e06eb61: Initial release of the People's Party design system with shadcn/ui components, brand tokens, IBM Plex Thai typography, layout primitives, form kit, and Lucide icons.
