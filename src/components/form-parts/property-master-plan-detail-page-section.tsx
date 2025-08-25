import { Accordion } from '@/components/ui/accordion';
import { FormSection } from '@/components/form-section';
import { MasterPlanBannerSection } from './detail-page/master-plan/banner-section';
import { MasterPlanTowersSection } from './detail-page/master-plan/towers-section';
import { MasterPlanFeaturesSection } from './detail-page/master-plan/features-section';
import { MasterPlanFaqSection } from './detail-page/master-plan/faq-section';


interface PropertyMasterPlanDetailPageSectionProps {
    generateId: (sectionName: string, fieldName: any) => void;
}

export function PropertyMasterPlanDetailPageSection({ generateId }: PropertyMasterPlanDetailPageSectionProps) {
  return (
    <FormSection value="item-10" title="Property Master Plan Page" description="Content for the master plan detail page.">
      <Accordion type="single" collapsible className="w-full">
        <MasterPlanBannerSection generateId={generateId} />
        <MasterPlanTowersSection generateId={generateId} />
        <MasterPlanFeaturesSection generateId={generateId} />
        <MasterPlanFaqSection generateId={generateId} />
      </Accordion>
    </FormSection>
  );
}
