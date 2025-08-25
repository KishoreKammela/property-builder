import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormSection } from '@/components/form-section';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles, Trash } from 'lucide-react';
import { useFormContext, useFieldArray } from 'react-hook-form';

interface BannerSectionProps {
    generateId: (sectionName: string, fieldName: any) => void;
}

export function BannerSection({ generateId }: BannerSectionProps) {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "propertyDetailPage.propertyBannerSection.specifications",
  });

  return (
    <FormSection value="sub-item-1" title="Banner Section">
       <FormField control={control} name="propertyDetailPage.propertyBannerSection.headingOne" render={({ field }) => (<FormItem><FormLabel>Heading One</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
       <FormField control={control} name="propertyDetailPage.propertyBannerSection.headingTwo" render={({ field }) => (<FormItem><FormLabel>Heading Two</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
       <FormField control={control} name="propertyDetailPage.propertyBannerSection.mainBannerImageUrl" render={({ field }) => (<FormItem><FormLabel>Main Banner Image URL</FormLabel><FormControl><Input type="url" {...field} /></FormControl><FormMessage /></FormItem>)} />
       <FormField control={control} name="propertyDetailPage.propertyBannerSection.primeLocationAt" render={({ field }) => (<FormItem><FormLabel>Prime Location At</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
       <FormField control={control} name="propertyDetailPage.propertyBannerSection.projectStatusTitle" render={({ field }) => (<FormItem><FormLabel>Project Status Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
       <FormField
          control={control}
          name="propertyDetailPage.propertyBannerSection.projectStatusValue"
          render={({ field }) => (
              <FormItem>
              <FormLabel>Project Status Value</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                  <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                  <SelectItem value="New Launch">New Launch</SelectItem>
                  <SelectItem value="Pre-Launch">Pre-Launch</SelectItem>
                  <SelectItem value="Upcoming Launches">Upcoming Launches</SelectItem>
                  </SelectContent>
              </Select>
              <FormMessage />
              </FormItem>
          )}
          />
       <FormField control={control} name="propertyDetailPage.propertyBannerSection.isReraCertified" render={({ field }) => (<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl><div className="space-y-1 leading-none"><FormLabel>RERA Certified</FormLabel></div></FormItem>)} />
       <FormField control={control} name="propertyDetailPage.propertyBannerSection.reraLogo" render={({ field }) => (<FormItem><FormLabel>RERA Logo URL</FormLabel><FormControl><Input type="url" {...field} /></FormControl><FormMessage /></FormItem>)} />
       <FormField control={control} name="propertyDetailPage.propertyBannerSection.reraCertifiedLabel" render={({ field }) => (<FormItem><FormLabel>RERA Certified Label</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
       <FormField control={control} name="propertyDetailPage.propertyBannerSection.priceRangeLabel" render={({ field }) => (<FormItem><FormLabel>Price Range Label</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
       <FormField control={control} name="propertyDetailPage.propertyBannerSection.grabEarlyBirdAdvantages" render={({ field }) => (<FormItem><FormLabel>Grab Early Bird Advantages</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
       <FormField control={control} name="propertyDetailPage.propertyBannerSection.limitedSlotsAvailable" render={({ field }) => (<FormItem><FormLabel>Limited Slots Available</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
       <FormField control={control} name="propertyDetailPage.propertyBannerSection.brochureCta" render={({ field }) => (<FormItem><FormLabel>Brochure CTA</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
       <FormField control={control} name="propertyDetailPage.propertyBannerSection.bookVisitCta" render={({ field }) => (<FormItem><FormLabel>Book Visit CTA</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
       <FormField control={control} name="propertyDetailPage.propertyBannerSection.viewAllPhotosCta" render={({ field }) => (<FormItem><FormLabel>View All Photos CTA</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
      
      <div className="space-y-4">
          <h4 className="font-semibold">Banner Specifications</h4>
           {fields.map((field, index) => (
              <div key={field.id} className="p-4 border rounded-md space-y-4">
                  <div className="flex justify-between items-center">
                      <h5 className="font-semibold">Specification {index + 1}</h5>
                      <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}><Trash /></Button>
                  </div>
                  <FormField control={control} name={`propertyDetailPage.propertyBannerSection.specifications.${index}.id`} render={({ field }) => (<FormItem><FormLabel>ID</FormLabel><div className="flex gap-2"><FormControl><Input {...field} /></FormControl><Button type="button" size="icon" variant="outline" onClick={() => generateId(`banner-spec-${index + 1}`, `propertyDetailPage.propertyBannerSection.specifications.${index}.id`)}><Sparkles /></Button></div><FormMessage /></FormItem>)} />
                  <FormField control={control} name={`propertyDetailPage.propertyBannerSection.specifications.${index}.value`} render={({ field }) => (<FormItem><FormLabel>Value</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={control} name={`propertyDetailPage.propertyBannerSection.specifications.${index}.displayText`} render={({ field }) => (<FormItem><FormLabel>Display Text</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
              </div>
          ))}
          <Button type="button" variant="outline" onClick={() => append({id: '', value: '', displayText: ''})}>Add Banner Specification</Button>
      </div>
    </FormSection>
  );
}
