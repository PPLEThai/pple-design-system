type PointerDownOutsideEvent = CustomEvent<{ originalEvent: PointerEvent }>;

/** True when the event target is a select/combobox trigger (not the portaled content). */
export function isComboboxTriggerTarget(target: EventTarget | null): boolean {
  return target instanceof Element && target.closest('[role="combobox"]') !== null;
}

/**
 * Radix Select opens on pointerdown; the same gesture can be treated as an outside
 * pointerdown on the newly mounted content (React 19 / mobile WebViews). Ignore those.
 */
export function composePointerDownOutsideOnCombobox(
  onPointerDownOutside?: (event: PointerDownOutsideEvent) => void,
): (event: PointerDownOutsideEvent) => void {
  return (event) => {
    if (isComboboxTriggerTarget(event.target)) {
      event.preventDefault();
    }
    onPointerDownOutside?.(event);
  };
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
