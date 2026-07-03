# 14. White Label Marketing Site — Development Plan

> **Document Type**: Development Plan (B2B Marketing Website)  
> **Target Platform**: **Ascendra Platforms** (`ascendraplatforms`) — Turnkey / White Label iGaming Solution  
> **Based On**: Actual and planned implementation status of `casino-backend`, `casino-frontend`, `casino-api-contract`  
> **Default Language**: en (marketing site default locale)  
> **Default Currency Display**: USD (for demo and pricing examples)

---

## 14.1 Document Purpose

This document is the development plan for a **B2B marketing website** that presents the Casino Platform as a **Turnkey** and **White Label** solution.

Separate from the player casino lobby (`casino-frontend`), this marketing site aims to explain platform capabilities to prospective operators, partners, and investors, and drive **demo requests and inquiry conversions**.

### 14.1.1 Core Objectives

| Objective | KPI (3 months post-launch) |
|-----------|----------------------------|
| Communicate platform value | Landing page average time on page 90s+ |
| Lead capture | Contact / Demo Request conversion rate 2%+ |
| Build trust | Solutions & compliance section scroll reach rate 40%+ |
| SEO | Top 30 ranking for core keywords such as "white label casino platform" |

### 14.1.2 Non-Goals (Out of Scope)

- Player login and game play (handled by existing `casino-frontend`)
- Admin back-office UI exposure (replaced with screenshots and demo videos)
- Real-time pricing quotes and self-service onboarding (to be reviewed in Phase 2)

---

## 14.2 Marketing Content Exposure Policy

All copy, images, and sections published on the marketing site follow the policy below. Only items marked **「For Site Publication」** in this plan are reflected on actual pages.

### 14.2.1 Do Not Expose (Site)

| Category | Prohibited Examples | Alternative Expression |
|----------|---------------------|------------------------|
| **Infrastructure & middleware technology names** | RabbitMQ, Redis, PostgreSQL, ClickHouse, Docker, Node, Laravel, React, etc. | "Enterprise-grade infrastructure", "Scalable architecture", "Real-time processing" |
| **Development & API terminology** | OpenAPI, AsyncAPI, JWT, WebSocket, REST, Adapter Pattern, Idempotency | "Reliable integration", "Verified settlement", "Seamless game connectivity" |
| **Internal integration & aggregator names** | Provider (aggregator) brands such as GameBoy, GoldenGateX | Do not expose |
| **Site information architecture (IA)** | URL tree, internal menu map, page paths | Managed in separate internal documents only (not in this document or on the public site) |
| **Internal code & repo names** | `casino-backend`, `casino-api-contract`, etc. | "Platform", "Operations system" |

### 14.2.2 Allowed to Expose (Site)

| Category | Allowed Examples |
|----------|------------------|
| **Game vendors (studios)** | Pragmatic Play, Evolution, SA Gaming, PG Soft, Spribe, Hacksaw Gaming, NetEnt, Play'n GO, etc. |
| **Payment types** | Crypto, Fiat, Bank Transfer, E-wallet — display **「50+ payment gateways」** figure |
| **Game integration scale** | Display **「250+ provider integrations」** figure (internal adapter count → converted to marketing message) |
| **Business metrics** | GGR, NGR, CPA, RevShare, KYC, AML, RBAC |
| **Solution types** | Turnkey, White Label, CRM, Bonus Engine, Sportsbook, Anti-Fraud System |
| **Representative brands** | Customer brand names and logos operating on this platform (e.g., IBETS24) |

### 14.2.3 Internal Only (Recorded in This Plan Only)

- Site IA, URL structure, navigation map → **Separate internal document**
- Marketing site framework and hosting choices for build (§14.8)
- Staging screenshot capture and CRM form backend integration details

---

## 14.3 Target Audience

| Persona | Needs | What They Want from the Site |
|---------|-------|------------------------------|
| **Casino Operator** | Fast launch, regulatory compliance, revenue visibility | Feature list, Admin demo, GGR/NGR reports |
| **Affiliate Network** | Commission models, sub-affiliates | Affiliate module, RevShare/CPA explanation |
| **Marketing / CRM Manager** | Player acquisition & retention, campaign operations | CRM features, bonus & promotion tools |
| **Investor / C-Level** | TCO, differentiation, launch speed | Turnkey package, integration scale (250+/50+) |

---

## 14.4 Platform Overview — Core Value Proposition (UVP)

### 14.4.1 One-liner (For Site Publication)

> **All-in-one iGaming platform** — A Turnkey/White Label solution that delivers casino and **full-stack sportsbook**, 250+ game integrations, 50+ payment gateways, CRM, bonuses, **Anti-Fraud System**, affiliate, and risk management in a single operating system.

### 14.4.2 Differentiators (For Site Publication)

