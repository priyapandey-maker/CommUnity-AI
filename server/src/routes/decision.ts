import { Router } from 'express';
import { getDecision, evaluateDecision } from '../controllers/decisionController';

export const decisionRouter = Router();

decisionRouter.get('/:id', getDecision);
decisionRouter.post('/', evaluateDecision);
