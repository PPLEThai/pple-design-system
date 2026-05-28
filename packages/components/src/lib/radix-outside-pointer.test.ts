import { describe, expect, it, vi } from "vitest";
import {
  composePointerDownOutsideOnCombobox,
  isComboboxTriggerTarget,
  shouldIgnoreSpuriousSelectValueChange,
} from "./radix-outside-pointer";

describe("shouldIgnoreSpuriousSelectValueChange", () => {
  it("ignores empty string when a controlled value is set", () => {
    expect(shouldIgnoreSpuriousSelectValueChange("", "bkk")).toBe(true);
  });

  it("allows empty string when value is already empty", () => {
    expect(shouldIgnoreSpuriousSelectValueChange("", "")).toBe(false);
  });

  it("allows empty string when uncontrolled", () => {
    expect(shouldIgnoreSpuriousSelectValueChange("", undefined)).toBe(false);
  });

  it("allows non-empty updates", () => {
    expect(shouldIgnoreSpuriousSelectValueChange("cnx", "bkk")).toBe(false);
  });
});

describe("composePointerDownOutsideOnCombobox", () => {
  it("prevents default when target is inside a combobox trigger", () => {
    const trigger = document.createElement("button");
    trigger.setAttribute("role", "combobox");
    const inner = document.createElement("span");
    trigger.appendChild(inner);

    const handler = composePointerDownOutsideOnCombobox();
    const event = new CustomEvent("pointerdownOutside", {
      detail: { originalEvent: {} as PointerEvent },
    });
    Object.defineProperty(event, "target", { value: inner });
    const preventDefault = vi.spyOn(event, "preventDefault");

    handler(event);

    expect(preventDefault).toHaveBeenCalled();
  });

  it("forwards to user handler", () => {
    const userHandler = vi.fn();
    const handler = composePointerDownOutsideOnCombobox(userHandler);
    const event = new CustomEvent("pointerdownOutside", {
      detail: { originalEvent: {} as PointerEvent },
    });
    Object.defineProperty(event, "target", { value: document.body });

    handler(event);

    expect(userHandler).toHaveBeenCalledWith(event);
  });
});

describe("isComboboxTriggerTarget", () => {
  it("returns false for non-element targets", () => {
    expect(isComboboxTriggerTarget(null)).toBe(false);
  });
});
