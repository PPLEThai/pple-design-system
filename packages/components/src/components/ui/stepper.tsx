import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "../../lib/utils";

type StepperOrientation = "horizontal" | "vertical";

interface StepperContextValue {
  value: number;
  orientation: StepperOrientation;
}

const StepperContext = React.createContext<StepperContextValue | null>(null);

function useStepperContext() {
  const ctx = React.useContext(StepperContext);
  if (!ctx) {
    throw new Error("StepperItem must be rendered inside <Stepper>");
  }
  return ctx;
}

interface StepperItemContextValue {
  index: number;
  isLast: boolean;
}

const StepperItemContext = React.createContext<StepperItemContextValue | null>(null);

export interface StepperProps extends Omit<React.HTMLAttributes<HTMLOListElement>, "value"> {
  /** Current step (0-indexed). Steps before are completed; the step at this index is active. */
  value: number;
  orientation?: StepperOrientation;
}

export const Stepper = React.forwardRef<HTMLOListElement, StepperProps>(
  ({ value, orientation = "horizontal", className, children, ...props }, ref) => {
    const items = React.Children.toArray(children).filter(React.isValidElement);
    const lastIndex = items.length - 1;

    return (
      <StepperContext.Provider value={{ value, orientation }}>
        <ol
          ref={ref}
          data-orientation={orientation}
          className={cn(
            "flex w-full",
            orientation === "horizontal" ? "flex-row" : "flex-col",
            className,
          )}
          {...props}
        >
          {items.map((child, index) => (
            <StepperItemContext.Provider
              key={child.key ?? index}
              value={{ index, isLast: index === lastIndex }}
            >
              {child}
            </StepperItemContext.Provider>
          ))}
        </ol>
      </StepperContext.Provider>
    );
  },
);
Stepper.displayName = "Stepper";

export interface StepperItemProps
  extends Omit<React.LiHTMLAttributes<HTMLLIElement>, "title"> {
  title: React.ReactNode;
  description?: React.ReactNode;
}

export const StepperItem = React.forwardRef<HTMLLIElement, StepperItemProps>(
  ({ title, description, className, ...props }, ref) => {
    const { value, orientation } = useStepperContext();
    const itemCtx = React.useContext(StepperItemContext);
    if (!itemCtx) {
      throw new Error("StepperItem must be rendered inside <Stepper>");
    }
    const { index, isLast } = itemCtx;

    const isCompleted = index < value;
    const isCurrent = index === value;
    const isHorizontal = orientation === "horizontal";

    const circle = (
      <span
        aria-hidden="true"
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 font-heading text-sm font-medium transition-colors",
          isCompleted && "border-primary bg-primary text-primary-foreground",
          isCurrent && "border-primary bg-background text-primary",
          !isCompleted &&
            !isCurrent &&
            "border-border bg-background text-muted-foreground",
        )}
      >
        {isCompleted ? <Check className="h-4 w-4" strokeWidth={3} /> : index + 1}
      </span>
    );

    const connector = !isLast ? (
      <span
        aria-hidden="true"
        className={cn(
          "transition-colors",
          isHorizontal ? "mx-2 h-0.5 flex-1" : "my-1 w-0.5 flex-1",
          isCompleted ? "bg-primary" : "bg-border",
        )}
      />
    ) : null;

    const labels = (
      <div className={cn("min-w-0", isHorizontal ? "mt-2" : "pt-1")}>
        <p
          className={cn(
            "font-heading text-sm font-medium leading-tight",
            isCompleted || isCurrent ? "text-foreground" : "text-muted-foreground",
          )}
        >
          {title}
        </p>
        {description ? (
          <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
        ) : null}
      </div>
    );

    if (isHorizontal) {
      return (
        <li
          ref={ref}
          aria-current={isCurrent ? "step" : undefined}
          className={cn("min-w-0", isLast ? "flex-none" : "flex-1", className)}
          {...props}
        >
          <div className="flex items-center">
            {circle}
            {connector}
          </div>
          {labels}
        </li>
      );
    }

    return (
      <li
        ref={ref}
        aria-current={isCurrent ? "step" : undefined}
        className={cn("flex gap-3", !isLast && "pb-4", className)}
        {...props}
      >
        <div className="flex flex-col items-center">
          {circle}
          {connector}
        </div>
        <div className="min-w-0 flex-1">{labels}</div>
      </li>
    );
  },
);
StepperItem.displayName = "StepperItem";
