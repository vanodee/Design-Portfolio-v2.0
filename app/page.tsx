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

      <div className={styles.categoryCardContainer}>

        {categories.map((cat: any) => (
          <Link 
            key={cat._id} 
            className={styles.categoryCard}
            href={`/projects/${cat.slug}`}
          >

            <Image 
              className={styles.categoryImage}
              src={cat.imageUrl}
              alt={cat.title}
              width={500}
              height={500}
            />

            <div className={styles.categoryDetails}>
              <h2>{cat.title}</h2>

              <div className={styles.categoryTools}>
                {cat.tools?.length > 0 ? (
                  cat.tools.map((tool: any) => (
                    <div
                      key={tool._id}
                      className={styles.toolItem}
                      style={{ backgroundColor: tool.color }}
                    >
                      {tool.iconUrl && (
                        <Image
                          src={tool.iconUrl}
                          alt={tool.title}
                          width={35}
                          height={35}
                        />
                      )}
                    </div>
                  ))
                ) : (
                  <p>---</p>
                )}
              </div>
              
            </div>
            

          </Link>
        ))}
{/* ========================= DELETE THIS ===================================== */}
        {categories.map((cat: any) => (
          <Link 
            key={cat._id} 
            className={styles.categoryCard}
            href={`/projects/${cat.slug}`}
          >

            <Image 
              className={styles.categoryImage}
              src={cat.imageUrl}
              alt={cat.title}
              width={500}
              height={500}
            />

            <div className={styles.categoryDetails}>
              <h2>{cat.title}</h2>

              <div className={styles.categoryTools}>
                {cat.tools?.length > 0 ? (
                  cat.tools.map((tool: any) => (
                    <div
                      key={tool._id}
                      className={styles.toolItem}
                      style={{ backgroundColor: tool.color }}
                    >
                      {tool.iconUrl && (
                        <Image
                          src={tool.iconUrl}
                          alt={tool.title}
                          width={35}
                          height={35}
                        />
                      )}
                    </div>
                  ))
                ) : (
                  <p>---</p>
                )}
              </div>
              
            </div>
            

          </Link>
        ))}
{/* ============================================================== */}

      </div>
      
    </div>
  );
}
