// One-off script: migrates webApp_devSectionItems[].itemPoints and
// website_websiteBuildItems[].buildItemPoints from `text` (a single string) to `array of string`,
// per sanity/OPTIMIZATION_CHECKLIST.md item 5. Wraps each existing paragraph as a single-item
// array — lossless, no attempt to guess sentence/bullet boundaries (the checklist explicitly
// warns against trusting an automatic split blindly). Editors can manually break these into real
// multi-item bullet lists later.
// Run with: npx tsx scripts/migrate-item-points-to-array.ts
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
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId || !dataset || !token) {
  throw new Error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, or SANITY_WRITE_TOKEN in .env.local"
  );
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  token,
  useCdn: false,
  perspective: "raw",
});

type ItemWithPoints = { _key: string; itemName?: string; buildItemName?: string; itemPoints?: unknown; buildItemPoints?: unknown };
type ProjectDoc = { _id: string; title: string; webApp_devSectionItems?: ItemWithPoints[]; website_websiteBuildItems?: ItemWithPoints[] };

async function migrateField(fieldPath: string, itemNameField: string, pointsField: string) {
  const docs = await client.fetch<ProjectDoc[]>(
    `*[_type == "project" && defined(${fieldPath})]{ _id, title, ${fieldPath} }`
  );

  for (const doc of docs) {
    const items = (doc as any)[fieldPath] as ItemWithPoints[];
    for (const item of items) {
      const points = (item as any)[pointsField];
      if (Array.isArray(points)) continue; // already migrated
      if (typeof points !== "string" || points.length === 0) continue;

      const itemLabel = (item as any)[itemNameField] ?? item._key;
      console.log(`Migrating "${doc.title}" (${doc._id}) / ${fieldPath}[${itemLabel}]: wrapping text as single-item array`);
      await client
        .patch(doc._id)
        .set({ [`${fieldPath}[_key=="${item._key}"].${pointsField}`]: [points] })
        .commit();
    }
  }

  return docs.length;
}

async function main() {
  const devCount = await migrateField("webApp_devSectionItems", "itemName", "itemPoints");
  const buildCount = await migrateField("website_websiteBuildItems", "buildItemName", "buildItemPoints");
  console.log(`Done. Checked ${devCount} project(s) with webApp_devSectionItems, ${buildCount} with website_websiteBuildItems.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
