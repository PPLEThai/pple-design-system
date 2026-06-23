import * as React from "react";

/** HTML input types backed by an OS-native date/time picker. */
export type NativePickerType = "date" | "time" | "month" | "datetime-local";

const pad2 = (n: number) => n.toString().padStart(2, "0");

/**
 * Whether the OS-native picker should be preferred over the custom popover.
 *
 * Native `<input type="date|time|month|datetime-local">` controls render a
 * polished wheel/dialog on mobile, but a cramped text-with-spinner on desktop —
 * so we only opt in on touch-first devices, and only when the browser actually
 * implements the requested type (unsupported types silently fall back to
 * `text`, which we detect by reading `input.type` back).
 */
function detectNative(type: NativePickerType): boolean {
  if (typeof window === "undefined" || typeof document === "undefined") return false;
  if (typeof window.matchMedia !== "function") return false;
  if (!window.matchMedia("(pointer: coarse) and (hover: none)").matches) return false;
  const input = document.createElement("input");
  input.setAttribute("type", type);
  return input.type === type;
}

/**
 * Returns `true` when the {@link NativePickerType} input should be used in
 * place of the custom popover (touch-first mobile + native support). Pass
 * `override` to force the decision (handy for stories/tests); `undefined`
 * auto-detects.
 */
export function useNativePicker(type: NativePickerType, override?: boolean): boolean {
  const [native, setNative] = React.useState(() =>
    override !== undefined ? override : detectNative(type),
  );

  React.useEffect(() => {
    setNative(override !== undefined ? override : detectNative(type));
  }, [type, override]);

  return native;
}

/** Format a `Date` as the local-time string a native input of `type` expects. */
export function dateToNativeValue(
  date: Date | undefined,
  type: NativePickerType,
  showSeconds = false,
): string {
  if (!date) return "";
  const ymd = `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
  const hm = `${pad2(date.getHours())}:${pad2(date.getMinutes())}`;
  const time = showSeconds ? `${hm}:${pad2(date.getSeconds())}` : hm;
  switch (type) {
    case "date":
      return ymd;
    case "month":
      return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}`;
    case "time":
      return time;
    case "datetime-local":
      return `${ymd}T${time}`;
  }
}

/**
 * Parse a native input string back into a `Date` (local time). For `time`
 * values, `base` supplies the calendar day (defaults to today).
 */
export function nativeValueToDate(
  value: string,
  type: NativePickerType,
  base?: Date,
): Date | undefined {
  if (!value) return undefined;
  switch (type) {
    case "date": {
      const [y, m, d] = value.split("-").map(Number);
      return new Date(y, m - 1, d);
    }
    case "month": {
      const [y, m] = value.split("-").map(Number);
      return new Date(y, m - 1, 1);
    }
    case "time": {
      const [h, min, s] = value.split(":").map(Number);
      const next = base ? new Date(base) : new Date();
      next.setHours(h, min ?? 0, s ?? 0, 0);
      return next;
    }
    case "datetime-local": {
      const [datePart, timePart = ""] = value.split("T");
      const [y, m, d] = datePart.split("-").map(Number);
      const [h, min, s] = timePart.split(":").map(Number);
      return new Date(y, m - 1, d, h ?? 0, min ?? 0, s ?? 0, 0);
    }
  }
}
