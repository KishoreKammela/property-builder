import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormSection } from '@/components/form-section';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Trash } from 'lucide-react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { ImagePreviewInput } from '@/components/image-preview-input';

interface PricingSectionProps {
    generateId: (sectionName: string, fieldName: any) => void;
}

export function PricingSection({ generateId }: PricingSectionProps) {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "propertyDetailPage.propertyPricingSection.pricingData",
  });

  return (
    <FormSection value="sub-item-7" title="Pricing Section">
      <FormField control={control} name="propertyDetailPage.propertyPricingSection.pricingTitle" render={({ field }) => (<FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
      <FormField control={control} name="propertyDetailPage.propertyPricingSection.pricingDescription" render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
      <ImagePreviewInput name="propertyDetailPage.propertyPricingSection.pricingImageUrl" label="Image URL" />
      <FormField control={control} name="propertyDetailPage.propertyPricingSection.completeCostingDetailsLabel" render={({ field }) => (<FormItem><FormLabel>Complete Costing Details Label</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
      <FormField control={control} name="propertyDetailPage.propertyPricingSection.pricingEnquireNowCta" render={({ field }) => (<FormItem><FormLabel>Enquire Now CTA</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
      <div className="space-y-4">
          <h4 className="font-semibold">Pricing Data</h4>
          {fields.map((field, index) => (
              <div key={field.id} className="p-4 border rounded-md space-y-4">
                   <div className="flex justify-between items-center">
                      <h5 className="font-semibold">Pricing Entry {index + 1}</h5>
                      <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}><Trash /></Button>
                  </div>
                  <FormField control={control} name={`propertyDetailPage.propertyPricingSection.pricingData.${index}.pricingId`} render={({ field }) => (<FormItem><FormLabel>ID</FormLabel><div className="flex gap-2"><FormControl><Input {...field} /></FormControl><Button type="button" size="icon" variant="outline" onClick={() => generateId(`pricing-data-${index + 1}`, `propertyDetailPage.propertyPricingSection.pricingData.${index}.pricingId`)}><Sparkles /></Button></div><FormMessage /></FormItem>)} />
                  <FormField control={control} name={`propertyDetailPage.propertyPricingSection.pricingData.${index}.pricingConfigType`} render={({ field }) => (<FormItem><FormLabel>Config Type</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={control} name={`propertyDetailPage.propertyPricingSection.pricingData.${index}.pricingCarpetApproxArea`} render={({ field }) => (<FormItem><FormLabel>Carpet Area (approx)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={control} name={`propertyDetailPage.propertyPricingSection.pricingData.${index}.price`} render={({ field }) => (<FormItem><FormLabel>Price</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={control} name={`propertyDetailPage.propertyPricingSection.pricingData.${index}.pricingEnquireCtaText`} render={({ field }) => (<FormItem><FormLabel>Enquire CTA Text</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
              </div>
          ))}
          <Button type="button" variant="outline" onClick={() => append({ pricingId: '', pricingConfigType: '', pricingCarpetApproxArea: '', price: '', pricingEnquireCtaText: '' })}>Add Pricing Data</Button>
      </div>
   </FormSection>
  );
}
