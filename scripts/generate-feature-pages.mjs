import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const { FEATURES } = await import(pathToFileURL(resolve(root, "js/features-data.mjs")).href);

const siteUrl = process.env.VITE_SITE_URL || "https://ascendraplatforms.com";
const template = readFileSync(resolve(root, "feature.html"), "utf8");
const featuresDir = resolve(root, "features");

mkdirSync(featuresDir, { recursive: true });

for (const slug of Object.keys(FEATURES)) {
  const f = FEATURES[slug];
  let html = template
    .replace(/href="css\//g, 'href="../css/')
    .replace(/href="index\.html/g, 'href="../index.html')
    .replace(/href="contact\.html/g, 'href="../contact.html')
    .replace(/href="integrations\.html/g, 'href="../integrations.html')
    .replace(/href="feature\.html\?slug=operator-backoffice"/g, 'href="operator-backoffice.html"')
    .replace(/href="pricing\.html/g, 'href="../prices.html')
    .replace(/href="privacy\.html/g, 'href="../privacy.html')
    .replace(/href="terms\.html/g, 'href="../terms.html')
    .replace(/href="aml-policy\.html/g, 'href="../aml-policy.html')
    .replace(/href="responsible-gaming\.html/g, 'href="../responsible-gaming.html')
    .replace(/href="prices\.html/g, 'href="../prices.html')
    .replace(/src="js\//g, 'src="../js/')
    .replace(
      "<body data-page=\"feature\" data-ambient=\"true\">",
      `<body data-page="feature" data-feature-slug="${slug}" data-ambient="true">`
    )
    .replace(
      "<title>Feature — Ascendra Platforms</title>",
      `<title>${f.title} — Ascendra Platforms</title>\n  <meta name="description" content="${f.heroSub.replace(/"/g, "&quot;")}" />`
    )
    .replace(
      '<script src="../js/site.js"></script>\n  <script src="../js/features-data.js"></script>\n  <script src="../js/feature-page.js"></script>',
      '<script type="module" src="../js/feature-page.mjs"></script>\n  <script src="../js/home-ambient.js"></script>\n  <script src="../js/site.js"></script>'
    )
    .replace(
      '<script src="js/site.js"></script>\n  <script src="js/features-data.js"></script>\n  <script src="js/feature-page.js"></script>',
      '<script type="module" src="../js/feature-page.mjs"></script>\n  <script src="../js/home-ambient.js"></script>\n  <script src="../js/site.js"></script>'
    );

  writeFileSync(resolve(featuresDir, `${slug}.html`), html);
}

const staticPages = [
  "",
  "contact.html",
  "integrations.html",
  "prices.html",
  "privacy.html",
  "terms.html",
  "aml-policy.html",
  "responsible-gaming.html",
  ...Object.keys(FEATURES).map((s) => `features/${s}.html`),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages
  .map(
    (p) => `  <url>
    <loc>${siteUrl}/${p}</loc>
    <changefreq>weekly</changefreq>
  </url>`
  )
  .join("\n")}
</urlset>
`;

writeFileSync(resolve(root, "public/sitemap.xml"), sitemap);

const featureInputs = existsSync(featuresDir)
  ? Object.fromEntries(
      readdirSync(featuresDir)
        .filter((f) => f.endsWith(".html"))
        .map((f) => [
          `feature-${f.replace(".html", "")}`,
          resolve(featuresDir, f),
        ])
    )
  : {};

writeFileSync(
  resolve(root, "vite.features.json"),
  JSON.stringify(featureInputs, null, 2)
);

console.log(`Generated ${Object.keys(FEATURES).length} feature pages + sitemap.xml`);
