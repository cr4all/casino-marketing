const COUNTRIES = new Set(["na", "eu", "latam", "asia", "mea", "other"]);
const SOLUTIONS = new Set(["turnkey", "white-label", "integration"]);
const LAUNCHES = new Set(["", "1-3", "3-6", "6-12", "12+"]);
const STATUSES = new Set(["new", "read", "archived"]);

export function validateContact(body) {
  const errors = [];
  const company = String(body.company ?? "").trim();
  const firstName = String(body.firstName ?? "").trim();
  const lastName = String(body.lastName ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();
  const country = String(body.country ?? "").trim();
  const solution = String(body.solution ?? "").trim();
  const launch = String(body.launch ?? "").trim();
  const message = String(body.message ?? "").trim();
  const consent = body.consent === "on" || body.consent === true || body.consent === "true";

  if (!company || company.length > 200) errors.push("Invalid company");
  if (!firstName || firstName.length > 100) errors.push("Invalid firstName");
  if (!lastName || lastName.length > 100) errors.push("Invalid lastName");
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    errors.push("Invalid email");
  }
  if (!COUNTRIES.has(country)) errors.push("Invalid country");
  if (!SOLUTIONS.has(solution)) errors.push("Invalid solution");
  if (!LAUNCHES.has(launch)) errors.push("Invalid launch");
  if (message.length > 5000) errors.push("Message too long");
  if (!consent) errors.push("Consent required");

  if (errors.length) return { ok: false, errors };

  return {
    ok: true,
    data: { company, firstName, lastName, email, country, solution, launch, message, consent },
  };
}

export function validateStatus(status) {
  return STATUSES.has(status) ? status : null;
}
