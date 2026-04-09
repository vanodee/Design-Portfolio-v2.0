import { groq } from "next-sanity";

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
  "imageUrl": image.asset->url,

  "tools": *[_type == "project" && references(^._id)].tools[]->{
    _id,
    title,
    "iconUrl": icon.asset->url,
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
  "heroImage": heroImage.asset->url,
  "previewImage": previewImage.asset->url,
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
  "closingImage": closingImage.asset->url,
  
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
    "iconUrl": icon.asset->url
  },


  // ===== Web App Fields (Conditional) ===============================================
  categoryName == "Web Apps" => {
    
    // Teaser Image
    "webApp_teaserImages": webApp_teaserImages[].asset->url,
    "webApp_teaserVideos": webApp_teaserVideos[].asset->url,
    "webApp_teaserVideoPosters": webApp_teaserVideoPosters[].asset->url,
    
    // Product Context
    webApp_productContextHeading,
    webApp_productContext,
    "webApp_productContextImage": webApp_productContextImage.asset->url,
    "webApp_productContextVideo": webApp_productContextVideo.asset->url,
    "webApp_productContextVideoPoster": webApp_productContextVideoPoster.asset->url,

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
    "webApp_uxHypothesisVideo": webApp_uxHypothesisVideo.asset->url,
    "webApp_uxHypothesisVideoPoster": webApp_uxHypothesisVideoPoster.asset->url,
    "webApp_initialDesignImages": webApp_initialDesignImages[].asset->url,
    "webApp_initialDesignVideos": webApp_initialDesignVideos[].asset->url,
    "webApp_initialDesignVideoPosters": webApp_initialDesignVideoPosters[].asset->url,

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
    "webApp_designSectionVideos": webApp_designSectionVideos[].asset->url,
    "webApp_designSectionVideoPosters": webApp_designSectionVideoPosters[].asset->url,
    webApp_designSectionItems[]{
      itemName,
      itemPoints[],
      "itemImage": itemImage.asset->url,
      "itemVideo": itemVideo.asset->url,
      "itemVideoPoster": itemVideoPoster.asset->url,
    },

    // Developer Section
    webApp_devSectionHeading,
    webApp_devSectionText,
    "webApp_devSectionImages": webApp_devSectionImages[].asset->url,
    "webApp_devSectionVideos": webApp_devSectionVideos[].asset->url,
    "webApp_devSectionVideoPosters": webApp_devSectionVideoPosters[].asset->url,
    webApp_devSectionItems[]{
      itemName,
      itemPoints,
      "itemImage": itemImage.asset->url,
      "itemVideo": itemVideo.asset->url,
      "itemVideoPoster": itemVideoPoster.asset->url,
    },
    
    // Finished Product Section
    webApp_finishedProdHeading,
    webApp_finishedProdText,
    "webApp_finishedProdImages": webApp_finishedProdImages[].asset->url,
    "webApp_finishedProdVideos": webApp_finishedProdVideos[].asset->url,
    "webApp_finishedProdVideoPosters": webApp_finishedProdVideoPosters[].asset->url,

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
    "webApp_keyLearnVideo": webApp_keyLearnVideo.asset->url,
    "webApp_keyLearnVideoPoster": webApp_keyLearnVideoPoster.asset->url,
    
    // What Worked Section
    webApp_whatWorkedHeading,
    webApp_whatWorkedText,
    webApp_whatWorkedList[],
    "webApp_whatWorkedImage": webApp_whatWorkedImage.asset->url,
    "webApp_whatWorkedVideo": webApp_whatWorkedVideo.asset->url,
    "webApp_whatWorkedVideoPoster": webApp_whatWorkedVideoPoster.asset->url,
  },

  
  // ===== Website Fields (Conditional) ===============================================
  categoryName == "Websites" => {

    // Teaser Image
    "website_teaserImages": website_teaserImages[].asset->url,
    "website_teaserVideos": website_teaserVideos[].asset->url,
    "website_teaserVideoPosters": website_teaserVideoPosters[].asset->url,
    
    // Business Context
    website_businessContextHeading,
    website_businessContextContent,
    
    // Problems Identified
    website_problemsIdentifiedHeading,
    website_problemsIdentified[],
    "website_problemsIdentifiedImage": website_problemsIdentifiedImage.asset->url,
    "website_problemsIdentifiedVideo": website_problemsIdentifiedVideo.asset->url,
    "website_problemsIdentifiedVideoPoster": website_problemsIdentifiedVideoPoster.asset->url,
    
    // Design Objectives
    website_designObjectivesHeading,
    website_designObjectives[],
    "website_designObjectivesImage": website_designObjectivesImage.asset->url,
    "website_designObjectivesVideo": website_designObjectivesVideo.asset->url,
    "website_designObjectivesVideoPoster": website_designObjectivesVideoPoster.asset->url,
    
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
    "website_informationArcVideos": website_informationArcVideos[].asset->url,
    "website_informationArcVideoPosters": website_informationArcVideoPosters[].asset->url,

    // UX Structure & Planning
    website_uxStructureHeading,
    website_uxStructureText,
    website_uxStructureItems[]{
      structureName,
      structurePoints[],
      "structureImage": structureImage.asset->url,
      "structureVideo": structureVideo.asset->url,
      "structureVideoPoster": structureVideoPoster.asset->url,
    },

    // Visual Design Section
    website_visualDesignHeading,
    website_visualDesignText,
    "website_visualDesignImages": website_visualDesignImages[].asset->url,
    "website_visualDesignVideos": website_visualDesignVideos[].asset->url,
    "website_visualDesignVideoPosters": website_visualDesignVideoPosters[].asset->url,

    // Website Build & Implementation
    website_websiteBuildHeading,
    website_websiteBuildText,
    website_websiteBuildItems[]{
      buildItemName,
      buildItemPoints,
      "buildItemImage": buildItemImage.asset->url,
      "buildItemVideo": buildItemVideo.asset->url,
      "buildItemVideoPoster": buildItemVideoPoster.asset->url,
    },
    "website_websiteBuildImages": website_websiteBuildImages[].asset->url,
    "website_websiteBuildVideos": website_websiteBuildVideos[].asset->url,
    "website_websiteBuildVideoPosters": website_websiteBuildVideoPosters[].asset->url,

    // Accessibility Section
    website_accessibilityHeading,
    website_accessibilityText[],
    "website_accessibilityImages": website_accessibilityImages[].asset->url,
    "website_accessibilityVideos": website_accessibilityVideos[].asset->url,
    "website_accessibilityVideoPosters": website_accessibilityVideoPosters[].asset->url,

    // Pre-Launch
    website_preLaunchHeading,
    website_preLaunchChecks[],
    "website_preLaunchImage": website_preLaunchImage.asset->url,
    "website_preLaunchVideo": website_preLaunchVideo.asset->url,
    "website_preLaunchVideoPoster": website_preLaunchVideoPoster.asset->url,

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
    "website_keyLearnVideo": website_keyLearnVideo.asset->url,
    "website_keyLearnVideoPoster": website_keyLearnVideoPoster.asset->url,
    
    // What Worked Section
    website_whatWorkedHeading,
    website_whatWorkedText,
    website_whatWorkedList[],
    "website_whatWorkedImage": website_whatWorkedImage.asset->url,
    "website_whatWorkedVideo": website_whatWorkedVideo.asset->url,
    "website_whatWorkedVideoPoster": website_whatWorkedVideoPoster.asset->url,
  },


  // ===== UX Case Study Fields (Conditional) ===============================================
  categoryName == "UX Case Studies" => {

    // Platform Display
    "platformImages": platformImages[].asset->url,
    "platformVideos": platformVideos[].asset->url,
    "platformVideoPosters": platformVideoPosters[].asset->url,
    
    // Project Rationale Section
    projectRationaleHeading,
    projectRationale,
    "projectRationaleImage": projectRationaleImage.asset->url,
    "projectRationaleVideo": projectRationaleVideo.asset->url,
    "projectRationaleVideoPoster": projectRationaleVideoPoster.asset->url,
    
    // Research Section Divider
    researchSectionTitle,
    "researchSectionImage": researchSectionImage.asset->url,
    "researchSectionVideo": researchSectionVideo.asset->url,
    "researchSectionVideoPoster": researchSectionVideoPoster.asset->url,
    
    // Market Research Section
    marketResearchHeading,
    marketResearchContent,
    "marketResearchVisual": marketResearchVisual.asset->url,
    "marketResearchVisualVideo": marketResearchVisualVideo.asset->url,
    "marketResearchVisualVideoPoster": marketResearchVisualVideoPoster.asset->url,
    
    // Competitive Analysis Section
    competitiveAnalysisHeading,
    competitiveAnalysisIntro,
    competitors[] {
      competitorName,
      competitorType,
      "competitorImage": competitorImage.asset->url,
      "competitorVideo": competitorVideo.asset->url,
      "competitorVideoPoster": competitorVideoPoster.asset->url,
      competitorPros[],
      competitorCons[],
    },
    
    // Opportunities 
    opportunitiesHeading,
    opportunitiesList,
    "opportunitiesImage": opportunitiesImage.asset->url,
    "opportunitiesVideo": opportunitiesVideo.asset->url,
    "opportunitiesVideoPoster": opportunitiesVideoPoster.asset->url,

    // User Survey Section
    userSurveyHeading,
    userSurveyIntro,
    "surveyCharts": surveyCharts[].asset->url,
    "surveyChartsVideo": surveyChartsVideo[].asset->url,
    "surveyChartsVideoPoster": surveyChartsVideoPoster[].asset->url,

    // Assumption Validation
    assumptionValidationHeading,
    assumptionValidation,
    "assumptionValidationImage": assumptionValidationImage.asset->url,
    "assumptionValidationVideo": assumptionValidationVideo.asset->url,
    "assumptionValidationVideoPoster": assumptionValidationVideoPoster.asset->url,

    // Key Insights
    keyInsightsHeading,
    keyInsights[],
    opportunityText,
    
    // User Personas Section
    personasHeading,
    personasIntro,
    "personas": personas[].asset->url,
    "personasVideo": personasVideo[].asset->url,
    "personasVideoPoster": personasVideoPoster[].asset->url,
    
    // Problem Statement Section
    problemStatementHeading,
    problemStatement,

    // Design Goals
    designGoalsHeading,
    designGoals[],
    
    // Ideation Section Divider
    ideationSectionTitle,
    "ideationSectionImage": ideationSectionImage.asset->url,
    "ideationSectionVideo": ideationSectionVideo.asset->url,
    "ideationSectionVideoPoster": ideationSectionVideoPoster.asset->url,
    
    // User Flow Section
    userFlowHeading,
    userFlowDescription,
    "userFlowDiagrams": userFlowDiagrams[].asset->url,
    "userFlowDiagramsVideo": userFlowDiagramsVideo[].asset->url,
    "userFlowDiagramsVideoPoster": userFlowDiagramsVideoPoster[].asset->url,

    // Information Architecture Section
    informationArchitectureHeading,
    informationArchitectureDescription,
    "informationArchitectureImage": informationArchitectureImage.asset->url,
    "informationArchitectureVideo": informationArchitectureVideo.asset->url,
    "informationArchitectureVideoPoster": informationArchitectureVideoPoster.asset->url,
    
    // Wireframing Section
    wireframesHeading,
    wireframesDescription,
    "wireframeImages": wireframeImages[].asset->url,
    "wireframeVideos": wireframeVideos[].asset->url,
    "wireframeVideoPosters": wireframeVideoPosters[].asset->url,

    // Visual Design Section Divider
    visualDesignSectionTitle,
    "visualDesignSectionImage": visualDesignSectionImage.asset->url,
    "visualDesignSectionVideo": visualDesignSectionVideo.asset->url,
    "visualDesignSectionVideoPoster": visualDesignSectionVideoPoster.asset->url,
    
    // Style Guide / Design System
    styleGuideHeading,
    styleGuideDescription,
    "styleGuideImages": styleGuideImages[].asset->url,
    "styleGuideVideos": styleGuideVideos[].asset->url,
    "styleGuideVideoPosters": styleGuideVideoPosters[].asset->url,
    
    // High Fidelity Designs
    highFidelityHeading,
    highFidelityIntro,
    keyScreensList[],
    "highFidelityMockups": highFidelityMockups[].asset->url,
    "highFidelityMockupsVideo": highFidelityMockupsVideo[].asset->url,
    "highFidelityMockupsVideoPoster": highFidelityMockupsVideoPoster[].asset->url,
    
    // Interactive Prototype Section
    prototypeHeading,
    prototypeDescription,
    "prototypeImages": prototypeImages[].asset->url,
    "prototypeVideos": prototypeVideos[].asset->url,
    "prototypeVideoPosters": prototypeVideoPosters[].asset->url,
    prototypeNotes[],
    
    // Prototype Validation / Usabiility Testing
    validationHeading,
    validationDescription,
    validationMethodology[],
    studyResultsHeading,
    studyResults[],
    "studyResultsImage": studyResultsImage.asset->url,
    "studyResultsVideo": studyResultsVideo.asset->url,
    "studyResultsVideoPoster": studyResultsVideoPoster.asset->url,
    prototypeUpdateHeading,
    prototypeUpdates[],
    "prototypeUpdatesImage": prototypeUpdatesImage.asset->url,
    "prototypeUpdatesVideo": prototypeUpdatesVideo.asset->url,
    "prototypeUpdatesVideoPoster": prototypeUpdatesVideoPoster.asset->url,
    
    // Accessibility Considerations Section
    accessibilityHeading,
    accessibilityConsiderations,
    "accessibilityMockup": accessibilityMockup.asset->url,
    "accessibilityMockupVideo": accessibilityMockupVideo.asset->url,
    "accessibilityMockupVideoPoster": accessibilityMockupVideoPoster.asset->url,
    
    // Final Thoughts Section Divider
    finalThoughtsSectionHeading,
    "finalThoughtsSectionImage": finalThoughtsSectionImage.asset->url,
    "finalThoughtsSectionVideo": finalThoughtsSectionVideo.asset->url,
    "finalThoughtsSectionVideoPoster": finalThoughtsSectionVideoPoster.asset->url,

    // Final Thoughts
    finalResultsHeading,
    finalResultsText,
    expectedOutcomes[],
    outcomesDisclaimer,
    keyLearningsHeading,
    keyLearnings[],
    "keyLearningsImage": keyLearningsImage.asset->url,
    "keyLearningsVideo": keyLearningsVideo.asset->url,
    "keyLearningsVideoPoster": keyLearningsVideoPoster.asset->url,
    
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
  categoryName == "Logos & Branding" => {
    
    // Teaser Image
    "teaserImages": teaserImages[].asset->url,
    "teaserVideos": teaserVideos[].asset->url,
    "teaserVideoPosters": teaserVideoPosters[].asset->url,
    
    // Business Context
    businessContextHeading,
    businessContextContent,
    
    // Problems Identified
    problemsIdentifiedHeading,
    problemsIdentified[],
    "problemsIdentifiedImage": problemsIdentifiedImage.asset->url,
    "problemsIdentifiedVideo": problemsIdentifiedVideo.asset->url,
    "problemsIdentifiedVideoPoster": problemsIdentifiedVideoPoster.asset->url,
    
    // Design Objectives
    designObjectivesHeading,
    designObjectives[],
    "designObjectivesImage": designObjectivesImage.asset->url,
    "designObjectivesVideo": designObjectivesVideo.asset->url,
    "designObjectivesVideoPoster": designObjectivesVideoPoster.asset->url,
    
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
    "firstCoreLandscapeVideos": firstCoreLandscapeVideos[].asset->url,
    "firstCoreLandscapeVideoPosters": firstCoreLandscapeVideoPosters[].asset->url,
    "firstCorePortraitImages": firstCorePortraitImages[].asset->url,
    "firstCorePortraitVideos": firstCorePortraitVideos[].asset->url,
    "firstCorePortraitVideoPosters": firstCorePortraitVideoPosters[].asset->url,

    // Second Core Section
    secondCoreSectionHeading,
    secondCoreSectionText,
    secondCoreSectionList[],
    "secondCoreLandscapeImages": secondCoreLandscapeImages[].asset->url,
    "secondCoreLandscapeVideos": secondCoreLandscapeVideos[].asset->url,
    "secondCoreLandscapeVideoPosters": secondCoreLandscapeVideoPosters[].asset->url,
    "secondCorePortraitImages": secondCorePortraitImages[].asset->url,
    "secondCorePortraitVideos": secondCorePortraitVideos[].asset->url,
    "secondCorePortraitVideoPosters": secondCorePortraitVideoPosters[].asset->url,

    // Third Core Section
    thirdCoreSectionHeading,
    thirdCoreSectionText,
    thirdCoreSectionList[],
    "thirdCoreLandscapeImages": thirdCoreLandscapeImages[].asset->url,
    "thirdCoreLandscapeVideos": thirdCoreLandscapeVideos[].asset->url,
    "thirdCoreLandscapeVideoPosters": thirdCoreLandscapeVideoPosters[].asset->url,
    "thirdCorePortraitImages": thirdCorePortraitImages[].asset->url,
    "thirdCorePortraitVideos": thirdCorePortraitVideos[].asset->url,
    "thirdCorePortraitVideoPosters": thirdCorePortraitVideoPosters[].asset->url,

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
    "keyLearnVideo": keyLearnVideo.asset->url,
    "keyLearnVideoPoster": keyLearnVideoPoster.asset->url,
    
    // What Worked Section
    whatWorkedHeading,
    whatWorkedText,
    whatWorkedList[],
    "whatWorkedImage": whatWorkedImage.asset->url,
    "whatWorkedVideo": whatWorkedVideo.asset->url,
    "whatWorkedVideoPoster": whatWorkedVideoPoster.asset->url,
  },
}
`;
