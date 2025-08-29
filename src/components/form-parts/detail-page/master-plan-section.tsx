import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FormSection } from '@/components/form-section';
import { Textarea } from '@/components/ui/textarea';
import { useFormContext } from 'react-hook-form';
import { ImagePreviewInput } from '@/components/image-preview-input';

export function MasterPlanSection() {
  const { control } = useFormContext();

  return (
    <FormSection value="sub-item-5" title="Master Plan Section">
      <FormField control={control} name="propertyDetailPage.propertyMasterPlanSection.masterPlanTitle" render={({ field }) => (<FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
      <FormField control={control} name="propertyDetailPage.propertyMasterPlanSection.masterPlanDescription" render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
      <ImagePreviewInput name="propertyDetailPage.propertyMasterPlanSection.masterPlanImageUrl" label="Image URL" />
      <FormField control={control} name="propertyDetailPage.propertyMasterPlanSection.masterPlanEnquireNowCta" render={({ field }) => (<FormItem><FormLabel>Enquire Now CTA</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
      <FormField control={control} name="propertyDetailPage.propertyMasterPlanSection.masterPlanViewInDetailCta" render={({ field }) => (<FormItem><FormLabel>View In Detail CTA</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
   </FormSection>
  );
}
