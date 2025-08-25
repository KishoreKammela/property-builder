'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { ClipboardCopy, Check } from 'lucide-react';
import { useState } from 'react';

interface JsonPreviewProps {
  data: unknown;
}

export function JsonPreview({ data }: JsonPreviewProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const jsonString = data ? JSON.stringify(data, null, 2) : null;

  const handleCopy = () => {
    if (jsonString) {
      navigator.clipboard.writeText(jsonString);
      setCopied(true);
      toast({
        title: 'Copied to clipboard!',
        description: 'The JSON data has been copied.',
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Card className="sticky top-8">
      <CardHeader>
        <CardTitle>JSON Output</CardTitle>
        <CardDescription>
          This is the generated JSON based on your form input.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <ScrollArea className="h-96 w-full rounded-md border p-4 bg-muted/20">
            {jsonString ? (
              <pre>
                <code className="text-sm font-code">{jsonString}</code>
              </pre>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <p>Submit the form to see the JSON output.</p>
              </div>
            )}
          </ScrollArea>
          {jsonString && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8"
              onClick={handleCopy}
            >
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <ClipboardCopy className="h-4 w-4" />}
              <span className="sr-only">Copy JSON</span>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
