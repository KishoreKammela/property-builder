'use server';

/**
 * @fileOverview This file defines a Genkit flow for ingesting a block of text
 * and pre-filling the property data form.
 *
 * It exports:
 * - `ingestContent`: An async function that takes a string of draft content and returns a structured Property object.
 */

import { ai } from '@/ai/genkit';
import { propertySchema, IngestContentInputSchema, IngestContentOutputSchema, type IngestContentInput } from '@/lib/schema';

export async function ingestContent(input: IngestContentInput) {
  return ingestContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'ingestContentPrompt',
  input: { schema: IngestContentInputSchema },
  output: { schema: IngestContentOutputSchema },
  prompt: `You are an expert real estate data analyst. Your task is to parse the provided text content and structure it into a valid JSON object that conforms to the given schema.

  The user will provide a block of text that describes a property. Carefully read through the text and extract all relevant information to populate the fields in the JSON schema.
  
  **Important Instructions:**
  1.  **Extract Everything:** Be thorough. Extract every detail you can find, from basic info like name and address to nested details like amenities, floor plans, and specifications.
  2.  **Generate IDs:** For fields requiring an ID (like \`id\`, \`slug\`, \`floorPlans.id\`), generate a concise, lowercase, hyphen-separated ID based on the item's name or title.
  3.  **Handle Arrays:** Correctly parse lists of features, amenities, and other array-based fields.
  4.  **Default Values:** If a value is not present in the text, use a sensible default or leave it as an empty string/array as appropriate based on the schema. For required fields like \`name\` or \`id\`, do your best to infer a value.
  5.  **Timestamps**: For \`createdAt\` and \`updatedAt\`, use the current ISO 8601 timestamp.
  
  **Draft Content:**
  {{{draftContent}}}
  
  Now, generate the JSON object based on the schema and the provided content.`,
});

const ingestContentFlow = ai.defineFlow(
  {
    name: 'ingestContentFlow',
    inputSchema: IngestContentInputSchema,
    outputSchema: IngestContentOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    const now = new Date().toISOString();
    return {
      ...output!,
      createdAt: now,
      updatedAt: now,
    };
  }
);
