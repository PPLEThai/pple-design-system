import { cva, type VariantProps } from "class-variance-authority";

export const gapVariants = cva("", {
  variants: {
    gap: {
      none: "gap-0",
      xs: "gap-1",
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
    },
  },
  defaultVariants: {
    gap: "md",
  },
});

export type GapVariants = VariantProps<typeof gapVariants>;

export const containerVariants = cva("mx-auto w-full px-4 md:px-6", {
  variants: {
    size: {
      sm: "max-w-screen-sm",
      md: "max-w-screen-md",
      lg: "max-w-screen-xl",
      full: "max-w-full",
    },
  },
  defaultVariants: {
    size: "lg",
  },
});

export type ContainerVariants = VariantProps<typeof containerVariants>;
