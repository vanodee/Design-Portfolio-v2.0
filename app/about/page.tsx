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
    title: 'Graphic Desiger / Front-End Dev',
    company: 'T3CK Innovations'
  },
  {
    yearRange: '2022 - 2025',
    title: 'UI/UX Designer',
    company: 'ONDEKA Corporation'
  },
  {
    yearRange: '2025 - Present',
    title: 'Sr. Digital Designer',
    company: 'Pretsl (via Peanut Technologies)'
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
          Lorem ipsum dolor sit amet consectetur. In varius arcu leo nunc eget aliquam leo. Nisi tincidunt semper sagittis arcu sed tempor ut. Arcu morbi risus nulla magna enim dictum auctor blandit fermentum. Mauris consectetur consequat massa imperdiet lobortis quis tincidunt vel.
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
            <p>50+</p>
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
            Lorem ipsum dolor sit amet consectetur. Viverra sagittis malesuada porttitor integer nec a egestas. Nunc leo montes nullam blandit eu lectus. Rutrum urna feugiat leo faucibus sem a. Adipiscing platea morbi tempus quis fringilla mauris. Urna nunc adipiscing nibh potenti amet libero eget convallis fermentum. Erat pulvinar ac elementum sed urna a etiam cras. 
            <br />
            <br />
            Eget pellentesque fringilla id posuere quis sed elit nec sed. Aliquam mauris massa sed tristique. Pellentesque eu odio egestas euismod magna. Odio nec amet vitae et viverra mauris justo tincidunt fames. Blandit potenti vitae sed laoreet quis pharetra porta at. Feugiat massa gravida lacus massa. In eget eget non ultricies. Non non ut eget bibendum rhoncus tortor nunc odio. Euismod nulla id integer suspendisse sed. Nec est mi arcu amet. Ut sit accumsan porta ultricies vestibulum massa risus mattis. Tempor auctor ac malesuada elit morbi molestie faucibus fringilla. Ipsum integer scelerisque felis id. 
            <br />
            <br />
            Quam diam enim vitae elementum imperdiet ut eleifend. Nulla tristique nunc sed mauris turpis. Ac placerat platea aliquam in condimentum consectetur leo tincidunt vestibulum. Sagittis cursus suscipit enim risus. Ligula sodales venenatis vulputate quis id tellus porttitor nisl. Amet aenean at a duis diam. Suscipit phasellus tristique dui quam arcu integer integer. Bibendum iaculis ante sed in sed leo a eget placerat. Cras pulvinar nulla in egestas id egestas magna id. Id pellentesque pharetra arcu tristique.
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
