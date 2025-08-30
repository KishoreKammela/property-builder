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
  prompt: `You are an expert in generating SEO-friendly IDs for web content.

  Your task is to create a unique, short, and descriptive ID based on the provided property name and section name.
  
  **Instructions:**
  1.  **Format:** The ID must be in 'kebab-case'. This means all lowercase letters, with words separated by a single hyphen.
  2.  **No Special Characters:** The ID must not contain any special characters other than hyphens. No underscores, spaces, or punctuation.
  3.  **Concise:** Keep the ID as short and meaningful as possible.

  **Property Name:** {{{propertyName}}}
  **Section Name:** {{{sectionName}}}

  Generate the ID based on these rules.`,
});

const generateUniqueIdFlow = ai.defineFlow(
  {
    name: 'generateUniqueIdFlow',
    inputSchema: GenerateUniqueIdInputSchema,
    outputSchema: GenerateUniqueIdOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    // The model should already produce a clean ID, but we do a final cleanup just in case.
    const cleanedId = output!.uniqueId
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '') 
      .replace(/\s+/g, '-') 
      .replace(/-+/g, '-') 
      .replace(/^-+|-+$/g, '');

    return {
      uniqueId: cleanedId,
    };
  }
);
