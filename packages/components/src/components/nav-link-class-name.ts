import { cn } from "../lib/utils";

export function navLinkClassName(isActive: boolean) {
  return cn(
    "font-heading rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
    isActive
      ? "bg-gradient-primary text-primary-foreground shadow-sm"
      : "hover:bg-white/10",
  );
}
