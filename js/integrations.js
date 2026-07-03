(function () {
  document.addEventListener("DOMContentLoaded", function () {
    var tabs = document.querySelectorAll(".int-tab");
    var panels = document.querySelectorAll(".int-panel");
    if (!tabs.length) return;

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var target = tab.dataset.tab;
        tabs.forEach(function (t) {
          t.classList.remove("active");
          t.setAttribute("aria-selected", "false");
        });
        panels.forEach(function (p) {
          p.classList.toggle("active", p.dataset.panel === target);
        });
        tab.classList.add("active");
        tab.setAttribute("aria-selected", "true");
      });
    });
  });
})();
