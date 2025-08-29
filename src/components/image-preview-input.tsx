import { useFormContext } from 'react-hook-form';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Button } from './ui/button';
import { Eye, ImageIcon, Loader2, Sparkles } from 'lucide-react';

interface ImagePreviewInputProps {
  name: string;
  label: string;
  altFieldName?: string;
  onGenerateAltText?: (imageUrlField: string, altTextField: string) => void;
  isGenerating?: boolean;
}

export function ImagePreviewInput({ name, label, altFieldName, onGenerateAltText, isGenerating }: ImagePreviewInputProps) {
  const { control, watch } = useFormContext();
  const imageUrl = watch(name);

  const handleGenerateClick = () => {
    if (onGenerateAltText && altFieldName) {
      onGenerateAltText(name, altFieldName);
    }
  }

  return (
    <div className='grid gap-2'>
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <div className="flex items-center gap-2">
            <FormControl>
              <Input type="url" placeholder="https://example.com/image.png" {...field} />
            </FormControl>
            {imageUrl && typeof imageUrl === 'string' && imageUrl.startsWith('http') && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="icon" className="flex-shrink-0">
                    <Eye className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <DialogHeader>
                    <DialogTitle>Image Preview</DialogTitle>
                  </DialogHeader>
                  <div className="relative mt-4 flex h-96 w-full items-center justify-center bg-muted">
                    <Image
                      src={imageUrl}
                      alt="Preview"
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
     {altFieldName && (
        <FormField
          control={control}
          name={altFieldName}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alt Text</FormLabel>
              <div className="flex gap-2 items-start">
                <FormControl>
                  <Input placeholder="Descriptive alt text for the image" {...field} />
                </FormControl>
                {onGenerateAltText && (
                   <Button type="button" onClick={handleGenerateClick} disabled={isGenerating || !imageUrl} className="w-auto" size="icon">
                    {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                  </Button>
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
}
