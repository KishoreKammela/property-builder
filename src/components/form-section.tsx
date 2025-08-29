import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface FormSectionProps {
  value: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function FormSection({ value, title, description, children }: FormSectionProps) {
  return (
    <AccordionItem value={value} className="border-b-0 rounded-lg overflow-hidden bg-card shadow-sm transition-all">
      <AccordionTrigger className="p-6 hover:no-underline sticky top-0 z-10 bg-muted/50 data-[state=open]:bg-primary data-[state=open]:text-primary-foreground">
        <div className="text-left">
          <h3 className="text-lg font-medium">{title}</h3>
          {description && <p className="text-sm text-muted-foreground mt-1 data-[state=open]:text-primary-foreground/80">{description}</p>}
        </div>
      </AccordionTrigger>
      <AccordionContent className="p-6 pt-4">
        <div className="space-y-6">
          {children}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
