import type {
  DecisionResult,
  DecisionPriority,
  DecisionReadiness,
  EvidenceFactor,
} from '@community-ai/shared';
import type { EnrichedIncidentContext } from '../knowledge/knowledgeService';

export class DecisionEngineService {
  /**
   * Main entry point for the Evidence-to-Decision Pipeline (E2DP).
   * Completely deterministic rule-based evaluation. No AI involved.
   */
  public evaluate(context: EnrichedIncidentContext): DecisionResult {
    const evidence = this.collectEvidence(context);
    const totalScore = evidence.reduce((sum, e) => sum + e.weight, 0);

    const priority = this.determinePriority(totalScore);
    const recommendation = this.generateRecommendation(priority, context);
    const alternatives = this.generateAlternatives(priority, context);
    const decisionReadiness = this.assessReadiness(evidence);
    const explanation = this.buildExplanation(evidence, priority);

    return {
      priority,
      recommendation,
      alternatives,
      evidence,
      decisionReadiness,
      explanation,
    };
  }

  private collectEvidence(context: EnrichedIncidentContext): EvidenceFactor[] {
    const evidence: EvidenceFactor[] = [];
    const { analysis, operationalContext } = context;

    // --- Analysis Factors ---

    // Severity (weight: Critical=40, High=30, Medium=20, Low=10)
    let sevWeight = 0;
    const sev = (analysis.severity || '').toLowerCase();
    if (sev.includes('critical')) sevWeight = 40;
    else if (sev.includes('high')) sevWeight = 30;
    else if (sev.includes('medium')) sevWeight = 20;
    else if (sev.includes('low')) sevWeight = 10;
    
    if (sevWeight > 0) {
      evidence.push({ factor: 'severity', value: analysis.severity, weight: sevWeight, source: 'analysis' });
    }

    // Urgency (weight: Immediate/Critical=40, High=30, Medium=20, Low=10)
    let urgWeight = 0;
    const urg = (analysis.urgency || '').toLowerCase();
    if (urg.includes('immediate') || urg.includes('critical')) urgWeight = 40;
    else if (urg.includes('high')) urgWeight = 30;
    else if (urg.includes('medium')) urgWeight = 20;
    else if (urg.includes('low')) urgWeight = 10;

    if (urgWeight > 0) {
      evidence.push({ factor: 'urgency', value: analysis.urgency, weight: urgWeight, source: 'analysis' });
    }

    // Hazards (weight: min(count * 5, 25))
    const hazardCount = analysis.possibleHazards ? analysis.possibleHazards.length : 0;
    const hazardWeight = Math.min(hazardCount * 5, 25);
    evidence.push({ factor: 'hazardCount', value: `${hazardCount} hazards`, weight: hazardWeight, source: 'analysis' });

    // --- Context Factors ---

    // School Zone (weight: 20)
    if (operationalContext.schoolZone !== undefined) {
      evidence.push({ 
        factor: 'schoolZone', 
        value: String(operationalContext.schoolZone), 
        weight: operationalContext.schoolZone ? 20 : 0, 
        source: 'context' 
      });
    }

    // Recent Rain (weight: 10)
    if (operationalContext.recentRain !== undefined) {
      evidence.push({ 
        factor: 'recentRain', 
        value: String(operationalContext.recentRain), 
        weight: operationalContext.recentRain ? 10 : 0, 
        source: 'context' 
      });
    }

    // Maintenance History (weight: min(history * 5, 15))
    if (operationalContext.maintenanceHistory !== undefined) {
      evidence.push({ 
        factor: 'maintenanceHistory', 
        value: `${operationalContext.maintenanceHistory} times`, 
        weight: Math.min(operationalContext.maintenanceHistory * 5, 15), 
        source: 'context' 
      });
    }

    // Crew Available (weight: 0) - informational
    if (operationalContext.crewAvailable !== undefined) {
      evidence.push({ 
        factor: 'crewAvailable', 
        value: String(operationalContext.crewAvailable), 
        weight: 0, 
        source: 'context' 
      });
    }

    // Critical Infrastructure (weight: 15)
    if (operationalContext.criticalInfrastructure !== undefined) {
      evidence.push({ 
        factor: 'criticalInfrastructure', 
        value: String(operationalContext.criticalInfrastructure), 
        weight: operationalContext.criticalInfrastructure ? 15 : 0, 
        source: 'context' 
      });
    }

    return evidence;
  }

  private determinePriority(score: number): DecisionPriority {
    if (score >= 80) return 'CRITICAL';
    if (score >= 55) return 'HIGH';
    if (score >= 30) return 'MEDIUM';
    return 'LOW';
  }

  private generateRecommendation(priority: DecisionPriority, context: EnrichedIncidentContext): string {
    const isSchool = context.operationalContext.schoolZone;
    const isCritical = context.operationalContext.criticalInfrastructure;
    const hasRain = context.operationalContext.recentRain;

    if (priority === 'CRITICAL') {
      return "Dispatch emergency crew immediately; cordon affected area";
    }
    
    if (priority === 'HIGH') {
      if (isSchool) return "Prioritize repair before school hours; deploy safety barriers";
      if (isCritical) return "Schedule urgent repair within 24 hours; activate backup systems";
      return "Schedule urgent repair within 24 hours";
    }

    if (priority === 'MEDIUM') {
      if (hasRain) return "Monitor for weather-related deterioration; schedule repair within 72 hours";
      return "Schedule routine maintenance within 1 week";
    }

    return "Add to routine maintenance backlog";
  }

  private generateAlternatives(priority: DecisionPriority, context: EnrichedIncidentContext): string[] {
    const alternatives: string[] = [];
    const noCrew = !context.operationalContext.crewAvailable;

    if (priority === 'CRITICAL' || priority === 'HIGH') {
      alternatives.push("Request mutual aid or contractor support if internal capacity is exceeded");
      if (noCrew) {
        alternatives.push("Deploy temporary automated warnings and redirect traffic immediately");
      }
    } else if (priority === 'MEDIUM') {
      alternatives.push("Downgrade to LOW if visual inspection confirms stability");
      alternatives.push("Escalate to HIGH if conditions worsen in the next 48 hours");
    } else {
      alternatives.push("Monitor periodically during regular patrols");
    }

    return alternatives;
  }

  private assessReadiness(evidence: EvidenceFactor[]): DecisionReadiness {
    // We expect 8 factors (3 analysis + 5 context)
    const expected = 8;
    // Count factors that have a valid 'value' and are not just defaults or missing
    const validCount = evidence.filter(e => e.value && e.value !== 'undefined' && e.value !== '0 hazards').length;
    
    const percentage = validCount / expected;
    if (percentage >= 0.8) return 'HIGH';
    if (percentage >= 0.5) return 'MEDIUM';
    return 'LOW';
  }

  private buildExplanation(evidence: EvidenceFactor[], priority: DecisionPriority): string {
    const significantFactors = evidence
      .filter(e => e.weight > 0)
      .sort((a, b) => b.weight - a.weight);

    if (significantFactors.length === 0) {
      return `Priority is set to ${priority} due to lack of significant weighted evidence.`;
    }

    const factorStrings = significantFactors.map(e => `${e.factor} (${e.value}, weight: ${e.weight})`);
    
    return `Priority evaluated as ${priority} driven primarily by: ${factorStrings.join(', ')}.`;
  }
}

export const decisionEngineService = new DecisionEngineService();
