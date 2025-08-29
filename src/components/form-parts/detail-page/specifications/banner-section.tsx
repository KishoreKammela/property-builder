import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FormSection } from '@/components/form-section';
import { useFormContext } from 'react-hook-form';
import { ImagePreviewInput } from '@/components/image-preview-input';

export function SpecificationsBannerSection() {
  const { control } = useFormContext();

  return (
    <FormSection value="sub-item-23" title="Specifications Banner Section">
      <FormField control={control} name="propertySpecificationsDetailPage.propertySpecificationsBannerSection.specificationsBannerSectionTitle" render={({ field }) => (<FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
      <FormField control={control} name="propertySpecificationsDetailPage.propertySpecificationsBannerSection.specificationsBannerSectionDescription" render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
      <ImagePreviewInput name="propertySpecificationsDetailPage.propertySpecificationsBannerSection.specificationsBannerSectionImageUrl" label="Image URL" />
      <ImagePreviewInput name="propertySpecificationsDetailPage.propertySpecificationsBannerSection.specificationsBannerSectionMobileImageUrl" label="Mobile Image URL" />
    </FormSection>
  );
}
