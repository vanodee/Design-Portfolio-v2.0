import { groq } from "next-sanity";
import { client } from "@/lib/sanity.client";
import CategoryNavClient from "./CategoryNavClient";


export default async function CategoryNav() {
  const query = groq`*[_type == "category"] | order(_createdAt desc){
    title,
    "slug": slug.current
  }`;

  const categories = await client.fetch(query);

  return <CategoryNavClient categories={categories} />;
}