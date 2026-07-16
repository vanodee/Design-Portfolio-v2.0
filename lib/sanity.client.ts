// lib/sanity.client.ts
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2025-01-01", // use current date or a stable date string
  useCdn: process.env.NODE_ENV === 'production',
};

export const client = createClient(sanityConfig);
export const builder = imageUrlBuilder(client);
export function urlFor(source: any) {
  return builder.image(source);
}

// CSS object-position/background-position string derived from a Sanity image's hotspot,
// so cropping to fit a container (object-fit/background-size: cover) keeps the editor's
// chosen focal point instead of the geometric center.
export function hotspotPosition(image: any): string {
  const hotspot = image?.hotspot;
  if (!hotspot) return "50% 50%";
  return `${hotspot.x * 100}% ${hotspot.y * 100}%`;
}
