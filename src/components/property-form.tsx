'use client';

import { useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Accordion } from '@/components/ui/accordion';
import type { Property } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { handleAltTextGeneration, handleIdGeneration, handleDescriptionGeneration } from '@/lib/actions';
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
  children: React.ReactNode;
}

export function PropertyForm({ onFormSubmit, children }: PropertyFormProps) {
  const [isGeneratingAltText, setIsGeneratingAltText] = useState(false);
  const [isGeneratingDescriptions, setIsGeneratingDescriptions] = useState(false);
  const form = useFormContext<Property>();
  
  const { toast } = useToast();

  const generateId = async (sectionName: string, fieldName: any) => {
    const propertyName = form.getValues('name');
    if (!propertyName) {
      toast({
        variant: 'destructive',
        title: 'Property Name Required',
        description: 'Please enter a property name first to generate an ID.',
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
        title: 'Error Generating ID',
        description: result.error,
      });
    }
  };

  const generateAltText = async () => {
    const imageUrl = form.getValues('featuredImage');
    if (!imageUrl) {
      toast({
        variant: 'destructive',
        title: 'Image URL Missing',
        description: 'Please provide a featured image URL first.',
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
        description: 'Successfully generated alt text for the featured image.',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Error Generating Alt Text',
        description: result.error,
      });
    }
  };

  const generateDescriptions = async () => {
    const { name, type, area, features, amenities } = form.getValues();

    if (!name || !type || !area) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please fill in the Property Name, Type, and Area before generating descriptions.',
      });
      return;
    }

    setIsGeneratingDescriptions(true);
    const result = await handleDescriptionGeneration({
      propertyName: name,
      propertyType: type,
      propertyArea: area,
      features,
      amenities,
    });
    setIsGeneratingDescriptions(false);

    if (result.success && result.description && result.shortDescription) {
      form.setValue('description', result.description, { shouldValidate: true });
      form.setValue('shortDescription', result.shortDescription, { shouldValidate: true });
      toast({
        title: 'Descriptions Generated',
        description: 'The full and short descriptions have been successfully generated.',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Error Generating Descriptions',
        description: result.error,
      });
    }
  }


  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-8">
          <Accordion type="multiple" className="w-full space-y-4" defaultValue={['item-1']}>
            <BasicInfoSection generateId={generateId} />
            <DescriptionSection isGenerating={isGeneratingDescriptions} onGenerate={generateDescriptions} />
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

          <div className="flex flex-col sm:flex-row-reverse gap-4">
            <Button type="submit" className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground" size="lg">
              Generate and Validate Data
            </Button>
            {children}
          </div>
        </form>
      </Form>
  );
}
