import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(fileURLToPath(import.meta.url), "..", "..");

const replacements = [
  [/Learn more \?\?\?/g, "Learn more →"],
  [/Learn more \?<\/a>/g, "Learn more →</a>"],
  [/<span class="flow-arrow">\?\?\?<\/span>/g, '<span class="flow-arrow">→</span>'],
  [/<span class="flow-arrow">\?<\/span>/g, '<span class="flow-arrow">→</span>'],
  [/<span class="check">\?\?\?<\/span>/g, '<span class="check">✓</span>'],
  [/<span class="check">\?<\/span>/g, '<span class="check">✓</span>'],
  [/Launch support \(4\?\?\?8 weeks\)/g, "Launch support (4–8 weeks)"],
  [/Launch support \(4\?8 weeks\)/g, "Launch support (4–8 weeks)"],
  [/Gates of Olympus \?\?\? Pragmatic Play slot Play slot/g, "Gates of Olympus — Pragmatic Play slot"],
  [/Ascendra Platforms \?\?\? Turnkey/g, "Ascendra Platforms — Turnkey"],
  [/Ascendra Platforms \?\?\? casino/g, "Ascendra Platforms — casino"],
  [/Platforms \?\?\? casino/g, "Platforms — casino"],
  [/bet settlement \?\?\? one/g, "bet settlement — one"],
  [/withdrawals \?\?\? AML/g, "withdrawals — AML"],
  [/VIP \?\?\? casino/g, "VIP — casino"],
  [/Full stack \?\?\? casino \+ sportsbook/g, "Full stack — casino + sportsbook"],
  [/50\+ Payment Gateways \?\?\? Crypto/g, "50+ Payment Gateways — Crypto"],
  [/\?\?\? /g, "— "],
  [/\?\?\?/g, "—"],
  [/<div class="response-badge">\? Typical/g, '<div class="response-badge">✓ Typical'],
  [/Turnkey \? White Label/g, "Turnkey · White Label"],
  [
    /50\+ Payment Gateways \? Crypto \? Fiat \? Bank \? E-wallet/g,
    "50+ Payment Gateways — Crypto · Fiat · Bank · E-wallet",
  ],
  [/Launch support \(4\?8 weeks\)/g, "Launch support (4–8 weeks)"],
  [/Full stack \? casino \+ sportsbook/g, "Full stack — casino + sportsbook"],
  [/Ascendra Platforms \? Turnkey/g, "Ascendra Platforms — Turnkey"],
  [/Gates of Olympus \? Pragmatic/g, "Gates of Olympus — Pragmatic Play slot"],
  [/VIP \? casino/g, "VIP — casino"],
  [/<span>\? 2026/g, "<span>© 2026"],
  [/250\+ Game Integrations \? 50\+ Payment Gateways/g, "250+ Game Integrations · 50+ Payment Gateways"],
  [/Platforms \? casino/g, "Platforms — casino"],
  [/bet settlement \? one/g, "bet settlement — one"],
  [/withdrawals \? AML/g, "withdrawals — AML"],
  [/requirements\?/g, "requirements…"],
  [/1\?3 months/g, "1–3 months"],
  [/3\?6 months/g, "3–6 months"],
  [/6\?12 months/g, "6–12 months"],
  [/<span>\uFFFD<\/span>/g, "<span>›</span>"],
  [/\uFFFD 2026/g, "© 2026"],
  [/Service \uFFFD Ascendra/g, "Service — Ascendra"],
  [/Gaming \uFFFD Ascendra/g, "Gaming — Ascendra"],
  [/Policy \uFFFD Ascendra/g, "Policy — Ascendra"],
  [/Demo \uFFFD Ascendra/g, "Demo — Ascendra"],
  [/Integrations \uFFFD Ascendra/g, "Integrations — Ascendra"],
  [/Feature \uFFFD Ascendra/g, "Feature — Ascendra"],
  [/Wallet \uFFFD Ascendra/g, "Wallet — Ascendra"],
  [/Sportsbook \uFFFD Ascendra/g, "Sportsbook — Ascendra"],
  [/Backoffice \uFFFD Ascendra/g, "Backoffice — Ascendra"],
  [/Gateways \uFFFD Ascendra/g, "Gateways — Ascendra"],
  [/Engine \uFFFD Ascendra/g, "Engine — Ascendra"],
  [/CRM \uFFFD Ascendra/g, "CRM — Ascendra"],
  [/System \uFFFD Ascendra/g, "System — Ascendra"],
  [/Intelligence \uFFFD Ascendra/g, "Intelligence — Ascendra"],
  [/Compliance \uFFFD Ascendra/g, "Compliance — Ascendra"],
  [/Integrations \uFFFD 50\+/g, "Integrations · 50+"],
  [/methods \uFFFD connected/g, "methods — connected"],
  [/table games \uFFFD no/g, "table games — no"],
  [/e-wallet \uFFFD configured/g, "e-wallet — configured"],
  [/market \uFFFD we'll/g, "market — we'll"],
  [/Platforms \uFFFD ready/g, "Platforms — ready"],
  [/control \uFFFD side/g, "control — side by side"],
  [/recorded \uFFFD built/g, "recorded — built for audit, reconciliation, and peace of mind."],
  [/sports \uFFFD singles/g, "sports — singles, parlays, and system bets on one unified wallet with your casino."],
  [/retention \uFFFD without/g, "retention — without third-party tools."],
  [/tracking \uFFFD for/g, "tracking — for casino and sports, out of the box."],
  [/betting \uFFFD with/g, "betting — with AML screening and automated enforcement."],
  [/studios \uFFFD slots/g, "studios — slots, live casino, and table games from Pragmatic Play, Evolution, SA Gaming, and more on Ascendra Platforms."],
  [/backoffice \uFFFD applying/g, "backoffice — applying limits per player, segment, or jurisdiction, and reviewing accounts flagged for problematic behavior through integrated risk and fraud monitoring."],
  [/Site \uFFFD including/g, "Site — including text, graphics, logos, product descriptions, and design — is owned"],
  [/design \uFFFD is owned/g, "design — is owned"],
  [/platform \uFFFD those/g, "platform — those"],
  [/details \uFFFD company/g, "details — company"],
  [/preferences \uFFFD solution/g, "preferences — solution"],
  [/data \uFFFD IP/g, "data — IP"],
  [/Communications \uFFFD records/g, "Communications — records"],
  [/Consent \uFFFD when/g, "Consent — when"],
  [/interests \uFFFD to respond/g, "interests — to respond"],
  [/necessity \uFFFD when/g, "necessity — when"],
  [/CRM \uFFFD solely/g, "CRM — solely"],
  [/sportsbook \uFFFD pre-match/g, "sportsbook — pre-match and live"],
  [/<strong>Deposit limits<\/strong> \uFFFD/g, "<strong>Deposit limits</strong> —"],
  [/<strong>Loss and wagering limits<\/strong> \uFFFD/g, "<strong>Loss and wagering limits</strong> —"],
  [/<strong>Session limits<\/strong> \uFFFD/g, "<strong>Session limits</strong> —"],
  [/<strong>Cooling-off periods<\/strong> \uFFFD/g, "<strong>Cooling-off periods</strong> —"],
  [/<strong>Self-exclusion<\/strong> \uFFFD/g, "<strong>Self-exclusion</strong> —"],
  [/<strong>Reality checks<\/strong> \uFFFD/g, "<strong>Reality checks</strong> —"],
  [/<strong>Underage prevention<\/strong> \uFFFD/g, "<strong>Underage prevention</strong> —"],
  [/<strong>Sportsbook limits<\/strong> \uFFFD/g, "<strong>Sportsbook limits</strong> —"],
  [/Platforms \uFFFD supporting/g, "Platforms — supporting operators in promoting safe and sustainable play."],
  [/<div class="payment-icon">\?<\/div>\s*\n\s*<h3>Crypto/g, '<div class="payment-icon">₿</div>\n          <h3>Crypto'],
  [/<div class="payment-icon">\?\?<\/div>\s*\n\s*<h3>Fiat/g, '<div class="payment-icon">💳</div>\n          <h3>Fiat'],
  [/<div class="payment-icon">\?\?<\/div>\s*\n\s*<h3>Bank/g, '<div class="payment-icon">🏦</div>\n          <h3>Bank'],
  [/<div class="payment-icon">\?\?<\/div>\s*\n\s*<h3>E-wallet/g, '<div class="payment-icon">📱</div>\n          <h3>E-wallet'],
  [/<strong>Contact and business details<\/strong> . /g, "<strong>Contact and business details</strong> — "],
  [/<strong>Solution preferences<\/strong> . /g, "<strong>Solution preferences</strong> — "],
  [/<strong>Technical data<\/strong> . /g, "<strong>Technical data</strong> — "],
  [/<strong>Communications<\/strong> . /g, "<strong>Communications</strong> — "],
  [/<strong>Consent<\/strong> . /g, "<strong>Consent</strong> — "],
  [/<strong>Legitimate interests<\/strong> . /g, "<strong>Legitimate interests</strong> — "],
  [/<strong>Contractual necessity<\/strong> . /g, "<strong>Contractual necessity</strong> — "],
  [/Platforms . casino, sportsbook/g, "Platforms — casino, sportsbook"],
  [/value="1-3">1.3 months/g, 'value="1-3">1–3 months'],
  [/value="3-6">3.6 months/g, 'value="3-6">3–6 months'],
  [/value="6-12">6.12 months/g, 'value="6-12">6–12 months'],
  [/requirements./g, "requirements…"],
];

function walk(dir) {
  for (const name of readdirSync(dir)) {
    if (name === "docs" || name === "node_modules" || name === "dist") continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) {
      walk(p);
      continue;
    }
    if (!name.endsWith(".html")) continue;

    let html = readFileSync(p, "utf8");
    const orig = html;
    for (const [pattern, value] of replacements) {
      html = html.replace(pattern, value);
    }
    if (html !== orig) {
      writeFileSync(p, html, "utf8");
      console.log("fixed", relative(root, p));
    }
  }
}

walk(root);
