import Link from "next/link"
import styles from "./footer.module.scss"
import Image from "next/image"


// Icon assets stay local static files, keyed by the `platform` string stored in Sanity
// (siteSettings.socialLinks) — see sanity/SCHEMA.md's siteSettings section.
export const socialIconsByPlatform: Record<string, { src: string; glassSrc: string }> = {
  Email: { src: "/email_2.svg", glassSrc: "/email_glass.svg" },
  Linkedin: { src: "/linkedin_2.svg", glassSrc: "/linkedin_glass.svg" },
  Twitter: { src: "/twitter_2.svg", glassSrc: "/twitter_glass.svg" },
}

type SocialLink = { _key: string; platform: string; url: string }

export default function Footer({ socialLinks }: { socialLinks: SocialLink[] }) {
  return (
    <footer className={styles.footer}>
      <Link href="/" className={styles.footerHomeLink}>
        <Image
          src={'/sp_logo_light.svg'}
          width={115}
          height={45}
          alt="Stevano Peters Logo"
          className={styles.footerLogo}
        />
      </Link>

      <div className={styles.footerContactInfo}>

        <div className={styles.contactItems}>
          {socialLinks.map(({_key, platform, url}) => (

            <a
              key={_key}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactIconContainer}
            >
              <Image
                src={socialIconsByPlatform[platform].src}
                height={65}
                width={65}
                alt={platform}
                className={styles.contactIcon}
              />
            </a>

          ))}
        </div>

        <div className={styles.copyright}>
          © 2026 Stevano Peters. All rights reserved.
        </div>

      </div>
    </footer>
  )
}
