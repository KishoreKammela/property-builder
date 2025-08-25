import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FormSection } from '@/components/form-section';
import { useFormContext } from 'react-hook-form';

export function SpecificationsSection() {
    const { control } = useFormContext();
  return (
    <FormSection value="item-6" title="Specifications" description="Provide technical specifications.">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
          control={control}
          name="specifications.totalFloors"
          render={({ field }) => (
              <FormItem>
              <FormLabel>Total Floors</FormLabel>
              <FormControl><Input type="number" placeholder="e.g., 15" {...field} onChange={e => field.onChange(Number(e.target.value))}/></FormControl>
              <FormMessage />
              </FormItem>
          )}
          />
          <FormField
          control={control}
          name="specifications.totalUnits"
          render={({ field }) => (
              <FormItem>
              <FormLabel>Total Units</FormLabel>
              <FormControl><Input type="number" placeholder="e.g., 120" {...field} onChange={e => field.onChange(Number(e.target.value))}/></FormControl>
              <FormMessage />
              </FormItem>
          )}
          />
          <FormField
          control={control}
          name="specifications.constructionType"
          render={({ field }) => (
              <FormItem className="md:col-span-2">
              <FormLabel>Construction Type</FormLabel>
              <FormControl><Input placeholder="e.g., RCC Framed Structure" {...field} /></FormControl>
              <FormMessage />
              </FormItem>
          )}
          />
          <FormField control={control} name="specifications.launchDate" render={({ field }) => (<FormItem><FormLabel>Launch Date</FormLabel><FormControl><Input placeholder="e.g., 2024" {...field} /></FormControl><FormMessage /></FormItem>)} />
          <FormField control={control} name="specifications.possessionDate" render={({ field }) => (<FormItem><FormLabel>Possession Date</FormLabel><FormControl><Input placeholder="e.g., 2026" {...field} /></FormControl><FormMessage /></FormItem>)} />
          <FormField control={control} name="specifications.elevators" render={({ field }) => (<FormItem><FormLabel>Elevators</FormLabel><FormControl><Input type="number" placeholder="e.g., 2" {...field} onChange={e => field.onChange(Number(e.target.value))}/></FormControl><FormMessage /></FormItem>)} />
          <FormField control={control} name="specifications.parkingRatio" render={({ field }) => (<FormItem><FormLabel>Parking Ratio</FormLabel><FormControl><Input placeholder="e.g., 1:1" {...field} /></FormControl><FormMessage /></FormItem>)} />
          <FormField
              control={control}
              name="specifications.approvals"
              render={({ field }) => (
                  <FormItem className="md:col-span-2">
                  <FormLabel>Approvals (comma-separated)</FormLabel>
                  <FormControl>
                      <Input 
                      placeholder="e.g., RERA,BDA,BESCOM" 
                      {...field} 
                      value={Array.isArray(field.value) ? field.value.join(',') : ''}
                      onChange={e => field.onChange(e.target.value.split(','))}
                      />
                  </FormControl>
                  <FormMessage />
                  </FormItem>
              )}
          />
      </div>
  </FormSection>
  );
}
