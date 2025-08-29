import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormSection } from '@/components/form-section';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Trash } from 'lucide-react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { ImagePreviewInput } from '@/components/image-preview-input';

interface SpecificationsGallerySectionProps {
    generateId: (sectionName: string, fieldName: any) => void;
}

export function SpecificationsGallerySection({ generateId }: SpecificationsGallerySectionProps) {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "propertySpecificationsDetailPage.propertySpecificationsGalleryShowCaseArea",
  });

  return (
    <FormSection value="sub-item-24" title="Specifications Gallery Section">
        <div className="space-y-4">
            <h4 className="font-semibold">Gallery Showcase Areas</h4>
            {fields.map((field, index) => (
                <div key={field.id} className="p-4 border rounded-md space-y-4">
                    <div className="flex justify-between items-center">
                        <h5 className="font-semibold">Showcase Area {index + 1}</h5>
                        <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}><Trash /></Button>
                    </div>
                    <FormField control={control} name={`propertySpecificationsDetailPage.propertySpecificationsGalleryShowCaseArea.${index}.id`} render={({ field }) => (<FormItem><FormLabel>ID</FormLabel><div className="flex gap-2"><FormControl><Input {...field} /></FormControl><Button type="button" size="icon" variant="outline" onClick={() => generateId(`spec-gallery-${index + 1}`, `propertySpecificationsDetailPage.propertySpecificationsGalleryShowCaseArea.${index}.id`)}><Sparkles /></Button></div><FormMessage /></FormItem>)} />
                    <FormField control={control} name={`propertySpecificationsDetailPage.propertySpecificationsGalleryShowCaseArea.${index}.specificationsGalleryTitle`} render={({ field }) => (<FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={control} name={`propertySpecificationsDetailPage.propertySpecificationsGalleryShowCaseArea.${index}.specificationsGalleryDescription`} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <ImagePreviewInput name={`propertySpecificationsDetailPage.propertySpecificationsGalleryShowCaseArea.${index}.specificationsGalleryImageUrl`} label="Image URL" />

                    <StringArrayField name={`propertySpecificationsDetailPage.propertySpecificationsGalleryShowCaseArea.${index}.specificationsGalleryFeatures`} label="Features" />
                </div>
            ))}
            <Button type="button" variant="outline" onClick={() => append({ id: '', specificationsGalleryTitle: '', specificationsGalleryDescription: '', specificationsGalleryImageUrl: '', specificationsGalleryFeatures: [] })}>Add Showcase Area</Button>
        </div>
    </FormSection>
  );
}

function StringArrayField({ name, label }: { name: string, label: string }) {
    const { control } = useFormContext();
  
    return (
      <div className="space-y-2">
        <h5 className="font-medium">{label}</h5>
        <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">{label}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter items separated by commas"
                  {...field}
                  value={Array.isArray(field.value) ? field.value.join(', ') : ''}
                  onChange={e => {
                    const values = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                    field.onChange(values);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    );
  }
