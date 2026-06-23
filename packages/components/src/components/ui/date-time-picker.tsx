import * as React from "react";
import { CalendarIcon, X } from "lucide-react";
import { format as formatDate, type Locale } from "date-fns";
import { th } from "react-day-picker/locale";
import { Calendar, type CalendarProps } from "./calendar";
import { inputBaseClassName } from "./input";
import { NativePickerInput } from "./native-picker-input";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { TimeScroller, formatTime } from "./time-picker";
import { useNativePicker } from "../../lib/native-picker";
import { cn } from "../../lib/utils";

type CalendarLocale = CalendarProps["locale"];

function useControllableState<T>(
  value: T | undefined,
  defaultValue: T | undefined,
  onChange?: (value: T) => void,
): [T | undefined, (next: T) => void] {
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState<T | undefined>(defaultValue);
  const current = isControlled ? value : internal;

  const setValue = React.useCallback(
    (next: T) => {
      if (!isControlled) setInternal(next);
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  return [current, setValue];
}

export interface DateTimePickerProps {
  value?: Date;
  defaultValue?: Date;
  /** Fires with the selected date-time, or `undefined` when cleared. */
  onValueChange?: (date: Date | undefined) => void;
  /** Show the seconds column / label (`HH:mm:ss`). Defaults to `false`. */
  showSeconds?: boolean;
  /** Step between selectable minutes (and seconds). Defaults to `1`. */
  step?: number;
  /** date-fns format string for the date portion of the trigger label. */
  dateFormat?: string;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  /** Class applied to the trigger button. */
  className?: string;
  align?: "start" | "center" | "end";
  locale?: CalendarLocale;
  /**
   * Override the native-input decision. By default the OS-native
   * `datetime-local` input is used on touch-first mobile; `false` always
   * renders the popover.
   */
  native?: boolean;
  /** Extra props forwarded to the underlying {@link Calendar}. */
  calendarProps?: Omit<
    CalendarProps,
    "mode" | "selected" | "onSelect" | "locale" | "defaultMonth"
  >;
}

const DEFAULT_DATE_FORMAT = "d MMM yyyy";

/**
 * Combined date + time picker. A single bordered trigger opens a popover with
 * a {@link Calendar} and an inline {@link TimeScroller}; the value is one
 * `Date` carrying both the calendar day and the 24-hour time.
 */
export function DateTimePicker({
  value,
  defaultValue,
  onValueChange,
  showSeconds = false,
  step = 1,
  dateFormat = DEFAULT_DATE_FORMAT,
  placeholder = "เลือกวันและเวลา",
  disabled,
  id,
  className,
  align = "start",
  locale = th,
  native,
  calendarProps,
}: DateTimePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = useControllableState<Date | undefined>(
    value,
    defaultValue,
    onValueChange as ((next: Date | undefined) => void) | undefined,
  );

  const useNative = useNativePicker("datetime-local", native);

  const label = selected
    ? `${formatDate(selected, dateFormat, {
        locale: (locale as Locale | undefined) ?? undefined,
      })} เวลา ${formatTime(selected, showSeconds)} น.`
    : undefined;

  // Picking a day keeps the existing time (or 00:00 when none was set yet).
  const handleSelectDate = (date: Date | undefined) => {
    if (!date) {
      setSelected(undefined);
      return;
    }
    const next = new Date(date);
    if (selected) {
      next.setHours(
        selected.getHours(),
        selected.getMinutes(),
        selected.getSeconds(),
        0,
      );
    } else {
      next.setHours(0, 0, 0, 0);
    }
    setSelected(next);
  };

  const showClear = !disabled && !!label;
  // Clear on pointer-down (not click): when the popover is open, Radix's
  // dismissable layer swallows the first click, so an onClick handler would
  // require a second press. onPointerDown fires on that first interaction.
  const handleClear = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    setSelected(undefined);
  };

  if (useNative) {
    return (
      <NativePickerInput
        type="datetime-local"
        icon={CalendarIcon}
        value={selected}
        onValueChange={setSelected}
        showSeconds={showSeconds}
        step={step}
        label={label}
        placeholder={placeholder}
        disabled={disabled}
        id={id}
        className={cn("w-[280px]", className)}
      />
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className="relative inline-flex w-fit">
        <PopoverTrigger asChild>
          <button
            id={id}
            type="button"
            disabled={disabled}
            data-empty={label ? undefined : ""}
            className={cn(
              inputBaseClassName,
              "w-[280px] items-center justify-start gap-2 text-left font-normal tabular-nums",
              "[&_svg]:size-4 [&_svg]:shrink-0",
              "data-[empty]:text-muted-foreground/60",
              showClear && "pr-9",
              className,
            )}
          >
            <CalendarIcon className="text-muted-foreground" />
            <span className="truncate">{label ?? placeholder}</span>
          </button>
        </PopoverTrigger>
        {showClear && (
          <button
            type="button"
            onPointerDown={handleClear}
            onClick={handleClear}
            aria-label="ล้างค่า"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <X className="size-4" />
          </button>
        )}
      </div>
      <PopoverContent className="w-auto p-0" align={align}>
        <div className="flex flex-col sm:flex-row sm:divide-x">
          <Calendar
            mode="single"
            locale={locale}
            defaultMonth={selected}
            selected={selected}
            onSelect={handleSelectDate}
            {...calendarProps}
          />
          <div className="border-t p-2 sm:border-t-0">
            <TimeScroller
              value={selected}
              onValueChange={setSelected}
              showSeconds={showSeconds}
              step={step}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
DateTimePicker.displayName = "DateTimePicker";
