import * as React from "react";
import { Check, ChevronDown, X } from "lucide-react";
import { dropdownFieldStyles } from "../../lib/dropdown-field-styles";
import { POPOVER_ANCHOR_ATTR, usePopoverOpenState } from "../../lib/radix-outside-pointer";
import { cn } from "../../lib/utils";
import { Checkbox } from "./checkbox";
import { Input } from "./input";
import { Popover, PopoverAnchor, PopoverContent, PopoverTrigger } from "./popover";

export type AutocompleteOption = {
  value: string;
  label: string;
};

type AutocompleteBaseProps = {
  options: AutocompleteOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  className?: string;
  id?: string;
  disabled?: boolean;
};

export type AutocompleteSingleProps = AutocompleteBaseProps & {
  multiple?: false;
  value: string;
  onValueChange: (value: string) => void;
};

export type AutocompleteMultipleProps = AutocompleteBaseProps & {
  multiple: true;
  value: string[];
  onValueChange: (value: string[]) => void;
};

export type AutocompleteProps = AutocompleteSingleProps | AutocompleteMultipleProps;

const autocompletePopoverContentProps = {
  align: "start" as const,
  onOpenAutoFocus: (event: Event) => event.preventDefault(),
  onCloseAutoFocus: (event: Event) => event.preventDefault(),
};

export function Autocomplete(props: AutocompleteProps) {
  const {
    options,
    placeholder = "ค้นหาและเลือก",
    searchPlaceholder = "พิมพ์เพื่อค้นหา...",
    emptyMessage = "ไม่พบรายการ",
    className,
    id,
    disabled,
  } = props;

  const isMultiple = props.multiple === true;
  const value = props.value;

  const listboxId = React.useId();
  const [open, setOpen] = usePopoverOpenState();
  const [search, setSearch] = React.useState("");

  const filteredOptions = React.useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return options;
    return options.filter((option) => option.label.toLowerCase().includes(query));
  }, [options, search]);

  const selectedOptions = options.filter((option) =>
    isMultiple ? (value as string[]).includes(option.value) : option.value === value,
  );

  const openPopover = React.useCallback(() => {
    if (!disabled) setOpen(true);
  }, [disabled, setOpen]);

  const selectOption = (optionValue: string) => {
    if (isMultiple) {
      const current = value as string[];
      const next = current.includes(optionValue)
        ? current.filter((item) => item !== optionValue)
        : [...current, optionValue];
      (props as AutocompleteMultipleProps).onValueChange(next);
      return;
    }

    (props as AutocompleteSingleProps).onValueChange(optionValue);
    setSearch(options.find((option) => option.value === optionValue)?.label ?? "");
    setOpen(false);
  };

  const removeValue = (optionValue: string, event: React.MouseEvent) => {
    event.stopPropagation();
    if (!isMultiple) return;
    (props as AutocompleteMultipleProps).onValueChange(
      (value as string[]).filter((item) => item !== optionValue),
    );
  };

  const singleDisplayValue = React.useMemo(() => {
    if (isMultiple) return search;
    if (open) return search;
    return options.find((option) => option.value === value)?.label ?? search;
  }, [isMultiple, open, options, search, value]);

  React.useEffect(() => {
    if (!isMultiple && !open) {
      setSearch(options.find((option) => option.value === value)?.label ?? "");
    }
  }, [isMultiple, open, options, value]);

  if (isMultiple) {
    return (
      <Popover open={open} onOpenChange={setOpen} modal={false}>
        <PopoverTriggerButton
          id={id}
          disabled={disabled}
          className={className}
          open={open}
          listboxId={listboxId}
          placeholder={placeholder}
          selectedOptions={selectedOptions}
          onRemove={removeValue}
        />
        <PopoverContent
          className="w-[var(--radix-popover-trigger-width)] p-0"
          {...autocompletePopoverContentProps}
        >
          <div className="border-b p-2">
            <Input
              value={search}
              placeholder={searchPlaceholder}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
          <OptionList
            listboxId={listboxId}
            options={filteredOptions}
            emptyMessage={emptyMessage}
            isMultiple
            value={value as string[]}
            onSelect={selectOption}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen} modal={false}>
      <PopoverAnchor asChild>
        <div
          {...{ [POPOVER_ANCHOR_ATTR]: "" }}
          className={cn("relative w-full", className)}
        >
          <Input
            id={id}
            role="combobox"
            aria-controls={listboxId}
            aria-expanded={open}
            aria-autocomplete="list"
            disabled={disabled}
            value={singleDisplayValue}
            placeholder={placeholder}
            className="pr-9 focus-visible:ring-ring"
            onPointerDown={openPopover}
            onFocus={openPopover}
            onChange={(event) => {
              setSearch(event.target.value);
              openPopover();
              if (event.target.value === "") {
                (props as AutocompleteSingleProps).onValueChange("");
              }
            }}
          />
          <ChevronDown
            className={cn(
              "pointer-events-none absolute right-3 top-1/2 -translate-y-1/2",
              dropdownFieldStyles.chevron,
            )}
          />
        </div>
      </PopoverAnchor>
      <PopoverContent
        className="w-[var(--radix-popover-trigger-width)] p-0"
        {...autocompletePopoverContentProps}
      >
        <OptionList
          listboxId={listboxId}
          options={filteredOptions}
          emptyMessage={emptyMessage}
          isMultiple={false}
          value={value as string}
          onSelect={selectOption}
        />
      </PopoverContent>
    </Popover>
  );
}

function PopoverTriggerButton({
  id,
  disabled,
  className,
  open,
  listboxId,
  placeholder,
  selectedOptions,
  onRemove,
}: {
  id?: string;
  disabled?: boolean;
  className?: string;
  open: boolean;
  listboxId: string;
  placeholder: string;
  selectedOptions: AutocompleteOption[];
  onRemove: (value: string, event: React.MouseEvent) => void;
}) {
  return (
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
                  onClick={(event) => onRemove(option.value, event)}
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))
          ) : (
            <span className="text-muted-foreground/60">{placeholder}</span>
          )}
        </span>
        <ChevronDown className={dropdownFieldStyles.chevron} />
      </button>
    </PopoverTrigger>
  );
}

function OptionList({
  listboxId,
  options,
  emptyMessage,
  isMultiple,
  value,
  onSelect,
}: {
  listboxId: string;
  options: AutocompleteOption[];
  emptyMessage: string;
  isMultiple: boolean;
  value: string | string[];
  onSelect: (value: string) => void;
}) {
  return (
    <div
      id={listboxId}
      className="max-h-60 overflow-y-auto p-1"
      role="listbox"
      aria-multiselectable={isMultiple}
    >
      {options.length === 0 ? (
        <p className="px-2 py-6 text-center text-sm text-muted-foreground">{emptyMessage}</p>
      ) : (
        options.map((option) => {
          const isSelected = isMultiple
            ? (value as string[]).includes(option.value)
            : option.value === value;
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
              onClick={() => onSelect(option.value)}
            >
              {isMultiple ? (
                <Checkbox
                  checked={isSelected}
                  tabIndex={-1}
                  aria-hidden
                  className="pointer-events-none"
                />
              ) : null}
              <span className="flex-1 text-left">{option.label}</span>
              {isSelected ? <Check className={dropdownFieldStyles.checkIcon} /> : null}
            </button>
          );
        })
      )}
    </div>
  );
}
