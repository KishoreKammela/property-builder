'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating property descriptions.
 *
 * It exports:
 * - `generateDescriptions`: An async function that takes property details and returns a full and short description.
 * - `GenerateDescriptionsInput`: The input type for the `generateDescriptions` function.
 * - `GenerateDescriptionsOutput`: The output type for the `generateDescriptions` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDescriptionsInputSchema = z.object({
  propertyName: z.string().describe('The name of the property.'),
  propertyType: z.string().describe('The type of the property (e.g., apartment, villa).'),
  propertyArea: z.string().describe('The area where the property is located.'),
  features: z.array(z.string()).describe('A list of key features of the property.'),
  amenities: z.array(z.string()).describe('A list of amenities available at the property.'),
});
export type GenerateDescriptionsInput = z.infer<typeof GenerateDescriptionsInputSchema>;

const GenerateDescriptionsOutputSchema = z.object({
  description: z.string().describe('The generated full description for the property.'),
  shortDescription: z.string().describe('The generated short summary for the property.'),
});
export type GenerateDescriptionsOutput = z.infer<typeof GenerateDescriptionsOutputSchema>;

export async function generateDescriptions(input: GenerateDescriptionsInput): Promise<GenerateDescriptionsOutput> {
  return generateDescriptionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDescriptionsPrompt',
  input: {schema: GenerateDescriptionsInputSchema},
  output: {schema: GenerateDescriptionsOutputSchema},
  prompt: `You are an expert real estate copywriter. Your task is to generate a compelling, detailed, and a short, catchy description for a property based on the details provided.

  **Property Details:**
  - **Name:** {{{propertyName}}}
  - **Type:** {{{propertyType}}}
  - **Area:** {{{propertyArea}}}
  
  **Key Features:**
  {{#each features}}
  - {{{this}}}
  {{/each}}

  **Amenities:**
  {{#each amenities}}
  - {{{this}}}
  {{/each}}

  **Instructions:**
  1.  **Full Description:** Write a comprehensive and engaging description for a property listing page. It should be at least two paragraphs long. Highlight the unique selling points, the lifestyle offered, and the key features and amenities. Use persuasive and professional language.
  2.  **Short Description:** Write a concise and catchy summary of the property. This should be a single sentence or two, perfect for use in search results or listing previews.

  Generate the descriptions and provide them in the required output format.`,
});

const generateDescriptionsFlow = ai.defineFlow(
  {
    name: 'generateDescriptionsFlow',
    inputSchema: GenerateDescriptionsInputSchema,
    outputSchema: GenerateDescriptionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