| # | Differentiator | Marketing Message |
|---|----------------|-------------------|
| 1 | **Ledger-based wallet** | Every deposit, withdrawal, bet, and win is recorded for audit, settlement, and dispute resolution |
| 2 | **Complete sportsbook** | Pre-match and live betting, multi-sport, unified wallet — one player experience with casino |
| 3 | **250+ game integrations** | Slots, live, table, and other major vendor games on a single platform |
| 4 | **50+ payment gateways** | Broad support for crypto, fiat, and regional payment methods |
| 5 | **Full-stack bonus engine** | Casino and sports promotions — welcome, deposit, cashback, free spins, VIP, and more |
| 6 | **Marketing CRM** | Professional marketing tools for player segmentation, campaigns, and retention |
| 7 | **Operations-complete Admin** | Manage players, finance, games, sports, bonuses, affiliates, and support in one place |
| 8 | **Anti-Fraud System** | Real-time risk assessment for signup, login, deposits/withdrawals, and betting; AML screening; automated block and hold |
| 9 | **Risk & compliance** | Responsible gaming, KYC, and regulatory framework support |
| 10 | **White label extensibility** | Brand, domain, and theme customization; multi-brand operations |
| 11 | **Proven brands** | Portfolio of representative brands operating on this platform, such as IBETS24 |

### 14.4.3 Turnkey vs White Label (For Site Publication)

| Turnkey | White Label |
|---------|-------------|
| Full stack deployment (casino + sportsbook) | Brand, domain, and theme customization |
| Games, sports, payments, and Admin provided as a bundle | Operator-delegated operations |
| Risk & compliance options | Multi-brand expansion |
| 4–8 week launch (negotiable) | Dedicated operator accounts & SLA (negotiable) |

---

## 14.5 Platform Feature Matrix (Source Content for Introduction)

Each section of the marketing site is written based on the features below. **Features planned for future addition and expansion are also pre-reflected on pages.**

### 14.5.1 Core Platform

| Module | Player Features | Operations (Admin) Features | Site Keywords |
|--------|-----------------|-----------------------------|---------------|
| **Auth** | Registration, login, password recovery, email & phone verification | Security audit, session policy | Secure Login, Account Protection |
| **Player** | Profile, KYC, account status | Player lookup & management, manual deposits/withdrawals | Player Management, KYC |
| **Wallet** | Balance, transaction & bet history | Ledger lookup, audit logs | Transparent Wallet, Full Audit Trail |
| **Game Gateway** | Game catalog, launch, vendor & category | Catalog sync, vendor ordering, callback logs | **250+ Integrations**, 10,000+ Games |
| **Sportsbook** | *(See §14.5.2 below)* | Event, market, odds, settlement & limit management | **Full Sportsbook**, Pre-match & Live |

### 14.5.2 Sportsbook (New & Expanded Coverage)

A complete sportsbook connected to the casino via **the same wallet and same account**. Included in the Home Feature grid, dedicated Feature page, and Solutions packages.

| Feature Area | Player | Operations (Admin) | Site Copy Direction |
|--------------|--------|--------------------|---------------------|
| **Pre-match Betting** | Pre-match market selection & betting | Event & market visibility settings | "Bet before kickoff on thousands of events" |
| **Live / In-Play** | Real-time odds & live markets | Live event management & limits | "In-play betting with live odds" |
| **Multi-Sport Coverage** | Football, basketball, tennis, eSports, etc. | Sport & league on/off toggles | "Every major sport, one platform" |
| **Bet Types** | Single, multi (accumulator), system | Market types & odds rules | "Singles, parlays, and system bets" |
| **Bet Slip** | Add selections, enter stake, confirm | — | "Fast, intuitive bet slip" |
| **Cash Out** | Early settlement *(on rollout)* | Cash Out rule configuration | "Take control with cash out" |
| **Unified Wallet** | Shared casino & sports balance | Unified ledger & transaction history | "One wallet for casino and sports" |
| **Sports Bonuses** | Sports-specific promotions & free bets | Bonus policy integration | "Sports promotions that drive action" |
| **Bet History** | Bet & settlement history lookup | Bet monitoring & reports | "Full bet history and settlement" |
| **Responsible Limits** | Betting limits & self-restriction | Player & market limit settings | "Built-in responsible betting tools" |

**Site Headline (en)**: *Complete Sportsbook — Pre-Match, Live, and Unified with Your Casino*

### 14.5.3 Monetization & Growth

| Module | Features | Site Point |
|--------|----------|------------|
| **Payment** | Crypto, fiat, bank, manual deposits/withdrawals, approval workflow | **50+ Payment Gateways**, Global Coverage |
| **Bonus** | *(Full scope in §14.5.5 below)* | Full-featured Bonus Engine |
| **Affiliate** | CPA / RevShare / Hybrid, sub-affiliates, partner portal | Built-in Affiliate Program |
| **CRM** | *(See §14.5.4 below)* | Player Marketing & Retention CRM |
| **Report** | GGR, NGR, daily deposits/withdrawals, affiliate reports | Real-time Business Intelligence |

