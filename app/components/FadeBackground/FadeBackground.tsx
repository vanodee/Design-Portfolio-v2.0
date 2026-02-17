"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./FadeBackground.module.scss";



export default function FadeBackground() {
  return (
    <div
        className={styles.fadeBG}
        style={{backgroundImage: "url('/new_folio_bg_2.png')"}}
    />
  )
}
