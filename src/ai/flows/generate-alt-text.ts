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
  prompt: `You are an expert in generating descriptive and accessible alt text for images, especially for real estate listings. Your goal is to create alt text that is both useful for screen readers and optimized for SEO.

Analyze the provided image and use the property details to create concise and informative alt text.

**Image Analysis:**
{{media url=imageUrl}}

**Property Context:**
- **Property Name:** {{{propertyName}}}
- **Property Type:** {{{propertyType}}}
- **Location:** {{{propertyArea}}}

**Instructions:**
1.  Describe the main subject and setting of the image clearly.
2.  Incorporate relevant keywords from the property context, like the property name or type, if they are relevant to the image content.
3.  Keep it concise, ideally under 125 characters.
4.  Do not include "image of" or "picture of".

Generate the alt text based on these instructions.`,
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
