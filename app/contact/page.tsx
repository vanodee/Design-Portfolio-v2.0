import Image from "next/image"
import type { Metadata } from "next";
import TallyContactForm from "../components/ContactForm/TallyContactForm"
import styles from "./contactPage.module.scss"
import { socialIconsByPlatform } from "../components/Footer/Footer"
import DigitalClock from "../components/DigitalClock/DigitalClock";
import CopyEmail from "../components/CopyEmail/CopyEmail";
import { client } from "@/lib/sanity.client";
import { siteSettingsQuery } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Contact Stevano Peters - Senior Product Designer",
  description:
    "Get in touch with Senior Product Designer and front-end developer Stevano Peters to discuss projects, collaborations, or freelance opportunities.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Stevano Peters - Senior Product Designer",
    description:
      "Reach out to Senior Product Designer Stevano Peters for new projects, collaborations, and design partnerships.",
    url: "/contact",
  },
};


export default async function ContactPage() {
  const siteSettings = await client.fetch(siteSettingsQuery, {}, { next: { tags: ["siteSettings"] } });
  const socialLinks = siteSettings.socialLinks ?? [];
  const email = socialLinks.find((link: { platform: string }) => link.platform === "Email")?.email;

  return (
    <div className={styles.contactPageContainer}>

      <div className={styles.heroSection}>
        <h1 className={styles.heroHeading}>
          Get In Touch
        </h1>

        <p>
          Whether you're Hiring or Collaborating <i>or maybe Plotting world domination with a clean UI</i>, my inbox is always open. If you need a designer who understands dev constraints, or a developer who respects design intent, we should definitely talk. 
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
          <CopyEmail email={email} />
        </div>
        
        {/* SOCIALS ------------------------------------------- */}
        <div className={styles.fourthCard}>
          {socialLinks
          .filter((link: { platform: string }) => link.platform !== 'Email')
          .map(({_key, platform, url}: { _key: string; platform: string; url: string }) => (

            <a
              key={_key}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactIconContainer}
            >
              <Image
                src={socialIconsByPlatform[platform].glassSrc}
                height={95}
                width={95}
                alt={platform}
                className={styles.contactIcon}
              />
            </a>

          ))}
        </div>
      </div>

    </div>
  )
}
