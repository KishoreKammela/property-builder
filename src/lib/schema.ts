import { z } from 'zod';

const idSchema = z.string().regex(/^[a-z0-9-]+$/, {
  message: 'ID must only contain lowercase letters, numbers, and hyphens.',
}).min(1, 'ID is required.');

const urlSchema = z.string().url("Please enter a valid URL (e.g., https://example.com).").min(1, "URL is required.");

export const cardSliderItemSchema = z.object({
  id: idSchema,
  src: urlSchema,
  alt: z.string().min(1, "Alt text is required for accessibility."),
  width: z.number().optional(),
  height: z.number().optional(),
});

export const amenitiesItemSchema = z.object({
    id: idSchema,
    title: z.string().min(1, 'Amenity title is required.'),
    icon: z.any().optional(),
});

export const amenitiesAccordionItemSchema = z.object({
  id: idSchema,
  amenitiesTitle: z.string().min(1, 'Accordion title is required.'),
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
  mainHeading: z.string().min(1, "Main heading is required."),
  subtitle: z.string().optional(),
  contactButtonText: z.string().optional(),
  faqItems: z.array(faqItemSchema),
});

export const connectivitySchema = z.object({
  name: z.string().min(1, 'Location name is required.'),
  time: z.string().optional(),
  distance: z.string().min(1, "Distance is required."),
  icon: z.string().optional(),
});

export const locationTabSchema = z.object({
  id: idSchema,
  tabName: z.string().min(1, 'Tab name is required.'),
  icon: z.string().optional(),
  connectivity: z.array(connectivitySchema),
});

export const locationAndConnectivitySectionSchema = z.object({
  mainHeading: z.string().min(1, 'Main heading is required.'),
  locationText: z.string().min(1, "Location text is required."),
  locationLink: urlSchema,
  locationLinkText: z.string().min(1, "Link text is required."),
  locationImage: urlSchema,
  locationTabs: z.array(locationTabSchema),
});

export const floorPlanSchema = z.object({
    id: idSchema,
    name: z.string().min(1, "Floor plan name is required."),
    type: z.string().min(1, "Type is required."),
    area: z.number().min(1, "Area must be greater than 0."),
    bedrooms: z.number().min(0, "Bedrooms cannot be negative."),
    bathrooms: z.number().min(0, "Bathrooms cannot be negative."),
    price: z.number().min(0, "Price cannot be negative."),
    image: urlSchema,
    description: z.string().min(1, "Description is required."),
});

export const propertySpecificationSchema = z.object({
    id: idSchema,
    value: z.string().min(1, "Value is required."),
    displayText: z.string().min(1, "Display text is required."),
    displayIcon: z.string().optional(),
});

export const keyProjectDateSchema = z.object({
    id: idSchema,
    title: z.string().min(1, "Title is required."),
    date: z.string().min(1, "Date is required."),
});

export const unitPlanSchema = z.object({
    id: idSchema,
    unitPlanTitle: z.string().min(1, "Unit plan title is required."),
    unitPlanDescription: z.string().min(1, "Description is required."),
    unitPlanImageUrl: urlSchema,
    unitPlanEnquireUrl: urlSchema,
});

export const productPricingTableItemSchema = z.object({
    pricingId: idSchema,
    pricingConfigType: z.string().min(1, "Configuration type is required."),
    pricingCarpetApproxArea: z.string().min(1, "Carpet area is required."),
    price: z.string().min(1, "Price is required."),
    pricingEnquireCtaText: z.string().min(1, "CTA text is required."),
});

export const propertyLocationInformationSchema = z.object({
    estateInfoId: idSchema,
    estateInfoTitle: z.string().min(1, "Title is required."),
    estateInfoDescription: z.string().min(1, "Description is required."),
});

export const highlightItemSchema = z.object({
    highlightId: idSchema,
    highlightImageUrl: urlSchema,
    highlightDescription: z.string().min(1, "Highlight description is required."),
});

