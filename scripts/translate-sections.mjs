/**
 * Translates only features + legal sections (the remaining body content).
 * Run: node scripts/translate-sections.mjs [--lang de]
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { fillMissingTranslations, saveCache } from "./auto-translate-locales.mjs";
import { applyManualMap, MANUAL } from "./manual-translations.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const localesDir = resolve(root, "js/locales");
const langs = process.argv.includes("--lang")
  ? [process.argv[process.argv.indexOf("--lang") + 1]]
  : ["de", "fr", "pt", "it", "sq", "hr", "es", "ar", "tr"];

const en = JSON.parse(readFileSync(resolve(localesDir, "en.json"), "utf8"));

for (const code of langs) {
  console.log(`\n=== ${code} ===`);
  const path = resolve(localesDir, `${code}.json`);
  let current = JSON.parse(readFileSync(path, "utf8"));

  const sections = {
    features: en.features,
    legal: en.legal,
    home: en.home,
    contact: en.contact,
    pricing: en.pricing,
    integrations: en.integrations,
  };

  let translated = applyManualMap(sections, MANUAL[code] || {});
  translated = await fillMissingTranslations(sections, translated, code);

  current.features = translated.features;
  current.legal = translated.legal;
  current.home = translated.home;
  current.contact = translated.contact;
  current.pricing = translated.pricing;
  current.integrations = translated.integrations;

  writeFileSync(path, JSON.stringify(current, null, 2), "utf8");
  saveCache();
  console.log(`✓ Updated ${code}.json`);
}

console.log("\nDone.");
