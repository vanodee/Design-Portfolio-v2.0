import Image from "next/image";
import type { Metadata } from "next";
import styles from "./aboutPage.module.scss";
import { client } from "@/lib/sanity.client";
import { featuredToolsQuery, siteSettingsQuery } from "@/lib/queries";

export const metadata: Metadata = {
  title: "About Stevano Peters - Senior Product Designer",
  description:
    "Learn more about Senior Product Designer Stevano Peters, his 6+ years of experience, selected clients, and the tools he uses to design and build digital experiences.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Stevano Peters - Senior Product Designer",
    description:
      "Discover the background, experience, and selected brands of Senior Product Designer Stevano Peters.",
    url: "/about",
  },
};


export default async function AboutPage() {
  const tools = await client.fetch(featuredToolsQuery);
  const siteSettings = await client.fetch(siteSettingsQuery);
  const experiences = siteSettings.experience ?? [];
  const brands = siteSettings.clients ?? [];

  return (
    <div className={styles.aboutPageContainer}>
      
      <div className={styles.heroSection}>
        <h1 className={styles.heroHeading}>
          Nice To Meet You...
        </h1>

        <p>
          I'm someone whose work sits between branding, UX, and frontend engineering <i>(In simpler terms: "A Designer who Codes")</i>. I care about hierarchy, accessibility, performance ... and naming layers properly. I create functional, user-friendly designs.
        </p>
      </div>

      {/* BENTO GRID ========================================================= */}
      <div className={styles.aboutBentoGrid}>

        {/* MY PHOTO ------------------------------------------- */}
        <div className={styles.firstCard}>
          <Image
            className={styles.myPhoto}
            src="/stevano_new.webp"
            width={700}
            height={700}
            alt="Photo of Stevano Peters"
          />
        </div>

        {/* KEY STATS ------------------------------------------- */}
        <div className={styles.secondCard}>
          <div className={styles.statContainer}>
            <p>06+</p>
            <p>Years Of Experience</p>
          </div>

          <div className={styles.statContainer}>
            <p>150+</p>
            <p>Projects Completed</p>
          </div>
        </div>

        {/* TOOLS ------------------------------------------- */}
        <div className={styles.thirdCard}>
          <div className={styles.logosContainer}>
            {tools.map((tool:any) => (
              <Image
                key={tool._id}
                className={styles.toolLogo}
                src={tool.iconUrl}
                width={40}
                height={40}
                alt={tool.title}
              />
            ))}
          </div>
          
          <Image
            className={styles.textBg}
            src="/tools_text_bg.png"
            width={293.44}
            height={93.95}
            alt=""
          />
        </div>

        {/* CAREER TIMELINE ------------------------------------------- */}
        <div className={styles.fourthCard}>
          <div className={styles.roleLine}/>

          {experiences.map((experience: any) => (
            <div
              key={experience._key}
              className={styles.roleContainer}
            >
              <div className={styles.roleDot}/>

              <div className={styles.roleContent}>
                <p>{experience.yearRange}</p>
                <h4>{experience.title}</h4>
                <p>{experience.company}</p>
              </div>
            </div>
          ))}
        </div>

        {/* BIO TEXT ------------------------------------------- */}
        <div className={styles.fifthCard}>
          <p>
            I believe I've spent enough years toggling between Figma, code editors, and brand decks, to know that good design doesn't survive without structure. What began in branding evolved into UX systems and frontend builds. Today, I design with constraints in mind and build with intent.
            <br />
            <br />
            My work focuses on design systems, scalable interfaces, and digital experiences built for longevity, not just launch day screenshots. I care about component logic, naming things properly, accessible interfaces, and pixels that actually earn their place.
            <br />
            <br />
            In my opinion, the best products feel effortless because the hard thinking already happened. As such, my goal isn't just to make things look good. It's to make them make sense.
            <br />
            <br />
            Still refining. Still building. Always zoomed in on the canvas, but never losing sight of the bigger picture.
          </p>
        </div>

        {/* BRANDS ------------------------------------------- */}
        <div className={styles.sixthCard}>
          {brands.map((brand: any) => (
            <Image
              key={brand._key}
              className={styles.brandLogo}
              src={brand.logoUrl}
              width={300}
              height={100}
              alt={`${brand.name} Logo`}
            />
          ))}

          <Image
            className={styles.textBg}
            src="/brands_text_bg.png"
            width={399.17}
            height={93.95}
            alt=""
          />
        </div>
      </div>

    </div>
  )
}
