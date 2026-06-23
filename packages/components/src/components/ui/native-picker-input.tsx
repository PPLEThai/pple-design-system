import type * as React from "react";
import type { LucideIcon } from "lucide-react";
import { X } from "lucide-react";
import { inputBaseClassName } from "./input";
import {
  dateToNativeValue,
  nativeValueToDate,
  type NativePickerType,
} from "../../lib/native-picker";
import { cn } from "../../lib/utils";

export interface NativePickerInputProps {
  type: NativePickerType;
  value: Date | undefined;
  onValueChange: (date: Date | undefined) => void;
  /** Include the seconds component in `time` / `datetime-local` values. */
  showSeconds?: boolean;
  /** Granularity in minutes (seconds when `showSeconds`), mirroring the popover. */
  step?: number;
  min?: Date;
  max?: Date;
  /** Leading icon, matching the popover trigger. */
  icon: LucideIcon;
  /** Pre-formatted (e.g. Thai) label shown when a value is selected. */
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  className?: string;
}

/**
 * Styled OS-native date/time `<input>`, used by the picker components on
 * touch-first mobile in place of the popover.
 *
 * The native control formats its own value in the OS locale, which can't be
 * overridden — so the real input is rendered transparently on top to capture
 * the tap and open the native picker, while a styled overlay shows the same
 * pre-formatted (Thai) `label` the popover trigger would display. Conversion
 * between the `Date` value the pickers speak and the local-time string the
 * native control expects happens here.
 */
export function NativePickerInput({
  type,
  value,
  onValueChange,
  showSeconds = false,
  step,
  min,
  max,
  icon: Icon,
  label,
  placeholder,
  disabled,
  id,
  className,
}: NativePickerInputProps) {
  // Native `step` is in seconds: a seconds-aware control needs step ≤ 59 to
  // expose the seconds field, otherwise the minute step is expressed in seconds.
  const nativeStep =
    type === "time" || type === "datetime-local"
      ? step !== undefined
        ? showSeconds
          ? step
          : step * 60
        : showSeconds
          ? 1
          : undefined
      : undefined;

  // Native date/time inputs offer no reliable clear affordance (notably iOS
  // Safari), so we provide the same × button as the popover trigger.
  const showClear = !disabled && !!value;
  const handleClear = (event: React.PointerEvent | React.MouseEvent) => {
    event.stopPropagation();
    onValueChange(undefined);
  };

  return (
    <div
      className={cn(
        "relative inline-flex w-fit",
        disabled && "cursor-not-allowed opacity-50",
      )}
    >
      {/* Visual presentation: same icon + formatted label as the popover trigger. */}
      <div
        aria-hidden
        className={cn(
          inputBaseClassName,
          "items-center gap-2 tabular-nums [&_svg]:size-4 [&_svg]:shrink-0",
          !label && "text-muted-foreground/60",
          showClear && "pr-9",
          className,
        )}
      >
        <Icon className="text-muted-foreground" />
        <span className="truncate">{label ?? placeholder}</span>
      </div>
      {/* Transparent native input on top captures the tap and opens the OS picker. */}
      <input
        id={id}
        type={type}
        disabled={disabled}
        aria-label={placeholder}
        value={dateToNativeValue(value, type, showSeconds)}
        min={min ? dateToNativeValue(min, type, showSeconds) : undefined}
        max={max ? dateToNativeValue(max, type, showSeconds) : undefined}
        step={nativeStep}
        onChange={(event) =>
          onValueChange(nativeValueToDate(event.target.value, type, value))
        }
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
      />
      {/* Sits above the input so the tap clears instead of opening the picker. */}
      {showClear && (
        <button
          type="button"
          onPointerDown={handleClear}
          onClick={handleClear}
          aria-label="ล้างค่า"
          className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  );
}
NativePickerInput.displayName = "NativePickerInput";
