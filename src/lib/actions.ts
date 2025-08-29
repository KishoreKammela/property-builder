'use server';

import { generateUniqueId as generateUniqueIdFlow } from '@/ai/flows/generate-unique-id';
import { generateAltText as generateAltTextFlow } from '@/ai/flows/generate-alt-text';
import { generateDescriptions as generateDescriptionsFlow } from '@/ai/flows/generate-descriptions';
import { ingestContent as ingestContentFlow } from '@/ai/flows/ingest-content';
import type { GenerateUniqueIdInput, GenerateAltTextInput, GenerateDescriptionsInput, IngestContentInput } from './schema';


export async function handleIdGeneration(input: GenerateUniqueIdInput) {
  try {
    const { uniqueId } = await generateUniqueIdFlow(input);
    const filteredId = uniqueId
      .toLowerCase()
      .replace(/[^a-z-]/g, '')
      .replace(/^-+|-+$/g, '');
    return { success: true, id: filteredId };
  } catch (error) {
    console.error('Error generating unique ID:', error);
    return { success: false, error: 'Failed to generate ID.' };
  }
}

async function imageUrlToDataUrl(url: string): Promise<string> {
    if (url.startsWith('data:')) {
        return url;
    }
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.warn(`Failed to fetch image, returning placeholder: ${response.statusText}`);
            return "data:image/png;base64,";
        }
        const contentType = response.headers.get('content-type') || 'image/png';
        const buffer = await response.arrayBuffer();
        const base64 = Buffer.from(buffer).toString('base64');
        return `data:${contentType};base64,${base64}`;
    } catch (error) {
        console.warn(`Error fetching image, returning placeholder:`, error);
        return "data:image/png;base64,";
    }
}


export async function handleAltTextGeneration(input: Omit<GenerateAltTextInput, 'imageUrl'> & { imageUrl: string }) {
  try {
    const dataUrl = await imageUrlToDataUrl(input.imageUrl);
    const result = await generateAltTextFlow({ ...input, imageUrl: dataUrl });
    return { success: true, altText: result.altText };
  } catch (error) {
    console.error('Error generating alt text:', error);
    return { success: false, error: 'Failed to generate alt text.' };
  }
}

export async function handleDescriptionGeneration(input: GenerateDescriptionsInput) {
  try {
    const result = await generateDescriptionsFlow(input);
    return { success: true, ...result };
  } catch (error) {
    console.error('Error generating descriptions:', error);
    return { success: false, error: 'Failed to generate descriptions.' };
  }
}

export async function handleContentIngestion(input: IngestContentInput) {
    try {
        const result = await ingestContentFlow(input);
        return { success: true, data: result };
    } catch (error) {
        console.error('Error ingesting content:', error);
        return { success: false, error: 'Failed to ingest content from the provided text.' };
    }
}
