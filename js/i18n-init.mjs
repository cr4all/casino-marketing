import { initI18n, t, getLocale, setLocale, SUPPORTED_LOCALES, flagUrl } from "./i18n.mjs";

function q(sel, root = document) {
  return root.querySelector(sel);
}

function qa(sel, root = document) {
  return [...root.querySelectorAll(sel)];
}

function setAll(sel, key, vars) {
  qa(sel).forEach((el) => {
    el.textContent = t(key, vars);
  });
}

function applyCommon() {
  setAll(".brand-tag", "common.brandTag");
  setAll(".footer-brand > p", "common.footer.tagline");
  setAll(".footer-bottom span", "common.footer.copyright");

  const navMap = {
    home: "common.nav.home",
    features: "common.nav.features",
    solutions: "common.nav.solutions",
    integrations: "common.nav.integrations",
    pricing: "common.nav.pricing",
    contact: "common.nav.contact",
  };
  Object.entries(navMap).forEach(([nav, key]) => {
    qa(`.nav a[data-nav="${nav}"], .mobile-drawer-nav a[data-nav="${nav}"]`).forEach((el) => {
      el.textContent = t(key);
    });
  });

  qa(".header-actions .btn-secondary, .mobile-drawer-actions .btn-secondary").forEach((el) => {
    if (el.getAttribute("href")?.includes("contact")) el.textContent = t("common.actions.contact");
  });
  qa('.header-actions .btn-primary, .mobile-drawer-actions .btn-primary, .mobile-cta .btn-primary, .cta-banner .btn-primary').forEach((el) => {
    el.textContent = t("common.actions.requestDemo");
  });

  const hamburger = q(".hamburger");
  if (hamburger) hamburger.setAttribute("aria-label", t("common.aria.openMenu"));

  const footerColConfig = [
    { heading: "common.footer.platform", links: ["common.footer.features", "common.footer.integrations", "common.footer.operatorBackoffice"] },
    { heading: "common.footer.solutions", links: ["common.footer.turnkey", "common.footer.whiteLabel", "common.footer.prices"] },
    { heading: "common.footer.legal", links: ["common.footer.contact", "common.footer.privacy", "common.footer.terms", "common.footer.amlPolicy", "common.footer.responsibleGaming"] },
  ];
  qa(".footer-col").forEach((col, i) => {
    const cfg = footerColConfig[i];
    if (!cfg) return;
    const h4 = col.querySelector("h4");
    if (h4) h4.textContent = t(cfg.heading);
    col.querySelectorAll("a").forEach((a, j) => {
      if (cfg.links[j]) a.textContent = t(cfg.links[j]);
    });
  });

  qa(".cta-banner h2").forEach((el) => { el.textContent = t("common.cta.readyTitle"); });
  qa(".cta-banner p").forEach((el) => { el.textContent = t("common.cta.readySub"); });
}

function applyStats(containerSel) {
  const container = q(containerSel);
  if (!container) return;
  const labels = qa(".stat-label", container);
  const keys = [
    "common.stats.gameIntegrations",
    "common.stats.paymentGateways",
    "common.stats.gamesAvailable",
    "common.stats.sportsbook",
    "common.stats.bonusTypes",
  ];
  labels.forEach((el, i) => { if (keys[i]) el.textContent = t(keys[i]); });
  const fullNum = q(".stat-num.text", container);
  if (fullNum) fullNum.textContent = t("common.stats.full");
}

