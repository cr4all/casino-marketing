import express from "express";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createLead, getLead, listLeads, updateLeadStatus } from "./db.mjs";
import {
  createSession,
  destroySession,
  getSessionCookieName,
  isValidSession,
  requireAuth,
  verifyPassword,
} from "./auth.mjs";
import { validateContact, validateStatus } from "./validate.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function loadEnvFile(overwrite = false) {
  const envPath = join(root, ".env");
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim();
    if (overwrite || process.env[key] === undefined) process.env[key] = val;
  }
}

function getAdminPassword() {
  loadEnvFile(true);
  return process.env.ADMIN_PASSWORD || "";
}

loadEnvFile();
const isProduction = process.env.NODE_ENV === "production";
const port = Number(process.env.API_PORT || 3001);
const sessionSecret = process.env.ADMIN_SESSION_SECRET || "dev-change-me";

if (isProduction && (!getAdminPassword() || sessionSecret === "dev-change-me")) {
  console.warn("[api] Set ADMIN_PASSWORD and ADMIN_SESSION_SECRET in production.");
}

const app = express();
app.set("trust proxy", 1);
app.use(express.json({ limit: "32kb" }));
app.use(cookieParser(sessionSecret));

const contactLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests" },
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many login attempts" },
});

function sessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax",
    secure: isProduction,
    maxAge: 12 * 60 * 60 * 1000,
    signed: true,
    path: "/",
  };
}

app.post("/api/contact", contactLimiter, (req, res) => {
  const validated = validateContact(req.body);
  if (!validated.ok) {
    return res.status(400).json({ error: "Invalid submission", details: validated.errors });
  }

  const id = createLead(validated.data, {
    ip: req.ip,
    userAgent: req.get("user-agent") || "",
  });

  res.status(201).json({ ok: true, id });
});

app.post("/api/admin/login", loginLimiter, (req, res) => {
  const password = String(req.body?.password ?? "");
  const adminPassword = getAdminPassword();
  if (!adminPassword) {
    return res.status(503).json({ error: "Admin login is not configured" });
  }
  if (!verifyPassword(password, adminPassword)) {
    return res.status(401).json({ error: "Invalid password" });
  }

  const sessionId = createSession();
  res.cookie(getSessionCookieName(), sessionId, sessionCookieOptions());
  res.json({ ok: true });
});

app.post("/api/admin/logout", (req, res) => {
  destroySession(req.signedCookies?.[getSessionCookieName()]);
  res.clearCookie(getSessionCookieName(), { path: "/" });
  res.json({ ok: true });
});

app.get("/api/admin/me", (req, res) => {
  const sessionId = req.signedCookies?.[getSessionCookieName()];
  res.json({ authenticated: isValidSession(sessionId) });
});

app.get("/api/admin/leads", requireAuth, (req, res) => {
  const status = req.query.status === "all" ? "all" : "new";
  res.json({ leads: listLeads(status) });
});

app.get("/api/admin/leads/:id", requireAuth, (req, res) => {
  const lead = getLead(Number(req.params.id));
  if (!lead) return res.status(404).json({ error: "Not found" });
  res.json({ lead });
});

app.patch("/api/admin/leads/:id", requireAuth, (req, res) => {
  const status = validateStatus(req.body?.status);
  if (!status || status === "new") {
    return res.status(400).json({ error: "Invalid status" });
  }
  const ok = updateLeadStatus(Number(req.params.id), status);
  if (!ok) return res.status(404).json({ error: "Not found" });
  res.json({ ok: true, lead: getLead(Number(req.params.id)) });
});

const distDir = join(root, "dist");
if (isProduction && existsSync(distDir)) {
  app.use(express.static(distDir));
}

const server = app.listen(port, () => {
  console.log(`[api] listening on http://localhost:${port}${isProduction ? " (production)" : ""}`);
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`[api] Port ${port} is already in use. Run "npm run predev" or stop the other process.`);
    process.exit(1);
  }
  throw err;
});
