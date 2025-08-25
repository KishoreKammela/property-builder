import type React from 'react';

export interface CardSliderItem {
  id: string;
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface AmenitiesItem {
  id:string;
  title: string;
  icon?: React.ReactNode;
}

export interface AmenitiesAccordionItem {
  id: string;
  amenitiesTitle: string;
  amenitiesDescription?: string;
  amenitiesItems: AmenitiesItem[];
}

export interface AmenitiesAccordionSectionProps {
  variant: 'dark' | 'light';
  mainHeading?: string;
  subtitle?: string;
  footerDescription?: string;
  contactButtonText?: string;
  amenitiesAccordionItems: AmenitiesAccordionItem[];
  cardSlideItems: CardSliderItem[];
  onContactClick?: () => void;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FAQSectionProps {
  mainHeading?: string;
  subtitle?: string;
  contactButtonText?: string;
  faqItems: FAQItem[];
  onContactClick?: () => void;
}


export interface Connectivity {
  name: string;
  time: string;
  distance: string;
  icon?: string;
}

export interface LocationTab {
  id: string;
  tabName: string;
  icon?: string;
  connectivity: Connectivity[];
}

export interface LocationAndConnectivitySectionProps {
  mainHeading: string;
  locationText: string;
  locationLink: string;
  locationLinkText: string;
  locationImage: string;
  locationTabs: LocationTab[];
}


export interface FloorPlan {
  id: string;
  name: string;
  type: string;
  area: number;
  bedrooms: number;
  bathrooms: number;
  price: number;
  image: string;
  description: string;
}

export interface PropertySpecification {
  id: string;
  value: string;
  displayText: string;
  displayIcon?: string;
}

export interface KeyProjectDate {
  id: string;
  title: string;
  date: string;
}

export interface UnitPlan {
  id: string;
  unitPlanTitle: string;
  unitPlanDescription: string;
  unitPlanImageUrl: string;
  unitPlanEnquireUrl: string;
}

export interface ProductPricingTableItem {
  pricingId: string;
  pricingConfigType: string;
  pricingCarpetApproxArea: string;
  price: string;
  pricingEnquireCtaText: string;
}

export interface PropertyLocationInformation {
  estateInfoId: string;
  estateInfoTitle: string;
  estateInfoDescription: string;
}

export interface HighlightItem {
  highlightId: string;
  highlightImageUrl: string;
  highlightDescription: string;
}

export interface PropertyBannerSection {
  headingOne: string;
  headingTwo: string;
  mainBannerImageUrl: string;
  primeLocationAt: string;
  projectStatusTitle: string;
  projectStatusValue: 'New Launch' | 'Pre-Launch' | 'Upcoming Launches';
  isReraCertified: boolean;
  reraLogo: string;
  reraCertifiedLabel: string;
  priceRangeLabel: string;
  grabEarlyBirdAdvantages: string;
  limitedSlotsAvailable: string;
  brochureCta: string;
  bookVisitCta: string;
  viewAllPhotosCta: string;
  specifications: PropertySpecification[];
}

export interface PropertyLocationAndConnectivitySection extends LocationAndConnectivitySectionProps {}

export interface PropertyOverviewSection {
  projectOverviewLabel: string;
  projectWalkthroughLabel: string;
  projectOverviewDescription: string;
  propertySpecifications: PropertySpecification[];
  isReraCertified: boolean;
  reraLogo: string;
  reraCertifiedLabel: string;
  reraNumberLabel: string;
  projectReraNumber: string;
  keyProjectDatesTitle: string;
  keyProjectDates: KeyProjectDate[];
  projectOverviewImageUrl: string;
  projectOverviewViewMoreCta: string;
}

export interface PropertyAmenitiesSection extends AmenitiesAccordionSectionProps {}

export interface PropertyHighlightsSection {
  propertyHighlightsTitle: string;
  propertyHighlightsDescription: string;
  propertyHighlights: HighlightItem[];
}

export interface PropertyMasterPlanSection {
  masterPlanTitle: string;
  masterPlanImageUrl: string;
  masterPlanDescription: string;
  masterPlanEnquireNowCta: string;
  masterPlanViewInDetailCta: string;
}

export interface PropertyUnitPlanSection {
  unitPlanTitle: string;
  unitPlanDescription: string;
  unitPlanViewInDetailCta: string;
  unitPlans: UnitPlan[];
}

export interface PropertyPricingSection {
  pricingTitle: string;
  pricingDescription: string;
  pricingImageUrl: string;
  completeCostingDetailsLabel: string;
  pricingEnquireNowCta: string;
  pricingData: ProductPricingTableItem[];
}

export interface PropertySpecificationsSection {
  specificationTitle: string;
  specificationDescription: string;
  specificationViewInDetailCta: string;
  specificationImageUrl: string;
}

export interface PropertyLocationSection {
  propertyLoactionTitle: string;
  propertyLoactionDescription: string;
  propertyLoactionImageUrl: string;
  propertyLoactionInformation: PropertyLocationInformation[];
}

export interface PropertyDetailsFAQSection extends FAQSectionProps {}

export interface MasterPlanBannerFeatures {
  title: string;
  description: string;
}

export interface PropertyMasterPlanBannerSection {
  bannerSectionHeader: string;
  bannerSectionCta: string;
  bannerSectionImageUrl: string;
  bannerSectionDescription: string;
  bannerSectionFeatures: MasterPlanBannerFeatures[];
}

export interface TowerDetail {
  towerRange: string;
  floors: string;
  specialFeature: string;
}

export interface AmenityPoint {
  description: string;
}

export interface UnitSize {
  type: string;
  sizeRange: string;
}

export interface PropertyMasterPlanTowersSection {
  towerSectionHeading: string;
  towerSectionDescription: string;
  towerSectionAmenitiesHeading: string;
  towerSectionUnitSizesHeading: string;
  towerSectionUnitSizesSubHeading: string;
  towerSectionTableDescription: string;
  towerSectionSliderImages: CardSliderItem[];
  towerSectionTableDetails: TowerDetail[];
  towerSectionAmenitiesPoints: AmenityPoint[];
  towerSectionUnitsSizes: UnitSize[];
}

export interface MasterPlanProps {
  featuresSectionTittle: string;
  featuresSectionFeaturesHeading: string;
  featuresSectionAccessibilityHeading: string;
  featuresSectionDescription: string;
  featuresSectionBannerImageUrl: string;
  featuresSectionFeatureRichSpaces: string[];
  featuresSectionAccessibilityLayoutStrategies: string[];
}
export interface PropertyMasterPlanFeaturesSection {
  features: MasterPlanProps[];
}

export interface FloorOrUnitPlan {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  enquiryNowUrl: string;
  area?: number;
  bedrooms?: number;
  bathrooms?: number;
}
export interface PropertyFloorPlanSection {
  floorPlanSectionHeading: string;
  floorPlanSectionDescription: string;
  floorPlanSectionPlans: FloorOrUnitPlan[];
}

export interface FloorFeature {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface PropertyDesignAndQualitySection {
  designAndQualitySectionHeading: string;
  designAndQualitySectionFeatures: FloorFeature[];
}

export interface FloorTableData {
  configurationType: string;
  carpetAreaApprox: string;
  price: string;
  priceEnquireLabel: string;
}

export interface PropertyUnitSizesSection {
  unitSizesSectionHeading: string;
  unitSizesWithinTower: FloorTableData[];
}
export interface Highlight {
  name: string;
  description: string;
  image: CardSliderItem[];
}
export interface PropertyUnitHighlightsSection {
  highlightsSectionHeading: string;
  highlightsSectionHighlights: Highlight[];
}

export interface PropertyAmenitiesGallerySection {
  id: string;
  amenitiesGalleryTitle: string;
  amenitiesGalleryDescription: string;
  amenitiesGalleryAttractions: string[];
  amenitiesGallerySlideImages: CardSliderItem[];
  amenitiesGallerySecondHeading: string;
  communityAmenities: string[];
  icon?: React.ReactNode;
}

export interface PropertySpecificationsBannerSection {
  specificationsBannerSectionTitle: string;
  specificationsBannerSectionDescription: string;
  specificationsBannerSectionImageUrl: string;
  specificationsBannerSectionMobileImageUrl: string;
}
export interface PropertySpecificationsGalleryShowCaseArea {
  specificationsGalleryTitle: string;
  specificationsGalleryDescription: string;
  specificationsGalleryFeatures: string[];
  specificationsGalleryImageUrl: string;
}

export interface Property {
  id: string;
  name: string;
  slug: string;
  city: string;
  area: string;
  type: 'apartment' | 'villa' | 'commercial';
  priceRange: { min: number; max: number };
  currency: string;
  description: string;
  shortDescription: string;
  features: string[];
  amenities: string[];
  specifications: {
    totalFloors?: number;
    totalUnits?: number;
    launchDate?: string;
    possessionDate?: string;
    approvals?: string[];
    constructionType?: string;
    elevators?: number;
    parkingRatio?: string;
  };
  featuredImage: string;
  alt: string;
  masterPlan: string;
  floorPlans: FloorPlan[];
  address: string;
  coordinates?: { lat: number; lng: number };
  developer: string;
  possession: string;
  status: 'upcoming' | 'ongoing' | 'ready';
  createdAt: string;
  updatedAt: string;

