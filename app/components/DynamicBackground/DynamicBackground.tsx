"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./DynamicBackground.module.scss";



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


  // Get Project Background Color stored in the DOM
  function getForcedBackground() {
    if (typeof window === "undefined") return null;

    const el = document.querySelector("[data-bgcolor]");
    const color = el?.getAttribute("data-bgcolor");
    
    return color || null;
  }


  useEffect(() => {
    async function computeBackground() {
      const forcedColor = getForcedBackground();

      let result: BgLayer;

      // If project page gave us a color → override everything
      if (forcedColor) {
        result = { type: "color", value: forcedColor };
      }

      // Homepage — IMAGE
      else if (pathname === "/") {
        result = {
          type: "image",
          value: "url('/new_folio_bg_lg.png')",
        };
      }


      // Other pages — default
      else {
        result = {
          type: "color",
          value: "#EBEEFA",
        };
      }

      console.log(`BG COLOR: ${result.value}`);

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
