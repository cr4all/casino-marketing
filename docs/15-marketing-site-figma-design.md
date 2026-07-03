# 15. Marketing Site — Figma Design Specification

> **Related document**: [14-white-label-marketing-site-plan.md](./14-white-label-marketing-site-plan.md)  
> **HTML prototype (archive)**: [design-prototype/](./design-prototype/) · **Production site**: [../](../)  
> **Figma file name (recommended)**: `Ascendra Platforms — Marketing Site v1`  
> **Platform brand**: **Ascendra Platforms** (`ascendraplatforms`)  
> **Default locale**: en · **Phase**: MVP (Home, Feature Template, Contact)

---

## 15.1 Figma File Structure

```text
📁 Ascendra Platforms — Marketing Site v1
├── 📄 Cover          — project meta, version, disclosure policy links
├── 📄 Design System  — Color, Type, Grid, Effects (Variables)
├── 📄 Components     — Button, Card, Nav, Form, …
├── 📄 Desktop        — 1440px frames
├── 📄 Tablet         — 768px frames
├── 📄 Mobile         — 375px frames
└── 📄 Prototype      — Home → Feature → Contact flow
```

### 15.1.1 MVP Frame List

| Frame | Size | Priority |
|-------|------|----------|
| Home | 1440 / 768 / 375 | P0 |
| Feature — Sportsbook | 1440 | P0 |
| Feature — Marketing CRM | 1440 | P0 |
| Feature — Anti-Fraud System | 1440 | P0 |
| Contact | 1440 / 375 | P0 |
| Integrations | 1440 | P1 |
| Pricing | 1440 | P1 |
| Solutions — Turnkey | 1440 | P1 |

---

## 15.2 Design Tokens (Figma Variables)

### 15.2.1 Color

| Token | Hex | Usage |
|-------|-----|-------|
| `bg/base` | `#0B1120` | Page background (dark theme — primary) |
| `bg/elevated` | `#131B2E` | Cards, header |
| `bg/subtle` | `#1A2438` | Hover, input bg |
| `border/default` | `#2A3548` | Card border |
| `border/focus` | `#6366F1` | Focus ring |
| `text/primary` | `#F8FAFC` | Headings, body |
| `text/secondary` | `#94A3B8` | Subcopy, captions |
| `text/muted` | `#64748B` | Placeholder, footer |
| `brand/primary` | `#6366F1` | Primary CTA, links |
| `brand/primary-hover` | `#4F46E5` | Button hover |
| `brand/secondary` | `#10B981` | Success, stats accent |
| `brand/accent` | `#F59E0B` | Highlight numbers |
| `brand/gradient-start` | `#6366F1` | CTA banner gradient |
| `brand/gradient-end` | `#8B5CF6` | CTA banner gradient |

> Light theme variant (optional Phase 2): `bg/base` `#FFFFFF`, `text/primary` `#1E293B`

### 15.2.2 Typography

**Font family**: Inter (Google Fonts) — Figma: Inter Regular / Medium / SemiBold / Bold

| Token | Size | Weight | Line | Letter | Usage |
|-------|------|--------|------|--------|-------|
| `display/xl` | 56px | 700 | 110% | -0.02em | Hero H1 (desktop) |
| `display/lg` | 48px | 700 | 110% | -0.02em | Hero H1 (tablet) |
| `display/md` | 36px | 700 | 115% | -0.01em | Hero H1 (mobile) |
| `heading/h2` | 36px | 600 | 120% | -0.01em | Section titles |
| `heading/h3` | 24px | 600 | 130% | 0 | Card titles |
| `heading/h4` | 20px | 600 | 130% | 0 | Subsection |
| `body/lg` | 18px | 400 | 160% | 0 | Hero sub, lead |
| `body/md` | 16px | 400 | 160% | 0 | Body |
| `body/sm` | 14px | 400 | 150% | 0 | Captions, footer |
| `label/md` | 14px | 500 | 100% | 0.02em | Buttons, nav |
| `label/sm` | 12px | 500 | 100% | 0.04em | Badges, stats label |
| `stat/number` | 40px | 700 | 100% | -0.02em | Stats bar numbers |

