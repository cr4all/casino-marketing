import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const photoToLocal = {
  "photo-1596838136351-bd778072754e": "/assets/images/games.jpg",
  "photo-1574629810360-7efbbe195018": "/assets/images/sports.jpg",
  "photo-1554224311-bc0332ce7953": "/assets/images/wallet.jpg",
  "photo-1621761190629-c143fb9145bf": "/assets/images/payments.jpg",
  "photo-1607860104238-2582f7fb5472": "/assets/images/bonus.jpg",
  "photo-1460925895917-afdab827c52f": "/assets/images/crm.jpg",
  "photo-1522071820081-009f0129c71c": "/assets/images/affiliate.jpg",
  "photo-1551836022-d5d88eacb8df": "/assets/images/analytics.jpg",
  "photo-1563986768609-322da13575f3": "/assets/images/security.jpg",
  "photo-1450101499163-c8848c66ca85": "/assets/images/compliance.jpg",
  "photo-1551434678-e076c223a692": "/assets/images/backoffice.jpg",
  "photo-1551288049-bebda4e38f71": "/assets/images/dashboard.jpg",
  "photo-1516321318423-f06f85e504b3": "/assets/images/player.jpg",
  "photo-1451187580459-43490279c0fa": "/assets/images/platform.jpg",
  "photo-1511512578047-dfb367046420": "/assets/images/casino-sports.jpg",
  "photo-1557804506-669a67965ba0": "/assets/images/cta.jpg",
  "photo-1454165804606-c3d57bc86b40": "/assets/images/turnkey.jpg",
  "photo-1561070791-2526d30994b5": "/assets/images/white-label.jpg",
};

const unsplashRe = /https:\/\/images\.unsplash\.com\/(photo-\d+-[a-f0-9]+)\?[^"')\s]+/g;

const files = [
  "index.html",
  "contact.html",
  "integrations.html",
  "css/site.css",
  "js/features-data.mjs",
  "js/features-data.js",
  "docs/design-prototype/js/features-data.js",
  "docs/design-prototype/index.html",
  "docs/design-prototype/contact.html",
  "docs/design-prototype/integrations.html",
  "docs/design-prototype/css/site.css",
].map((f) => resolve(root, f));

let total = 0;
for (const file of files) {
  let src = readFileSync(file, "utf8");
  const before = src;
  src = src.replace(unsplashRe, (full, id) => {
    const local = photoToLocal[id];
    if (!local) {
      console.warn(`unknown photo id ${id} in ${file}`);
      return full;
    }
    return local;
  });
  if (src !== before) {
    writeFileSync(file, src);
    const n = (before.match(unsplashRe) || []).length;
    console.log(`updated ${file.replace(root + "\\", "")} (${n} urls)`);
    total += n;
  }
}
console.log(`Done. Replaced ${total} URLs.`);
