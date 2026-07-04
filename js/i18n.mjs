import en from "./locales/en.json";

const LOCALES = {
  en,
  de: () => import("./locales/de.json"),
  fr: () => import("./locales/fr.json"),
  pt: () => import("./locales/pt.json"),
  it: () => import("./locales/it.json"),
  sq: () => import("./locales/sq.json"),
  hr: () => import("./locales/hr.json"),
  es: () => import("./locales/es.json"),
  ar: () => import("./locales/ar.json"),
  tr: () => import("./locales/tr.json"),
};

export const SUPPORTED_LOCALES = [
  { code: "en", label: "English", flagCode: "gb", dir: "ltr" },
  { code: "de", label: "Deutsch", flagCode: "de", dir: "ltr" },
  { code: "fr", label: "Français", flagCode: "fr", dir: "ltr" },
  { code: "pt", label: "Português", flagCode: "pt", dir: "ltr" },
  { code: "it", label: "Italiano", flagCode: "it", dir: "ltr" },
  { code: "sq", label: "Shqip", flagCode: "al", dir: "ltr" },
  { code: "hr", label: "Hrvatski", flagCode: "hr", dir: "ltr" },
  { code: "es", label: "Español", flagCode: "es", dir: "ltr" },
  { code: "ar", label: "العربية", flagCode: "sa", dir: "rtl" },
  { code: "tr", label: "Türkçe", flagCode: "tr", dir: "ltr" },
];

export function flagUrl(flagCode) {
  return `/assets/flags/${flagCode}.png`;
}

const STORAGE_KEY = "ascendra-locale";
let currentLocale = "en";
let messages = en;
const cache = { en };

function getNested(obj, path) {
  return path.split(".").reduce((o, k) => (o == null ? undefined : o[k]), obj);
}

export function t(key, vars) {
  let value = getNested(messages, key) ?? getNested(en, key) ?? key;
  if (vars && typeof value === "string") {
    Object.entries(vars).forEach(([k, v]) => {
      value = value.replace(new RegExp(`\\{\\{${k}\\}\\}`, "g"), v);
    });
  }
  return value;
}

export function getLocale() {
  return currentLocale;
}

export function getDir() {
  const meta = SUPPORTED_LOCALES.find((l) => l.code === currentLocale);
  return meta?.dir || "ltr";
}

export function getFeatures() {
  return messages.features || en.features;
}

export async function setLocale(code) {
  const supported = SUPPORTED_LOCALES.some((l) => l.code === code);
  if (!supported) code = "en";

  if (!cache[code]) {
    const loader = LOCALES[code];
    if (typeof loader === "function") {
      const mod = await loader();
      cache[code] = mod.default || mod;
    } else {
      cache[code] = loader;
    }
  }

  currentLocale = code;
  messages = cache[code];
  localStorage.setItem(STORAGE_KEY, code);

  document.documentElement.lang = code;
  document.documentElement.dir = getDir();
  document.body?.classList.toggle("rtl", getDir() === "rtl");

  window.dispatchEvent(new CustomEvent("localechange", { detail: { locale: code } }));
  return messages;
}

export function detectLocale() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && SUPPORTED_LOCALES.some((l) => l.code === stored)) return stored;

  const browser = (navigator.language || "en").slice(0, 2).toLowerCase();
  const match = SUPPORTED_LOCALES.find((l) => l.code === browser);
  return match ? match.code : "en";
}

export async function initI18n() {
  const locale = detectLocale();
  await setLocale(locale);
  return messages;
}

export function setText(el, key, vars) {
  if (!el) return;
  el.textContent = t(key, vars);
}

export function setHtml(el, key, vars) {
  if (!el) return;
  el.innerHTML = t(key, vars);
}
