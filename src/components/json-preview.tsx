
'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { ClipboardCopy, Check, FileJson, Braces, Plus, Minus } from 'lucide-react';
import { useState, useMemo, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface JsonPreviewProps {
  data: unknown;
}

// A simple recursive function to format an object as a JS object string
function formatAsJSObject(obj: any): string {
    if (obj === null || typeof obj !== 'object') {
      return JSON.stringify(obj);
    }
  
    const entries = Object.entries(obj)
      .map(([key, value]) => {
        const formattedValue = formatAsJSObject(value);
        // Don't quote keys that are valid identifiers
        const formattedKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `"${key}"`;
        return `${formattedKey}: ${formattedValue}`;
      })
  
    if (Array.isArray(obj)) {
      return `[${entries.map(e => e.split(':')[1].trim()).join(', ')}]`;
    }
    return `{${entries.join(', ')}}`;
}

const JsonNode = ({
  nodeKey,
  value,
  isInitiallyOpen = true,
  isJson = true,
  level = 0,
  collapsedNodes,
  toggleNode
}: {
  nodeKey: string;
  value: any;
  isInitiallyOpen?: boolean;
  isJson?: boolean;
  level?: number;
  collapsedNodes: Set<string>;
  toggleNode: (path: string) => void;
}) => {
  const path = `${level}-${nodeKey}`;
  const isCollapsed = collapsedNodes.has(path);
  const isObject = typeof value === 'object' && value !== null;

  const handleToggle = () => {
    if (isObject) {
      toggleNode(path);
    }
  };

  const renderValue = () => {
    if (isCollapsed) {
      return Array.isArray(value) ? (
        <span className="text-syntax-bracket">[...]</span>
      ) : (
        <span className="text-syntax-bracket">{'{...}'}</span>
      );
    }
    if (value === null) return <span className="text-syntax-null">null</span>;
    if (typeof value === 'string') return <span className="text-syntax-string">{isJson ? `"${value}"` : `'${value}'`}</span>;
    if (typeof value === 'number') return <span className="text-syntax-number">{value}</span>;
    if (typeof value === 'boolean') return <span className="text-syntax-boolean">{String(value)}</span>;
    return null;
  };
  
  const keyClass = isJson ? "text-syntax-key" : "text-syntax-property";

  return (
    <div style={{ marginLeft: `${level * 1.5}rem` }}>
      <div className="flex items-center">
        {isObject && (
           <button onClick={handleToggle} className="mr-2 text-muted-foreground hover:text-foreground">
             {isCollapsed ? <Plus size={14} /> : <Minus size={14} />}
           </button>
        )}
        {nodeKey && <span className={cn(keyClass, 'mr-2')}>{isJson ? `"${nodeKey}":` : `${nodeKey}:`}</span>}
        
        {isObject ? (
            isCollapsed ? renderValue() : (
                <span className="text-syntax-bracket">{Array.isArray(value) ? '[' : '{'}</span>
            )
        ) : (
          renderValue()
        )}
      </div>

      {!isCollapsed && isObject && (
        <>
          {Object.entries(value).map(([key, childValue]) => (
            <JsonNode
              key={key}
              nodeKey={Array.isArray(value) ? "" : key}
              value={childValue}
              isInitiallyOpen={isInitiallyOpen}
              isJson={isJson}
              level={level + 1}
              collapsedNodes={collapsedNodes}
              toggleNode={toggleNode}
            />
          ))}
          <div style={{ marginLeft: `${level * 1.5}rem` }}>
            <span className="text-syntax-bracket">{Array.isArray(value) ? ']' : '}'}</span>
          </div>
        </>
      )}
    </div>
  );
};


export function JsonPreview({ data }: JsonPreviewProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState<'json' | 'js' | null>(null);
  const [collapsedNodes, setCollapsedNodes] = useState<Set<string>>(new Set());

  const jsonString = useMemo(() => (data ? JSON.stringify(data, null, 2) : null), [data]);
  const jsString = useMemo(() => (data ? formatAsJSObject(data) : null), [data]);

  const toggleNode = useCallback((path: string) => {
    setCollapsedNodes(prev => {
        const newSet = new Set(prev);
        if (newSet.has(path)) {
            newSet.delete(path);
        } else {
            newSet.add(path);
        }
        return newSet;
    });
  }, []);

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
        {data ? (
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
            <ScrollArea className="h-96 w-full rounded-md border bg-muted/40 p-4 font-code text-sm">
              <TabsContent value="json">
                <JsonNode nodeKey="" value={data} isJson={true} collapsedNodes={collapsedNodes} toggleNode={toggleNode} />
              </TabsContent>
              <TabsContent value="js">
                <JsonNode nodeKey="" value={data} isJson={false} collapsedNodes={collapsedNodes} toggleNode={toggleNode} />
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
