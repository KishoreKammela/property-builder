'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Accordion } from '@/components/ui/accordion';
import { propertySchema } from '@/lib/schema';
import type { Property } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { handleAltTextGeneration, handleIdGeneration } from '@/lib/actions';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { BasicInfoSection } from './form-parts/basic-info-section';
import { DescriptionSection } from './form-parts/description-section';
import { PricingMediaSection } from './form-parts/pricing-media-section';
import { FeaturesSection } from './form-parts/features-section';
import { AmenitiesSection } from './form-parts/amenities-section';
import { SpecificationsSection } from './form-parts/specifications-section';
import { FloorPlansSection } from './form-parts/floor-plans-section';
import { LocationDeveloperSection } from './form-parts/location-developer-section';
import { PropertyDetailPageSection } from './form-parts/property-detail-page-section';
import { PropertyMasterPlanDetailPageSection } from './form-parts/property-master-plan-detail-page-section';
import { PropertyUnitPlanDetailPageSection } from './form-parts/property-unit-plan-detail-page-section';
import { PropertyAmenitiesDetailPageSection } from './form-parts/property-amenities-detail-page-section';
import { PropertySpecificationsDetailPageSection } from './form-parts/property-specifications-detail-page-section';


interface PropertyFormProps {
  onFormSubmit: (data: Property) => void;
}