### 14.5.4 Marketing CRM (New & Expanded Coverage)

A **specialized CRM** module for operator marketers. Exposed as a dedicated section on the site Feature page and Home grid.

| Feature Area | Description | Site Copy Direction |
|--------------|-------------|----------------------|
| **Player Segmentation** | Segment classification such as VIP, new, dormant, high-value | "Target the right players at the right time" |
| **Campaign Management** | Create and schedule promotion & message campaigns | "Launch campaigns without external tools" |
| **Lifecycle Messaging** | Automated messages by journey stage — signup, first deposit, return, etc. | "Automated player journeys" |
| **Retention Tools** | Churn prevention, reactivation, loyalty integration | "Keep players engaged and returning" |
| **Promotion Targeting** | Target bonuses & offers by segment | "Personalized offers that convert" |
| **Campaign Analytics** | Track conversion & ROI per campaign | "Measure what works" |

### 14.5.5 Bonus Engine (Fully Implemented & Expanded Coverage)

Bonuses are presented not as a single feature but as a **full-stack promotion engine**. All types are exposed on the Feature page via type-specific cards and checklists.

| Bonus Type | Description | Site Exposure |
|------------|-------------|---------------|
| Welcome Bonus | New player welcome | ✓ |
| First Deposit Bonus | First deposit match (%) | ✓ |
| Reload Bonus | Re-deposit promotion | ✓ |
| Cashback | Loss-based refund | ✓ |
| Free Spins | Free spins on specific slots | ✓ |
| Daily / Weekly Bonus | Regular login & mission rewards | ✓ |
| VIP Bonus | Tier-specific exclusive benefits | ✓ |
| Wagering Tracking | Real-time rollover progress tracking | ✓ |
| Policy Management | Configure conditions, amounts, and periods in Admin | ✓ |
| Player Claim Flow | Player self-claim UI | ✓ |
| Sports Free Bet | Sports free bets & offers | ✓ |
| Odds Boost / Acca Bonus | Multi & accumulator bet boosts | ✓ |

**Site Headline (en)**: *Every Promotion Type Your Casino Needs — Out of the Box*

### 14.5.6 Anti-Fraud System (New & Expanded Coverage)

A **built-in fraud and risk defense engine** on the platform. Evaluates major events in real time from signup through deposits/withdrawals, betting, and bonus payouts; auditable and configurable by operators in Admin. Included in the Home Feature grid, dedicated Feature page, and Turnkey package.

> **Site display name**: *Anti-Fraud System* (Do not expose internal abbreviations such as AFS or middleware names — §14.2.1)

#### Overview (For Site Publication)

| Item | Description |
|------|-------------|
| **What** | iGaming-specific risk scoring, fraud detection, and automated response system |
| **When** | Instant decisions before signup, login, deposit, and withdrawal + ongoing monitoring after betting and bonuses |
| **Outcome** | Allow · Challenge (additional verification) · Block — automated or manual enforcement per operator policy |
| **For Operators** | Admin audit logs, risk settings, per-player history lookup |

#### Core Features

| Feature Area | Description | Site Copy Direction |
|--------------|-------------|---------------------|
| **Signup & Login Protection** | Risk assessment for signup and login attempts (success & failure) | "Stop bad actors before they enter" |
| **Deposit & Withdrawal Gates** | Risk gates **before** deposit and withdrawal processing — auto-hold high-risk withdrawals | "Protect payouts before they leave" |
| **Transaction Monitoring** | Ongoing scoring of monetary events such as bets, deposits, and bonus payouts | "Monitor every money movement" |
| **Device & Identity Signals** | Collect IP, country, device fingerprint, browser & app context | "Know who is really behind every account" |
| **Multi-Account Detection** | Detect patterns where multiple accounts share the same payout method, wallet, or bank account | "Catch linked accounts and bonus abuse" |
| **AML Blocklist Screening** | Screen sanctioned countries, OFAC, blocklisted wallets, and regions | "Built-in AML screening for crypto and fiat" |
| **Automated Enforcement** | Automated actions such as withdrawal holds, MFA requirements, account restrictions | "Act instantly — not after the damage" |
| **Step-Up Verification** | Prompt additional verification (captcha, OTP, KYC) for high-risk cases | "Challenge suspicious activity in real time" |
| **Risk Scoring & Levels** | 0–100 score, Low / Medium / High / Critical tiers | "Clear risk bands your team understands" |
| **Admin Audit Trail** | View all evaluation, decision, and enforcement history in Admin | "Full audit trail for compliance teams" |

#### Protected Events (For Site — Without Technical Names)

