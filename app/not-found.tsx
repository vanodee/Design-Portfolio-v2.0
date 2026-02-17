import Image from "next/image";
import type { Metadata } from "next";
import styles from './notFound.module.scss';
import Link from "next/link";


export const metadata: Metadata = {
  title: "Page Not Found - Stevano Peters",
  description:
    "The page you are looking for does not exist on stevano.dev. Explore the portfolio of Senior Digital Designer Stevano Peters instead.",
  alternates: {
    canonical: "/404",
  },
};

export default function NotFound() {
  return (
    <div className={styles.pageContainer}>

      <Image 
        className={styles.notFoundImage}
        src='/404_img2.svg'
        alt="404 Image"
        height={623}
        width={1191}
      />

      <h1>Page Not Found</h1>

      <p>
        The page you're looking for doesn't exist or has been moved.
      </p>

      <Link 
        href="/"
        className={styles.homeButton}
      >
        <button>Go To Homepage</button>
      </Link>

    </div>
  );
}
