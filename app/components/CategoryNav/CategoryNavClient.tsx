"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from 'react';
import styles from "./categoryNavClient.module.scss";
import Image from "next/image";



export default function CategoryNavClient({ categories } : any) {
  const pathname = usePathname();

  const activeCategory = categories.find((cat: any) => pathname.includes(`/projects/${cat.slug}`));

  // Mobile menu state
  const [mobileOpen, setMobileOpen] = useState(false);

  // refs to detect outside click
  const mobileNavRef = useRef<HTMLDivElement | null>(null);
  const toggleBtnRef = useRef<HTMLDivElement | null>(null);


  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!mobileNavRef.current) return;

      // If click is outside BOTH the nav + toggle button → close
      if (
        !mobileNavRef.current.contains(event.target as Node) &&
        !toggleBtnRef.current?.contains(event.target as Node)
      ) {
        setMobileOpen(false);
      }
    }

    if (mobileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileOpen]);


  return (
    <>
      {/* LARGE SCREEN CATEGORY NAV =============================================== */}
      <nav className={styles.categoryNav}>
        {categories.map((cat: any) => {
          const isActive = pathname.includes(`/projects/${cat.slug}`);

          return (
            <Link
              key={cat.slug}
              href={`/projects/${cat.slug}`}
              className={isActive ? styles.categoryLinkActive : styles.categoryLink}
            >
              <h2>{cat.title}</h2>
            </Link>
          );
        })}
      </nav>


      {/* SMALL SCREEN CATEGORY NAV =============================================== */}
      <div
        ref={toggleBtnRef}
        className={`${styles.mobileCategoryNav} ${mobileOpen && styles.open}`}
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? 
          <p>Please Pick a Category</p>
          : 
          <h2 className={styles.activeCategoryTitle}>{activeCategory.title}</h2>
        }

        <Image
          src='/dropdown_light.svg'
          width={16}
          height={16}
          alt="Toggle Menu"
        />

        <nav
          ref={mobileNavRef}
          className={`${styles.mobileCategoryDropdown} ${mobileOpen ? styles.open : ""}`}
        >
          {categories.map((cat: any) => {
            const isActive = pathname.includes(`/projects/${cat.slug}`);

            return (
              <Link
                key={cat.slug}
                href={`/projects/${cat.slug}`}
                className={isActive ? styles.categoryLinkActive : styles.categoryLink}
              >
                <h2>{cat.title}</h2>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
    
  );
}