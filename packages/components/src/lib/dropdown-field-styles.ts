/** Shared styles for Select, MultiSelect, and Autocomplete. */
export const dropdownFieldStyles = {
  trigger:
    "flex h-auto min-h-10 w-full items-center justify-between gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm font-normal text-foreground ring-offset-background transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  option:
    "flex w-full cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-foreground outline-none transition-colors hover:bg-primary/10 focus:bg-primary/10 focus-visible:bg-primary/10",
  optionSelected: "font-medium text-foreground hover:bg-primary/10 focus:bg-primary/10",
  chip:
    "inline-flex items-center gap-1 rounded-sm border border-primary/20 bg-primary/10 px-2 py-0.5 text-xs font-medium text-foreground",
  chipRemove:
    "rounded-sm text-foreground/70 outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  checkIcon: "h-4 w-4 shrink-0 text-foreground",
  chevron: "h-4 w-4 shrink-0 text-muted-foreground",
} as const;
