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

Opens at http://localhost:4321 (Vite) with the API on http://localhost:3001. Contact form submissions are proxied to `/api/contact`.

## Contact form (email)

Submissions POST to `/api/contact` and are emailed via [Twilio SendGrid](https://sendgrid.com/) — they are **not** stored for the admin inbox.

| Variable | Description |
|----------|-------------|
| `SENDGRID_API_KEY` | SendGrid API key with Mail Send permission (required) |
| `SENDGRID_FROM` | Verified sender address (default: `noreply@ascendraplatforms.com`) |
| `SENDGRID_FROM_NAME` | Display name for outgoing mail (default: `Ascendra Platforms`) |
| `CONTACT_NOTIFY_TO` | Recipient inbox (default: `sales@ascendraplatforms.com`) |

Before going live, complete **Domain Authentication** for `ascendraplatforms.com` in the SendGrid console so `noreply@ascendraplatforms.com` can send.

## Admin platform (legacy)

The admin UI (`/admin/`) remains for viewing older SQLite leads only. New contact submissions go to email.

| URL | Purpose |
|-----|---------|
| `/admin/login.html` | Admin sign-in |
| `/admin/index.html` | Legacy request list |

Configure `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET` in `.env` if you still use the admin area.

## Production (site + API)

```bash
npm run build
set NODE_ENV=production   # PowerShell: $env:NODE_ENV="production"
npm start
```

Serves `dist/` and the API from one Node process (default port `3001`, or set `API_PORT`). Requires **Node.js 18+**.

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
| `VITE_CONTACT_ENDPOINT` | POST URL for contact form (default: `/api/contact`) |
| `VITE_SITE_URL` | Canonical site URL for sitemap (default: `https://ascendraplatforms.com`) |
| `SENDGRID_API_KEY` | SendGrid API key (required for contact email) |
| `SENDGRID_FROM` | Verified sender (default: `noreply@ascendraplatforms.com`) |
| `CONTACT_NOTIFY_TO` | Notification recipient (default: `sales@ascendraplatforms.com`) |
| `ADMIN_PASSWORD` | Password for `/admin/login.html` |
| `ADMIN_SESSION_SECRET` | Secret for signing admin session cookies |
| `API_PORT` | API server port (default: `3001`) |
| `NODE_ENV` | Set to `production` for `npm start` to serve `dist/` |

## Content policy

Public site must **not** expose:

- Internal tech stack names (RabbitMQ, Docker, Laravel, etc.)
- Aggregator brands (GameBoy, GoldenGateX)
- Internal repo names or URL/IA maps

See [docs/14-white-label-marketing-site-plan.md](./docs/14-white-label-marketing-site-plan.md).

## Structure

```
casino-marketing/
├── admin/             # Admin login + demo request dashboard
├── server/            # Express API + email
├── data/              # SQLite DB (gitignored)
├── docs/                  # planning docs, Figma specs, HTML design prototype
├── index.html
├── contact.html
├── integrations.html
├── pricing.html
├── features/          # generated at build
├── css/site.css
├── js/                # Vite modules (feature-page.mjs, contact-form.mjs, …)
├── public/js/         # Static client scripts copied to dist (site, ambient bg)
├── public/
│   ├── robots.txt
│   └── sitemap.xml    # generated at build
└── scripts/
    └── generate-feature-pages.mjs
```
