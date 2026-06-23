import * as React from "react";
import { Clock, X } from "lucide-react";
import { Button } from "./button";
import { inputBaseClassName } from "./input";
import { NativePickerInput } from "./native-picker-input";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { useNativePicker } from "../../lib/native-picker";
import { useControllableState } from "../../lib/use-controllable-state";
import { cn } from "../../lib/utils";

const pad2 = (n: number) => n.toString().padStart(2, "0");

/** Format the time portion of a date as 24-hour `HH:mm` or `HH:mm:ss`. */
export function formatTime(date: Date, showSeconds = false): string {
  const base = `${pad2(date.getHours())}:${pad2(date.getMinutes())}`;
  return showSeconds ? `${base}:${pad2(date.getSeconds())}` : base;
}

/** Clone `base` (or now, time-zeroed) and overwrite the given time parts. */
function withTime(
  base: Date | undefined,
  parts: { hours?: number; minutes?: number; seconds?: number },
): Date {
  const next = base ? new Date(base) : zeroedToday();
  if (parts.hours !== undefined) next.setHours(parts.hours);
  if (parts.minutes !== undefined) next.setMinutes(parts.minutes);
  if (parts.seconds !== undefined) next.setSeconds(parts.seconds);
  next.setMilliseconds(0);
  return next;
}

function zeroedToday(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

const HOURS = Array.from({ length: 24 }, (_, i) => i);

interface TimeColumnProps {
  label: string;
  values: number[];
  selected: number | undefined;
  onSelect: (value: number) => void;
}

function TimeColumn({ label, values, selected, onSelect }: TimeColumnProps) {
  const listRef = React.useRef<HTMLDivElement>(null);
  const activeRef = React.useRef<HTMLButtonElement>(null);

  // Bring the selected cell into view when the column (re)mounts or changes.
  React.useEffect(() => {
    activeRef.current?.scrollIntoView({ block: "center" });
  }, [selected]);

  return (
    <div className="flex w-14 flex-col">
      <div className="pb-1 text-center text-xs font-medium text-muted-foreground">{label}</div>
      <div
        ref={listRef}
        className="flex max-h-56 flex-col gap-1 overflow-y-auto px-1 pb-1 [scrollbar-width:thin]"
      >
        {values.map((value) => {
          const isSelected = value === selected;
          return (
            <Button
              key={value}
              ref={isSelected ? activeRef : undefined}
              type="button"
              variant={isSelected ? "default" : "ghost"}
              size="sm"
              aria-pressed={isSelected}
              className={cn("h-8 w-full shrink-0 font-normal", isSelected && "font-medium")}
              onClick={() => onSelect(value)}
            >
              {pad2(value)}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

export interface TimeScrollerProps {
  value?: Date;
  defaultValue?: Date;
  onValueChange?: (date: Date) => void;
  /** Show the seconds column (`HH:mm:ss`). Defaults to `false` (`HH:mm`). */
  showSeconds?: boolean;
  /** Step between selectable minutes (and seconds). Defaults to `1`. */
  step?: number;
  className?: string;
}

/**
 * Inline 24-hour time selector with hour / minute (/ second) columns.
 * Used directly for embedded layouts, or inside {@link TimePicker}.
 */
export function TimeScroller({
  value,
  defaultValue,
  onValueChange,
  showSeconds = false,
  step = 1,
  className,
}: TimeScrollerProps) {
  const [selected, setSelected] = useControllableState<Date | undefined>(
    value,
    defaultValue,
    onValueChange as ((next: Date | undefined) => void) | undefined,
  );

  const minutes = React.useMemo(
    () => Array.from({ length: Math.ceil(60 / step) }, (_, i) => i * step),
    [step],
  );

  return (
    <div className={cn("flex divide-x", className)}>
      <TimeColumn
        label="ชม."
        values={HOURS}
        selected={selected?.getHours()}
        onSelect={(hours) => setSelected(withTime(selected, { hours }))}
      />
      <TimeColumn
        label="นาที"
        values={minutes}
        selected={selected?.getMinutes()}
        onSelect={(min) => setSelected(withTime(selected, { minutes: min }))}
      />
      {showSeconds && (
        <TimeColumn
          label="วิ."
          values={minutes}
          selected={selected?.getSeconds()}
          onSelect={(sec) => setSelected(withTime(selected, { seconds: sec }))}
        />
      )}
    </div>
  );
}
TimeScroller.displayName = "TimeScroller";

export interface TimePickerProps {
  value?: Date;
  defaultValue?: Date;
  /** Fires with the selected time, or `undefined` when the value is cleared. */
  onValueChange?: (date: Date | undefined) => void;
  /** Show the seconds column / label (`HH:mm:ss`). Defaults to `false`. */
  showSeconds?: boolean;
  /** Step between selectable minutes (and seconds). Defaults to `1`. */
  step?: number;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  /** Class applied to the trigger. */
  className?: string;
  align?: "start" | "center" | "end";
  /**
   * Compact trigger: drops the leading clock icon and the × clear button, and
   * sizes the trigger to its content. Useful in dense layouts (table cells,
   * toolbars). Clear the value programmatically via `onValueChange`.
   */
  compact?: boolean;
  /**
   * Override the native-input decision. By default the OS-native time input is
   * used on touch-first mobile; `false` always renders the popover.
   */
  native?: boolean;
}

/** Trigger + popover 24-hour time picker built on {@link TimeScroller}. */
export function TimePicker({
  value,
  defaultValue,
  onValueChange,
  showSeconds = false,
  step = 1,
  placeholder = "เลือกเวลา",
  disabled,
  id,
  className,
  align = "start",
  compact = false,
  native,
}: TimePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = useControllableState<Date | undefined>(
    value,
    defaultValue,
    onValueChange as ((next: Date | undefined) => void) | undefined,
  );

  const useNative = useNativePicker("time", native);

  const label = selected ? `${formatTime(selected, showSeconds)} น.` : undefined;

  // Compact mode sizes to content; otherwise use the fixed default width.
  const triggerWidth = compact ? "w-fit" : "w-[160px]";
  const showClear = !compact && !disabled && !!label;
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
        type="time"
        icon={compact ? undefined : Clock}
        hideClear={compact}
        value={selected}
        onValueChange={setSelected}
        showSeconds={showSeconds}
        step={step}
        label={label}
        placeholder={placeholder}
        disabled={disabled}
        id={id}
        className={cn(triggerWidth, className)}
      />
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className={cn("relative inline-flex", triggerWidth, className)}>
        <PopoverTrigger asChild>
          <button
            id={id}
            type="button"
            disabled={disabled}
            data-empty={label ? undefined : ""}
            className={cn(
              inputBaseClassName,
              "items-center justify-start gap-2 text-left font-normal tabular-nums",
              "[&_svg]:size-4 [&_svg]:shrink-0",
              "data-[empty]:text-muted-foreground/60",
              showClear && "pr-9",
            )}
          >
            {!compact && <Clock className="text-muted-foreground" />}
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
      <PopoverContent className="w-auto p-2" align={align}>
        <TimeScroller
          value={selected}
          onValueChange={setSelected}
          showSeconds={showSeconds}
          step={step}
        />
      </PopoverContent>
    </Popover>
  );
}
TimePicker.displayName = "TimePicker";
