import { groq } from "next-sanity";
import type { Metadata } from "next";
import { client } from "../../../lib/sanity.client";
import styles from "./categoryPage.module.scss";
import CategoryNav from "@/app/components/CategoryNav/CategoryNav";
import { notFound } from "next/navigation";
import ProjectCards from "@/app/components/ProjectCards/ProjectCards";

const categoryQuery = groq`
  *[_type == "category" && slug.current == $category][0]{
    title,
    "slug": slug.current,
    description,
    
    // Fetch all projects belonging to this category
    "projects": *[_type == "project" && category->slug.current == $category] | order(_createdAt desc){
      title,
      "slug": slug.current,
      description,
      previewColor,
      "previewImage": previewImage.asset->url
    }
  }
`;

export async function generateMetadata(
  { params }: { params: { category: string } }
): Promise<Metadata> {
  const { category } = await params;

  const categoryData = await client.fetch(categoryQuery, { category });

  if (!categoryData) {
    return {
      title: "Projects - Portfolio of Stevano Peters",
      description:
        "Explore design and development projects by Senior Digital Designer Stevano Peters, including web apps, websites, UX case studies, and branding work.",
      alternates: {
        canonical: `/projects/${category}`,
      },
    };
  }

  const title = `${categoryData.title} - Stevano Peters Portfolio Projects`;
  const description =
    categoryData.description ||
    `View ${categoryData.title} projects from the portfolio of Senior Digital Designer Stevano Peters.`;
  const url = `/projects/${category}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
    },
  };
}


// Static Params for Dynamic Routing
export async function generateStaticParams() {
  const query = groq`*[_type == "category"]{ "slug": slug.current }`;
  const categories = await client.fetch(query);

  return categories.map((cat: { slug: string }) => ({
    category: cat.slug,
  }));
}



export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const { category } = await params;

  const categoryData = await client.fetch(categoryQuery, { category });

  if (!categoryData) return notFound();

  return (
    <div className={styles.projectsContainer}>
      
      <div className={styles.heroSection}>
        <h1 className={styles.heroHeading}>
          Projects I've Worked On
        </h1>

        <CategoryNav />

      </div>
      

      <ProjectCards categoryData={categoryData}/>

    </div>
  );
}
