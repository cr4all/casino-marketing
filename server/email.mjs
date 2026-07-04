import sgMail from "@sendgrid/mail";

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

let apiKeyConfigured = false;

function ensureApiKey() {
  const apiKey = process.env.SENDGRID_API_KEY || "";
  if (!apiKey) {
    throw new Error("SENDGRID_API_KEY is not configured");
  }
  if (!apiKeyConfigured) {
    sgMail.setApiKey(apiKey);
    apiKeyConfigured = true;
  }
}

function getFromAddress() {
  return process.env.SENDGRID_FROM || "noreply@ascendraplatforms.com";
}

function getFromName() {
  return process.env.SENDGRID_FROM_NAME || "Ascendra Platforms";
}

function getNotifyTo() {
  return process.env.CONTACT_NOTIFY_TO || "sales@ascendraplatforms.com";
}

export async function sendEmail({ to, subject, text, html, replyTo }) {
  ensureApiKey();

  const msg = {
    to,
    from: {
      email: getFromAddress(),
      name: getFromName(),
    },
    subject,
    text,
    html,
  };

  if (replyTo) {
    msg.replyTo = replyTo;
  }

  return sgMail.send(msg);
}

function formatContactBody(lead, meta = {}) {
  const lines = [
    ["Company", lead.company],
    ["Name", `${lead.firstName} ${lead.lastName}`.trim()],
    ["Email", lead.email],
    ["Country / Region", COUNTRY_LABELS[lead.country] || lead.country],
    ["Solution", SOLUTION_LABELS[lead.solution] || lead.solution],
    ["Expected Launch", LAUNCH_LABELS[lead.launch] || lead.launch || "—"],
    ["Message", lead.message || "—"],
  ];

  if (meta.ip) lines.push(["IP", meta.ip]);
  if (meta.userAgent) lines.push(["User-Agent", meta.userAgent]);

  const text = lines.map(([label, value]) => `${label}: ${value}`).join("\n");
  const html = `
    <h2>New demo / contact request</h2>
    <table cellpadding="6" cellspacing="0" style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
      ${lines
        .map(
          ([label, value]) =>
            `<tr><td style="font-weight:600;vertical-align:top;padding-right:16px;">${escapeHtml(label)}</td><td>${escapeHtml(String(value)).replace(/\n/g, "<br>")}</td></tr>`
        )
        .join("")}
    </table>
  `.trim();

  return { text, html };
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendContactNotification(lead, meta = {}) {
  const { text, html } = formatContactBody(lead, meta);
  const subject = `[Ascendra Platforms] Demo request — ${lead.company}`;

  return sendEmail({
    to: getNotifyTo(),
    subject,
    text,
    html,
    replyTo: lead.email,
  });
}

export function isEmailConfigured() {
  return Boolean(process.env.SENDGRID_API_KEY);
}
