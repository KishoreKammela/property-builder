import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { FormSection } from '@/components/form-section';
import { Trash } from 'lucide-react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { toWords } from '@/lib/currency-to-words';

export function FloorPlansSection() {
  const { control, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: "floorPlans" });
  
  const watchedFloorPlans = watch("floorPlans");

  return (
    <FormSection value="item-7" title="Floor Plans" description="Add or remove floor plans available for this property.">
      {fields.map((field, index) => {
        const price = watchedFloorPlans?.[index]?.price;
        return (
            <div key={field.id} className="p-4 border rounded-md space-y-4">
                <div className="flex justify-between items-center">
                    <h4 className="font-semibold">Floor Plan {index + 1}</h4>
                    <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}><Trash className="h-4 w-4" /></Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={control} name={`floorPlans.${index}.id`} render={({ field }) => ( <FormItem><FormLabel>Floor Plan ID</FormLabel><FormControl><Input placeholder="e.g., 2bhk-premium" {...field} /></FormControl><FormMessage /></FormItem> )} />
                    <FormField control={control} name={`floorPlans.${index}.name`} render={({ field }) => ( <FormItem><FormLabel>Name</FormLabel><FormControl><Input placeholder="e.g., 2BHK Premium" {...field} /></FormControl><FormMessage /></FormItem> )} />
                    <FormField control={control} name={`floorPlans.${index}.type`} render={({ field }) => ( <FormItem><FormLabel>Type</FormLabel><FormControl><Input placeholder="e.g., Apartment" {...field} /></FormControl><FormMessage /></FormItem> )} />
                    <FormField control={control} name={`floorPlans.${index}.area`} render={({ field }) => ( <FormItem><FormLabel>Area (sqft)</FormLabel><FormControl><Input type="number" placeholder="1200" {...field} onChange={e => field.onChange(Number(e.target.value))}/></FormControl><FormMessage /></FormItem> )} />
                    <FormField control={control} name={`floorPlans.${index}.bedrooms`} render={({ field }) => ( <FormItem><FormLabel>Bedrooms</FormLabel><FormControl><Input type="number" placeholder="2" {...field} onChange={e => field.onChange(Number(e.target.value))}/></FormControl><FormMessage /></FormItem> )} />
                    <FormField control={control} name={`floorPlans.${index}.bathrooms`} render={({ field }) => ( <FormItem><FormLabel>Bathrooms</FormLabel><FormControl><Input type="number" placeholder="2" {...field} onChange={e => field.onChange(Number(e.target.value))}/></FormControl><FormMessage /></FormItem> )} />
                    <FormField control={control} name={`floorPlans.${index}.price`} render={({ field }) => ( <FormItem><FormLabel>Price</FormLabel><FormControl><Input type="number" placeholder="7500000" {...field} onChange={e => field.onChange(Number(e.target.value))}/></FormControl>
                    {price > 0 && <FormDescription>{toWords(price)}</FormDescription>}
                    <FormMessage /></FormItem> )} />
                    <FormField control={control} name={`floorPlans.${index}.image`} render={({ field }) => ( <FormItem className="md:col-span-2"><FormLabel>Image URL</FormLabel><FormControl><Input type="url" placeholder="https://placehold.co/600x400.png" {...field} /></FormControl><FormMessage /></FormItem> )} />
                    <FormField control={control} name={`floorPlans.${index}.description`} render={({ field }) => ( <FormItem className="md:col-span-2"><FormLabel>Description</FormLabel><FormControl><Textarea placeholder="Describe this floor plan." {...field} /></FormControl><FormMessage /></FormItem> )} />
                </div>
            </div>
        )
      })}
      <Button type="button" variant="outline" onClick={() => append({ id: `floorplan-${fields.length + 1}`, name: '', type: 'apartment', area: 0, bedrooms: 0, bathrooms: 0, price: 0, image: '', description: ''})}>Add Floor Plan</Button>
    </FormSection>
  );
}
