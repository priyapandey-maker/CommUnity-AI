import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  PageContainer,
  Card,
  SectionTitle,
  Badge,
  Spinner,
  PrimaryButton,
} from '@/components';
import { getDecision, DecisionResponse, parseApiError } from '@/services';

// ── Icons ──────────────────────────────────────────────────

function AlertCircleIcon() {
  return (
    <svg className="w-8 h-8 text-red-500" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.213 15M21 21v-5h-.581m0 0a8.003 8.003 0 01-15.357-2" />
    </svg>
  );
}

function CheckShieldIcon() {
  return (
    <svg className="w-6 h-6 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}

function DocumentReportIcon() {
  return (
    <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

function LightningBoltIcon() {
  return (
    <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}

// ── Helpers for badge coloring ────────────────────────────

function getPriorityBadgeVariant(priority: string) {
  const p = priority.toUpperCase();
  if (p === 'CRITICAL') return 'error';
  if (p === 'HIGH') return 'warning';
  if (p === 'MEDIUM') return 'info';
  return 'success';
}

function getReadinessBadgeVariant(readiness: string) {
  const r = readiness.toUpperCase();
  if (r === 'HIGH') return 'success';
  if (r === 'MEDIUM') return 'warning';
  return 'error';
}

// ── Component ─────────────────────────────────────────────

export default function DecisionPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [decision, setDecision] = useState<DecisionResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDecision = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      // NOTE: getDecision via GET is now properly supported if you implement a database.
      // For now we might just be showing this via state transfer in a real app,
      // but assuming the backend returns the decision by ID if implemented.
      const data = await getDecision(id);
      setDecision(data);
    } catch (err) {
      const parsed = parseApiError(err);
      setError(parsed.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDecision();
  }, [fetchDecision]);

  return (
    <PageContainer as="div" maxWidth="xl" className="py-8 min-h-screen flex flex-col justify-between">
      <div>
        {/* Navigation Breadcrumb */}
        <header className="mb-8 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white transition-colors duration-200 focus-ring rounded-lg p-1.5"
          >
            <ArrowLeftIcon />
            Back to Dashboard
          </button>
          {decision && (
            <Badge variant="primary" size="md">
              E2DP Complete
            </Badge>
          )}
        </header>

        {/* Section Heading */}
        <SectionTitle
          badge="Evidence-to-Decision Pipeline"
          title={`Decision Record #${id ?? '—'}`}
          subtitle="Deterministic evaluation based on AI analysis and operational knowledge context."
          gradient
          align="left"
          className="mb-8"
        />

        {/* LOADING STATE */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4 animate-fade-in">
            <Spinner size="xl" color="primary" label="Evaluating evidence..." />
            <p className="text-slate-400 text-sm font-medium">Running Deterministic Decision Engine...</p>
          </div>
        )}

        {/* ERROR STATE */}
        {!loading && error && (
          <Card variant="glass" padding="lg" className="border-red-900/50 bg-red-950/10 max-w-2xl mx-auto text-center py-12 animate-scale-in">
            <div className="flex justify-center mb-4">
              <AlertCircleIcon />
            </div>
            <h3 className="text-xl font-bold text-red-200 font-display mb-2">
              Failed to Load Decision
            </h3>
            <p className="text-sm text-red-400 mb-6 max-w-md mx-auto leading-relaxed">
              {error === 'Not Implemented' 
                ? 'The AI analysis endpoint is currently not implemented on the server (returned 501).'
                : error}
            </p>
            <div className="flex justify-center gap-3">
              <PrimaryButton size="md" onClick={fetchDecision} className="bg-red-600 hover:bg-red-500">
                <RefreshIcon />
                Retry Request
              </PrimaryButton>
            </div>
          </Card>
        )}

        {/* SUCCESS STATE */}
        {!loading && !error && decision && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-scale-in">
            
            {/* Left Column: Recommendation & Alternatives */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              
              {/* Primary Recommendation Card */}
              <Card variant="glass" padding="lg" className="relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
                
                <h3 className="text-lg font-bold text-slate-100 font-display mb-3 flex items-center gap-2">
                  <CheckShieldIcon />
                  Primary Action Recommendation
                </h3>
                <div className="flex items-center gap-4 mb-4">
                  <Badge variant={getPriorityBadgeVariant(decision.priority)} size="md">
                    {decision.priority} PRIORITY
                  </Badge>
                  <Badge variant={getReadinessBadgeVariant(decision.decisionReadiness)} size="md" dot>
                    Readiness: {decision.decisionReadiness}
                  </Badge>
                </div>
                <p className="text-slate-100 font-medium text-lg leading-relaxed bg-surface-1 p-5 rounded-xl border border-line">
                  {decision.recommendation}
                </p>
                {decision.explanation && (
                  <div className="mt-4">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                      Deterministic Reasoning
                    </h4>
                    <p className="text-sm text-slate-400 italic bg-surface-2/50 p-3 rounded-lg border border-line">
                      "{decision.explanation}"
                    </p>
                  </div>
                )}
              </Card>

              {/* Alternatives Card */}
              <Card variant="default" padding="lg">
                <h3 className="text-lg font-bold text-slate-200 font-display mb-4 flex items-center gap-2">
                  <LightningBoltIcon />
                  Alternative Actions
                </h3>
                {decision.alternatives && decision.alternatives.length > 0 ? (
                  <ul className="space-y-3">
                    {decision.alternatives.map((alt, index) => (
                      <li key={index} className="flex items-start gap-3 bg-surface-2/30 p-3 rounded-lg border border-line">
                        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                        <span className="text-sm text-slate-300">{alt}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-slate-500">No alternatives generated.</p>
                )}
              </Card>
            </div>

            {/* Right Column: Evidence Table */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              
              <Card variant="default" padding="lg" className="flex flex-col gap-4">
                <h3 className="text-md font-bold text-slate-300 font-display border-b border-line pb-2 mb-1 flex items-center gap-2">
                  <DocumentReportIcon />
                  Evidence Factors
                </h3>
                
                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                  {decision.evidence && decision.evidence.map((ev, idx) => (
                    <div key={idx} className="bg-surface-3 p-3 rounded-xl border border-line relative overflow-hidden">
                      {/* Source Indicator Line */}
                      <div className={`absolute left-0 top-0 bottom-0 w-1 ${ev.source === 'analysis' ? 'bg-indigo-500' : 'bg-emerald-500'}`} />
                      
                      <div className="ml-2">
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            {ev.factor}
                          </span>
                          <span className="text-xs font-bold text-slate-500 bg-surface-1 px-1.5 py-0.5 rounded">
                            W: {ev.weight}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-slate-200 break-words">
                          {ev.value}
                        </p>
                        <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider">
                          Source: {ev.source}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {(!decision.evidence || decision.evidence.length === 0) && (
                    <p className="text-sm text-slate-500 text-center py-4">No evidence collected.</p>
                  )}
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* Footer copyright section */}
      <footer className="mt-12 pt-6 border-t border-line text-center text-xs text-slate-600">
        CommUnity AI — E2DP Deterministic Engine powered by Google Cloud.
      </footer>
    </PageContainer>
  );
}
