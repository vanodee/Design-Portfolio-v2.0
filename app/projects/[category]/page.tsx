import { groq } from "next-sanity";
import { client } from "../../../lib/sanity.client";
import styles from "./categoryPage.module.scss";
import CategoryNav from "@/app/components/CategoryNav/CategoryNav";
import { notFound } from "next/navigation";
import ProjectCards from "@/app/components/ProjectCards/ProjectCards";


// Static Params for Dynamic Routing
export async function generateStaticParams() {
  const query = groq`*[_type == "category"]{ "slug": slug.current }`;
  const categories = await client.fetch(query);

  return categories.map((cat: { slug: string }) => ({
    category: cat.slug,
  }));
}



export default async function CategoryPage({ params }: { params: { category: string } }) {
  const { category } = await params;

  // Fetch category data
  const categoryQuery = groq`
    *[_type == "category" && slug.current == $category][0]{
    title,
    "slug": slug.current,
    description,
    "imageUrl": image.asset->url,
    
    // Fetch all projects belonging to this category
    "projects": *[_type == "project" && category->slug.current == $category]{
      title,
      "slug": slug.current,
      description,
      previewColor,
      "previewImage": previewImage.asset->url
    }
  }
  `;

  const categoryData = await client.fetch(categoryQuery, { category });

  if (!categoryData) return notFound();

  return (
    <div className={styles.projectsContainer}>
      
      <h1>Projects I've Worked On</h1>
      
      <div className={styles.categoryNav}>
        <CategoryNav />
      </div>

      <ProjectCards categoryData={categoryData}/>

    </div>
  );
}