  propertyDetailPage: {
    propertyBannerSection: PropertyBannerSection;
    propertyLocationAndConnectivitySection: PropertyLocationAndConnectivitySection;
    propertyOverviewSection: PropertyOverviewSection;
    propertyAmenitiesSection: PropertyAmenitiesAccordionSection;
    propertyHighlightsSection: PropertyHighlightsSection;
    propertyMasterPlanSection: PropertyMasterPlanSection;
    propertyUnitPlansSection: PropertyUnitPlanSection;
    propertyPricingSection: PropertyPricingSection;
    propertySpecificationsSection: PropertySpecificationsSection;
    propertyLocationSection: PropertyLocationSection;
    propertyDetailsFAQSection: PropertyDetailsFAQSection;
  };
  propertyMasterPlanDetailPage: {
    propertyMasterPlanBannerSection: PropertyMasterPlanBannerSection;
    propertyMasterPlanTowersSection: PropertyMasterPlanTowersSection;
    propertyMasterPlanFeaturesSection: PropertyMasterPlanFeaturesSection;
    propertyMasterPlanFAQSection: FAQSectionProps;
  };
  propertyUnitPlanDetailPage: {
    propertyFloorPlanSection: PropertyFloorPlanSection;
    propertyDesignAndQualitySection: PropertyDesignAndQualitySection;
    propertyUnitSizesSection: PropertyUnitSizesSection;
    propertyUnitHighlightsSection: PropertyUnitHighlightsSection;
    propertyUnitPlanFAQSection: FAQSectionProps;
  };
  propertyAmenitiesDetailPage: {
    propertyAmenitiesAccordionSection: AmenitiesAccordionSectionProps;
    propertyAmenitiesGalleryShowCaseArea: PropertyAmenitiesGallerySection[];
    propertyAmenitiesFAQSection: FAQSectionProps;
  };
  propertySpecificationsDetailPage: {
    propertySpecificationsBannerSection: PropertySpecificationsBannerSection;
    propertySpecificationsGalleryShowCaseArea: PropertySpecificationsGalleryShowCaseArea[];
    propertySpecificationFAQSection: FAQSectionProps;
  };
}
