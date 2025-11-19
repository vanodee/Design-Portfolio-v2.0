// lib/sanity.client.ts
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-01-01", // use current date or a stable date string
  useCdn: false,
};

export const client = createClient(sanityConfig);
export const builder = imageUrlBuilder(client);
export function urlFor(source: any) {
  return builder.image(source);
}
