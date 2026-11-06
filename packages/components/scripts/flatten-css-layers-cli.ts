import { readFileSync, writeFileSync } from "node:fs";

import { flattenCssLayers } from "./flatten-css-layers.ts";

// Usage: bun scripts/flatten-css-layers-cli.ts dist/styles.css
const file = process.argv[2];
if (file === undefined) throw new Error("Usage: flatten-css-layers-cli.ts <file.css>");
writeFileSync(file, flattenCssLayers(readFileSync(file, "utf8")));
