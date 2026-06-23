import * as React from "react";

/**
 * Controlled/uncontrolled state helper used by the picker components.
 *
 * `undefined` is overloaded: a consumer passes `undefined` both when it wants
 * the component to manage its own state (uncontrolled) and when it drives the
 * component but currently has no selection (controlled + empty). We can't tell
 * these apart from a single render, so we observe history: once `value` has
 * been defined at least once, the consumer is clearly driving the component, so
 * we stay controlled for the rest of its lifetime. A later `value={undefined}`
 * then correctly clears the selection instead of falling back to stale internal
 * state.
 *
 * This still supports the common filter case that starts empty
 * (`value={undefined}`) and only becomes controlled after the first selection
 * flows back through `onChange`.
 */
export function useControllableState<T>(
  value: T | undefined,
  defaultValue: T | undefined,
  onChange?: (value: T) => void,
): [T | undefined, (next: T) => void] {
  const isControlled = React.useRef(value !== undefined);
  if (value !== undefined) isControlled.current = true;

  const [internal, setInternal] = React.useState<T | undefined>(defaultValue);
  const current = isControlled.current ? value : internal;

  const setValue = React.useCallback(
    (next: T) => {
      if (!isControlled.current) setInternal(next);
      onChange?.(next);
    },
    [onChange],
  );

  return [current, setValue];
}
