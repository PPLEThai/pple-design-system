import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { gapVariants } from "../../lib/variants";
import { cn } from "../../lib/utils";

const stackVariants = cva("flex flex-col", {
  variants: {
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
    },
  },
  defaultVariants: {
    align: "stretch",
    justify: "start",
  },
});

export interface StackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stackVariants>,
    VariantProps<typeof gapVariants> {
  as?: React.ElementType;
}

export function Stack({
  as: Component = "div",
  className,
  gap,
  align,
  justify,
  ...props
}: StackProps) {
  return (
    <Component
      className={cn(stackVariants({ align, justify }), gapVariants({ gap }), className)}
      {...props}
    />
  );
}