### 15.2.3 Spacing & Layout

| Token | Value |
|-------|-------|
| Grid columns (desktop) | 12 |
| Grid gutter | 24px |
| Page max-width | 1280px (content), 1440px (frame) |
| Section padding Y (desktop) | 96px |
| Section padding Y (mobile) | 64px |
| Card padding | 24px |
| Card radius | 12px |
| Button radius | 8px |
| Input radius | 8px |

### 15.2.4 Effects

| Token | Value |
|-------|-------|
| `shadow/card` | 0 4px 24px rgba(0,0,0,0.25) |
| `shadow/header` | 0 1px 0 `#2A3548` (border-bottom preferred over heavy shadow) |
| `blur/backdrop` | backdrop-blur 12px (mobile nav overlay) |

---

## 15.3 Components (Figma Component Set)

### 15.3.1 Button

| Variant | Height | Padding X | BG | Text |
|---------|--------|-----------|-----|------|
| Primary | 48px | 24px | `brand/primary` | `#FFF` 14px/500 |
| Primary Large | 52px | 32px | same | 16px/500 |
| Secondary | 48px | 24px | transparent | `text/primary`, border 1px `border/default` |
| Ghost | 40px | 16px | transparent | `text/secondary` |
| Link | auto | 0 | — | `brand/primary`, underline on hover |

**States**: Default · Hover · Pressed · Disabled (opacity 50%)

### 15.3.2 Header / Nav

**Desktop** — Frame H 72px, Auto Layout horizontal, padding 0 80px, space-between

| Slot | Spec |
|------|------|
| Logo (left) | **Ascendra Platforms** wordmark — mountain/ascend icon 36×36 + "Ascendra Platforms" (Plus Jakarta Sans 800) + tagline "iGaming Infrastructure" (gold, 10px caps) |
| Nav (center) | 5 items, gap 32px, `body/md` `text/secondary`, hover → `text/primary` |
| Actions (right) | Secondary "Contact" + Primary "Request Demo", gap 12px |

**Mobile** — H 64px, Logo + Hamburger 24×24. Menu: full-screen overlay `bg/elevated`.

> Nav labels refer to the internal IA document. In Figma, use **Platform · Features · Solutions · Integrations · Resources** placeholders.

### 15.3.3 Stat Counter

Auto Layout vertical, align center, gap 8px

- Number: `stat/number`, color `brand/accent` or `text/primary`
- Label: `label/sm`, `text/secondary`, uppercase optional

### 15.3.4 Feature Card (with image — v1.2)

W fill, radius 16px, `bg/elevated`, border 1px `border/default`, overflow hidden

| Element | Spec |
|---------|------|
| **Image header** | H 180px, full-bleed photo, object-fit cover, dark gradient overlay bottom 40% |
| **Category badge** | Bottom-left on image, `label/sm`, bg `brand/primary` 85%, padding 4×10, radius 6px |
| Title | `heading/h3` (18px/700 Plus Jakarta Sans), padding body 22×24 |
| Description | `body/sm` `text/secondary`, max 3 lines |
| Link | "Learn more →" `label/md` `brand/primary` |

**Hover**: translate Y -4px, border `brand/primary` 45%, image scale 106%

#### Feature image guide (Unsplash / custom photography)

