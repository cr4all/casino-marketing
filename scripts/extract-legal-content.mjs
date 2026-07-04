/**
 * Extracts legal page body content into structured JSON from HTML files.
 */
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function extractLegalContent(htmlPath) {
  const html = readFileSync(resolve(root, htmlPath), "utf8");
  const match = html.match(/<div class="legal-content">([\s\S]*?)<\/div>\s*<\/div>\s*<footer/s);
  if (!match) return [];

  const content = match[1];
  const sections = [];
  const parts = content.split(/(?=<h2>)/);

  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;

    const headingMatch = trimmed.match(/^<h2>([\s\S]*?)<\/h2>/);
    if (!headingMatch) {
      if (trimmed.includes("legal-updated")) {
        sections.push({ type: "updated", html: trimmed.replace(/<\/?p[^>]*>/g, "").trim() });
      }
      continue;
    }

    const heading = headingMatch[1].replace(/<[^>]+>/g, "").trim();
    const body = trimmed.slice(headingMatch[0].length).trim();
    sections.push({ type: "section", heading, html: body });
  }

  return sections;
}

export function buildLegalContent() {
  return {
    privacy: {
      title: "Privacy Policy",
      sub: "How Ascendra Platforms collects, uses, and protects information on this website and through demo requests.",
      updated: "Last updated: July 3, 2026",
      sections: extractLegalContent("privacy.html"),
    },
    terms: {
      title: "Terms of Service",
      sub: "Terms governing use of the Ascendra Platforms marketing website and demo request services.",
      updated: "Last updated: July 3, 2026",
      sections: extractLegalContent("terms.html"),
    },
    aml: {
      title: "AML Policy",
      sub: "Anti-money laundering principles and compliance approach for Ascendra Platforms B2B services.",
      updated: "Last updated: July 3, 2026",
      sections: extractLegalContent("aml-policy.html"),
    },
    responsible: {
      title: "Responsible Gaming",
      sub: "Our commitment to responsible gaming tools and operator compliance support.",
      updated: "Last updated: July 3, 2026",
      sections: extractLegalContent("responsible-gaming.html"),
    },
  };
}
