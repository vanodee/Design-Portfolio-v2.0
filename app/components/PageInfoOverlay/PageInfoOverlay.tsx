"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import styles from "./PageInfoOverlay.module.scss";
import Link from "next/link";
import { motion } from "motion/react";


export default function PageInfoOverlay() {
  const pathname = usePathname();

  // Normalize path (remove trailing slash)
  const path = pathname.replace(/\/$/, "");

  // Split segments
  const segments = path.split("/").filter(Boolean); 
  // e.g. /projects/logo/shop => ["projects", "logo", "shop"]


  // ----- PAGE TYPE DETECTION LOGIC ----------------------------------------

  // Exact pages
  const isProjects = path === "/projects";
  const isAbout = path === "/about";
  const isContact = path === "/contact";

  // /projects/[category]
  const isProjectCategory = /^\/projects\/[^/]+$/.test(path); // exactly 2 segments

  // /projects/[category]/[project]
  const isProjectDetails = /^\/projects\/[^/]+\/[^/]+$/.test(path); // exactly 3 segments



  // ----- ROUTE-BASED OVERLAY LOGIC --------------------------------------

  // If we're on a project details page — show special element
  if (isProjectDetails) {
    const category = segments[1] || "";
    const project = segments[2] || ""; 

    return (
      <motion.div
        key={pathname}
        initial={{ 
          opacity: 0,
          y: 30,
          filter: "blur(10px)"
        }}
        animate={{ 
          opacity: 1,
          y: 0,
          filter: "blur(0px)"
        }}
        transition={{ 
          delay: 0.3,
          duration: 0.9,
          ease: [0.16, 1, 0.3, 1],
        }}

        className={styles.overlayContainer} 
        style={{ "--topGap": "6rem" } as React.CSSProperties}
      >
        <div className={styles.overlayControls}>
          
          <Link href={`/projects/${category}`} className={styles.overlayIcon}>
            <Image
              src="/backIcon.svg"
              alt="Home Button"
              width={45}
              height={45}
              priority
            />
          </Link>

          <div className={styles.overlayLinksWrapper}>
            <div className={styles.overlayLinks}>
              <Link href="/">
                Home
              </Link>

              <p>{`>>`}</p>

              <Link href={`/projects/${category}`}>
                {category}
              </Link>

              <p>{`>>`}</p>
              
              <p>{project}</p>
            </div>
          </div>
          
          <Link href="/" className={styles.overlayIcon}>
            <Image
              src="/homeIcon.svg"
              alt="Home Button"
              width={45}
              height={45}
              priority
            />
          </Link>

        </div>
      </motion.div>
    );
  }

  // Map route → overlay image
  const overlayMap: Record<string, string> = {
    projects: "/projectsOverlay.svg",
    about: "/aboutOverlay.svg",
    contact: "/contactOverlay.svg",
  };

  let overlaySrc: string | null = null;

  if (isProjects || isProjectCategory) {
    overlaySrc = overlayMap["projects"];
  } else if (isAbout) {
    overlaySrc = overlayMap["about"];
  } else if (isContact) {
    overlaySrc = overlayMap["contact"];
  }

  // If route doesn’t match any allowed overlay page
  if (!overlaySrc) return null;

  // ----- RENDER OVERLAY IMAGE -----
  return (
    <motion.div
      key={segments[0]}
      initial={{ 
        opacity: 0,
        x: 30,
        filter: "blur(10px)"
      }}
      animate={{ 
        opacity: 1,
        x: 0,
        filter: "blur(0px)"
      }}
      transition={{ 
        delay: 0.3,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      }}

      className={styles.overlayContainer} 
      style={{ "--topGap": "9rem" } as React.CSSProperties}
    >
      <Image
        src={overlaySrc}
        alt="Page Title Overlay"
        width={164}
        height={944}
        priority
        className={styles.overlayImage}
      />
    </motion.div>
  );
}
