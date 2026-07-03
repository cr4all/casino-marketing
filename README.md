# Ascendra Platforms — Marketing Site

B2B marketing website for **Ascendra Platforms** turnkey and white-label iGaming solution.

- **Default locale**: en  
- **Default currency (examples)**: USD  
- **Documentation**: [docs/](./docs/) — planning docs, Figma specs, HTML design prototype

## Pages

| Route | File |
|-------|------|
| Home | `index.html` |
| Contact / Demo | `contact.html` |
| Integrations | `integrations.html` |
| Pricing | `pricing.html` |
| Features (×11) | `features/{slug}.html` (generated) |
| Legal | `privacy.html`, `terms.html`, `aml-policy.html`, `responsible-gaming.html` |

## Setup

```bash
cd casino-marketing
npm install
cp .env.example .env
```

## Development

```bash
npm run dev
```

Opens at http://localhost:4321

## Build

```bash
npm run build
npm run preview
```

Output: `dist/` — deploy to any static host (S3, Cloudflare Pages, Nginx, etc.).

The `prebuild` script generates:

- `features/*.html` — SEO-friendly feature detail pages
- `public/sitemap.xml`
- `vite.features.json` — Vite multi-page inputs

## Environment

| Variable | Description |
|----------|-------------|
| `VITE_CONTACT_ENDPOINT` | POST URL for contact form (Formspree, custom API) |
| `VITE_SITE_URL` | Canonical site URL for sitemap (default: `https://ascendraplatforms.com`) |

Without `VITE_CONTACT_ENDPOINT`, the contact form shows success in demo mode only.

## Content policy

Public site must **not** expose:

- Internal tech stack names (RabbitMQ, Docker, Laravel, etc.)
- Aggregator brands (GameBoy, GoldenGateX)
- Internal repo names or URL/IA maps

See [docs/14-white-label-marketing-site-plan.md](./docs/14-white-label-marketing-site-plan.md).

## Structure

```
casino-marketing/
├── docs/                  # planning docs, Figma specs, HTML design prototype
├── index.html
├── contact.html
├── integrations.html
├── pricing.html
├── features/          # generated at build
├── css/site.css
├── js/
│   ├── features-data.mjs
│   ├── feature-page.mjs
│   └── contact-form.mjs
├── public/
│   ├── robots.txt
│   └── sitemap.xml    # generated at build
└── scripts/
    └── generate-feature-pages.mjs
```
