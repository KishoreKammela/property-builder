import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { FormSection } from '@/components/form-section';
import { useFormContext } from 'react-hook-form';
import { Button } from '../ui/button';
import { Loader2, Sparkles } from 'lucide-react';

interface DescriptionSectionProps {
  isGenerating: boolean;
  onGenerate: () => void;
}

export function DescriptionSection({ isGenerating, onGenerate }: DescriptionSectionProps) {
    const { control } = useFormContext();
  return (
    <FormSection value="item-2" title="Property Descriptions" description="Add detailed and summary descriptions for the property.">
      <div className="flex justify-end">
        <Button type="button" onClick={onGenerate} disabled={isGenerating}>
          {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
          Generate Descriptions
        </Button>
      </div>
       <FormField
          control={control}
          name="description"
          render={({ field }) => (
              <FormItem>
              <FormLabel>Full Description</FormLabel>
              <FormControl>
                  <Textarea placeholder="Provide a comprehensive and detailed description of the property, its features, and surroundings." {...field} rows={5}/>
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
              <FormLabel>Short Description / Summary</FormLabel>
              <FormControl>
                  <Textarea placeholder="Provide a brief, catchy summary of the property. This is often used in listings." {...field} rows={2}/>
              </FormControl>
              <FormMessage />
              </FormItem>
          )}
          />
  </FormSection>
  );
}
