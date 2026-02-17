import Image from "next/image"
import type { Metadata } from "next";
import TallyContactForm from "../components/ContactForm/TallyContactForm"
import styles from "./contactPage.module.scss"
import { contactIcons } from "../components/Footer/Footer"
import DigitalClock from "../components/DigitalClock/DigitalClock";
import CopyEmail from "../components/CopyEmail/CopyEmail";

export const metadata: Metadata = {
  title: "Contact Stevano Peters - Senior Digital Designer",
  description:
    "Get in touch with Senior Digital Designer and front-end developer Stevano Peters to discuss projects, collaborations, or freelance opportunities.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Stevano Peters - Senior Digital Designer",
    description:
      "Reach out to Senior Digital Designer Stevano Peters for new projects, collaborations, and design partnerships.",
    url: "/contact",
  },
};


export default function ContactPage() {
  return (
    <div className={styles.contactPageContainer}>

      <div className={styles.heroSection}>
        <h1 className={styles.heroHeading}>
          Get In Touch
        </h1>

        <p>
          Lorem ipsum dolor sit amet consectetur. In varius arcu leo nunc eget aliquam leo. Nisi tincidunt semper sagittis arcu sed tempor ut. Arcu morbi risus nulla magna enim dictum auctor blandit fermentum. Mauris consectetur consequat massa imperdiet lobortis quis tincidunt vel.
        </p>
      </div>

      {/* BENTO GRID ========================================================= */}
      <div className={styles.contactBentoGrid}>

        {/* LOCAL TIME ------------------------------------------- */}
        <div className={styles.firstCard}>
          <DigitalClock />
        </div>

        {/* CONTACT FORM ------------------------------------------- */}
        <div className={styles.secondCard}>
          <TallyContactForm />
        </div>

        {/* EMAIL ------------------------------------------- */}
        <div className={styles.thirdCard}>
          <CopyEmail />
        </div>
        
        {/* SOCIALS ------------------------------------------- */}
        <div className={styles.fourthCard}>
          {contactIcons
          .filter(icon => icon.name !== 'Email')
          .map(({name, glassSrc, href}) => (
            
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactIconContainer}
            >
              <Image
                src={glassSrc}
                height={95}
                width={95}
                alt={name}
                className={styles.contactIcon}
              />
            </a>

          ))}
        </div>
      </div>

    </div>
  )
}
