/**
 * Auto-translates en locale JSON to target languages via MyMemory API.
 * Caches results in scripts/.translation-cache.json
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const cachePath = resolve(root, "scripts/.translation-cache.json");

const LANG_MAP = {
  de: "de",
  fr: "fr",
  pt: "pt",
  it: "it",
  sq: "sq",
  hr: "hr",
  es: "es",
  ar: "ar",
  tr: "tr",
};

const SKIP_KEYS = new Set(["slug", "heroImage", "screenshotPlayer", "screenshotAdmin", "related", "lang", "dir", "flagCode"]);
const KEEP_AS_IS = [
  /^\/assets\//,
  /^https?:\/\//,
  /^[\d+]+$/,
  /^GGR\b/,
  /^NGR\b/,
  /^IBETS24$/,
  /ascendraplatforms\.com/i,
  /@[\w.-]+\.\w+/,
];

let cache = {};
if (existsSync(cachePath)) {
  try {
    cache = JSON.parse(readFileSync(cachePath, "utf8"));
  } catch {
    cache = {};
  }
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function shouldSkipValue(text) {
  if (!text || typeof text !== "string") return true;
  if (text.length < 2) return true;
  return KEEP_AS_IS.some((re) => re.test(text.trim()));
}

async function fetchTranslation(text, targetLang) {
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  if (data.responseStatus !== 200 && !data.responseData?.translatedText) {
    throw new Error(data.responseDetails || "Translation failed");
  }
  return data.responseData.translatedText;
}

async function translateText(text, targetLang) {
  if (shouldSkipValue(text)) return text;

  const cacheKey = `${targetLang}::${text}`;
  if (cache[cacheKey]) return cache[cacheKey];

  const MAX = 450;
  if (text.length <= MAX) {
    for (let attempt = 0; attempt < 4; attempt++) {
      try {
        const translated = await fetchTranslation(text, targetLang);
        cache[cacheKey] = translated;
        await sleep(400);
        return translated;
      } catch {
        await sleep(1500 * (attempt + 1));
      }
    }
    console.warn(`  [warn] translate failed (${targetLang}): ${text.slice(0, 60)}…`);
    return text;
  }

  const parts = [];
  let rest = text;
  while (rest.length > MAX) {
    let cut = rest.lastIndexOf(" ", MAX);
    if (cut < MAX * 0.4) cut = MAX;
    parts.push(rest.slice(0, cut));
    rest = rest.slice(cut);
  }
  if (rest) parts.push(rest);

  let out = "";
  for (const part of parts) {
    out += await translateText(part, targetLang);
  }
  cache[cacheKey] = out;
  return out;
}

async function translateValue(value, targetLang, key) {
  if (SKIP_KEYS.has(key)) return value;
  if (typeof value === "string") return translateText(value, targetLang);
  if (Array.isArray(value)) {
    const out = [];
    for (const item of value) {
      out.push(typeof item === "object" && item !== null
        ? await translateObject(item, targetLang)
        : await translateText(String(item), targetLang));
    }
    return out;
  }
  if (value && typeof value === "object") return translateObject(value, targetLang);
  return value;
}

async function translateObject(obj, targetLang) {
  const out = {};
  for (const [key, value] of Object.entries(obj)) {
    out[key] = await translateValue(value, targetLang, key);
  }
  return out;
}

export async function fillMissingTranslations(enTree, localeTree, targetLang, key = "") {
  if (typeof enTree === "string" && typeof localeTree === "string") {
    if (localeTree === enTree && !shouldSkipValue(enTree)) {
      return translateText(enTree, targetLang);
    }
    return localeTree;
  }
  if (Array.isArray(enTree) && Array.isArray(localeTree)) {
    const out = [];
    for (let i = 0; i < enTree.length; i++) {
      out.push(await fillMissingTranslations(enTree[i], localeTree[i], targetLang, key));
    }
    return out;
  }
  if (enTree && typeof enTree === "object" && localeTree && typeof localeTree === "object") {
    const out = {};
    for (const k of Object.keys(enTree)) {
      if (SKIP_KEYS.has(k)) {
        out[k] = localeTree[k];
      } else {
        out[k] = await fillMissingTranslations(enTree[k], localeTree[k], targetLang, k);
      }
    }
    return out;
  }
  return localeTree;
}

export async function buildLocale(en, code, manualMap = {}) {
  const { lang, dir, ...rest } = en;
  let base = applyManualMap(rest, manualMap);
  base = await fillMissingTranslations(rest, base, LANG_MAP[code]);
  return { lang: code, dir: code === "ar" ? "rtl" : "ltr", ...base };
}

function applyManualMap(obj, map) {
  if (typeof obj === "string") return map[obj] ?? obj;
  if (Array.isArray(obj)) return obj.map((item) => applyManualMap(item, map));
  if (obj && typeof obj === "object") {
    const out = {};
    for (const [k, v] of Object.entries(obj)) {
      if (SKIP_KEYS.has(k)) out[k] = v;
      else out[k] = applyManualMap(v, map);
    }
    return out;
  }
  return obj;
}

export async function translateLocale(en, code) {
  console.log(`Translating to ${code} (${LANG_MAP[code]})…`);
  return buildLocale(en, code, {});
}

export function saveCache() {
  writeFileSync(cachePath, JSON.stringify(cache, null, 2), "utf8");
}
