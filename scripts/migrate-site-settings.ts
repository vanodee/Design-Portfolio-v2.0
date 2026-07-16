// One-off script: populates the siteSettings singleton (see sanity/schemaTypes/siteSettingsType.ts)
// with the content currently hardcoded in app/about/page.tsx, NavBar.tsx, and Footer.tsx.
// Run with: npx tsx scripts/migrate-site-settings.ts
import { createClient } from "@sanity/client";
import fs from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";

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
});

const resumeUrl =
  "https://drive.google.com/file/d/1Ry2Llmg5DlfiX_2dwWiNyVQ4rrK9O_xX/view?usp=sharing";

const experience = [
  { yearRange: "2025 - Present", title: "Sr. Product Designer", company: "Pretsl (via Peanut Technologies)" },
  { yearRange: "2020 - 2025", title: "Sr. Designer & Front-End Developer", company: "T3CK Innovations" },
  { yearRange: "2023 - 2025", title: "UI/UX Designer", company: "ONDEKA Corporation" },
  { yearRange: "2022 - 2023", title: "UX/UI Designer", company: "Fottify Software Solutions" },
];

const brands = [
  { name: "Janettotty", file: "janettotty_logo.png" },
  { name: "DSTV", file: "dstv_logo.png" },
  { name: "Carlo Rossi", file: "carlorossi_logo.png" },
  { name: "John Hett Sports Foundation", file: "johnhett_logo.png" },
  { name: "Quintessential Communications", file: "quintessential_logo.png" },
  { name: "The Oracle Experience", file: "oracle_logo.png" },
  { name: "Ideashouse", file: "ideashouse_logo.png" },
  { name: "Nigerian Idols", file: "idols_logo.png" },
  { name: "Nigerian Breweries", file: "nb_logo.png" },
  { name: "Siqure Asset", file: "siqure_logo.png" },
  { name: "Showmax", file: "showmax_logo.png" },
  { name: "GoTV", file: "gotv_logo.png" },
  { name: "The Singleton", file: "singleton_logo1.png" },
  { name: "Dunbar Ross International", file: "dunbarross_logo.png" },
  { name: "Siblings Laundromat", file: "siblings_logo.png" },
  { name: "Pretsl", file: "pretsl_logo.png" },
  { name: "Gracia Planta", file: "graciaplanta_logo.png" },
  { name: "New Innovatives", file: "newinnovatives_logo.png" },
  { name: "Fottify Software Solutions", file: "fottify_logo.png" },
  { name: "Peanut Technologies", file: "peanut_logo.png" },
];

const socialLinks = [
  { platform: "Email", url: "mailto:stevano.peters@gmail.com" },
  { platform: "Linkedin", url: "https://www.linkedin.com/in/stevano-peters/" },
  { platform: "Twitter", url: "https://x.com/Vano_dee" },
];

async function main() {
  const clients = [];
  for (const brand of brands) {
    const filePath = path.resolve(__dirname, "..", "public", "brandLogos", brand.file);
    const asset = await client.assets.upload("image", fs.createReadStream(filePath), {
      filename: brand.file,
    });
    clients.push({
      _key: randomUUID(),
      name: brand.name,
      logo: { _type: "image", asset: { _type: "reference", _ref: asset._id } },
    });
    console.log(`Uploaded logo for ${brand.name}`);
  }

  const doc = {
    _id: "siteSettings",
    _type: "siteSettings",
    resumeUrl,
    experience: experience.map((entry) => ({ _key: randomUUID(), ...entry })),
    clients,
    socialLinks: socialLinks.map((entry) => ({ _key: randomUUID(), ...entry })),
  };

  const result = await client.createOrReplace(doc);
  console.log("Created/updated siteSettings document:", result._id);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
