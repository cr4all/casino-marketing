(function () {
  function getSlug() {
    var params = new URLSearchParams(window.location.search);
    var slug = params.get("slug");
    if (slug && FEATURES[slug]) return slug;
    var hash = window.location.hash.replace("#", "");
    if (hash && FEATURES[hash]) return hash;
    return "sportsbook";
  }

  function esc(text) {
    var d = document.createElement("div");
    d.textContent = text;
    return d.innerHTML;
  }

  function renderFeature(slug) {
    var f = FEATURES[slug];
    if (!f) {
      window.location.href = "index.html";
      return;
    }

    document.title = f.title + " — Ascendra Platforms";
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

    var capGrid = document.getElementById("cap-grid");
    capGrid.innerHTML = f.capabilities.map(function (c) {
      return '<div class="cap-item"><span class="cap-check">✓</span><span>' + esc(c) + "</span></div>";
    }).join("");

    var stepsRow = document.getElementById("steps-row");
    stepsRow.innerHTML = f.steps.map(function (s, i) {
      return (
        '<div class="step-card">' +
        '<div class="step-num">' + (i + 1) + "</div>" +
        "<h4>" + esc(s.title) + "</h4>" +
        "<p>" + esc(s.desc) + "</p></div>"
      );
    }).join("");

    document.getElementById("screenshot-player").src = f.screenshotPlayer;
    document.getElementById("screenshot-admin").src = f.screenshotAdmin;

    var relatedGrid = document.getElementById("related-grid");
    relatedGrid.innerHTML = f.related.map(function (relSlug) {
      var r = FEATURES[relSlug];
      if (!r) return "";
      return (
        '<a class="related-card" href="feature.html?slug=' + relSlug + '">' +
        '<img src="' + r.heroImage + '" alt="" loading="lazy" />' +
        '<div class="related-body"><h4>' + esc(r.title) + "</h4>" +
        "<p>" + esc(r.heroSub.slice(0, 80)) + "…</p></div></a>"
      );
    }).join("");
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderFeature(getSlug());
  });
})();
