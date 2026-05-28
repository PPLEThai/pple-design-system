import * as React from "react";
import { Check, ChevronDown, X } from "lucide-react";
import { dropdownFieldStyles } from "../../lib/dropdown-field-styles";
import { POPOVER_ANCHOR_ATTR, usePopoverOpenState } from "../../lib/radix-outside-pointer";
import { cn } from "../../lib/utils";
import { Checkbox } from "./checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export type MultiSelectOption = {
  value: string;
  label: string;
};

export type MultiSelectProps = {
  options: MultiSelectOption[];
  value: string[];
  onValueChange: (value: string[]) => void;
  placeholder?: string;
  className?: string;
  id?: string;
  disabled?: boolean;
};

export function MultiSelect({
  options,
  value,
  onValueChange,
  placeholder = "เลือกรายการ",
  className,
  id,
  disabled,
}: MultiSelectProps) {
  const listboxId = React.useId();
  const [open, setOpen] = usePopoverOpenState();

  const selectedOptions = options.filter((option) => value.includes(option.value));

  const toggleValue = (optionValue: string) => {
    onValueChange(
      value.includes(optionValue)
        ? value.filter((item) => item !== optionValue)
        : [...value, optionValue],
    );
  };

  const removeValue = (optionValue: string, event: React.MouseEvent) => {
    event.stopPropagation();
    onValueChange(value.filter((item) => item !== optionValue));
  };

  return (
    <Popover open={open} onOpenChange={setOpen} modal={false}>
      <PopoverTrigger asChild>
        <button
          id={id}
          type="button"
          role="combobox"
          aria-controls={listboxId}
          aria-expanded={open}
          disabled={disabled}
          {...{ [POPOVER_ANCHOR_ATTR]: "" }}
          className={cn(dropdownFieldStyles.trigger, className)}
        >
          <span className="flex flex-1 flex-wrap gap-1 text-left">
            {selectedOptions.length > 0 ? (
              selectedOptions.map((option) => (
                <span key={option.value} className={dropdownFieldStyles.chip}>
                  {option.label}
                  <button
                    type="button"
                    className={dropdownFieldStyles.chipRemove}
                    aria-label={`ลบ ${option.label}`}
                    onClick={(event) => removeValue(option.value, event)}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </span>
          <ChevronDown className={dropdownFieldStyles.chevron} />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[var(--radix-popover-trigger-width)] p-0"
        align="start"
        onOpenAutoFocus={(event) => event.preventDefault()}
        onCloseAutoFocus={(event) => event.preventDefault()}
      >
        <div
          id={listboxId}
          className="max-h-60 overflow-y-auto p-1"
          role="listbox"
          aria-multiselectable
        >
          {options.map((option) => {
            const isSelected = value.includes(option.value);
            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                className={cn(
                  dropdownFieldStyles.option,
                  isSelected && dropdownFieldStyles.optionSelected,
                )}
                onClick={() => toggleValue(option.value)}
              >
                <Checkbox
                  checked={isSelected}
                  tabIndex={-1}
                  aria-hidden
                  className="pointer-events-none"
                />
                <span className="flex-1 text-left">{option.label}</span>
                {isSelected ? <Check className={dropdownFieldStyles.checkIcon} /> : null}
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
