import { type AtRule, parse } from "postcss";

/**
 * Removes every cascade layer from a compiled stylesheet and keeps the rules in place.
 *
 * Tailwind CSS v4 emits native `@layer` blocks. Rules outside any layer always beat layered rules,
 * so an app's own unlayered CSS (for example `a { color: inherit }`) would override component
 * utilities. Tailwind CSS v3 compiled layers away, and `dist/styles.css` keeps that 1.x cascade:
 * plain rules ranked by specificity and source order.
 *
 * Unwrapping is only safe when the blocks already appear in their declared priority order, because
 * source order then gives the same ranking the layers did. Anything else throws so the build fails
 * instead of shipping a reordered cascade.
 */
export function flattenCssLayers(css: string): string {
  const root = parse(css);
  const declared: string[] = [];
  const seen: string[] = [];

  root.walkAtRules("layer", (rule) => {
    const names = rule.params
      .split(",")
      .map((name) => name.trim())
      .filter(Boolean);
    if (rule.nodes === undefined) {
      declared.push(...names);
      rule.remove();
      return;
    }
    if (rule.parent === root && names.length === 1) seen.push(names[0]);
  });

  const order = declared.length > 0 ? declared : seen;
  const ranks = seen.map((name) => order.indexOf(name));
  const sorted = ranks.every((rank, i) => rank !== -1 && (i === 0 || rank >= ranks[i - 1]));
  if (!sorted) {
    throw new Error(
      `Layer blocks [${seen.join(", ")}] do not follow the declared order [${order.join(", ")}]`,
    );
  }

  // Innermost first, so nested layers are unwrapped before their parents.
  const blocks: AtRule[] = [];
  root.walkAtRules("layer", (rule) => {
    blocks.push(rule);
  });
  for (let i = blocks.length - 1; i >= 0; i--) blocks[i].replaceWith(blocks[i].nodes ?? []);

  const output = root.toString();
  if (/@layer\b/.test(output)) throw new Error("@layer is still present after flattening");
  return output;
}
