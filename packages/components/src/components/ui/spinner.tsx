import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const spinnerVariants = cva("inline-block shrink-0 text-primary", {
  variants: {
    size: {
      sm: "h-4 w-4",
      default: "h-6 w-6",
      lg: "h-8 w-8",
      xl: "h-12 w-12",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface SpinnerProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "role">,
    VariantProps<typeof spinnerVariants> {
  /** Current progress (0..max). Omit for an indeterminate spinning loop. */
  value?: number | null;
  /** Maximum value when determinate. */
  max?: number;
  /** Stroke thickness as a percentage of the SVG viewBox. */
  strokeWidth?: number;
  /** Accessible label announced by screen readers. Defaults to "Loading". */
  label?: string;
}

const VIEWBOX = 24;
const CENTER = VIEWBOX / 2;

export const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  (
    {
      className,
      size,
      value,
      max = 100,
      strokeWidth = 2.5,
      label = "Loading",
      ...props
    },
    ref,
  ) => {
    const isDeterminate = typeof value === "number";
    const radius = CENTER - strokeWidth / 2;
    const circumference = 2 * Math.PI * radius;
    const clamped = isDeterminate ? Math.max(0, Math.min(value, max)) : 0;
    const pct = isDeterminate ? clamped / max : 0;

    const arcDash = isDeterminate
      ? `${pct * circumference} ${circumference}`
      : `${circumference * 0.25} ${circumference}`;

    const ariaProps = isDeterminate
      ? {
          role: "progressbar" as const,
          "aria-valuemin": 0,
          "aria-valuemax": max,
          "aria-valuenow": clamped,
        }
      : { role: "status" as const, "aria-live": "polite" as const };

    return (
      <span
        ref={ref}
        aria-label={label}
        {...ariaProps}
        className={cn(spinnerVariants({ size }), className)}
        {...props}
      >
        <svg
          viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className={cn("h-full w-full", !isDeterminate && "animate-spin")}
          aria-hidden="true"
        >
          <circle
            cx={CENTER}
            cy={CENTER}
            r={radius}
            className="opacity-20"
          />
          <circle
            cx={CENTER}
            cy={CENTER}
            r={radius}
            strokeDasharray={arcDash}
            transform={`rotate(-90 ${CENTER} ${CENTER})`}
            style={
              isDeterminate
                ? { transition: "stroke-dasharray 300ms ease-out" }
                : undefined
            }
          />
        </svg>
      </span>
    );
  },
);
Spinner.displayName = "Spinner";

export { spinnerVariants };
