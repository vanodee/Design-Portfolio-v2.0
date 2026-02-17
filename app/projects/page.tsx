import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { groq } from "next-sanity";
import { client } from "../../lib/sanity.client";


export const metadata: Metadata = {
  title: "Projects - Portfolio of Stevano Peters",
  description:
    "Browse design and development projects by Senior Digital Designer Stevano Peters, including web applications, marketing websites, UX case studies, and logos & branding.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Projects - Portfolio of Stevano Peters",
    description:
      "Explore featured projects from the portfolio of Senior Digital Designer and front-end developer Stevano Peters.",
    url: "/projects",
  },
};


export default async function ProjectsIndexPage() {
  const query = groq`*[_type == "category"] | order(_createdAt desc){ "slug": slug.current }`;
  const categories = await client.fetch(query);

  if (!categories?.length) {
    return <div>No categories found.</div>;
  }

  redirect(`/projects/${categories[0].slug}`);
}

