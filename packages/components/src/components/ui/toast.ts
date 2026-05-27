import { toast as sonnerToast } from "sonner";

export type ToastVariant = "default" | "success" | "error" | "warning" | "info" | "loading";

export interface ShowToastOptions {
  title: string;
  description?: string;
  variant?: ToastVariant;
}

/** Trigger a toast using the design-system variant styles. */
export function showToast({ title, description, variant = "default" }: ShowToastOptions) {
  const options = description ? { description } : undefined;

  switch (variant) {
    case "success":
      return sonnerToast.success(title, options);
    case "error":
      return sonnerToast.error(title, options);
    case "warning":
      return sonnerToast.warning(title, options);
    case "info":
      return sonnerToast.info(title, options);
    case "loading":
      return sonnerToast.loading(title, options);
    default:
      return sonnerToast(title, options);
  }
}

export { sonnerToast as toast };
