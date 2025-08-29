import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormSection } from '@/components/form-section';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Trash } from 'lucide-react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { ImagePreviewInput } from '@/components/image-preview-input';

interface AmenitiesGallerySectionProps {
    generateId: (sectionName: string, fieldName: any) => void;
    generateAltText: (imageUrlField: string, altTextField: string) => void;
    isGenerating: Record<string, boolean>;
}

export function AmenitiesGallerySection({ generateId, generateAltText, isGenerating }: AmenitiesGallerySectionProps) {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "propertyAmenitiesDetailPage.propertyAmenitiesGalleryShowCaseArea",
  });

  return (
    <FormSection value="sub-item-21" title="Amenities Gallery Section">
        <div className="space-y-4">
            <h4 className="font-semibold">Gallery Showcase Areas</h4>
            {fields.map((field, index) => (
                <div key={field.id} className="p-4 border rounded-md space-y-4">
                    <div className="flex justify-between items-center">
                        <h5 className="font-semibold">Showcase Area {index + 1}</h5>
                        <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}><Trash /></Button>
                    </div>
                    <FormField control={control} name={`propertyAmenitiesDetailPage.propertyAmenitiesGalleryShowCaseArea.${index}.id`} render={({ field }) => (<FormItem><FormLabel>ID</FormLabel><div className="flex gap-2"><FormControl><Input {...field} /></FormControl><Button type="button" size="icon" variant="outline" onClick={() => generateId(`amenity-gallery-${index + 1}`, `propertyAmenitiesDetailPage.propertyAmenitiesGalleryShowCaseArea.${index}.id`)}><Sparkles /></Button></div><FormMessage /></FormItem>)} />
                    <FormField control={control} name={`propertyAmenitiesDetailPage.propertyAmenitiesGalleryShowCaseArea.${index}.amenitiesGalleryTitle`} render={({ field }) => (<FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={control} name={`propertyAmenitiesDetailPage.propertyAmenitiesGalleryShowCaseArea.${index}.amenitiesGalleryDescription`} render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={control} name={`propertyAmenitiesDetailPage.propertyAmenitiesGalleryShowCaseArea.${index}.amenitiesGallerySecondHeading`} render={({ field }) => (<FormItem><FormLabel>Second Heading</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                    
                    <StringArrayField name={`propertyAmenitiesDetailPage.propertyAmenitiesGalleryShowCaseArea.${index}.amenitiesGalleryAttractions`} label="Attractions" />
                    <StringArrayField name={`propertyAmenitiesDetailPage.propertyAmenitiesGalleryShowCaseArea.${index}.communityAmenities`} label="Community Amenities" />
                    <ImagesArray name={`propertyAmenitiesDetailPage.propertyAmenitiesGalleryShowCaseArea.${index}.amenitiesGallerySlideImages`} generateId={generateId} generateAltText={generateAltText} isGenerating={isGenerating} parentIndex={index} />
                </div>
            ))}
            <Button type="button" variant="outline" onClick={() => append({ id: '', amenitiesGalleryTitle: '', amenitiesGalleryDescription: '', amenitiesGalleryAttractions: [], amenitiesGallerySlideImages: [], amenitiesGallerySecondHeading: '', communityAmenities: [] })}>Add Showcase Area</Button>
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

function ImagesArray({ name, generateId, generateAltText, isGenerating, parentIndex }: { name: string, generateId: Function, generateAltText: (imageUrlField: string, altTextField: string) => void, isGenerating: Record<string, boolean>, parentIndex: number }) {
    const { control } = useFormContext();
    const { fields, append, remove } = useFieldArray({
      control,
      name,
    });
  
    return (
      <div className="space-y-2">
        <h5 className="font-medium">Images</h5>
        {fields.map((field, index) => (
          <div key={field.id} className="p-4 border rounded-md space-y-4">
             <div className="flex justify-between items-center">
                <h6 className="font-semibold">Image {index + 1}</h6>
                <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}><Trash /></Button>
            </div>
            <FormField control={control} name={`${name}.${index}.id`} render={({ field }) => (<FormItem><FormLabel>ID</FormLabel><div className="flex gap-2"><FormControl><Input {...field} /></FormControl><Button type="button" size="icon" variant="outline" onClick={() => generateId(`gallery-${parentIndex + 1}-img-${index + 1}`, `${name}.${index}.id`)}><Sparkles /></Button></div><FormMessage /></FormItem>)} />
            <ImagePreviewInput 
              name={`${name}.${index}.src`} 
              label="Source URL"
              altFieldName={`${name}.${index}.alt`}
              onGenerateAltText={generateAltText}
              isGenerating={isGenerating[`${name}.${index}.alt`]}
            />
          </div>
        ))}
        <Button type="button" variant="outline" onClick={() => append({ id: '', src: '', alt: ''})}>Add Image</Button>
      </div>
    );
  }
