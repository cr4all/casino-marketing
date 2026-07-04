import { t } from "./i18n.mjs";

const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT || "/api/contact";

function msg(key) {
  return t(key);
}

function getModal() {
  return {
    dialog: document.getElementById("contact-modal"),
    icon: document.getElementById("contact-modal-icon"),
    title: document.getElementById("contact-modal-title"),
    message: document.getElementById("contact-modal-message"),
    closeBtn: document.getElementById("contact-modal-close"),
  };
}

function showModal({ title, message, variant = "success" }) {
  const { dialog, icon, title: titleEl, message: messageEl, closeBtn } = getModal();
  if (!dialog) return;

  if (titleEl) titleEl.textContent = title;
  if (messageEl) messageEl.textContent = message;
  if (closeBtn) closeBtn.textContent = msg("contact.messages.close");
  if (icon) icon.textContent = variant === "error" ? "!" : "✓";
  dialog.dataset.variant = variant;

  if (typeof dialog.showModal === "function") {
    if (!dialog.open) dialog.showModal();
  } else {
    dialog.setAttribute("open", "");
  }
}

function hideModal() {
  const { dialog } = getModal();
  if (!dialog) return;
  if (typeof dialog.close === "function" && dialog.open) {
    dialog.close();
  } else {
    dialog.removeAttribute("open");
  }
}

function initContactForm() {
  const form = document.getElementById("contact-form");
  const modal = document.getElementById("contact-modal");
  if (!form || !modal) return;

  modal.addEventListener("click", (e) => {
    const rect = modal.querySelector(".contact-modal__panel")?.getBoundingClientRect();
    if (!rect) return;
    const inPanel =
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom;
    if (!inPanel) hideModal();
  });

  modal.addEventListener("cancel", (e) => {
    e.preventDefault();
    hideModal();
  });

  document.getElementById("contact-modal-close")?.addEventListener("click", hideModal);

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
      submitBtn.textContent = msg("contact.messages.sending");
    }

    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");

      form.reset();
      showModal({
        title: msg("contact.messages.successTitle"),
        message: msg("contact.messages.success"),
        variant: "success",
      });
    } catch {
      showModal({
        title: msg("contact.messages.errorTitle"),
        message: msg("contact.messages.error"),
        variant: "error",
      });
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText || msg("common.actions.submitRequest");
      }
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initContactForm);
} else {
  initContactForm();
}
