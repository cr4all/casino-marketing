export const FEATURES = {
  "game-integrations": {
    slug: "game-integrations",
    badge: "Games",
    title: "250+ Game Integrations",
    heroH1: "One Platform, 250+ Integrations",
    heroSub: "Connect with leading game studios — slots, live casino, and table games from Pragmatic Play, Evolution, SA Gaming, and more on Ascendra Platforms.",
    heroImage: "/assets/images/games.jpg",
    problemTitle: "The Challenge",
    problem: "Operators waste months negotiating individual vendor contracts and managing fragmented game catalogs across multiple systems.",
    solutionTitle: "The Ascendra Solution",
    solution: "Ascendra Platforms delivers a unified game catalog with 250+ integrations — one wallet, one backoffice, and seamless play across every major category.",
    capabilities: [
      "Major vendor titles from Pragmatic Play, Evolution, SA Gaming, PG Soft, and more",
      "Full catalog management — enable, disable, and organize games from Admin",
      "Seamless play with instant balance updates across casino and sportsbook",
      "Live casino, slots, table games, and crash games in one integration layer",
      "10,000+ games available without rebuilding your player experience",
      "New vendor onboarding without disrupting live operations"
    ],
    steps: [
      { title: "Browse Catalog", desc: "Operator selects games and categories in Admin" },
      { title: "Player Launches", desc: "Game opens in-player with unified wallet" },
      { title: "Bet & Settle", desc: "Every round recorded in transparent ledger" },
      { title: "Report & Reconcile", desc: "GGR and vendor stats in real-time dashboards" }
    ],
    screenshotPlayer: "/assets/images/casino-sports.jpg",
    screenshotAdmin: "/assets/images/dashboard.jpg",
    related: ["wallet", "bonus-engine", "operator-backoffice"]
  },
  sportsbook: {
    slug: "sportsbook",
    badge: "Sports",
    title: "Complete Sportsbook",
    heroH1: "Complete Sportsbook, Built In",
    heroSub: "Pre-match and live betting across major sports — singles, parlays, and system bets on one unified wallet with your casino.",
    heroImage: "/assets/images/sports.jpg",
    problemTitle: "The Challenge",
    problem: "Running casino and sports on separate platforms splits your wallet, doubles integration work, and frustrates players who want one account.",
    solutionTitle: "The Ascendra Solution",
    solution: "Ascendra Platforms includes a full sportsbook — pre-match, live, and in-play — natively integrated with your casino wallet and bonus engine.",
    capabilities: [
      "Pre-match and live in-play betting with real-time odds",
      "Multi-sport coverage — football, basketball, tennis, eSports, and more",
      "Singles, parlays, accumulators, and system bets",
      "Unified wallet shared with casino — one balance, one history",
      "Sports-specific bonuses, free bets, and odds boosts",
      "Full bet history, settlement, and responsible betting limits"
    ],
    steps: [
      { title: "Select Event", desc: "Player browses pre-match or live markets" },
      { title: "Build Bet Slip", desc: "Singles, parlays, or system bets" },
      { title: "Place & Settle", desc: "Wallet debited; winnings credited instantly" },
      { title: "Track & Report", desc: "Operator monitors exposure and GGR in Admin" }
    ],
    screenshotPlayer: "/assets/images/sports.jpg",
    screenshotAdmin: "/assets/images/dashboard.jpg",
    related: ["wallet", "bonus-engine", "business-intelligence"]
  },
  wallet: {
    slug: "wallet",
    badge: "Wallet",
    title: "Transparent Wallet",
    heroH1: "Every Transaction Accounted For",
    heroSub: "Every deposit, bet, win, and withdrawal is fully recorded — built for audit, reconciliation, and peace of mind.",
    heroImage: "/assets/images/wallet.jpg",
    problemTitle: "The Challenge",
    problem: "Opaque balance handling creates disputes with players, auditors, and finance teams — especially when casino and sports share one account.",
    solutionTitle: "The Ascendra Solution",
    solution: "Ascendra Platforms maintains a complete, immutable transaction ledger — every credit and debit traceable from signup to withdrawal.",
    capabilities: [
      "Full transaction history for every player action",
      "Audit-ready records for finance and compliance teams",
      "Instant balance updates across casino, sports, and bonuses",
      "Separate cash and bonus balance tracking with wagering progress",
      "Reconciliation reports aligned with operator accounting",
      "Multi-currency support with USD as default display"
    ],
    steps: [
      { title: "Player Action", desc: "Deposit, bet, win, bonus, or withdrawal" },
      { title: "Ledger Entry", desc: "Every movement recorded with timestamp and type" },
      { title: "Balance Update", desc: "Real-time cash and bonus balances refreshed" },
      { title: "Audit & Export", desc: "Finance team exports and reconciles in Admin" }
    ],
    screenshotPlayer: "/assets/images/wallet.jpg",
    screenshotAdmin: "/assets/images/dashboard.jpg",
    related: ["payments", "business-intelligence", "risk-compliance"]
  },
  payments: {
    slug: "payments",
    badge: "Payments",
    title: "50+ Payment Gateways",
    heroH1: "50+ Gateways, Global Reach",
    heroSub: "Accept crypto and fiat worldwide with automated deposits and a secure withdrawal approval process.",
    heroImage: "/assets/images/payments.jpg",
    problemTitle: "The Challenge",
    problem: "Limited payment options mean lost deposits, while manual withdrawal processing creates delays and operational risk.",
    solutionTitle: "The Ascendra Solution",
    solution: "Ascendra Platforms connects 50+ payment gateways — crypto, fiat, bank transfer, and e-wallets — with automated deposits and operator-controlled withdrawal approval.",
    capabilities: [
      "Crypto and fiat payment methods for global player bases",
      "Automated deposit confirmation and wallet crediting",
      "Secure withdrawal approval workflow with fraud gates",
      "Manual and semi-automatic payout options for operators",
      "Payment method configuration per brand and region",
      "Integrated with Anti-Fraud System for payout protection"
    ],
    steps: [
      { title: "Player Deposits", desc: "Select method and complete payment" },
      { title: "Auto Credit", desc: "Wallet updated on confirmed deposit" },
      { title: "Withdrawal Request", desc: "Player submits payout; risk evaluated" },
      { title: "Operator Approval", desc: "Approved withdrawals processed securely" }
    ],
    screenshotPlayer: "/assets/images/payments.jpg",
    screenshotAdmin: "/assets/images/dashboard.jpg",
    related: ["wallet", "anti-fraud", "risk-compliance"]
  },
  "bonus-engine": {
    slug: "bonus-engine",
    badge: "Bonus",
    title: "Complete Bonus Engine",
    heroH1: "Every Promotion Type You Need",
    heroSub: "Welcome, deposit match, cashback, free spins, VIP rewards, and wagering tracking — for casino and sports, out of the box.",
    heroImage: "/assets/images/bonus.jpg",
    problemTitle: "The Challenge",
    problem: "Patchwork promotion tools lead to bonus abuse, unclear wagering rules, and campaigns that cannot span casino and sports.",
    solutionTitle: "The Ascendra Solution",
    solution: "Ascendra Platforms includes a full bonus engine — configure policies in Admin, let players claim in-app, and track rollover progress in real time.",
    capabilities: [
      "Welcome, first deposit, reload, and daily/weekly bonuses",
      "Cashback, free spins, and VIP tier rewards",
      "Sports free bets, odds boosts, and accumulator bonuses",
      "Real-time wagering and rollover progress for players",
      "Flexible policy rules — amounts, games, sports, and expiry",
      "Player self-service claim flow with transparent terms"
    ],
    steps: [
      { title: "Configure Policy", desc: "Operator sets bonus rules in Admin" },
      { title: "Player Qualifies", desc: "Deposit, signup, or campaign trigger" },
      { title: "Claim & Play", desc: "Bonus credited; wagering tracked live" },
      { title: "Convert or Expire", desc: "Rollover complete → cash balance" }
    ],
    screenshotPlayer: "/assets/images/bonus.jpg",
    screenshotAdmin: "/assets/images/dashboard.jpg",
    related: ["marketing-crm", "sportsbook", "anti-fraud"]
  },
  "marketing-crm": {
    slug: "marketing-crm",
    badge: "CRM",
    title: "Marketing CRM",
    heroH1: "Grow and Retain Your Players",
    heroSub: "Segment players, run campaigns, automate lifecycle messages, and measure retention — without third-party tools.",
    heroImage: "/assets/images/crm.jpg",
    problemTitle: "The Challenge",
    problem: "Exporting player data to external CRMs breaks compliance, adds cost, and delays campaigns when timing matters most.",
    solutionTitle: "The Ascendra Solution",
    solution: "Ascendra Platforms includes a built-in marketing CRM — segment, target, and measure campaigns where your player data already lives.",
    capabilities: [
      "Player segmentation — VIP, new, dormant, high-value, and custom",
      "Campaign creation, scheduling, and A/B testing",
      "Lifecycle messaging — signup, first deposit, win-back journeys",
      "Retention tools tied to bonuses and loyalty programs",
      "Promotion targeting by segment with conversion tracking",
      "Campaign analytics and ROI measurement in-platform"
    ],
    steps: [
      { title: "Define Segment", desc: "Filter players by behavior and value" },
      { title: "Build Campaign", desc: "Message, offer, and schedule" },
      { title: "Launch & Target", desc: "Reach the right players at the right time" },
      { title: "Measure Results", desc: "Track conversions and retention impact" }
    ],
    screenshotPlayer: "/assets/images/crm.jpg",
    screenshotAdmin: "/assets/images/dashboard.jpg",
    related: ["bonus-engine", "business-intelligence", "affiliate-system"]
  },
  "affiliate-system": {
    slug: "affiliate-system",
    badge: "Affiliate",
    title: "Affiliate System",
    heroH1: "Grow Through Partners",
    heroSub: "CPA, revenue share, or hybrid models with sub-affiliate support and a dedicated partner portal.",
    heroImage: "/assets/images/affiliate.jpg",
    problemTitle: "The Challenge",
    problem: "Spreadsheet-based affiliate tracking leads to payment disputes, missed conversions, and partners who cannot self-serve.",
    solutionTitle: "The Ascendra Solution",
    solution: "Ascendra Platforms includes a full affiliate module — track referrals, calculate commissions automatically, and give partners a branded portal.",
    capabilities: [
      "CPA, RevShare, and hybrid commission models",
      "Sub-affiliate hierarchy with transparent reporting",
      "Dedicated partner portal with stats and creatives",
      "Automatic commission calculation on GGR and NGR",
      "Referral link and promo code tracking",
      "Payout management integrated with finance workflows"
    ],
    steps: [
      { title: "Partner Onboards", desc: "Affiliate receives tracking links and codes" },
      { title: "Player Registers", desc: "Referral attributed to partner account" },
      { title: "Activity Tracked", desc: "Deposits, bets, and GGR linked to partner" },
      { title: "Commission Paid", desc: "Automated calculation and payout cycle" }
    ],
    screenshotPlayer: "/assets/images/affiliate.jpg",
    screenshotAdmin: "/assets/images/dashboard.jpg",
    related: ["marketing-crm", "business-intelligence", "payments"]
  },
  "business-intelligence": {
    slug: "business-intelligence",
    badge: "Analytics",
    title: "Business Intelligence",
    heroH1: "Know Your Numbers",
    heroSub: "GGR, NGR, and daily KPIs on dashboards your finance team can trust.",
    heroImage: "/assets/images/analytics.jpg",
    problemTitle: "The Challenge",
    problem: "Delayed or inconsistent reporting makes it impossible to react to trends, optimize campaigns, or report accurately to stakeholders.",
    solutionTitle: "The Ascendra Solution",
    solution: "Ascendra Platforms delivers real-time business intelligence — GGR, NGR, deposits, withdrawals, and affiliate performance in one dashboard.",
    capabilities: [
      "GGR and NGR reporting with daily and period breakdowns",
      "Deposit, withdrawal, and player activity KPIs",
      "Affiliate and campaign performance reports",
      "Game and vendor-level revenue analytics",
      "Export-ready data for finance and accounting",
      "Role-based dashboard access for Admin users"
    ],
    steps: [
      { title: "Data Captured", desc: "Every bet, deposit, and bonus logged" },
      { title: "Aggregated", desc: "Real-time rollups by player, game, and period" },
      { title: "Visualized", desc: "Dashboards and reports in Admin" },
      { title: "Acted On", desc: "Operators optimize based on live insights" }
    ],
    screenshotPlayer: "/assets/images/analytics.jpg",
    screenshotAdmin: "/assets/images/dashboard.jpg",
    related: ["wallet", "marketing-crm", "operator-backoffice"]
  },
  "anti-fraud": {
    slug: "anti-fraud",
    badge: "Security",
    title: "Anti-Fraud System",
    heroH1: "Stop Fraud Before It Costs You",
    heroSub: "Built-in anti-fraud and risk scoring for signup, login, payments, and betting — with AML screening and automated enforcement.",
    heroImage: "/assets/images/security.jpg",
    problemTitle: "The Challenge",
    problem: "Bonus abuse, multi-accounting, and suspicious withdrawals erode operator margins and create regulatory exposure.",
    solutionTitle: "The Ascendra Solution",
    solution: "Anti-Fraud System evaluates every critical action before it completes — and monitors bets and bonuses continuously with Allow, Challenge, or Block outcomes.",
    capabilities: [
      "Signup and login protection against bad actors",
      "Pre-withdrawal gates — high-risk payouts held automatically",
      "Multi-account detection across devices and payment methods",
      "AML blocklist screening on registration and transactions",
      "Automated hold, MFA challenge, and block enforcement",
      "Full admin audit trail for every risk decision"
    ],
    steps: [
      { title: "Player Action", desc: "Signup, login, deposit, bet, or withdrawal" },
      { title: "Risk Evaluation", desc: "Real-time scoring against operator policies" },
      { title: "Decision", desc: "Allow, Challenge (MFA), or Block" },
      { title: "Audit Log", desc: "Every outcome recorded in Admin" }
    ],
    screenshotPlayer: "/assets/images/security.jpg",
    screenshotAdmin: "/assets/images/dashboard.jpg",
    related: ["payments", "risk-compliance", "operator-backoffice"]
  },
  "risk-compliance": {
    slug: "risk-compliance",
    badge: "Compliance",
    title: "Risk & Compliance",
    heroH1: "Operate with Confidence",
    heroSub: "Responsible gaming tools, KYC workflow, and regulatory framework support built into Ascendra Platforms.",
    heroImage: "/assets/images/compliance.jpg",
    problemTitle: "The Challenge",
    problem: "Regulatory requirements vary by market — without integrated tools, operators bolt on KYC and responsible gaming as afterthoughts.",
    solutionTitle: "The Ascendra Solution",
    solution: "Ascendra Platforms includes responsible gaming limits, KYC verification workflows, and branded legal pages — configurable per brand and jurisdiction.",
    capabilities: [
      "Responsible gaming — deposit, loss, and session limits",
      "Self-exclusion and cooling-off period support",
      "KYC document upload and verification workflow",
      "Branded Terms, Privacy, AML, and Responsible Gaming pages",
      "Player verification status visible in Admin",
      "Integration with Anti-Fraud System for enhanced screening"
    ],
    steps: [
      { title: "Player Onboards", desc: "Identity verification triggered by policy" },
      { title: "Documents Reviewed", desc: "Operator approves or requests resubmission" },
      { title: "Limits Applied", desc: "Responsible gaming settings enforced" },
      { title: "Ongoing Monitor", desc: "Compliance status tracked in Admin" }
    ],
    screenshotPlayer: "/assets/images/compliance.jpg",
    screenshotAdmin: "/assets/images/dashboard.jpg",
    related: ["anti-fraud", "payments", "operator-backoffice"]
  },
  "operator-backoffice": {
    slug: "operator-backoffice",
    badge: "Admin",
    title: "Operator Backoffice",
    heroH1: "One Control Panel for Everything",
    heroSub: "Manage players, finance, games, sports, bonuses, CRM, fraud alerts, and support from one secure control panel.",
    heroImage: "/assets/images/backoffice.jpg",
    problemTitle: "The Challenge",
    problem: "Juggling multiple admin tools for players, payments, games, and support slows operators down and increases error rates.",
    solutionTitle: "The Ascendra Solution",
    solution: "Ascendra Platforms Admin is a unified backoffice — role-based access, real-time dashboards, and every module in one panel.",
    capabilities: [
      "Player management — profiles, limits, KYC, and history",
      "Finance — deposits, withdrawals, approvals, and reconciliation",
      "Game and sports catalog configuration",
      "Bonus, CRM, and affiliate module administration",
      "Anti-fraud alerts and risk decision audit logs",
      "Live chat and support ticket management"
    ],
    steps: [
      { title: "Role Login", desc: "RBAC-controlled access per team member" },
      { title: "Monitor Dashboard", desc: "KPIs, alerts, and pending actions" },
      { title: "Take Action", desc: "Approve, configure, or respond in one place" },
      { title: "Audit Trail", desc: "Every admin action logged for compliance" }
    ],
    screenshotPlayer: "/assets/images/backoffice.jpg",
    screenshotAdmin: "/assets/images/dashboard.jpg",
    related: ["business-intelligence", "anti-fraud", "game-integrations"]
  }
};
