import { randomUUID } from 'crypto';
import { aiService } from './aiService';
import type { IncidentResponse } from '@community-ai/shared';

// ── Types ─────────────────────────────────────────────────
export interface IncidentPayload {
  description: string;
  location: string;
  image?: string;
}

export class IncidentService {
  /**
   * Processes the received incident data and calls the AI service for analysis.
   * Note: No database storage is performed as per scaffold requirements.
   */
  public async processIncident(data: IncidentPayload): Promise<IncidentResponse> {
    const incidentId = randomUUID();

    try {
      const analysis = await aiService.analyzeIncident({
        description: data.description,
        location: data.location,
        image: data.image,
      });

      return {
        incidentId,
        analysis,
      };
    } catch (error) {
      // Gracefully handle Gemini failures
      return {
        status: 'analysis_failed',
      };
    }
  }
}