| Player & Operations Events | Protection Method |
|----------------------------|-------------------|
| Registration | Instant risk assessment → allow / additional verification / block |
| Login (success & failure) | Detect account takeover & brute-force patterns |
| Deposit | Score unusual deposits & money laundering indicators |
| Withdrawal | **Mandatory gate before withdrawal execution** — hold & additional verification for high risk |
| Casino & sports betting | Monitor abnormal betting & abuse patterns |
| Bonus payout | Detect bonus abuse & linked accounts |

#### Business Flow (For Feature Page Diagram)

```text
Player Action (signup / login / deposit / withdraw / bet)
        │
        ▼
  Anti-Fraud System evaluates risk
        │
   ┌────┼────┐
   ▼    ▼    ▼
Allow Challenge Block
   │    │      │
   ▼    ▼      └── Account restricted / payout denied
Proceed  MFA / Captcha / KYC step-up
        │
        ▼
  Ongoing monitoring → Admin audit log
```

#### Admin (Operator) Features

| Feature | Description |
|---------|-------------|
| Risk Settings | Risk engine integration settings (Admin-only screen) |
| Audit Logs | Audit history by event type, decision, and player |
| Player Context | IP, country, and device context at time of risk decision |
| Enforcement Review | Operator review of auto-held withdrawals and restricted accounts |

#### Feature Page Copy (en)

- **Headline**: *Stop Fraud Before It Costs You*
- **Sub**: Built-in anti-fraud and risk scoring for signup, login, payments, and betting — with AML screening and automated enforcement.
- **Key bullets**: Real-time signup & login protection · Pre-withdrawal risk gates · Multi-account & shared payout detection · AML blocklist screening · Automated hold & MFA · Full admin audit trail

#### Included in Turnkey / Professional Package

- Anti-Fraud System default integration
- Signup, login, and withdrawal sync gates
- Ongoing monitoring of betting, deposits, and bonuses
- Admin audit logs
- *(Enterprise)* Custom risk policies & SLA (negotiable)

### 14.5.7 Operations & Trust

| Module | Features | Site Point |
|--------|----------|------------|
| **Admin RBAC** | Role-based access control (dashboard, finance, games, bonuses, affiliates, support) | Enterprise-grade Access Control |
| **Live Chat** | Real-time chat between players and operators | Instant In-platform Support |
| **Support Ticket** | Ticket creation, response, and status management | Structured Customer Support |
| **Notification** | Email, SMS, in-app messages | Multi-channel Player Engagement |
| **Risk & Compliance** | Responsible gaming, KYC, AML policy pages | Regulatory Framework Support |
| **Anti-Fraud System** | *(See §14.5.6 below)* | Built-in Fraud Prevention |
| **Legal Pages** | Terms of service, privacy, AML, responsible gaming | Regulatory Framework Support |

### 14.5.8 Representative Brands (For Site Publication)

**White label and Turnkey brands actually operating** on this marketing site are exposed as a social proof section. Placed on Home, About, and Solutions pages.

**Section Structure**

| Element | Description |
|---------|-------------|
| **Section Title (en)** | *Brands Powered by Ascendra Platforms* |
| **Subcopy (en)** | *See how operators launch and scale on our turnkey and white-label solution.* |
| **Layout** | Brand logo grid (3–6 columns on desktop) + brand name & category (Casino / Sports / Both) on hover |
| **CTA** | "Become our next success story" → Contact |

**Registered Brands (Initial)**

| Brand | Type | Logo Asset | Notes |
|-------|------|------------|-------|
| **IBETS24** | Casino + Sportsbook | `casino-frontend/public/logo.svg` | Flagship representative brand; linked to Player UI screenshots |
| *(Additional)* | — | Provided by operations team | Grid expands as launch brands are added |

**IBETS24 Logo (casino-frontend)**

![IBETS24](../../casino-frontend/public/logo.svg)

| Item | Value |
|------|-------|
| File path | `casino-frontend/public/logo.svg` |
| Favicon | `casino-frontend/public/favicon.svg` |
| Wordmark | IBETS (white) + 24 (gold gradient) |
| Font | Montserrat 800 Italic |
| Marketing site usage | ① Representative brand grid ② *(Optional)* About/Case study thumbnail |
| License | IBETS24 brand assets — confirm with brand team before external marketing use |

> **Note**: The B2B marketing site **header platform logo** uses the **Ascendra Platforms** wordmark (separate from IBETS24). The IBETS24 logo appears **only in the representative operating brands section**.  
> **Production site**: [../index.html](../index.html) · **Design prototype (archive)**: [design-prototype/index.html](./design-prototype/index.html)

**Wireframe (ASCII)**

