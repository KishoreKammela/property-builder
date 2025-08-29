import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormSection } from '@/components/form-section';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Trash } from 'lucide-react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { ImagePreviewInput } from '@/components/image-preview-input';

interface HighlightsSectionProps {
    generateId: (sectionName: string, fieldName: any) => void;
    generateAltText: (imageUrlField: string, altTextField: string) => void;
    isGenerating: Record<string, boolean>;
}

export function HighlightsSection({ generateId, generateAltText, isGenerating }: HighlightsSectionProps) {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "propertyDetailPage.propertyHighlightsSection.propertyHighlights",
  });

  return (
    <FormSection value="sub-item-4" title="Highlights Section">
      <FormField control={control} name="propertyDetailPage.propertyHighlightsSection.propertyHighlightsTitle" render={({ field }) => (<FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
      <FormField control={control} name="propertyDetailPage.propertyHighlightsSection.propertyHighlightsDescription" render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
      <div className="space-y-4">
          <h4 className="font-semibold">Highlights</h4>
          {fields.map((field, index) => (
              <div key={field.id} className="p-4 border rounded-md space-y-4">
                   <div className="flex justify-between items-center">
                      <h5 className="font-semibold">Highlight {index + 1}</h5>
                      <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}><Trash /></Button>
                  </div>
                  <FormField control={control} name={`propertyDetailPage.propertyHighlightsSection.propertyHighlights.${index}.highlightId`} render={({ field }) => (<FormItem><FormLabel>ID</FormLabel><div className="flex gap-2"><FormControl><Input {...field} /></FormControl><Button type="button" size="icon" variant="outline" onClick={() => generateId(`highlight-${index + 1}`, `propertyDetailPage.propertyHighlightsSection.propertyHighlights.${index}.highlightId`)}><Sparkles /></Button></div><FormMessage /></FormItem>)} />
                  <ImagePreviewInput 
                    name={`propertyDetailPage.propertyHighlightsSection.propertyHighlights.${index}.highlightImageUrl`} 
                    label="Image URL" 
                    altFieldName={`propertyDetailPage.propertyHighlightsSection.propertyHighlights.${index}.alt`}
                    onGenerateAltText={generateAltText}
                    isGenerating={isGenerating[`propertyDetailPage.propertyHighlightsSection.propertyHighlights.${index}.alt`]}
                    />
                  <FormField control={control} name={`propertyDetailPage.propertyHighlightsSection.propertyHighlights.${index}.highlightDescription`} render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
              </div>
          ))}
          <Button type="button" variant="outline" onClick={() => append({highlightId: '', highlightImageUrl: '', highlightDescription: ''})}>Add Highlight</Button>
      </div>
   </FormSection>
  );
}
