import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { FormSection } from '@/components/form-section';
import { useFormContext } from 'react-hook-form';

export function AmenitiesSection() {
  const { control } = useFormContext();

  return (
    <FormSection value="item-5" title="Amenities" description="List the amenities available (comma-separated).">
      <FormField
        control={control}
        name="amenities"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="sr-only">Amenities</FormLabel>
            <FormControl>
              <Textarea
                placeholder="e.g., Club House, Swimming Pool, Gymnasium"
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
