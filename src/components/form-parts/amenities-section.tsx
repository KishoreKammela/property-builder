import { FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormSection } from '@/components/form-section';
import { Trash } from 'lucide-react';
import { useFormContext, useFieldArray } from 'react-hook-form';

export function AmenitiesSection() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: "amenities" });

  return (
    <FormSection value="item-5" title="Amenities" description="List the amenities available.">
      {fields.map((field, index) => (
        <div key={field.id} className="flex items-center gap-2">
          <FormField
            control={control}
            name={`amenities.${index}`}
            render={({ field }) => (
              <FormItem className="flex-grow">
                <FormControl>
                  <Input placeholder={`Amenity ${index + 1}`} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}><Trash /></Button>
        </div>
      ))}
      <Button type="button" variant="outline" onClick={() => append('')}>Add Amenity</Button>
    </FormSection>
  );
}
