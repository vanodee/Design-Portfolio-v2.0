import { groq } from "next-sanity";
import { client } from "../../../lib/sanity.client";
import styles from "./categoryPage.module.scss";
import CategoryNav from "@/app/components/CategoryNav/CategoryNav";
import Link from "next/link";


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
      "previewImage": previewImage.asset->url,

      // Tools data
      tools[]->{
        title,
        color,
        "iconUrl": icon.asset->url
      }
    }
  }
  `;

  const categoryData = await client.fetch(categoryQuery, { category });

  if (!categoryData) {
    return <div>Category not found</div>;
  }

  return (
    <div className={styles.projectsContainer}>
      
      <h1>Projects I've Worked On</h1>
      
      <CategoryNav />

      {/* <h2>{categoryData.title}</h2> */}

      <p>{categoryData.description || "Lorem ipsum dolor sit amet consectetur. In varius arcu leo nunc eget aliquam leo. Nisi tincidunt semper sagittis arcu sed tempor ut. Arcu morbi risus nulla magna enim dictum auctor blandit fermentum. Mauris consectetur consequat massa imperdiet lobortis quis tincidunt vel."}</p>


      <div className={styles.projectCardsContainer}>
        {categoryData.projects?.map((project: any) => (

          <div 
            key={project.slug} 
            className={styles.projectCard}
            style={{ "--hoverColor": project.previewColor } as React.CSSProperties}
          >

            <img 
              src={project.previewImage} 
              alt={project.title} 
            />

            <div className={styles.projectDetails}>
              <div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>

              {/* <div className={styles.toolsRow}>
                {project.tools?.map((tool: any) => (
                  <img
                    key={tool.title}
                    src={tool.iconUrl}
                    alt={tool.title}
                    title={tool.title}
                  />
                ))}
              </div> */}

              <Link 
                href={`/projects/${categoryData.slug}/${project.slug}`}
                className={styles.projectLink}
              >
                <button>View Full Project</button>
              </Link>

            </div>
            

          </div>
        ))}

      </div>

    </div>
  );
}
