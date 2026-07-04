(function () {
  var NAV = {
    home: "index.html",
    features: "index.html#features",
    solutions: "index.html#brands",
    integrations: "integrations.html",
    pricing: "prices.html",
    contact: "contact.html"
  };

  function setActiveNav() {
    var page = document.body.dataset.page;
    document.querySelectorAll(".nav a[data-nav], .mobile-drawer-nav a[data-nav]").forEach(function (link) {
      link.classList.toggle("active", link.dataset.nav === page);
    });
  }

  function initMobileNav() {
    if (document.body.dataset.mobileNavReady === "1") return;
    var nav = document.querySelector(".nav");
    var hamburger = document.querySelector(".hamburger");
    if (!nav || !hamburger) return;

    var backdrop = document.createElement("div");
    backdrop.className = "mobile-drawer-backdrop";
    backdrop.setAttribute("aria-hidden", "true");

    var drawer = document.createElement("aside");
    drawer.className = "mobile-drawer";
    drawer.setAttribute("aria-hidden", "true");
    drawer.setAttribute("aria-label", "Mobile navigation");

    var drawerNav = nav.cloneNode(true);
    drawerNav.className = "mobile-drawer-nav";
    drawer.appendChild(drawerNav);

    var actions = document.querySelector(".header-actions");
    if (actions) {
      var drawerActions = actions.cloneNode(true);
      drawerActions.className = "mobile-drawer-actions";
      drawer.appendChild(drawerActions);
    }

    document.body.appendChild(backdrop);
    document.body.appendChild(drawer);

    function closeDrawer() {
      drawer.classList.remove("open");
      backdrop.classList.remove("open");
      document.body.classList.remove("nav-open");
      hamburger.setAttribute("aria-expanded", "false");
      drawer.setAttribute("aria-hidden", "true");
      backdrop.setAttribute("aria-hidden", "true");
    }

    function openDrawer() {
      drawer.classList.add("open");
      backdrop.classList.add("open");
      document.body.classList.add("nav-open");
      hamburger.setAttribute("aria-expanded", "true");
      drawer.setAttribute("aria-hidden", "false");
      backdrop.setAttribute("aria-hidden", "false");
    }

    hamburger.setAttribute("aria-expanded", "false");
    hamburger.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (drawer.classList.contains("open")) closeDrawer();
      else openDrawer();
    });

    backdrop.addEventListener("click", closeDrawer);

    drawer.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeDrawer);
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 768) closeDrawer();
    });

    document.body.dataset.mobileNavReady = "1";
    updateDrawerLabels();
  }

  function updateDrawerLabels() {
    var i18n = window.AscendraI18n;
    if (!i18n) return;
    document.querySelectorAll(".mobile-drawer").forEach(function (drawer) {
      drawer.setAttribute("aria-label", i18n.t("common.aria.mobileNav"));
    });
  }

  window.ASCENDRA_NAV = NAV;

  document.addEventListener("DOMContentLoaded", function () {
    setActiveNav();
    initMobileNav();
  });

  document.addEventListener("i18nready", function () {
    setActiveNav();
    updateDrawerLabels();
  });
})();
