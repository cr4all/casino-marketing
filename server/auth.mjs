import crypto from "node:crypto";

const SESSION_COOKIE = "admin_session";
const SESSION_TTL_MS = 12 * 60 * 60 * 1000;

const sessions = new Map();

function pruneSessions() {
  const now = Date.now();
  for (const [id, session] of sessions) {
    if (now - session.createdAt > SESSION_TTL_MS) sessions.delete(id);
  }
}

export function getSessionCookieName() {
  return SESSION_COOKIE;
}

export function createSession() {
  pruneSessions();
  const id = crypto.randomBytes(32).toString("hex");
  sessions.set(id, { createdAt: Date.now() });
  return id;
}

export function destroySession(sessionId) {
  if (sessionId) sessions.delete(sessionId);
}

export function isValidSession(sessionId) {
  if (!sessionId) return false;
  const session = sessions.get(sessionId);
  if (!session) return false;
  if (Date.now() - session.createdAt > SESSION_TTL_MS) {
    sessions.delete(sessionId);
    return false;
  }
  return true;
}

export function verifyPassword(input, expected) {
  if (!expected || !input) return false;
  const a = Buffer.from(String(input));
  const b = Buffer.from(String(expected));
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export function requireAuth(req, res, next) {
  const sessionId = req.signedCookies?.[SESSION_COOKIE];
  if (!isValidSession(sessionId)) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}