export function PropertyForm({ onFormSubmit }: PropertyFormProps) {
  const [isGeneratingAltText, setIsGeneratingAltText] = useState(false);
  const form = useForm<Property>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
        name: '',
        id: '',
        slug: '',
        city: '',
        area: '',
        type: 'apartment',
        status: 'upcoming',
        description: '',
        shortDescription: '',
        priceRange: { min: 0, max: 0 },
        currency: 'INR',
        featuredImage: '',
        alt: '',
        features: [],
        amenities: [],
        specifications: {
            totalFloors: 0,
            totalUnits: 0,
            constructionType: '',
            launchDate: '',
            possessionDate: '',
            approvals: [],
            elevators: 0,
            parkingRatio: '',
        },
        floorPlans: [],
        masterPlan: '',
        address: '',
        developer: '',
        possession: '',
        coordinates: { lat: 0, lng: 0 },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        propertyDetailPage: {
            propertyBannerSection: {
                headingOne: '',
                headingTwo: '',
                mainBannerImageUrl: '',
                primeLocationAt: '',
                projectStatusTitle: 'Project status: ',
                projectStatusValue: 'New Launch',
                isReraCertified: true,
                reraLogo: '',
                reraCertifiedLabel: 'RERA Certified',
                priceRangeLabel: 'Price range',
                grabEarlyBirdAdvantages: '',
                limitedSlotsAvailable: '',
                brochureCta: 'Brochure',
                bookVisitCta: 'Book visit',
                viewAllPhotosCta: 'View all photos',
                specifications: [],
            },
            propertyLocationAndConnectivitySection: {
                mainHeading: '',
                locationText: '',
                locationImage: '',
                locationLinkText: 'View in detail',
                locationLink: 'https://maps.google.com',
                locationTabs: [],
            },
            propertyOverviewSection: {
                projectOverviewLabel: 'Project Overview',
                projectWalkthroughLabel: 'Project walkthrough',
                projectOverviewDescription: '',
                propertySpecifications: [],
                isReraCertified: true,
                reraLogo: '',
                reraCertifiedLabel: 'Project RERA certified',
                reraNumberLabel: 'RERA No: ',
                projectReraNumber: '',
                keyProjectDatesTitle: 'Key Project Dates',
                keyProjectDates: [],
                projectOverviewImageUrl: '',
                projectOverviewViewMoreCta: 'View more',
            },
            propertyAmenitiesSection: {
                variant: 'dark',
                mainHeading: '',
                subtitle: '',
                amenitiesAccordionItems: [],
                cardSlideItems: [],
            },
            propertyHighlightsSection: {
                propertyHighlightsTitle: '',
                propertyHighlightsDescription: '',
                propertyHighlights: [],
            },
            propertyMasterPlanSection: {
                masterPlanTitle: '',
                masterPlanImageUrl: '',
                masterPlanDescription: '',
                masterPlanEnquireNowCta: 'Enquire now',
                masterPlanViewInDetailCta: 'View in detail',
            },
            propertyUnitPlansSection: {
                unitPlanTitle: '',
                unitPlanDescription: '',
                unitPlanViewInDetailCta: 'View in detail',
                unitPlans: [],
            },
            propertyPricingSection: {
                pricingTitle: '',
                pricingDescription: '',
                pricingImageUrl: '',
                completeCostingDetailsLabel: 'Complete costing details',
                pricingEnquireNowCta: 'Enquire now',
                pricingData: [],
            },
            propertySpecificationsSection: {
                specificationTitle: '',
                specificationDescription: '',
                specificationViewInDetailCta: 'View in detail',
                specificationImageUrl: '',
            },
            propertyLocationSection: {
                propertyLoactionTitle: '',
                propertyLoactionDescription: '',
                propertyLoactionImageUrl: '',
                propertyLoactionInformation: [],
            },
            propertyDetailsFAQSection: {
                mainHeading: 'Frequently asked questions',
                subtitle: "Didn't find the question?",
                contactButtonText: 'Contact us',
                faqItems: [],
            },
        },
        propertyMasterPlanDetailPage: {
            propertyMasterPlanBannerSection: {
                bannerSectionHeader: '',
                bannerSectionCta: '',
                bannerSectionImageUrl: '',
                bannerSectionDescription: '',
                bannerSectionFeatures: [],
            },
            propertyMasterPlanTowersSection: {
                towerSectionHeading: '',
                towerSectionDescription: '',
                towerSectionAmenitiesHeading: '',
                towerSectionUnitSizesHeading: '',
                towerSectionUnitSizesSubHeading: '',
                towerSectionTableDescription: '',
                towerSectionSliderImages: [],
                towerSectionTableDetails: [],
                towerSectionAmenitiesPoints: [],
                towerSectionUnitsSizes: [],
            },
            propertyMasterPlanFeaturesSection: {
                features: [],
            },
            propertyMasterPlanFAQSection: {
                mainHeading: 'Frequently asked questions',
                subtitle: "Didn't find the question?",
                contactButtonText: 'Contact us',
                faqItems: [],
            },
        },
        propertyUnitPlanDetailPage: {
            propertyFloorPlanSection: {
                floorPlanSectionHeading: '',
                floorPlanSectionDescription: '',
                floorPlanSectionPlans: [],
            },
            propertyDesignAndQualitySection: {
                designAndQualitySectionHeading: '',
                designAndQualitySectionFeatures: [],
            },
            propertyUnitSizesSection: {
                unitSizesSectionHeading: '',
                unitSizesWithinTower: [],
            },
            propertyUnitHighlightsSection: {
                highlightsSectionHeading: '',
                highlightsSectionHighlights: [],
            },
            propertyUnitPlanFAQSection: {
                mainHeading: 'Frequently asked questions',
                subtitle: "Didn't find the question?",
                contactButtonText: 'Contact us',
                faqItems: [],
            },
        },
        propertyAmenitiesDetailPage: {
            propertyAmenitiesAccordionSection: {
                variant: 'light',
                mainHeading: '',
                subtitle: '',
                footerDescription: '',
                contactButtonText: '',
                amenitiesAccordionItems: [],
                cardSlideItems: [],
            },
            propertyAmenitiesGalleryShowCaseArea: [],
            propertyAmenitiesFAQSection: {
                mainHeading: 'Frequently asked questions',
                subtitle: "Didn't find the question?",
                contactButtonText: 'Contact us',
                faqItems: [],
            },
        },
        propertySpecificationsDetailPage: {
            propertySpecificationsBannerSection: {
                specificationsBannerSectionTitle: '',
                specificationsBannerSectionDescription: '',
                specificationsBannerSectionImageUrl: '',
                specificationsBannerSectionMobileImageUrl: '',
            },
            propertySpecificationsGalleryShowCaseArea: [],
            propertySpecificationFAQSection: {
                mainHeading: 'Frequently asked questions',
                subtitle: "Didn't find the question?",
                contactButtonText: 'Contact us',
                faqItems: [],
            },
        },
    },
    mode: 'onChange',
  });
  
  const { toast } = useToast();

  const onSubmit = (data: Property) => {
    onFormSubmit(data);
    toast({
      title: "Success!",
      description: "Property data has been validated and generated.",
    });
  };

  const generateId = async (sectionName: string, fieldName: any) => {
    const propertyName = form.getValues('name');
    if (!propertyName) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please enter a property name first.',
      });
      return;
    }
    const result = await handleIdGeneration({ propertyName, sectionName });
    if (result.success && result.id) {
      form.setValue(fieldName, result.id, { shouldValidate: true });
      toast({
        title: 'ID Generated',
        description: `Successfully generated ID for ${sectionName}.`,
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error,
      });
    }
  };

  const generateAltText = async () => {
    const imageUrl = form.getValues('featuredImage');
    if (!imageUrl) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please provide an image URL first.',
      });
      return;
    }

    setIsGeneratingAltText(true);
    const result = await handleAltTextGeneration({
      imageUrl,
      propertyName: form.getValues('name') || 'Property',
      propertyType: form.getValues('type') || 'real estate',
      propertyArea: form.getValues('area') || 'location',
    });
    setIsGeneratingAltText(false);

    if (result.success && result.altText) {
      form.setValue('alt', result.altText, { shouldValidate: true });
      toast({
        title: 'Alt Text Generated',
        description: 'Successfully generated alt text for the image.',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error,
      });
    }
  };


  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
            <BasicInfoSection generateId={generateId} />
            <DescriptionSection />
            <PricingMediaSection 
              isGeneratingAltText={isGeneratingAltText} 
              generateAltText={generateAltText} 
            />
            <FeaturesSection />
            <AmenitiesSection />
            <SpecificationsSection />
            <FloorPlansSection />
            <LocationDeveloperSection />
            <PropertyDetailPageSection generateId={generateId} />
            <PropertyMasterPlanDetailPageSection generateId={generateId} />
            <PropertyUnitPlanDetailPageSection generateId={generateId} />
            <PropertyAmenitiesDetailPageSection generateId={generateId} />
            <PropertySpecificationsDetailPageSection generateId={generateId} />
          </Accordion>

          <Button type="submit" className="w-full bg-accent hover:bg-accent/90" size="lg">
            Generate and Validate JSON
          </Button>
        </form>
      </Form>
    </FormProvider>
  );
}
