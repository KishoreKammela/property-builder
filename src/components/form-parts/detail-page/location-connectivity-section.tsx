import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormSection } from '@/components/form-section';
import { Sparkles, Trash } from 'lucide-react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { ImagePreviewInput } from '@/components/image-preview-input';

interface LocationConnectivitySectionProps {
    generateId: (sectionName: string, fieldName: any) => void;
}

export function LocationConnectivitySection({ generateId }: LocationConnectivitySectionProps) {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "propertyDetailPage.propertyLocationAndConnectivitySection.locationTabs",
  });

  return (
    <FormSection value="sub-item-2" title="Location & Connectivity">
      <FormField control={control} name="propertyDetailPage.propertyLocationAndConnectivitySection.mainHeading" render={({ field }) => (<FormItem><FormLabel>Main Heading</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
      <FormField control={control} name="propertyDetailPage.propertyLocationAndConnectivitySection.locationText" render={({ field }) => (<FormItem><FormLabel>Location Text</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
      <ImagePreviewInput name="propertyDetailPage.propertyLocationAndConnectivitySection.locationImage" label="Location Image URL" />
      <FormField control={control} name="propertyDetailPage.propertyLocationAndConnectivitySection.locationLink" render={({ field }) => (<FormItem><FormLabel>Location Link</FormLabel><FormControl><Input type="url" {...field} /></FormControl><FormMessage /></FormItem>)} />
      <FormField control={control} name="propertyDetailPage.propertyLocationAndConnectivitySection.locationLinkText" render={({ field }) => (<FormItem><FormLabel>Location Link Text</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />

      <div className="space-y-4">
          <h4 className="font-semibold">Location Tabs</h4>
          {fields.map((field, index) => (
              <div key={field.id} className="p-4 border rounded-md space-y-4">
                   <div className="flex justify-between items-center">
                      <h5 className="font-semibold">Location Tab {index + 1}</h5>
                      <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}><Trash /></Button>
                  </div>
                  <FormField control={control} name={`propertyDetailPage.propertyLocationAndConnectivitySection.locationTabs.${index}.id`} render={({ field }) => (<FormItem><FormLabel>ID</FormLabel><div className="flex gap-2"><FormControl><Input {...field} /></FormControl><Button type="button" size="icon" variant="outline" onClick={() => generateId(`loc-tab-${index + 1}`, `propertyDetailPage.propertyLocationAndConnectivitySection.locationTabs.${index}.id`)}><Sparkles /></Button></div><FormMessage /></FormItem>)} />
                  <FormField control={control} name={`propertyDetailPage.propertyLocationAndConnectivitySection.locationTabs.${index}.tabName`} render={({ field }) => (<FormItem><FormLabel>Tab Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <ConnectivityArray name={`propertyDetailPage.propertyLocationAndConnectivitySection.locationTabs.${index}.connectivity`} parentIndex={index} />
              </div>
          ))}
          <Button type="button" variant="outline" onClick={() => append({id: '', tabName: '', connectivity: []})}>Add Location Tab</Button>
      </div>
   </FormSection>
  );
}

function ConnectivityArray({ name, parentIndex }: { name: string; parentIndex: number }) {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <div className="space-y-2 pl-4 border-l">
      <h5 className="font-medium">Connectivity Details</h5>
      {fields.map((field, index) => (
        <div key={field.id} className="p-3 border rounded-md space-y-2">
          <div className="flex justify-between items-center">
            <h6 className="font-semibold">Connectivity {index + 1}</h6>
            <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}><Trash className="h-4 w-4" /></Button>
          </div>
          <FormField control={control} name={`${name}.${index}.name`} render={({ field }) => (<FormItem><FormLabel>Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
          <FormField control={control} name={`${name}.${index}.time`} render={({ field }) => (<FormItem><FormLabel>Time</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
          <FormField control={control} name={`${name}.${index}.distance`} render={({ field }) => (<FormItem><FormLabel>Distance</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" onClick={() => append({ name: '', time: '', distance: '' })}>Add Connectivity Detail</Button>
    </div>
  );
}
