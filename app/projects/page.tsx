import { redirect } from "next/navigation";
import { groq } from "next-sanity";
import { client } from "../../lib/sanity.client";


export default async function ProjectsIndexPage() {
  const query = groq`*[_type == "category"] | order(_createdAt desc){ "slug": slug.current }`;
  const categories = await client.fetch(query);

  if (!categories?.length) {
    return <div>No categories found.</div>;
  }

  redirect(`/projects/${categories[0].slug}`);
}

