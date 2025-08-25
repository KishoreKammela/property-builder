'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating alt text for images based on property details.
 *
 * It exports:
 * - `generateAltText`: An async function that takes an image URL and property details and returns generated alt text.
 * - `GenerateAltTextInput`: The input type for the `generateAltText` function.
 * - `GenerateAltTextOutput`: The output type for the `generateAltText` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAltTextInputSchema = z.object({
  imageUrl: z
    .string()
    .describe(
      "The URL of the image for which alt text needs to be generated. Must be a data URI that includes a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  propertyName: z.string().describe('The name of the property.'),
  propertyType: z.string().describe('The type of the property (e.g., apartment, villa).'),
  propertyArea: z.string().describe('The area where the property is located.'),
});
export type GenerateAltTextInput = z.infer<typeof GenerateAltTextInputSchema>;

const GenerateAltTextOutputSchema = z.object({
  altText: z.string().describe('The generated alt text for the image.'),
});
export type GenerateAltTextOutput = z.infer<typeof GenerateAltTextOutputSchema>;

export async function generateAltText(input: GenerateAltTextInput): Promise<GenerateAltTextOutput> {
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