```text
┌────────────────────────────────────────────────────────────┐
│           Brands Powered by Our Platform                   │
│   Operators worldwide launch on our turnkey solution       │
├────────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │ IBETS24  │  │ Brand B  │  │ Brand C  │  │ Brand D  │  │
│  │  [logo]  │  │  [logo]  │  │  [logo]  │  │  [logo]  │  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │
├────────────────────────────────────────────────────────────┤
│         [ Become Our Next Success Story → ]                │
└────────────────────────────────────────────────────────────┘
```

### 14.5.9 Integrations — Logos & Figures (For Site Publication)

**Game Vendors (Studios) — Allowed to Expose**

Pragmatic Play · Evolution · SA Gaming · PG Soft · Spribe · Hacksaw Gaming · NetEnt · Play'n GO · Red Tiger · Microgaming · Ezugi · *(Extend vendor logo strip as needed)*

> Aggregator and internal provider brands (GameBoy, GoldenGateX, etc.) are **not exposed on the site**. Use vendor (game studio) logos only.

**Payments — Types + Figures**

| Display | Site Copy |
|---------|-----------|
| **50+ Payment Gateways** | Hero Stats, top of Integrations page |
| Crypto | Bitcoin, Ethereum, USDT, etc. *(icons)* |
| Fiat & Regional | Cards, bank, regional e-wallet *(icons)* |
| Manual / Bank | Operator-approved deposits and withdrawals |

> Individual PG provider trademarks (NowPayments, Passimpay, etc.) may be exposed selectively after license confirmation. Default focus is **types + 「50+」** figure.

**Hero Stats Bar (For Site Publication, en)**

- **250+** Game Integrations  
- **50+** Payment Gateways  
- **10,000+** Games Available  
- **Full** Sportsbook (Pre-match & Live)  
- **8+** Bonus Types Built In  

---

## 14.6 Page-by-Page Detailed Plan

> **Note**: URL and menu IA are separated into internal documents. Below covers **page-level content planning only**.

### 14.6.1 Home

**Purpose**: Communicate platform value within 5 seconds; drive Demo CTA.

| Section | Content (For Site Publication) | Visual |
|---------|-------------------------------|--------|
| Hero | Headline + Sub + 2 CTA | Admin + Player UI mockup |
| Stats Bar | 250+ integrations · 50+ gateways · 10,000+ games · Full sportsbook | Number counter |
| Trust Bar | Audit-ready Wallet · Sportsbook · **Anti-Fraud** · Marketing CRM | 4–6 icons |
| Feature Grid | 11 cards (Game, Sportsbook, Wallet, Payment, Bonus, CRM, Affiliate, Analytics, **Anti-Fraud**, Risk, Admin) | Icon + Learn more |
| Platform Flow | Player → Platform → Wallet → Casino & Sports *(without technical names)* | Illustration/SVG |
| Vendor & Payment Strip | Vendor logos + payment type icons | Horizontal scroll |
| **Representative Brands** | IBETS24 + operating brand logo grid (§14.5.7) | Includes `logo.svg` |
| Solutions Compare | Turnkey vs White Label | 2-column checklist |
| Social Proof | Testimonial *(Phase 2)* | — |
| CTA Banner | "Launch your casino in weeks" | — |
| Footer | Legal, Contact | — |

**Hero Copy (en, draft)**

- Headline: *Launch Your iGaming Brand on a Production-Ready Platform*
- Sub: *Turnkey and white-label casino and sportsbook software with 250+ game integrations, 50+ payment gateways, built-in CRM, anti-fraud protection, and a complete bonus engine.*

### 14.6.2 Platform Overview

| Page | Core Message | Included Assets |
|------|--------------|-----------------|
| Player Experience | Modern, responsive player site (casino + sports) | Player UI screenshots |
| Operator Backoffice | Full control for your team | Admin Dashboard, Finance screens |
| How It Works | End-to-end flow without tech jargon | Player → Platform → Casino & Sports |
| **Our Brands** | Live representative brand portfolio | IBETS24 logo + brand grid (§14.5.7) |

### 14.6.3 Features Hub

Common template for each Feature page:

```text
1. Hero (module name + 1-line benefit)
2. Problem → Solution
3. Key Capabilities (bullet 5~7)
4. How it Works (business flow diagram)
5. Admin + Player UI screenshots
6. Related Features (cross-link)
7. CTA: Request Demo
```

> **Do not include a collapsible 「Technical Highlights」 section on the site** (do not direct visitors to developer API documentation).

#### Feature Page List (11 pages)

