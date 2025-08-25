'use client';

import { useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { handleAltTextGeneration } from '@/lib/actions';
import Image from 'next/image';

interface ImageUploadProps {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  altField: string;
}

const fileToDataUri = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });


export function ImageUpload({ form, name, label, altField }: ImageUploadProps) {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const imageUrl = form.watch(name);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const dataUri = await fileToDataUri(file);
        form.setValue(name, dataUri, { shouldValidate: true });
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to read file.',
        });
      }
    }
  };

  const generateAltText = async () => {
    if (!imageUrl) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please upload an image first.',
      });
      return;
    }

    setIsGenerating(true);
    const result = await handleAltTextGeneration({
      imageUrl,
      propertyName: form.getValues('name') || 'Property',
      propertyType: form.getValues('type') || 'real estate',
      propertyArea: form.getValues('area') || 'location',
    });
    setIsGenerating(false);

    if (result.success && result.altText) {
      form.setValue(altField, result.altText, { shouldValidate: true });
      toast({
        title: 'Alt Text Generated',
        description: 'Successfully generated alt text for the image.',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error,
      });
    }
  };

  return (
    <div className="space-y-4 rounded-lg border p-4">
        <FormLabel>{label}</FormLabel>
        {imageUrl && <Image src={imageUrl} alt="Uploaded preview" width={200} height={100} className="rounded-md object-cover" />}
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
            <FormItem>
                <FormLabel className="sr-only">{label} URL</FormLabel>
                <FormControl>
                    <Input type="file" accept="image/*" onChange={handleFileChange} />
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
        />
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
            <FormField
            control={form.control}
            name={altField}
            render={({ field }) => (
                <FormItem>
                <FormLabel>Alt Text</FormLabel>
                <FormControl>
                    <Input placeholder="Descriptive alt text" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <Button type="button" onClick={generateAltText} disabled={isGenerating || !imageUrl} className="w-full md:w-auto">
                {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                Generate Alt Text
            </Button>
        </div>

    </div>
  );
}