function applyHome() {
  const pageTitle = t("home.meta.title");
  if (pageTitle && typeof pageTitle === "string") document.title = pageTitle;

  const badge = q(".hero-badge");
  if (badge) badge.textContent = t("home.hero.badge");

  const h1 = q(".hero h1");
  if (h1) {
    const highlight = t("home.hero.titleHighlight");
    h1.innerHTML = t("home.hero.title").replace(highlight, `<span>${highlight}</span>`);
  }

  const heroSub = q(".hero-sub");
  if (heroSub) heroSub.textContent = t("home.hero.sub");

  qa(".hero-cta .btn-primary").forEach((el) => { el.textContent = t("common.actions.requestDemo"); });
  qa(".hero-cta .btn-secondary").forEach((el) => { el.textContent = t("common.actions.exploreFeatures"); });

  const kpiLabels = qa(".kpi-label");
  const kpiKeys = ["home.kpi.ggrToday", "home.kpi.deposits", "home.kpi.activePlayers"];
  kpiLabels.forEach((el, i) => { if (kpiKeys[i]) el.textContent = t(kpiKeys[i]); });

  applyStats(".stats");

  qa(".trust-label").forEach((el, i) => {
    const keys = ["home.trust.auditWallet", "home.trust.fullSportsbook", "home.trust.antiFraud", "home.trust.marketingCrm"];
    if (keys[i]) el.textContent = t(keys[i]);
  });

  const featHeader = q("#features .section-header");
  if (featHeader) {
    q("h2", featHeader).textContent = t("home.featuresSection.title");
    q("p", featHeader).textContent = t("home.featuresSection.sub");
  }

  const cards = t("home.featureCards");
  if (Array.isArray(cards)) {
    qa(".feature-card").forEach((card, i) => {
      const data = cards[i];
      if (!data) return;
      const badgeEl = q(".feature-visual-badge", card);
      if (badgeEl) badgeEl.textContent = data.badge;
      q("h3", card).textContent = data.title;
      q("p", card).textContent = data.desc;
      q(".feature-link", card).textContent = t("common.actions.learnMore");
    });
  }

  const flowHeader = q(".flow .section-header");
  if (flowHeader) {
    q("h2", flowHeader).textContent = t("home.flow.title");
    q("p", flowHeader).textContent = t("home.flow.sub");
  }
  const flowTitles = qa(".flow-step-title");
  const flowKeys = ["home.flow.player", "home.flow.platform", "home.flow.wallet", "home.flow.casinoSports"];
  flowTitles.forEach((el, i) => { if (flowKeys[i]) el.textContent = t(flowKeys[i]); });

  qa(".marquee-label").forEach((el, i) => {
    el.textContent = i === 0 ? t("home.marquee.vendors") : t("home.marquee.payments");
  });

  const brandsHeader = q("#brands .section-header");
  if (brandsHeader) {
    q("h2", brandsHeader).textContent = t("home.brands.title");
    q("p", brandsHeader).textContent = t("home.brands.sub");
  }
  qa(".brand-badge").forEach((el) => {
    if (el.textContent.includes("Coming")) el.textContent = t("common.badges.comingSoon");
  });
  const brandsCta = q(".brands-cta .btn");
  if (brandsCta) brandsCta.textContent = t("common.actions.becomeSuccess");

  const compareHeader = q(".compare-grid")?.closest(".section")?.querySelector(".section-header");
  if (compareHeader) {
    q("h2", compareHeader).textContent = t("home.compare.title");
    q("p", compareHeader).textContent = t("home.compare.sub");
  }
  const compareCols = qa(".compare-col");
  if (compareCols[0]) {
    const badge = q(".compare-badge", compareCols[0]);
    if (badge) badge.textContent = t("common.badges.popular");
    q("h3", compareCols[0]).textContent = t("home.compare.turnkey.title");
    qa(".checklist li", compareCols[0]).forEach((li, i) => {
      const item = t("home.compare.turnkey.items")[i];
      if (item) li.innerHTML = `<span class="check">✓</span> ${item}`;
    });
  }
  if (compareCols[1]) {
    q("h3", compareCols[1]).textContent = t("home.compare.whiteLabel.title");
    qa(".checklist li", compareCols[1]).forEach((li, i) => {
      const item = t("home.compare.whiteLabel.items")[i];
      if (item) li.innerHTML = `<span class="check">✓</span> ${item}`;
    });
  }
}

