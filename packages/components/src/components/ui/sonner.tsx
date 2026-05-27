import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Info,
  Loader2,
  X,
} from "lucide-react";
import * as React from "react";
import { Toaster as Sonner, toast as sonnerToast } from "sonner";
import { Icon } from "../icon";
import { cn } from "../../lib/utils";

type ToasterProps = React.ComponentProps<typeof Sonner>;

/** Do not set position:relative — Sonner toasts must stay position:absolute for stack/hover. */
const toastBase =
  "group toast flex w-full items-start gap-3 rounded-lg border border-border bg-card p-4 text-card-foreground shadow-md transition-[box-shadow,transform] duration-200";

const toastTitle = "font-heading text-sm font-medium leading-snug text-foreground";

const toastDescription = "text-sm text-muted-foreground leading-body";

const toastAction =
  "font-heading !inline-flex h-9 shrink-0 items-center justify-center rounded-md bg-gradient-primary px-3 text-sm font-medium text-primary-foreground shadow-sm hover:brightness-95";

const toastCancel =
  "font-heading !inline-flex h-9 shrink-0 items-center justify-center rounded-md border border-input bg-background px-3 text-sm font-medium text-foreground hover:bg-muted";

const Toaster = ({ className, ...props }: ToasterProps) => {
  return (
    <Sonner
      className={cn("toaster group", className)}
      theme="light"
      richColors={false}
      closeButton
      icons={{
        success: <Icon icon={CheckCircle2} size="lg" color="primary" aria-hidden />,
        error: <Icon icon={AlertCircle} size="lg" color="destructive" aria-hidden />,
        warning: <Icon icon={AlertTriangle} size="lg" color="primary" aria-hidden />,
        info: (
          <Icon icon={Info} size="lg" color="default" className="text-secondary" aria-hidden />
        ),
        loading: (
          <Loader2 className="h-6 w-6 shrink-0 animate-spin text-primary" aria-hidden />
        ),
        close: <X className="h-3.5 w-3.5" aria-hidden />,
      }}
      toastOptions={{
        classNames: {
          toast: toastBase,
          title: toastTitle,
          description: toastDescription,
          actionButton: toastAction,
          cancelButton: toastCancel,
          closeButton: "!border-solid",
        },
      }}
      {...props}
    />
  );
};

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

export { Toaster, sonnerToast as toast };
