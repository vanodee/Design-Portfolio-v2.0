import Image from "next/image";
import type { Metadata } from "next";
import styles from "./aboutPage.module.scss";
import { client } from "@/lib/sanity.client";
import { featuredToolsQuery } from "@/lib/queries";


const experiences = [
  {
    yearRange: '2025 - Present',
    title: 'Sr. Digital Designer',
    company: 'Pretsl (via Peanut Technologies)'
  },
  {
    yearRange: '2020 - 2025',
    title: 'Sr. Designer & Front-End Developer',
    company: 'T3CK Innovations'
  },
  {
    yearRange: '2023 - 2025',
    title: 'UI/UX Designer',
    company: 'ONDEKA Corporation'
  },
  {
    yearRange: '2022 - 2023',
    title: 'UX/UI Designer',
    company: 'Fottify Software Solutions'
  }
];

const brands = [
  {name: "Janettotty", logo: "/brandLogos/janettotty_logo.png"},
  {name: "DSTV", logo: "/brandLogos/dstv_logo.png"},
  {name: "Carlo Rossi", logo: "/brandLogos/carlorossi_logo.png"},
  {name: "John Hett Sports Foundation", logo: "/brandLogos/johnhett_logo.png"},
  {name: "Quintessential Communications", logo: "/brandLogos/quintessential_logo.png"},
  {name: "The Oracle Experience", logo: "/brandLogos/oracle_logo.png"},
  {name: "Ideashouse", logo: "/brandLogos/ideashouse_logo.png"},
  {name: "Nigerian Idols", logo: "/brandLogos/idols_logo.png"},
  {name: "Nigerian Breweries", logo: "/brandLogos/nb_logo.png"},
  {name: "Siqure Asset", logo: "/brandLogos/siqure_logo.png"},
  {name: "Showmax", logo: "/brandLogos/showmax_logo.png"},
  {name: "GoTV", logo: "/brandLogos/gotv_logo.png"},
  {name: "The Singleton", logo: "/brandLogos/singleton_logo.png"},
  {name: "Dunbar Ross International", logo: "/brandLogos/dunbarross_logo.png"},
  {name: "Siblings Laundromat", logo: "/brandLogos/siblings_logo.png"},
  {name: "Pretsl", logo: "/brandLogos/pretsl_logo.png"},
  {name: "Gracia Planta", logo: "/brandLogos/graciaplanta_logo.png"},
  {name: "New Innovatives", logo: "/brandLogos/newinnovatives_logo.png"},
  // {name: "Beta Computers", logo: "/brandLogos/beta_logo.png"},
  {name: "Fottify Software Solutions", logo: "/brandLogos/fottify_logo.png"},
  {name: "Peanut Technologies", logo: "/brandLogos/peanut_logo.png"},
];

export const metadata: Metadata = {
  title: "About Stevano Peters - Senior Digital Designer",
  description:
    "Learn more about Senior Digital Designer Stevano Peters, his 6+ years of experience, selected clients, and the tools he uses to design and build digital experiences.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Stevano Peters - Senior Digital Designer",
    description:
      "Discover the background, experience, and selected brands of Senior Digital Designer Stevano Peters.",
    url: "/about",
  },
};


export default async function AboutPage() {
  const tools = await client.fetch(featuredToolsQuery);

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

          {experiences.map((experience, index) => (
            <div 
              key={index}
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
          {brands.map((brand, index) => (
            <Image
              key={index}
              className={styles.brandLogo}
              src={brand.logo}
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
