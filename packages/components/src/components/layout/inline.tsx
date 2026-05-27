import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { gapVariants } from "../../lib/variants";
import { cn } from "../../lib/utils";

const inlineVariants = cva("flex flex-row flex-wrap", {
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
    align: "center",
    justify: "start",
  },
});

export interface InlineProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof inlineVariants>,
    VariantProps<typeof gapVariants> {
  as?: React.ElementType;
}

export function Inline({
  as: Component = "div",
  className,
  gap,
  align,
  justify,
  ...props
}: InlineProps) {
  return (
    <Component
      className={cn(inlineVariants({ align, justify }), gapVariants({ gap }), className)}
      {...props}
    />
  );
}
