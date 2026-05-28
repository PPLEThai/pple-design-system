import { describe, expect, it, vi } from "vitest";
import {
  composePopoverDismissHandlers,
  isComboboxTriggerTarget,
  isListboxTarget,
  isPopoverAnchorTarget,
  POPOVER_ANCHOR_ATTR,
  shouldIgnoreSpuriousSelectValueChange,
  shouldPreventPopoverDismiss,
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

describe("shouldPreventPopoverDismiss", () => {
  it("returns true for combobox trigger", () => {
    const trigger = document.createElement("button");
    trigger.setAttribute("role", "combobox");
    expect(isComboboxTriggerTarget(trigger)).toBe(true);
    expect(shouldPreventPopoverDismiss(trigger)).toBe(true);
  });

  it("returns true for popover anchor", () => {
    const anchor = document.createElement("div");
    anchor.setAttribute(POPOVER_ANCHOR_ATTR, "");
    expect(isPopoverAnchorTarget(anchor)).toBe(true);
    expect(shouldPreventPopoverDismiss(anchor)).toBe(true);
  });

  it("returns true for listbox option", () => {
    const listbox = document.createElement("div");
    listbox.setAttribute("role", "listbox");
    const option = document.createElement("button");
    option.setAttribute("role", "option");
    listbox.appendChild(option);
    expect(isListboxTarget(option)).toBe(true);
    expect(shouldPreventPopoverDismiss(option)).toBe(true);
  });

  it("returns false for unrelated body clicks", () => {
    expect(shouldPreventPopoverDismiss(document.body)).toBe(false);
  });
});

describe("composePopoverDismissHandlers", () => {
  it("prevents pointer down outside on combobox trigger", () => {
    const trigger = document.createElement("button");
    trigger.setAttribute("role", "combobox");
    const inner = document.createElement("span");
    trigger.appendChild(inner);

    const { onPointerDownOutside } = composePopoverDismissHandlers();
    const event = new CustomEvent("pointerdownOutside", {
      detail: { originalEvent: {} as PointerEvent },
    });
    Object.defineProperty(event, "target", { value: inner });
    const preventDefault = vi.spyOn(event, "preventDefault");

    onPointerDownOutside!(event);

    expect(preventDefault).toHaveBeenCalled();
  });

  it("prevents interact outside on popover anchor", () => {
    const anchor = document.createElement("div");
    anchor.setAttribute(POPOVER_ANCHOR_ATTR, "");
    const input = document.createElement("input");
    anchor.appendChild(input);

    const { onInteractOutside } = composePopoverDismissHandlers();
    const event = new CustomEvent("interactOutside", {
      detail: { originalEvent: { target: input } as PointerEvent },
    });
    Object.defineProperty(event, "target", { value: input });
    const preventDefault = vi.spyOn(event, "preventDefault");

    onInteractOutside!(event);

    expect(preventDefault).toHaveBeenCalled();
  });

  it("forwards to user pointer handler", () => {
    const userHandler = vi.fn();
    const { onPointerDownOutside } = composePopoverDismissHandlers({
      onPointerDownOutside: userHandler,
    });
    const event = new CustomEvent("pointerdownOutside", {
      detail: { originalEvent: {} as PointerEvent },
    });
    Object.defineProperty(event, "target", { value: document.body });

    onPointerDownOutside!(event);

    expect(userHandler).toHaveBeenCalledWith(event);
  });
});
