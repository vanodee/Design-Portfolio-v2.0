import Image from "next/image";

type Styles = Record<string, string>;

export function LogosBrandingBody({ projectData, styles }: { projectData: any; styles: Styles }) {
  return (
    <>
      <section className={styles.customSection}>
        {/* Teaser Images ----------------------------------------------- */}
        {projectData.teaserImages?.map((teaserImage: any) => (
          <div key={teaserImage} className={styles.soloImageContainer}>
            <Image className={styles.dividerImage} src={teaserImage} height={1080} width={1920} alt="Logo teaser Image" />
          </div>
        ))}

        {/* Business Context ---------------------------------- */}
        <div className={styles.soloTextContainer}>
          <h3>{projectData.businessContextHeading}</h3>
          <p>{projectData.businessContextContent}</p>
        </div>

        {/* Problems Identified ------------------------------------------------------- */}
        <div className={`${styles.textImageRow} ${styles["textImageRow--reverse"]}`}>
          <div className={styles.textContainer}>
            <h3>{projectData.problemsIdentifiedHeading}</h3>

            <ul className={styles.bulletList}>
              {projectData.problemsIdentified?.map((problems: any) => (
                <li key={problems}>{problems}</li>
              ))}
            </ul>
          </div>

          <div className={styles.rowImageContainer}>
            <Image
              className={styles.dividerImage}
              src={projectData.problemsIdentifiedImage}
              height={1080}
              width={1920}
              alt="Project Rationale Image"
            />
          </div>
        </div>

        {/* Design Objectives ------------------------------------------------------- */}
        <div className={styles.textImageRow}>
          <div className={styles.textContainer}>
            <h3>{projectData.designObjectivesHeading}</h3>

            <ul className={styles.bulletList}>
              {projectData.designObjectives?.map((designObjective: any) => (
                <li key={designObjective}>{designObjective}</li>
              ))}
            </ul>
          </div>

          <div className={styles.rowImageContainer}>
            <Image
              className={styles.dividerImage}
              src={projectData.designObjectivesImage}
              height={1080}
              width={1920}
              alt="Project Rationale Image"
            />
          </div>
        </div>
      </section>

      {/* Design Approach Section ---------------------------------------------------- */}
      <section className={`${styles.customSection} ${styles["customSection--dark"]}`}>
        <div className={styles.soloTextContainer}>
          <h3>{projectData.designApproachHeading}</h3>
        </div>

        <div className={styles.soloInfoCard}>
          <h4>{projectData.discoveryStrategyHeading}</h4>
          <p>{projectData.discoveryStrategy}</p>
        </div>

        <div className={styles.infoCardContainer}>
          {projectData.designApproachMethods?.map((designApproachMethod: any, index: number) => (
            <div key={designApproachMethod.approachTitle} className={styles.infoCard}>
              <h4>{designApproachMethod.approachTitle}</h4>
              <p>{designApproachMethod.approachDescription}</p>
            </div>
          ))}
        </div>
      </section>

      {/* First Core Section ---------------------------------------------------- */}
      <section className={styles.customSection}>
        <div className={styles.soloTextContainer}>
          <h3>{projectData.firstCoreSectionHeading}</h3>
          <p>{projectData.firstCoreSectionText}</p>

          <ul className={styles.bulletList}>
            {projectData.firstCoreSectionList?.map((firstCoreList: any) => (
              <span key={firstCoreList}>
                <li>{firstCoreList}</li>
                <br />
              </span>
            ))}
          </ul>
        </div>

        {projectData.firstCoreLandscapeImages?.map((firstCoreLandscapeImage: any) => (
          <div key={firstCoreLandscapeImage} className={styles.soloImageContainer}>
            <Image className={styles.dividerImage} src={firstCoreLandscapeImage} height={1080} width={1920} alt="Persona" />
          </div>
        ))}

        <div className={styles.infoCardContainer}>
          
        </div>
        
        {projectData.firstCorePortraitImages && (
          <div className={styles.portraitImageContainer}>
            {projectData.firstCorePortraitImages?.map((firstCorePortraitImage: any) => (
              <Image 
                key={firstCorePortraitImage}
                className={styles.portraitImage} 
                src={firstCorePortraitImage} 
                height={1920} 
                width={1080} 
                alt="Portrait Image" 
              />
            ))}
          </div>
        )}
      </section>

      {/* Second Core Section ---------------------------------------------------- */}
      <section className={`${styles.customSection} ${styles["customSection--dark"]}`}>
        <div className={styles.soloTextContainer}>
          <h3>{projectData.secondCoreSectionHeading}</h3>
          <p>{projectData.secondCoreSectionText}</p>

          <ul className={styles.bulletList}>
            {projectData.secondCoreSectionList?.map((secondCoreList: any) => (
              <span key={secondCoreList}>
                <li>{secondCoreList}</li>
                <br />
              </span>
            ))}
          </ul>
        </div>

        {projectData.secondCoreLandscapeImages?.map((secondCoreLandscapeImage: any) => (
          <div key={secondCoreLandscapeImage} className={styles.soloImageContainer}>
            <Image className={styles.dividerImage} src={secondCoreLandscapeImage} height={1080} width={1920} alt="Persona" />
          </div>
        ))}

        {projectData.secondCorePortraitImages && (
          <div className={styles.portraitImageContainer}>
            {projectData.secondCorePortraitImages?.map((secondCorePortraitImage: any) => (
              <Image 
                key={secondCorePortraitImage}
                className={styles.portraitImage} 
                src={secondCorePortraitImage} 
                height={1920} 
                width={1080} 
                alt="Portrait Image" 
              />
            ))}
          </div>
        )}
        
      </section>

      {/* Third Core Section ---------------------------------------------------- */}
      <section className={styles.customSection}>
        <div className={styles.soloTextContainer}>
          <h3>{projectData.thirdCoreSectionHeading}</h3>
          <p>{projectData.thirdCoreSectionText}</p>

          <ul className={styles.bulletList}>
            {projectData.thirdCoreSectionList?.map((thirdCoreList: any) => (
              <span key={thirdCoreList}>
                <li>{thirdCoreList}</li>
                <br />
              </span>
            ))}
          </ul>
        </div>

        {projectData.thirdCoreLandscapeImages?.map((thirdCoreLandscapeImage: any) => (
          <div key={thirdCoreLandscapeImage} className={styles.soloImageContainer}>
            <Image className={styles.dividerImage} src={thirdCoreLandscapeImage} height={1080} width={1920} alt="Persona" />
          </div>
        ))}

        {projectData.thirdCorePortraitImages && (
          <div className={styles.portraitImageContainer}>
            {projectData.thirdCorePortraitImages?.map((thirdCorePortraitImage: any) => (
              <Image 
                key={thirdCorePortraitImage}
                className={styles.portraitImage} 
                src={thirdCorePortraitImage} 
                height={1920} 
                width={1080} 
                alt="Portrait Image" 
              />
            ))}
          </div>
        )}
      </section>

      {/* Outcomes Section ---------------------------------------------------- */}
      <section className={`${styles.customSection} ${styles["customSection--dark"]}`}>
        <div className={styles.soloTextContainer}>
          <h3>{projectData.outcomesSectionHeading}</h3>
        </div>

        <div className={styles.soloInfoCard}>
          <h4>{projectData.mainOutcomeHeading}</h4>
          <p>{projectData.mainOutcomeText}</p>
        </div>

        <div className={styles.infoCardContainer}>
          {projectData.otherOutcomes?.map((otherOutcome: any, index: number) => (
            <div key={otherOutcome.outcomeTitle} className={styles.infoCard}>
              <h4>{otherOutcome.outcomeTitle}</h4>
              <p>{otherOutcome.outcomeDescription}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.customSection}>
        {/* Key Learnings Section ------------------------------------------------------- */}
        <div className={`${styles.textImageRow} ${styles["textImageRow--reverse"]}`}>
          <div className={styles.textContainer}>
            <h3>{projectData.keyLearnHeading}</h3>

            {projectData.keyLearnText && <p>{projectData.keyLearnText}</p>}

            {projectData.keyLearnList && (
              <ul className={styles.bulletList}>
                {projectData.keyLearnList?.map((keyList: any) => (
                  <li key={keyList}>{keyList}</li>
                ))}
              </ul>
            )}
          </div>

          <div className={styles.rowImageContainer}>
            <Image className={styles.dividerImage} src={projectData.keyLearnImage} height={1080} width={1920} alt="Key Learning Image" />
          </div>
        </div>

        {/* Design Objectives ------------------------------------------------------- */}
        <div className={styles.textImageRow}>
          <div className={styles.textContainer}>
            <h3>{projectData.whatWorkedHeading}</h3>

            {projectData.whatWorkedText && <p>{projectData.whatWorkedText}</p>}

            {projectData.whatWorkedList && (
              <ul className={styles.bulletList}>
                {projectData.whatWorkedList?.map((workedList: any) => (
                  <li key={workedList}>{workedList}</li>
                ))}
              </ul>
            )}
          </div>

          <div className={styles.rowImageContainer}>
            <Image className={styles.dividerImage} src={projectData.whatWorkedImage} height={1080} width={1920} alt="What Worked Image" />
          </div>
        </div>
      </section>
    </>
  );
}

