"use client";

import { motion, cubicBezier } from "motion/react";
import styles from "../../projects/[category]/categoryPage.module.scss";
import Link from "next/link";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(6px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: cubicBezier(0.16, 1, 0.3, 1),
    },
  },
};

export default function ProjectCards({ categoryData }: { categoryData: any }) {
  return (
    <div className={styles.projectCardsContainer}>

      <p className={styles.categoryDescription}>
        {categoryData.description ||
          "Lorem ipsum dolor sit amet consectetur. In varius arcu leo nunc eget aliquam leo. Nisi tincidunt semper sagittis arcu sed tempor ut. Arcu morbi risus nulla magna enim dictum auctor blandit fermentum. Mauris consectetur consequat massa imperdiet lobortis quis tincidunt vel."}
      </p>

      {/* Wrap the grid in a motion container */}
      <motion.div
        className={styles.projectCardGrid}
        variants={container}
        initial="hidden"
        animate="show"
      >
        {categoryData.projects?.map((project: any) => (
          <motion.div
            key={project.slug}
            variants={item}
            className={styles.projectCard}
            style={{ "--hoverColor": project.previewColor } as React.CSSProperties}
          >
            <img src={project.previewImage} alt={project.title} />

            <div className={styles.projectDetails}>
              <div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>

              <Link
                href={`/projects/${categoryData.slug}/${project.slug}`}
                className={styles.projectLink}
              >
                <button>View Full Project</button>
              </Link>
            </div>
          </motion.div>
        ))}
        
        {/* ===================== DELETE THIS ===================================================== */}
        {categoryData.projects?.map((project: any) => (
          <motion.div
            key={project.slug}
            variants={item}
            className={styles.projectCard}
            style={{ "--hoverColor": project.previewColor } as React.CSSProperties}
          >
            <img src={project.previewImage} alt={project.title} />

            <div className={styles.projectDetails}>
              <div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>

              <Link
                href={`/projects/${categoryData.slug}/${project.slug}`}
                className={styles.projectLink}
              >
                <button>View Full Project</button>
              </Link>
            </div>
          </motion.div>
        ))}

        {categoryData.projects?.map((project: any) => (
          <motion.div
            key={project.slug}
            variants={item}
            className={styles.projectCard}
            style={{ "--hoverColor": project.previewColor } as React.CSSProperties}
          >
            <img src={project.previewImage} alt={project.title} />

            <div className={styles.projectDetails}>
              <div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>

              <Link
                href={`/projects/${categoryData.slug}/${project.slug}`}
                className={styles.projectLink}
              >
                <button>View Full Project</button>
              </Link>
            </div>
          </motion.div>
        ))}

        {categoryData.projects?.map((project: any) => (
          <motion.div
            key={project.slug}
            variants={item}
            className={styles.projectCard}
            style={{ "--hoverColor": project.previewColor } as React.CSSProperties}
          >
            <img src={project.previewImage} alt={project.title} />

            <div className={styles.projectDetails}>
              <div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>

              <Link
                href={`/projects/${categoryData.slug}/${project.slug}`}
                className={styles.projectLink}
              >
                <button>View Full Project</button>
              </Link>
            </div>
          </motion.div>
        ))}
        {/* ======================================================================================= */}

      </motion.div>
    </div>
  );
}
