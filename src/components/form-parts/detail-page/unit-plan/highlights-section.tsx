import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormSection } from '@/components/form-section';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Trash } from 'lucide-react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { ImagePreviewInput } from '@/components/image-preview-input';

interface UnitPlanHighlightsSectionProps {
  generateAltText: (imageUrlField: string, altTextField: string) => void;
  isGenerating: Record<string, boolean>;
}

export function UnitPlanHighlightsSection({ generateAltText, isGenerating }: UnitPlanHighlightsSectionProps) {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "propertyUnitPlanDetailPage.propertyUnitHighlightsSection.highlightsSectionHighlights",
  });

  return (
    <FormSection value="sub-item-18" title="Unit Highlights Section">
      <FormField control={control} name="propertyUnitPlanDetailPage.propertyUnitHighlightsSection.highlightsSectionHeading" render={({ field }) => (<FormItem><FormLabel>Heading</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
      
      <div className="space-y-4">
        <h4 className="font-semibold">Highlights</h4>
        {fields.map((field, index) => (
          <div key={field.id} className="p-4 border rounded-md space-y-4">
            <div className="flex justify-between items-center">
              <h5 className="font-semibold">Highlight {index + 1}</h5>
              <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}><Trash /></Button>
            </div>
            <FormField control={control} name={`propertyUnitPlanDetailPage.propertyUnitHighlightsSection.highlightsSectionHighlights.${index}.name`} render={({ field }) => (<FormItem><FormLabel>Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={control} name={`propertyUnitPlanDetailPage.propertyUnitHighlightsSection.highlightsSectionHighlights.${index}.description`} render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
            <ImagesArray 
              name={`propertyUnitPlanDetailPage.propertyUnitHighlightsSection.highlightsSectionHighlights.${index}.image`} 
              generateAltText={generateAltText}
              isGenerating={isGenerating}
            />
          </div>
        ))}
        <Button type="button" variant="outline" onClick={() => append({ name: '', description: '', image: [] })}>Add Highlight</Button>
      </div>
    </FormSection>
  );
}

function ImagesArray({ name, generateAltText, isGenerating }: { name: string, generateAltText: (imageUrlField: string, altTextField: string) => void, isGenerating: Record<string, boolean> }) {
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
            <FormField control={control} name={`${name}.${index}.id`} render={({ field }) => (<FormItem><FormLabel>ID</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
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
