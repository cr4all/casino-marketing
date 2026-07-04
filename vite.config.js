import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const root = dirname(fileURLToPath(import.meta.url));
const featuresJson = resolve(root, "vite.features.json");

const baseInputs = {
  main: resolve(root, "index.html"),
  contact: resolve(root, "contact.html"),
  feature: resolve(root, "feature.html"),
  integrations: resolve(root, "integrations.html"),
  pricing: resolve(root, "pricing.html"),
  prices: resolve(root, "prices.html"),
  privacy: resolve(root, "privacy.html"),
  terms: resolve(root, "terms.html"),
  "aml-policy": resolve(root, "aml-policy.html"),
  "responsible-gaming": resolve(root, "responsible-gaming.html"),
  "admin-login": resolve(root, "admin/login.html"),
  "admin-index": resolve(root, "admin/index.html"),
};

let featureInputs = {};
if (existsSync(featuresJson)) {
  const raw = JSON.parse(readFileSync(featuresJson, "utf8"));
  featureInputs = Object.fromEntries(
    Object.entries(raw).map(([k, v]) => [k, resolve(v)])
  );
}

export default defineConfig({
  root,
  publicDir: "public",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: { ...baseInputs, ...featureInputs },
    },
  },
  server: {
    port: 4321,
    open: "/index.html",
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
});
