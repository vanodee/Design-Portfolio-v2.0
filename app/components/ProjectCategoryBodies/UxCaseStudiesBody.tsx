import Image from "next/image";

type Styles = Record<string, string>;

export function UxCaseStudiesBody({ projectData, styles }: { projectData: any; styles: Styles }) {
  return (
    <>
      <section className={styles.customSection}>
        {/* Platform Gifs ------------------------------- */}
        <div className={styles.soloImageContainer}>
          {projectData.platformImages?.map((platformImage: any) => (
            <Image
              key={platformImage}
              className={styles.dividerImage}
              src={platformImage}
              height={1080}
              width={1920}
              alt="Platform Image"
            />
          ))}
          {projectData.platformVideos?.map((platformVideo: any, index: number) => (
            <video
              key={`${platformVideo}-${index}`}
              className={styles.dividerImage}
              src={platformVideo}
              poster={projectData.platformVideoPosters?.[index]}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            >
              <source src={platformVideo} type="video/mp4" />
              <source src={platformVideo} type="video/webm" />
              Your browser does not support the video tag.
            </video>
          ))}
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

        {/* Text + Image Row ------------------------------- */}
        <div className={`${styles.textImageRow} ${styles["textImageRow--reverse"]}`}>
          <div className={styles.textContainer}>
            <h3>{projectData.projectRationaleHeading}</h3>
            <p>{projectData.projectRationale}</p>
          </div>

          <div className={styles.rowImageContainer}>
            {projectData.projectRationaleVideo ? (
              <video
                className={styles.dividerImage}
                src={projectData.projectRationaleVideo}
                poster={projectData.projectRationaleVideoPoster}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              >
                <source src={projectData.projectRationaleVideo} type="video/mp4" />
                <source src={projectData.projectRationaleVideo} type="video/webm" />
                Your browser does not support the video tag.
              </video>
            ) : (
              projectData.projectRationaleImage && (
                <Image
                  className={styles.dividerImage}
                  src={projectData.projectRationaleImage}
                  height={1080}
                  width={1920}
                  alt="Project Rationale Image"
                />
              )
            )}
          </div>
        </div>
      </section>

      {/* ====================================== SECTION DIVIDER =================================== */}
      <div className={styles.dividerImageContainer}>
        <h2>{projectData.researchSectionTitle}</h2>

        {projectData.researchSectionVideo ? (
          <video
            className={styles.dividerImage}
            src={projectData.researchSectionVideo}
            poster={projectData.researchSectionVideoPoster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src={projectData.researchSectionVideo} type="video/mp4" />
            <source src={projectData.researchSectionVideo} type="video/webm" />
            Your browser does not support the video tag.
          </video>
        ) : (
          projectData.researchSectionImage && (
            <Image
              className={styles.dividerImage}
              src={projectData.researchSectionImage}
              height={1080}
              width={1920}
              alt="Research Divider Image"
            />
          )
        )}
      </div>
      {/* ====================================== ************* =================================== */}

      {/* Market Research ------------------------------- */}
      <section className={styles.customSection}>
        <div className={styles.textImageRow}>
          <div className={styles.textContainer}>
            <h3>{projectData.marketResearchHeading}</h3>
            <p>{projectData.marketResearchContent}</p>
          </div>

          <div className={styles.rowImageContainer}>
            {projectData.marketResearchVisualVideo ? (
              <video
                className={styles.dividerImage}
                src={projectData.marketResearchVisualVideo}
                poster={projectData.marketResearchVisualVideoPoster}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              >
                <source src={projectData.marketResearchVisualVideo} type="video/mp4" />
                <source src={projectData.marketResearchVisualVideo} type="video/webm" />
                Your browser does not support the video tag.
              </video>
            ) : (
              projectData.marketResearchVisual && (
                <Image
                  className={styles.dividerImage}
                  src={projectData.marketResearchVisual}
                  height={1080}
                  width={1920}
                  alt="Market Research Image"
                />
              )
            )}
          </div>
        </div>
      </section>

      {/* Competitve Analysis ------------------------------------------------------- */}
      <section className={`${styles.customSection} ${styles["customSection--dark"]}`}>
        <div className={styles.soloTextContainer}>
          <h3>{projectData.competitiveAnalysisHeading}</h3>
          <p>{projectData.competitiveAnalysisIntro}</p>
        </div>

        {projectData.competitors?.map((competitor: any, index: number) => (
          <div 
            key={competitor.competitorName} 
            className={`${styles.textImageRow} ${index % 2 === 0 ? styles["textImageRow--reverse"] : ""}`}
          >
            <div className={styles.textContainer}>
              <h3>{`${competitor.competitorName} (${competitor.competitorType})`}</h3>
              <p>
                {" "}
                <strong>Pros: </strong> {competitor.competitorPros}
              </p>

              <br />

              <p>
                {" "}
                <strong>Cons: </strong> {competitor.competitorCons}
              </p>
            </div>

            <div className={styles.rowImageContainer}>
              {competitor.competitorVideo ? (
                <video
                  className={styles.dividerImage}
                  src={competitor.competitorVideo}
                  poster={competitor.competitorVideoPoster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                >
                  <source src={competitor.competitorVideo} type="video/mp4" />
                  <source src={competitor.competitorVideo} type="video/webm" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                competitor.competitorImage && (
                  <Image
                    className={styles.dividerImage}
                    src={competitor.competitorImage}
                    height={1080}
                    width={1920}
                    alt={`${competitor.competitorName} - Competitor Image`}
                  />
                )
              )}
            </div>
          </div>
        ))}

        {/* Opportunities Section ---------------------------------------- */}
        <div className={styles.textImageRow}>
          <div className={styles.textContainer}>
            <h3>{projectData.opportunitiesHeading}</h3>

            <ul className={styles.bulletList}>
              {projectData.opportunitiesList?.map((opportunity: any) => (
                <li key={opportunity}>{opportunity}</li>
              ))}
            </ul>
          </div>

          <div className={styles.rowImageContainer}>
            {projectData.opportunitiesVideo ? (
              <video
                className={styles.dividerImage}
                src={projectData.opportunitiesVideo}
                poster={projectData.opportunitiesVideoPoster}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              >
                <source src={projectData.opportunitiesVideo} type="video/mp4" />
                <source src={projectData.opportunitiesVideo} type="video/webm" />
                Your browser does not support the video tag.
              </video>
            ) : (
              projectData.opportunitiesImage && (
                <Image
                  className={styles.dividerImage}
                  src={projectData.opportunitiesImage}
                  height={1080}
                  width={1920}
                  alt="Opportunities Image"
                />
              )
            )}
          </div>
        </div>
      </section>

      {/* User Survey Section ---------------------------------------- */}
      <section className={styles.customSection}>
        <div className={styles.soloTextContainer}>
          <h3>{projectData.userSurveyHeading}</h3>
          <p>{projectData.userSurveyIntro}</p>
        </div>

        {projectData.surveyCharts?.map((surveyChart: any) => (
          <div key={surveyChart} className={styles.soloImageContainer}>
            <Image className={styles.dividerImage} src={surveyChart} height={1080} width={1920} alt="Survery Chart" />
          </div>
        ))}
        {projectData.surveyChartsVideo?.map((surveyChartVideo: any, index: number) => (
          <div key={`${surveyChartVideo}-${index}`} className={styles.soloImageContainer}>
            <video
              className={styles.dividerImage}
              src={surveyChartVideo}
              poster={projectData.surveyChartsVideoPoster?.[index]}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            >
              <source src={surveyChartVideo} type="video/mp4" />
              <source src={surveyChartVideo} type="video/webm" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}

        {/* Assumptions Validated ---------------------------------------------------- */}
        <div className={`${styles.textImageRow} ${styles["textImageRow--reverse"]}`}>
          <div className={styles.textContainer}>
            <h3>{projectData.assumptionValidationHeading}</h3>

            <ul className={styles.bulletList}>
              {projectData.assumptionValidation?.map((validations: any) => (
                <li key={validations}>{validations}</li>
              ))}
            </ul>
          </div>

          <div className={styles.rowImageContainer}>
            {projectData.assumptionValidationVideo ? (
              <video
                className={styles.dividerImage}
                src={projectData.assumptionValidationVideo}
                poster={projectData.assumptionValidationVideoPoster}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              >
                <source src={projectData.assumptionValidationVideo} type="video/mp4" />
                <source src={projectData.assumptionValidationVideo} type="video/webm" />
                Your browser does not support the video tag.
              </video>
            ) : (
              projectData.assumptionValidationImage && (
                <Image
                  className={styles.dividerImage}
                  src={projectData.assumptionValidationImage}
                  height={1080}
                  width={1920}
                  alt="Section Image"
                />
              )
            )}
          </div>
        </div>
      </section>

      {/* Insights & Assumptions ---------------------------------------------------- */}
      <section className={`${styles.customSection} ${styles["customSection--dark"]}`}>
        <div className={styles.soloTextContainer}>
          <h3>{projectData.keyInsightsHeading}</h3>
        </div>

        <div className={styles.infoCardContainer}>
          {projectData.keyInsights?.map((insight: any, index: number) => (
            <div key={insight} className={styles.infoCard}>
              <h4>{index + 1}</h4>
              <p>{insight}</p>
            </div>
          ))}
        </div>

        <div className={styles.soloInfoCard}>
          <h4>Opportunity</h4>
          <p>{projectData.opportunityText}</p>
        </div>
      </section>

      {/* Personas ---------------------------------------------------- */}
      <section className={styles.customSection}>
        <div className={styles.soloTextContainer}>
          <h3>{projectData.personasHeading}</h3>
          <p>{projectData.personasIntro}</p>
        </div>

        {projectData.personas?.map((persona: any) => (
          <div key={persona} className={styles.soloImageContainer}>
            <Image className={styles.dividerImage} src={persona} height={1080} width={1920} alt="Persona" />
          </div>
        ))}
        {projectData.personasVideo?.map((personaVideo: any, index: number) => (
          <div key={`${personaVideo}-${index}`} className={styles.soloImageContainer}>
            <video
              className={styles.dividerImage}
              src={personaVideo}
              poster={projectData.personasVideoPoster?.[index]}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            >
              <source src={personaVideo} type="video/mp4" />
              <source src={personaVideo} type="video/webm" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      </section>

      {/* Problem Statement / Research Summary ---------------------------------------------------- */}
      <section className={`${styles.customSection} ${styles["customSection--dark"]}`}>
        <div className={styles.soloTextContainer}>
          <h3>{projectData.problemStatementHeading}</h3>
          <p>{projectData.problemStatement}</p>
        </div>

        <div className={styles.soloTextContainer}>
          <h3>{projectData.designGoalsHeading}</h3>
        </div>

        <div className={styles.infoCardContainer}>
          {projectData.designGoals?.map((designGoal: any, index: number) => (
            <div key={designGoal} className={styles.infoCard}>
              <h4>{index + 1}</h4>
              <p>{designGoal}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ====================================== SECTION DIVIDER =================================== */}
      <div className={styles.dividerImageContainer}>
        <h2>{projectData.ideationSectionTitle}</h2>

        {projectData.ideationSectionVideo ? (
          <video
            className={styles.dividerImage}
            src={projectData.ideationSectionVideo}
            poster={projectData.ideationSectionVideoPoster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src={projectData.ideationSectionVideo} type="video/mp4" />
            <source src={projectData.ideationSectionVideo} type="video/webm" />
            Your browser does not support the video tag.
          </video>
        ) : (
          projectData.ideationSectionImage && (
            <Image
              className={styles.dividerImage}
              src={projectData.ideationSectionImage}
              height={1080}
              width={1920}
              alt="Ideation Divider Image"
            />
          )
        )}
      </div>
      {/* ====================================== ************* =================================== */}

      {/* User Flow Section ---------------------------------------- */}
      <section className={styles.customSection}>
        <div className={styles.soloTextContainer}>
          <h3>{projectData.userFlowHeading}</h3>
          <p>{projectData.userFlowDescription}</p>
        </div>

        {projectData.userFlowDiagrams?.map((userFlowDiagram: any) => (
          <div key={userFlowDiagram} className={styles.soloImageContainer}>
            <Image
              className={styles.dividerImage}
              src={userFlowDiagram}
              height={1080}
              width={1920}
              alt="User Flow Diagram"
            />
          </div>
        ))}
        {projectData.userFlowDiagramsVideo?.map((userFlowDiagramVideo: any, index: number) => (
          <div key={`${userFlowDiagramVideo}-${index}`} className={styles.soloImageContainer}>
            <video
              className={styles.dividerImage}
              src={userFlowDiagramVideo}
              poster={projectData.userFlowDiagramsVideoPoster?.[index]}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            >
              <source src={userFlowDiagramVideo} type="video/mp4" />
              <source src={userFlowDiagramVideo} type="video/webm" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      </section>

      {/* Infomation Architecture ---------------------------------------------------- */}
      <section className={`${styles.customSection} ${styles["customSection--dark"]}`}>
        <div className={styles.soloTextContainer}>
          <h3>{projectData.informationArchitectureHeading}</h3>
          <p>{projectData.informationArchitectureDescription}</p>
        </div>

        <div className={styles.soloImageContainer}>
          {projectData.informationArchitectureVideo ? (
            <video
              className={styles.dividerImage}
              src={projectData.informationArchitectureVideo}
              poster={projectData.informationArchitectureVideoPoster}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            >
              <source src={projectData.informationArchitectureVideo} type="video/mp4" />
              <source src={projectData.informationArchitectureVideo} type="video/webm" />
              Your browser does not support the video tag.
            </video>
          ) : (
            projectData.informationArchitectureImage && (
              <Image
                className={styles.dividerImage}
                src={projectData.informationArchitectureImage}
                height={1080}
                width={1920}
                alt="Information Architecture Diagram"
              />
            )
          )}
        </div>
      </section>

      {/* Wireframes Section ---------------------------------------- */}
      <section className={styles.customSection}>
        <div className={styles.soloTextContainer}>
          <h3>{projectData.wireframesHeading}</h3>
          <p>{projectData.wireframesDescription}</p>
        </div>

        {projectData.wireframeImages?.map((wireframeImage: any) => (
          <div key={wireframeImage} className={styles.soloImageContainer}>
            <Image className={styles.dividerImage} src={wireframeImage} height={1080} width={1920} alt="User Flow Diagram" />
          </div>
        ))}
        {projectData.wireframeVideos?.map((wireframeVideo: any, index: number) => (
          <div key={`${wireframeVideo}-${index}`} className={styles.soloImageContainer}>
            <video
              className={styles.dividerImage}
              src={wireframeVideo}
              poster={projectData.wireframeVideoPosters?.[index]}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            >
              <source src={wireframeVideo} type="video/mp4" />
              <source src={wireframeVideo} type="video/webm" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      </section>

      {/* ====================================== SECTION DIVIDER =================================== */}
      <div className={styles.dividerImageContainer}>
        <h2>{projectData.visualDesignSectionTitle}</h2>

        {projectData.visualDesignSectionVideo ? (
          <video
            className={styles.dividerImage}
            src={projectData.visualDesignSectionVideo}
            poster={projectData.visualDesignSectionVideoPoster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src={projectData.visualDesignSectionVideo} type="video/mp4" />
            <source src={projectData.visualDesignSectionVideo} type="video/webm" />
            Your browser does not support the video tag.
          </video>
        ) : (
          projectData.visualDesignSectionImage && (
            <Image
              className={styles.dividerImage}
              src={projectData.visualDesignSectionImage}
              height={1080}
              width={1920}
              alt="Ideation Divider Image"
            />
          )
        )}
      </div>
      {/* ====================================== ************* =================================== */}

      {/* Style Guide Section ---------------------------------------- */}
      <section className={styles.customSection}>
        <div className={styles.soloTextContainer}>
          <h3>{projectData.styleGuideHeading}</h3>
          <p>{projectData.styleGuideDescription}</p>
        </div>

        {projectData.styleGuideImages?.map((styleGuideImage: any) => (
          <div key={styleGuideImage} className={styles.soloImageContainer}>
            <Image className={styles.dividerImage} src={styleGuideImage} height={1080} width={1920} alt="User Flow Diagram" />
          </div>
        ))}
        {projectData.styleGuideVideos?.map((styleGuideVideo: any, index: number) => (
          <div key={`${styleGuideVideo}-${index}`} className={styles.soloImageContainer}>
            <video
              className={styles.dividerImage}
              src={styleGuideVideo}
              poster={projectData.styleGuideVideoPosters?.[index]}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            >
              <source src={styleGuideVideo} type="video/mp4" />
              <source src={styleGuideVideo} type="video/webm" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      </section>

      {/* High Fidelity Designs ---------------------------------------------------- */}
      <section className={`${styles.customSection} ${styles["customSection--dark"]}`}>
        <div className={styles.soloTextContainer}>
          <h3>{projectData.highFidelityHeading}</h3>
          <p>{projectData.highFidelityIntro}</p>

          <ul className={styles.bulletList}>
            {projectData.keyScreensList?.map((keyScreen: any) => (
              <span key={keyScreen}>
                <li>{keyScreen}</li>
                <br />
              </span>
            ))}
          </ul>
        </div>

        {projectData.highFidelityMockups?.map((highFidelityMockup: any) => (
          <div key={highFidelityMockup} className={styles.soloImageContainer}>
            <Image className={styles.dividerImage} src={highFidelityMockup} height={1080} width={1920} alt="Mockup" />
          </div>
        ))}
        {projectData.highFidelityMockupsVideo?.map((highFidelityVideo: any, index: number) => (
          <div key={`${highFidelityVideo}-${index}`} className={styles.soloImageContainer}>
            <video
              className={styles.dividerImage}
              src={highFidelityVideo}
              poster={projectData.highFidelityMockupsVideoPoster?.[index]}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            >
              <source src={highFidelityVideo} type="video/mp4" />
              <source src={highFidelityVideo} type="video/webm" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      </section>

      {/* Prototype Section ---------------------------------------- */}
      <section className={styles.customSection}>
        <div className={styles.soloTextContainer}>
          <h3>{projectData.prototypeHeading}</h3>
          <p>{projectData.prototypeDescription}</p>
        </div>

        {projectData.prototypeImages?.map((prototypeImage: any) => (
          <div key={prototypeImage} className={styles.soloImageContainer}>
            <Image className={styles.dividerImage} src={prototypeImage} height={1080} width={1920} alt="Prototype Image" />
          </div>
        ))}
        {projectData.prototypeVideos?.map((prototypeVideo: any, index: number) => (
          <div key={`${prototypeVideo}-${index}`} className={styles.soloImageContainer}>
            <video
              className={styles.dividerImage}
              src={prototypeVideo}
              poster={projectData.prototypeVideoPosters?.[index]}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            >
              <source src={prototypeVideo} type="video/mp4" />
              <source src={prototypeVideo} type="video/webm" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}

        {/* Prototype Notes ---------------------------------------- */}
        <div className={styles.soloTextContainer}>
          <ul className={styles.bulletList}>
            {projectData.prototypeNotes?.map((prototypeNote: any) => (
              <span key={prototypeNote}>
                <li>{prototypeNote}</li>
                <br />
              </span>
            ))}
          </ul>
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

        {/* Prototype Validation ---------------------------------------- */}
        <div className={styles.soloTextContainer}>
          <h3>{projectData.validationHeading}</h3>
          <p>{projectData.validationDescription}</p>

          <ul className={styles.bulletList}>
            {projectData.validationMethodology?.map((method: any) => (
              <li key={method}>{method}</li>
            ))}
          </ul>
        </div>

        {/* Study Results ---------------------------------------------------------- */}
        <div className={`${styles.textImageRow} ${styles["textImageRow--reverse"]}`}>
          <div className={styles.textContainer}>
            <h3>{projectData.studyResultsHeading}</h3>

            <ul className={styles.bulletList}>
              {projectData.studyResults?.map((studyResult: any) => (
                <li key={studyResult}>{studyResult}</li>
              ))}
            </ul>
          </div>

          <div className={styles.rowImageContainer}>
            {projectData.studyResultsVideo ? (
              <video
                className={styles.dividerImage}
                src={projectData.studyResultsVideo}
                poster={projectData.studyResultsVideoPoster}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              >
                <source src={projectData.studyResultsVideo} type="video/mp4" />
                <source src={projectData.studyResultsVideo} type="video/webm" />
                Your browser does not support the video tag.
              </video>
            ) : (
              projectData.studyResultsImage && (
                <Image
                  className={styles.dividerImage}
                  src={projectData.studyResultsImage}
                  height={1080}
                  width={1920}
                  alt="Project Rationale Image"
                />
              )
            )}
          </div>
        </div>

        {/* Prototype Updates ----------------------------------------------------- */}
        <div className={styles.textImageRow}>
          <div className={styles.textContainer}>
            <h3>{projectData.prototypeUpdateHeading}</h3>

            <ul className={styles.bulletList}>
              {projectData.prototypeUpdates?.map((prototypeUpdate: any) => (
                <li key={prototypeUpdate}>{prototypeUpdate}</li>
              ))}
            </ul>
          </div>

          <div className={styles.rowImageContainer}>
            {projectData.prototypeUpdatesVideo ? (
              <video
                className={styles.dividerImage}
                src={projectData.prototypeUpdatesVideo}
                poster={projectData.prototypeUpdatesVideoPoster}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              >
                <source src={projectData.prototypeUpdatesVideo} type="video/mp4" />
                <source src={projectData.prototypeUpdatesVideo} type="video/webm" />
                Your browser does not support the video tag.
              </video>
            ) : (
              projectData.prototypeUpdatesImage && (
                <Image
                  className={styles.dividerImage}
                  src={projectData.prototypeUpdatesImage}
                  height={1080}
                  width={1920}
                  alt="Project Rationale Image"
                />
              )
            )}
          </div>
        </div>
      </section>

      {/* Accessibility Considerations ---------------------------------------------------- */}
      <section className={`${styles.customSection} ${styles["customSection--dark"]}`}>
        <div className={styles.soloTextContainer}>
          <h3>{projectData.accessibilityHeading}</h3>

          <ul className={styles.bulletList}>
            {projectData.accessibilityConsiderations?.map((accessibilityConsideration: any) => (
              <span key={accessibilityConsideration}>
                <li>{accessibilityConsideration}</li>
                <br />
              </span>
            ))}
          </ul>
        </div>

        <div className={styles.soloImageContainer}>
          {projectData.accessibilityMockupVideo ? (
            <video
              className={styles.dividerImage}
              src={projectData.accessibilityMockupVideo}
              poster={projectData.accessibilityMockupVideoPoster}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            >
              <source src={projectData.accessibilityMockupVideo} type="video/mp4" />
              <source src={projectData.accessibilityMockupVideo} type="video/webm" />
              Your browser does not support the video tag.
            </video>
          ) : (
            projectData.accessibilityMockup && (
              <Image
                className={styles.dividerImage}
                src={projectData.accessibilityMockup}
                height={1080}
                width={1920}
                alt="Accessibility Mockup"
              />
            )
          )}
        </div>
      </section>

      {/* ====================================== SECTION DIVIDER =================================== */}
      <div className={styles.dividerImageContainer}>
        <h2>{projectData.finalThoughtsSectionHeading}</h2>

        {projectData.finalThoughtsSectionVideo ? (
          <video
            className={styles.dividerImage}
            src={projectData.finalThoughtsSectionVideo}
            poster={projectData.finalThoughtsSectionVideoPoster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src={projectData.finalThoughtsSectionVideo} type="video/mp4" />
            <source src={projectData.finalThoughtsSectionVideo} type="video/webm" />
            Your browser does not support the video tag.
          </video>
        ) : (
          projectData.finalThoughtsSectionImage && (
            <Image
              className={styles.dividerImage}
              src={projectData.finalThoughtsSectionImage}
              height={1080}
              width={1920}
              alt="Final Thoughts Divider Image"
            />
          )
        )}
      </div>
      {/* ====================================== ************* =================================== */}

      {/* Final Thoughts ----------------------------------------------------------------- */}
      <section className={styles.customSection}>
        <div className={styles.soloTextContainer}>
          <h3>{projectData.finalResultsHeading}</h3>
          <p>{projectData.finalResultsText}</p>

          <ul className={styles.bulletList}>
            {projectData.expectedOutcomes?.map((expectedOutcome: any) => (
              <li key={expectedOutcome}>{expectedOutcome}</li>
            ))}
          </ul>
        </div>

        {/* Key Learnings ---------------------------------------------------------- */}
        <div className={`${styles.textImageRow} ${styles["textImageRow--reverse"]}`}>
          <div className={styles.textContainer}>
            <h3>{projectData.keyLearningsHeading}</h3>

            <ul className={styles.bulletList}>
              {projectData.keyLearnings?.map((keyLearning: any) => (
                <li key={keyLearning}>{keyLearning}</li>
              ))}
            </ul>
          </div>

          <div className={styles.rowImageContainer}>
            {projectData.keyLearningsVideo ? (
              <video
                className={styles.dividerImage}
                src={projectData.keyLearningsVideo}
                poster={projectData.keyLearningsVideoPoster}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              >
                <source src={projectData.keyLearningsVideo} type="video/mp4" />
                <source src={projectData.keyLearningsVideo} type="video/webm" />
                Your browser does not support the video tag.
              </video>
            ) : (
              projectData.keyLearningsImage && (
                <Image
                  className={styles.dividerImage}
                  src={projectData.keyLearningsImage}
                  height={1080}
                  width={1920}
                  alt="Project Rationale Image"
                />
              )
            )}
          </div>
        </div>
      </section>

      {/* Future Improvements / Next Steps ---------------------------------------------------- */}
      <section className={`${styles.customSection} ${styles["customSection--dark"]}`}>
        <div className={styles.soloTextContainer}>
          <h3>{projectData.futureImprovementsHeading}</h3>
        </div>

        <div className={styles.infoCardContainer}>
          {projectData.futureImprovements?.map((futureImprovement: any) => (
            <div key={futureImprovement.improvementTitle} className={styles.infoCard}>
              <h4>{futureImprovement.improvementTitle}</h4>
              <p>{futureImprovement.improvementDescription}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Closing Summary ----------------------------------------------------------------- */}
      <section className={styles.customSection}>
        <div className={styles.soloTextContainer}>
          <h3>{projectData.closingSummaryHeading}</h3>
          <p>{projectData.closingSummaryText}</p>
        </div>
      </section>
    </>
  );
}