| Feature | Headline (en) | Key bullets (For Site) |
|---------|---------------|------------------------|
| Game Gateway | *One Platform, 250+ Integrations* | Major vendor titles, Catalog management, Seamless play, Live & slots & table |
| **Sportsbook** | *Complete Sportsbook, Built In* | Pre-match & live, Multi-sport, Singles & parlays, Unified wallet, Sports bonuses |
| Wallet | *Every Transaction Accounted For* | Full transaction history, Audit-ready records, Instant balance updates |
| Payments | *50+ Gateways, Global Reach* | Crypto & fiat, Automated deposits, Withdrawal approval workflow |
| Bonus Engine | *Every Promotion Type You Need* | Welcome, deposit match, cashback, free spins, VIP — wagering tracked |
| **Marketing CRM** | *Grow and Retain Your Players* | Segmentation, campaigns, lifecycle messaging, retention, targeting |
| Affiliate | *Grow Through Partners* | CPA, RevShare, Hybrid, Sub-affiliate portal |
| Analytics | *Know Your Numbers* | GGR, NGR, daily KPIs, affiliate reports |
| **Anti-Fraud System** | *Stop Fraud Before It Costs You* | Signup & login protection, Pre-withdrawal gates, Multi-account detection, AML screening, Audit trail |
| Risk & Compliance | *Operate with Confidence* | Responsible gaming, KYC workflow, regulatory pages |
| Support | *Support Players In-Platform* | Live chat, ticket system, multi-channel notifications |

### 14.6.4 Solutions (Turnkey / White Label)

**Turnkey Package (For Site Publication)**

- Complete player website (customizable)
- **Full sportsbook** (pre-match & live)
- Operator backoffice
- Game catalog with 250+ integrations
- 50+ payment gateway connections
- Bonus engine & marketing CRM
- **Anti-Fraud System** (signup, login, payments, betting)
- Affiliate module
- Risk & compliance (responsible gaming, KYC)
- Deployment & launch support (negotiable)
- Operator training (negotiable)

**White Label Package Additional Items**

- Custom domain, logo, and theme
- Branded legal pages
- Multi-brand operation
- Dedicated operator accounts
- Enterprise SLA (negotiable)

### 14.6.5 Integrations

- **Top Stats**: 250+ game integrations · 50+ payment gateways
- **Game Vendors**: Pragmatic Play, Evolution, SA Gaming, PG Soft, etc. — **vendor logo grid** (Slots / Live / Table tabs)
- **Payment Types**: Crypto · Fiat · Bank · E-wallet categories
- **CTA**: "Need a specific vendor or payment method? Contact us."

### 14.6.6 Pricing

Instead of public pricing, use a **tier comparison table + "Contact for quote"**.

| Tier | Target | Includes |
|------|--------|----------|
| Starter | Single-brand operator | Core platform, game integrations, basic support |
| Professional | Growing brand | + CRM, Affiliate, Bonus suite, **Anti-Fraud System**, priority support |
| Enterprise | Multi-brand / White label | + Custom branding, SLA, dedicated support |

### 14.6.7 Contact / Demo Request

| Field | Required | Note |
|-------|----------|------|
| Company Name | Yes | |
| Contact Name | Yes | |
| Email | Yes | |
| Country / Region | Yes | |
| Solution Type | Yes | Turnkey / White Label / Integration only |
| Expected Launch | No | Dropdown |
| Message | No | |
| Consent (Privacy) | Yes | GDPR checkbox |

---

## 14.7 Design Guide

### 14.7.1 Tone & Mood

| Element | Player Lobby | Marketing Site |
|---------|--------------|----------------|
| Purpose | Entertainment | Trust, B2B professionalism |
| Background | Dark neon, game-first | Dark navy OR clean light |
| Typography | Bold, playful | Inter / DM Sans, enterprise SaaS |
| Imagery | Game thumbnails | Product UI, vendor logos |
| CTA | Sign Up / Deposit | Request Demo / Contact Sales |

### 14.7.2 Colors (Proposal)

```text
Primary:    #6366F1 (Indigo)
Secondary:  #10B981 (Emerald)
Accent:     #F59E0B (Amber)
Background: #0F172A or #FFFFFF
Text:       #F8FAFC / #1E293B
```

### 14.7.3 Components

- Hero with product mockup
- Stats counter (250+ / 50+ / 10,000+)
- Feature bento grid (11 cards)
- **Representative brands logo grid** (IBETS24 + partners)
- Vendor logo marquee
- Bonus type checklist grid
- CRM capability cards
- Comparison table (Turnkey vs White Label)
- FAQ accordion
- Sticky CTA bar (mobile)

### 14.7.4 Responsive

| Breakpoint | Layout |
|------------|--------|
| ≥1280px | 12-column, side-by-side hero |
| 768–1279px | 2-column feature grid |
| <768px | Single column, hamburger nav, bottom CTA |

---

## 14.8 Marketing Site Build (Internal Only)

A marketing site repo **separate from** the player SPA is recommended. Build stack and hosting choices are managed in **internal development documents only** and **technology stack is not exposed on the public site**.

