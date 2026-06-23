---
"@pplethai/components": minor
---

`DatePicker`, `TimePicker`, `MonthPicker`, and `DateTimePicker` now render the OS-native input (`<input type="date|time|month|datetime-local">`) on touch-first mobile devices where the browser supports it, giving users the native wheel/dialog instead of the custom popover. The displayed value keeps the same locale-aware (Thai) formatting as the popover trigger — the native control is rendered transparently to capture the tap while a styled overlay shows the formatted label. Desktop continues to use the popover. Pass `native={false}` to always use the popover, or `native` to force the native control when supported. DatePicker `mode="range"` always uses the popover (there is no native range input). Exposes the shared `NativePickerInput` component and the `useNativePicker` / `dateToNativeValue` / `nativeValueToDate` helpers.
