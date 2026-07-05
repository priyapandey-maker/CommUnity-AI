import { Request, Response, NextFunction } from 'express';
import { KnowledgeService } from '../knowledge/knowledgeService';
import { decisionEngineService } from '../services/decisionEngineService';
import type { IncidentAnalysisInput } from '../knowledge/knowledgeService';

const knowledgeService = new KnowledgeService();

export const getDecision = (_req: Request, res: Response): void => {
  res.status(501).json({ message: 'Not Implemented' });
};

export const evaluateDecision = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const analysis: IncidentAnalysisInput = req.body;

    if (!analysis || !analysis.issueType || !analysis.severity) {
      res.status(400).json({ error: 'Valid analysis payload is required.' });
      return;
    }

    const context = await knowledgeService.getContext(analysis);
    const decision = decisionEngineService.evaluate(context);

    res.status(200).json(decision);
  } catch (error) {
    next(error);
  }
};

