export function applyManualMap(obj, map) {
  if (typeof obj === "string") return map[obj] ?? obj;
  if (Array.isArray(obj)) return obj.map((item) => applyManualMap(item, map));
  if (obj && typeof obj === "object") {
    const out = {};
    for (const [k, v] of Object.entries(obj)) {
      if (k === "slug" || k.endsWith("Image") || k.startsWith("screenshot") || k === "related") {
        out[k] = v;
      } else {
        out[k] = applyManualMap(v, map);
      }
    }
    return out;
  }
  return obj;
}

export const MANUAL = {
  de: {
    "iGaming Infrastructure": "iGaming-Infrastruktur",
    Platform: "Plattform", Features: "Funktionen", Solutions: "Lösungen", Integrations: "Integrationen", Prices: "Preise", Resources: "Ressourcen",
    Contact: "Kontakt", "Request Demo": "Demo anfordern", "Explore Features": "Funktionen entdecken", "Learn more →": "Mehr erfahren →",
    "Contact Sales": "Vertrieb kontaktieren", "Contact Us": "Kontaktieren Sie uns", "Contact for Quote": "Angebot anfordern",
    "Submit Request": "Anfrage senden", "Become Our Next Success Story": "Werden Sie unsere nächste Erfolgsgeschichte",
    "Turnkey and white-label iGaming platform for casino and sportsbook operators worldwide.": "Turnkey- und White-Label-iGaming-Plattform für Casino- und Sportwettenbetreiber weltweit.",
    Legal: "Rechtliches", Privacy: "Datenschutz", Terms: "AGB", "AML Policy": "AML-Richtlinie", "Responsible Gaming": "Verantwortungsvolles Spielen",
    "© 2026 Ascendra Platforms. All rights reserved.": "© 2026 Ascendra Platforms. Alle Rechte vorbehalten.",
    "Open menu": "Menü öffnen", "Mobile navigation": "Mobile Navigation", "Select language": "Sprache wählen",
    "Game Integrations": "Spielintegrationen", "Payment Gateways": "Zahlungsgateways", "Games Available": "Verfügbare Spiele",
    Sportsbook: "Sportwetten", "Bonus Types": "Bonustypen", Full: "Vollständig", Popular: "Beliebt", "Coming soon": "Demnächst", "Casino + Sportsbook": "Casino + Sportwetten",
    "Ready to Launch on Ascendra Platforms?": "Bereit für den Start mit Ascendra Platforms?",
    "Get a personalized demo and see the full platform in action.": "Erhalten Sie eine personalisierte Demo und sehen Sie die gesamte Plattform in Aktion.",
    "Launch Your iGaming Brand on Ascendra Platforms": "Starten Sie Ihre iGaming-Marke auf Ascendra Platforms",
    "Production-ready casino and sportsbook software with 250+ game integrations, 50+ payment gateways, built-in CRM, anti-fraud protection, and a complete bonus engine.":
      "Produktionsreife Casino- und Sportwetten-Software mit 250+ Spielintegrationen, 50+ Zahlungsgateways, integriertem CRM, Betrugsschutz und vollständiger Bonus-Engine.",
    "GGR Today": "GGR heute", Deposits: "Einzahlungen", "Active Players": "Aktive Spieler",
    "Audit-ready Wallet": "Audit-fähige Wallet", "Full Sportsbook": "Vollständige Sportwetten", "Anti-Fraud System": "Betrugsschutz-System", "Marketing CRM": "Marketing-CRM",
    "Everything You Need to Operate": "Alles, was Sie zum Betrieb brauchen",
    "Enterprise-grade modules built into Ascendra Platforms — casino, sportsbook, payments, CRM, and more.":
      "Enterprise-Module in Ascendra Platforms — Casino, Sportwetten, Zahlungen, CRM und mehr.",
    "How Ascendra Platforms Works": "So funktioniert Ascendra Platforms",
    "From player signup to bet settlement — one seamless flow.": "Von der Spielerregistrierung bis zur Wettabrechnung — ein nahtloser Ablauf.",
    Player: "Spieler", "Ascendra Platform": "Ascendra-Plattform", Wallet: "Wallet", "Casino & Sports": "Casino & Sport",
    "Trusted Game Vendors": "Vertrauenswürdige Spieleanbieter",
    "50+ Payment Gateways — Crypto · Fiat · Bank · E-wallet": "50+ Zahlungsgateways — Krypto · Fiat · Bank · E-Wallet",
    "Brands Powered by Ascendra Platforms": "Marken powered by Ascendra Platforms",
    "See how operators launch and scale on our turnkey and white-label solution.":
      "Sehen Sie, wie Betreiber mit unserer Turnkey- und White-Label-Lösung starten und skalieren.",
    "Choose Your Solution": "Wählen Sie Ihre Lösung",
    "Turnkey launch or full white-label customization on Ascendra Platforms.":
      "Turnkey-Start oder vollständige White-Label-Anpassung auf Ascendra Platforms.",
    "Get Started": "Loslegen", "Request a Demo": "Demo anfordern",
    "Company Name": "Firmenname", "First Name": "Vorname", "Last Name": "Nachname", "Work Email": "Geschäftliche E-Mail",
    "Country / Region": "Land / Region", "Solution Type": "Lösungstyp", "Expected Launch": "Geplanter Start", Message: "Nachricht",
    "Sending…": "Wird gesendet…", "Thank you! We'll be in touch within 24 hours.": "Danke! Wir melden uns innerhalb von 24 Stunden.",
    Home: "Startseite", "The Challenge": "Die Herausforderung", "The Ascendra Solution": "Die Ascendra-Lösung",
    "Key Capabilities": "Hauptfunktionen", "How It Works": "So funktioniert es", "See It in Action": "In Aktion sehen",
    "Related Features": "Verwandte Funktionen", "Player Experience": "Spielererlebnis", "Operator Admin": "Betreiber-Admin",
    "Privacy Policy": "Datenschutzerklärung", "Terms of Service": "Nutzungsbedingungen",
    "Operator Backoffice": "Betreiber-Backoffice", Games: "Spiele", Sports: "Sport", Bonus: "Bonus", CRM: "CRM",
    Affiliate: "Affiliate", Analytics: "Analytik", Security: "Sicherheit", Compliance: "Compliance", Admin: "Admin",
    "250+ Game Integrations": "250+ Spielintegrationen", "Complete Sportsbook": "Vollständige Sportwetten",
    "Transparent Wallet": "Transparente Wallet", "50+ Payment Gateways": "50+ Zahlungsgateways",
    "Complete Bonus Engine": "Vollständige Bonus-Engine", "Affiliate System": "Affiliate-System",
    "Business Intelligence": "Business Intelligence", "Risk & Compliance": "Risiko & Compliance",
    "One Control Panel for Everything": "Ein Control Panel für alles",
    "One Platform, 250+ Integrations": "Eine Plattform, 250+ Integrationen",
    "Complete Sportsbook, Built In": "Vollständige Sportwetten, integriert",
    "Every Transaction Accounted For": "Jede Transaktion erfasst",
    "50+ Gateways, Global Reach": "50+ Gateways, globale Reichweite",
    "Every Promotion Type You Need": "Jeder Promotionstyp, den Sie brauchen",
    "Grow and Retain Your Players": "Spieler gewinnen und binden",
    "Grow Through Partners": "Wachstum durch Partner",
    "Know Your Numbers": "Kennen Sie Ihre Zahlen",
    "Stop Fraud Before It Costs You": "Betrug stoppen, bevor er Sie kostet",
    "Operate with Confidence": "Mit Vertrauen operieren",
    "Browse Catalog": "Katalog durchsuchen", "Player Launches": "Spieler startet", "Bet & Settle": "Wette & Abrechnung",
    "Report & Reconcile": "Bericht & Abgleich", "Select Event": "Event wählen", "Build Bet Slip": "Wettschein erstellen",
    "Place & Settle": "Platzieren & Abrechnen", "Track & Report": "Verfolgen & Berichten",
    "Player Action": "Spieleraktion", "Ledger Entry": "Ledger-Eintrag", "Balance Update": "Saldo-Update",
    "Audit & Export": "Audit & Export", "Player Deposits": "Spielereinzahlungen", "Auto Credit": "Auto-Gutschrift",
    "Withdrawal Request": "Auszahlungsanfrage", "Operator Approval": "Betreiberfreigabe",
    "Configure Policy": "Richtlinie konfigurieren", "Player Qualifies": "Spieler qualifiziert",
    "Claim & Play": "Einlösen & Spielen", "Convert or Expire": "Umwandeln oder Verfallen",
    "Define Segment": "Segment definieren", "Build Campaign": "Kampagne erstellen",
    "Launch & Target": "Starten & Zielen", "Measure Results": "Ergebnisse messen",
    "Partner Onboards": "Partner onboardet", "Player Registers": "Spieler registriert",
    "Activity Tracked": "Aktivität verfolgt", "Commission Paid": "Provision gezahlt",
    "Data Captured": "Daten erfasst", Aggregated: "Aggregiert", Visualized: "Visualisiert", "Acted On": "Gehandelt",
    "Risk Evaluation": "Risikobewertung", Decision: "Entscheidung", "Audit Log": "Audit-Protokoll",
    "Player Onboards": "Spieler onboardet", "Documents Reviewed": "Dokumente geprüft",
    "Limits Applied": "Limits angewendet", "Ongoing Monitor": "Laufende Überwachung",
    "Role Login": "Rollen-Login", "Monitor Dashboard": "Dashboard überwachen",
    "Take Action": "Maßnahme ergreifen", "Audit Trail": "Audit-Trail",
    "Flexible Plans": "Flexible Pläne", "Plans Built for Every Stage": "Pläne für jede Phase",
    "Connect Everything": "Alles verbinden", Slots: "Spielautomaten", "Live Casino": "Live-Casino", "Table Games": "Tischspiele",
    "Payment Types": "Zahlungsarten", Crypto: "Krypto", "Bank Transfer": "Banküberweisung", "E-wallet": "E-Wallet",
    "Contact for quote": "Angebot anfordern", Starter: "Starter", Launch: "Start", Professional: "Professional", Growth: "Wachstum", Enterprise: "Enterprise",
    "North America": "Nordamerika", Europe: "Europa", "Latin America": "Lateinamerika", "Asia Pacific": "Asien-Pazifik",
    "Middle East & Africa": "Naher Osten & Afrika", Other: "Sonstige", "Integration Only": "Nur Integration",
    "Not sure yet": "Noch unsicher", "1–3 months": "1–3 Monate", "3–6 months": "3–6 Monate", "6–12 months": "6–12 Monate", "12+ months": "12+ Monate",
    "Get a Personalized Quote": "Personalisiertes Angebot erhalten",
    "Need a Specific Vendor or Payment Method?": "Bestimmten Anbieter oder Zahlungsmethode benötigt?",
  },
};
