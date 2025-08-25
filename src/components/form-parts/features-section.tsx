import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { FormSection } from '@/components/form-section';
import { useFormContext } from 'react-hook-form';

export function FeaturesSection() {
  const { control } = useFormContext();

  return (
    <FormSection value="item-4" title="Features" description="List the key features of the property (comma-separated).">
      <FormField
        control={control}
        name="features"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="sr-only">Features</FormLabel>
            <FormControl>
              <Textarea
                placeholder="e.g., 24x7 Security, Swimming Pool, Gymnasium"
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
