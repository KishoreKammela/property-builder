import { Accordion } from '@/components/ui/accordion';
import { FormSection } from '@/components/form-section';
import { AmenitiesAccordionSection } from './detail-page/amenities/accordion-section';
import { AmenitiesGallerySection } from './detail-page/amenities/gallery-section';
import { AmenitiesFaqSection } from './detail-page/amenities/faq-section';

interface PropertyAmenitiesDetailPageSectionProps {
    generateId: (sectionName: string, fieldName: any) => void;
    generateAltText: (imageUrlField: string, altTextField: string) => void;
    isGenerating: Record<string, boolean>;
}

export function PropertyAmenitiesDetailPageSection({ generateId, generateAltText, isGenerating }: PropertyAmenitiesDetailPageSectionProps) {
  return (
    <FormSection value="item-12" title="Property Amenities Page" description="Content for the amenities detail page.">
      <Accordion type="single" collapsible className="w-full">
        <AmenitiesAccordionSection generateId={generateId} generateAltText={generateAltText} isGenerating={isGenerating} />
        <AmenitiesGallerySection generateId={generateId} generateAltText={generateAltText} isGenerating={isGenerating} />
        <AmenitiesFaqSection generateId={generateId} />
      </Accordion>
    </FormSection>
  );
}