| Feature | Image theme | Prototype reference |
|---------|-------------|---------------------|
| Game Integrations | Casino floor, slots, neon gaming | `photo-1596838136351` |
| Sportsbook | Football stadium, live sports | `photo-1574629810360` |
| Wallet | Finance, ledger, accounting | `photo-1554224311` |
| Payments | Crypto, cards, fintech | `photo-1621761190629` |
| Bonus Engine | Rewards, gifts, celebration | `photo-1607860104238` |
| Marketing CRM | Analytics dashboard, laptop | `photo-1460925895917` |
| Affiliate | Team collaboration, partners | `photo-1522071820081` |
| Business Intelligence | Charts, data visualization | `photo-1551836022` |
| Anti-Fraud System | Cybersecurity, lock, shield | `photo-1563986768609` |
| Risk & Compliance | Legal documents, compliance | `photo-1450101499163` |
| Operator Backoffice | Team at monitors, ops center | `photo-1551434678` |

> Figma: Apply **Image Fill** + **Linear gradient overlay** (transparent → `#070B14` 95%) to each Feature Card.

### 15.3.5 Feature Card (text-only — legacy, deprecated)

W fill (grid 1/3 or 1/2), min-H 220px, padding 24px, radius 12px, `bg/elevated`, border 1px `border/default`

| Element | Spec |
|---------|------|
| Icon | 40×40, rounded 8px, bg `brand/primary` 15% opacity, icon 24px stroke |
| Title | `heading/h3` |
| Description | `body/sm` `text/secondary`, max 3 lines |
| Link | "Learn more →" `label/md` `brand/primary` |

**Hover**: border `brand/primary` 50%, translate Y -2px

### 15.3.6 Brand Card (Representative Brands)

W 280px (desktop grid), H 160px, padding 32px, centered logo

- BG: `bg/elevated`, border `border/default`, radius 12px
- Logo max-H 48px (IBETS24: import from `casino-frontend/public/logo.svg`)
- Badge below: "Casino + Sportsbook" pill — `label/sm`, bg `bg/subtle`, radius full

**Hover**: subtle glow `brand/primary` 20% border

### 15.3.7 Vendor Logo Pill

H 48px, padding 16px 24px, radius 8px, bg `bg/subtle`, logo H 24px grayscale 100% → hover color

### 15.3.8 Comparison Column (Turnkey / White Label)

W 50% minus gap, padding 32px, radius 12px

- Header: `heading/h3` + optional "Popular" badge on Turnkey
- Checklist rows: 20px icon check (green) + `body/md`, gap 12px, row gap 16px

### 15.3.9 CTA Banner

Full-width within container, padding 64px, radius 16px, gradient `brand/gradient-start` → `brand/gradient-end`

- H2 white + sub white 80% + Primary button white bg / indigo text

### 15.3.10 Form Field (Contact)

| Part | Spec |
|------|------|
| Label | `label/md`, margin-bottom 8px |
| Input | H 48px, padding 12px 16px, bg `bg/subtle`, border 1px `border/default`, focus border `brand/primary` |
| Textarea | min-H 120px |
| Checkbox | 20×20 + label `body/sm` |
| Error | `body/sm` red `#EF4444` |

### 15.3.11 Footer

BG `bg/elevated`, padding 64px 80px 32px, 4-column link grid + bottom bar copyright

---

## 15.4 Home Page — Desktop (1440px) Section Spec

Vertical Auto Layout, gap 0. Content max-W 1280px centered, horizontal padding 80px.

| # | Section | Height (approx) | Key layout |
|---|---------|-----------------|------------|
| 1 | Header | 72px | Fixed optional |
| 2 | Hero | 680px | Badge + H1 with gradient accent **Ascendra Platforms** + mockup with dashboard photo overlay |
| 3 | Stats Bar | 120px | 5 stats horizontal, gold numbers |
| 4 | Trust Bar | auto | 4 **trust cards** with SVG icons (not emoji) |
| 5 | Features | auto | H2 + sub, **3-col grid**, 11 cards **with 180px image header each** |
| 6 | Platform Flow | 480px | Horizontal step diagram: Player → Platform → Wallet → Casino & Sports |
| 7 | Integrations Strip | 160px | Marquee dual row: vendors + payment types |
| 8 | Representative Brands | 400px | H2 + 4-col brand grid (IBETS24 + 3 placeholders) + CTA |
| 9 | Solutions Compare | 520px | 2 columns Turnkey vs White Label |
| 10 | CTA Banner | 200px | Gradient banner |
| 11 | Footer | 320px | Links + legal |

