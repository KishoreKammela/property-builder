import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormSection } from '@/components/form-section';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Trash } from 'lucide-react';
import { useFormContext, useFieldArray } from 'react-hook-form';

interface MasterPlanFeaturesSectionProps {
    generateId: (sectionName: string, fieldName: any) => void;
}

export function MasterPlanFeaturesSection({ generateId }: MasterPlanFeaturesSectionProps) {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "propertyMasterPlanDetailPage.propertyMasterPlanFeaturesSection.features",
  });

  return (
    <FormSection value="sub-item-13" title="Master Plan Features Section">
      <div className="space-y-4">
        <h4 className="font-semibold">Features</h4>
        {fields.map((field, index) => (
            <div key={field.id} className="p-4 border rounded-md space-y-4">
                <div className="flex justify-between items-center">
                <h5 className="font-semibold">Feature {index + 1}</h5>
                <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}><Trash /></Button>
                </div>
                <FormField control={control} name={`propertyMasterPlanDetailPage.propertyMasterPlanFeaturesSection.features.${index}.id`} render={({ field }) => (<FormItem><FormLabel>ID</FormLabel><div className="flex gap-2"><FormControl><Input {...field} /></FormControl><Button type="button" size="icon" variant="outline" onClick={() => generateId(`mp-feature-${index + 1}`, `propertyMasterPlanDetailPage.propertyMasterPlanFeaturesSection.features.${index}.id`)}><Sparkles /></Button></div><FormMessage /></FormItem>)} />
                <FormField control={control} name={`propertyMasterPlanDetailPage.propertyMasterPlanFeaturesSection.features.${index}.featuresSectionTittle`} render={({ field }) => (<FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={control} name={`propertyMasterPlanDetailPage.propertyMasterPlanFeaturesSection.features.${index}.featuresSectionFeaturesHeading`} render={({ field }) => (<FormItem><FormLabel>Features Heading</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={control} name={`propertyMasterPlanDetailPage.propertyMasterPlanFeaturesSection.features.${index}.featuresSectionAccessibilityHeading`} render={({ field }) => (<FormItem><FormLabel>Accessibility Heading</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={control} name={`propertyMasterPlanDetailPage.propertyMasterPlanFeaturesSection.features.${index}.featuresSectionDescription`} render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={control} name={`propertyMasterPlanDetailPage.propertyMasterPlanFeaturesSection.features.${index}.featuresSectionBannerImageUrl`} render={({ field }) => (<FormItem><FormLabel>Banner Image URL</FormLabel><FormControl><Input type="url" {...field} /></FormControl><FormMessage /></FormItem>)} />

                <FeaturesArray name={`propertyMasterPlanDetailPage.propertyMasterPlanFeaturesSection.features.${index}.featuresSectionFeatureRichSpaces`} label="Feature Rich Spaces" />
                <FeaturesArray name={`propertyMasterPlanDetailPage.propertyMasterPlanFeaturesSection.features.${index}.featuresSectionAccessibilityLayoutStrategies`} label="Accessibility Layout Strategies" />
            </div>
        ))}
        <Button type="button" variant="outline" onClick={() => append({ 
            id: '', 
            featuresSectionTittle: '', 
            featuresSectionFeaturesHeading: '', 
            featuresSectionAccessibilityHeading: '', 
            featuresSectionDescription: '', 
            featuresSectionBannerImageUrl: '',
            featuresSectionFeatureRichSpaces: [],
            featuresSectionAccessibilityLayoutStrategies: [],
        })}>Add Feature</Button>
      </div>
    </FormSection>
  );
}

function FeaturesArray({ name, label }: { name: string, label: string }) {
    const { control } = useFormContext();
    const { fields, append, remove } = useFieldArray({
      control,
      name,
    });
  
    return (
      <div className="space-y-2">
        <h5 className="font-medium">{label}</h5>
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-2">
            <FormField
              control={control}
              name={`${name}.${index}`}
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}><Trash /></Button>
          </div>
        ))}
        <Button type="button" variant="outline" onClick={() => append('')}>Add Item</Button>
      </div>
    );
  }