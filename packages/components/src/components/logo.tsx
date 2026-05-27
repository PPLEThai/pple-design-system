import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../lib/utils";

export const logoVariants = cva("shrink-0", {
  variants: {
    size: {
      sm: "h-6",
      md: "h-8",
      lg: "h-12",
      xl: "h-16",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface LogoProps
  extends React.SVGAttributes<SVGSVGElement>,
  VariantProps<typeof logoVariants> {
  /** Accessible label when the logo is meaningful (e.g. link home). Defaults to "People's Party". */
  title?: string;
}

/**
 * People's Party brand mark. Uses `currentColor` for fills — apply `text-primary` or other token classes.
 */
export function Logo({
  size,
  className,
  title = "People's Party",
  "aria-label": ariaLabel,
  role = "img",
  ...props
}: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 255.53 221.32"
      role={role}
      aria-label={ariaLabel ?? title}
      className={cn(logoVariants({ size }), "w-auto", className)}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <polygon points="4.04 0 45.39 0 119.52 128.41 94.81 171.21 0 6.99 4.04 0" fill="currentColor" />
      <polygon points="123.74 221.32 103.06 185.51 177.19 57.11 226.62 57.11 131.8 221.32 123.74 221.32" fill="currentColor" />
      <polygon points="255.53 7.01 234.85 42.82 86.58 42.82 61.87 .02 251.5 .02 255.53 7.01" fill="currentColor" />
    </svg>
  );
}
