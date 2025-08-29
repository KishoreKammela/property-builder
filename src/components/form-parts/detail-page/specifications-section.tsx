import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FormSection } from '@/components/form-section';
import { Textarea } from '@/components/ui/textarea';
import { useFormContext } from 'react-hook-form';
import { ImagePreviewInput } from '@/components/image-preview-input';

export function SpecificationsSection() {
  const { control } = useFormContext();

  return (
    <FormSection value="sub-item-8" title="Specifications Section">
      <FormField control={control} name="propertyDetailPage.propertySpecificationsSection.specificationTitle" render={({ field }) => (<FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
      <FormField control={control} name="propertyDetailPage.propertySpecificationsSection.specificationDescription" render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
      <ImagePreviewInput name="propertyDetailPage.propertySpecificationsSection.specificationImageUrl" label="Image URL" />
      <FormField control={control} name="propertyDetailPage.propertySpecificationsSection.specificationViewInDetailCta" render={({ field }) => (<FormItem><FormLabel>View In Detail CTA</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
   </FormSection>
  );
}
