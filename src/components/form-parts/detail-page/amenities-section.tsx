import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormSection } from '@/components/form-section';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles, Trash } from 'lucide-react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { ImagePreviewInput } from '@/components/image-preview-input';

interface PropertyAmenitiesSectionProps {
    generateId: (sectionName: string, fieldName: any) => void;
    generateAltText: (imageUrlField: string, altTextField: string) => void;
    isGenerating: Record<string, boolean>;
}

export function PropertyAmenitiesSection({ generateId, generateAltText, isGenerating }: PropertyAmenitiesSectionProps) {
  const { control } = useFormContext();
  const { fields: accordionItems, append: appendAccordion, remove: removeAccordion } = useFieldArray({ control, name: "propertyDetailPage.propertyAmenitiesSection.amenitiesAccordionItems" });
  const { fields: slideItems, append: appendSlide, remove: removeSlide } = useFieldArray({ control, name: "propertyDetailPage.propertyAmenitiesSection.cardSlideItems" });

  return (
    <FormSection value="sub-item-20" title="Amenities Accordion Section">
        <FormField control={control} name="propertyDetailPage.propertyAmenitiesSection.variant" render={({ field }) => (
            <FormItem>
                <FormLabel>Variant</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select variant" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="light">Light</SelectItem>
                    </SelectContent>
                </Select>
                <FormMessage />
            </FormItem>
        )} />
        <FormField control={control} name="propertyDetailPage.propertyAmenitiesSection.mainHeading" render={({ field }) => (<FormItem><FormLabel>Main Heading</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
        <FormField control={control} name="propertyDetailPage.propertyAmenitiesSection.subtitle" render={({ field }) => (<FormItem><FormLabel>Subtitle</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
        <FormField control={control} name="propertyDetailPage.propertyAmenitiesSection.footerDescription" render={({ field }) => (<FormItem><FormLabel>Footer Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
        <FormField control={control} name="propertyDetailPage.propertyAmenitiesSection.contactButtonText" render={({ field }) => (<FormItem><FormLabel>Contact Button Text</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />

        <div className="space-y-4">
            <h4 className="font-semibold">Accordion Items</h4>
            {accordionItems.map((item, index) => (
                <div key={item.id} className="p-4 border rounded-md space-y-4">
                    <div className="flex justify-between items-center">
                        <h5 className="font-semibold">Accordion Item {index + 1}</h5>
                        <Button type="button" variant="destructive" size="icon" onClick={() => removeAccordion(index)}><Trash /></Button>
                    </div>
                    <FormField control={control} name={`propertyDetailPage.propertyAmenitiesSection.amenitiesAccordionItems.${index}.id`} render={({ field }) => (<FormItem><FormLabel>ID</FormLabel><div className="flex gap-2"><FormControl><Input {...field} /></FormControl><Button type="button" size="icon" variant="outline" onClick={() => generateId(`amenity-accordion-${index + 1}`, `propertyDetailPage.propertyAmenitiesSection.amenitiesAccordionItems.${index}.id`)}><Sparkles /></Button></div><FormMessage /></FormItem>)} />
                    <FormField control={control} name={`propertyDetailPage.propertyAmenitiesSection.amenitiesAccordionItems.${index}.amenitiesTitle`} render={({ field }) => (<FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={control} name={`propertyDetailPage.propertyAmenitiesSection.amenitiesAccordionItems.${index}.amenitiesDescription`} render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <AmenitiesItemsArray name={`propertyDetailPage.propertyAmenitiesSection.amenitiesAccordionItems.${index}.amenitiesItems`} generateId={generateId} parentIndex={index} />
                </div>
            ))}
            <Button type="button" variant="outline" onClick={() => appendAccordion({ id: '', amenitiesTitle: '', amenitiesDescription: '', amenitiesItems: [] })}>Add Accordion Item</Button>
        </div>

        <div className="space-y-4">
            <h4 className="font-semibold">Card Slide Items</h4>
            {slideItems.map((item, index) => (
                <div key={item.id} className="p-4 border rounded-md space-y-4">
                    <div className="flex justify-between items-center">
                        <h5 className="font-semibold">Slide {index + 1}</h5>
                        <Button type="button" variant="destructive" size="icon" onClick={() => removeSlide(index)}><Trash /></Button>
                    </div>
                    <FormField control={control} name={`propertyDetailPage.propertyAmenitiesSection.cardSlideItems.${index}.id`} render={({ field }) => (<FormItem><FormLabel>ID</FormLabel><div className="flex gap-2"><FormControl><Input {...field} /></FormControl><Button type="button" size="icon" variant="outline" onClick={() => generateId(`amenity-slide-${index + 1}`, `propertyDetailPage.propertyAmenitiesSection.cardSlideItems.${index}.id`)}><Sparkles /></Button></div><FormMessage /></FormItem>)} />
                    <ImagePreviewInput
                        name={`propertyDetailPage.propertyAmenitiesSection.cardSlideItems.${index}.src`}
                        label="Image URL"
                        altFieldName={`propertyDetailPage.propertyAmenitiesSection.cardSlideItems.${index}.alt`}
                        onGenerateAltText={generateAltText}
                        isGenerating={isGenerating[`propertyDetailPage.propertyAmenitiesSection.cardSlideItems.${index}.alt`]}
                    />
                </div>
            ))}
            <Button type="button" variant="outline" onClick={() => appendSlide({ id: '', src: '', alt: '' })}>Add Slide Item</Button>
        </div>
    </FormSection>
  );
}

function AmenitiesItemsArray({ name, generateId, parentIndex }: { name: string, generateId: Function, parentIndex: number }) {
    const { control } = useFormContext();
    const { fields, append, remove } = useFieldArray({
      control,
      name,
    });
  
    return (
      <div className="space-y-2 pl-4 border-l">
        <h5 className="font-medium">Amenities</h5>
        {fields.map((field, index) => (
          <div key={field.id} className="p-4 border rounded-md space-y-4">
             <div className="flex justify-between items-center">
                <h6 className="font-semibold">Amenity {index + 1}</h6>
                <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}><Trash /></Button>
            </div>
            <FormField control={control} name={`${name}.${index}.id`} render={({ field }) => (<FormItem><FormLabel>ID</FormLabel><div className="flex gap-2"><FormControl><Input {...field} /></FormControl><Button type="button" size="icon" variant="outline" onClick={() => generateId(`amenity-${parentIndex + 1}-item-${index + 1}`, `${name}.${index}.id`)}><Sparkles /></Button></div><FormMessage /></FormItem>)} />
            <FormField control={control} name={`${name}.${index}.title`} render={({ field }) => (<FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
          </div>
        ))}
        <Button type="button" variant="outline" onClick={() => append({ id: '', title: ''})}>Add Amenity</Button>
      </div>
    );
  }
