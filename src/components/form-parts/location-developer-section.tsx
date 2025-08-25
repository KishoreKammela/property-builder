import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FormSection } from '@/components/form-section';
import { useFormContext } from 'react-hook-form';

export function LocationDeveloperSection() {
    const { control } = useFormContext();
  return (
    <FormSection value="item-8" title="Location and Developer" description="Provide location and developer details.">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={control} name="address" render={({ field }) => ( <FormItem className="md:col-span-2"><FormLabel>Address</FormLabel><FormControl><Textarea placeholder="Full property address" {...field} /></FormControl><FormMessage /></FormItem> )} />
          <FormField control={control} name="coordinates.lat" render={({ field }) => ( <FormItem><FormLabel>Latitude</FormLabel><FormControl><Input type="number" placeholder="12.9715987" {...field} onChange={e => field.onChange(Number(e.target.value))}/></FormControl><FormMessage /></FormItem> )} />
          <FormField control={control} name="coordinates.lng" render={({ field }) => ( <FormItem><FormLabel>Longitude</FormLabel><FormControl><Input type="number" placeholder="77.594566" {...field} onChange={e => field.onChange(Number(e.target.value))}/></FormControl><FormMessage /></FormItem> )} />
          <FormField control={control} name="developer" render={({ field }) => ( <FormItem><FormLabel>Developer</FormLabel><FormControl><Input placeholder="e.g., Sattva Group" {...field} /></FormControl><FormMessage /></FormItem> )} />
          <FormField control={control} name="possession" render={({ field }) => ( <FormItem><FormLabel>Possession Year</FormLabel><FormControl><Input placeholder="e.g., 2026" {...field} /></FormControl><FormMessage /></FormItem> )} />
      </div>
  </FormSection>
  );
}
