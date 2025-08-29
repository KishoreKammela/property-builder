'use client';

import { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PropertyForm } from '@/components/property-form';
import { JsonPreview } from '@/components/json-preview';
import type { Property } from '@/lib/types';
import { ThemeToggle } from '@/components/theme-toggle';
import { propertySchema } from '@/lib/schema';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'property-form-autosave';

export default function Home() {
  const { toast } = useToast();
  
  const defaultValues: Property = {
    name: '',
    id: '',
    slug: '',
    city: '',
    area: '',
    type: undefined,
    status: undefined,
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
    createdAt: '',
    updatedAt: '',
    propertyDetailPage: {
        propertyBannerSection: {
            headingOne: '',
            headingTwo: '',
            mainBannerImageUrl: '',
            primeLocationAt: '',
            projectStatusTitle: 'Project status: ',
            projectStatusValue: undefined,
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
            locationLink: '',
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
            footerDescription: '',
            contactButtonText: ''
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
};

  const form = useForm<Property>({
    resolver: zodResolver(propertySchema),
    defaultValues,
    mode: 'onChange',
  });

  const watchedData = form.watch();

  // Load from localStorage on initial render
  useEffect(() => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedData) {
        try {
            const parsedData = JSON.parse(savedData);
            form.reset(parsedData);
            toast({
                title: "Form Restored",
                description: "Your previous session has been restored.",
            });
        } catch (error) {
            console.error("Failed to parse saved form data:", error);
        }
    } else {
        const now = new Date().toISOString();
        form.setValue('createdAt', now);
        form.setValue('updatedAt', now);
    }
  }, [form, toast]);

  // Save to localStorage on change
  useEffect(() => {
    const subscription = form.watch((value) => {
        const now = new Date().toISOString();
        const dataToSave = { ...value, updatedAt: now };
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToSave));
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);


  const handleFormSubmit = (data: Property) => {
    toast({
      title: "Success!",
      description: "Property data has been validated and the preview is updated.",
    });
    console.log('Form Submitted:', data);
  };
  
  const handleReset = () => {
    if(window.confirm("Are you sure you want to reset the form? All unsaved changes will be lost.")){
        form.reset(defaultValues);
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        const now = new Date().toISOString();
        form.setValue('createdAt', now);
        form.setValue('updatedAt', now);
        toast({
            title: "Form Reset",
            description: "The form has been cleared.",
        });
    }
  }

  return (
    <>
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      <main className="container mx-auto p-4 md:p-8">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-primary-600 dark:text-primary-400 font-headline">
            Property Content Generator
          </h1>
          <p className="mt-2 text-muted-foreground">
            Fill in the property details below to generate structured content for your listings.
          </p>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12">
          <div className="lg:pr-6">
            <FormProvider {...form}>
              <PropertyForm onFormSubmit={handleFormSubmit} onReset={handleReset} />
            </FormProvider>
          </div>
          <div className="mt-8 lg:mt-0">
            <JsonPreview data={watchedData} />
          </div>
        </div>
      </main>
    </>
  );
}
