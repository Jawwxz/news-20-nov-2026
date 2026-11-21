// News image entry: copies entry.png to the output directory.
// Run with Node 22: node --experimental-strip-types main.ts
// Output goes to $MAKEFUN_OUTPUT_DIR, or /output when unset.
// The size check after the copy guards against a partial or
// truncated write, so a mismatch fails loudly.
import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { join } from "node:path";

const here = import.meta.dirname;
const source = join(here, "entry.png");
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const target = join(outDir, "entry.png");

if (!existsSync(source)) {
  console.error(`entry.png not found next to main.ts: ${source}`);
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);

const sourceSize = statSync(source).size;
const targetSize = statSync(target).size;
if (sourceSize !== targetSize) {
  console.error(`size mismatch: expected ${sourceSize} bytes, wrote ${targetSize} bytes`);
  process.exit(1);
}

console.log(`wrote ${target} (${targetSize} bytes)`);
