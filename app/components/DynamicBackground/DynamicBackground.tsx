"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./DynamicBackground.module.scss";
import { client } from "@/lib/sanity.client";
import { groq } from "next-sanity";


interface BgLayer {
  type: "image" | "color";
  value: string; // url(...) OR #hex
}



export default function DynamicBackground() {
  const pathname = usePathname();
  const [currentBg, setCurrentBg] = useState<BgLayer>({
    type: "color",
    value: "#EBEEFA",
  });

  const [nextBg, setNextBg] = useState<BgLayer | null>(null);

  const segments = pathname.split("/").filter(Boolean);
  const isProjectDetail =
    segments.length === 3 && segments[0] === "projects";

  useEffect(() => {
    async function computeBackground() {
      let result: BgLayer;

      // Homepage — IMAGE
      if (pathname === "/") {
        result = {
          type: "image",
          value: "url('/new_folio_bg_lg.png')",
        };
      }

      // /projects/[category]/[project] — Sanity color
      else if (isProjectDetail) {
        const projectSlug = segments[2];

        const query = groq`
          *[_type == "project" && slug.current == $slug][0]{
            previewColor
          }
        `;

        const data = await client.fetch(query, { slug: projectSlug });

        result = {
          type: "color",
          value: data?.previewColor || "#EBEEFA",
        };
      }

      // /projects/* — category pages
      else if (pathname.startsWith("/projects")) {
        result = {
          type: "color",
          value: "#EBEEFA",
        };
      }

      // Other pages — default
      else {
        result = {
          type: "color",
          value: "#EBEEFA",
        };
      }

      // Only fade if background changed
      if (result.value !== currentBg.value || result.type !== currentBg.type) {
        setNextBg(result);

        setTimeout(() => {
          setCurrentBg(result);
          setNextBg(null);
        }, 400);
      }
    }

    computeBackground();
  }, [pathname]);

  return (
    <div className={styles.wrapper}>
      {/* Current Layer */}
      <div
        className={`${styles.layer} ${styles.current} ${
          currentBg.type === "image" && styles.imgLayer
        }`}
        style={{
          backgroundImage: currentBg.type === "image" ? currentBg.value : undefined,
          backgroundColor: currentBg.type === "color" ? currentBg.value : undefined,
        }}
      />

      {/* Next Layer (only appears during fade) */}
      {nextBg && (
        <div
          className={`${styles.layer} ${styles.next} ${
            nextBg.type === "image" && styles.imgLayer
          }`}
          style={{
            backgroundImage: nextBg.type === "image" ? nextBg.value : undefined,
            backgroundColor: nextBg.type === "color" ? nextBg.value : undefined,
          }}
        />
      )}
    </div>
  );
}
