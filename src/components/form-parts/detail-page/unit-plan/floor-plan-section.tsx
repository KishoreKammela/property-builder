import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormSection } from '@/components/form-section';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Trash } from 'lucide-react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { ImagePreviewInput } from '@/components/image-preview-input';

interface UnitPlanFloorPlanSectionProps {
    generateId: (sectionName: string, fieldName: any) => void;
}

export function UnitPlanFloorPlanSection({ generateId }: UnitPlanFloorPlanSectionProps) {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "propertyUnitPlanDetailPage.propertyFloorPlanSection.floorPlanSectionPlans",
  });

  return (
    <FormSection value="sub-item-15" title="Floor Plan Section">
      <FormField control={control} name="propertyUnitPlanDetailPage.propertyFloorPlanSection.floorPlanSectionHeading" render={({ field }) => (<FormItem><FormLabel>Heading</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
      <FormField control={control} name="propertyUnitPlanDetailPage.propertyFloorPlanSection.floorPlanSectionDescription" render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
      
      <div className="space-y-4">
        <h4 className="font-semibold">Plans</h4>
        {fields.map((field, index) => (
          <div key={field.id} className="p-4 border rounded-md space-y-4">
            <div className="flex justify-between items-center">
              <h5 className="font-semibold">Plan {index + 1}</h5>
              <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}><Trash /></Button>
            </div>
            <FormField control={control} name={`propertyUnitPlanDetailPage.propertyFloorPlanSection.floorPlanSectionPlans.${index}.id`} render={({ field }) => (<FormItem><FormLabel>ID</FormLabel><div className="flex gap-2"><FormControl><Input {...field} /></FormControl><Button type="button" size="icon" variant="outline" onClick={() => generateId(`unit-floor-plan-${index + 1}`, `propertyUnitPlanDetailPage.propertyFloorPlanSection.floorPlanSectionPlans.${index}.id`)}><Sparkles /></Button></div><FormMessage /></FormItem>)} />
            <FormField control={control} name={`propertyUnitPlanDetailPage.propertyFloorPlanSection.floorPlanSectionPlans.${index}.title`} render={({ field }) => (<FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={control} name={`propertyUnitPlanDetailPage.propertyFloorPlanSection.floorPlanSectionPlans.${index}.description`} render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
            <ImagePreviewInput name={`propertyUnitPlanDetailPage.propertyFloorPlanSection.floorPlanSectionPlans.${index}.imageUrl`} label="Image URL" />
            <FormField control={control} name={`propertyUnitPlanDetailPage.propertyFloorPlanSection.floorPlanSectionPlans.${index}.enquiryNowUrl`} render={({ field }) => (<FormItem><FormLabel>Enquiry URL</FormLabel><FormControl><Input type="url" {...field} /></FormControl><FormMessage /></FormItem>)} />
          </div>
        ))}
        <Button type="button" variant="outline" onClick={() => append({ id: '', title: '', description: '', imageUrl: '', enquiryNowUrl: '' })}>Add Plan</Button>
      </div>
    </FormSection>
  );
}
