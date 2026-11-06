// Fails when the published package.json would carry Bun-only specifiers. `changeset publish` runs
// npm, which does not resolve `catalog:` or `workspace:`, so they would ship verbatim. Pinned
// versions must still match the root catalog, which stays the single source of truth.
import { readFileSync } from "node:fs";

type Manifest = Record<string, unknown>;

function read(path: string): Manifest {
  return JSON.parse(readFileSync(new URL(path, import.meta.url), "utf8")) as Manifest;
}

const root = read("../package.json");
const pkg = read("../packages/components/package.json");
const workspaces = root["workspaces"] as { catalog?: Record<string, string> } | undefined;
const catalog = workspaces?.catalog ?? {};
const errors: string[] = [];

for (const field of [
  "dependencies",
  "devDependencies",
  "peerDependencies",
  "optionalDependencies",
]) {
  const deps = (pkg[field] ?? {}) as Record<string, string>;
  for (const [name, spec] of Object.entries(deps)) {
    if (/^(catalog|workspace):/.test(spec)) {
      errors.push(
        `${field}.${name} is "${spec}"; npm publishes it verbatim, pin a version instead`,
      );
    } else if (field === "devDependencies" && name in catalog && spec !== catalog[name]) {
      errors.push(`${field}.${name} is "${spec}" but the root catalog pins "${catalog[name]}"`);
    }
  }
}

if (errors.length > 0) {
  console.error(`\n✖ packages/components/package.json:\n  ${errors.join("\n  ")}\n`);
  process.exit(1);
}
