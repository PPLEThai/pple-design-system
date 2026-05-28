# @pplethai/components

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
