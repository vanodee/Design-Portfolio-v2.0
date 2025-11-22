import { groq } from "next-sanity";
import { client } from "../../../../lib/sanity.client";
import styles from "./projectPage.module.scss"
import Image from "next/image";
import Footer from "@/app/components/Footer/Footer";


export async function generateStaticParams() {
  const query = groq`
    *[_type == "project"]{
      "category": category->slug.current,
      "project": slug.current
    }
  `;

  const projects = await client.fetch(query);

  return projects.map((p: { category: string; project: string }) => ({
    category: p.category,
    project: p.project,
  }));
}


export default async function ProjectPage({params}: {params: { category: string; project: string }}) {
  const { category, project } = await params;

  const projectQuery = groq`
    *[_type == "project" && slug.current == $project && category->slug.current == $category][0]{
      title,
      previewColor,
      heroHeading,
      //heroSubheading,
      //heroDescription,
      //"heroImage": heroImage.asset->url,

      category->{
        title,
        "slug": slug.current
      },

      tools[]->{
        title,
        color,
        "iconUrl": icon.asset->url
      }
    }
  `;

  const projectData = await client.fetch(projectQuery, { category, project });

  if (!projectData) {
    return <div>Project not found</div>;
  }

  return (
    <div 
      className={styles.projectPageContainer} 
      data-bgcolor={projectData.previewColor} // Store Project Background Color in the DOM
    >
      
      {/* HERO SECTION -------------------------------------------------------------- */}
      <section className={styles.heroSection}>

        <h1>{`[${projectData.category.title}] - ${projectData.title}` || "How Do You Singleton ?"}</h1>
        <h2>{projectData.subTitle || "Explore, Book & Enjoy: An Interactive Guide To The Singleton Experience"}</h2>
        <p>{projectData.description || "Lorem ipsum dolor sit amet consectetur. In varius arcu leo nunc eget aliquam leo. Nisi tincidunt semper sagittis arcu sed tempor ut. Arcu morbi risus nulla magna enim dictum auctor blandit fermentum. Mauris consectetur consequat massa imperdiet lobortis quis tincidunt vel."}</p>

        <Image
          className={styles.heroImage}
          src={"/1_hero.webp"}
          height={1080}
          width={1920}
          alt="demo image"
        />

        <div className={styles.toolsRow}>

          {projectData.tools?.map((tool: any) => (
            <div 
              key={tool.title} 
              className={styles.toolItem} 
              style={{ "--toolColor": tool.color } as React.CSSProperties}
            >
              <img src={tool.iconUrl} alt={tool.title} />
              <span>{tool.title}</span>
            </div>
          ))}

        </div>

      </section>

      {/* FOOTER -------------------------------------------------------------- */}
      <Footer />

    </div>
  );
}