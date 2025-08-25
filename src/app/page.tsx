'use client';

import { useState } from 'react';
import { PropertyForm } from '@/components/property-form';
import { JsonPreview } from '@/components/json-preview';
import type { Property } from '@/lib/types';
import { ThemeToggle } from '@/components/theme-toggle';

export default function Home() {
  const [generatedJson, setGeneratedJson] = useState<Property | null>(null);

  const handleFormSubmit = (data: Property) => {
    setGeneratedJson(data);
    console.log('Form Submitted:', data);
  };

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
          <PropertyForm onFormSubmit={handleFormSubmit} />
        </div>
        <div className="mt-8 lg:mt-0">
          <JsonPreview data={generatedJson} />
        </div>
      </div>
    </main>
    </>
  );
}
