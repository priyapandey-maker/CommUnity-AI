export type DecisionPriority = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
export type DecisionReadiness = 'HIGH' | 'MEDIUM' | 'LOW';

export interface EvidenceFactor {
  factor: string;
  value: string;
  weight: number;
  source: 'analysis' | 'context';
}

export interface DecisionResult {
  priority: DecisionPriority;
  recommendation: string;
  alternatives: string[];
  evidence: EvidenceFactor[];
  decisionReadiness: DecisionReadiness;
  explanation: string;
}