export const propertyBannerSectionSchema = z.object({
    headingOne: z.string().min(1, "Heading One is required."),
    headingTwo: z.string().min(1, "Heading Two is required."),
    mainBannerImageUrl: urlSchema,
    primeLocationAt: z.string().min(1, "Prime location is required."),
    projectStatusTitle: z.string().optional(),
    projectStatusValue: z.enum(['New Launch', 'Pre-Launch', 'Upcoming Launches']),
    isReraCertified: z.boolean(),
    reraLogo: urlSchema,
    reraCertifiedLabel: z.string().min(1, "RERA label is required."),
    priceRangeLabel: z.string().min(1, "Price range label is required."),
    grabEarlyBirdAdvantages: z.string().optional(),
    limitedSlotsAvailable: z.string().optional(),
    brochureCta: z.string().min(1, "Brochure CTA is required."),
    bookVisitCta: z.string().min(1, "Book visit CTA is required."),
    viewAllPhotosCta: z.string().min(1, "View all photos CTA is required."),
    specifications: z.array(propertySpecificationSchema),
});

export const propertyOverviewSectionSchema = z.object({
    projectOverviewLabel: z.string().min(1, "Label is required."),
    projectWalkthroughLabel: z.string().min(1, "Label is required."),
    projectOverviewDescription: z.string().min(1, "Description is required."),
    propertySpecifications: z.array(propertySpecificationSchema),
    isReraCertified: z.boolean(),
    reraLogo: urlSchema,
    reraCertifiedLabel: z.string().min(1, "RERA label is required."),
    reraNumberLabel: z.string().min(1, "RERA number label is required."),
    projectReraNumber: z.string().min(1, "RERA number is required."),
    keyProjectDatesTitle: z.string().min(1, "Title is required."),
    keyProjectDates: z.array(keyProjectDateSchema),
    projectOverviewImageUrl: urlSchema,
    projectOverviewViewMoreCta: z.string().min(1, "CTA text is required."),
});

export const propertyHighlightsSectionSchema = z.object({
    propertyHighlightsTitle: z.string().min(1, "Title is required."),
    propertyHighlightsDescription: z.string().min(1, "Description is required."),
    propertyHighlights: z.array(highlightItemSchema),
});

export const propertyMasterPlanSectionSchema = z.object({
    masterPlanTitle: z.string().min(1, "Title is required."),
    masterPlanImageUrl: urlSchema,
    masterPlanDescription: z.string().min(1, "Description is required."),
    masterPlanEnquireNowCta: z.string().min(1, "CTA text is required."),
    masterPlanViewInDetailCta: z.string().min(1, "CTA text is required."),
});

export const propertyUnitPlanSectionSchema = z.object({
    unitPlanTitle: z.string().min(1, "Title is required."),
    unitPlanDescription: z.string().min(1, "Description is required."),
    unitPlanViewInDetailCta: z.string().min(1, "CTA text is required."),
    unitPlans: z.array(unitPlanSchema),
});

export const propertyPricingSectionSchema = z.object({
    pricingTitle: z.string().min(1, "Title is required."),
    pricingDescription: z.string().min(1, "Description is required."),
    pricingImageUrl: urlSchema,
    completeCostingDetailsLabel: z.string().min(1, "Label is required."),
    pricingEnquireNowCta: z.string().min(1, "CTA text is required."),
    pricingData: z.array(productPricingTableItemSchema),
});

export const propertySpecificationsSectionSchema = z.object({
    specificationTitle: z.string().min(1, "Title is required."),
    specificationDescription: z.string().min(1, "Description is required."),
    specificationViewInDetailCta: z.string().min(1, "CTA text is required."),
    specificationImageUrl: urlSchema,
});

export const propertyLocationSectionSchema = z.object({
    propertyLoactionTitle: z.string().min(1, "Title is required."),
    propertyLoactionDescription: z.string().min(1, "Description is required."),
    propertyLoactionImageUrl: urlSchema,
    propertyLoactionInformation: z.array(propertyLocationInformationSchema),
});

export const masterPlanBannerFeaturesSchema = z.object({
    title: z.string().min(1, "Title is required."),
    description: z.string().min(1, "Description is required."),
});

export const propertyMasterPlanBannerSectionSchema = z.object({
    bannerSectionHeader: z.string().min(1, "Header is required."),
    bannerSectionCta: z.string().min(1, "CTA text is required."),
    bannerSectionImageUrl: urlSchema,
    bannerSectionDescription: z.string().min(1, "Description is required."),
    bannerSectionFeatures: z.array(masterPlanBannerFeaturesSchema),
});

export const towerDetailSchema = z.object({
    towerRange: z.string().min(1, "Tower range is required."),
    floors: z.string().min(1, "Floors information is required."),
    specialFeature: z.string().min(1, "Special feature is required."),
});

export const amenityPointSchema = z.object({
    description: z.string().min(1, "Description is required."),
});

