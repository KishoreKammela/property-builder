'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { ClipboardCopy, Check, FileJson, Braces } from 'lucide-react';
import { useState, useMemo } from 'react';

interface JsonPreviewProps {
  data: unknown;
}

// A simple recursive function to format an object as a JS object string
function formatAsJSObject(obj: any, indent = 2): string {
  if (obj === null || typeof obj !== 'object') {
    return JSON.stringify(obj);
  }

  const space = ' '.repeat(indent);
  const entries = Object.entries(obj)
    .map(([key, value]) => {
      const formattedValue = formatAsJSObject(value, indent + 2);
      // Don't quote keys that are valid identifiers
      const formattedKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `"${key}"`;
      return `${space}  ${formattedKey}: ${formattedValue}`;
    })
    .join(',\n');

  if (Array.isArray(obj)) {
    return `[\n${entries}\n${space}]`;
  }
  return `{\n${entries}\n${space}}`;
}


export function JsonPreview({ data }: JsonPreviewProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState<'json' | 'js' | null>(null);

  const jsonString = useMemo(() => (data ? JSON.stringify(data, null, 2) : null), [data]);
  const jsString = useMemo(() => (data ? formatAsJSObject(data) : null), [data]);

  const handleCopy = (type: 'json' | 'js') => {
    const stringToCopy = type === 'json' ? jsonString : jsString;
    if (stringToCopy) {
      navigator.clipboard.writeText(stringToCopy);
      setCopied(type);
      toast({
        title: `Copied to clipboard!`,
        description: `The ${type.toUpperCase()} data has been copied.`,
      });
      setTimeout(() => setCopied(null), 2000);
    }
  };

  return (
    <Card className="sticky top-8 shadow-lg">
      <CardHeader>
        <CardTitle>Generated Output</CardTitle>
        <CardDescription>
          Preview and copy the generated content in your desired format.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {jsonString ? (
          <Tabs defaultValue="json">
            <div className="flex justify-between items-center mb-2">
              <TabsList>
                <TabsTrigger value="json" className="flex items-center gap-2"><FileJson className="h-4 w-4"/> JSON</TabsTrigger>
                <TabsTrigger value="js" className="flex items-center gap-2"><Braces className="h-4 w-4"/> JavaScript</TabsTrigger>
              </TabsList>
               <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleCopy('json')}
                  title="Copy JSON"
                >
                  {copied === 'json' ? <Check className="h-4 w-4 text-green-500" /> : <ClipboardCopy className="h-4 w-4" />}
                </Button>
                 <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleCopy('js')}
                  title="Copy JS Object"
                >
                  {copied === 'js' ? <Check className="h-4 w-4 text-green-500" /> : <ClipboardCopy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <ScrollArea className="h-96 w-full rounded-md border bg-muted/40 p-4">
              <TabsContent value="json">
                <pre>
                  <code className="text-sm font-code">{jsonString}</code>
                </pre>
              </TabsContent>
              <TabsContent value="js">
                <pre>
                  <code className="text-sm font-code">{jsString}</code>
                </pre>
              </TabsContent>
            </ScrollArea>
          </Tabs>
        ) : (
          <div className="flex items-center justify-center h-96 rounded-md border border-dashed text-muted-foreground bg-muted/40">
            <p>Submit the form to see the generated output.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
