import * as React from "react";
import { type VariantProps } from "class-variance-authority";
import { containerVariants } from "../../lib/variants";
import { cn } from "../../lib/utils";

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  as?: React.ElementType;
}

export function Container({ as: Component = "div", className, size, ...props }: ContainerProps) {
  return <Component className={cn(containerVariants({ size }), className)} {...props} />;
}
