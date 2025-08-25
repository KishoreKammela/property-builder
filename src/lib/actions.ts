'use server';

import { generateUniqueId as generateUniqueIdFlow, type GenerateUniqueIdInput } from '@/ai/flows/generate-unique-id';
import { generateAltText as generateAltTextFlow, type GenerateAltTextInput } from '@/ai/flows/generate-alt-text';

export async function handleIdGeneration(input: GenerateUniqueIdInput) {
  try {
    const { uniqueId } = await generateUniqueIdFlow(input);
    // Adhere to the user rule of no numbers, only lowercase letters and hyphens
    const filteredId = uniqueId
      .toLowerCase()
      .replace(/[^a-z-]/g, '') // remove numbers and other special characters
      .replace(/^-+|-+$/g, ''); // trim hyphens
    return { success: true, id: filteredId };
  } catch (error) {
    console.error('Error generating unique ID:', error);
    return { success: false, error: 'Failed to generate ID.' };
  }
}

export async function handleAltTextGeneration(input: GenerateAltTextInput) {
  try {
    const result = await generateAltTextFlow(input);
    return { success: true, altText: result.altText };
  } catch (error) {
    console.error('Error generating alt text:', error);
    return { success: false, error: 'Failed to generate alt text.' };
  }
}
