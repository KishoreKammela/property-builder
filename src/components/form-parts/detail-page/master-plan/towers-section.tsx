import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormSection } from '@/components/form-section';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Trash } from 'lucide-react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { ImagePreviewInput } from '@/components/image-preview-input';

interface MasterPlanTowersSectionProps {
    generateId: (sectionName: string, fieldName: any) => void;
    generateAltText: (imageUrlField: string, altTextField: string) => void;
    isGenerating: Record<string, boolean>;
}

export function MasterPlanTowersSection({ generateId, generateAltText, isGenerating }: MasterPlanTowersSectionProps) {
  const { control } = useFormContext();
  const { fields: sliderImages, append: appendSliderImage, remove: removeSliderImage } = useFieldArray({ control, name: "propertyMasterPlanDetailPage.propertyMasterPlanTowersSection.towerSectionSliderImages" });
  const { fields: tableDetails, append: appendTableDetail, remove: removeTableDetail } = useFieldArray({ control, name: "propertyMasterPlanDetailPage.propertyMasterPlanTowersSection.towerSectionTableDetails" });
  const { fields: amenityPoints, append: appendAmenityPoint, remove: removeAmenityPoint } = useFieldArray({ control, name: "propertyMasterPlanDetailPage.propertyMasterPlanTowersSection.towerSectionAmenitiesPoints" });
  const { fields: unitSizes, append: appendUnitSize, remove: removeUnitSize } = useFieldArray({ control, name: "propertyMasterPlanDetailPage.propertyMasterPlanTowersSection.towerSectionUnitsSizes" });

  return (
    <FormSection value="sub-item-12" title="Master Plan Towers Section">
      <FormField control={control} name="propertyMasterPlanDetailPage.propertyMasterPlanTowersSection.towerSectionHeading" render={({ field }) => (<FormItem><FormLabel>Heading</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
      <FormField control={control} name="propertyMasterPlanDetailPage.propertyMasterPlanTowersSection.towerSectionDescription" render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
      <FormField control={control} name="propertyMasterPlanDetailPage.propertyMasterPlanTowersSection.towerSectionAmenitiesHeading" render={({ field }) => (<FormItem><FormLabel>Amenities Heading</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
      <FormField control={control} name="propertyMasterPlanDetailPage.propertyMasterPlanTowersSection.towerSectionUnitSizesHeading" render={({ field }) => (<FormItem><FormLabel>Unit Sizes Heading</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
      <FormField control={control} name="propertyMasterPlanDetailPage.propertyMasterPlanTowersSection.towerSectionUnitSizesSubHeading" render={({ field }) => (<FormItem><FormLabel>Unit Sizes Subheading</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
      <FormField control={control} name="propertyMasterPlanDetailPage.propertyMasterPlanTowersSection.towerSectionTableDescription" render={({ field }) => (<FormItem><FormLabel>Table Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
      
      <div className="space-y-4">
        <h4 className="font-semibold">Slider Images</h4>
        {sliderImages.map((field, index) => (
          <div key={field.id} className="p-4 border rounded-md space-y-4">
            <div className="flex justify-between items-center">
              <h5 className="font-semibold">Image {index + 1}</h5>
              <Button type="button" variant="destructive" size="icon" onClick={() => removeSliderImage(index)}><Trash /></Button>
            </div>
            <FormField control={control} name={`propertyMasterPlanDetailPage.propertyMasterPlanTowersSection.towerSectionSliderImages.${index}.id`} render={({ field }) => (<FormItem><FormLabel>ID</FormLabel><div className="flex gap-2"><FormControl><Input {...field} /></FormControl><Button type="button" size="icon" variant="outline" onClick={() => generateId(`tower-slider-${index + 1}`, `propertyMasterPlanDetailPage.propertyMasterPlanTowersSection.towerSectionSliderImages.${index}.id`)}><Sparkles /></Button></div><FormMessage /></FormItem>)} />
            <ImagePreviewInput 
                name={`propertyMasterPlanDetailPage.propertyMasterPlanTowersSection.towerSectionSliderImages.${index}.src`}
                label="Image URL"
                altFieldName={`propertyMasterPlanDetailPage.propertyMasterPlanTowersSection.towerSectionSliderImages.${index}.alt`}
                onGenerateAltText={generateAltText}
                isGenerating={isGenerating[`propertyMasterPlanDetailPage.propertyMasterPlanTowersSection.towerSectionSliderImages.${index}.alt`]}
            />
          </div>
        ))}
        <Button type="button" variant="outline" onClick={() => appendSliderImage({ id: '', src: '', alt: '' })}>Add Slider Image</Button>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold">Table Details</h4>
        {tableDetails.map((field, index) => (
          <div key={field.id} className="p-4 border rounded-md space-y-4">
            <div className="flex justify-between items-center">
              <h5 className="font-semibold">Tower Detail {index + 1}</h5>
              <Button type="button" variant="destructive" size="icon" onClick={() => removeTableDetail(index)}><Trash /></Button>
            </div>
            <FormField control={control} name={`propertyMasterPlanDetailPage.propertyMasterPlanTowersSection.towerSectionTableDetails.${index}.towerRange`} render={({ field }) => (<FormItem><FormLabel>Tower Range</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={control} name={`propertyMasterPlanDetailPage.propertyMasterPlanTowersSection.towerSectionTableDetails.${index}.floors`} render={({ field }) => (<FormItem><FormLabel>Floors</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={control} name={`propertyMasterPlanDetailPage.propertyMasterPlanTowersSection.towerSectionTableDetails.${index}.specialFeature`} render={({ field }) => (<FormItem><FormLabel>Special Feature</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
          </div>
        ))}
        <Button type="button" variant="outline" onClick={() => appendTableDetail({ towerRange: '', floors: '', specialFeature: '' })}>Add Tower Detail</Button>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold">Amenity Points</h4>
        {amenityPoints.map((field, index) => (
          <div key={field.id} className="p-4 border rounded-md space-y-4">
            <div className="flex justify-between items-center">
              <h5 className="font-semibold">Amenity Point {index + 1}</h5>
              <Button type="button" variant="destructive" size="icon" onClick={() => removeAmenityPoint(index)}><Trash /></Button>
            </div>
            <FormField control={control} name={`propertyMasterPlanDetailPage.propertyMasterPlanTowersSection.towerSectionAmenitiesPoints.${index}.description`} render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
          </div>
        ))}
        <Button type="button" variant="outline" onClick={() => appendAmenityPoint({ description: '' })}>Add Amenity Point</Button>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold">Unit Sizes</h4>
        {unitSizes.map((field, index) => (
          <div key={field.id} className="p-4 border rounded-md space-y-4">
            <div className="flex justify-between items-center">
              <h5 className="font-semibold">Unit Size {index + 1}</h5>
              <Button type="button" variant="destructive" size="icon" onClick={() => removeUnitSize(index)}><Trash /></Button>
            </div>
            <FormField control={control} name={`propertyMasterPlanDetailPage.propertyMasterPlanTowersSection.towerSectionUnitsSizes.${index}.type`} render={({ field }) => (<FormItem><FormLabel>Type</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={control} name={`propertyMasterPlanDetailPage.propertyMasterPlanTowersSection.towerSectionUnitsSizes.${index}.sizeRange`} render={({ field }) => (<FormItem><FormLabel>Size Range</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
          </div>
        ))}
        <Button type="button" variant="outline" onClick={() => appendUnitSize({ type: '', sizeRange: '' })}>Add Unit Size</Button>
      </div>
    </FormSection>
  );
}
