import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormSection } from '@/components/form-section';
import { Loader2, Sparkles } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

interface PricingMediaSectionProps {
    isGeneratingAltText: boolean;
    generateAltText: () => void;
}

export function PricingMediaSection({ isGeneratingAltText, generateAltText }: PricingMediaSectionProps) {
    const { control, watch } = useFormContext();
  return (
    <FormSection value="item-3" title="Pricing and Media" description="Set the price and manage media assets.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
            control={control}
            name="priceRange.min"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Min Price</FormLabel>
                <FormControl><Input type="number" placeholder="e.g., 5000000" {...field} onChange={e => field.onChange(Number(e.target.value))}/></FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={control}
            name="priceRange.max"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Max Price</FormLabel>
                <FormControl><Input type="number" placeholder="e.g., 9000000" {...field} onChange={e => field.onChange(Number(e.target.value))}/></FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={control}
            name="currency"
            render={({ field }) => (
                <FormItem className="md:col-span-2">
                <FormLabel>Currency</FormLabel>
                <FormControl><Input placeholder="e.g., INR" {...field} /></FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
         <div className="space-y-4 rounded-lg border p-4">
            <FormField
                control={control}
                name="featuredImage"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Featured Image URL</FormLabel>
                    <FormControl>
                        <Input type="url" placeholder="https://example.com/image.png" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                <FormField
                control={control}
                name="alt"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Alt Text</FormLabel>
                    <FormControl>
                        <Input placeholder="Descriptive alt text for the image" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="button" onClick={generateAltText} disabled={isGeneratingAltText || !watch('featuredImage')} className="w-full md:w-auto">
                    {isGeneratingAltText ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                    Generate Alt Text
                </Button>
            </div>
        </div>
         <FormField
            control={control}
            name="masterPlan"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Master Plan Image URL</FormLabel>
                <FormControl>
                    <Input type="url" placeholder="https://example.com/master-plan.png" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
        />
    </FormSection>
  );
}
