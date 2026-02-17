import Image from "next/image";
import styles from "./home.module.scss";
import { client } from "../lib/sanity.client";
import { categoriesWithToolsQuery } from "@/lib/queries";
import Link from "next/link";
import { myResume } from "./components/NavBar/NavBar";


export default async function Home() {
  const categories = await client.fetch(categoriesWithToolsQuery);

  return (
    <div className={styles.homePageContainer}>

      <div className={styles.heroSection}>
        <h1 className={styles.heroHeading}>
          Designer. Developer. Brand Builder.
        </h1>

        <p className={styles.heroBody}>
          Lorem ipsum dolor sit amet consectetur. In varius arcu leo nunc eget aliquam leo. Nisi tincidunt semper sagittis arcu sed tempor ut. Arcu morbi risus nulla magna enim dictum auctor blandit fermentum. Mauris consectetur consequat massa imperdiet lobortis quis tincidunt vel.
        </p>

        <div className={styles.buttonGroup}>
          <Link 
            href={`/projects/${categories[0].slug}`}
            className={styles.projectsButton}
          >
            <button>Explore My Work</button>
          </Link>
          
          <a
            href={myResume}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.resumeButton}
          >
            <button>View My Resume</button>
          </a>
          
        </div>
      </div>

      {/* BENTO GRID ========================================================= */}
      <div className={styles.homeBentoGrid}>

        {/* WEB APPS ------------------------------------------- */}
        <Link 
          href={`/projects/${categories[0].slug}`} 
          className={styles.webAppsCard}
          style={{backgroundImage: `url(${categories[0].imageUrl})`}}
        >
          <h2 className={styles.cardText}>{categories[0].title}</h2>
        </Link>

        {/* WEBSITES ------------------------------------------- */}
        <Link 
          href={`/projects/${categories[1].slug}`} 
          className={styles.websitesCard}
          style={{backgroundImage: `url(${categories[1].imageUrl})`}}
        >
          <h2 className={styles.cardText}>{categories[1].title}</h2>
        </Link>

        {/* UX CASE STUDIES ------------------------------------------- */}
        <Link 
          href={`/projects/${categories[2].slug}`} 
          className={styles.uxCasesCard}
          style={{backgroundImage: `url(${categories[2].imageUrl})`}}
        >
          <h2 className={styles.cardText}>{categories[2].title}</h2>
        </Link>

        {/* LOGOS & BRANDING ------------------------------------------- */}
        <Link 
          href={`/projects/${categories[3].slug}`} 
          className={styles.logosCard}
          style={{backgroundImage: `url(${categories[3].imageUrl})`}}
        >
          <h2 className={styles.cardText}>{categories[3].title}</h2>
        </Link>
        
        {/* ABOUT ME ------------------------------------------- */}
        <Link 
          href={"/about"}
          className={styles.aboutCard}
        >
          <div className={styles.iconContainer}>
            <Image
              src='/about_glass.svg'
              width={90}
              height={90}
              alt="Glass Contact Icon"
            />
          </div>
          <h2 className={styles.cardText}>About Me</h2>
        </Link>

        {/* ALL PROJECTS ------------------------------------------- */}
        <Link 
          href={`/projects/${categories[0].slug}`}
          className={styles.allProjectsCard}
        >
          <div className={styles.iconContainer}>
            <Image
              src='/projects_glass.svg'
              width={90}
              height={90}
              alt="Glass Contact Icon"
            />
          </div>
          <h2 className={styles.cardText}>Explore All Projects</h2>
        </Link>

        {/* MY RESUME ------------------------------------------- */}
        <a 
          href={myResume}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.resumeCard}
        >
          <div className={styles.iconContainer}>
            <Image
              src='/resume_glass.svg'
              width={62}
              height={78}
              alt="Glass Contact Icon"
            />
          </div>
          <h2 className={styles.cardText}>My Resume</h2>
        </a>

        {/* CONTACT ME ------------------------------------------- */}
        <Link 
          href={"/contact"}
          className={styles.contactCard}
        >
          <div className={styles.iconContainer}>
            <Image
              src='/contact_glass.svg'
              width={120}
              height={65}
              alt="Glass Contact Icon"
            />
          </div>
          <h2 className={styles.cardText}>Contact Me</h2>
        </Link>
      </div>
      
    </div>
  );
}
