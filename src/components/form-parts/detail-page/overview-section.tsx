import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormSection } from '@/components/form-section';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Sparkles, Trash } from 'lucide-react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { ImagePreviewInput } from '@/components/image-preview-input';

interface OverviewSectionProps {
    generateId: (sectionName: string, fieldName: any) => void;
}

export function OverviewSection({ generateId }: OverviewSectionProps) {
  const { control } = useFormContext();
  const { fields: overviewSpecFields, append: appendOverviewSpec, remove: removeOverviewSpec } = useFieldArray({ control, name: "propertyDetailPage.propertyOverviewSection.propertySpecifications" });
  const { fields: keyDateFields, append: appendKeyDate, remove: removeKeyDate } = useFieldArray({ control, name: "propertyDetailPage.propertyOverviewSection.keyProjectDates" });

  return (
    <FormSection value="sub-item-3" title="Overview Section">
      <FormField control={control} name="propertyDetailPage.propertyOverviewSection.projectOverviewLabel" render={({ field }) => (<FormItem><FormLabel>Project Overview Label</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
      <FormField control={control} name="propertyDetailPage.propertyOverviewSection.projectWalkthroughLabel" render={({ field }) => (<FormItem><FormLabel>Project Walkthrough Label</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
      <FormField control={control} name="propertyDetailPage.propertyOverviewSection.projectOverviewDescription" render={({ field }) => (<FormItem><FormLabel>Project Overview Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
      <FormField control={control} name="propertyDetailPage.propertyOverviewSection.isReraCertified" render={({ field }) => (<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl><div className="space-y-1 leading-none"><FormLabel>RERA Certified</FormLabel></div></FormItem>)} />
      <ImagePreviewInput name="propertyDetailPage.propertyOverviewSection.reraLogo" label="RERA Logo URL" />
      <FormField control={control} name="propertyDetailPage.propertyOverviewSection.reraCertifiedLabel" render={({ field }) => (<FormItem><FormLabel>RERA Certified Label</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
      <FormField control={control} name="propertyDetailPage.propertyOverviewSection.reraNumberLabel" render={({ field }) => (<FormItem><FormLabel>RERA Number Label</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
      <FormField control={control} name="propertyDetailPage.propertyOverviewSection.projectReraNumber" render={({ field }) => (<FormItem><FormLabel>Project RERA Number</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
      <FormField control={control} name="propertyDetailPage.propertyOverviewSection.keyProjectDatesTitle" render={({ field }) => (<FormItem><FormLabel>Key Project Dates Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
      <ImagePreviewInput name="propertyDetailPage.propertyOverviewSection.projectOverviewImageUrl" label="Project Overview Image URL" />
      <FormField control={control} name="propertyDetailPage.propertyOverviewSection.projectOverviewViewMoreCta" render={({ field }) => (<FormItem><FormLabel>View More CTA</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />

      <div className="space-y-4">
          <h4 className="font-semibold">Overview Specifications</h4>
          {overviewSpecFields.map((field, index) => (
              <div key={field.id} className="p-4 border rounded-md space-y-4">
                  <div className="flex justify-between items-center">
                      <h5 className="font-semibold">Specification {index + 1}</h5>
                      <Button type="button" variant="destructive" size="icon" onClick={() => removeOverviewSpec(index)}><Trash /></Button>
                  </div>
                  <FormField control={control} name={`propertyDetailPage.propertyOverviewSection.propertySpecifications.${index}.id`} render={({ field }) => (<FormItem><FormLabel>ID</FormLabel><div className="flex gap-2"><FormControl><Input {...field} /></FormControl><Button type="button" size="icon" variant="outline" onClick={() => generateId(`overview-spec-${index+1}`, `propertyDetailPage.propertyOverviewSection.propertySpecifications.${index}.id`)}><Sparkles /></Button></div><FormMessage /></FormItem>)} />
                  <FormField control={control} name={`propertyDetailPage.propertyOverviewSection.propertySpecifications.${index}.value`} render={({ field }) => (<FormItem><FormLabel>Value</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={control} name={`propertyDetailPage.propertyOverviewSection.propertySpecifications.${index}.displayText`} render={({ field }) => (<FormItem><FormLabel>Display Text</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
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
                  <FormField control={control} name={`propertyDetailPage.propertyOverviewSection.keyProjectDates.${index}.id`} render={({ field }) => (<FormItem><FormLabel>ID</FormLabel><div className="flex gap-2"><FormControl><Input {...field} /></FormControl><Button type="button" size="icon" variant="outline" onClick={() => generateId(`key-date-${index + 1}`, `propertyDetailPage.propertyOverviewSection.keyProjectDates.${index}.id`)}><Sparkles /></Button></div><FormMessage /></FormItem>)} />
                  <FormField control={control} name={`propertyDetailPage.propertyOverviewSection.keyProjectDates.${index}.title`} render={({ field }) => (<FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={control} name={`propertyDetailPage.propertyOverviewSection.keyProjectDates.${index}.date`} render={({ field }) => (<FormItem><FormLabel>Date</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
              </div>
          ))}
           <Button type="button" variant="outline" onClick={() => appendKeyDate({id: '', title: '', date: ''})}>Add Key Date</Button>
      </div>
   </FormSection>
  );
}