### 15.4.1 Hero Copy (Figma text layers)

- **H1**: Launch Your iGaming Brand on **Ascendra Platforms**
- **Sub**: Production-ready casino and sportsbook software with 250+ game integrations, 50+ payment gateways, built-in CRM, anti-fraud protection, and a complete bonus engine.
- **CTA Primary**: Request Demo
- **CTA Secondary**: Explore Platform

### 15.4.2 Stats Bar (5 items)

| Number | Label |
|--------|-------|
| 250+ | Game Integrations |
| 50+ | Payment Gateways |
| 10,000+ | Games Available |
| Full | Sportsbook |
| 8+ | Bonus Types |

### 15.4.3 Feature Grid (11 cards — order)

1. 250+ Game Integrations  
2. Complete Sportsbook  
3. Transparent Wallet  
4. 50+ Payment Gateways  
5. Complete Bonus Engine  
6. Marketing CRM  
7. Affiliate System  
8. Business Intelligence  
9. **Anti-Fraud System** — icon: `shield-alert` or `shield-ban`  
10. Risk & Compliance — icon: `scale` or `shield-check`  
11. Operator Backoffice  

*(Copy: [14-white-label-marketing-site-plan.md §14.17](./14-white-label-marketing-site-plan.md))*

#### Anti-Fraud System card (Figma text layers)

- **Title**: Anti-Fraud System  
- **Description**: Real-time protection for signup, login, deposits, and withdrawals — multi-account detection, AML screening, and automated enforcement.  
- **Link**: Learn more → *(prototype to Feature — Anti-Fraud frame)*

#### Anti-Fraud Feature page (§15.5.1)

| Section | Content |
|---------|---------|
| Hero H1 | Stop Fraud Before It Costs You |
| Hero Sub | Built-in anti-fraud and risk scoring for signup, login, payments, and betting — with AML screening and automated enforcement. |
| Problem | Bonus abuse, multi-accounting, and suspicious withdrawals erode operator margins. |
| Solution | Anti-Fraud System evaluates every critical action before it completes — and monitors bets and bonuses continuously. |
| Capabilities (6) | Signup & login protection · Pre-withdrawal gates · Multi-account detection · AML blocklist · Automated hold & MFA · Admin audit trail |
| How it Works | Player Action → Risk evaluation → Allow / Challenge / Block → Audit log |
| Screenshots | Admin AFS audit log + risk settings (staging) |

### 15.4.4 Representative Brands

- **Title**: Brands Powered by Our Platform  
- **Sub**: See how operators launch and scale on our turnkey and white-label solution.  
- **Cards**: IBETS24 (logo asset) + Brand B/C/D placeholder boxes  
- **CTA**: Become Our Next Success Story  

### 15.4.5 Product Mockup (Hero right)

Figma frame **Browser Chrome**:
- Top bar: 44px, traffic dots + URL `admin.ascendraplatforms.com`
- Content: **Full-bleed dashboard photo** (H 280px) + floating KPI overlay card

---

## 15.5 Feature Page Template — Desktop

| Section | Spec |
|---------|------|
| Hero | H 400px, centered or left-aligned H1 + sub + CTA, optional icon 64px |
| Problem / Solution | 2-col 50/50, H3 + body each |
| Capabilities | 3-col grid, 6 items with check icons |
| How it Works | Horizontal 4-step diagram, 800px W |
| Screenshots | 2-col: Player UI + Admin UI, radius 12px, shadow |
| Related Features | 3 small feature cards |
| CTA | Reuse CTA Banner component |

**Sportsbook Hero H1**: Complete Sportsbook, Built In

### 15.5.1 Feature — Anti-Fraud System (Desktop frame)

