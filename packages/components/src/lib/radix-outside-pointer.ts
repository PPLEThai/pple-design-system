import * as React from "react";

type PointerDownOutsideEvent = CustomEvent<{ originalEvent: PointerEvent }>;
type FocusOutsideEvent = CustomEvent<{ originalEvent: FocusEvent }>;
type InteractOutsideEvent = PointerDownOutsideEvent | FocusOutsideEvent;

export type PopoverOutsideHandlers = {
  onPointerDownOutside?: (event: PointerDownOutsideEvent) => void;
  onInteractOutside?: (event: InteractOutsideEvent) => void;
  onFocusOutside?: (event: FocusOutsideEvent) => void;
};

/** Marks the popover anchor (e.g. Autocomplete input wrapper) — not part of portaled content. */
export const POPOVER_ANCHOR_ATTR = "data-pple-popover-anchor";

/** True when the event target is a select/combobox trigger (not the portaled content). */
export function isComboboxTriggerTarget(target: EventTarget | null): boolean {
  return target instanceof Element && target.closest('[role="combobox"]') !== null;
}

/** True when the target is inside a popover anchor (PopoverAnchor / Autocomplete field). */
export function isPopoverAnchorTarget(target: EventTarget | null): boolean {
  return target instanceof Element && target.closest(`[${POPOVER_ANCHOR_ATTR}]`) !== null;
}

/** True when the target is inside the portaled listbox. */
export function isListboxTarget(target: EventTarget | null): boolean {
  return target instanceof Element && target.closest('[role="listbox"]') !== null;
}

/**
 * Popover content is portaled; anchor and combobox live outside it. Without this guard,
 * opening on pointerdown/focus is treated as an outside interaction (React 19 / WebViews).
 */
export function shouldPreventPopoverDismiss(target: EventTarget | null): boolean {
  return (
    isComboboxTriggerTarget(target) ||
    isPopoverAnchorTarget(target) ||
    isListboxTarget(target)
  );
}

function preventDismissIfNeeded(event: { target: EventTarget | null; preventDefault: () => void }) {
  if (shouldPreventPopoverDismiss(event.target)) {
    event.preventDefault();
  }
}

function preventFocusDismissIfNeeded(event: FocusOutsideEvent) {
  const { originalEvent } = event.detail;
  if (
    shouldPreventPopoverDismiss(originalEvent.target) ||
    shouldPreventPopoverDismiss(originalEvent.relatedTarget)
  ) {
    event.preventDefault();
  }
}

function preventInteractDismissIfNeeded(event: InteractOutsideEvent) {
  const { originalEvent } = event.detail;
  if (originalEvent instanceof FocusEvent) {
    if (
      shouldPreventPopoverDismiss(originalEvent.target) ||
      shouldPreventPopoverDismiss(originalEvent.relatedTarget)
    ) {
      event.preventDefault();
      return;
    }
  } else if (shouldPreventPopoverDismiss(originalEvent.target)) {
    event.preventDefault();
    return;
  }
  preventDismissIfNeeded(event);
}

/** Guards all Radix dismiss paths used by Popover content. */
export function composePopoverDismissHandlers(
  handlers: PopoverOutsideHandlers = {},
): PopoverOutsideHandlers {
  return {
    onPointerDownOutside: (event) => {
      preventDismissIfNeeded(event);
      handlers.onPointerDownOutside?.(event);
    },
    onInteractOutside: (event) => {
      preventInteractDismissIfNeeded(event);
      handlers.onInteractOutside?.(event);
    },
    onFocusOutside: (event) => {
      preventFocusDismissIfNeeded(event);
      handlers.onFocusOutside?.(event);
    },
  };
}

/** @deprecated Use composePopoverDismissHandlers */
export function composePointerDownOutsideOnCombobox(
  onPointerDownOutside?: (event: PointerDownOutsideEvent) => void,
): (event: PointerDownOutsideEvent) => void {
  return composePopoverDismissHandlers({ onPointerDownOutside }).onPointerDownOutside!;
}

/**
 * Ignores a close signal fired in the same tick/gesture as open (mobile WebViews).
 */
export function usePopoverOpenState(
  initialState = false,
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] {
  const [open, setOpenState] = React.useState(initialState);
  const ignoreCloseUntilRef = React.useRef(0);

  const setOpen = React.useCallback((value: React.SetStateAction<boolean>) => {
    setOpenState((prev) => {
      const next = typeof value === "function" ? value(prev) : value;
      if (!next && Date.now() < ignoreCloseUntilRef.current) {
        return prev;
      }
      if (next) {
        ignoreCloseUntilRef.current = Date.now() + 100;
      }
      return next;
    });
  }, []);

  return [open, setOpen];
}

/**
 * Radix can call onValueChange('') when the hidden native select syncs before options mount
 * (common with React 19 + forms). Skip empty updates when a real controlled value exists.
 * @see https://github.com/radix-ui/primitives/issues/3693
 */
export function shouldIgnoreSpuriousSelectValueChange(
  nextValue: string,
  controlledValue: string | undefined,
): boolean {
  return nextValue === "" && controlledValue !== undefined && controlledValue !== "";
}
