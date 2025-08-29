import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormSection } from '@/components/form-section';
import { Trash } from 'lucide-react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { toWords } from '@/lib/currency-to-words';


export function UnitPlanSizesSection() {
  const { control, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "propertyUnitPlanDetailPage.propertyUnitSizesSection.unitSizesWithinTower",
  });

  return (
    <FormSection value="sub-item-17" title="Unit Sizes Section">
      <FormField control={control} name="propertyUnitPlanDetailPage.propertyUnitSizesSection.unitSizesSectionHeading" render={({ field }) => (<FormItem><FormLabel>Heading</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
      
      <div className="space-y-4">
        <h4 className="font-semibold">Unit Sizes</h4>
        {fields.map((field, index) => {
          const priceValue = watch(`propertyUnitPlanDetailPage.propertyUnitSizesSection.unitSizesWithinTower.${index}.price`);
          const numericPrice = typeof priceValue === 'string' ? parseFloat(priceValue.replace(/[^0-9.]/g, '')) : 0;
          return (
            <div key={field.id} className="p-4 border rounded-md space-y-4">
              <div className="flex justify-between items-center">
                <h5 className="font-semibold">Unit Size {index + 1}</h5>
                <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}><Trash /></Button>
              </div>
              <FormField control={control} name={`propertyUnitPlanDetailPage.propertyUnitSizesSection.unitSizesWithinTower.${index}.configurationType`} render={({ field }) => (<FormItem><FormLabel>Configuration Type</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={control} name={`propertyUnitPlanDetailPage.propertyUnitSizesSection.unitSizesWithinTower.${index}.carpetAreaApprox`} render={({ field }) => (<FormItem><FormLabel>Carpet Area (approx)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={control} name={`propertyUnitPlanDetailPage.propertyUnitSizesSection.unitSizesWithinTower.${index}.price`} render={({ field }) => (<FormItem><FormLabel>Price</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage />
               {numericPrice > 0 && <FormDescription>{toWords(numericPrice)}</FormDescription>}
              </FormItem>)} />
              <FormField control={control} name={`propertyUnitPlanDetailPage.propertyUnitSizesSection.unitSizesWithinTower.${index}.priceEnquireLabel`} render={({ field }) => (<FormItem><FormLabel>Enquire Label</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
            </div>
          )
        })}
        <Button type="button" variant="outline" onClick={() => append({ configurationType: '', carpetAreaApprox: '', price: '', priceEnquireLabel: '' })}>Add Unit Size</Button>
      </div>
    </FormSection>
  );
}
