import Link from "next/link"
import styles from "./footer.module.scss"
import Image from "next/image"


export const contactIcons = [
  {name: "Email", src: "/email_2.svg", href: "mailto:stevano.peters@gmail.com"},
  {name: "Linkedin", src: "/linkedin_2.svg", href: "https://www.linkedin.com/in/stevano-peters/"},
  {name: "Twitter", src: "/twitter_2.svg", href: "https://x.com/Vano_dee"}
]


export default function Footer() {
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
          <span>GET IN <br/> TOUCH</span>

          <div className={styles.contactItems}>
            {contactIcons.map(({name, src, href}) => (
                
              <a
                key={src}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactIconContainer}
              >
                <Image
                  src={src}
                  height={65}
                  width={65}
                  alt={name}
                  className={styles.contactIcon}
                />
              </a>

            ))}
          </div>
          
        </div>
    </footer>
  )
}
