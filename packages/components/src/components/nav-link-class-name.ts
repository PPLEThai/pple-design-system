import { cn } from "../lib/utils";

export function navLinkClassName(isActive: boolean, surface: "dark" | "light" = "dark") {
  return cn(
    "font-heading rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
    isActive
      ? "bg-gradient-primary text-primary-foreground shadow-sm"
      : surface === "light"
        ? "text-foreground hover:bg-muted"
        : "hover:bg-white/10",
  );
}
