import { cva, type VariantProps } from "class-variance-authority";
import type { LucideIcon } from "lucide-react";
import { cn } from "../lib/utils";

export const iconVariants = cva("shrink-0", {
  variants: {
    size: {
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "h-6 w-6",
    },
    color: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      primary: "text-primary",
      destructive: "text-destructive",
    },
  },
  defaultVariants: {
    size: "md",
    color: "default",
  },
});

export interface IconProps extends VariantProps<typeof iconVariants> {
  icon: LucideIcon;
  className?: string;
  "aria-label"?: string;
  "aria-hidden"?: boolean;
}

export function Icon({
  icon: IconComponent,
  size,
  color,
  className,
  "aria-label": ariaLabel,
  "aria-hidden": ariaHidden = !ariaLabel,
}: IconProps) {
  return (
    <IconComponent
      className={cn(iconVariants({ size, color }), className)}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
    />
  );
}
