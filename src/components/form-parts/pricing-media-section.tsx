import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FormSection } from '@/components/form-section';
import { useFormContext } from 'react-hook-form';
import { toWords } from '@/lib/currency-to-words';
import { ImagePreviewInput } from '../image-preview-input';

interface PricingMediaSectionProps {
    isGenerating: Record<string, boolean>;
    generateAltText: (imageUrlField: string, altTextField: string) => void;
}

export function PricingMediaSection({ isGenerating, generateAltText }: PricingMediaSectionProps) {
    const { control, watch } = useFormContext();
    const minPrice = watch('priceRange.min');
    const maxPrice = watch('priceRange.max');

  return (
    <FormSection value="item-3" title="Pricing and Media" description="Set the property price range and add media assets.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
            control={control}
            name="priceRange.min"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Minimum Price</FormLabel>
                <FormControl><Input type="number" placeholder="e.g., 5000000" {...field} onChange={e => field.onChange(Number(e.target.value))}/></FormControl>
                 {minPrice > 0 && <FormDescription>{toWords(minPrice)}</FormDescription>}
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={control}
            name="priceRange.max"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Maximum Price</FormLabel>
                <FormControl><Input type="number" placeholder="e.g., 9000000" {...field} onChange={e => field.onChange(Number(e.target.value))}/></FormControl>
                {maxPrice > 0 && <FormDescription>{toWords(maxPrice)}</FormDescription>}
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={control}
            name="currency"
            render={({ field }) => (
                <FormItem className="md:col-span-2">
                <FormLabel>Currency Code</FormLabel>
                <FormControl><Input placeholder="e.g., INR" {...field} /></FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
         <div className="space-y-4 rounded-lg border p-4">
            <ImagePreviewInput 
              name="featuredImage" 
              label="Featured Image URL" 
              altFieldName="alt" 
              onGenerateAltText={generateAltText}
              isGenerating={isGenerating['alt']}
            />
        </div>
        <ImagePreviewInput name="masterPlan" label="Master Plan Image URL" />
    </FormSection>
  );
}
