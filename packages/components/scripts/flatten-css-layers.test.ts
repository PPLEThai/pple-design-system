import { describe, expect, it } from "vitest";

import { flattenCssLayers } from "./flatten-css-layers.ts";

describe("flattenCssLayers", () => {
  it("unwraps layer blocks and drops order statements, keeping rules in source order", () => {
    const css =
      "@layer theme,base,utilities;@layer theme{:root{--x:1}}@layer base{a{color:red}}" +
      "@layer utilities{.text-white{color:white}}";

    expect(flattenCssLayers(css)).toBe(":root{--x:1}a{color:red}.text-white{color:white}");
  });

  it("unwraps nested layers and layers inside @supports", () => {
    const css = "@layer base{@layer inner{b{color:red}}}@supports (color:red){@layer x{i{x:1}}}";

    expect(flattenCssLayers(css)).toBe("b{color:red}@supports (color:red){i{x:1}}");
  });

  it("throws when blocks are out of their declared order", () => {
    const css = "@layer base,utilities;@layer utilities{.a{x:1}}@layer base{a{x:2}}";

    expect(() => flattenCssLayers(css)).toThrow(/declared order/);
  });
});
