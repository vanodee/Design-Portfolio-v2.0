// One-off script: finds project documents where categoryName has drifted from category->title
// (see sanity/OPTIMIZATION_CHECKLIST.md item 2) and patches them back in sync.
// Run with: npx tsx scripts/reconcile-category-names.ts
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
  perspective: "raw", // include draft documents, not just published
});

type DriftedProject = {
  _id: string;
  title: string;
  categoryName: string | null;
  correctTitle: string | null;
};

async function main() {
  const drifted = await client.fetch<DriftedProject[]>(
    `*[_type == "project" && categoryName != category->title]{ _id, title, categoryName, "correctTitle": category->title }`
  );

  if (drifted.length === 0) {
    console.log("No drift found — every project's categoryName matches category->title.");
    return;
  }

  for (const project of drifted) {
    console.log(
      `Reconciling "${project.title}" (${project._id}): "${project.categoryName}" -> "${project.correctTitle}"`
    );
    await client.patch(project._id).set({ categoryName: project.correctTitle }).commit();
  }

  console.log(`Reconciled ${drifted.length} document(s).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
