'use client';

import { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PropertyForm } from '@/components/property-form';
import { JsonPreview } from '@/components/json-preview';
import type { Property } from '@/lib/types';
import { ThemeToggle } from '@/components/theme-toggle';
import { propertySchema } from '@/lib/schema';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import { defaultValues } from '@/data/property-data';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const LOCAL_STORAGE_KEY = 'property-form-autosave';

export default function Home() {
  const { toast } = useToast();
  const [isMounted, setIsMounted] = useState(false);

  const form = useForm<Property>({
    resolver: zodResolver(propertySchema),
    defaultValues,
    mode: 'onChange',
  });

  const watchedData = form.watch();

  // Load from localStorage on initial render
  useEffect(() => {
    setIsMounted(true);
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        form.reset(parsedData);
        toast({
          title: "Form Restored",
          description: "Your previous session has been restored.",
        });
      } catch (error) {
        console.error("Failed to parse saved form data:", error);
        localStorage.removeItem(LOCAL_STORAGE_KEY); // Clear corrupted data
        const now = new Date().toISOString();
        form.reset({ ...defaultValues, createdAt: now, updatedAt: now });
      }
    } else {
      const now = new Date().toISOString();
      form.reset({ ...defaultValues, createdAt: now, updatedAt: now });
    }
  }, [form, toast]);

  // Save to localStorage on change
  useEffect(() => {
    if (!isMounted) return;
    const subscription = form.watch((value) => {
      const now = new Date().toISOString();
      const dataToSave = { ...value, updatedAt: now };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToSave));
    });
    return () => subscription.unsubscribe();
  }, [form, isMounted]);


  const handleFormSubmit = (data: Property) => {
    toast({
      title: "Success!",
      description: "Property data has been validated and the preview is updated.",
    });
    console.log('Form Submitted:', data);
  };
  
  const handleReset = () => {
    form.reset(defaultValues);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    const now = new Date().toISOString();
    form.setValue('createdAt', now);
    form.setValue('updatedAt', now);
    toast({
        title: "Form Reset",
        description: "The form has been cleared.",
    });
  }

  return (
    <>
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      <main className="container mx-auto p-4 md:p-8">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-primary-600 dark:text-primary-400 font-headline">
            Property Content Generator
          </h1>
          <p className="mt-2 text-muted-foreground">
            Fill in the property details below to generate structured content for your listings.
          </p>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12">
          <div className="lg:pr-6">
            <FormProvider {...form}>
              <PropertyForm onFormSubmit={handleFormSubmit}>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button type="button" variant="outline">
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Reset Form
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently clear the form
                          and remove your data from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleReset}>Continue</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
              </PropertyForm>
            </FormProvider>
          </div>
          <div className="mt-8 lg:mt-0">
            <JsonPreview data={watchedData} />
          </div>
        </div>
      </main>
    </>
  );
}
