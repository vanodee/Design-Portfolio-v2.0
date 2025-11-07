"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./DynamicBackground.module.scss";

export default function DynamicBackground() {
  const pathname = usePathname();
  const [bgStyle, setBgStyle] = useState({});

  useEffect(() => {
    // Basic example – replace with Sanity data later
    if (pathname === "/") {
      setBgStyle({ backgroundImage: "url('/new_folio_bg_lg.png')" });
    } else if (pathname.startsWith("/projects")) {
      setBgStyle({ backgroundColor: "#455BA1" }); // fallback; replace with fetched color
    } else {
      setBgStyle({ backgroundColor: "#EBEEFA" });
    }
  }, [pathname]);

  return <div className={styles.background} style={bgStyle} />;
}