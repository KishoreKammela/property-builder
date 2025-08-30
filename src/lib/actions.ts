'use server';

import { generateUniqueId as generateUniqueIdFlow } from '@/ai/flows/generate-unique-id';
import { generateAltText as generateAltTextFlow } from '@/ai/flows/generate-alt-text';
import { generateDescriptions as generateDescriptionsFlow } from '@/ai/flows/generate-descriptions';
import { ingestContent as ingestContentFlow } from '@/ai/flows/ingest-content';
import type { GenerateUniqueIdInput, GenerateAltTextInput, GenerateDescriptionsInput, IngestContentInput } from './schema';


export async function handleIdGeneration(input: GenerateUniqueIdInput) {
  try {
    const { uniqueId } = await generateUniqueIdFlow(input);
    return { success: true, id: uniqueId };
  } catch (error) {
    console.warn('AI ID generation failed. Falling back to simple slug generation.', error);
    // Fallback logic
    const fallbackId = `${input.propertyName}-${input.sectionName}`
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
    return { success: true, id: fallbackId };
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
    if (!dataUrl || dataUrl === "data:image/png;base64,") {
        return { success: false, error: 'Failed to fetch image from the provided URL.' };
    }
    const result = await generateAltTextFlow({ ...input, imageUrl: dataUrl });
    return { success: true, altText: result.altText };
  } catch (error) {
    console.warn('AI alt text generation failed. Falling back to basic template.', error);
    // Fallback logic
    const fallbackAltText = `Image of ${input.propertyName}, a ${input.propertyType} in ${input.propertyArea}`;
    return { success: true, altText: fallbackAltText };
  }
}

export async function handleDescriptionGeneration(input: GenerateDescriptionsInput) {
  try {
    const result = await generateDescriptionsFlow(input);
    return { success: true, ...result };
  } catch (error) {
    console.warn('AI description generation failed. Falling back to basic template.', error);
    // Fallback logic
    const shortDescription = `A premier ${input.propertyType} located in the heart of ${input.propertyArea}.`;
    const description = `Discover ${input.propertyName}, a premier ${input.propertyType} located in the heart of ${input.propertyArea}. This property features ${input.features.join(', ')} and offers world-class amenities such as ${input.amenities.join(', ')}.`;
    return { success: true, description, shortDescription };
  }
}

export async function handleContentIngestion(input: IngestContentInput) {
    try {
        const result = await ingestContentFlow(input);
        return { success: true, data: result };
    } catch (error) {
        console.error('Error ingesting content:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
        return { success: false, error: `Failed to ingest content. Reason: ${errorMessage}` };
    }
}
