import { cn } from "../lib/utils";

export function navLinkClassName(isActive: boolean, surface: "dark" | "light" = "dark") {
  return cn(
    "rounded-md px-3 py-1.5 font-heading text-sm font-medium transition-colors",
    isActive
      ? "bg-gradient-primary text-primary-foreground shadow-xs"
      : surface === "light"
        ? "text-foreground hover:bg-muted"
        : "hover:bg-white/10",
  );
}
