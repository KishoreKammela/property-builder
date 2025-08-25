import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface FormSectionProps {
  value: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function FormSection({ value, title, description, children }: FormSectionProps) {
  return (
    <AccordionItem value={value}>
      <AccordionTrigger className="hover:no-underline">
        <div className="text-left">
          <h3 className="text-lg font-medium">{title}</h3>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="p-4 border-l-2 border-primary/20 bg-muted/20 rounded-r-lg space-y-6">
          {children}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
