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
import { Eye, ImageIcon } from 'lucide-react';

interface ImagePreviewInputProps {
  name: string;
  label: string;
}

export function ImagePreviewInput({ name, label }: ImagePreviewInputProps) {
  const { control, watch } = useFormContext();
  const imageUrl = watch(name);

  return (
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
  );
}
