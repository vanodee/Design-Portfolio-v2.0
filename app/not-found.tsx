import Image from "next/image";
import styles from './notFound.module.scss';
import Link from "next/link";


export default function NotFound() {
  return (
    <div className={styles.pageContainer}>

      <Image 
        className={styles.notFoundImage}
        src='/404_img.svg'
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
