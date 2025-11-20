import Image from "next/image"
import TallyContactForm from "../components/ContactForm/TallyContactForm"
import styles from "./contactPage.module.scss"


const contactIcons = [
  {name: "Email", src: "/email_2.svg", href: "mailto:stevano.peters@gmail.com"},
  {name: "Linkedin", src: "/linkedin_2.svg", href: "https://www.linkedin.com/in/stevano-peters/"},
  {name: "Twitter", src: "/twitter_2.svg", href: "https://x.com/Vano_dee"}
]


export default function ContactPage() {
  return (
    <div className={styles.contactPageContainer}>
      
      <div className={styles.contactFormContainer}>
        <TallyContactForm />
      </div>

      <div className={styles.contactInfoContainer}>
        <h1>Get In <br /> Touch</h1>

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
                height={75}
                width={75}
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
