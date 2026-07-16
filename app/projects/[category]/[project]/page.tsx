import type { Metadata } from "next";
import { client, urlFor, hotspotPosition } from "../../../../lib/sanity.client";
import styles from "./projectPage.module.scss";
import Image from "next/image";
import { notFound } from "next/navigation";
import { allProjectsQuery, projectAndCategorySlugsQuery } from "@/lib/queries";
import { WebAppsBody } from "@/app/components/ProjectCategoryBodies/WebAppsBody";
import { WebsitesBody } from "@/app/components/ProjectCategoryBodies/WebsitesBody";
import { UxCaseStudiesBody } from "@/app/components/ProjectCategoryBodies/UxCaseStudiesBody";
import { LogosBrandingBody } from "@/app/components/ProjectCategoryBodies/LogosBrandingBody";


export async function generateStaticParams() {
  const projects = await client.fetch(projectAndCategorySlugsQuery);

  return projects.map((p: { category: string; project: string }) => ({
    category: p.category,
    project: p.project,
  }));
}

export async function generateMetadata(
  { params }: { params: { category: string; project: string } }
): Promise<Metadata> {
  const { category, project } = await params;

  const projectData = await client.fetch(allProjectsQuery, { category, project });

  if (!projectData) {
    return {
      title: "Project Case Study - Stevano Peters",
      description:
        "A design and development case study from the portfolio of Senior Product Designer Stevano Peters.",
      alternates: {
        canonical: `/projects/${category}/${project}`,
      },
    };
  }

  const projectTitle = projectData.title;
  const categoryTitle = projectData.category?.title || projectData.categoryName || "Case Study";

  const title = `${projectTitle} - ${categoryTitle} | Stevano Peters Portfolio`;
  const description =
    projectData.heroDescription ||
    projectData.heroSubheading ||
    `A detailed ${categoryTitle.toLowerCase()} case study by Senior Product Designer Stevano Peters.`;
  const url = `/projects/${category}/${project}`;

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
      type: "article",
      images: projectData.heroImage
        ? [
            {
              url: projectData.heroImage.url,
              alt: projectTitle,
            },
          ]
        : undefined,
    },
  };
}


export default async function ProjectPage({
  params,
}: {
  params: { category: string; project: string };
}) {
  const { category, project } = await params;

  const projectData = await client.fetch(allProjectsQuery, { category, project });

  if (!projectData) return notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: projectData.title,
    description: projectData.heroDescription || projectData.heroSubheading,
    image: projectData.heroImage?.url,
    url: `https://stevano.dev/projects/${category}/${project}`,
    author: {
      "@type": "Person",
      name: "Stevano Peters",
      jobTitle: "Senior Product Designer",
      url: "https://stevano.dev",
    },
    keywords: projectData.projectTags,
  };

  
  return (
    <div 
      className={styles.projectPageContainer} 
      data-bgcolor={projectData.previewColor} // Store Project Background Color in the DOM
      style={{ 
        "--projectBgColor": projectData.previewColor, 
        "--projectColor": projectData.projectColor,
        "--projectColorDark": projectData.projectColorDark,
        "--projectCtaColor": projectData.ctaColor,
      } as React.CSSProperties}
    >
      
      {/* HERO SECTION ========================================================================= */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
          src={urlFor(projectData.heroImage).width(1920).auto('format').url()}
          style={{ objectPosition: hotspotPosition(projectData.heroImage) }}
          height={1080}
          width={1920}
          alt={projectData.heroImage?.alt || "Hero Image"}
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

      
      {projectData.category?.title === "Web Apps" && (
        <WebAppsBody projectData={projectData} styles={styles} />
      )}

      {projectData.category?.title === "Websites" && (
        <WebsitesBody projectData={projectData} styles={styles} />
      )}

      {projectData.category?.title === "UX Case Studies" && (
        <UxCaseStudiesBody projectData={projectData} styles={styles} />
      )}

      {projectData.category?.title === "Logos & Branding" && (
        <LogosBrandingBody projectData={projectData} styles={styles} />
      )}


      <div className={styles.heroImageContainer}>
        <Image
          className={styles.heroImage}
          src={urlFor(projectData.closingImage).width(1920).auto('format').url()}
          style={{ objectPosition: hotspotPosition(projectData.closingImage) }}
          height={1080}
          width={1920}
          alt={projectData.closingImage?.alt || "Closing Image"}
        />
      </div>

    </div>
  );
}