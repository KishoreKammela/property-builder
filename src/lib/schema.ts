import { z } from 'zod';

const idSchema = z.string().regex(/^[a-z0-9-]+$/, {
  message: 'ID must only contain lowercase letters, numbers, and hyphens.',
}).min(1, 'ID is required.');

const urlSchema = z.string().url("Invalid URL format.").min(1, "URL is required.");

export const cardSliderItemSchema = z.object({
  id: idSchema,
  src: urlSchema,
  alt: z.string(),
  width: z.number().optional(),
  height: z.number().optional(),
});

export const amenitiesItemSchema = z.object({
    id: idSchema,
    title: z.string().min(1, 'Title is required.'),
    icon: z.any().optional(),
});

export const amenitiesAccordionItemSchema = z.object({
  id: idSchema,
  amenitiesTitle: z.string().min(1, 'Title is required.'),
  amenitiesDescription: z.string().optional(),
  amenitiesItems: z.array(amenitiesItemSchema),
});

export const amenitiesAccordionSectionSchema = z.object({
  variant: z.enum(['dark', 'light']),
  mainHeading: z.string().optional(),
  subtitle: z.string().optional(),
  footerDescription: z.string().optional(),
  contactButtonText: z.string().optional(),
  amenitiesAccordionItems: z.array(amenitiesAccordionItemSchema),
  cardSlideItems: z.array(cardSliderItemSchema),
});

export const faqItemSchema = z.object({
  id: idSchema,
  question: z.string().min(1, 'Question is required.'),
  answer: z.string().min(1, 'Answer is required.'),
});

export const faqSectionSchema = z.object({
  mainHeading: z.string().optional(),
  subtitle: z.string().optional(),
  contactButtonText: z.string().optional(),
  faqItems: z.array(faqItemSchema),
});

export const connectivitySchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  time: z.string(),
  distance: z.string(),
  icon: z.string().optional(),
});

export const locationTabSchema = z.object({
  id: idSchema,
  tabName: z.string().min(1, 'Tab name is required.'),
  icon: z.string().optional(),
  connectivity: z.array(connectivitySchema),
});

export const locationAndConnectivitySectionSchema = z.object({
  mainHeading: z.string().min(1, 'Heading is required.'),
  locationText: z.string(),
  locationLink: urlSchema,
  locationLinkText: z.string(),
  locationImage: urlSchema,
  locationTabs: z.array(locationTabSchema),
});

export const floorPlanSchema = z.object({
    id: idSchema,
    name: z.string().min(1),
    type: z.string().min(1),
    area: z.number(),
    bedrooms: z.number(),
    bathrooms: z.number(),
    price: z.number(),
    image: urlSchema,
    description: z.string(),
});

export const propertySpecificationSchema = z.object({
    id: idSchema,
    value: z.string(),
    displayText: z.string(),
    displayIcon: z.string().optional(),
});

export const keyProjectDateSchema = z.object({
    id: idSchema,
    title: z.string(),
    date: z.string(),
});

export const unitPlanSchema = z.object({
    id: idSchema,
    unitPlanTitle: z.string(),
    unitPlanDescription: z.string(),
    unitPlanImageUrl: urlSchema,
    unitPlanEnquireUrl: urlSchema,
});

export const productPricingTableItemSchema = z.object({
    pricingId: idSchema,
    pricingConfigType: z.string(),
    pricingCarpetApproxArea: z.string(),
    price: z.string(),
    pricingEnquireCtaText: z.string(),
});

export const propertyLocationInformationSchema = z.object({
    estateInfoId: idSchema,
    estateInfoTitle: z.string(),
    estateInfoDescription: z.string(),
});

export const highlightItemSchema = z.object({
    highlightId: idSchema,
    highlightImageUrl: urlSchema,
    highlightDescription: z.string(),
});

export const propertyBannerSectionSchema = z.object({
    headingOne: z.string(),
    headingTwo: z.string(),
    mainBannerImageUrl: urlSchema,
    primeLocationAt: z.string(),
    projectStatusTitle: z.string(),
    projectStatusValue: z.enum(['New Launch', 'Pre-Launch', 'Upcoming Launches']),
    isReraCertified: z.boolean(),
    reraLogo: urlSchema,
    reraCertifiedLabel: z.string(),
    priceRangeLabel: z.string(),
    grabEarlyBirdAdvantages: z.string(),
    limitedSlotsAvailable: z.string(),
    brochureCta: z.string(),
    bookVisitCta: z.string(),
    viewAllPhotosCta: z.string(),
    specifications: z.array(propertySpecificationSchema),
});

export const propertyOverviewSectionSchema = z.object({
    projectOverviewLabel: z.string(),
    projectWalkthroughLabel: z.string(),
    projectOverviewDescription: z.string(),
    propertySpecifications: z.array(propertySpecificationSchema),
    isReraCertified: z.boolean(),
    reraLogo: urlSchema,
    reraCertifiedLabel: z.string(),
    reraNumberLabel: z.string(),
    projectReraNumber: z.string(),
    keyProjectDatesTitle: z.string(),
    keyProjectDates: z.array(keyProjectDateSchema),
    projectOverviewImageUrl: urlSchema,
    projectOverviewViewMoreCta: z.string(),
});

