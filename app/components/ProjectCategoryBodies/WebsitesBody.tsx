import Image from "next/image";

type Styles = Record<string, string>;

export function WebsitesBody({ projectData, styles }: { projectData: any; styles: Styles }) {
  return (
    <>
      <section className={styles.customSection}>
        {/* Teaser Images ----------------------------------------------- */}
        {projectData.website_teaserImages?.map((teaserImage: any) => (
          <div key={teaserImage} className={styles.soloImageContainer}>
            <Image
              className={styles.dividerImage}
              src={teaserImage}
              height={1080}
              width={1920}
              alt="Website teaser Image"
            />
          </div>
        ))}
        {projectData.website_teaserVideos?.map((teaserVideo: any, index: number) => (
          <div key={`${teaserVideo}-${index}`} className={styles.soloImageContainer}>
            <video
              className={styles.dividerImage}
              src={teaserVideo}
              poster={projectData.website_teaserVideoPosters?.[index]}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            >
              <source src={teaserVideo} type="video/mp4" />
              <source src={teaserVideo} type="video/webm" />
              Your browser does not support the video tag.
            </video>
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

        {/* Business Context ---------------------------------- */}
        <div className={styles.soloTextContainer}>
          <h3>{projectData.website_businessContextHeading}</h3>
          <p>{projectData.website_businessContextContent}</p>
        </div>

        {/* Problems Identified ------------------------------------------------------- */}
        <div className={`${styles.textImageRow} ${styles["textImageRow--reverse"]}`}>
          <div className={styles.textContainer}>
            <h3>{projectData.website_problemsIdentifiedHeading}</h3>

            <ul className={styles.bulletList}>
              {projectData.website_problemsIdentified?.map((problems: any) => (
                <li key={problems}>{problems}</li>
              ))}
            </ul>
          </div>

          <div className={styles.rowImageContainer}>
            {projectData.website_problemsIdentifiedVideo ? (
              <video
                className={styles.dividerImage}
                src={projectData.website_problemsIdentifiedVideo}
                poster={projectData.website_problemsIdentifiedVideoPoster}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              >
                <source src={projectData.website_problemsIdentifiedVideo} type="video/mp4" />
                <source src={projectData.website_problemsIdentifiedVideo} type="video/webm" />
                Your browser does not support the video tag.
              </video>
            ) : (
              projectData.website_problemsIdentifiedImage && (
                <Image
                  className={styles.dividerImage}
                  src={projectData.website_problemsIdentifiedImage}
                  height={1080}
                  width={1920}
                  alt="Project Rationale Image"
                />
              )
            )}
          </div>
        </div>

        {/* Design Objectives ------------------------------------------------------- */}
        <div className={styles.textImageRow}>
          <div className={styles.textContainer}>
            <h3>{projectData.website_designObjectivesHeading}</h3>

            <ul className={styles.bulletList}>
              {projectData.website_designObjectives?.map((designObjective: any) => (
                <li key={designObjective}>{designObjective}</li>
              ))}
            </ul>
          </div>

          <div className={styles.rowImageContainer}>
            {projectData.website_designObjectivesVideo ? (
              <video
                className={styles.dividerImage}
                src={projectData.website_designObjectivesVideo}
                poster={projectData.website_designObjectivesVideoPoster}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              >
                <source src={projectData.website_designObjectivesVideo} type="video/mp4" />
                <source src={projectData.website_designObjectivesVideo} type="video/webm" />
                Your browser does not support the video tag.
              </video>
            ) : (
              projectData.website_designObjectivesImage && (
                <Image
                  className={styles.dividerImage}
                  src={projectData.website_designObjectivesImage}
                  height={1080}
                  width={1920}
                  alt="Project Rationale Image"
                />
              )
            )}
          </div>
        </div>
      </section>

      {/* Market Context Section ---------------------------------------------------- */}
      <section className={`${styles.customSection} ${styles["customSection--dark"]}`}>
        <div className={styles.soloTextContainer}>
          <h3>{projectData.website_marketContextHeading}</h3>
          <p>{projectData.website_marketContext}</p>
        </div>

        <div className={styles.soloTextContainer}>
          <h4>{projectData.website_targetAudienceHeading}</h4>
        </div>

        <div className={styles.infoCardContainer}>
          {projectData.website_targetAudience?.map((targetAudience: any, index: number) => (
            <div key={targetAudience.member} className={styles.infoCard}>
              <h4>{targetAudience.member}</h4>
              <p>{targetAudience.rationale}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Information Architecture Section ---------------------------------------------------- */}
      <section className={styles.customSection}>
        <div className={styles.soloTextContainer}>
          <h3>{projectData.website_informationArcHeading}</h3>
          <p>{projectData.website_informationArcText}</p>
        </div>

        {projectData.website_informationArcImages?.map((iaImage: any) => (
          <div key={iaImage} className={styles.soloImageContainer}>
            <Image
              className={styles.dividerImage}
              src={iaImage}
              height={1080}
              width={1920}
              alt="Information Architecture Image"
            />
          </div>
        ))}
        {projectData.website_informationArcVideos?.map((iaVideo: any, index: number) => (
          <div key={`${iaVideo}-${index}`} className={styles.soloImageContainer}>
            <video
              className={styles.dividerImage}
              src={iaVideo}
              poster={projectData.website_informationArcVideoPosters?.[index]}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            >
              <source src={iaVideo} type="video/mp4" />
              <source src={iaVideo} type="video/webm" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      </section>

      {/* UX Structure & Planning ------------------------------------------------------- */}
      <section className={`${styles.customSection} ${styles["customSection--dark"]}`}>
        <div className={styles.soloTextContainer}>
          <h3>{projectData.website_uxStructureHeading}</h3>
          <p>{projectData.website_uxStructureText}</p>
        </div>

        {projectData.website_uxStructureItems?.map((item: any, index: number) => (
          <div
            key={item.structureName}
            className={`${styles.textImageRow} ${index % 2 === 0 ? styles["textImageRow--reverse"] : ""}`}
          >
            <div className={styles.textContainer}>
              <h3>{item.structureName}</h3>

              <ul className={styles.bulletList}>
                {item.structurePoints?.map((structurePoint: any) => (
                  <li key={structurePoint}>{structurePoint}</li>
                ))}
              </ul>
            </div>

            <div className={styles.rowImageContainer}>
              {item.structureVideo ? (
                <video
                  className={styles.dividerImage}
                  src={item.structureVideo}
                  poster={item.structureVideoPoster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                >
                  <source src={item.structureVideo} type="video/mp4" />
                  <source src={item.structureVideo} type="video/webm" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                item.structureImage && (
                  <Image
                    className={styles.dividerImage}
                    src={item.structureImage}
                    height={1080}
                    width={1920}
                    alt={`${item.competitorName} - Competitor Image`}
                  />
                )
              )}
            </div>
          </div>
        ))}
      </section>

      {/* Visual Design Section ---------------------------------------------------- */}
      <section className={styles.customSection}>
        <div className={styles.soloTextContainer}>
          <h3>{projectData.website_visualDesignHeading}</h3>
          <p>{projectData.website_visualDesignText}</p>
        </div>

        {projectData.website_visualDesignImages?.map((visualDesignImage: any) => (
          <div key={visualDesignImage} className={styles.soloImageContainer}>
            <Image
              className={styles.dividerImage}
              src={visualDesignImage}
              height={1080}
              width={1920}
              alt="Information Architecture Image"
            />
          </div>
        ))}
        {projectData.website_visualDesignVideos?.map((visualDesignVideo: any, index: number) => (
          <div key={`${visualDesignVideo}-${index}`} className={styles.soloImageContainer}>
            <video
              className={styles.dividerImage}
              src={visualDesignVideo}
              poster={projectData.website_visualDesignVideoPosters?.[index]}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            >
              <source src={visualDesignVideo} type="video/mp4" />
              <source src={visualDesignVideo} type="video/webm" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      </section>

      {/* Website Build & Implementation ------------------------------------------------------- */}
      <section className={`${styles.customSection} ${styles["customSection--dark"]}`}>
        <div className={styles.soloTextContainer}>
          <h3>{projectData.website_websiteBuildHeading}</h3>
          <p>{projectData.website_websiteBuildText}</p>
        </div>

        {projectData.website_websiteBuildItems?.map((item: any, index: number) => (
          <div
            key={item.buildItemName}
            className={`${styles.textImageRow} ${index % 2 === 0 ? styles["textImageRow--reverse"] : ""}`}
          >
            <div className={styles.textContainer}>
              <h3>{item.buildItemName}</h3>
              <p>{item.buildItemPoints}</p>
            </div>

            <div className={styles.rowImageContainer}>
              {item.buildItemVideo ? (
                <video
                  className={styles.dividerImage}
                  src={item.buildItemVideo}
                  poster={item.buildItemVideoPoster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                >
                  <source src={item.buildItemVideo} type="video/mp4" />
                  <source src={item.buildItemVideo} type="video/webm" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                item.buildItemImage && (
                  <Image
                    className={styles.dividerImage}
                    src={item.buildItemImage}
                    height={1080}
                    width={1920}
                    alt={`${item.buildItemName} Image`}
                  />
                )
              )}
            </div>
          </div>
        ))}

        {projectData.website_websiteBuildImages?.map((buildImage: any) => (
          <div key={buildImage} className={styles.soloImageContainer}>
            <Image className={styles.dividerImage} src={buildImage} height={1080} width={1920} alt="Website Build Image" />
          </div>
        ))}
        {projectData.website_websiteBuildVideos?.map((buildVideo: any, index: number) => (
          <div key={`${buildVideo}-${index}`} className={styles.soloImageContainer}>
            <video
              className={styles.dividerImage}
              src={buildVideo}
              poster={projectData.website_websiteBuildVideoPosters?.[index]}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            >
              <source src={buildVideo} type="video/mp4" />
              <source src={buildVideo} type="video/webm" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      </section>

      {/* Accessibility Section ---------------------------------------------------- */}
      <section className={styles.customSection}>
        <div className={styles.soloTextContainer}>
          <h3>{projectData.website_accessibilityHeading}</h3>

          <ul className={styles.bulletList}>
            {projectData.website_accessibilityText?.map((text: any) => (
              <li key={text}>{text}</li>
            ))}
          </ul>
        </div>

        {projectData.website_accessibilityImages?.map((accessImage: any) => (
          <div key={accessImage} className={styles.soloImageContainer}>
            <Image className={styles.dividerImage} src={accessImage} height={1080} width={1920} alt="Accessibility Image" />
          </div>
        ))}
        {projectData.website_accessibilityVideos?.map((accessVideo: any, index: number) => (
          <div key={`${accessVideo}-${index}`} className={styles.soloImageContainer}>
            <video
              className={styles.dividerImage}
              src={accessVideo}
              poster={projectData.website_accessibilityVideoPosters?.[index]}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            >
              <source src={accessVideo} type="video/mp4" />
              <source src={accessVideo} type="video/webm" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}

        <div className={`${styles.textImageRow} ${styles["textImageRow--reverse"]}`}>
          <div className={styles.textContainer}>
            <h3>{projectData.website_preLaunchHeading}</h3>

            <ul className={styles.bulletList}>
              {projectData.website_preLaunchChecks?.map((launchText: any) => (
                <li key={launchText}>{launchText}</li>
              ))}
            </ul>
          </div>

          <div className={styles.rowImageContainer}>
            {projectData.website_preLaunchVideo ? (
              <video
                className={styles.dividerImage}
                src={projectData.website_preLaunchVideo}
                poster={projectData.website_preLaunchVideoPoster}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              >
                <source src={projectData.website_preLaunchVideo} type="video/mp4" />
                <source src={projectData.website_preLaunchVideo} type="video/webm" />
                Your browser does not support the video tag.
              </video>
            ) : (
              projectData.website_preLaunchImage && (
                <Image
                  className={styles.dividerImage}
                  src={projectData.website_preLaunchImage}
                  height={1080}
                  width={1920}
                  alt="Project Rationale Image"
                />
              )
            )}
          </div>
        </div>

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
          <h3>{projectData.website_outcomesSectionHeading}</h3>
          <p>{projectData.website_mainOutcomeText}</p>
        </div>

        <div className={styles.soloTextContainer}>
          <h4>{projectData.website_mainOutcomeHeading}</h4>
        </div>

        <div className={styles.infoCardContainer}>
          {projectData.website_otherOutcomes?.map((outcome: any, index: number) => (
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
            <h3>{projectData.website_keyLearnHeading}</h3>

            {projectData.website_keyLearnText && <p>{projectData.website_keyLearnText}</p>}

            {projectData.website_keyLearnList && (
              <ul className={styles.bulletList}>
                {projectData.website_keyLearnList?.map((keyList: any) => (
                  <li key={keyList}>{keyList}</li>
                ))}
              </ul>
            )}
          </div>

          <div className={styles.rowImageContainer}>
            {projectData.website_keyLearnVideo ? (
              <video
                className={styles.dividerImage}
                src={projectData.website_keyLearnVideo}
                poster={projectData.website_keyLearnVideoPoster}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              >
                <source src={projectData.website_keyLearnVideo} type="video/mp4" />
                <source src={projectData.website_keyLearnVideo} type="video/webm" />
                Your browser does not support the video tag.
              </video>
            ) : (
              projectData.website_keyLearnImage && (
                <Image
                  className={styles.dividerImage}
                  src={projectData.website_keyLearnImage}
                  height={1080}
                  width={1920}
                  alt="Key Learning Image"
                />
              )
            )}
          </div>
        </div>

        {/* What Worked Well ------------------------------------------------------- */}
        <div className={styles.textImageRow}>
          <div className={styles.textContainer}>
            <h3>{projectData.website_whatWorkedHeading}</h3>

            {projectData.website_whatWorkedText && <p>{projectData.website_whatWorkedText}</p>}

            {projectData.website_whatWorkedList && (
              <ul className={styles.bulletList}>
                {projectData.website_whatWorkedList?.map((workedList: any) => (
                  <li key={workedList}>{workedList}</li>
                ))}
              </ul>
            )}
          </div>

          <div className={styles.rowImageContainer}>
            {projectData.website_whatWorkedVideo ? (
              <video
                className={styles.dividerImage}
                src={projectData.website_whatWorkedVideo}
                poster={projectData.website_whatWorkedVideoPoster}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              >
                <source src={projectData.website_whatWorkedVideo} type="video/mp4" />
                <source src={projectData.website_whatWorkedVideo} type="video/webm" />
                Your browser does not support the video tag.
              </video>
            ) : (
              projectData.website_whatWorkedImage && (
                <Image
                  className={styles.dividerImage}
                  src={projectData.website_whatWorkedImage}
                  height={1080}
                  width={1920}
                  alt="What Worked Image"
                />
              )
            )}
          </div>
        </div>
      </section>
    </>
  );
}

