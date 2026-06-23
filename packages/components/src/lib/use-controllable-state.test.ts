import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useControllableState } from "./use-controllable-state";

describe("useControllableState", () => {
  it("manages its own state when used uncontrolled", () => {
    const { result } = renderHook(() =>
      useControllableState<number>(undefined, undefined),
    );

    expect(result.current[0]).toBeUndefined();
    act(() => result.current[1](5));
    expect(result.current[0]).toBe(5);
  });

  it("reflects the controlled value and never overwrites it internally", () => {
    const onChange = vi.fn();
    const { result, rerender } = renderHook(
      ({ value }) => useControllableState<number>(value, undefined, onChange),
      { initialProps: { value: 1 as number | undefined } },
    );

    expect(result.current[0]).toBe(1);
    act(() => result.current[1](2));
    expect(onChange).toHaveBeenCalledWith(2);
    // Still shows the controlled value, not the internally requested one.
    expect(result.current[0]).toBe(1);

    rerender({ value: 2 });
    expect(result.current[0]).toBe(2);
  });

  it("clears when a controlled value is set back to undefined after a selection", () => {
    // Reproduces the reported bug: starts empty (filter case), the user makes a
    // selection while value is still undefined, the selection flows back as a
    // controlled value, and the consumer then clears it with undefined.
    const onChange = vi.fn();
    const { result, rerender } = renderHook(
      ({ value }) => useControllableState<number>(value, undefined, onChange),
      { initialProps: { value: undefined as number | undefined } },
    );

    // 1. Empty.
    expect(result.current[0]).toBeUndefined();

    // 2. User selects while uncontrolled; the value flows back as controlled.
    act(() => result.current[1](7));
    rerender({ value: 7 });
    expect(result.current[0]).toBe(7);

    // 3. Consumer clears by passing undefined — must return to empty.
    rerender({ value: undefined });
    expect(result.current[0]).toBeUndefined();
  });
});
