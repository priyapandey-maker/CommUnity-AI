export interface AnalyzeIncidentResult {
  issueType: string;
  severity: string;
  urgency: string;
  affectedAsset: string;
  possibleHazards: string[];
  confidenceReason: string;
  summary: string;
}

export interface IncidentApiResponse {
  incidentId: string;
  analysis: AnalyzeIncidentResult;
}

export interface IncidentFailedResponse {
  status: 'analysis_failed';
}

export type IncidentResponse = IncidentApiResponse | IncidentFailedResponse;
