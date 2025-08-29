import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormSection } from '@/components/form-section';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Trash } from 'lucide-react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { ImagePreviewInput } from '@/components/image-preview-input';

interface UnitPlansSectionProps {
    generateId: (sectionName: string, fieldName: any) => void;
}

export function UnitPlansSection({ generateId }: UnitPlansSectionProps) {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "propertyDetailPage.propertyUnitPlansSection.unitPlans",
  });

  return (
    <FormSection value="sub-item-6" title="Unit Plans Section">
      <FormField control={control} name="propertyDetailPage.propertyUnitPlansSection.unitPlanTitle" render={({ field }) => (<FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
      <FormField control={control} name="propertyDetailPage.propertyUnitPlansSection.unitPlanDescription" render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
      <FormField control={control} name="propertyDetailPage.propertyUnitPlansSection.unitPlanViewInDetailCta" render={({ field }) => (<FormItem><FormLabel>View In Detail CTA</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
      <div className="space-y-4">
          <h4 className="font-semibold">Unit Plans</h4>
          {fields.map((field, index) => (
              <div key={field.id} className="p-4 border rounded-md space-y-4">
                   <div className="flex justify-between items-center">
                      <h5 className="font-semibold">Unit Plan {index + 1}</h5>
                      <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}><Trash /></Button>
                  </div>
                  <FormField control={control} name={`propertyDetailPage.propertyUnitPlansSection.unitPlans.${index}.id`} render={({ field }) => (<FormItem><FormLabel>ID</FormLabel><div className="flex gap-2"><FormControl><Input {...field} /></FormControl><Button type="button" size="icon" variant="outline" onClick={() => generateId(`unit-plan-${index + 1}`, `propertyDetailPage.propertyUnitPlansSection.unitPlans.${index}.id`)}><Sparkles /></Button></div><FormMessage /></FormItem>)} />
                  <FormField control={control} name={`propertyDetailPage.propertyUnitPlansSection.unitPlans.${index}.unitPlanTitle`} render={({ field }) => (<FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={control} name={`propertyDetailPage.propertyUnitPlansSection.unitPlans.${index}.unitPlanDescription`} render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <ImagePreviewInput name={`propertyDetailPage.propertyUnitPlansSection.unitPlans.${index}.unitPlanImageUrl`} label="Image URL" />
                  <FormField control={control} name={`propertyDetailPage.propertyUnitPlansSection.unitPlans.${index}.unitPlanEnquireUrl`} render={({ field }) => (<FormItem><FormLabel>Enquire URL</FormLabel><FormControl><Input type="url" {...field} /></FormControl><FormMessage /></FormItem>)} />
              </div>
          ))}
          <Button type="button" variant="outline" onClick={() => append({id: '', unitPlanTitle: '', unitPlanDescription: '', unitPlanImageUrl: '', unitPlanEnquireUrl: ''})}>Add Unit Plan</Button>
      </div>
   </FormSection>
  );
}
