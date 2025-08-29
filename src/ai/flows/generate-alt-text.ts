'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating alt text for images based on property details.
 *
 * It exports:
 * - `generateAltText`: An async function that takes an image URL and property details and returns generated alt text.
 */

import {ai} from '@/ai/genkit';
import { GenerateAltTextInputSchema, GenerateAltTextOutputSchema, type GenerateAltTextInput } from '@/lib/schema';

export async function generateAltText(input: GenerateAltTextInput) {
  return generateAltTextFlow(input);
}

const generateAltTextPrompt = ai.definePrompt({
  name: 'generateAltTextPrompt',
  input: {schema: GenerateAltTextInputSchema},
  output: {schema: GenerateAltTextOutputSchema},
  prompt: `You are an expert in generating alt text for images. Given an image URL and property details, create descriptive and SEO-friendly alt text for the image.

Property Name: {{{propertyName}}}
Property Type: {{{propertyType}}}
Property Area: {{{propertyArea}}}
Image: {{media url=imageUrl}}

Alt Text:`,
});

const generateAltTextFlow = ai.defineFlow(
  {
    name: 'generateAltTextFlow',
    inputSchema: GenerateAltTextInputSchema,
    outputSchema: GenerateAltTextOutputSchema,
  },
  async input => {
    const {output} = await generateAltTextPrompt(input);
    return output!;
  }
);