Refer to §15.4.3 Anti-Fraud Feature page table. Related Features cross-link: Payments, Risk & Compliance, Operator Backoffice.

---

## 15.6 Contact Page — Desktop

| Section | Spec |
|---------|------|
| Hero | H 240px, H1 "Request a Demo", sub |
| Form + Sidebar | 2-col 60/40 |
| Form | 2-col grid for Name fields, full-width email, select, textarea |
| Sidebar | Contact info, response time, trust bullets |
| Footer | Standard |

---

## 15.7 Responsive Breakpoints

| Breakpoint | Frame W | Changes |
|------------|---------|---------|
| Desktop | 1440 | Full nav, 3-col features, side-by-side hero |
| Tablet | 768 | 2-col features, stacked hero, hamburger nav |
| Mobile | 375 | 1-col, stats 2×3 grid, sticky bottom CTA bar H 56px |

### Mobile Sticky CTA Bar

Fixed bottom, H 56px, padding 12px 16px, `bg/elevated` + top border, Primary button full-width "Request Demo"

---

## 15.8 Iconography

- **Library**: Lucide Icons (stroke 1.5px, 24px default)
- **Feature icons**: gamepad-2, trophy, wallet, credit-card, gift, users, handshake, bar-chart-3, **shield-alert**, scale, layout-dashboard
- **Trust icons**: shield-check, trophy, **shield-alert**, megaphone
- Figma: import Lucide plugin or SVG set

---

## 15.9 Asset Import Checklist

| Asset | Source | Figma usage |
|-------|--------|-------------|
| IBETS24 logo | `casino-frontend/public/logo.svg` | Brand card, export @2x PNG/SVG |
| Platform logo | `design-prototype/index.html` `#logo-mark` SVG | Header, Footer — Ascendra gradient mark + wordmark |
| Vendor logos | Official brand kits | Integrations strip, grayscale default |
| Player UI screenshot | Staging | Hero mockup, Feature pages |
| Admin screenshot | Staging | Hero mockup, Feature pages |
| Payment icons | Generic crypto/fiat SVG | Integrations strip |

---

## 15.10 Prototype Connections

```text
Home — Request Demo → Contact
Home — Feature card Learn more → Feature (Sportsbook or **Anti-Fraud** sample)
Home — Become Our Next Success Story → Contact
Header — Request Demo → Contact
Feature — Request Demo → Contact
Contact — Submit → Success toast (design static frame)
```

---

## 15.11 Figma Work Order (Designer Checklist)

- [ ] Register Variables (§15.2)
- [ ] Button, Input, Card components (§15.3)
- [ ] Header + Footer components
- [ ] Home Desktop frame (§15.4)
- [ ] Home Tablet / Mobile responsive variants
- [ ] Feature — Sportsbook frame
- [ ] Feature — **Anti-Fraud System** frame
- [ ] Contact frame
- [ ] IBETS24 logo import → Brand Card
- [ ] Prototype link (§15.10)
- [ ] Visual QA against HTML prototype ([design-prototype/index.html](./design-prototype/index.html))
- [ ] Disclosure policy QA: no technical terms, aggregator names, or URL paths included ([§14.2](./14-white-label-marketing-site-plan.md))

---

## 15.12 Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-07-03 | Initial Figma design spec + HTML prototype |
| 1.1 | 2026-07-03 | Anti-Fraud System card, Feature frame, Trust Bar update (11 features) |
| 1.2 | 2026-07-03 | **Ascendra Platforms** branding, feature card images, premium UI tokens |
| 1.3 | 2026-07-03 | Contact page, Feature detail pages (11 slugs), shared CSS/JS |
| 1.4 | 2026-07-03 | Integrations page (vendor tabs + payment types), Pricing page (3 tiers) |
| 1.5 | 2026-07-03 | Legal pages — Privacy, Terms, AML Policy, Responsible Gaming |
| 1.6 | 2026-07-03 | Moved docs and prototype to `casino-marketing/docs/` |
