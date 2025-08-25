import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { FormSection } from '@/components/form-section';
import { Trash } from 'lucide-react';
import { useFormContext, useFieldArray } from 'react-hook-form';

export function FloorPlansSection() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: "floorPlans" });

  return (
    <FormSection value="item-7" title="Floor Plans" description="Add details for each floor plan available.">
      {fields.map((field, index) => (
        <div key={field.id} className="p-4 border rounded-md space-y-4">
            <div className="flex justify-between items-center">
                <h4 className="font-semibold">Floor Plan {index + 1}</h4>
                <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}><Trash /></Button>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={control} name={`floorPlans.${index}.id`} render={({ field }) => ( <FormItem><FormLabel>ID</FormLabel><FormControl><Input placeholder="floorplan-1" {...field} /></FormControl><FormMessage /></FormItem> )} />
                <FormField control={control} name={`floorPlans.${index}.name`} render={({ field }) => ( <FormItem><FormLabel>Name</FormLabel><FormControl><Input placeholder="2BHK Premium" {...field} /></FormControl><FormMessage /></FormItem> )} />
                <FormField control={control} name={`floorPlans.${index}.type`} render={({ field }) => ( <FormItem><FormLabel>Type</FormLabel><FormControl><Input placeholder="apartment" {...field} /></FormControl><FormMessage /></FormItem> )} />
                <FormField control={control} name={`floorPlans.${index}.area`} render={({ field }) => ( <FormItem><FormLabel>Area (sqft)</FormLabel><FormControl><Input type="number" placeholder="1200" {...field} onChange={e => field.onChange(Number(e.target.value))}/></FormControl><FormMessage /></FormItem> )} />
                <FormField control={control} name={`floorPlans.${index}.bedrooms`} render={({ field }) => ( <FormItem><FormLabel>Bedrooms</FormLabel><FormControl><Input type="number" placeholder="2" {...field} onChange={e => field.onChange(Number(e.target.value))}/></FormControl><FormMessage /></FormItem> )} />
                <FormField control={control} name={`floorPlans.${index}.bathrooms`} render={({ field }) => ( <FormItem><FormLabel>Bathrooms</FormLabel><FormControl><Input type="number" placeholder="2" {...field} onChange={e => field.onChange(Number(e.target.value))}/></FormControl><FormMessage /></FormItem> )} />
                <FormField control={control} name={`floorPlans.${index}.price`} render={({ field }) => ( <FormItem><FormLabel>Price</FormLabel><FormControl><Input type="number" placeholder="75000000" {...field} onChange={e => field.onChange(Number(e.target.value))}/></FormControl><FormMessage /></FormItem> )} />
                <FormField control={control} name={`floorPlans.${index}.image`} render={({ field }) => ( <FormItem className="md:col-span-2"><FormLabel>Image URL</FormLabel><FormControl><Input type="url" placeholder="https://example.com/floorplan.png" {...field} /></FormControl><FormMessage /></FormItem> )} />
                <FormField control={control} name={`floorPlans.${index}.description`} render={({ field }) => ( <FormItem className="md:col-span-2"><FormLabel>Description</FormLabel><FormControl><Textarea placeholder="Floor plan description" {...field} /></FormControl><FormMessage /></FormItem> )} />
            </div>
        </div>
      ))}
      <Button type="button" variant="outline" onClick={() => append({ id: `floorplan-${fields.length + 1}`, name: '', type: 'apartment', area: 0, bedrooms: 0, bathrooms: 0, price: 0, image: '', description: ''})}>Add Floor Plan</Button>
    </FormSection>
  );
}
