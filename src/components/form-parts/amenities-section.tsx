import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { FormSection } from '@/components/form-section';
import { useFormContext } from 'react-hook-form';

export function AmenitiesSection() {
  const { control } = useFormContext();

  return (
    <FormSection value="item-5" title="Property Amenities" description="List all amenities available at the property.">
      <FormField
        control={control}
        name="amenities"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Amenities (comma-separated)</FormLabel>
            <FormControl>
              <Textarea
                placeholder="e.g., Clubhouse, Swimming Pool, Gymnasium, Landscaped Gardens"
                {...field}
                value={Array.isArray(field.value) ? field.value.join(', ') : ''}
                onChange={e => {
                  const values = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                  field.onChange(values);
                }}
                rows={4}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </FormSection>
  );
}
