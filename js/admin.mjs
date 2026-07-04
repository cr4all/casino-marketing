const COUNTRY_LABELS = {
  na: "North America",
  eu: "Europe",
  latam: "Latin America",
  asia: "Asia Pacific",
  mea: "Middle East & Africa",
  other: "Other",
};

const SOLUTION_LABELS = {
  turnkey: "Turnkey",
  "white-label": "White Label",
  integration: "Integration Only",
};

const LAUNCH_LABELS = {
  "": "Not sure yet",
  "1-3": "1–3 months",
  "3-6": "3–6 months",
  "6-12": "6–12 months",
  "12+": "12+ months",
};

const MOBILE_BREAKPOINT = 1024;

let currentFilter = "new";
let selectedId = null;

function isMobileLayout() {
  return window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`).matches;
}

async function api(path, options = {}) {
  const res = await fetch(path, {
    credentials: "same-origin",
    headers: { Accept: "application/json", ...(options.headers || {}) },
    ...options,
  });
  if (res.status === 401) {
    window.location.href = "login.html";
    throw new Error("Unauthorized");
  }
  return res;
}

function fmtDate(iso) {
  if (!iso) return "—";
  const d = new Date(iso.includes("T") ? iso : iso.replace(" ", "T") + "Z");
  return d.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function esc(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function updateCount(total) {
  const el = document.getElementById("leads-count");
  if (!el) return;
  const label = currentFilter === "new" ? "new request" : "request";
  el.textContent = total === 1 ? `1 ${label}` : `${total} ${label}s`;
}

function openDetailPanel() {
  const panel = document.getElementById("lead-detail");
  const backdrop = document.getElementById("detail-backdrop");
  if (!panel || !isMobileLayout()) return;

  panel.classList.add("is-open");
  backdrop?.removeAttribute("hidden");
  requestAnimationFrame(() => backdrop?.classList.add("is-visible"));
  document.body.classList.add("admin-detail-open");
}

function closeDetailPanel() {
  selectedId = null;
  document.querySelectorAll("#leads-body tr").forEach((row) => row.classList.remove("selected"));
  renderDetail(null);
}

function renderTable(leads) {
  const tbody = document.getElementById("leads-body");
  const empty = document.getElementById("leads-empty");
  if (!tbody) return;

  updateCount(leads.length);

  if (!leads.length) {
    tbody.innerHTML = "";
    if (empty) empty.hidden = false;
    return;
  }

  if (empty) empty.hidden = true;
  tbody.innerHTML = leads
    .map(
      (lead) => `
    <tr data-id="${lead.id}" class="${selectedId === lead.id ? "selected" : ""}">
      <td data-label="Submitted">${esc(fmtDate(lead.createdAt))}</td>
      <td class="admin-cell-company" data-label="Company">${esc(lead.company)}</td>
      <td class="admin-cell-contact" data-label="Contact">${esc(lead.firstName)} ${esc(lead.lastName)}</td>
      <td data-label="Status"><span class="status-badge ${esc(lead.status)}">${esc(lead.status)}</span></td>
    </tr>`
    )
    .join("");

  tbody.querySelectorAll("tr").forEach((row) => {
    row.addEventListener("click", () => loadDetail(Number(row.dataset.id)));
  });
}

function renderDetail(lead) {
  const panel = document.getElementById("lead-detail");
  const backdrop = document.getElementById("detail-backdrop");
  if (!panel) return;

  if (!lead) {
    panel.classList.remove("is-open");
    backdrop?.classList.remove("is-visible");
    document.body.classList.remove("admin-detail-open");
    window.setTimeout(() => {
      if (!panel.classList.contains("is-open")) backdrop?.setAttribute("hidden", "");
    }, 250);
    panel.innerHTML = `
      <div class="admin-detail-empty">
        <div class="admin-empty-icon admin-empty-icon--select" aria-hidden="true"></div>
        <p>Select a request to view details.</p>
      </div>`;
    return;
  }

  const fullName = `${esc(lead.firstName)} ${esc(lead.lastName)}`;
  panel.innerHTML = `
    <div class="admin-detail">
      <div class="admin-detail-header">
        <div>
          <h2>${esc(lead.company)}</h2>
          <p class="admin-detail-sub">${fullName} · <a href="mailto:${esc(lead.email)}">${esc(lead.email)}</a></p>
        </div>
        <button type="button" class="admin-detail-close" id="detail-close-btn" aria-label="Close details">×</button>
      </div>
      <div class="admin-meta">
        <div class="admin-meta-row">
          <span class="admin-meta-label">Submitted</span>
          <span class="admin-meta-value">${esc(fmtDate(lead.createdAt))}</span>
        </div>
        <div class="admin-meta-row">
          <span class="admin-meta-label">Region</span>
          <span class="admin-meta-value">${esc(COUNTRY_LABELS[lead.country] || lead.country)}</span>
        </div>
        <div class="admin-meta-row">
          <span class="admin-meta-label">Solution</span>
          <span class="admin-meta-value">${esc(SOLUTION_LABELS[lead.solution] || lead.solution)}</span>
        </div>
        <div class="admin-meta-row">
          <span class="admin-meta-label">Launch</span>
          <span class="admin-meta-value">${esc(LAUNCH_LABELS[lead.launch] || lead.launch || "—")}</span>
        </div>
        <div class="admin-meta-row">
          <span class="admin-meta-label">Status</span>
          <span class="admin-meta-value"><span class="status-badge ${esc(lead.status)}">${esc(lead.status)}</span></span>
        </div>
        <div class="admin-meta-row">
          <span class="admin-meta-label">Consent</span>
          <span class="admin-meta-value">${lead.consent ? "Yes" : "No"}</span>
        </div>
        <div class="admin-meta-row">
          <span class="admin-meta-label">IP</span>
          <span class="admin-meta-value">${esc(lead.ip || "—")}</span>
        </div>
      </div>
      <p class="admin-section-label">Message</p>
      <div class="admin-message">${lead.message ? esc(lead.message) : "No message provided."}</div>
      <div class="admin-detail-actions">
        ${lead.status === "new" ? '<button type="button" class="btn btn-secondary btn-sm" data-action="read">Mark as read</button>' : ""}
        ${lead.status !== "archived" ? '<button type="button" class="btn btn-secondary btn-sm" data-action="archive">Archive</button>' : ""}
      </div>
    </div>`;

  panel.querySelector("#detail-close-btn")?.addEventListener("click", closeDetailPanel);
  panel.querySelector('[data-action="read"]')?.addEventListener("click", () =>
    updateStatus(lead.id, "read")
  );
  panel.querySelector('[data-action="archive"]')?.addEventListener("click", () =>
    updateStatus(lead.id, "archived")
  );

  openDetailPanel();
}

async function loadLeads() {
  const res = await api(`/api/admin/leads?status=${currentFilter}`);
  const data = await res.json();
  renderTable(data.leads);
  if (selectedId && !data.leads.some((l) => l.id === selectedId)) {
    closeDetailPanel();
  }
}

async function loadDetail(id) {
  selectedId = id;
  const res = await api(`/api/admin/leads/${id}`);
  const data = await res.json();
  renderDetail(data.lead);
  document.querySelectorAll("#leads-body tr").forEach((row) => {
    row.classList.toggle("selected", Number(row.dataset.id) === id);
  });
  if (data.lead.status === "new") {
    await updateStatus(id, "read", { reloadList: false });
  }
}

async function updateStatus(id, status, opts = { reloadList: true }) {
  await api(`/api/admin/leads/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  if (opts.reloadList) await loadLeads();
  if (selectedId === id) {
    const res = await api(`/api/admin/leads/${id}`);
    const data = await res.json();
    renderDetail(data.lead);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const me = await fetch("/api/admin/me", { credentials: "same-origin" });
  const { authenticated } = await me.json();
  if (!authenticated) {
    window.location.href = "login.html";
    return;
  }

  document.getElementById("detail-backdrop")?.addEventListener("click", closeDetailPanel);

  window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`).addEventListener("change", () => {
    if (!isMobileLayout()) {
      document.getElementById("detail-backdrop")?.setAttribute("hidden", "");
      document.getElementById("detail-backdrop")?.classList.remove("is-visible");
      document.body.classList.remove("admin-detail-open");
      document.getElementById("lead-detail")?.classList.remove("is-open");
    } else if (selectedId) {
      openDetailPanel();
    }
  });

  document.querySelectorAll("[data-filter]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-filter]").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.dataset.filter;
      closeDetailPanel();
      loadLeads();
    });
  });

  document.getElementById("logout-btn")?.addEventListener("click", async () => {
    await fetch("/api/admin/logout", { method: "POST", credentials: "same-origin" });
    window.location.href = "login.html";
  });

  await loadLeads();
});
