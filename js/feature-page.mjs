import { getFeatures, t } from "./i18n.mjs";

function getSlug() {
  const FEATURES = getFeatures();
  const fromBody = document.body.dataset.featureSlug;
  if (fromBody && FEATURES[fromBody]) return fromBody;

  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");
  if (slug && FEATURES[slug]) return slug;

  const hash = window.location.hash.replace("#", "");
  if (hash && FEATURES[hash]) return hash;

  return "sportsbook";
}

function esc(text) {
  const d = document.createElement("div");
  d.textContent = text;
  return d.innerHTML;
}

function featureHref(slug) {
  const inFeaturesDir = /\/features\//.test(window.location.pathname);
  return inFeaturesDir ? `${slug}.html` : `features/${slug}.html`;
}

function renderFeature(slug) {
  const FEATURES = getFeatures();
  const f = FEATURES[slug];
  if (!f) {
    window.location.href = "/index.html";
    return;
  }

  document.title = `${f.title} — Ascendra Platforms`;

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", f.heroSub);

  document.getElementById("breadcrumb-title").textContent = f.title;
  document.getElementById("hero-badge").textContent = f.badge;
  document.getElementById("hero-h1").textContent = f.heroH1;
  document.getElementById("hero-sub").textContent = f.heroSub;
  document.getElementById("hero-img").src = f.heroImage;
  document.getElementById("hero-img").alt = f.title;
  document.getElementById("problem-title").textContent = f.problemTitle;
  document.getElementById("problem-text").textContent = f.problem;
  document.getElementById("solution-title").textContent = f.solutionTitle;
  document.getElementById("solution-text").textContent = f.solution;

  document.getElementById("cap-grid").innerHTML = f.capabilities
    .map(
      (c) =>
        `<div class="cap-item"><span class="cap-check">✓</span><span>${esc(c)}</span></div>`
    )
    .join("");

  document.getElementById("steps-row").innerHTML = f.steps
    .map(
      (s, i) =>
        `<div class="step-card"><div class="step-num">${i + 1}</div><h4>${esc(s.title)}</h4><p>${esc(s.desc)}</p></div>`
    )
    .join("");

  document.getElementById("screenshot-player").src = f.screenshotPlayer;
  document.getElementById("screenshot-admin").src = f.screenshotAdmin;

  document.getElementById("related-grid").innerHTML = f.related
    .map((relSlug) => {
      const r = FEATURES[relSlug];
      if (!r) return "";
      return `<a class="related-card" href="${featureHref(relSlug)}"><img src="${r.heroImage}" alt="" loading="lazy" /><div class="related-body"><h4>${esc(r.title)}</h4><p>${esc(r.heroSub.slice(0, 80))}…</p></div></a>`;
    })
    .join("");
}

function init() {
  renderFeature(getSlug());
}

document.addEventListener("i18nready", init);
window.addEventListener("localechange", init);
