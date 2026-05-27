import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "../../lib/utils";

const EXIT_MS = 280;
const ENTER_MS = 280;

type RadioItemPhase = "none" | "exit" | "enter" | "settled";

type RadioGroupAnimation = {
  phase: "exit" | "enter";
  from: string;
  to: string;
};

type RadioGroupContextValue = {
  getItemPhase: (itemValue: string) => RadioItemPhase;
};

const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(null);

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, value, defaultValue, onValueChange, ...props }, ref) => {
  const isControlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
  const [animation, setAnimation] = React.useState<RadioGroupAnimation | null>(null);

  const resolvedValue = isControlled ? value : uncontrolledValue;

  const radixValue =
    animation?.phase === "exit"
      ? animation.from
      : animation?.phase === "enter"
        ? animation.to
        : resolvedValue;

  const getItemPhase = React.useCallback(
    (itemValue: string): RadioItemPhase => {
      if (animation?.phase === "exit" && animation.from === itemValue) return "exit";
      if (animation?.phase === "enter" && animation.to === itemValue) return "enter";
      if (!animation && resolvedValue === itemValue) return "settled";
      return "none";
    },
    [animation, resolvedValue],
  );

  React.useEffect(() => {
    if (!animation) return;

    if (animation.phase === "exit") {
      const timer = window.setTimeout(() => {
        if (!isControlled) {
          setUncontrolledValue(animation.to);
        }
        onValueChange?.(animation.to);
        setAnimation({ phase: "enter", from: animation.from, to: animation.to });
      }, EXIT_MS);
      return () => window.clearTimeout(timer);
    }

    if (animation.phase === "enter") {
      const timer = window.setTimeout(() => setAnimation(null), ENTER_MS);
      return () => window.clearTimeout(timer);
    }
  }, [animation, isControlled, onValueChange]);

  const handleValueChange = React.useCallback(
    (next: string) => {
      if (next === resolvedValue || animation) return;

      if (prefersReducedMotion()) {
        if (!isControlled) setUncontrolledValue(next);
        onValueChange?.(next);
        return;
      }

      if (!resolvedValue) {
        if (!isControlled) setUncontrolledValue(next);
        onValueChange?.(next);
        setAnimation({ phase: "enter", from: "", to: next });
        return;
      }

      setAnimation({ phase: "exit", from: resolvedValue, to: next });
    },
    [resolvedValue, animation, isControlled, onValueChange],
  );

  const contextValue = React.useMemo(() => ({ getItemPhase }), [getItemPhase]);

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <RadioGroupPrimitive.Root
        className={cn("grid gap-2", className)}
        value={radixValue}
        onValueChange={handleValueChange}
        {...props}
        ref={ref}
      />
    </RadioGroupContext.Provider>
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

export const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, value: itemValue, ...props }, ref) => {
  const context = React.useContext(RadioGroupContext);
  const phase =
    context && itemValue !== undefined
      ? context.getItemPhase(itemValue)
      : undefined;

  const animated = phase === "exit" || phase === "enter" || phase === "settled";
  const useAnimation = context !== null && phase !== undefined;

  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      value={itemValue}
      className={cn(
        "radio-root relative inline-flex aspect-square h-4 w-4 shrink-0 items-center justify-center overflow-hidden rounded-full border border-primary bg-background text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        phase === "settled" && "radio-settled",
        phase === "enter" && "radio-animate-enter",
        phase === "exit" && "radio-animate-exit",
        className,
      )}
      {...props}
    >
      {useAnimation ? (
        animated && (
          <RadioGroupPrimitive.Indicator forceMount className="flex h-full w-full items-center justify-center">
            <span className="radio-dot block h-2.5 w-2.5 shrink-0 rounded-full bg-primary" aria-hidden />
          </RadioGroupPrimitive.Indicator>
        )
      ) : (
        <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
          <span className="block h-2.5 w-2.5 shrink-0 rounded-full bg-primary" aria-hidden />
        </RadioGroupPrimitive.Indicator>
      )}
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;