- New repo: **`casino-marketing`** (this repo)
- Staging screenshots: Admin & Player UI
- Contact form: Phase 1 external form service → Phase 2 CRM integration

---

## 14.9 SEO & Content Strategy

### 14.9.1 Target Keywords (en)

| Priority | Keyword |
|----------|---------|
| P0 | white label casino platform |
| P0 | turnkey online casino software |
| P0 | white label sportsbook platform |
| P1 | igaming platform provider |
| P1 | turnkey sportsbook software |
| P1 | casino CRM software |
| P1 | casino anti-fraud system |
| P2 | online casino bonus system |
| P2 | igaming fraud prevention |
| P2 | casino payment gateway integration |

### 14.9.2 On-page SEO Checklist

- [ ] Unique title / meta description per page
- [ ] Open Graph + Twitter Card
- [ ] JSON-LD SoftwareApplication schema (Home)
- [ ] sitemap, robots.txt, canonical URLs
- [ ] Core Web Vitals: LCP < 2.5s

### 14.9.3 Content Calendar (Phase 2)

| Month | Topic |
|-------|-------|
| M1 | "What is a White Label Casino Platform?" |
| M2 | "How to Choose Payment Gateways for Your Online Casino" |
| M3 | "Casino CRM: Retain Players with Smart Campaigns" |

---

## 14.10 Development Phases & Schedule

### Phase 0 — Preparation (1 week)

- [ ] Staging screenshots & demo videos
- [ ] First-pass en copy (review excluding technical terms & aggregator names)
- [ ] Figma design ([15-marketing-site-figma-design.md](./15-marketing-site-figma-design.md), HTML prototype)
- [x] Repo creation → [README](../README.md)

### Phase 1 — MVP Launch (3 weeks)

| Week | Deliverable |
|------|-------------|
| W1 | Design system, Home (Stats 250+/50+), Platform overview |
| W2 | Features hub (11 pages incl. Sportsbook, CRM, Anti-Fraud), Solutions, Integrations, Brands section |
| W3 | Contact, Pricing, Legal, SEO, deploy staging |

### Phase 2 — Growth (2 weeks)

- [ ] Blog / Resources
- [ ] ko locale
- [ ] Case study template
- [ ] CRM integration (inquiry form)
- [ ] Hero CTA A/B test

---

## 14.11 Team & Roles

| Role | Phase 1 | Responsibility |
|------|---------|----------------|
| PM / Product | 0.3 FTE | Copy review, CTA, exposure policy compliance |
| UI/UX Designer | 0.5 FTE | Figma, design system |
| Frontend Dev | 1 FTE | Marketing site implementation |
| Content / Marketing | 0.3 FTE | SEO copy, vendor logo licensing |
| DevOps | 0.1 FTE | Domain, SSL, deploy |

---

## 14.12 Quality Criteria

- [ ] Desktop / Tablet / Mobile responsive
- [ ] Lighthouse Performance ≥ 90, Accessibility ≥ 90
- [ ] **Exposure policy review**: Confirm tech stack, aggregator names, and IA are not exposed
- [ ] Contact form E2E tested
- [ ] en copy proofread
- [ ] Vendor, payment, and **representative brand (IBETS24)** logo license confirmed

---

## 14.13 Risks & Mitigation

| Risk | Mitigation |
|------|------------|
| Vendor logo license | Use only after official brand kit & approval |
| Gap between 250+/50+ figures and reality | Sync marketing figures with internal counts quarterly |
| CRM feature rollout delay | Pre-define site badge policy for "Available" / "Coming soon" |
| Sportsbook & Cash Out rollout delay | Handle unreleased features such as Cash Out with "(rolling out)" in copy or section badges |
| Insufficient representative brands | Lead with IBETS24 + "More brands launching" placeholder |
| Technical term leakage | Copy QA checklist (§14.2.1) |

---

## 14.14 Success Metrics (Post-launch)

| Metric | Target (90 days) |
|--------|------------------|
| Unique visitors | 5,000 / month |
| Demo requests | 50 / month |
| Bounce rate (Home) | < 55% |
| Organic traffic share | 30%+ |

---

## 14.15 Related Documents

| Document | Content |
|----------|---------|
| [../README.md](../README.md) | Production site (Vite) |
| [15-marketing-site-figma-design.md](./15-marketing-site-figma-design.md) | Figma design spec + HTML prototype |
| [../../casino-backend/docs/01-project-overview.md](../../casino-backend/docs/01-project-overview.md) | Platform overview (internal) |
| [../../casino-backend/docs/03-domain-design.md](../../casino-backend/docs/03-domain-design.md) | Domain features (internal) |
| [../../casino-backend/docs/12-development-roadmap.md](../../casino-backend/docs/12-development-roadmap.md) | Development roadmap (internal) |
| `../../casino-frontend/docs/04-homepage-wireframe.md` | Player UI reference |
| **Site IA (internal)** | Separate document — not in this plan or on the public site |

