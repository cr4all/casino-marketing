import { mkdirSync, writeFileSync, createWriteStream } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { pipeline } from "node:stream/promises";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = resolve(root, "public/assets/images");
mkdirSync(outDir, { recursive: true });

/** Working Unsplash photos (verified HTTP 200) */
const remote = {
  sports: "photo-1574629810360-7efbbe195018",
  payments: "photo-1563013544-824ae1b704d3",
  dashboard: "photo-1551288049-bebda4e38f71",
  crm: "photo-1460925895917-afdab827c52f",
  affiliate: "photo-1522071820081-009f0129c71c",
  security: "photo-1563986768609-322da13575f3",
  compliance: "photo-1450101499163-c8848c66ca85",
  backoffice: "photo-1551434678-e076c223a692",
  player: "photo-1516321318423-f06f85e504b3",
  platform: "photo-1451187580459-43490279c0fa",
  cta: "photo-1557804506-669a67965ba0",
  turnkey: "photo-1454165804606-c3d57bc86b40",
  "white-label": "photo-1561070791-2526d30994b5",
};

async function download(name, id) {
  const url = `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=85`;
  const dest = resolve(outDir, `${name}.jpg`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${name}: ${res.status}`);
  await pipeline(res.body, createWriteStream(dest));
  console.log("ok", name);
}

for (const [name, id] of Object.entries(remote)) {
  try {
    await download(name, id);
  } catch (e) {
    console.warn("skip", name, e.message);
  }
}

// wallet/analytics use dashboard copy if dedicated download unavailable
import { copyFileSync, existsSync } from "node:fs";
const dash = resolve(outDir, "dashboard.jpg");
if (existsSync(dash)) {
  for (const alias of ["wallet", "analytics", "integrations"]) {
    copyFileSync(dash, resolve(outDir, `${alias}.jpg`));
    console.log("alias", alias, "<- dashboard");
  }
}

console.log("Done.");
