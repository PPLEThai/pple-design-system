import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const gradientButton = "gradient-hover-animate active:brightness-90";

export const buttonVariants = cva(
  "font-heading inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: cn(
          "bg-gradient-primary-button text-primary-foreground shadow-md",
          gradientButton,
        ),
        destructive: cn(
          "bg-gradient-destructive text-destructive-foreground shadow-md",
          gradientButton,
        ),
        outline: cn(
          "border border-secondary bg-background text-secondary",
          "hover:border-transparent hover:bg-gradient-secondary-button hover:text-secondary-foreground hover:shadow-md",
          gradientButton,
          "active:brightness-95",
        ),
        secondary: cn(
          "bg-gradient-secondary-button text-secondary-foreground shadow-md",
          gradientButton,
          "active:brightness-95",
        ),
        ghost: "transition-colors hover:bg-secondary/10 hover:text-secondary",
        link: "text-primary underline-offset-4 transition-colors hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-7 rounded-md px-2.5 text-xs [&_svg]:size-3.5",
        lg: "h-12 rounded-md px-10 text-base [&_svg]:size-5",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";
