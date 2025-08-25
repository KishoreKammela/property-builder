import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormSection } from '@/components/form-section';
import { Button } from '../ui/button';
import { Sparkles } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

interface BasicInfoSectionProps {
    generateId: (sectionName: string, fieldName: any) => void;
}

export function BasicInfoSection({ generateId }: BasicInfoSectionProps) {
    const { control } = useFormContext();
  return (
    <FormSection value="item-1" title="Basic Property Information" description="Provide the main details for the property listing.">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Property Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Sattva City Prestige Residence" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Property ID</FormLabel>
              <div className="flex gap-2">
                <FormControl>
                  <Input placeholder="e.g., sattva-city-residence" {...field} />
                </FormControl>
                 <Button type="button" size="icon" variant="outline" onClick={() => generateId('property', 'id')}><Sparkles /></Button>
              </div>
              <FormDescription>Unique identifier for this property (lowercase, no spaces).</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL Slug</FormLabel>
               <div className="flex gap-2">
                <FormControl>
                  <Input placeholder="e.g., sattva-city-residence" {...field} />
                </FormControl>
                 <Button type="button" size="icon" variant="outline" onClick={() => generateId('slug', 'slug')}><Sparkles /></Button>
              </div>
              <FormDescription>URL-friendly version of the name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl><Input placeholder="e.g., Bangalore" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="area"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Area / Neighborhood</FormLabel>
              <FormControl><Input placeholder="e.g., North Bangalore" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Property Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a property type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Property Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select property status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                  <SelectItem value="ready">Ready to Move</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </FormSection>
  );
}
