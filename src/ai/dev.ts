import { config } from 'dotenv';
config();

import '@/ai/flows/generate-alt-text.ts';
import '@/ai/flows/generate-unique-id.ts';
import '@/ai/flows/generate-descriptions.ts';
import '@/ai/flows/ingest-content.ts';
