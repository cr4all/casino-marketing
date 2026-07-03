import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const file = resolve(dirname(fileURLToPath(import.meta.url)), "../index.html");
let html = readFileSync(file, "utf8");

const replacements = [
  ["\u00c2\u00b7", "\u00b7"],
  ["\u00e2\u20ac\u201d", "\u2014"],
  ["\u00e2\u20ac\u201c", "\u2014"],
  ["\u00e2\u2020\u2019", "\u2192"],
  ["\u00e2\u0153\u201c", "\u2713"],
  ["4\u00e2\u20ac\u201c8", "4\u20138"],
  ["4\u00e2\u20ac\u201d8", "4\u20138"],
];

for (const [from, to] of replacements) {
  html = html.split(from).join(to);
}

writeFileSync(file, html, "utf8");
console.log("Fixed index.html encoding");
