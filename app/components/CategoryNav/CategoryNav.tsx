import { client } from "@/lib/sanity.client";
import { categoryNavQuery } from "@/lib/queries";
import CategoryNavClient from "./CategoryNavClient";


export default async function CategoryNav() {
  const categories = await client.fetch(categoryNavQuery, {}, { next: { tags: ["category"] } });

  return <CategoryNavClient categories={categories} />;
}