export const propertyHighlightsSectionSchema = z.object({
    propertyHighlightsTitle: z.string(),
    propertyHighlightsDescription: z.string(),
    propertyHighlights: z.array(highlightItemSchema),
});

export const propertyMasterPlanSectionSchema = z.object({
    masterPlanTitle: z.string(),
    masterPlanImageUrl: urlSchema,
    masterPlanDescription: z.string(),
    masterPlanEnquireNowCta: z.string(),
    masterPlanViewInDetailCta: z.string(),
});

export const propertyUnitPlanSectionSchema = z.object({
    unitPlanTitle: z.string(),
    unitPlanDescription: z.string(),
    unitPlanViewInDetailCta: z.string(),
    unitPlans: z.array(unitPlanSchema),
});

export const propertyPricingSectionSchema = z.object({
    pricingTitle: z.string(),
    pricingDescription: z.string(),
    pricingImageUrl: urlSchema,
    completeCostingDetailsLabel: z.string(),
    pricingEnquireNowCta: z.string(),
    pricingData: z.array(productPricingTableItemSchema),
});

export const propertySpecificationsSectionSchema = z.object({
    specificationTitle: z.string(),
    specificationDescription: z.string(),
    specificationViewInDetailCta: z.string(),
    specificationImageUrl: urlSchema,
});

export const propertyLocationSectionSchema = z.object({
    propertyLoactionTitle: z.string(),
    propertyLoactionDescription: z.string(),
    propertyLoactionImageUrl: urlSchema,
    propertyLoactionInformation: z.array(propertyLocationInformationSchema),
});

export const masterPlanBannerFeaturesSchema = z.object({
    title: z.string(),
    description: z.string(),
});

export const propertyMasterPlanBannerSectionSchema = z.object({
    bannerSectionHeader: z.string(),
    bannerSectionCta: z.string(),
    bannerSectionImageUrl: urlSchema,
    bannerSectionDescription: z.string(),
    bannerSectionFeatures: z.array(masterPlanBannerFeaturesSchema),
});

export const towerDetailSchema = z.object({
    towerRange: z.string(),
    floors: z.string(),
    specialFeature: z.string(),
});

export const amenityPointSchema = z.object({
    description: z.string(),
});

export const unitSizeSchema = z.object({
    type: z.string(),
    sizeRange: z.string(),
});

export const propertyMasterPlanTowersSectionSchema = z.object({
    towerSectionHeading: z.string(),
    towerSectionDescription: z.string(),
    towerSectionAmenitiesHeading: z.string(),
    towerSectionUnitSizesHeading: z.string(),
    towerSectionUnitSizesSubHeading: z.string(),
    towerSectionTableDescription: z.string(),
    towerSectionSliderImages: z.array(cardSliderItemSchema),
    towerSectionTableDetails: z.array(towerDetailSchema),
    towerSectionAmenitiesPoints: z.array(amenityPointSchema),
    towerSectionUnitsSizes: z.array(unitSizeSchema),
});

export const masterPlanPropsSchema = z.object({
    id: idSchema,
    featuresSectionTittle: z.string(),
    featuresSectionFeaturesHeading: z.string(),
    featuresSectionAccessibilityHeading: z.string(),
    featuresSectionDescription: z.string(),
    featuresSectionBannerImageUrl: urlSchema,
    featuresSectionFeatureRichSpaces: z.array(z.string()),
    featuresSectionAccessibilityLayoutStrategies: z.array(z.string()),
});

export const propertyMasterPlanFeaturesSectionSchema = z.object({
    features: z.array(masterPlanPropsSchema),
});

export const floorOrUnitPlanSchema = z.object({
    id: idSchema,
    title: z.string(),
    description: z.string(),
    imageUrl: urlSchema,
    enquiryNowUrl: urlSchema,
    area: z.number().optional(),
    bedrooms: z.number().optional(),
    bathrooms: z.number().optional(),
});

export const propertyFloorPlanSectionSchema = z.object({
    floorPlanSectionHeading: z.string(),
    floorPlanSectionDescription: z.string(),
    floorPlanSectionPlans: z.array(floorOrUnitPlanSchema),
});

export const floorFeatureSchema = z.object({
    id: idSchema,
    title: z.string(),
    description: z.string(),
    imageUrl: urlSchema,
});

export const propertyDesignAndQualitySectionSchema = z.object({
    designAndQualitySectionHeading: z.string(),
    designAndQualitySectionFeatures: z.array(floorFeatureSchema),
});

export const floorTableDataSchema = z.object({
    configurationType: z.string(),
    carpetAreaApprox: z.string(),
    price: z.string(),
    priceEnquireLabel: z.string(),
});

export const propertyUnitSizesSectionSchema = z.object({
    unitSizesSectionHeading: z.string(),
    unitSizesWithinTower: z.array(floorTableDataSchema),
});

export const highlightSchema = z.object({
    name: z.string(),
    description: z.string(),
    image: z.array(cardSliderItemSchema),
});

