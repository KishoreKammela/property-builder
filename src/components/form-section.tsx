import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface FormSectionProps {
  value: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function FormSection({ value, title, description, children }: FormSectionProps) {
  return (
    <AccordionItem value={value} className="border-b-0 rounded-lg overflow-hidden bg-card shadow-sm">
      <AccordionTrigger className="p-6 hover:no-underline bg-muted/50">
        <div className="text-left">
          <h3 className="text-lg font-medium">{title}</h3>
          {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
        </div>
      </AccordionTrigger>
      <AccordionContent className="p-6 pt-2">
        <div className="space-y-6">
          {children}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
