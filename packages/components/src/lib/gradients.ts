/** Tailwind classes for brand gradient backgrounds (see globals.css tokens). */
export const gradients = {
  primary: "bg-gradient-primary",
  secondary: "bg-gradient-secondary",
  brand: "bg-gradient-brand",
  destructive: "bg-gradient-destructive",
} as const;

export type GradientToken = keyof typeof gradients;
