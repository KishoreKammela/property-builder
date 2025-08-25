import { Accordion } from '@/components/ui/accordion';
import { FormSection } from '@/components/form-section';
import { UnitPlanFloorPlanSection } from './detail-page/unit-plan/floor-plan-section';
import { UnitPlanDesignAndQualitySection } from './detail-page/unit-plan/design-quality-section';
import { UnitPlanSizesSection } from './detail-page/unit-plan/sizes-section';
import { UnitPlanHighlightsSection } from './detail-page/unit-plan/highlights-section';
import { UnitPlanFaqSection } from './detail-page/unit-plan/faq-section';

interface PropertyUnitPlanDetailPageSectionProps {
    generateId: (sectionName: string, fieldName: any) => void;
}

export function PropertyUnitPlanDetailPageSection({ generateId }: PropertyUnitPlanDetailPageSectionProps) {
  return (
    <FormSection value="item-11" title="Property Unit Plan Page" description="Content for the unit plan detail page.">
      <Accordion type="single" collapsible className="w-full">
        <UnitPlanFloorPlanSection generateId={generateId} />
        <UnitPlanDesignAndQualitySection generateId={generateId} />
        <UnitPlanSizesSection />
        <UnitPlanHighlightsSection />
        <UnitPlanFaqSection generateId={generateId} />
      </Accordion>
    </FormSection>
  );
}
