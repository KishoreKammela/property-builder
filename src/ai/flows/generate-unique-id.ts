'use server';

/**
 * @fileOverview This file defines a Genkit flow to generate unique, short, and SEO-friendly IDs
 *  for content sections based on property attributes.
 *
 * - generateUniqueId - A function that generates a unique ID.
 */

import {ai} from '@/ai/genkit';
import { GenerateUniqueIdInputSchema, GenerateUniqueIdOutputSchema, type GenerateUniqueIdInput } from '@/lib/schema';

export async function generateUniqueId(input: GenerateUniqueIdInput) {
  return generateUniqueIdFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateUniqueIdPrompt',
  input: {schema: GenerateUniqueIdInputSchema},
  output: {schema: GenerateUniqueIdOutputSchema},
  prompt: `You are an expert in generating SEO-friendly IDs for content sections of property listings.

  Given the property name and section name, generate a unique, short, and SEO-friendly ID.
  The ID should be lowercase, use hyphens instead of spaces, and should not contain any special characters other than hyphens.
  The ID should be concise and descriptive.

  Property Name: {{{propertyName}}}
  Section Name: {{{sectionName}}}

  Generated ID:`,
});

const generateUniqueIdFlow = ai.defineFlow(
  {
    name: 'generateUniqueIdFlow',
    inputSchema: GenerateUniqueIdInputSchema,
    outputSchema: GenerateUniqueIdOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return {
      uniqueId: output!.uniqueId.toLowerCase().replace(/[^a-z-]/g, '').replace(/^-+|-+$/g, ''),
    };
  }
);
