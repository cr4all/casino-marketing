/**
 * Generates locale JSON files for all supported languages.
 * Run: node scripts/generate-locales.mjs
 * Use SKIP_TRANSLATE=1 to only regenerate en.json
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { FEATURES } from "../js/features-data.mjs";
import { buildLegalContent } from "./extract-legal-content.mjs";
import { buildLocale, saveCache } from "./auto-translate-locales.mjs";
import { MANUAL } from "./manual-translations.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const localesDir = resolve(root, "js/locales");
mkdirSync(localesDir, { recursive: true });

const TARGETS = ["de", "fr", "pt", "it", "sq", "hr", "es", "ar", "tr"];
const skipTranslate = !process.argv.includes("--all") && process.env.REGENERATE_LOCALES !== "1";

const en = buildEnglish();
writeFileSync(resolve(localesDir, "en.json"), JSON.stringify(en, null, 2), "utf8");
console.log("Generated en.json");

if (skipTranslate) {
  console.log("SKIP_TRANSLATE=1 — skipping other locales");
  process.exit(0);
}

for (const code of TARGETS) {
  const locale = await buildLocale(en, code, MANUAL[code] || {});
  writeFileSync(resolve(localesDir, `${code}.json`), JSON.stringify(locale, null, 2), "utf8");
  console.log(`  ✓ ${code}.json`);
  saveCache();
}

console.log("Done:", ["en", ...TARGETS].join(", "));

function buildEnglish() {
  const legal = buildLegalContent();
  return {
    lang: "en",
    dir: "ltr",
    common: {
      brandTag: "Turnkey · White Label Platform",
      nav: {
        home: "Platform",
        features: "Features",
        solutions: "Solutions",
        integrations: "Integrations",
        pricing: "Prices",
        contact: "Resources",
      },
      actions: {
        contact: "Contact",
        requestDemo: "Request Demo",
        exploreFeatures: "Explore Features",
        learnMore: "Learn more →",
        contactSales: "Contact Sales",
        contactUs: "Contact Us",
        contactForQuote: "Contact for Quote",
        submitRequest: "Submit Request",
        becomeSuccess: "Become Our Next Success Story",
      },
      footer: {
        tagline: "Turnkey and white-label iGaming platform for casino and sportsbook operators worldwide.",
        platform: "Platform",
        solutions: "Solutions",
        legal: "Legal",
        features: "Features",
        integrations: "Integrations",
        operatorBackoffice: "Operator Backoffice",
        turnkey: "Turnkey",
        whiteLabel: "White Label",
        prices: "Prices",
        contact: "Contact",
        privacy: "Privacy",
        terms: "Terms",
        amlPolicy: "AML Policy",
        responsibleGaming: "Responsible Gaming",
        copyright: "© 2026 Ascendra Platforms. All rights reserved.",
      },
      aria: {
        openMenu: "Open menu",
        mobileNav: "Mobile navigation",
        selectLanguage: "Select language",
      },
      stats: {
        gameIntegrations: "Game Integrations",
        paymentGateways: "Payment Gateways",
        gamesAvailable: "Games Available",
        sportsbook: "Sportsbook",
        bonusTypes: "Bonus Types",
        full: "Full",
      },
      cta: {
        readyTitle: "Ready to Launch on Ascendra Platforms?",
        readySub: "Get a personalized demo and see the full platform in action.",
      },
      badges: {
        popular: "Popular",
        comingSoon: "Coming soon",
        casinoSportsbook: "Casino + Sportsbook",
      },
    },
    home: {
      meta: {
        title: "Ascendra Platforms — Turnkey & White Label iGaming",
      },
      hero: {
        badge: "Turnkey · White Label",
        title: "Launch Your iGaming Brand on Ascendra Platforms",
        titleHighlight: "Ascendra Platforms",
        sub: "Production-ready casino and sportsbook software with 250+ game integrations, 50+ payment gateways, built-in CRM, anti-fraud protection, and a complete bonus engine.",
      },
      kpi: {
        ggrToday: "GGR Today",
        deposits: "Deposits",
        activePlayers: "Active Players",
      },
      trust: {
        auditWallet: "Audit-ready Wallet",
        fullSportsbook: "Full Sportsbook",
        antiFraud: "Anti-Fraud System",
        marketingCrm: "Marketing CRM",
      },
      featuresSection: {
        title: "Everything You Need to Operate",
        sub: "Enterprise-grade modules built into Ascendra Platforms — casino, sportsbook, payments, CRM, and more.",
      },
      featureCards: [
        { badge: "Games", title: "250+ Game Integrations", desc: "Slots, live casino, and table games from Pragmatic Play, Evolution, SA Gaming, and more." },
        { badge: "Sports", title: "Complete Sportsbook", desc: "Pre-match and live betting with singles, parlays, and unified wallet." },
        { badge: "Wallet", title: "Transparent Wallet", desc: "Every transaction recorded for audit, reconciliation, and peace of mind." },
        { badge: "Payments", title: "50+ Payment Gateways", desc: "Crypto and fiat worldwide with secure withdrawal approval." },
        { badge: "Bonus", title: "Complete Bonus Engine", desc: "Welcome, cashback, free spins, VIP — casino and sports promotions." },
        { badge: "CRM", title: "Marketing CRM", desc: "Segment players, run campaigns, and measure retention in-platform." },
        { badge: "Affiliate", title: "Affiliate System", desc: "CPA, RevShare, hybrid models with sub-affiliate portal." },
        { badge: "Analytics", title: "Business Intelligence", desc: "GGR, NGR, and daily KPIs your finance team can trust." },
        { badge: "Security", title: "Anti-Fraud System", desc: "Real-time protection for signup, login, deposits, and withdrawals — AML screening and automated enforcement." },
        { badge: "Compliance", title: "Risk & Compliance", desc: "Responsible gaming tools, KYC workflow, and regulatory framework support." },
        { badge: "Admin", title: "Operator Backoffice", desc: "Manage players, finance, games, sports, bonuses, CRM, fraud alerts, and support in one panel." },
      ],
      flow: {
        title: "How Ascendra Platforms Works",
        sub: "From player signup to bet settlement — one seamless flow.",
        player: "Player",
        platform: "Ascendra Platform",
        wallet: "Wallet",
        casinoSports: "Casino & Sports",
      },
      marquee: {
        vendors: "Trusted Game Vendors",
        payments: "50+ Payment Gateways — Crypto · Fiat · Bank · E-wallet",
      },
      brands: {
        title: "Brands Powered by Ascendra Platforms",
        sub: "See how operators launch and scale on our turnkey and white-label solution.",
      },
      compare: {
        title: "Choose Your Solution",
        sub: "Turnkey launch or full white-label customization on Ascendra Platforms.",
        turnkey: {
          title: "Turnkey",
          items: [
            "Full stack — casino + sportsbook",
            "250+ game integrations",
            "50+ payment gateways",
            "Bonus engine, CRM & Anti-Fraud System",
            "Launch support (4–8 weeks)",
          ],
        },
        whiteLabel: {
          title: "White Label",
          items: [
            "Everything in Turnkey",
            "Custom domain, logo & theme",
            "Branded legal pages",
            "Multi-brand operation",
            "Enterprise SLA",
          ],
        },
      },
    },
    contact: {
      hero: {
        badge: "Get Started",
        title: "Request a Demo",
        sub: "Tell us about your project and our team will schedule a personalized walkthrough of Ascendra Platforms — casino, sportsbook, payments, CRM, and more.",
      },
      form: {
        company: "Company Name",
        firstName: "First Name",
        lastName: "Last Name",
        email: "Work Email",
        country: "Country / Region",
        solution: "Solution Type",
        launch: "Expected Launch",
        message: "Message",
        placeholders: {
          company: "Your company or brand name",
          firstName: "John",
          lastName: "Smith",
          email: "you@company.com",
          message: "Tell us about your target market, expected player volume, or specific requirements…",
        },
        countries: {
          placeholder: "Select your region",
          na: "North America",
          eu: "Europe",
          latam: "Latin America",
          asia: "Asia Pacific",
          mea: "Middle East & Africa",
          other: "Other",
        },
        solutions: {
          placeholder: "Select solution",
          turnkey: "Turnkey",
          whiteLabel: "White Label",
          integration: "Integration Only",
        },
        launchOptions: {
          notSure: "Not sure yet",
          m1_3: "1–3 months",
          m3_6: "3–6 months",
          m6_12: "6–12 months",
          m12plus: "12+ months",
        },
        consent: 'I agree to Ascendra Platforms processing my data to respond to this inquiry. See our <a href="privacy.html">Privacy Policy</a>.',
      },
      sidebar: {
        responseBadge: "✓ Typical response within 24 hours",
        talkTitle: "Talk to Our Team",
        talkSub: "Whether you're launching a new brand or migrating from another platform, we'll tailor the demo to your use case.",
        seeTitle: "What You'll See",
        seeItems: [
          "250+ game integrations and vendor catalog",
          "Full sportsbook — pre-match and live",
          "50+ payment gateways and wallet ledger",
          "Bonus engine, CRM, and Anti-Fraud System",
          "Operator backoffice walkthrough",
        ],
      },
      messages: {
        sending: "Sending…",
        success: "Thank you! We'll be in touch within 24 hours.",
        successDemo: "Thank you! (Demo mode — set VITE_CONTACT_ENDPOINT to enable delivery.)",
        error: "Something went wrong. Please email sales@ascendraplatforms.com",
      },
    },
    pricing: {
      hero: {
        badge: "Flexible Plans",
        title: "Plans Built for Every Stage",
        sub: "From first launch to multi-brand enterprise — choose the Ascendra Platforms package that fits your operation. Custom quotes for every tier.",
      },
      tiers: {
        starter: { tier: "Starter", name: "Launch", target: "Single-brand operators entering the market", price: "Contact for quote", items: ["Core platform — casino + sportsbook", "250+ game integrations", "Transparent wallet & payments", "Basic bonus engine", "Operator backoffice", "Standard support"] },
        growth: { tier: "Professional", name: "Growth", target: "Growing brands scaling player acquisition", price: "Contact for quote", items: ["Everything in Starter", "Marketing CRM & campaigns", "Full bonus engine suite", "Affiliate system & partner portal", "Anti-Fraud System", "Business intelligence dashboards", "Priority support"] },
        enterprise: { tier: "Enterprise", name: "White Label", target: "Multi-brand operators & white-label partners", price: "Contact for quote", items: ["Everything in Professional", "Custom domain, logo & theme", "Branded legal pages", "Multi-brand operation", "Dedicated operator accounts", "Enterprise SLA", "Dedicated account manager"] },
      },
      note: "All plans include 50+ payment gateways, risk & compliance tools, and launch support. Pricing is tailored to your market, volume, and integration requirements — no hidden fees on the public site.",
      compare: {
        title: "Turnkey vs White Label",
        sub: "Not sure which package fits? Here's a quick comparison.",
        turnkey: { title: "Turnkey", desc: "Launch fast with Ascendra Platforms infrastructure — full casino, sportsbook, payments, and backoffice. Ideal when you need to go live in weeks with proven technology.", items: ["4–8 week launch support", "Full module stack included", "Operator training"] },
        whiteLabel: { title: "White Label", desc: "Everything in Turnkey plus full brand customization — your logo, domain, theme, and legal pages. Run multiple brands from one platform with enterprise SLA.", items: ["Custom branding & domain", "Multi-brand Admin", "Enterprise SLA options"] },
      },
      cta: { title: "Get a Personalized Quote", sub: "Tell us about your target market and we'll recommend the right plan." },
    },
    integrations: {
      hero: {
        badge: "Connect Everything",
        title: "250+ Game Integrations · 50+ Payment Gateways",
        sub: "Leading game studios and global payment methods — connected on one platform. Launch with the vendors and payment types your players expect.",
      },
      vendors: {
        title: "Trusted Game Vendors",
        sub: "Studio logos from slots, live casino, and table games — no aggregator brands, only the vendors your players know.",
        tabs: { slots: "Slots", live: "Live Casino", table: "Table Games" },
      },
      payments: {
        title: "Payment Types",
        sub: "50+ gateways across crypto, fiat, bank, and e-wallet — configured per brand and region.",
        crypto: { title: "Crypto", desc: "Instant deposits and fast withdrawals for crypto-native players worldwide." },
        fiat: { title: "Fiat & Regional", desc: "Cards and regional payment methods for local market coverage." },
        bank: { title: "Bank Transfer", desc: "Direct bank deposits and operator-approved withdrawal workflows." },
        ewallet: { title: "E-wallet", desc: "Popular digital wallets for frictionless deposits across regions." },
      },
      cta: { title: "Need a Specific Vendor or Payment Method?", sub: "Tell us your target market — we'll confirm availability and integration timeline." },
    },
    feature: {
      breadcrumb: { home: "Home", features: "Features" },
      shell: {
        problemDefault: "The Challenge",
        solutionDefault: "The Ascendra Solution",
        capabilitiesTitle: "Key Capabilities",
        capabilitiesSub: "Everything included in Ascendra Platforms — ready for your launch.",
        howTitle: "How It Works",
        howSub: "A seamless flow from player action to operator insight.",
        seeTitle: "See It in Action",
        seeSub: "Player experience and operator control — side by side.",
        playerExperience: "Player Experience",
        operatorAdmin: "Operator Admin",
        relatedTitle: "Related Features",
        relatedSub: "Explore more modules built into Ascendra Platforms.",
      },
    },
    legal: {
      nav: { privacy: "Privacy Policy", terms: "Terms of Service", aml: "AML Policy", responsible: "Responsible Gaming" },
      ...legal,
    },
    features: FEATURES,
  };
}
