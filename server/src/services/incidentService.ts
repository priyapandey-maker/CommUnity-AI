import { randomUUID } from 'crypto';
import { aiService } from './aiService';
import { KnowledgeService } from '../knowledge/knowledgeService';
import { decisionEngineService } from './decisionEngineService';
import type { IncidentResponse } from '@community-ai/shared';

// ── Types ─────────────────────────────────────────────────
export interface IncidentPayload {
  description: string;
  location: string;
  image?: string;
}

export class IncidentService {
  private knowledgeService = new KnowledgeService();

  /**
   * Processes the received incident data and calls the AI service for analysis.
   * Then runs the Evidence-to-Decision Pipeline (E2DP) deterministically.
   */
  public async processIncident(data: IncidentPayload): Promise<IncidentResponse> {
    const incidentId = randomUUID();

    try {
      const analysis = await aiService.analyzeIncident({
        description: data.description,
        location: data.location,
        image: data.image,
      });

      // E2DP Step 1: Enrich with knowledge context
      const context = await this.knowledgeService.getContext({
        ...analysis,
        location: data.location
      });

      // E2DP Step 2: Deterministic decision engine evaluation
      const decision = decisionEngineService.evaluate(context);

      return {
        incidentId,
        analysis,
        decision,
      };
    } catch (error) {
      // Gracefully handle Gemini failures
      return {
        status: 'analysis_failed',
      };
    }
  }
}