function applyContact() {
  const hero = q(".page-hero-inner");
  if (hero) {
    const badge = q(".page-hero-badge", hero);
    if (badge) badge.textContent = t("contact.hero.badge");
    q("h1", hero).textContent = t("contact.hero.title");
    q(".page-hero-sub", hero).textContent = t("contact.hero.sub");
  }

  const labels = {
    company: "contact.form.company",
    "first-name": "contact.form.firstName",
    "last-name": "contact.form.lastName",
    email: "contact.form.email",
    country: "contact.form.country",
    solution: "contact.form.solution",
    launch: "contact.form.launch",
    message: "contact.form.message",
  };
  Object.entries(labels).forEach(([id, key]) => {
    const label = q(`label[for="${id}"]`);
    if (!label) return;
    const req = label.querySelector(".req");
    label.textContent = "";
    label.append(document.createTextNode(t(key) + " "));
    if (req) label.appendChild(req);
  });

  const ph = t("contact.form.placeholders");
  if (q("#company")) q("#company").placeholder = ph.company;
  if (q("#first-name")) q("#first-name").placeholder = ph.firstName;
  if (q("#last-name")) q("#last-name").placeholder = ph.lastName;
  if (q("#email")) q("#email").placeholder = ph.email;
  if (q("#message")) q("#message").placeholder = ph.message;

  const countries = t("contact.form.countries");
  const countrySel = q("#country");
  if (countrySel) {
    [...countrySel.options].forEach((opt) => {
      if (!opt.value) opt.textContent = countries.placeholder;
      else if (countries[opt.value]) opt.textContent = countries[opt.value];
    });
  }

  const solutions = t("contact.form.solutions");
  const solSel = q("#solution");
  if (solSel) {
    [...solSel.options].forEach((opt) => {
      if (!opt.value) opt.textContent = solutions.placeholder;
      else if (opt.value === "turnkey") opt.textContent = solutions.turnkey;
      else if (opt.value === "white-label") opt.textContent = solutions.whiteLabel;
      else if (opt.value === "integration") opt.textContent = solutions.integration;
    });
  }

  const launch = t("contact.form.launchOptions");
  const launchSel = q("#launch");
  if (launchSel) {
    [...launchSel.options].forEach((opt) => {
      const map = { "": launch.notSure, "1-3": launch.m1_3, "3-6": launch.m3_6, "6-12": launch.m6_12, "12+": launch.m12plus };
      if (map[opt.value] !== undefined) opt.textContent = map[opt.value];
    });
  }

  const consent = q('label[for="consent"]');
  if (consent) consent.innerHTML = t("contact.form.consent");

  const submitBtn = q('#contact-form button[type="submit"]');
  if (submitBtn) submitBtn.textContent = t("common.actions.submitRequest");

  const modalTitle = q("#contact-modal-title");
  const modalMessage = q("#contact-modal-message");
  const modalClose = q("#contact-modal-close");
  if (modalTitle) modalTitle.textContent = t("contact.messages.successTitle");
  if (modalMessage) modalMessage.textContent = t("contact.messages.success");
  if (modalClose) modalClose.textContent = t("contact.messages.close");

  const sidebar = qa(".sidebar-card");
  if (sidebar[0]) {
    q(".response-badge", sidebar[0]).textContent = t("contact.sidebar.responseBadge");
    q("h3", sidebar[0]).textContent = t("contact.sidebar.talkTitle");
    q("p", sidebar[0]).textContent = t("contact.sidebar.talkSub");
  }
  if (sidebar[1]) {
    q("h3", sidebar[1]).textContent = t("contact.sidebar.seeTitle");
    qa("li", sidebar[1]).forEach((li, i) => {
      const item = t("contact.sidebar.seeItems")[i];
      if (item) li.textContent = item;
    });
  }
}

