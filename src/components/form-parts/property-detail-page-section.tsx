import { Accordion } from '@/components/ui/accordion';
import { FormSection } from '@/components/form-section';
import { BannerSection } from './detail-page/banner-section';
import { LocationConnectivitySection } from './detail-page/location-connectivity-section';
import { OverviewSection } from './detail-page/overview-section';
import { HighlightsSection } from './detail-page/highlights-section';
import { MasterPlanSection } from './detail-page/master-plan-section';
import { UnitPlansSection } from './detail-page/unit-plans-section';
import { PricingSection } from './detail-page/pricing-section';
import { SpecificationsSection as DetailSpecificationsSection } from './detail-page/specifications-section';
import { LocationSection } from './detail-page/location-section';
import { FaqSection } from './detail-page/faq-section';
import { PropertyAmenitiesSection } from './detail-page/amenities-section';

interface PropertyDetailPageSectionProps {
    generateId: (sectionName: string, fieldName: any) => void;
}

export function PropertyDetailPageSection({ generateId }: PropertyDetailPageSectionProps) {
  return (
    <FormSection value="item-9" title="Property Detail Page" description="Content for the main property detail page.">
      <Accordion type="single" collapsible className="w-full">
        <BannerSection generateId={generateId}/>
        <LocationConnectivitySection generateId={generateId} />
        <OverviewSection generateId={generateId} />
        <HighlightsSection generateId={generateId} />
        <MasterPlanSection />
        <UnitPlansSection generateId={generateId} />
        <PricingSection generateId={generateId} />
        <DetailSpecificationsSection />
        <LocationSection generateId={generateId} />
        <FaqSection generateId={generateId} />
        <PropertyAmenitiesSection generateId={generateId}/>
      </Accordion>
    </FormSection>
  );
}
