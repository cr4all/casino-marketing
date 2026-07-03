(function () {
  document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("contact-form");
    var toast = document.getElementById("toast");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      toast.classList.add("show");
      form.reset();
      setTimeout(function () {
        toast.classList.remove("show");
      }, 4500);
    });
  });
})();
