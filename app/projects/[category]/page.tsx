import type { Metadata } from "next";
import { client } from "../../../lib/sanity.client";
import { categoryWithProjectsQuery, categorySlugsQuery } from "@/lib/queries";
import styles from "./categoryPage.module.scss";
import CategoryNav from "@/app/components/CategoryNav/CategoryNav";
import { notFound } from "next/navigation";
import ProjectCards from "@/app/components/ProjectCards/ProjectCards";

export async function generateMetadata(
  { params }: { params: { category: string } }
): Promise<Metadata> {
  const { category } = await params;

  const categoryData = await client.fetch(categoryWithProjectsQuery, { category });

  if (!categoryData) {
    return {
      title: "Projects - Portfolio of Stevano Peters",
      description:
        "Explore design and development projects by Senior Product Designer Stevano Peters, including web apps, websites, UX case studies, and branding work.",
      alternates: {
        canonical: `/projects/${category}`,
      },
    };
  }

  const title = `${categoryData.title} - Stevano Peters Portfolio Projects`;
  const description =
    categoryData.description ||
    `View ${categoryData.title} projects from the portfolio of Senior Product Designer Stevano Peters.`;
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
  const categories = await client.fetch(categorySlugsQuery);

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

  const categoryData = await client.fetch(categoryWithProjectsQuery, { category });

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
