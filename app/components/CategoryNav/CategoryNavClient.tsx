"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./categoryNavClient.module.scss";

export default function CategoryNavClient({ categories } : any) {
  const pathname = usePathname();

  return (
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
  );
}