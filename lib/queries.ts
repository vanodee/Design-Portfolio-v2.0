import { groq } from "next-sanity";

// SITE SETTINGS (global — used by app/layout.tsx, Footer.tsx, and the About page) ==============
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    resumeUrl,
    experience,
    "clients": clients[]{ _key, name, "logoUrl": logo.asset->url, websiteUrl },
    socialLinks
  }
`;

export const categoriesQuery = groq`
  *[_type == "category"]{
    _id,
    title,
    slug,
    "imageUrl": image.asset->url,
  }
`;

// HOME PAGE ====================================================================
export const categoriesWithToolsQuery = groq`
 *[_type == "category"] | order(_createdAt desc){
  _id,
  title,
  "slug": slug.current,
  "image": image{ ..., "url": asset->url, alt },

  "tools": *[_type == "project" && references(^._id)].tools[]->{
    _id,
    title,
    "iconUrl": icon.asset->url,
    "iconAlt": icon.alt,
    color
  }
}
`;

// ABOUT PAGE ====================================================================
export const featuredToolsQuery = groq`
  *[_type == "tools" && isFeatured == true] | order(_createdAt asc){
    _id,
    title,
    "iconUrl": icon.asset->url,
    "iconAlt": icon.alt,
    color,
    isFeatured
  }
