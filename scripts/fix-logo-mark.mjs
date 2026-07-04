import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(fileURLToPath(import.meta.url), "..", "..");
const logoImg =
  '<img class="logo-mark" src="/assets/logo-mark.svg" width="36" height="36" alt="" aria-hidden="true" />';
const spriteRe =
  /\s*<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg" style="display:none" aria-hidden="true">[\s\S]*?<\/svg>\s*\n/;
const useRe =
  /<svg class="logo-mark" aria-hidden="true"><use href="#logo-mark"\/><\/svg>/g;

function walk(dir) {
  for (const name of readdirSync(dir)) {
    if (name === "docs" || name === "node_modules" || name === "dist") continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) {
      walk(p);
      continue;
    }
    if (!name.endsWith(".html")) continue;

    const orig = readFileSync(p, "utf8");
    const html = orig.replace(spriteRe, "\n").replace(useRe, logoImg);
    if (html !== orig) {
      writeFileSync(p, html);
      console.log("updated", relative(root, p));
    }
  }
}

walk(root);
