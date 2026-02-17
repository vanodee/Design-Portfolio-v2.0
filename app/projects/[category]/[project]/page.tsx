import { groq } from "next-sanity";
import { client } from "../../../../lib/sanity.client";
import styles from "./projectPage.module.scss"
import Image from "next/image";
import { notFound } from "next/navigation";
import { allProjectsQuery } from "@/lib/queries";
import { WebAppsBody } from "@/app/components/ProjectCategoryBodies/WebAppsBody";
import { WebsitesBody } from "@/app/components/ProjectCategoryBodies/WebsitesBody";
import { UxCaseStudiesBody } from "@/app/components/ProjectCategoryBodies/UxCaseStudiesBody";
import { LogosBrandingBody } from "@/app/components/ProjectCategoryBodies/LogosBrandingBody";


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
  
  const projectData = await client.fetch(allProjectsQuery, { category, project });

  if (!projectData) return notFound();

  return (
    <div 
      className={styles.projectPageContainer} 
      data-bgcolor={projectData.previewColor} // Store Project Background Color in the DOM
      style={{ 
        "--projectBgColor": projectData.previewColor, 
        "--projectColor": projectData.projectColor,
        "--projectColorDark": projectData.projectColorDark,
      } as React.CSSProperties}
    >
      
      {/* HERO SECTION ========================================================================= */}
      <div className={styles.heroText}>
          <h1>
            <span className={styles.categoryTitle}>
              {projectData.category.title}
            </span>

            {` - ${projectData.title}`}
          </h1>

          <h2>{projectData.heroSubheading}</h2>
          <p>{projectData.heroDescription}</p>
      </div>

      <div className={styles.heroImageContainer}>
        <Image
          className={styles.heroImage}
          src={projectData.heroImage}
          height={1080}
          width={1920}
          alt="Hero Image"
        />
      </div>

      {/* PROJECT OVERVIEW ========================================================================= */}
      <section className={styles.customSection}>

        {/* Project Tags ------------------------------------------------- */}
        {projectData.projectTags && (
          <div className={styles.tagsRow}>
            {projectData.projectTags?.map((tag: any) => (
              <div 
                key={tag} 
                className={styles.tagItem} 
              >
                {tag}
              </div>
            ))}
          </div>
        )}

        {/* Quick Stats ------------------------------------------- */}
        <div className={styles.quickStats}>
          {projectData.quickStats?.map((stat: any) => (
            <div key={stat.title} className={styles.quickStatItem}>
              <span>{stat.title}</span>
              <span>{stat.value}</span>
            </div>
          ))}
        </div>

        {/* Tools ---------------------------------------------------- */}
        <div className={styles.toolsRow}>
          <span>Tools</span>

          <div className={styles.toolSet}>
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

        </div>
      </section>

      
      {projectData.categoryName === "Web Apps" && (
        <WebAppsBody projectData={projectData} styles={styles} />
      )}

      {projectData.categoryName === "Websites" && (
        <WebsitesBody projectData={projectData} styles={styles} />
      )}

      {projectData.categoryName === "UX Case Studies" && (
        <UxCaseStudiesBody projectData={projectData} styles={styles} />
      )}

      {projectData.categoryName === "Logos & Branding" && (
        <LogosBrandingBody projectData={projectData} styles={styles} />
      )}


      <div className={styles.heroImageContainer}>
        <Image
          className={styles.heroImage}
          src={projectData.closingImage}
          height={1080}
          width={1920}
          alt="Closing Image"
        />
      </div>

    </div>
  );
}