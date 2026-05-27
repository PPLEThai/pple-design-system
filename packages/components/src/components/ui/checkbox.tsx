import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import type { CheckedState } from "@radix-ui/react-checkbox";
import { cn } from "../../lib/utils";

/** Check path drawn left → right (short leg, then long leg). */
const CHECK_PATH = "M3.5 8.25 6.25 11 12.75 4.5";

type CheckboxAnimation = "none" | "check" | "uncheck";

const ANIMATION_MS = 560;

export const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, checked, defaultChecked, onCheckedChange, ...props }, ref) => {
  const initialChecked = checked ?? defaultChecked ?? false;
  const [animation, setAnimation] = React.useState<CheckboxAnimation>("none");
  /** Settled checked look (solid primary + visible check). Deferred until draw animation ends. */
  const [settledChecked, setSettledChecked] = React.useState(initialChecked === true);

  React.useEffect(() => {
    if (animation === "none") return;
    const timer = window.setTimeout(() => {
      if (animation === "check") {
        setSettledChecked(true);
      }
      setAnimation("none");
    }, ANIMATION_MS);
    return () => window.clearTimeout(timer);
  }, [animation]);

  React.useEffect(() => {
    if (animation !== "none" || checked === undefined) return;
    setSettledChecked(checked === true);
  }, [checked, animation]);

  const handleCheckedChange = React.useCallback(
    (value: CheckedState) => {
      if (value === "indeterminate") {
        onCheckedChange?.(value);
        return;
      }
      const isChecked = value === true;
      if (isChecked) {
        setSettledChecked(false);
        setAnimation("check");
      } else {
        setSettledChecked(false);
        setAnimation("uncheck");
      }
      onCheckedChange?.(value);
    },
    [onCheckedChange],
  );

  return (
    <CheckboxPrimitive.Root
      ref={ref}
      checked={checked}
      defaultChecked={defaultChecked}
      onCheckedChange={handleCheckedChange}
      className={cn(
        "checkbox-root peer relative inline-flex h-4 w-4 shrink-0 items-center justify-center overflow-hidden rounded-sm border border-primary bg-background text-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        settledChecked && "checkbox-settled",
        animation === "check" && "checkbox-animate-check",
        animation === "uncheck" && "checkbox-animate-uncheck",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        forceMount
        className="flex h-full w-full items-center justify-center"
      >
        <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden fill="none">
          <path
            d={CHECK_PATH}
            pathLength={1}
            className="checkbox-check-path fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:2] [stroke-dasharray:1]"
          />
        </svg>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});
Checkbox.displayName = CheckboxPrimitive.Root.displayName;