`;

// PROJECT DETAILS PAGE ====================================================================
export const allProjectsQuery = groq`
*[_type == "project" && slug.current == $project && category->slug.current == $category][0]{
  _id,
  
  // ===== General Fields (Available for ALL project types) =================
  title,
  "slug": slug.current,
  description,
  previewColor,
  projectColor,
  projectColorDark,
  heroHeading,
  heroSubheading,
  heroDescription,
  "heroImage": heroImage{ ..., "url": asset->url, alt },
  "previewImage": previewImage{ ..., "url": asset->url, alt },
  projectTags[],
  quickStats[]{
    title,
    value,
  },
  ctaColor,
  liveLinks[]{
    text,
    subText,
    ctaIcon,
    url,
  },
  "closingImage": closingImage{ ..., "url": asset->url, alt },

  // Category with slug
  category->{
    _id,
    title,
    "slug": slug.current
  },
  
  // Category Name (for conditional rendering)
  categoryName,
  
  // Tools with icons
  tools[]->{
    _id,
    title,
    color,
    "iconUrl": icon.asset->url,
    "iconAlt": icon.alt
  },


  // ===== Web App Fields (Conditional) ===============================================
  category->title == "Web Apps" => {
    
    // Teaser Image
    "webApp_teaserImages": webApp_teaserImages[].asset->url,
    "webApp_teaserImagesAlt": webApp_teaserImages[].alt,
    "webApp_teaserVideos": webApp_teaserVideos[].asset->url,
    "webApp_teaserVideoPosters": webApp_teaserVideoPosters[].asset->url,
    "webApp_teaserVideoPostersAlt": webApp_teaserVideoPosters[].alt,

    // Product Context
    webApp_productContextHeading,
    webApp_productContext,
    "webApp_productContextImage": webApp_productContextImage.asset->url,
    "webApp_productContextImageAlt": webApp_productContextImage.alt,
    "webApp_productContextVideo": webApp_productContextVideo.asset->url,
    "webApp_productContextVideoPoster": webApp_productContextVideoPoster.asset->url,
    "webApp_productContextVideoPosterAlt": webApp_productContextVideoPoster.alt,

    // Problems & Goals
    webApp_probGoals[]{
      probGoalName,
      probGoalList,
    },

    // Discovery Strategy
    webApp_productStratHeading,
    webApp_productStratContent,

    // UX Hypothesis
    webApp_uxHypothesisHeading,
    webApp_uxHypothesis[],
    "webApp_uxHypothesisImage": webApp_uxHypothesisImage.asset->url,
    "webApp_uxHypothesisImageAlt": webApp_uxHypothesisImage.alt,
    "webApp_uxHypothesisVideo": webApp_uxHypothesisVideo.asset->url,
    "webApp_uxHypothesisVideoPoster": webApp_uxHypothesisVideoPoster.asset->url,
    "webApp_uxHypothesisVideoPosterAlt": webApp_uxHypothesisVideoPoster.alt,
    "webApp_initialDesignImages": webApp_initialDesignImages[].asset->url,
    "webApp_initialDesignImagesAlt": webApp_initialDesignImages[].alt,
    "webApp_initialDesignVideos": webApp_initialDesignVideos[].asset->url,
    "webApp_initialDesignVideoPosters": webApp_initialDesignVideoPosters[].asset->url,
    "webApp_initialDesignVideoPostersAlt": webApp_initialDesignVideoPosters[].alt,

    // Project Scope Section
    webApp_prodScopeHeading,
    webApp_prodScope,
    webApp_prodScopeItems[]{
      itemTitle,
      itemRationale,
    },
    
    // Design Section
    webApp_designSectionHeading,
    webApp_designSectionText,
    "webApp_designSectionImages": webApp_designSectionImages[].asset->url,
    "webApp_designSectionImagesAlt": webApp_designSectionImages[].alt,
    "webApp_designSectionVideos": webApp_designSectionVideos[].asset->url,
    "webApp_designSectionVideoPosters": webApp_designSectionVideoPosters[].asset->url,
    "webApp_designSectionVideoPostersAlt": webApp_designSectionVideoPosters[].alt,
    webApp_designSectionItems[]{
      itemName,
      itemPoints[],
      "itemImage": itemImage.asset->url,
      "itemImageAlt": itemImage.alt,
      "itemVideo": itemVideo.asset->url,
      "itemVideoPoster": itemVideoPoster.asset->url,
      "itemVideoPosterAlt": itemVideoPoster.alt,
    },

    // Developer Section
    webApp_devSectionHeading,
    webApp_devSectionText,
    "webApp_devSectionImages": webApp_devSectionImages[].asset->url,
    "webApp_devSectionImagesAlt": webApp_devSectionImages[].alt,
    "webApp_devSectionVideos": webApp_devSectionVideos[].asset->url,
    "webApp_devSectionVideoPosters": webApp_devSectionVideoPosters[].asset->url,
    "webApp_devSectionVideoPostersAlt": webApp_devSectionVideoPosters[].alt,
    webApp_devSectionItems[]{
      itemName,
      itemPoints[],
      "itemImage": itemImage.asset->url,
      "itemImageAlt": itemImage.alt,
      "itemVideo": itemVideo.asset->url,
      "itemVideoPoster": itemVideoPoster.asset->url,
      "itemVideoPosterAlt": itemVideoPoster.alt,
    },

    // Finished Product Section
    webApp_finishedProdHeading,
    webApp_finishedProdText,
    "webApp_finishedProdImages": webApp_finishedProdImages[].asset->url,
    "webApp_finishedProdImagesAlt": webApp_finishedProdImages[].alt,
    "webApp_finishedProdVideos": webApp_finishedProdVideos[].asset->url,
    "webApp_finishedProdVideoPosters": webApp_finishedProdVideoPosters[].asset->url,
    "webApp_finishedProdVideoPostersAlt": webApp_finishedProdVideoPosters[].alt,

    // Outcomes Section
    webApp_outcomesSectionHeading,
    webApp_mainOutcomeHeading,
    webApp_mainOutcomeText,
    webApp_otherOutcomes[] {
      outcomeTitle,
      outcomeDescription,
    },

    // Key Learnings Section
    webApp_keyLearnHeading,
    webApp_keyLearnText,
    webApp_keyLearnList[],
    "webApp_keyLearnImage": webApp_keyLearnImage.asset->url,
    "webApp_keyLearnImageAlt": webApp_keyLearnImage.alt,
    "webApp_keyLearnVideo": webApp_keyLearnVideo.asset->url,
    "webApp_keyLearnVideoPoster": webApp_keyLearnVideoPoster.asset->url,
    "webApp_keyLearnVideoPosterAlt": webApp_keyLearnVideoPoster.alt,

    // What Worked Section
    webApp_whatWorkedHeading,
    webApp_whatWorkedText,
    webApp_whatWorkedList[],
    "webApp_whatWorkedImage": webApp_whatWorkedImage.asset->url,
    "webApp_whatWorkedImageAlt": webApp_whatWorkedImage.alt,
    "webApp_whatWorkedVideo": webApp_whatWorkedVideo.asset->url,
    "webApp_whatWorkedVideoPoster": webApp_whatWorkedVideoPoster.asset->url,
    "webApp_whatWorkedVideoPosterAlt": webApp_whatWorkedVideoPoster.alt,
  },

  
  // ===== Website Fields (Conditional) ===============================================
  category->title == "Websites" => {

    // Teaser Image
    "website_teaserImages": website_teaserImages[].asset->url,
    "website_teaserImagesAlt": website_teaserImages[].alt,
    "website_teaserVideos": website_teaserVideos[].asset->url,
    "website_teaserVideoPosters": website_teaserVideoPosters[].asset->url,
    "website_teaserVideoPostersAlt": website_teaserVideoPosters[].alt,

    // Business Context
    website_businessContextHeading,
    website_businessContextContent,

    // Problems Identified
    website_problemsIdentifiedHeading,
    website_problemsIdentified[],
    "website_problemsIdentifiedImage": website_problemsIdentifiedImage.asset->url,
    "website_problemsIdentifiedImageAlt": website_problemsIdentifiedImage.alt,
    "website_problemsIdentifiedVideo": website_problemsIdentifiedVideo.asset->url,
    "website_problemsIdentifiedVideoPoster": website_problemsIdentifiedVideoPoster.asset->url,
    "website_problemsIdentifiedVideoPosterAlt": website_problemsIdentifiedVideoPoster.alt,

    // Design Objectives
    website_designObjectivesHeading,
    website_designObjectives[],
    "website_designObjectivesImage": website_designObjectivesImage.asset->url,
    "website_designObjectivesImageAlt": website_designObjectivesImage.alt,
    "website_designObjectivesVideo": website_designObjectivesVideo.asset->url,
    "website_designObjectivesVideoPoster": website_designObjectivesVideoPoster.asset->url,
    "website_designObjectivesVideoPosterAlt": website_designObjectivesVideoPoster.alt,
    
    // Market Context Section
    website_marketContextHeading,
    website_marketContext,
    website_targetAudienceHeading,
    website_targetAudience[]{
      member,
      rationale,
    },
    
    // Information Architecture Section
    website_informationArcHeading,
    website_informationArcText,
    "website_informationArcImages": website_informationArcImages[].asset->url,
    "website_informationArcImagesAlt": website_informationArcImages[].alt,
    "website_informationArcVideos": website_informationArcVideos[].asset->url,
    "website_informationArcVideoPosters": website_informationArcVideoPosters[].asset->url,
    "website_informationArcVideoPostersAlt": website_informationArcVideoPosters[].alt,

    // UX Structure & Planning
    website_uxStructureHeading,
    website_uxStructureText,
    website_uxStructureItems[]{
      structureName,
      structurePoints[],
      "structureImage": structureImage.asset->url,
      "structureImageAlt": structureImage.alt,
      "structureVideo": structureVideo.asset->url,
      "structureVideoPoster": structureVideoPoster.asset->url,
      "structureVideoPosterAlt": structureVideoPoster.alt,
    },

    // Visual Design Section
    website_visualDesignHeading,
    website_visualDesignText,
    "website_visualDesignImages": website_visualDesignImages[].asset->url,
    "website_visualDesignImagesAlt": website_visualDesignImages[].alt,
    "website_visualDesignVideos": website_visualDesignVideos[].asset->url,
    "website_visualDesignVideoPosters": website_visualDesignVideoPosters[].asset->url,
    "website_visualDesignVideoPostersAlt": website_visualDesignVideoPosters[].alt,

    // Website Build & Implementation
    website_websiteBuildHeading,
    website_websiteBuildText,
    website_websiteBuildItems[]{
      buildItemName,
      buildItemPoints[],
      "buildItemImage": buildItemImage.asset->url,
      "buildItemImageAlt": buildItemImage.alt,
      "buildItemVideo": buildItemVideo.asset->url,
      "buildItemVideoPoster": buildItemVideoPoster.asset->url,
      "buildItemVideoPosterAlt": buildItemVideoPoster.alt,
    },
    "website_websiteBuildImages": website_websiteBuildImages[].asset->url,
    "website_websiteBuildImagesAlt": website_websiteBuildImages[].alt,
    "website_websiteBuildVideos": website_websiteBuildVideos[].asset->url,
    "website_websiteBuildVideoPosters": website_websiteBuildVideoPosters[].asset->url,
    "website_websiteBuildVideoPostersAlt": website_websiteBuildVideoPosters[].alt,

    // Accessibility Section
    website_accessibilityHeading,
    website_accessibilityText[],
    "website_accessibilityImages": website_accessibilityImages[].asset->url,
    "website_accessibilityImagesAlt": website_accessibilityImages[].alt,
    "website_accessibilityVideos": website_accessibilityVideos[].asset->url,
    "website_accessibilityVideoPosters": website_accessibilityVideoPosters[].asset->url,
    "website_accessibilityVideoPostersAlt": website_accessibilityVideoPosters[].alt,

    // Pre-Launch
    website_preLaunchHeading,
    website_preLaunchChecks[],
    "website_preLaunchImage": website_preLaunchImage.asset->url,
    "website_preLaunchImageAlt": website_preLaunchImage.alt,
    "website_preLaunchVideo": website_preLaunchVideo.asset->url,
    "website_preLaunchVideoPoster": website_preLaunchVideoPoster.asset->url,
    "website_preLaunchVideoPosterAlt": website_preLaunchVideoPoster.alt,

    // Outcomes Section
    website_outcomesSectionHeading,
    website_mainOutcomeHeading,
    website_mainOutcomeText,
    website_otherOutcomes[] {
      outcomeTitle,
      outcomeDescription,
    },

    // Key Learnings Section
    website_keyLearnHeading,
    website_keyLearnText,
    website_keyLearnList[],
    "website_keyLearnImage": website_keyLearnImage.asset->url,
    "website_keyLearnImageAlt": website_keyLearnImage.alt,
    "website_keyLearnVideo": website_keyLearnVideo.asset->url,
    "website_keyLearnVideoPoster": website_keyLearnVideoPoster.asset->url,
    "website_keyLearnVideoPosterAlt": website_keyLearnVideoPoster.alt,

    // What Worked Section
    website_whatWorkedHeading,
    website_whatWorkedText,
    website_whatWorkedList[],
    "website_whatWorkedImage": website_whatWorkedImage.asset->url,
    "website_whatWorkedImageAlt": website_whatWorkedImage.alt,
    "website_whatWorkedVideo": website_whatWorkedVideo.asset->url,
    "website_whatWorkedVideoPoster": website_whatWorkedVideoPoster.asset->url,
    "website_whatWorkedVideoPosterAlt": website_whatWorkedVideoPoster.alt,
  },


  // ===== UX Case Study Fields (Conditional) ===============================================
  category->title == "UX Case Studies" => {

    // Platform Display
    "platformImages": platformImages[].asset->url,
    "platformImagesAlt": platformImages[].alt,
    "platformVideos": platformVideos[].asset->url,
    "platformVideoPosters": platformVideoPosters[].asset->url,
    "platformVideoPostersAlt": platformVideoPosters[].alt,

    // Project Rationale Section
    projectRationaleHeading,
    projectRationale,
    "projectRationaleImage": projectRationaleImage.asset->url,
    "projectRationaleImageAlt": projectRationaleImage.alt,
    "projectRationaleVideo": projectRationaleVideo.asset->url,
    "projectRationaleVideoPoster": projectRationaleVideoPoster.asset->url,
    "projectRationaleVideoPosterAlt": projectRationaleVideoPoster.alt,

    // Research Section Divider
    researchSectionTitle,
    "researchSectionImage": researchSectionImage.asset->url,
    "researchSectionImageAlt": researchSectionImage.alt,
    "researchSectionVideo": researchSectionVideo.asset->url,
    "researchSectionVideoPoster": researchSectionVideoPoster.asset->url,
    "researchSectionVideoPosterAlt": researchSectionVideoPoster.alt,

    // Market Research Section
    marketResearchHeading,
    marketResearchContent,
    "marketResearchVisual": marketResearchVisual.asset->url,
    "marketResearchVisualAlt": marketResearchVisual.alt,
    "marketResearchVisualVideo": marketResearchVisualVideo.asset->url,
    "marketResearchVisualVideoPoster": marketResearchVisualVideoPoster.asset->url,
    "marketResearchVisualVideoPosterAlt": marketResearchVisualVideoPoster.alt,
    
    // Competitive Analysis Section
    competitiveAnalysisHeading,
    competitiveAnalysisIntro,
    competitors[] {
      competitorName,
      competitorType,
      "competitorImage": competitorImage.asset->url,
      "competitorImageAlt": competitorImage.alt,
      "competitorVideo": competitorVideo.asset->url,
      "competitorVideoPoster": competitorVideoPoster.asset->url,
      "competitorVideoPosterAlt": competitorVideoPoster.alt,
      competitorPros[],
      competitorCons[],
    },

    // Opportunities
    opportunitiesHeading,
    opportunitiesList,
    "opportunitiesImage": opportunitiesImage.asset->url,
    "opportunitiesImageAlt": opportunitiesImage.alt,
    "opportunitiesVideo": opportunitiesVideo.asset->url,
    "opportunitiesVideoPoster": opportunitiesVideoPoster.asset->url,
    "opportunitiesVideoPosterAlt": opportunitiesVideoPoster.alt,

    // User Survey Section
    userSurveyHeading,
    userSurveyIntro,
    "surveyCharts": surveyCharts[].asset->url,
    "surveyChartsAlt": surveyCharts[].alt,
    "surveyChartsVideo": surveyChartsVideo[].asset->url,
    "surveyChartsVideoPoster": surveyChartsVideoPoster[].asset->url,
    "surveyChartsVideoPosterAlt": surveyChartsVideoPoster[].alt,

    // Assumption Validation
    assumptionValidationHeading,
    assumptionValidation,
    "assumptionValidationImage": assumptionValidationImage.asset->url,
    "assumptionValidationImageAlt": assumptionValidationImage.alt,
    "assumptionValidationVideo": assumptionValidationVideo.asset->url,
    "assumptionValidationVideoPoster": assumptionValidationVideoPoster.asset->url,
    "assumptionValidationVideoPosterAlt": assumptionValidationVideoPoster.alt,

    // Key Insights
    keyInsightsHeading,
    keyInsights[],
    opportunityText,
    
    // User Personas Section
    personasHeading,
    personasIntro,
    "personas": personas[].asset->url,
    "personasAlt": personas[].alt,
    "personasVideo": personasVideo[].asset->url,
    "personasVideoPoster": personasVideoPoster[].asset->url,
    "personasVideoPosterAlt": personasVideoPoster[].alt,
    
    // Problem Statement Section
    problemStatementHeading,
    problemStatement,

    // Design Goals
    designGoalsHeading,
    designGoals[],
    
    // Ideation Section Divider
    ideationSectionTitle,
    "ideationSectionImage": ideationSectionImage.asset->url,
    "ideationSectionImageAlt": ideationSectionImage.alt,
    "ideationSectionVideo": ideationSectionVideo.asset->url,
    "ideationSectionVideoPoster": ideationSectionVideoPoster.asset->url,
    "ideationSectionVideoPosterAlt": ideationSectionVideoPoster.alt,

    // User Flow Section
    userFlowHeading,
    userFlowDescription,
    "userFlowDiagrams": userFlowDiagrams[].asset->url,
    "userFlowDiagramsAlt": userFlowDiagrams[].alt,
    "userFlowDiagramsVideo": userFlowDiagramsVideo[].asset->url,
    "userFlowDiagramsVideoPoster": userFlowDiagramsVideoPoster[].asset->url,
    "userFlowDiagramsVideoPosterAlt": userFlowDiagramsVideoPoster[].alt,

    // Information Architecture Section
    informationArchitectureHeading,
    informationArchitectureDescription,
    "informationArchitectureImage": informationArchitectureImage.asset->url,
    "informationArchitectureImageAlt": informationArchitectureImage.alt,
    "informationArchitectureVideo": informationArchitectureVideo.asset->url,
    "informationArchitectureVideoPoster": informationArchitectureVideoPoster.asset->url,
    "informationArchitectureVideoPosterAlt": informationArchitectureVideoPoster.alt,

    // Wireframing Section
    wireframesHeading,
    wireframesDescription,
    "wireframeImages": wireframeImages[].asset->url,
    "wireframeImagesAlt": wireframeImages[].alt,
    "wireframeVideos": wireframeVideos[].asset->url,
    "wireframeVideoPosters": wireframeVideoPosters[].asset->url,
    "wireframeVideoPostersAlt": wireframeVideoPosters[].alt,

    // Visual Design Section Divider
    visualDesignSectionTitle,
    "visualDesignSectionImage": visualDesignSectionImage.asset->url,
    "visualDesignSectionImageAlt": visualDesignSectionImage.alt,
    "visualDesignSectionVideo": visualDesignSectionVideo.asset->url,
    "visualDesignSectionVideoPoster": visualDesignSectionVideoPoster.asset->url,
    "visualDesignSectionVideoPosterAlt": visualDesignSectionVideoPoster.alt,

    // Style Guide / Design System
    styleGuideHeading,
    styleGuideDescription,
    "styleGuideImages": styleGuideImages[].asset->url,
    "styleGuideImagesAlt": styleGuideImages[].alt,
    "styleGuideVideos": styleGuideVideos[].asset->url,
    "styleGuideVideoPosters": styleGuideVideoPosters[].asset->url,
    "styleGuideVideoPostersAlt": styleGuideVideoPosters[].alt,

    // High Fidelity Designs
    highFidelityHeading,
    highFidelityIntro,
    keyScreensList[],
    "highFidelityMockups": highFidelityMockups[].asset->url,
    "highFidelityMockupsAlt": highFidelityMockups[].alt,
    "highFidelityMockupsVideo": highFidelityMockupsVideo[].asset->url,
    "highFidelityMockupsVideoPoster": highFidelityMockupsVideoPoster[].asset->url,
    "highFidelityMockupsVideoPosterAlt": highFidelityMockupsVideoPoster[].alt,

    // Interactive Prototype Section
    prototypeHeading,
    prototypeDescription,
    "prototypeImages": prototypeImages[].asset->url,
    "prototypeImagesAlt": prototypeImages[].alt,
    "prototypeVideos": prototypeVideos[].asset->url,
    "prototypeVideoPosters": prototypeVideoPosters[].asset->url,
    "prototypeVideoPostersAlt": prototypeVideoPosters[].alt,
    prototypeNotes[],

    // Prototype Validation / Usabiility Testing
    validationHeading,
    validationDescription,
    validationMethodology[],
    studyResultsHeading,
    studyResults[],
    "studyResultsImage": studyResultsImage.asset->url,
    "studyResultsImageAlt": studyResultsImage.alt,
    "studyResultsVideo": studyResultsVideo.asset->url,
    "studyResultsVideoPoster": studyResultsVideoPoster.asset->url,
    "studyResultsVideoPosterAlt": studyResultsVideoPoster.alt,
    prototypeUpdateHeading,
    prototypeUpdates[],
    "prototypeUpdatesImage": prototypeUpdatesImage.asset->url,
    "prototypeUpdatesImageAlt": prototypeUpdatesImage.alt,
    "prototypeUpdatesVideo": prototypeUpdatesVideo.asset->url,
    "prototypeUpdatesVideoPoster": prototypeUpdatesVideoPoster.asset->url,
    "prototypeUpdatesVideoPosterAlt": prototypeUpdatesVideoPoster.alt,

    // Accessibility Considerations Section
    accessibilityHeading,
    accessibilityConsiderations,
    "accessibilityMockup": accessibilityMockup.asset->url,
    "accessibilityMockupAlt": accessibilityMockup.alt,
    "accessibilityMockupVideo": accessibilityMockupVideo.asset->url,
    "accessibilityMockupVideoPoster": accessibilityMockupVideoPoster.asset->url,
    "accessibilityMockupVideoPosterAlt": accessibilityMockupVideoPoster.alt,

    // Final Thoughts Section Divider
    finalThoughtsSectionHeading,
    "finalThoughtsSectionImage": finalThoughtsSectionImage.asset->url,
    "finalThoughtsSectionImageAlt": finalThoughtsSectionImage.alt,
    "finalThoughtsSectionVideo": finalThoughtsSectionVideo.asset->url,
    "finalThoughtsSectionVideoPoster": finalThoughtsSectionVideoPoster.asset->url,
    "finalThoughtsSectionVideoPosterAlt": finalThoughtsSectionVideoPoster.alt,

    // Final Thoughts
    finalResultsHeading,
    finalResultsText,
    expectedOutcomes[],
    outcomesDisclaimer,
    keyLearningsHeading,
    keyLearnings[],
    "keyLearningsImage": keyLearningsImage.asset->url,
    "keyLearningsImageAlt": keyLearningsImage.alt,
    "keyLearningsVideo": keyLearningsVideo.asset->url,
    "keyLearningsVideoPoster": keyLearningsVideoPoster.asset->url,
    "keyLearningsVideoPosterAlt": keyLearningsVideoPoster.alt,
    
    // Future Improvements Section
    futureImprovementsHeading,
    futureImprovements[] {
      improvementTitle,
      improvementDescription
    },
    
    // Closing Summary Section
    closingSummaryHeading,
    closingSummaryText,
  },


  // ===== Logo & Branding Fields (Conditional) ===============================================
  category->title == "Logos & Branding" => {
    
    // Teaser Image
    "teaserImages": teaserImages[].asset->url,
    "teaserImagesAlt": teaserImages[].alt,
    "teaserVideos": teaserVideos[].asset->url,
    "teaserVideoPosters": teaserVideoPosters[].asset->url,
    "teaserVideoPostersAlt": teaserVideoPosters[].alt,

    // Business Context
    businessContextHeading,
    businessContextContent,

    // Problems Identified
    problemsIdentifiedHeading,
    problemsIdentified[],
    "problemsIdentifiedImage": problemsIdentifiedImage.asset->url,
    "problemsIdentifiedImageAlt": problemsIdentifiedImage.alt,
    "problemsIdentifiedVideo": problemsIdentifiedVideo.asset->url,
    "problemsIdentifiedVideoPoster": problemsIdentifiedVideoPoster.asset->url,
    "problemsIdentifiedVideoPosterAlt": problemsIdentifiedVideoPoster.alt,

    // Design Objectives
    designObjectivesHeading,
    designObjectives[],
    "designObjectivesImage": designObjectivesImage.asset->url,
    "designObjectivesImageAlt": designObjectivesImage.alt,
    "designObjectivesVideo": designObjectivesVideo.asset->url,
    "designObjectivesVideoPoster": designObjectivesVideoPoster.asset->url,
    "designObjectivesVideoPosterAlt": designObjectivesVideoPoster.alt,
    
    // Design Approach Section
    designApproachHeading,
    discoveryStrategyHeading,
    discoveryStrategy,
    designApproachMethods[] {
      approachTitle,
      approachDescription,
    },
    
    // First Core Section
    firstCoreSectionHeading,
    firstCoreSectionText,
    firstCoreSectionList[],
    "firstCoreLandscapeImages": firstCoreLandscapeImages[].asset->url,
    "firstCoreLandscapeImagesAlt": firstCoreLandscapeImages[].alt,
    "firstCoreLandscapeVideos": firstCoreLandscapeVideos[].asset->url,
    "firstCoreLandscapeVideoPosters": firstCoreLandscapeVideoPosters[].asset->url,
    "firstCoreLandscapeVideoPostersAlt": firstCoreLandscapeVideoPosters[].alt,
    "firstCorePortraitImages": firstCorePortraitImages[].asset->url,
    "firstCorePortraitImagesAlt": firstCorePortraitImages[].alt,
    "firstCorePortraitVideos": firstCorePortraitVideos[].asset->url,
    "firstCorePortraitVideoPosters": firstCorePortraitVideoPosters[].asset->url,
    "firstCorePortraitVideoPostersAlt": firstCorePortraitVideoPosters[].alt,

    // Second Core Section
    secondCoreSectionHeading,
    secondCoreSectionText,
    secondCoreSectionList[],
    "secondCoreLandscapeImages": secondCoreLandscapeImages[].asset->url,
    "secondCoreLandscapeImagesAlt": secondCoreLandscapeImages[].alt,
    "secondCoreLandscapeVideos": secondCoreLandscapeVideos[].asset->url,
    "secondCoreLandscapeVideoPosters": secondCoreLandscapeVideoPosters[].asset->url,
    "secondCoreLandscapeVideoPostersAlt": secondCoreLandscapeVideoPosters[].alt,
    "secondCorePortraitImages": secondCorePortraitImages[].asset->url,
    "secondCorePortraitImagesAlt": secondCorePortraitImages[].alt,
    "secondCorePortraitVideos": secondCorePortraitVideos[].asset->url,
    "secondCorePortraitVideoPosters": secondCorePortraitVideoPosters[].asset->url,
    "secondCorePortraitVideoPostersAlt": secondCorePortraitVideoPosters[].alt,

    // Third Core Section
    thirdCoreSectionHeading,
    thirdCoreSectionText,
    thirdCoreSectionList[],
    "thirdCoreLandscapeImages": thirdCoreLandscapeImages[].asset->url,
    "thirdCoreLandscapeImagesAlt": thirdCoreLandscapeImages[].alt,
    "thirdCoreLandscapeVideos": thirdCoreLandscapeVideos[].asset->url,
    "thirdCoreLandscapeVideoPosters": thirdCoreLandscapeVideoPosters[].asset->url,
    "thirdCoreLandscapeVideoPostersAlt": thirdCoreLandscapeVideoPosters[].alt,
    "thirdCorePortraitImages": thirdCorePortraitImages[].asset->url,
    "thirdCorePortraitImagesAlt": thirdCorePortraitImages[].alt,
    "thirdCorePortraitVideos": thirdCorePortraitVideos[].asset->url,
    "thirdCorePortraitVideoPosters": thirdCorePortraitVideoPosters[].asset->url,
    "thirdCorePortraitVideoPostersAlt": thirdCorePortraitVideoPosters[].alt,

    // Outcomes Section
    outcomesSectionHeading,
    mainOutcomeHeading,
    mainOutcomeText,
    otherOutcomes[] {
      outcomeTitle,
      outcomeDescription,
    },

    // Key Learnings Section
    keyLearnHeading,
    keyLearnText,
    keyLearnList[],
    "keyLearnImage": keyLearnImage.asset->url,
    "keyLearnImageAlt": keyLearnImage.alt,
    "keyLearnVideo": keyLearnVideo.asset->url,
    "keyLearnVideoPoster": keyLearnVideoPoster.asset->url,
    "keyLearnVideoPosterAlt": keyLearnVideoPoster.alt,

    // What Worked Section
    whatWorkedHeading,
    whatWorkedText,
    whatWorkedList[],
    "whatWorkedImage": whatWorkedImage.asset->url,
    "whatWorkedImageAlt": whatWorkedImage.alt,
    "whatWorkedVideo": whatWorkedVideo.asset->url,
    "whatWorkedVideoPoster": whatWorkedVideoPoster.asset->url,
    "whatWorkedVideoPosterAlt": whatWorkedVideoPoster.alt,
  },
}
`;
