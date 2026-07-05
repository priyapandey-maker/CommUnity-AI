import { GoogleGenAI, Type } from '@google/genai';
import type { AnalyzeIncidentResult } from '@community-ai/shared';
import { INCIDENT_UNDERSTANDING_SYSTEM_PROMPT } from '../prompts/incidentUnderstanding';

// ── Simple Logger ─────────────────────────────────────────
// ── Simple Logger ─────────────────────────────────────────
const aiLogger = {
  info: (msg: string, meta?: Record<string, unknown>) => {
    console.log(`[AI INFO] ${msg}`, meta ? JSON.stringify(meta) : '');
  },
  error: (msg: string, err?: unknown) => {
    console.error(`[AI ERROR] ${msg}`, err instanceof Error ? err.message : err);
  },
};

// ── Types ─────────────────────────────────────────────────
export interface AnalyzeIncidentParams {
  description: string;
  location: string;
  /**
   * Optional base64 encoded image string (e.g. data:image/jpeg;base64,...)
   */
  image?: string;
}

// ── Service ───────────────────────────────────────────────
export class AIService {
  private ai: GoogleGenAI;
  private readonly TIMEOUT_MS = 30000;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      aiLogger.error('GEMINI_API_KEY is missing from the environment variables.');
    }
    
    // The SDK defaults to using process.env.GEMINI_API_KEY
    this.ai = new GoogleGenAI(apiKey ? { apiKey } : {});
  }

  /**
   * Analyzes the given incident using Gemini 2.5 Flash and returns parsed JSON.
   */
  public async analyzeIncident(params: AnalyzeIncidentParams): Promise<AnalyzeIncidentResult> {
    aiLogger.info('Starting incident analysis', { location: params.location, hasImage: !!params.image });

    try {
      // 1. Prepare contents
      const contents: Array<Record<string, unknown>> = [
        { text: `Description: ${params.description}\nLocation: ${params.location}` }
      ];

      // 2. Handle optional image
      if (params.image) {
        // Strip data URL prefix if present and extract mime type
        const base64Data = params.image.replace(/^data:image\/\w+;base64,/, '');
        
        let mimeType = 'image/jpeg'; // Default fallback
        const mimeMatch = params.image.match(/^data:(image\/\w+);base64,/);
        if (mimeMatch) {
          mimeType = mimeMatch[1];
        }

        contents.unshift({
          inlineData: {
            data: base64Data,
            mimeType: mimeType,
          }
        });
      }

      // 3. Define the structured output schema
      const config = {
        systemInstruction: INCIDENT_UNDERSTANDING_SYSTEM_PROMPT,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            issueType: {
              type: Type.STRING,
              description: 'The primary classification of the incident',
            },
            severity: {
              type: Type.STRING,
              description: 'The severity of the incident (e.g., Low, Medium, High, Critical)',
            },
            urgency: {
              type: Type.STRING,
              description: 'The urgency of the incident (e.g., Low, Medium, High, Immediate)',
            },
            affectedAsset: {
              type: Type.STRING,
              description: 'The physical asset or infrastructure affected',
            },
            possibleHazards: {
              type: Type.ARRAY,
              description: 'List of potential safety hazards identified',
              items: { type: Type.STRING }
            },
            confidenceReason: {
              type: Type.STRING,
              description: 'Reasoning behind the severity and urgency assessments',
            },
            summary: {
              type: Type.STRING,
              description: 'A concise summary of the incident',
            },
          },
          required: ['issueType', 'severity', 'urgency', 'affectedAsset', 'possibleHazards', 'confidenceReason', 'summary'],
        },
      };

      // 4. Execute the call with a timeout
      const aiPromise = this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: contents,
        config: config,
      });

      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('AI Request timed out')), this.TIMEOUT_MS);
      });

      const response = await Promise.race([aiPromise, timeoutPromise]);

      if (!response.text) {
        throw new Error('No text returned from Gemini API');
      }

      // 5. Parse the JSON result
      const parsedResult: AnalyzeIncidentResult = JSON.parse(response.text);
      
      aiLogger.info('Incident analysis completed successfully', { issueType: parsedResult.issueType, severity: parsedResult.severity });
      
      return parsedResult;

    } catch (error: unknown) {
      aiLogger.error('Failed to analyze incident', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`AI Analysis failed: ${errorMessage}`);
    }
  }
}

export const aiService = new AIService();