export const unitSizeSchema = z.object({
    type: z.string().min(1, "Type is required."),
    sizeRange: z.string().min(1, "Size range is required."),
});

export const propertyMasterPlanTowersSectionSchema = z.object({
    towerSectionHeading: z.string().min(1, "Heading is required."),
    towerSectionDescription: z.string().min(1, "Description is required."),
    towerSectionAmenitiesHeading: z.string().min(1, "Amenities heading is required."),
    towerSectionUnitSizesHeading: z.string().min(1, "Unit sizes heading is required."),
    towerSectionUnitSizesSubHeading: z.string().optional(),
    towerSectionTableDescription: z.string().optional(),
    towerSectionSliderImages: z.array(cardSliderItemSchema),
    towerSectionTableDetails: z.array(towerDetailSchema),
    towerSectionAmenitiesPoints: z.array(amenityPointSchema),
    towerSectionUnitsSizes: z.array(unitSizeSchema),
});

export const masterPlanPropsSchema = z.object({
    id: idSchema,
    featuresSectionTittle: z.string().min(1, "Title is required."),
    featuresSectionFeaturesHeading: z.string().min(1, "Features heading is required."),
    featuresSectionAccessibilityHeading: z.string().min(1, "Accessibility heading is required."),
    featuresSectionDescription: z.string().min(1, "Description is required."),
    featuresSectionBannerImageUrl: urlSchema,
    featuresSectionFeatureRichSpaces: z.array(z.string().min(1)),
    featuresSectionAccessibilityLayoutStrategies: z.array(z.string().min(1)),
});

export const propertyMasterPlanFeaturesSectionSchema = z.object({
    features: z.array(masterPlanPropsSchema),
});

export const floorOrUnitPlanSchema = z.object({
    id: idSchema,
    title: z.string().min(1, "Title is required."),
    description: z.string().min(1, "Description is required."),
    imageUrl: urlSchema,
    enquiryNowUrl: urlSchema,
    area: z.number().optional(),
    bedrooms: z.number().optional(),
    bathrooms: z.number().optional(),
});

export const propertyFloorPlanSectionSchema = z.object({
    floorPlanSectionHeading: z.string().min(1, "Heading is required."),
    floorPlanSectionDescription: z.string().min(1, "Description is required."),
    floorPlanSectionPlans: z.array(floorOrUnitPlanSchema),
});

export const floorFeatureSchema = z.object({
    id: idSchema,
    title: z.string().min(1, "Title is required."),
    description: z.string().min(1, "Description is required."),
    imageUrl: urlSchema,
});

export const propertyDesignAndQualitySectionSchema = z.object({
    designAndQualitySectionHeading: z.string().min(1, "Heading is required."),
    designAndQualitySectionFeatures: z.array(floorFeatureSchema),
});

export const floorTableDataSchema = z.object({
    configurationType: z.string().min(1, "Configuration type is required."),
    carpetAreaApprox: z.string().min(1, "Carpet area is required."),
    price: z.string().min(1, "Price is required."),
    priceEnquireLabel: z.string().min(1, "Enquire label is required."),
});

export const propertyUnitSizesSectionSchema = z.object({
    unitSizesSectionHeading: z.string().min(1, "Heading is required."),
    unitSizesWithinTower: z.array(floorTableDataSchema),
});

export const highlightSchema = z.object({
    name: z.string().min(1, "Name is required."),
    description: z.string().min(1, "Description is required."),
    image: z.array(cardSliderItemSchema),
});

export const propertyUnitHighlightsSectionSchema = z.object({
    highlightsSectionHeading: z.string().min(1, "Heading is required."),
    highlightsSectionHighlights: z.array(highlightSchema),
});

export const propertyAmenitiesGallerySectionSchema = z.object({
    id: idSchema,
    amenitiesGalleryTitle: z.string().min(1, "Title is required."),
    amenitiesGalleryDescription: z.string().min(1, "Description is required."),
    amenitiesGalleryAttractions: z.array(z.string().min(1)),
    amenitiesGallerySlideImages: z.array(cardSliderItemSchema),
    amenitiesGallerySecondHeading: z.string().min(1, "Second heading is required."),
    communityAmenities: z.array(z.string().min(1)),
    icon: z.any().optional(),
});

export const propertySpecificationsBannerSectionSchema = z.object({
    specificationsBannerSectionTitle: z.string().min(1, "Title is required."),
    specificationsBannerSectionDescription: z.string().min(1, "Description is required."),
    specificationsBannerSectionImageUrl: urlSchema,
    specificationsBannerSectionMobileImageUrl: urlSchema,
});

