import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormSection } from '@/components/form-section';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Trash } from 'lucide-react';
import { useFormContext, useFieldArray } from 'react-hook-form';

interface AmenitiesFaqSectionProps {
    generateId: (sectionName: string, fieldName: any) => void;
}

export function AmenitiesFaqSection({ generateId }: AmenitiesFaqSectionProps) {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "propertyAmenitiesDetailPage.propertyAmenitiesFAQSection.faqItems",
  });

  return (
    <FormSection value="sub-item-22" title="Amenities FAQ Section">
      <FormField control={control} name="propertyAmenitiesDetailPage.propertyAmenitiesFAQSection.mainHeading" render={({ field }) => (<FormItem><FormLabel>Main Heading</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
      <FormField control={control} name="propertyAmenitiesDetailPage.propertyAmenitiesFAQSection.subtitle" render={({ field }) => (<FormItem><FormLabel>Subtitle</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
      <FormField control={control} name="propertyAmenitiesDetailPage.propertyAmenitiesFAQSection.contactButtonText" render={({ field }) => (<FormItem><FormLabel>Contact Button Text</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
      <div className="space-y-4">
          <h4 className="font-semibold">FAQ Items</h4>
          {fields.map((field, index) => (
              <div key={field.id} className="p-4 border rounded-md space-y-4">
                   <div className="flex justify-between items-center">
                      <h5 className="font-semibold">FAQ {index + 1}</h5>
                      <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}><Trash /></Button>
                  </div>
                  <FormField control={control} name={`propertyAmenitiesDetailPage.propertyAmenitiesFAQSection.faqItems.${index}.id`} render={({ field }) => (<FormItem><FormLabel>ID</FormLabel><div className="flex gap-2"><FormControl><Input {...field} /></FormControl><Button type="button" size="icon" variant="outline" onClick={() => generateId(`amenity-faq-${index + 1}`, `propertyAmenitiesDetailPage.propertyAmenitiesFAQSection.faqItems.${index}.id`)}><Sparkles /></Button></div><FormMessage /></FormItem>)} />
                  <FormField control={control} name={`propertyAmenitiesDetailPage.propertyAmenitiesFAQSection.faqItems.${index}.question`} render={({ field }) => (<FormItem><FormLabel>Question</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={control} name={`propertyAmenitiesDetailPage.propertyAmenitiesFAQSection.faqItems.${index}.answer`} render={({ field }) => (<FormItem><FormLabel>Answer</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
              </div>
          ))}
          <Button type="button" variant="outline" onClick={() => append({ id: '', question: '', answer: '' })}>Add FAQ</Button>
      </div>
   </FormSection>
  );
}
