import Image from "next/image";

type Styles = Record<string, string>;

export function WebAppsBody({ projectData, styles }: { projectData: any; styles: Styles }) {
  return (
    <>
      <section className={styles.customSection}>
        {/* Teaser Images ----------------------------------------------- */}
        {projectData.webApp_teaserImages?.map((teaserImage: any) => (
          <div key={teaserImage} className={styles.soloImageContainer}>
            <Image
              className={styles.dividerImage}
              src={teaserImage}
              height={1080}
              width={1920}
              alt="Web App teaser Image"
            />
          </div>
        ))}

        {/* Project Live Links ----------------------------------------------------------- */}
        <div className={styles.liveLinkContainer}>
          {projectData.liveLinks?.map((liveLink: any, index: number) => (
            <a
              key={index}
              href={liveLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.liveLink}
            >
              <Image
                className={styles.liveLinkIcon}
                src={`/${liveLink.ctaIcon}LinkIcon.svg`}
                height={50}
                width={50}
                alt="Live Link Icon"
              />

              <div className={styles.liveLinkText}>
                <p>{liveLink.text}</p>

                {liveLink.subText && (
                  <p>{`[${liveLink.subText}]`}</p>
                )}
                
              </div>
            </a>
          ))}
        </div>

        {/* Project Context ------------------------------------------------------- */}
        <div className={styles.textImageRow}>
          <div className={styles.textContainer}>
            <h3>{projectData.webApp_productContextHeading}</h3>
            <p>{projectData.webApp_productContext}</p>
          </div>

          <div className={styles.rowImageContainer}>
            <Image
              className={styles.dividerImage}
              src={projectData.webApp_productContextImage}
              height={1080}
              width={1920}
              alt="Project Rationale Image"
            />
          </div>
        </div>
      </section>

      {/* Problems and Goals ---------------------------------------------------- */}
      <section className={`${styles.customSection} ${styles["customSection--dark"]}`}>
        <div className={`${styles.infoCardContainer} ${styles["infoCardContainer--2"]}`}>
          {projectData.webApp_probGoals?.map((probGoal: any, index: number) => (
            <div key={probGoal.probGoalName} className={styles.infoCard}>
              <h4>{probGoal.probGoalName}</h4>

              <ul className={styles.bulletList}>
                {probGoal.probGoalList?.map((item: any) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.customSection}>
        {/* Discovery & Product Strategy ---------------------------------- */}
        <div className={styles.soloTextContainer}>
          <h3>{projectData.webApp_productStratHeading}</h3>
          <p>{projectData.webApp_productStratContent}</p>
        </div>

        {/* UX Hypothesis ------------------------------------------------------- */}
        <div className={`${styles.textImageRow} ${styles["textImageRow--reverse"]}`}>
          <div className={styles.textContainer}>
            <h3>{projectData.webApp_uxHypothesisHeading}</h3>

            <ul className={styles.bulletList}>
              {projectData.webApp_uxHypothesis?.map((hypothesis: any) => (
                <li key={hypothesis}>{hypothesis}</li>
              ))}
            </ul>
          </div>

          <div className={styles.rowImageContainer}>
            <Image
              className={styles.dividerImage}
              src={projectData.webApp_uxHypothesisImage}
              height={1080}
              width={1920}
              alt="UX Hypothesis Image"
            />
          </div>
        </div>

        {projectData.webApp_initialDesignImages?.map((initialImg: any) => (
          <div key={initialImg} className={styles.soloImageContainer}>
            <Image
              className={styles.dividerImage}
              src={initialImg}
              height={1080}
              width={1920}
              alt="Initial Design Image"
            />
          </div>
        ))}
      </section>

      {/* Project Scope Section ---------------------------------------------------- */}
      <section className={`${styles.customSection} ${styles["customSection--dark"]}`}>
        <div className={styles.soloTextContainer}>
          <h3>{projectData.webApp_prodScopeHeading}</h3>
          <p>{projectData.webApp_prodScope}</p>
        </div>

        <div className={styles.infoCardContainer}>
          {projectData.webApp_prodScopeItems?.map((item: any, index: number) => (
            <div key={item.itemTitle} className={styles.infoCard}>
              <h4>{item.itemTitle}</h4>
              <p>{item.itemRationale}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Design Section ---------------------------------------------------------------- */}
      <section className={styles.customSection}>
        <div className={styles.soloTextContainer}>
          <h3>{projectData.webApp_designSectionHeading}</h3>
          <p>{projectData.webApp_designSectionText}</p>
        </div>

        {projectData.webApp_designSectionImages?.map((designImg: any) => (
          <div key={designImg} className={styles.soloImageContainer}>
            <Image className={styles.dividerImage} src={designImg} height={1080} width={1920} alt="Design Image" />
          </div>
        ))}

        {projectData.webApp_designSectionItems?.map((item: any, index: number) => (
          <div
            key={item.itemName}
            className={`${styles.textImageRow} ${index % 2 === 0 ? styles["textImageRow--reverse"] : ""}`}
          >
            <div className={styles.textContainer}>
              <h3>{item.itemName}</h3>

              <ul className={styles.bulletList}>
                {item.itemPoints?.map((Point: any) => (
                  <li key={Point}>{Point}</li>
                ))}
              </ul>
            </div>

            <div className={styles.rowImageContainer}>
              <Image
                className={styles.dividerImage}
                src={item.itemImage}
                height={1080}
                width={1920}
                alt={`${item.itemName} Image`}
              />
            </div>
          </div>
        ))}
      </section>

      {/* Developer Section ---------------------------------------------------------------- */}
      <section className={`${styles.customSection} ${styles["customSection--dark"]}`}>
        <div className={styles.soloTextContainer}>
          <h3>{projectData.webApp_devSectionHeading}</h3>
          <p>{projectData.webApp_devSectionText}</p>
        </div>

        {projectData.webApp_devSectionImages?.map((devImg: any) => (
          <div key={devImg} className={styles.soloImageContainer}>
            <Image
              className={styles.dividerImage}
              src={devImg}
              height={1080}
              width={1920}
              alt="Dev section Image"
            />
          </div>
        ))}

        {projectData.webApp_devSectionItems?.map((item: any, index: number) => (
          <div
            key={item.itemName}
            className={`${styles.textImageRow} ${index % 2 === 0 ? styles["textImageRow--reverse"] : ""}`}
          >
            <div className={styles.textContainer}>
              <h3>{item.itemName}</h3>
              <p>{item.itemPoints}</p>
            </div>

            <div className={styles.rowImageContainer}>
              <Image
                className={styles.dividerImage}
                src={item.itemImage}
                height={1080}
                width={1920}
                alt={`${item.itemName} Image`}
              />
            </div>
          </div>
        ))}
      </section>

      {/* Finished Product ------------------------------------------------------------- */}
      <section className={styles.customSection}>
        <div className={styles.soloTextContainer}>
          <h3>{projectData.webApp_finishedProdHeading}</h3>
          <p>{projectData.webApp_finishedProdText}</p>
        </div>

        {projectData.webApp_finishedProdImages?.map((finishedImg: any) => (
          <div key={finishedImg} className={styles.soloImageContainer}>
            <Image
              className={styles.dividerImage}
              src={finishedImg}
              height={1080}
              width={1920}
              alt="Finished Product Image"
            />
          </div>
        ))}

        {/* Project Live Links ----------------------------------------------------------- */}
        <div className={styles.liveLinkContainer}>
          {projectData.liveLinks?.map((liveLink: any, index: number) => (
            <a
              key={index}
              href={liveLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.liveLink}
            >
              <Image
                className={styles.liveLinkIcon}
                src={`/${liveLink.ctaIcon}LinkIcon.svg`}
                height={50}
                width={50}
                alt="Live Link Icon"
              />

              <div className={styles.liveLinkText}>
                <p>{liveLink.text}</p>

                {liveLink.subText && (
                  <p>{`[${liveLink.subText}]`}</p>
                )}
                
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Outcomes Section ---------------------------------------------------- */}
      <section className={`${styles.customSection} ${styles["customSection--dark"]}`}>
        <div className={styles.soloTextContainer}>
          <h3>{projectData.webApp_outcomesSectionHeading}</h3>
          <p>{projectData.webApp_mainOutcomeText}</p>
        </div>

        <div className={styles.soloTextContainer}>
          <h4>{projectData.webApp_mainOutcomeHeading}</h4>
        </div>

        <div className={styles.infoCardContainer}>
          {projectData.webApp_otherOutcomes?.map((outcome: any, index: number) => (
            <div key={outcome.outcomeTitle} className={styles.infoCard}>
              <h4>{outcome.outcomeTitle}</h4>
              <p>{outcome.outcomeDescription}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.customSection}>
        {/* Key Learnings Section ------------------------------------------------------- */}
        <div className={`${styles.textImageRow} ${styles["textImageRow--reverse"]}`}>
          <div className={styles.textContainer}>
            <h3>{projectData.webApp_keyLearnHeading}</h3>

            {projectData.webApp_keyLearnText && <p>{projectData.webApp_keyLearnText}</p>}

            {projectData.webApp_keyLearnList && (
              <ul className={styles.bulletList}>
                {projectData.webApp_keyLearnList?.map((keyList: any) => (
                  <li key={keyList}>{keyList}</li>
                ))}
              </ul>
            )}
          </div>

          <div className={styles.rowImageContainer}>
            <Image
              className={styles.dividerImage}
              src={projectData.webApp_keyLearnImage}
              height={1080}
              width={1920}
              alt="Key Learning Image"
            />
          </div>
        </div>

        {/* What Worked Well ------------------------------------------------------- */}
        <div className={styles.textImageRow}>
          <div className={styles.textContainer}>
            <h3>{projectData.webApp_whatWorkedHeading}</h3>

            {projectData.webApp_whatWorkedText && <p>{projectData.webApp_whatWorkedText}</p>}

            {projectData.webApp_whatWorkedList && (
              <ul className={styles.bulletList}>
                {projectData.webApp_whatWorkedList?.map((workedList: any) => (
                  <li key={workedList}>{workedList}</li>
                ))}
              </ul>
            )}
          </div>

          <div className={styles.rowImageContainer}>
            <Image
              className={styles.dividerImage}
              src={projectData.webApp_whatWorkedImage}
              height={1080}
              width={1920}
              alt="What Worked Image"
            />
          </div>
        </div>
      </section>
    </>
  );
}

