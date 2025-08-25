import { Accordion } from '@/components/ui/accordion';
import { FormSection } from '@/components/form-section';
import { SpecificationsBannerSection } from './detail-page/specifications/banner-section';
import { SpecificationsGallerySection } from './detail-page/specifications/gallery-section';
import { SpecificationsFaqSection } from './detail-page/specifications/faq-section';


interface PropertySpecificationsDetailPageSectionProps {
    generateId: (sectionName: string, fieldName: any) => void;
}

export function PropertySpecificationsDetailPageSection({ generateId }: PropertySpecificationsDetailPageSectionProps) {
  return (
    <FormSection value="item-13" title="Property Specifications Page" description="Content for the specifications detail page.">
      <Accordion type="single" collapsible className="w-full">
        <SpecificationsBannerSection />
        <SpecificationsGallerySection generateId={generateId} />
        <SpecificationsFaqSection generateId={generateId} />
      </Accordion>
    </FormSection>
  );
}
