'use client';

import { useForm, FormProvider, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Accordion } from '@/components/ui/accordion';
import { propertySchema } from '@/lib/schema';
import type { Property } from '@/lib/types';
import { PROPERTIES_DATA } from '@/data/property-data';
import { FormSection } from './form-section';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from './ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { ImageUpload } from './image-upload';
import { toast } from '@/hooks/use-toast';
import { handleIdGeneration } from '@/lib/actions';
import { Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface PropertyFormProps {
  onFormSubmit: (data: Property) => void;
}

export function PropertyForm({ onFormSubmit }: PropertyFormProps) {
  const form = useForm<Property>({
    resolver: zodResolver(propertySchema),
    defaultValues: PROPERTIES_DATA[0] as Property, // Use the first property as default
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


  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
            <FormSection value="item-1" title="Basic Property Information">
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
              </div>

               <ImageUpload
                  form={form}
                  name="featuredImage"
                  label="Featured Image"
                  altField="alt" 
                />
            </FormSection>
            
            {/* Add more sections as Accordion Items here later */}
            
          </Accordion>

          <Button type="submit" className="w-full bg-accent hover:bg-accent/90" size="lg">
            Generate and Validate JSON
          </Button>
        </form>
      </Form>
    </FormProvider>
  );
}
