import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormSection } from '@/components/form-section';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Trash } from 'lucide-react';
import { useFormContext, useFieldArray } from 'react-hook-form';

interface MasterPlanBannerSectionProps {
    generateId: (sectionName: string, fieldName: any) => void;
}

export function MasterPlanBannerSection({ generateId }: MasterPlanBannerSectionProps) {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "propertyMasterPlanDetailPage.propertyMasterPlanBannerSection.bannerSectionFeatures",
  });

  return (
    <FormSection value="sub-item-11" title="Master Plan Banner Section">
      <FormField control={control} name="propertyMasterPlanDetailPage.propertyMasterPlanBannerSection.bannerSectionHeader" render={({ field }) => (<FormItem><FormLabel>Header</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
      <FormField control={control} name="propertyMasterPlanDetailPage.propertyMasterPlanBannerSection.bannerSectionCta" render={({ field }) => (<FormItem><FormLabel>CTA</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
      <FormField control={control} name="propertyMasterPlanDetailPage.propertyMasterPlanBannerSection.bannerSectionImageUrl" render={({ field }) => (<FormItem><FormLabel>Image URL</FormLabel><FormControl><Input type="url" {...field} /></FormControl><FormMessage /></FormItem>)} />
      <FormField control={control} name="propertyMasterPlanDetailPage.propertyMasterPlanBannerSection.bannerSectionDescription" render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
      
      <div className="space-y-4">
        <h4 className="font-semibold">Banner Features</h4>
        {fields.map((field, index) => (
          <div key={field.id} className="p-4 border rounded-md space-y-4">
            <div className="flex justify-between items-center">
              <h5 className="font-semibold">Feature {index + 1}</h5>
              <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}><Trash /></Button>
            </div>
            <FormField control={control} name={`propertyMasterPlanDetailPage.propertyMasterPlanBannerSection.bannerSectionFeatures.${index}.title`} render={({ field }) => (<FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={control} name={`propertyMasterPlanDetailPage.propertyMasterPlanBannerSection.bannerSectionFeatures.${index}.description`} render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
          </div>
        ))}
        <Button type="button" variant="outline" onClick={() => append({ title: '', description: '' })}>Add Banner Feature</Button>
      </div>
    </FormSection>
  );
}
