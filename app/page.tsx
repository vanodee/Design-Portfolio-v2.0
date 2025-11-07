import Image from "next/image";
import styles from "./home.module.scss";

export default function Home() {
  return (
    <>
      <h1 className={styles.heroHeading}>
        Designer. Developer. Brand Builder.
      </h1>

      <p className={styles.heroBody}>
        Lorem ipsum dolor sit amet consectetur. In varius arcu leo nunc eget aliquam leo. Nisi tincidunt semper sagittis arcu sed tempor ut. Arcu morbi risus nulla magna enim dictum auctor blandit fermentum. Mauris consectetur consequat massa imperdiet lobortis quis tincidunt vel.
      </p>

      <div className={styles.buttonGroup}>
        <button>Explore My Work</button>
        <button>View My Resume</button>
      </div>

      <div className={styles.categoryCards}>
        Project Category Cards
      </div>
    </>
  );
}
