const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT || "";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const toast = document.getElementById("toast");
  if (!form || !toast) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn?.textContent;
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending…";
    }

    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      if (ENDPOINT) {
        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Request failed");
      }

      toast.textContent = ENDPOINT
        ? "Thank you! We'll be in touch within 24 hours."
        : "Thank you! (Demo mode — set VITE_CONTACT_ENDPOINT to enable delivery.)";
      toast.classList.add("show");
      form.reset();
    } catch {
      toast.textContent = "Something went wrong. Please email sales@ascendraplatforms.com";
      toast.classList.add("show");
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText || "Submit Request";
      }
      setTimeout(() => toast.classList.remove("show"), 4500);
    }
  });
});