export const propertyUnitHighlightsSectionSchema = z.object({
    highlightsSectionHeading: z.string(),
    highlightsSectionHighlights: z.array(highlightSchema),
});

export const propertyAmenitiesGallerySectionSchema = z.object({
    id: idSchema,
    amenitiesGalleryTitle: z.string(),
    amenitiesGalleryDescription: z.string(),
    amenitiesGalleryAttractions: z.array(z.string()),
    amenitiesGallerySlideImages: z.array(cardSliderItemSchema),
    amenitiesGallerySecondHeading: z.string(),
    communityAmenities: z.array(z.string()),
    icon: z.any().optional(),
});

export const propertySpecificationsBannerSectionSchema = z.object({
    specificationsBannerSectionTitle: z.string(),
    specificationsBannerSectionDescription: z.string(),
    specificationsBannerSectionImageUrl: urlSchema,
    specificationsBannerSectionMobileImageUrl: urlSchema,
});

export const propertySpecificationsGalleryShowCaseAreaSchema = z.object({
    id: idSchema,
    specificationsGalleryTitle: z.string(),
    specificationsGalleryDescription: z.string(),
    specificationsGalleryFeatures: z.array(z.string()),
    specificationsGalleryImageUrl: urlSchema,
});

const emptyStringToUndefined = z.literal('').transform(() => undefined);

export const propertySchema = z.object({
    id: idSchema,
    name: z.string().min(1, 'Property name is required'),
    slug: idSchema,
    city: z.string().min(1),
    area: z.string().min(1),
    type: z.enum(['apartment', 'villa', 'commercial']),
    priceRange: z.object({ min: z.number(), max: z.number() }),
    currency: z.string().min(1),
    description: z.string().min(1),
    shortDescription: z.string().min(1),
    features: z.array(z.string()),
    amenities: z.array(z.string()),
    specifications: z.object({
        totalFloors: z.number().optional(),
        totalUnits: z.number().optional(),
        launchDate: z.string().optional(),
        possessionDate: z.string().optional(),
        approvals: z.array(z.string()).optional(),
        constructionType: z.string().optional(),
        elevators: z.number().optional(),
        parkingRatio: z.string().optional(),
    }),
    featuredImage: urlSchema,
    alt: z.string().min(1, "Alt text is required."),
    masterPlan: urlSchema,
    floorPlans: z.array(floorPlanSchema),
    address: z.string().min(1),
    coordinates: z.object({ lat: z.number(), lng: z.number() }).optional(),
    developer: z.string().min(1),
    possession: z.string().min(1),
    status: z.enum(['upcoming', 'ongoing', 'ready']),
    createdAt: z.string().min(1),
    updatedAt: z.string().min(1),
    propertyDetailPage: z.object({
        propertyBannerSection: propertyBannerSectionSchema,
        propertyLocationAndConnectivitySection: locationAndConnectivitySectionSchema,
        propertyOverviewSection: propertyOverviewSectionSchema,
        propertyAmenitiesSection: amenitiesAccordionSectionSchema,
        propertyHighlightsSection: propertyHighlightsSectionSchema,
        propertyMasterPlanSection: propertyMasterPlanSectionSchema,
        propertyUnitPlansSection: propertyUnitPlanSectionSchema,
        propertyPricingSection: propertyPricingSectionSchema,
        propertySpecificationsSection: propertySpecificationsSectionSchema,
        propertyLocationSection: propertyLocationSectionSchema,
        propertyDetailsFAQSection: faqSectionSchema,
    }),
    propertyMasterPlanDetailPage: z.object({
        propertyMasterPlanBannerSection: propertyMasterPlanBannerSectionSchema,
        propertyMasterPlanTowersSection: propertyMasterPlanTowersSectionSchema,
        propertyMasterPlanFeaturesSection: propertyMasterPlanFeaturesSectionSchema,
        propertyMasterPlanFAQSection: faqSectionSchema,
    }),
    propertyUnitPlanDetailPage: z.object({
        propertyFloorPlanSection: propertyFloorPlanSectionSchema,
        propertyDesignAndQualitySection: propertyDesignAndQualitySectionSchema,
        propertyUnitSizesSection: propertyUnitSizesSectionSchema,
        propertyUnitHighlightsSection: propertyUnitHighlightsSectionSchema,
        propertyUnitPlanFAQSection: faqSectionSchema,
    }),
    propertyAmenitiesDetailPage: z.object({
        propertyAmenitiesAccordionSection: amenitiesAccordionSectionSchema,
        propertyAmenitiesGalleryShowCaseArea: z.array(propertyAmenitiesGallerySectionSchema),
        propertyAmenitiesFAQSection: faqSectionSchema,
    }),
    propertySpecificationsDetailPage: z.object({
        propertySpecificationsBannerSection: propertySpecificationsBannerSectionSchema,
        propertySpecificationsGalleryShowCaseArea: z.array(propertySpecificationsGalleryShowCaseAreaSchema),
        propertySpecificationFAQSection: faqSectionSchema,
    }),
});
