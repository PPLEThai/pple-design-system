import * as React from "react";
import { CalendarIcon, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "./button";
import { inputBaseClassName } from "./input";
import { NativePickerInput } from "./native-picker-input";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { useNativePicker } from "../../lib/native-picker";
import { cn } from "../../lib/utils";

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

/** Year × month comparison helpers (a month is a year/month pair). */
function monthIndex(date: Date): number {
  return date.getFullYear() * 12 + date.getMonth();
}

function sameMonth(a: Date | undefined, b: Date | undefined): boolean {
  return !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

export interface MonthCalendarProps {
  value?: Date;
  defaultValue?: Date;
  onValueChange?: (date: Date) => void;
  /** Earliest selectable month (day is ignored). */
  minDate?: Date;
  /** Latest selectable month (day is ignored). */
  maxDate?: Date;
  /** BCP-47 locale for month names. Defaults to `"th-TH"`. */
  locale?: string;
  className?: string;
}

/** Inline month-grid picker. Years are navigated with the header chevrons. */
export function MonthCalendar({
  value,
  defaultValue,
  onValueChange,
  minDate,
  maxDate,
  locale = "th-TH",
  className,
}: MonthCalendarProps) {
  const [selected, setSelected] = useControllableState<Date | undefined>(
    value,
    defaultValue,
    onValueChange as ((next: Date | undefined) => void) | undefined,
  );

  const [displayYear, setDisplayYear] = React.useState(
    () => (selected ?? new Date()).getFullYear(),
  );

  const shortFormatter = React.useMemo(
    () => new Intl.DateTimeFormat(locale, { month: "short" }),
    [locale],
  );

  const months = React.useMemo(
    () => Array.from({ length: 12 }, (_, i) => shortFormatter.format(new Date(2020, i, 1))),
    [shortFormatter],
  );

  const minIndex = minDate ? monthIndex(minDate) : undefined;
  const maxIndex = maxDate ? monthIndex(maxDate) : undefined;

  const isDisabled = (month: number) => {
    const index = displayYear * 12 + month;
    if (minIndex !== undefined && index < minIndex) return true;
    if (maxIndex !== undefined && index > maxIndex) return true;
    return false;
  };

  const prevDisabled = minIndex !== undefined && (displayYear - 1) * 12 + 11 < minIndex;
  const nextDisabled = maxIndex !== undefined && displayYear * 12 + 12 > maxIndex;

  return (
    <div className={cn("w-64 p-3", className)}>
      <div className="flex h-9 items-center justify-between">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-7 text-muted-foreground hover:text-foreground"
          onClick={() => setDisplayYear((y) => y - 1)}
          disabled={prevDisabled}
          aria-label="ปีก่อนหน้า"
        >
          <ChevronLeft className="size-4" />
        </Button>
        <span className="font-heading text-sm font-medium" aria-live="polite">
          {displayYear}
        </span>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-7 text-muted-foreground hover:text-foreground"
          onClick={() => setDisplayYear((y) => y + 1)}
          disabled={nextDisabled}
          aria-label="ปีถัดไป"
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>

      <div className="mt-2 grid grid-cols-3 gap-2">
        {months.map((monthName, month) => {
          const isSelected = sameMonth(selected, new Date(displayYear, month, 1));
          const disabled = isDisabled(month);
          return (
            <Button
              key={month}
              type="button"
              variant={isSelected ? "default" : "ghost"}
              size="sm"
              aria-pressed={isSelected}
              disabled={disabled}
              className={cn("h-9 w-full font-normal", isSelected && "font-medium")}
              onClick={() => setSelected(new Date(displayYear, month, 1))}
            >
              {monthName}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
MonthCalendar.displayName = "MonthCalendar";

export interface MonthPickerProps
  extends Omit<MonthCalendarProps, "className" | "onValueChange"> {
  /** Fires with the selected month, or `undefined` when the value is cleared. */
  onValueChange?: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  /** Class applied to the trigger button. */
  className?: string;
  align?: "start" | "center" | "end";
  /**
   * Override the native-input decision. By default the OS-native month input is
   * used on touch-first mobile; `false` always renders the popover.
   */
  native?: boolean;
  /** Custom trigger label formatter. Defaults to `"<long month> <year>"`. */
  formatLabel?: (date: Date) => string;
}

/** Trigger + popover month picker built on {@link MonthCalendar}. */
export function MonthPicker({
  value,
  defaultValue,
  onValueChange,
  minDate,
  maxDate,
  locale = "th-TH",
  placeholder = "เลือกเดือน",
  disabled,
  id,
  className,
  align = "start",
  native,
  formatLabel,
}: MonthPickerProps) {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = useControllableState<Date | undefined>(
    value,
    defaultValue,
    onValueChange as ((next: Date | undefined) => void) | undefined,
  );

  const useNative = useNativePicker("month", native);

  const longFormatter = React.useMemo(
    () => new Intl.DateTimeFormat(locale, { month: "long" }),
    [locale],
  );

  const defaultFormat = React.useCallback(
    (date: Date) => `${longFormatter.format(date)} ${date.getFullYear()}`,
    [longFormatter],
  );

  const label = selected ? (formatLabel ?? defaultFormat)(selected) : undefined;

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
        type="month"
        icon={CalendarIcon}
        value={selected}
        onValueChange={setSelected}
        min={minDate}
        max={maxDate}
        label={label}
        placeholder={placeholder}
        disabled={disabled}
        id={id}
        className={cn("w-[200px]", className)}
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
              "w-[200px] items-center justify-start gap-2 text-left font-normal",
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
        <MonthCalendar
          value={selected}
          onValueChange={(date) => {
            setSelected(date);
            setOpen(false);
          }}
          minDate={minDate}
          maxDate={maxDate}
          locale={locale}
        />
      </PopoverContent>
    </Popover>
  );
}
MonthPicker.displayName = "MonthPicker";
