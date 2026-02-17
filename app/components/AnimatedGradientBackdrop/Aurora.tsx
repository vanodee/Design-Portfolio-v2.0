import styles from "./Aurora.module.scss";
import { BlobOne, BlobTwo, BlobThree } from "./blob";

export default function Aurora() {
  return (
    <div className={styles.aurora}>
      <div className={`${styles.blob} ${styles.one}`}>
        <BlobOne />
      </div>

      <div className={`${styles.blob} ${styles.two}`}>
        <BlobTwo />
      </div>

      <div className={`${styles.blob} ${styles.three}`}>
        <BlobThree />
      </div>
    </div>
  );
}