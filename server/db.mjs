import initSqlJs from "sql.js";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dbPath = join(root, "data", "leads.db");
const wasmDir = join(root, "node_modules", "sql.js", "dist");

mkdirSync(dirname(dbPath), { recursive: true });

const SQL = await initSqlJs({
  locateFile: (file) => join(wasmDir, file),
});

let db;
if (existsSync(dbPath)) {
  db = new SQL.Database(readFileSync(dbPath));
} else {
  db = new SQL.Database();
}

function persist() {
  writeFileSync(dbPath, Buffer.from(db.export()));
}

db.run(`
  CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    country TEXT NOT NULL,
    solution TEXT NOT NULL,
    launch TEXT,
    message TEXT,
    consent INTEGER NOT NULL DEFAULT 1,
    status TEXT NOT NULL DEFAULT 'new',
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    ip TEXT,
    user_agent TEXT
  )
`);

function rowsFromExec(result) {
  if (!result.length) return [];
  const { columns, values } = result[0];
  return values.map((row) => Object.fromEntries(columns.map((col, i) => [col, row[i]])));
}

function rowToLead(row) {
  if (!row) return null;
  return {
    id: row.id,
    company: row.company,
    firstName: row.first_name,
    lastName: row.last_name,
    email: row.email,
    country: row.country,
    solution: row.solution,
    launch: row.launch || "",
    message: row.message || "",
    consent: Boolean(row.consent),
    status: row.status,
    createdAt: row.created_at,
    ip: row.ip || "",
    userAgent: row.user_agent || "",
  };
}

export function createLead(data, meta = {}) {
  db.run(
    `
    INSERT INTO leads (
      company, first_name, last_name, email, country, solution, launch,
      message, consent, ip, user_agent
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `,
    [
      data.company,
      data.firstName,
      data.lastName,
      data.email,
      data.country,
      data.solution,
      data.launch || null,
      data.message || null,
      data.consent ? 1 : 0,
      meta.ip || null,
      meta.userAgent || null,
    ]
  );
  persist();
  const [row] = rowsFromExec(db.exec("SELECT last_insert_rowid() AS id"));
  return row.id;
}

export function listLeads(status = "new") {
  const sql =
    status === "all"
      ? `
        SELECT id, company, first_name, last_name, email, country, solution, launch, status, created_at
        FROM leads
        ORDER BY datetime(created_at) DESC
      `
      : `
        SELECT id, company, first_name, last_name, email, country, solution, launch, status, created_at
        FROM leads
        WHERE status = 'new'
        ORDER BY datetime(created_at) DESC
      `;
  return rowsFromExec(db.exec(sql)).map((row) => ({
    id: row.id,
    company: row.company,
    firstName: row.first_name,
    lastName: row.last_name,
    email: row.email,
    country: row.country,
    solution: row.solution,
    launch: row.launch || "",
    status: row.status,
    createdAt: row.created_at,
  }));
}

export function getLead(id) {
  const stmt = db.prepare("SELECT * FROM leads WHERE id = ?");
  stmt.bind([id]);
  let row = null;
  if (stmt.step()) row = stmt.getAsObject();
  stmt.free();
  return rowToLead(row);
}

export function updateLeadStatus(id, status) {
  db.run("UPDATE leads SET status = ? WHERE id = ?", [status, id]);
  const changed = db.getRowsModified();
  if (changed > 0) persist();
  return changed > 0;
}
