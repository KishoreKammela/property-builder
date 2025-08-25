import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { FormSection } from '@/components/form-section';
import { useFormContext } from 'react-hook-form';

export function DescriptionSection() {
    const { control } = useFormContext();
  return (
    <FormSection value="item-2" title="Description" description="Add descriptive content for the property.">
       <FormField
          control={control}
          name="description"
          render={({ field }) => (
              <FormItem>
              <FormLabel>Full Description</FormLabel>
              <FormControl>
                  <Textarea placeholder="Provide a detailed description of the property." {...field} rows={5}/>
              </FormControl>
              <FormMessage />
              </FormItem>
          )}
          />
      <FormField
          control={control}
          name="shortDescription"
          render={({ field }) => (
              <FormItem>
              <FormLabel>Short Description</FormLabel>
              <FormControl>
                  <Textarea placeholder="Provide a brief summary of the property." {...field} rows={2}/>
              </FormControl>
              <FormMessage />
              </FormItem>
          )}
          />
  </FormSection>
  );
}
