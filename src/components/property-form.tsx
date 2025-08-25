'use client';

import { useForm, FormProvider, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Accordion } from '@/components/ui/accordion';
import { propertySchema } from '@/lib/schema';
import type { Property } from '@/lib/types';
import { FormSection } from './form-section';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from './ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useToast } from '@/hooks/use-toast';
import { handleAltTextGeneration, handleIdGeneration } from '@/lib/actions';
import { Loader2, Sparkles, Trash } from 'lucide-react';
import { useState } from 'react';
import { Checkbox } from './ui/checkbox';

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
        }
    },
    mode: 'onChange',
  });

  const { fields: featureFields, append: appendFeature, remove: removeFeature } = useFieldArray({ control: form.control, name: "features" });
  const { fields: amenityFields, append: appendAmenity, remove: removeAmenity } = useFieldArray({ control: form.control, name: "amenities" });
  const { fields: floorPlanFields, append: appendFloorPlan, remove: removeFloorPlan } = useFieldArray({ control: form.control, name: "floorPlans" });
  const { fields: bannerSpecFields, append: appendBannerSpec, remove: removeBannerSpec } = useFieldArray({ control: form.control, name: "propertyDetailPage.propertyBannerSection.specifications" });
  const { fields: locationTabFields, append: appendLocationTab, remove: removeLocationTab } = useFieldArray({ control: form.control, name: "propertyDetailPage.propertyLocationAndConnectivitySection.locationTabs" });
  const { fields: overviewSpecFields, append: appendOverviewSpec, remove: removeOverviewSpec } = useFieldArray({ control: form.control, name: "propertyDetailPage.propertyOverviewSection.propertySpecifications" });
  const { fields: keyDateFields, append: appendKeyDate, remove: removeKeyDate } = useFieldArray({ control: form.control, name: "propertyDetailPage.propertyOverviewSection.keyProjectDates" });
  const { fields: highlightFields, append: appendHighlight, remove: removeHighlight } = useFieldArray({ control: form.control, name: "propertyDetailPage.propertyHighlightsSection.propertyHighlights" });
  const { fields: unitPlanFields, append: appendUnitPlan, remove: removeUnitPlan } = useFieldArray({ control: form.control, name: "propertyDetailPage.propertyUnitPlansSection.unitPlans" });
  const { fields: pricingDataFields, append: appendPricingData, remove: removePricingData } = useFieldArray({ control: form.control, name: "propertyDetailPage.propertyPricingSection.pricingData" });
  const { fields: locationInfoFields, append: appendLocationInfo, remove: removeLocationInfo } = useFieldArray({ control: form.control, name: "propertyDetailPage.propertyLocationSection.propertyLoactionInformation" });
  const { fields: faqFields, append: appendFaq, remove: removeFaq } = useFieldArray({ control: form.control, name: "propertyDetailPage.propertyDetailsFAQSection.faqItems" });


  const onSubmit = (data: Property) => {
    onFormSubmit(data);
    toast({
      title: "Success!",
      description: "Property data has been validated and generated.",
    });
  };

  const generateId = async (sectionName: string, fieldName: any, index?: number) => {
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
        if (index !== undefined) {
             form.setValue(fieldName, result.id, { shouldValidate: true });
        } else {
            form.setValue(fieldName, result.id, { shouldValidate: true });
        }
      
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
            <FormSection value="item-1" title="Basic Property Information" description="Provide the main details of the property.">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Property Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Sattva City Prestige Residence" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property ID</FormLabel>
                      <div className="flex gap-2">
                        <FormControl>
                          <Input placeholder="auto-generated-id" {...field} />
                        </FormControl>
                         <Button type="button" size="icon" variant="outline" onClick={() => generateId('property', 'id')}><Sparkles /></Button>
                      </div>
                      <FormDescription>Unique identifier for the property.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                       <div className="flex gap-2">
                        <FormControl>
                          <Input placeholder="auto-generated-slug" {...field} />
                        </FormControl>
                         <Button type="button" size="icon" variant="outline" onClick={() => generateId('slug', 'slug')}><Sparkles /></Button>
                      </div>
                      <FormDescription>URL-friendly version of the name.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl><Input placeholder="e.g., Bangalore" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="area"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Area</FormLabel>
                      <FormControl><Input placeholder="e.g., North" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select property type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="apartment">Apartment</SelectItem>
                          <SelectItem value="villa">Villa</SelectItem>
                          <SelectItem value="commercial">Commercial</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select property status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="upcoming">Upcoming</SelectItem>
                          <SelectItem value="ongoing">Ongoing</SelectItem>
                          <SelectItem value="ready">Ready</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </FormSection>
             <FormSection value="item-2" title="Description" description="Add descriptive content for the property.">
                 <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Full Description</FormLabel>
                        <FormControl>
                            <Textarea placeholder="Provide a detailed description of the property." {...field} rows={5}/>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                <FormField
                    control={form.control}
                    name="shortDescription"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Short Description</FormLabel>
                        <FormControl>
                            <Textarea placeholder="Provide a brief summary of the property." {...field} rows={2}/>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
            </FormSection>
            <FormSection value="item-3" title="Pricing and Media" description="Set the price and manage media assets.">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                    control={form.control}
                    name="priceRange.min"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Min Price</FormLabel>
                        <FormControl><Input type="number" placeholder="e.g., 5000000" {...field} onChange={e => field.onChange(Number(e.target.value))}/></FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="priceRange.max"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Max Price</FormLabel>
                        <FormControl><Input type="number" placeholder="e.g., 9000000" {...field} onChange={e => field.onChange(Number(e.target.value))}/></FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="currency"
                    render={({ field }) => (
                        <FormItem className="md:col-span-2">
                        <FormLabel>Currency</FormLabel>
                        <FormControl><Input placeholder="e.g., INR" {...field} /></FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
                 <div className="space-y-4 rounded-lg border p-4">
                    <FormField
                        control={form.control}
                        name="featuredImage"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Featured Image URL</FormLabel>
                            <FormControl>
                                <Input type="url" placeholder="https://example.com/image.png" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                        <FormField
                        control={form.control}
                        name="alt"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Alt Text</FormLabel>
                            <FormControl>
                                <Input placeholder="Descriptive alt text for the image" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <Button type="button" onClick={generateAltText} disabled={isGeneratingAltText || !form.watch('featuredImage')} className="w-full md:w-auto">
                            {isGeneratingAltText ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                            Generate Alt Text
                        </Button>
                    </div>
                </div>
                 <FormField
                    control={form.control}
                    name="masterPlan"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Master Plan Image URL</FormLabel>
                        <FormControl>
                            <Input type="url" placeholder="https://example.com/master-plan.png" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </FormSection>
            <FormSection value="item-4" title="Features" description="List the key features of the property.">
                {featureFields.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-2">
                    <FormField
                        control={form.control}
                        name={`features.${index}`}
                        render={({ field }) => (
                        <FormItem className="flex-grow">
                            <FormControl>
                            <Input placeholder={`Feature ${index + 1}`} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <Button type="button" variant="destructive" size="icon" onClick={() => removeFeature(index)}><Trash /></Button>
                    </div>
                ))}
                <Button type="button" variant="outline" onClick={() => appendFeature('')}>Add Feature</Button>
            </FormSection>

            <FormSection value="item-5" title="Amenities" description="List the amenities available.">
                {amenityFields.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-2">
                    <FormField
                        control={form.control}
                        name={`amenities.${index}`}
                        render={({ field }) => (
                        <FormItem className="flex-grow">
                            <FormControl>
                            <Input placeholder={`Amenity ${index + 1}`} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <Button type="button" variant="destructive" size="icon" onClick={() => removeAmenity(index)}><Trash /></Button>
                    </div>
                ))}
                <Button type="button" variant="outline" onClick={() => appendAmenity('')}>Add Amenity</Button>
            </FormSection>

            <FormSection value="item-6" title="Specifications" description="Provide technical specifications.">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                    control={form.control}
                    name="specifications.totalFloors"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Total Floors</FormLabel>
                        <FormControl><Input type="number" placeholder="e.g., 15" {...field} onChange={e => field.onChange(Number(e.target.value))}/></FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="specifications.totalUnits"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Total Units</FormLabel>
                        <FormControl><Input type="number" placeholder="e.g., 120" {...field} onChange={e => field.onChange(Number(e.target.value))}/></FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="specifications.constructionType"
                    render={({ field }) => (
                        <FormItem className="md:col-span-2">
                        <FormLabel>Construction Type</FormLabel>
                        <FormControl><Input placeholder="e.g., RCC Framed Structure" {...field} /></FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField control={form.control} name="specifications.launchDate" render={({ field }) => (<FormItem><FormLabel>Launch Date</FormLabel><FormControl><Input placeholder="e.g., 2024" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="specifications.possessionDate" render={({ field }) => (<FormItem><FormLabel>Possession Date</FormLabel><FormControl><Input placeholder="e.g., 2026" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="specifications.elevators" render={({ field }) => (<FormItem><FormLabel>Elevators</FormLabel><FormControl><Input type="number" placeholder="e.g., 2" {...field} onChange={e => field.onChange(Number(e.target.value))}/></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="specifications.parkingRatio" render={({ field }) => (<FormItem><FormLabel>Parking Ratio</FormLabel><FormControl><Input placeholder="e.g., 1:1" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField
                        control={form.control}
                        name="specifications.approvals"
                        render={({ field }) => (
                            <FormItem className="md:col-span-2">
                            <FormLabel>Approvals (comma-separated)</FormLabel>
                            <FormControl>
                                <Input 
                                placeholder="e.g., RERA,BDA,BESCOM" 
                                {...field} 
                                value={Array.isArray(field.value) ? field.value.join(',') : ''}
                                onChange={e => field.onChange(e.target.value.split(','))}
                                />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </FormSection>
            
            <FormSection value="item-7" title="Floor Plans" description="Add details for each floor plan available.">
                {floorPlanFields.map((field, index) => (
                    <div key={field.id} className="p-4 border rounded-md space-y-4">
                        <div className="flex justify-between items-center">
                            <h4 className="font-semibold">Floor Plan {index + 1}</h4>
                            <Button type="button" variant="destructive" size="icon" onClick={() => removeFloorPlan(index)}><Trash /></Button>
                        </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField control={form.control} name={`floorPlans.${index}.id`} render={({ field }) => ( <FormItem><FormLabel>ID</FormLabel><FormControl><Input placeholder="floorplan-1" {...field} /></FormControl><FormMessage /></FormItem> )} />
                            <FormField control={form.control} name={`floorPlans.${index}.name`} render={({ field }) => ( <FormItem><FormLabel>Name</FormLabel><FormControl><Input placeholder="2BHK Premium" {...field} /></FormControl><FormMessage /></FormItem> )} />
                            <FormField control={form.control} name={`floorPlans.${index}.type`} render={({ field }) => ( <FormItem><FormLabel>Type</FormLabel><FormControl><Input placeholder="apartment" {...field} /></FormControl><FormMessage /></FormItem> )} />
                            <FormField control={form.control} name={`floorPlans.${index}.area`} render={({ field }) => ( <FormItem><FormLabel>Area (sqft)</FormLabel><FormControl><Input type="number" placeholder="1200" {...field} onChange={e => field.onChange(Number(e.target.value))}/></FormControl><FormMessage /></FormItem> )} />
                            <FormField control={form.control} name={`floorPlans.${index}.bedrooms`} render={({ field }) => ( <FormItem><FormLabel>Bedrooms</FormLabel><FormControl><Input type="number" placeholder="2" {...field} onChange={e => field.onChange(Number(e.target.value))}/></FormControl><FormMessage /></FormItem> )} />
                            <FormField control={form.control} name={`floorPlans.${index}.bathrooms`} render={({ field }) => ( <FormItem><FormLabel>Bathrooms</FormLabel><FormControl><Input type="number" placeholder="2" {...field} onChange={e => field.onChange(Number(e.target.value))}/></FormControl><FormMessage /></FormItem> )} />
                            <FormField control={form.control} name={`floorPlans.${index}.price`} render={({ field }) => ( <FormItem><FormLabel>Price</FormLabel><FormControl><Input type="number" placeholder="75000000" {...field} onChange={e => field.onChange(Number(e.target.value))}/></FormControl><FormMessage /></FormItem> )} />
                            <FormField control={form.control} name={`floorPlans.${index}.image`} render={({ field }) => ( <FormItem className="md:col-span-2"><FormLabel>Image URL</FormLabel><FormControl><Input type="url" placeholder="https://example.com/floorplan.png" {...field} /></FormControl><FormMessage /></FormItem> )} />
                            <FormField control={form.control} name={`floorPlans.${index}.description`} render={({ field }) => ( <FormItem className="md:col-span-2"><FormLabel>Description</FormLabel><FormControl><Textarea placeholder="Floor plan description" {...field} /></FormControl><FormMessage /></FormItem> )} />
                        </div>
                    </div>
                ))}
                <Button type="button" variant="outline" onClick={() => appendFloorPlan({ id: `floorplan-${floorPlanFields.length + 1}`, name: '', type: 'apartment', area: 0, bedrooms: 0, bathrooms: 0, price: 0, image: '', description: ''})}>Add Floor Plan</Button>
            </FormSection>

            <FormSection value="item-8" title="Location and Developer" description="Provide location and developer details.">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="address" render={({ field }) => ( <FormItem className="md:col-span-2"><FormLabel>Address</FormLabel><FormControl><Textarea placeholder="Full property address" {...field} /></FormControl><FormMessage /></FormItem> )} />
                    <FormField control={form.control} name="coordinates.lat" render={({ field }) => ( <FormItem><FormLabel>Latitude</FormLabel><FormControl><Input type="number" placeholder="12.9715987" {...field} onChange={e => field.onChange(Number(e.target.value))}/></FormControl><FormMessage /></FormItem> )} />
                    <FormField control={form.control} name="coordinates.lng" render={({ field }) => ( <FormItem><FormLabel>Longitude</FormLabel><FormControl><Input type="number" placeholder="77.594566" {...field} onChange={e => field.onChange(Number(e.target.value))}/></FormControl><FormMessage /></FormItem> )} />
                    <FormField control={form.control} name="developer" render={({ field }) => ( <FormItem><FormLabel>Developer</FormLabel><FormControl><Input placeholder="e.g., Sattva Group" {...field} /></FormControl><FormMessage /></FormItem> )} />
                    <FormField control={form.control} name="possession" render={({ field }) => ( <FormItem><FormLabel>Possession Year</FormLabel><FormControl><Input placeholder="e.g., 2026" {...field} /></FormControl><FormMessage /></FormItem> )} />
                </div>
            </FormSection>

            <FormSection value="item-9" title="Property Detail Page" description="Content for the main property detail page.">
                
                <Accordion type="single" collapsible className="w-full">
                    <FormSection value="sub-item-1" title="Banner Section">
                         <FormField control={form.control} name="propertyDetailPage.propertyBannerSection.headingOne" render={({ field }) => (<FormItem><FormLabel>Heading One</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                         <FormField control={form.control} name="propertyDetailPage.propertyBannerSection.headingTwo" render={({ field }) => (<FormItem><FormLabel>Heading Two</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                         <FormField control={form.control} name="propertyDetailPage.propertyBannerSection.mainBannerImageUrl" render={({ field }) => (<FormItem><FormLabel>Main Banner Image URL</FormLabel><FormControl><Input type="url" {...field} /></FormControl><FormMessage /></FormItem>)} />
                         <FormField control={form.control} name="propertyDetailPage.propertyBannerSection.primeLocationAt" render={({ field }) => (<FormItem><FormLabel>Prime Location At</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                         <FormField control={form.control} name="propertyDetailPage.propertyBannerSection.projectStatusTitle" render={({ field }) => (<FormItem><FormLabel>Project Status Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                         <FormField
                            control={form.control}
                            name="propertyDetailPage.propertyBannerSection.projectStatusValue"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Project Status Value</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                    <SelectItem value="New Launch">New Launch</SelectItem>
                                    <SelectItem value="Pre-Launch">Pre-Launch</SelectItem>
                                    <SelectItem value="Upcoming Launches">Upcoming Launches</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                         <FormField control={form.control} name="propertyDetailPage.propertyBannerSection.isReraCertified" render={({ field }) => (<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl><div className="space-y-1 leading-none"><FormLabel>RERA Certified</FormLabel></div></FormItem>)} />
                         <FormField control={form.control} name="propertyDetailPage.propertyBannerSection.reraLogo" render={({ field }) => (<FormItem><FormLabel>RERA Logo URL</FormLabel><FormControl><Input type="url" {...field} /></FormControl><FormMessage /></FormItem>)} />
                         <FormField control={form.control} name="propertyDetailPage.propertyBannerSection.reraCertifiedLabel" render={({ field }) => (<FormItem><FormLabel>RERA Certified Label</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                         <FormField control={form.control} name="propertyDetailPage.propertyBannerSection.priceRangeLabel" render={({ field }) => (<FormItem><FormLabel>Price Range Label</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                         <FormField control={form.control} name="propertyDetailPage.propertyBannerSection.grabEarlyBirdAdvantages" render={({ field }) => (<FormItem><FormLabel>Grab Early Bird Advantages</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                         <FormField control={form.control} name="propertyDetailPage.propertyBannerSection.limitedSlotsAvailable" render={({ field }) => (<FormItem><FormLabel>Limited Slots Available</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                         <FormField control={form.control} name="propertyDetailPage.propertyBannerSection.brochureCta" render={({ field }) => (<FormItem><FormLabel>Brochure CTA</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                         <FormField control={form.control} name="propertyDetailPage.propertyBannerSection.bookVisitCta" render={({ field }) => (<FormItem><FormLabel>Book Visit CTA</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                         <FormField control={form.control} name="propertyDetailPage.propertyBannerSection.viewAllPhotosCta" render={({ field }) => (<FormItem><FormLabel>View All Photos CTA</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                        
                        <div className="space-y-4">
                            <h4 className="font-semibold">Banner Specifications</h4>
                             {bannerSpecFields.map((field, index) => (
                                <div key={field.id} className="p-4 border rounded-md space-y-4">
                                    <div className="flex justify-between items-center">
                                        <h5 className="font-semibold">Specification {index + 1}</h5>
                                        <Button type="button" variant="destructive" size="icon" onClick={() => removeBannerSpec(index)}><Trash /></Button>
                                    </div>
                                    <FormField control={form.control} name={`propertyDetailPage.propertyBannerSection.specifications.${index}.id`} render={({ field }) => (<FormItem><FormLabel>ID</FormLabel><div className="flex gap-2"><FormControl><Input {...field} /></FormControl><Button type="button" size="icon" variant="outline" onClick={() => generateId(`banner-spec-${index + 1}`, `propertyDetailPage.propertyBannerSection.specifications.${index}.id`)}><Sparkles /></Button></div><FormMessage /></FormItem>)} />
                                    <FormField control={form.control} name={`propertyDetailPage.propertyBannerSection.specifications.${index}.value`} render={({ field }) => (<FormItem><FormLabel>Value</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                    <FormField control={form.control} name={`propertyDetailPage.propertyBannerSection.specifications.${index}.displayText`} render={({ field }) => (<FormItem><FormLabel>Display Text</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                </div>
                            ))}
                            <Button type="button" variant="outline" onClick={() => appendBannerSpec({id: '', value: '', displayText: ''})}>Add Banner Specification</Button>
                        </div>
                    </FormSection>
                     <FormSection value="sub-item-2" title="Location & Connectivity">
                        <FormField control={form.control} name="propertyDetailPage.propertyLocationAndConnectivitySection.mainHeading" render={({ field }) => (<FormItem><FormLabel>Main Heading</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="propertyDetailPage.propertyLocationAndConnectivitySection.locationText" render={({ field }) => (<FormItem><FormLabel>Location Text</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="propertyDetailPage.propertyLocationAndConnectivitySection.locationImage" render={({ field }) => (<FormItem><FormLabel>Location Image URL</FormLabel><FormControl><Input type="url" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="propertyDetailPage.propertyLocationAndConnectivitySection.locationLink" render={({ field }) => (<FormItem><FormLabel>Location Link</FormLabel><FormControl><Input type="url" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="propertyDetailPage.propertyLocationAndConnectivitySection.locationLinkText" render={({ field }) => (<FormItem><FormLabel>Location Link Text</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />

                        <div className="space-y-4">
                            <h4 className="font-semibold">Location Tabs</h4>
                            {locationTabFields.map((field, index) => (
                                <div key={field.id} className="p-4 border rounded-md space-y-4">
                                     <div className="flex justify-between items-center">
                                        <h5 className="font-semibold">Location Tab {index + 1}</h5>
                                        <Button type="button" variant="destructive" size="icon" onClick={() => removeLocationTab(index)}><Trash /></Button>
                                    </div>
                                    <FormField control={form.control} name={`propertyDetailPage.propertyLocationAndConnectivitySection.locationTabs.${index}.id`} render={({ field }) => (<FormItem><FormLabel>ID</FormLabel><div className="flex gap-2"><FormControl><Input {...field} /></FormControl><Button type="button" size="icon" variant="outline" onClick={() => generateId(`loc-tab-${index + 1}`, `propertyDetailPage.propertyLocationAndConnectivitySection.locationTabs.${index}.id`)}><Sparkles /></Button></div><FormMessage /></FormItem>)} />
                                    <FormField control={form.control} name={`propertyDetailPage.propertyLocationAndConnectivitySection.locationTabs.${index}.tabName`} render={({ field }) => (<FormItem><FormLabel>Tab Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                    {/* Nested Field Array for Connectivity */}
                                </div>
                            ))}
                            <Button type="button" variant="outline" onClick={() => appendLocationTab({id: '', tabName: '', connectivity: []})}>Add Location Tab</Button>
                        </div>
                     </FormSection>
                     <FormSection value="sub-item-3" title="Overview Section">
                        <FormField control={form.control} name="propertyDetailPage.propertyOverviewSection.projectOverviewLabel" render={({ field }) => (<FormItem><FormLabel>Project Overview Label</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="propertyDetailPage.propertyOverviewSection.projectWalkthroughLabel" render={({ field }) => (<FormItem><FormLabel>Project Walkthrough Label</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="propertyDetailPage.propertyOverviewSection.projectOverviewDescription" render={({ field }) => (<FormItem><FormLabel>Project Overview Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="propertyDetailPage.propertyOverviewSection.isReraCertified" render={({ field }) => (<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl><div className="space-y-1 leading-none"><FormLabel>RERA Certified</FormLabel></div></FormItem>)} />
                        <FormField control={form.control} name="propertyDetailPage.propertyOverviewSection.reraLogo" render={({ field }) => (<FormItem><FormLabel>RERA Logo URL</FormLabel><FormControl><Input type="url" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="propertyDetailPage.propertyOverviewSection.reraCertifiedLabel" render={({ field }) => (<FormItem><FormLabel>RERA Certified Label</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="propertyDetailPage.propertyOverviewSection.reraNumberLabel" render={({ field }) => (<FormItem><FormLabel>RERA Number Label</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="propertyDetailPage.propertyOverviewSection.projectReraNumber" render={({ field }) => (<FormItem><FormLabel>Project RERA Number</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="propertyDetailPage.propertyOverviewSection.keyProjectDatesTitle" render={({ field }) => (<FormItem><FormLabel>Key Project Dates Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="propertyDetailPage.propertyOverviewSection.projectOverviewImageUrl" render={({ field }) => (<FormItem><FormLabel>Project Overview Image URL</FormLabel><FormControl><Input type="url" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="propertyDetailPage.propertyOverviewSection.projectOverviewViewMoreCta" render={({ field }) => (<FormItem><FormLabel>View More CTA</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />

                        <div className="space-y-4">
                            <h4 className="font-semibold">Overview Specifications</h4>
                            {overviewSpecFields.map((field, index) => (
                                <div key={field.id} className="p-4 border rounded-md space-y-4">
                                    <div className="flex justify-between items-center">
                                        <h5 className="font-semibold">Specification {index + 1}</h5>
                                        <Button type="button" variant="destructive" size="icon" onClick={() => removeOverviewSpec(index)}><Trash /></Button>
                                    </div>
                                    <FormField control={form.control} name={`propertyDetailPage.propertyOverviewSection.propertySpecifications.${index}.id`} render={({ field }) => (<FormItem><FormLabel>ID</FormLabel><div className="flex gap-2"><FormControl><Input {...field} /></FormControl><Button type="button" size="icon" variant="outline" onClick={() => generateId(`overview-spec-${index+1}`, `propertyDetailPage.propertyOverviewSection.propertySpecifications.${index}.id`)}><Sparkles /></Button></div><FormMessage /></FormItem>)} />
                                    <FormField control={form.control} name={`propertyDetailPage.propertyOverviewSection.propertySpecifications.${index}.value`} render={({ field }) => (<FormItem><FormLabel>Value</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                    <FormField control={form.control} name={`propertyDetailPage.propertyOverviewSection.propertySpecifications.${index}.displayText`} render={({ field }) => (<FormItem><FormLabel>Display Text</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                </div>
                            ))}
                            <Button type="button" variant="outline" onClick={() => appendOverviewSpec({ id: '', value: '', displayText: ''})}>Add Overview Specification</Button>
                        </div>
                        <div className="space-y-4">
                            <h4 className="font-semibold">Key Project Dates</h4>
                             {keyDateFields.map((field, index) => (
                                <div key={field.id} className="p-4 border rounded-md space-y-4">
                                     <div className="flex justify-between items-center">
                                        <h5 className="font-semibold">Date {index + 1}</h5>
                                        <Button type="button" variant="destructive" size="icon" onClick={() => removeKeyDate(index)}><Trash /></Button>
                                    </div>
                                    <FormField control={form.control} name={`propertyDetailPage.propertyOverviewSection.keyProjectDates.${index}.id`} render={({ field }) => (<FormItem><FormLabel>ID</FormLabel><div className="flex gap-2"><FormControl><Input {...field} /></FormControl><Button type="button" size="icon" variant="outline" onClick={() => generateId(`key-date-${index + 1}`, `propertyDetailPage.propertyOverviewSection.keyProjectDates.${index}.id`)}><Sparkles /></Button></div><FormMessage /></FormItem>)} />
                                    <FormField control={form.control} name={`propertyDetailPage.propertyOverviewSection.keyProjectDates.${index}.title`} render={({ field }) => (<FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                    <FormField control={form.control} name={`propertyDetailPage.propertyOverviewSection.keyProjectDates.${index}.date`} render={({ field }) => (<FormItem><FormLabel>Date</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                </div>
                            ))}
                             <Button type="button" variant="outline" onClick={() => appendKeyDate({id: '', title: '', date: ''})}>Add Key Date</Button>
                        </div>
                     </FormSection>
                     <FormSection value="sub-item-4" title="Highlights Section">
                        <FormField control={form.control} name="propertyDetailPage.propertyHighlightsSection.propertyHighlightsTitle" render={({ field }) => (<FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="propertyDetailPage.propertyHighlightsSection.propertyHighlightsDescription" render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <div className="space-y-4">
                            <h4 className="font-semibold">Highlights</h4>
                            {highlightFields.map((field, index) => (
                                <div key={field.id} className="p-4 border rounded-md space-y-4">
                                     <div className="flex justify-between items-center">
                                        <h5 className="font-semibold">Highlight {index + 1}</h5>
                                        <Button type="button" variant="destructive" size="icon" onClick={() => removeHighlight(index)}><Trash /></Button>
                                    </div>
                                    <FormField control={form.control} name={`propertyDetailPage.propertyHighlightsSection.propertyHighlights.${index}.highlightId`} render={({ field }) => (<FormItem><FormLabel>ID</FormLabel><div className="flex gap-2"><FormControl><Input {...field} /></FormControl><Button type="button" size="icon" variant="outline" onClick={() => generateId(`highlight-${index + 1}`, `propertyDetailPage.propertyHighlightsSection.propertyHighlights.${index}.highlightId`)}><Sparkles /></Button></div><FormMessage /></FormItem>)} />
                                    <FormField control={form.control} name={`propertyDetailPage.propertyHighlightsSection.propertyHighlights.${index}.highlightImageUrl`} render={({ field }) => (<FormItem><FormLabel>Image URL</FormLabel><FormControl><Input type="url" {...field} /></FormControl><FormMessage /></FormItem>)} />
                                    <FormField control={form.control} name={`propertyDetailPage.propertyHighlightsSection.propertyHighlights.${index}.highlightDescription`} render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
                                </div>
                            ))}
                            <Button type="button" variant="outline" onClick={() => appendHighlight({highlightId: '', highlightImageUrl: '', highlightDescription: ''})}>Add Highlight</Button>
                        </div>
                     </FormSection>
                     <FormSection value="sub-item-5" title="Master Plan Section">
                        <FormField control={form.control} name="propertyDetailPage.propertyMasterPlanSection.masterPlanTitle" render={({ field }) => (<FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="propertyDetailPage.propertyMasterPlanSection.masterPlanDescription" render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="propertyDetailPage.propertyMasterPlanSection.masterPlanImageUrl" render={({ field }) => (<FormItem><FormLabel>Image URL</FormLabel><FormControl><Input type="url" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="propertyDetailPage.propertyMasterPlanSection.masterPlanEnquireNowCta" render={({ field }) => (<FormItem><FormLabel>Enquire Now CTA</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="propertyDetailPage.propertyMasterPlanSection.masterPlanViewInDetailCta" render={({ field }) => (<FormItem><FormLabel>View In Detail CTA</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                     </FormSection>
                      <FormSection value="sub-item-6" title="Unit Plans Section">
                        <FormField control={form.control} name="propertyDetailPage.propertyUnitPlansSection.unitPlanTitle" render={({ field }) => (<FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="propertyDetailPage.propertyUnitPlansSection.unitPlanDescription" render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="propertyDetailPage.propertyUnitPlansSection.unitPlanViewInDetailCta" render={({ field }) => (<FormItem><FormLabel>View In Detail CTA</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <div className="space-y-4">
                            <h4 className="font-semibold">Unit Plans</h4>
                            {unitPlanFields.map((field, index) => (
                                <div key={field.id} className="p-4 border rounded-md space-y-4">
                                     <div className="flex justify-between items-center">
                                        <h5 className="font-semibold">Unit Plan {index + 1}</h5>
                                        <Button type="button" variant="destructive" size="icon" onClick={() => removeUnitPlan(index)}><Trash /></Button>
                                    </div>
                                    <FormField control={form.control} name={`propertyDetailPage.propertyUnitPlansSection.unitPlans.${index}.id`} render={({ field }) => (<FormItem><FormLabel>ID</FormLabel><div className="flex gap-2"><FormControl><Input {...field} /></FormControl><Button type="button" size="icon" variant="outline" onClick={() => generateId(`unit-plan-${index + 1}`, `propertyDetailPage.propertyUnitPlansSection.unitPlans.${index}.id`)}><Sparkles /></Button></div><FormMessage /></FormItem>)} />
                                    <FormField control={form.control} name={`propertyDetailPage.propertyUnitPlansSection.unitPlans.${index}.unitPlanTitle`} render={({ field }) => (<FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                    <FormField control={form.control} name={`propertyDetailPage.propertyUnitPlansSection.unitPlans.${index}.unitPlanDescription`} render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
                                    <FormField control={form.control} name={`propertyDetailPage.propertyUnitPlansSection.unitPlans.${index}.unitPlanImageUrl`} render={({ field }) => (<FormItem><FormLabel>Image URL</FormLabel><FormControl><Input type="url" {...field} /></FormControl><FormMessage /></FormItem>)} />
                                    <FormField control={form.control} name={`propertyDetailPage.propertyUnitPlansSection.unitPlans.${index}.unitPlanEnquireUrl`} render={({ field }) => (<FormItem><FormLabel>Enquire URL</FormLabel><FormControl><Input type="url" {...field} /></FormControl><FormMessage /></FormItem>)} />
                                </div>
                            ))}
                            <Button type="button" variant="outline" onClick={() => appendUnitPlan({id: '', unitPlanTitle: '', unitPlanDescription: '', unitPlanImageUrl: '', unitPlanEnquireUrl: ''})}>Add Unit Plan</Button>
                        </div>
                     </FormSection>
                     <FormSection value="sub-item-7" title="Pricing Section">
                        <FormField control={form.control} name="propertyDetailPage.propertyPricingSection.pricingTitle" render={({ field }) => (<FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="propertyDetailPage.propertyPricingSection.pricingDescription" render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="propertyDetailPage.propertyPricingSection.pricingImageUrl" render={({ field }) => (<FormItem><FormLabel>Image URL</FormLabel><FormControl><Input type="url" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="propertyDetailPage.propertyPricingSection.completeCostingDetailsLabel" render={({ field }) => (<FormItem><FormLabel>Complete Costing Details Label</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="propertyDetailPage.propertyPricingSection.pricingEnquireNowCta" render={({ field }) => (<FormItem><FormLabel>Enquire Now CTA</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <div className="space-y-4">
                            <h4 className="font-semibold">Pricing Data</h4>
                            {pricingDataFields.map((field, index) => (
                                <div key={field.id} className="p-4 border rounded-md space-y-4">
                                     <div className="flex justify-between items-center">
                                        <h5 className="font-semibold">Pricing Entry {index + 1}</h5>
                                        <Button type="button" variant="destructive" size="icon" onClick={() => removePricingData(index)}><Trash /></Button>
                                    </div>
                                    <FormField control={form.control} name={`propertyDetailPage.propertyPricingSection.pricingData.${index}.pricingId`} render={({ field }) => (<FormItem><FormLabel>ID</FormLabel><div className="flex gap-2"><FormControl><Input {...field} /></FormControl><Button type="button" size="icon" variant="outline" onClick={() => generateId(`pricing-data-${index + 1}`, `propertyDetailPage.propertyPricingSection.pricingData.${index}.pricingId`)}><Sparkles /></Button></div><FormMessage /></FormItem>)} />
                                    <FormField control={form.control} name={`propertyDetailPage.propertyPricingSection.pricingData.${index}.pricingConfigType`} render={({ field }) => (<FormItem><FormLabel>Config Type</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                    <FormField control={form.control} name={`propertyDetailPage.propertyPricingSection.pricingData.${index}.pricingCarpetApproxArea`} render={({ field }) => (<FormItem><FormLabel>Carpet Area (approx)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                    <FormField control={form.control} name={`propertyDetailPage.propertyPricingSection.pricingData.${index}.price`} render={({ field }) => (<FormItem><FormLabel>Price</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                    <FormField control={form.control} name={`propertyDetailPage.propertyPricingSection.pricingData.${index}.pricingEnquireCtaText`} render={({ field }) => (<FormItem><FormLabel>Enquire CTA Text</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                </div>
                            ))}
                            <Button type="button" variant="outline" onClick={() => appendPricingData({ pricingId: '', pricingConfigType: '', pricingCarpetApproxArea: '', price: '', pricingEnquireCtaText: '' })}>Add Pricing Data</Button>
                        </div>
                     </FormSection>

                    <FormSection value="sub-item-8" title="Specifications Section">
                        <FormField control={form.control} name="propertyDetailPage.propertySpecificationsSection.specificationTitle" render={({ field }) => (<FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="propertyDetailPage.propertySpecificationsSection.specificationDescription" render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="propertyDetailPage.propertySpecificationsSection.specificationImageUrl" render={({ field }) => (<FormItem><FormLabel>Image URL</FormLabel><FormControl><Input type="url" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="propertyDetailPage.propertySpecificationsSection.specificationViewInDetailCta" render={({ field }) => (<FormItem><FormLabel>View In Detail CTA</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                     </FormSection>

                     <FormSection value="sub-item-9" title="Location Section">
                        <FormField control={form.control} name="propertyDetailPage.propertyLocationSection.propertyLoactionTitle" render={({ field }) => (<FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="propertyDetailPage.propertyLocationSection.propertyLoactionDescription" render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="propertyDetailPage.propertyLocationSection.propertyLoactionImageUrl" render={({ field }) => (<FormItem><FormLabel>Image URL</FormLabel><FormControl><Input type="url" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <div className="space-y-4">
                            <h4 className="font-semibold">Location Information</h4>
                            {locationInfoFields.map((field, index) => (
                                <div key={field.id} className="p-4 border rounded-md space-y-4">
                                     <div className="flex justify-between items-center">
                                        <h5 className="font-semibold">Info {index + 1}</h5>
                                        <Button type="button" variant="destructive" size="icon" onClick={() => removeLocationInfo(index)}><Trash /></Button>
                                    </div>
                                    <FormField control={form.control} name={`propertyDetailPage.propertyLocationSection.propertyLoactionInformation.${index}.estateInfoId`} render={({ field }) => (<FormItem><FormLabel>ID</FormLabel><div className="flex gap-2"><FormControl><Input {...field} /></FormControl><Button type="button" size="icon" variant="outline" onClick={() => generateId(`loc-info-${index + 1}`, `propertyDetailPage.propertyLocationSection.propertyLoactionInformation.${index}.estateInfoId`)}><Sparkles /></Button></div><FormMessage /></FormItem>)} />
                                    <FormField control={form.control} name={`propertyDetailPage.propertyLocationSection.propertyLoactionInformation.${index}.estateInfoTitle`} render={({ field }) => (<FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                    <FormField control={form.control} name={`propertyDetailPage.propertyLocationSection.propertyLoactionInformation.${index}.estateInfoDescription`} render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
                                </div>
                            ))}
                            <Button type="button" variant="outline" onClick={() => appendLocationInfo({ estateInfoId: '', estateInfoTitle: '', estateInfoDescription: '' })}>Add Location Info</Button>
                        </div>
                     </FormSection>

                    <FormSection value="sub-item-10" title="FAQ Section">
                        <FormField control={form.control} name="propertyDetailPage.propertyDetailsFAQSection.mainHeading" render={({ field }) => (<FormItem><FormLabel>Main Heading</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="propertyDetailPage.propertyDetailsFAQSection.subtitle" render={({ field }) => (<FormItem><FormLabel>Subtitle</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="propertyDetailPage.propertyDetailsFAQSection.contactButtonText" render={({ field }) => (<FormItem><FormLabel>Contact Button Text</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <div className="space-y-4">
                            <h4 className="font-semibold">FAQ Items</h4>
                            {faqFields.map((field, index) => (
                                <div key={field.id} className="p-4 border rounded-md space-y-4">
                                     <div className="flex justify-between items-center">
                                        <h5 className="font-semibold">FAQ {index + 1}</h5>
                                        <Button type="button" variant="destructive" size="icon" onClick={() => removeFaq(index)}><Trash /></Button>
                                    </div>
                                    <FormField control={form.control} name={`propertyDetailPage.propertyDetailsFAQSection.faqItems.${index}.id`} render={({ field }) => (<FormItem><FormLabel>ID</FormLabel><div className="flex gap-2"><FormControl><Input {...field} /></FormControl><Button type="button" size="icon" variant="outline" onClick={() => generateId(`faq-${index + 1}`, `propertyDetailPage.propertyDetailsFAQSection.faqItems.${index}.id`)}><Sparkles /></Button></div><FormMessage /></FormItem>)} />
                                    <FormField control={form.control} name={`propertyDetailPage.propertyDetailsFAQSection.faqItems.${index}.question`} render={({ field }) => (<FormItem><FormLabel>Question</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
                                    <FormField control={form.control} name={`propertyDetailPage.propertyDetailsFAQSection.faqItems.${index}.answer`} render={({ field }) => (<FormItem><FormLabel>Answer</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
                                </div>
                            ))}
                            <Button type="button" variant="outline" onClick={() => appendFaq({ id: '', question: '', answer: '' })}>Add FAQ</Button>
                        </div>
                     </FormSection>
                </Accordion>
            </FormSection>
            
          </Accordion>

          <Button type="submit" className="w-full bg-accent hover:bg-accent/90" size="lg">
            Generate and Validate JSON
          </Button>
        </form>
      </Form>
    </FormProvider>
  );
}