function applyPricing() {
  const hero = q(".page-hero-inner");
  if (hero) {
    const badge = q(".page-hero-badge", hero);
    if (badge) badge.textContent = t("pricing.hero.badge");
    q("h1", hero).textContent = t("pricing.hero.title");
    q(".page-hero-sub", hero).textContent = t("pricing.hero.sub");
  }

  const tierKeys = ["starter", "growth", "enterprise"];
  qa(".pricing-card").forEach((card, i) => {
    const tier = t(`pricing.tiers.${tierKeys[i]}`);
    if (!tier || typeof tier !== "object") return;
    q(".pricing-tier", card).textContent = tier.tier;
    q("h3", card).textContent = tier.name;
    q(".pricing-target", card).textContent = tier.target;
    q(".pricing-price", card).textContent = tier.price;
    qa(".pricing-list li", card).forEach((li, j) => {
      if (tier.items[j]) li.innerHTML = `<span class="check">✓</span> ${tier.items[j]}`;
    });
    const badge = q(".pricing-badge", card);
    if (badge) badge.textContent = t("common.badges.popular");
    const btn = q(".btn", card);
    if (btn) {
      btn.textContent = btn.classList.contains("btn-primary")
        ? t("common.actions.requestDemo")
        : t("common.actions.contactSales");
    }
  });

  const note = q(".pricing-note");
  if (note) note.textContent = t("pricing.note");

  const cmpHeader = q(".bg-subtle-section .section-header");
  if (cmpHeader) {
    q("h2", cmpHeader).textContent = t("pricing.compare.title");
    q("p", cmpHeader).textContent = t("pricing.compare.sub");
  }
  const psCards = qa(".ps-card");
  if (psCards[0]) {
    q("h3", psCards[0]).textContent = t("pricing.compare.turnkey.title");
    q("p", psCards[0]).textContent = t("pricing.compare.turnkey.desc");
    qa(".pricing-list li", psCards[0]).forEach((li, i) => {
      const item = t("pricing.compare.turnkey.items")[i];
      if (item) li.innerHTML = `<span class="check">✓</span> ${item}`;
    });
  }
  if (psCards[1]) {
    q("h3", psCards[1]).textContent = t("pricing.compare.whiteLabel.title");
    q("p", psCards[1]).textContent = t("pricing.compare.whiteLabel.desc");
    qa(".pricing-list li", psCards[1]).forEach((li, i) => {
      const item = t("pricing.compare.whiteLabel.items")[i];
      if (item) li.innerHTML = `<span class="check">✓</span> ${item}`;
    });
  }

  const cta = q(".cta-banner");
  if (cta && document.body.dataset.page === "pricing") {
    q("h2", cta).textContent = t("pricing.cta.title");
    q("p", cta).textContent = t("pricing.cta.sub");
    q(".btn", cta).textContent = t("common.actions.contactForQuote");
  }
}

function applyIntegrations() {
  const hero = q(".page-hero-inner");
  if (hero) {
    const badge = q(".page-hero-badge", hero);
    if (badge) badge.textContent = t("integrations.hero.badge");
    q("h1", hero).textContent = t("integrations.hero.title");
    q(".page-hero-sub", hero).textContent = t("integrations.hero.sub");
  }

  applyStats(".stats-bar");

  const vendorHeader = q(".section-header");
  if (vendorHeader) {
    q("h2", vendorHeader).textContent = t("integrations.vendors.title");
    q("p", vendorHeader).textContent = t("integrations.vendors.sub");
  }

  const tabKeys = ["slots", "live", "table"];
  qa(".int-tab").forEach((tab, i) => {
    const span = q("span", tab);
    if (span && tabKeys[i]) span.textContent = t(`integrations.vendors.tabs.${tabKeys[i]}`);
  });

  const payHeader = q(".bg-subtle-section .section-header");
  if (payHeader) {
    q("h2", payHeader).textContent = t("integrations.payments.title");
    q("p", payHeader).textContent = t("integrations.payments.sub");
  }

  const payCards = qa(".payment-type-card");
  const payKeys = ["crypto", "fiat", "bank", "ewallet"];
  payCards.forEach((card, i) => {
    const data = t(`integrations.payments.${payKeys[i]}`);
    if (data && typeof data === "object") {
      q("h3", card).textContent = data.title;
      q("p", card).textContent = data.desc;
    }
  });

  const cta = q(".cta-banner");
  if (cta && document.body.dataset.page === "integrations") {
    q("h2", cta).textContent = t("integrations.cta.title");
    q("p", cta).textContent = t("integrations.cta.sub");
    q(".btn", cta).textContent = t("common.actions.contactUs");
  }
}

