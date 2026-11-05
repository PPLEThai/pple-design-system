// Root `preinstall` hook. Blocks installs from any package manager other than the
// Bun version pinned in package.json#packageManager. Runs on Node type stripping.
import { readFileSync } from "node:fs";

function readPinnedBunVersion(): string {
  const raw: unknown = JSON.parse(
    readFileSync(new URL("../package.json", import.meta.url), "utf8"),
  );
  if (typeof raw === "object" && raw !== null && "packageManager" in raw) {
    const { packageManager } = raw;
    if (typeof packageManager === "string" && packageManager.startsWith("bun@")) {
      return packageManager.slice("bun@".length);
    }
  }
  throw new Error("package.json#packageManager must be `bun@<version>`");
}

const required = readPinnedBunVersion();
const agent = process.env["npm_config_user_agent"] ?? "";
const found = /^bun\/(\S+)/.exec(agent)?.[1];

if (found === undefined) {
  console.error(
    `\n✖ This repo uses Bun ${required}. Run \`bun install\` (got: ${agent === "" ? "unknown" : agent}).\n`,
  );
  process.exit(1);
}
if (found !== required) {
  console.error(
    `\n✖ Bun ${required} required, found ${found}. Install it: \`curl -fsSL https://bun.sh/install | bash -s bun-v${required}\`.\n`,
  );
  process.exit(1);
}
