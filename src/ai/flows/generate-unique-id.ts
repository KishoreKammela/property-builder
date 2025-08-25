'use server';

/**
 * @fileOverview This file defines a Genkit flow to generate unique, short, and SEO-friendly IDs
 *  for content sections based on property attributes.
 *
 * - generateUniqueId - A function that generates a unique ID.
 * - GenerateUniqueIdInput - The input type for the generateUniqueId function.
 * - GenerateUniqueIdOutput - The return type for the generateUniqueId function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateUniqueIdInputSchema = z.object({
  propertyName: z.string().describe('The name of the property.'),
  sectionName: z.string().describe('The name of the content section.'),
});
export type GenerateUniqueIdInput = z.infer<typeof GenerateUniqueIdInputSchema>;

const GenerateUniqueIdOutputSchema = z.object({
  uniqueId: z.string().describe('The generated unique ID for the content section.'),
});
export type GenerateUniqueIdOutput = z.infer<typeof GenerateUniqueIdOutputSchema>;

export async function generateUniqueId(input: GenerateUniqueIdInput): Promise<GenerateUniqueIdOutput> {
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
      uniqueId: output!.uniqueId.toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-+|-+$/g, ''),
    };
  }
);
