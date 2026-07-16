// One-off script: checks the live dataset for projects that share the same (slug, category) pair
// (see sanity/OPTIMIZATION_CHECKLIST.md item 7) — the compound key allProjectsQuery looks up by.
// Read-only, no write token needed. Run with: npx tsx scripts/audit-slug-category-collisions.ts
import { createClient } from "@sanity/client";
import fs from "node:fs";
import path from "node:path";

function loadEnvLocal() {
  const envPath = path.resolve(__dirname, "..", ".env.local");
  const content = fs.readFileSync(envPath, "utf-8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadEnvLocal();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

if (!projectId || !dataset) {
  throw new Error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET in .env.local"
  );
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  useCdn: false,
});

type ProjectRow = {
  _id: string;
  title: string;
  slug: string | null;
  category: string | null;
};

async function main() {
  const projects = await client.fetch<ProjectRow[]>(
    `*[_type == "project"]{ _id, title, "slug": slug.current, "category": category->title }`
  );

  const groups = new Map<string, ProjectRow[]>();
  for (const p of projects) {
    const key = `${p.category ?? "<no category>"}::${p.slug ?? "<no slug>"}`;
    const group = groups.get(key) ?? [];
    group.push(p);
    groups.set(key, group);
  }

  const collisions = [...groups.entries()].filter(([, rows]) => rows.length > 1);

  if (collisions.length === 0) {
    console.log(`No (slug, category) collisions found across ${projects.length} project(s).`);
    return;
  }

  console.log(`Found ${collisions.length} colliding (slug, category) pair(s):`);
  for (const [key, rows] of collisions) {
    console.log(`\n  ${key}:`);
    for (const row of rows) {
      console.log(`    - "${row.title}" (${row._id})`);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