function applyFeatureShell() {
  qa(".breadcrumb a").forEach((a) => {
    if (a.textContent.trim() === "Home") a.textContent = t("feature.breadcrumb.home");
    if (a.textContent.trim() === "Features") a.textContent = t("feature.breadcrumb.features");
  });

  qa(".page-hero .btn-primary").forEach((el) => {
    if (el.textContent.includes("Demo")) el.textContent = t("common.actions.requestDemo");
  });

  qa(".section .section-header, .bg-subtle-section .section-header").forEach((header, i) => {
    const configs = [
      ["feature.shell.capabilitiesTitle", "feature.shell.capabilitiesSub"],
      ["feature.shell.howTitle", "feature.shell.howSub"],
      ["feature.shell.seeTitle", "feature.shell.seeSub"],
      ["feature.shell.relatedTitle", "feature.shell.relatedSub"],
    ];
    const cfg = configs[i];
    if (!cfg) return;
    const h2 = q("h2", header);
    if (h2) h2.textContent = t(cfg[0]);
    const p = q("p", header);
    if (p) p.textContent = t(cfg[1]);
  });

  qa(".screenshot-label").forEach((el, i) => {
    el.textContent = i === 0 ? t("feature.shell.playerExperience") : t("feature.shell.operatorAdmin");
  });
}

function applyLegal() {
  const path = window.location.pathname;
  const docMap = {
    "privacy.html": "privacy",
    "terms.html": "terms",
    "aml-policy.html": "aml",
    "responsible-gaming.html": "responsible",
  };
  let docKey = null;
  for (const [file, key] of Object.entries(docMap)) {
    if (path.endsWith(file)) { docKey = key; break; }
  }

  qa(".legal-nav a").forEach((a) => {
    const href = a.getAttribute("href") || "";
    if (href.includes("privacy")) a.textContent = t("legal.nav.privacy");
    if (href.includes("terms")) a.textContent = t("legal.nav.terms");
    if (href.includes("aml")) a.textContent = t("legal.nav.aml");
    if (href.includes("responsible")) a.textContent = t("legal.nav.responsible");
  });

  if (!docKey) return;
  const doc = t(`legal.${docKey}`);
  if (!doc || typeof doc !== "object") return;

  const hero = q(".page-hero-inner");
  if (hero) {
    q("h1", hero).textContent = doc.title;
    const sub = q(".page-hero-sub", hero);
    if (sub) sub.textContent = doc.sub;
  }
  document.title = `${doc.title} — Ascendra Platforms`;

  const content = q(".legal-content");
  if (!content || !Array.isArray(doc.sections)) return;

  content.innerHTML = doc.sections.map((sec) => {
    if (sec.type === "updated") {
      const text = sec.html.replace(/<\/?p[^>]*>/g, "").trim();
      return `<p class="legal-updated">${text || doc.updated || ""}</p>`;
    }
    if (sec.type === "section") {
      return `<h2>${sec.heading}</h2>${sec.html}`;
    }
    return "";
  }).join("\n");
}

function applyPage() {
  applyCommon();
  const page = document.body.dataset.page;
  const runners = {
    home: applyHome,
    contact: applyContact,
    pricing: applyPricing,
    integrations: applyIntegrations,
    feature: applyFeatureShell,
    legal: applyLegal,
  };
  const fn = runners[page];
  if (!fn) return;
  try {
    fn();
  } catch (err) {
    console.error(`[i18n] Failed to apply translations for page "${page}":`, err);
  }
}

function createFlagImg(flagCode, label) {
  const img = document.createElement("img");
  img.className = "lang-flag-img";
  img.src = flagUrl(flagCode);
  img.srcset = `${flagUrl(flagCode)} 1x, ${flagUrl(flagCode)} 2x`;
  img.alt = label;
  img.width = 24;
  img.height = 18;
  img.loading = "lazy";
  img.decoding = "async";
  return img;
}

