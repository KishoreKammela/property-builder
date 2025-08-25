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
    },
    mode: 'onChange',
  });

  const { fields: featureFields, append: appendFeature, remove: removeFeature } = useFieldArray({
    control: form.control,
    name: "features",
  });

  const { fields: amenityFields, append: appendAmenity, remove: removeAmenity } = useFieldArray({
    control: form.control,
    name: "amenities",
  });

   const { fields: floorPlanFields, append: appendFloorPlan, remove: removeFloorPlan } = useFieldArray({
    control: form.control,
    name: "floorPlans",
  });


  const onSubmit = (data: Property) => {
    onFormSubmit(data);
    toast({
      title: "Success!",
      description: "Property data has been validated and generated.",
    });
  };

  const generateId = async (sectionName: string, fieldName: `id` | `slug`) => {
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
            
          </Accordion>

          <Button type="submit" className="w-full bg-accent hover:bg-accent/90" size="lg">
            Generate and Validate JSON
          </Button>
        </form>
      </Form>
    </FormProvider>
  );
}
