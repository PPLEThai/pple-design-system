import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { format as formatDate, type Locale } from "date-fns";
import type { DateRange } from "react-day-picker";
import { th } from "react-day-picker/locale";
import { Button } from "./button";
import { Calendar, type CalendarProps } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
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
    calendarProps,
  } = props;

  const [open, setOpen] = React.useState(false);

  const isRange = props.mode === "range";

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

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          type="button"
          variant="outline"
          disabled={disabled}
          data-empty={label ? undefined : ""}
          className={cn(
            "w-[260px] justify-start text-left font-normal data-[empty]:text-muted-foreground/70",
            "[&:hover_svg]:text-secondary-foreground data-[empty]:hover:text-secondary-foreground",
            className,
          )}
        >
          <CalendarIcon className="text-muted-foreground" />
          {label ?? placeholder}
        </Button>
      </PopoverTrigger>
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