function positionLangMenu(wrap, trigger, menu) {
  if (!wrap.classList.contains("open")) return;
  const rect = trigger.getBoundingClientRect();
  menu.style.position = "fixed";
  menu.style.top = `${rect.bottom + 8}px`;
  menu.style.zIndex = "1000";
  if (document.documentElement.dir === "rtl") {
    menu.style.left = `${Math.max(8, rect.left)}px`;
    menu.style.right = "auto";
  } else {
    menu.style.right = `${Math.max(8, window.innerWidth - rect.right)}px`;
    menu.style.left = "auto";
  }
}

function initLangSwitcher() {
  const headerInner = q(".header-inner");
  if (!headerInner) return;

  const hamburger = q(".hamburger", headerInner);
  let wrap = q(".lang-switcher", headerInner);

  if (!wrap) {
    wrap = document.createElement("div");
    wrap.className = "lang-switcher";

    const trigger = document.createElement("button");
    trigger.type = "button";
    trigger.className = "lang-trigger";
    trigger.setAttribute("aria-haspopup", "listbox");
    trigger.setAttribute("aria-expanded", "false");

    const flagWrap = document.createElement("span");
    flagWrap.className = "lang-flag";
    trigger.appendChild(flagWrap);

    const menu = document.createElement("div");
    menu.className = "lang-menu";
    menu.setAttribute("role", "listbox");

    wrap.appendChild(trigger);
    wrap.appendChild(menu);

    if (hamburger) headerInner.insertBefore(wrap, hamburger);
    else headerInner.appendChild(wrap);

    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const open = wrap.classList.toggle("open");
      trigger.setAttribute("aria-expanded", open ? "true" : "false");
      qa(".lang-switcher.open").forEach((el) => {
        if (el !== wrap) el.classList.remove("open");
      });
      positionLangMenu(wrap, trigger, menu);
    });

    document.addEventListener("click", () => {
      wrap.classList.remove("open");
      trigger.setAttribute("aria-expanded", "false");
    });

    window.addEventListener("resize", () => positionLangMenu(wrap, trigger, menu));
    window.addEventListener("scroll", () => positionLangMenu(wrap, trigger, menu), true);

    wrap.addEventListener("click", (e) => e.stopPropagation());
  }

  const trigger = q(".lang-trigger", wrap);
  const menu = q(".lang-menu", wrap);
  const flagWrap = q(".lang-flag", trigger);
  const current = SUPPORTED_LOCALES.find((l) => l.code === getLocale()) || SUPPORTED_LOCALES[0];

  trigger.setAttribute("aria-label", `${t("common.aria.selectLanguage")}: ${current.label}`);
  flagWrap.innerHTML = "";
  flagWrap.appendChild(createFlagImg(current.flagCode, current.label));

  menu.innerHTML = "";
  SUPPORTED_LOCALES.forEach((loc) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "lang-option";
    btn.dataset.lang = loc.code;
    btn.setAttribute("role", "option");
    btn.setAttribute("aria-label", loc.label);
    btn.setAttribute("aria-selected", loc.code === getLocale() ? "true" : "false");
    btn.appendChild(createFlagImg(loc.flagCode, loc.label));
    btn.addEventListener("click", () => {
      wrap.classList.remove("open");
      trigger.setAttribute("aria-expanded", "false");
      if (loc.code === getLocale()) return;
      setLocale(loc.code).then(refreshTranslations);
    });
    menu.appendChild(btn);
  });

  const oldSelect = q(".lang-select", headerInner);
  if (oldSelect) oldSelect.closest(".lang-switcher")?.remove();
}

export function refreshTranslations() {
  try {
    applyPage();
  } catch (err) {
    console.error("[i18n] applyPage failed:", err);
  }
  initLangSwitcher();
  window.dispatchEvent(new CustomEvent("i18nready"));
}

document.addEventListener("DOMContentLoaded", async () => {
  await initI18n();
  refreshTranslations();
});

window.AscendraI18n = { t, getLocale, setLocale, SUPPORTED_LOCALES, refreshTranslations, initLangSwitcher };

window.addEventListener("localechange", refreshTranslations);
