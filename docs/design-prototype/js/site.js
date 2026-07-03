(function () {
  var NAV = {
    home: "index.html",
    features: "index.html#features",
    solutions: "index.html#brands",
    integrations: "integrations.html",
    pricing: "pricing.html",
    contact: "contact.html"
  };

  function setActiveNav() {
    var page = document.body.dataset.page;
    document.querySelectorAll(".nav a[data-nav]").forEach(function (link) {
      if (link.dataset.nav === page) link.classList.add("active");
    });
  }

  window.ASCENDRA_NAV = NAV;
  document.addEventListener("DOMContentLoaded", setActiveNav);
})();
