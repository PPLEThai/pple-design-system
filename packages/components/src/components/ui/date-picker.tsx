import * as React from "react";
import { CalendarIcon, X } from "lucide-react";
import { format as formatDate, type Locale } from "date-fns";
import type { DateRange } from "react-day-picker";
import { th } from "react-day-picker/locale";
import { Calendar, type CalendarProps } from "./calendar";
import { inputBaseClassName } from "./input";
import { NativePickerInput } from "./native-picker-input";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
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

interface DatePickerBaseProps {
  /** Placeholder shown on the trigger when no date is selected. */
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  /** Class applied to the trigger button. */
  className?: string;
  /** PopoverContent alignment relative to the trigger. */
  align?: "start" | "center" | "end";
  /** date-fns format string for the trigger label. */
  dateFormat?: string;
  /** Separator between the start and end labels in range mode. */
  rangeSeparator?: string;
  locale?: CalendarLocale;
  /**
   * Override the native-input decision. By default the OS-native date input is
   * used on touch-first mobile (single mode only); `false` always renders the
   * popover, `true` forces native when supported.
   */
  native?: boolean;
  /** Extra props forwarded to the underlying {@link Calendar}. */
  calendarProps?: Omit<
    CalendarProps,
    "mode" | "selected" | "onSelect" | "locale" | "defaultMonth"
  >;
}

export interface DatePickerSingleProps extends DatePickerBaseProps {
  mode?: "single";
  value?: Date;
  defaultValue?: Date;
  onValueChange?: (date: Date | undefined) => void;
}

export interface DatePickerRangeProps extends DatePickerBaseProps {
  mode: "range";
  value?: DateRange;
  defaultValue?: DateRange;
  onValueChange?: (range: DateRange | undefined) => void;
}

export type DatePickerProps = DatePickerSingleProps | DatePickerRangeProps;

const DEFAULT_DATE_FORMAT = "d MMM yyyy";

function formatLabel(
  date: Date | undefined,
  dateFormat: string,
  locale: CalendarLocale,
): string | undefined {
  if (!date) return undefined;
  return formatDate(date, dateFormat, { locale: (locale as Locale | undefined) ?? undefined });
}

/**
 * Trigger + popover date picker. Use `mode="range"` for a two-date range.
 * Controlled via `value`/`onValueChange` or uncontrolled via `defaultValue`.
 */
export function DatePicker(props: DatePickerProps) {
  const {
    placeholder = "เลือกวันที่",
    disabled,
    id,
    className,
    align = "start",
    dateFormat = DEFAULT_DATE_FORMAT,
    rangeSeparator = " – ",
    locale = th,
    native,
    calendarProps,
  } = props;

  const [open, setOpen] = React.useState(false);

  const isRange = props.mode === "range";
  // Native date inputs have no range variant, so only single mode goes native.
  const useNative = useNativePicker("date", native) && !isRange;

  const [singleValue, setSingleValue] = useControllableState<Date | undefined>(
    isRange ? undefined : (props as DatePickerSingleProps).value,
    isRange ? undefined : (props as DatePickerSingleProps).defaultValue,
    isRange ? undefined : (props as DatePickerSingleProps).onValueChange,
  );
  const [rangeValue, setRangeValue] = useControllableState<DateRange | undefined>(
    isRange ? (props as DatePickerRangeProps).value : undefined,
    isRange ? (props as DatePickerRangeProps).defaultValue : undefined,
    isRange ? (props as DatePickerRangeProps).onValueChange : undefined,
  );

  let label: string | undefined;
  if (isRange) {
    const start = formatLabel(rangeValue?.from, dateFormat, locale);
    const end = formatLabel(rangeValue?.to, dateFormat, locale);
    if (start && end) label = `${start}${rangeSeparator}${end}`;
    else if (start) label = start;
  } else {
    label = formatLabel(singleValue, dateFormat, locale);
  }

  const defaultMonth = isRange ? rangeValue?.from : singleValue;

  const showClear = !disabled && !!label;
  // Clear on pointer-down (not click): when the popover is open, Radix's
  // dismissable layer swallows the first click, so an onClick handler would
  // require a second press. onPointerDown fires on that first interaction.
  const handleClear = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    if (isRange) setRangeValue(undefined);
    else setSingleValue(undefined);
  };

  if (useNative) {
    return (
      <NativePickerInput
        type="date"
        icon={CalendarIcon}
        value={singleValue}
        onValueChange={setSingleValue}
        label={label}
        placeholder={placeholder}
        disabled={disabled}
        id={id}
        className={cn("w-[260px]", className)}
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
              "w-[260px] items-center justify-start gap-2 text-left font-normal",
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
        {isRange ? (
          <Calendar
            mode="range"
            locale={locale}
            defaultMonth={defaultMonth}
            selected={rangeValue}
            onSelect={(range) => setRangeValue(range)}
            {...calendarProps}
          />
        ) : (
          <Calendar
            mode="single"
            locale={locale}
            defaultMonth={defaultMonth}
            selected={singleValue}
            onSelect={(date) => {
              setSingleValue(date);
              setOpen(false);
            }}
            {...calendarProps}
          />
        )}
      </PopoverContent>
    </Popover>
  );
}
DatePicker.displayName = "DatePicker";
