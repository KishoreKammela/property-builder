'use client';

import { useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Accordion } from '@/components/ui/accordion';
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
  const form = useFormContext<Property>();
  
  const { toast } = useToast();

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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-8">
          <Accordion type="multiple" className="w-full space-y-4" defaultValue={['item-1']}>
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

          <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" size="lg">
            Generate and Validate Data
          </Button>
        </form>
      </Form>
  );
}