export const propertySpecificationsGalleryShowCaseAreaSchema = z.object({
    id: idSchema,
    specificationsGalleryTitle: z.string().min(1, "Title is required."),
    specificationsGalleryDescription: z.string().min(1, "Description is required."),
    specificationsGalleryFeatures: z.array(z.string().min(1)),
    specificationsGalleryImageUrl: urlSchema,
});

export const GenerateUniqueIdInputSchema = z.object({
    propertyName: z.string().describe('The name of the property.'),
    sectionName: z.string().describe('The name of the content section.'),
});
export type GenerateUniqueIdInput = z.infer<typeof GenerateUniqueIdInputSchema>;

export const GenerateUniqueIdOutputSchema = z.object({
    uniqueId: z.string().describe('The generated unique ID for the content section.'),
});
export type GenerateUniqueIdOutput = z.infer<typeof GenerateUniqueIdOutputSchema>;

export const GenerateAltTextInputSchema = z.object({
    imageUrl: z
      .string()
      .describe(
        "The URL of the image for which alt text needs to be generated. Must be a data URI that includes a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
      ),
    propertyName: z.string().describe('The name of the property.'),
    propertyType: z.string().describe('The type of the property (e.g., apartment, villa).'),
    propertyArea: z.string().describe('The area where the property is located.'),
});
export type GenerateAltTextInput = z.infer<typeof GenerateAltTextInputSchema>;
  
export const GenerateAltTextOutputSchema = z.object({
    altText: z.string().describe('The generated alt text for the image.'),
});
export type GenerateAltTextOutput = z.infer<typeof GenerateAltTextOutputSchema>;

export const GenerateDescriptionsInputSchema = z.object({
    propertyName: z.string().describe('The name of the property.'),
    propertyType: z.string().describe('The type of the property (e.g., apartment, villa).'),
    propertyArea: z.string().describe('The area where the property is located.'),
    features: z.array(z.string()).describe('A list of key features of the property.'),
    amenities: z.array(z.string()).describe('A list of amenities available at the property.'),
});
export type GenerateDescriptionsInput = z.infer<typeof GenerateDescriptionsInputSchema>;

export const GenerateDescriptionsOutputSchema = z.object({
    description: z.string().describe('The generated full description for the property.'),
    shortDescription: z.string().describe('The generated short summary for the property.'),
});
export type GenerateDescriptionsOutput = z.infer<typeof GenerateDescriptionsOutputSchema>;

export const IngestContentInputSchema = z.object({
    draftContent: z.string().describe('A block of text, potentially from a Word document or other source, containing details about a property.'),
});
export type IngestContentInput = z.infer<typeof IngestContentInputSchema>;
  
export const IngestContentOutputSchema = z.lazy(() => propertySchema);
export type IngestContentOutput = z.infer<typeof IngestContentOutputSchema>;


export const propertySchema = z.object({
    id: idSchema,
    name: z.string().min(1, 'Property name is required.'),
    slug: idSchema,
    city: z.string().min(1, "City is required."),
    area: z.string().min(1, "Area or neighborhood is required."),
    type: z.enum(['apartment', 'villa', 'commercial']),
    priceRange: z.object({ 
        min: z.number().min(0, "Minimum price must be a positive number."), 
        max: z.number().min(0, "Maximum price must be a positive number.") 
    }).refine(data => data.max >= data.min, {
        message: "Maximum price cannot be less than minimum price.",
        path: ["max"],
    }),
    currency: z.string().min(1, "Currency code is required (e.g., INR)."),
    description: z.string().min(1, "Full description is required."),
    shortDescription: z.string().min(1, "Short description is required."),
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
    alt: z.string().min(1, "Alt text is required for the featured image."),
    masterPlan: urlSchema,
    floorPlans: z.array(floorPlanSchema),
    address: z.string().min(1, "Full address is required."),
    coordinates: z.object({ lat: z.number(), lng: z.number() }).optional(),
    developer: z.string().min(1, "Developer name is required."),
    possession: z.string().min(1, "Possession year is required."),
    status: z.enum(['upcoming', 'ongoing', 'ready']),
    createdAt: z.string().datetime("Invalid date format.").min(1),
    updatedAt: z.string().datetime("Invalid date format.").min(1),
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
}).deepPartial();