---

## 14.16 Appendix A — Home Page Wireframe (ASCII, Content-Based)

```text
┌──────────────────────────────────────────────────────────────┐
│ [Logo]  [Nav — see internal IA]              [Request Demo]    │
├──────────────────────────────────────────────────────────────┤
│  Launch Your iGaming Brand          ┌─────────────────────┐│
│  on a Production-Ready Platform     │  [Product Mockup]   ││
│  250+ games · 50+ payments          │  Player + Admin UI  ││
│  [Request Demo]  [Explore Platform] └─────────────────────┘│
├──────────────────────────────────────────────────────────────┤
│  250+ Integrations │ 50+ Gateways │ Sportsbook │ 10,000+ Games│
├──────────────────────────────────────────────────────────────┤
│  ┌────────┐ ┌──────────┐ ┌────────┐ ┌────────┐ ┌────────┐  │
│  │ Games  │ │Sportsbook│ │ Wallet │ │ Payment│ │ Bonus  │ ...│
│  └────────┘ └──────────┘ └────────┘ └────────┘ └────────┘  │
├──────────────────────────────────────────────────────────────┤
│  [Platform Flow — Player → Platform → Casino & Sports]      │
├──────────────────────────────────────────────────────────────┤
│  ◀ [Pragmatic][Evolution][SA Gaming][PG Soft] ... ▶        │
│  ◀ [Crypto][Fiat][Bank][E-wallet] — 50+ Gateways ▶         │
├──────────────────────────────────────────────────────────────┤
│  Brands Powered by Our Platform                             │
│  [IBETS24 logo]  [Brand B]  [Brand C]  [Brand D]           │
├──────────────────────────────────────────────────────────────┤
│  Turnkey                    │  White Label                  │
│  ✓ Full deployment          │  ✓ Custom brand & domain       │
├──────────────────────────────────────────────────────────────┤
│        Ready to launch?  [Contact Sales]                    │
└──────────────────────────────────────────────────────────────┘
```

---

## 14.17 Appendix B — Feature Card Copy (en, For Site Publication)

| Card | Title | Description |
|------|-------|-------------|
| 1 | 250+ Game Integrations | Connect with leading studios — slots, live casino, and table games from Pragmatic Play, Evolution, SA Gaming, and more. |
| 2 | Complete Sportsbook | Pre-match and live betting across major sports — singles, parlays, and system bets on one unified wallet with your casino. |
| 3 | Transparent Wallet | Every deposit, bet, win, and withdrawal is fully recorded — built for audit, reconciliation, and peace of mind. |
| 4 | 50+ Payment Gateways | Accept crypto and fiat worldwide with automated deposits and a secure withdrawal approval process. |
| 5 | Complete Bonus Engine | Welcome, deposit match, cashback, free spins, VIP rewards, and wagering tracking — for casino and sports. |
| 6 | Marketing CRM | Segment players, run campaigns, automate lifecycle messages, and measure retention — without third-party tools. |
| 7 | Affiliate System | CPA, revenue share, or hybrid models with sub-affiliate support and a dedicated partner portal. |
| 8 | Business Intelligence | GGR, NGR, and daily KPIs on dashboards your finance team can trust. |
| 9 | Anti-Fraud System | Real-time protection for signup, login, deposits, and withdrawals — multi-account detection, AML screening, and automated enforcement. |
| 10 | Risk & Compliance | Responsible gaming tools, KYC workflow, and regulatory framework support. |
| 11 | Operator Backoffice | Manage players, finance, games, sports, bonuses, CRM, fraud alerts, and support from one secure control panel. |

---

## 14.18 Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-07-03 | Initial development plan |
| 1.1 | 2026-07-03 | Added exposure policy; reflected 250+/50+/CRM/bonus; IA, tech stack, and aggregator names excluded from site |
| 1.2 | 2026-07-03 | Added sportsbook, representative brands section, IBETS24 logo (casino-frontend) |
| 1.3 | 2026-07-03 | Added Anti-Fraud System feature description (§14.5.6) |
| 1.4 | 2026-07-03 | **Ascendra Platforms** platform brand finalized; HTML prototype v1.2 (feature images) |
| 1.5 | 2026-07-03 | Contact + Feature detail pages (11 slugs) HTML prototype v1.3 |
| 1.6 | 2026-07-03 | Integrations + Pricing HTML prototype v1.4 |
| 1.7 | 2026-07-03 | Legal pages (Privacy, Terms, AML, Responsible Gaming) HTML prototype v1.5 |
| 1.8 | 2026-07-03 | **`casino-marketing` repo** — Vite build, SEO, 11 feature pages, contact form env |
| 1.9 | 2026-07-03 | Moved plan and design prototype to `casino-marketing/docs/` |
