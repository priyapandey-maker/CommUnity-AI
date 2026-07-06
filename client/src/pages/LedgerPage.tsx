import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader, Button, Badge, Spinner } from '@/components';
import { getLedger, LedgerEntry, parseApiError } from '@/services';

// ── Stat icons ────────────────────────────────────────────

function DecisionsIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function HighPriorityIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  );
}

function ActiveIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  );
}

function ReadinessIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}

// ── Helpers ───────────────────────────────────────────────

const getPriorityBadgeVariant = (p: string) => {
  const priority = p.toUpperCase();
  if (priority === 'CRITICAL' || priority === 'HIGH') return 'error' as const;
  if (priority === 'MEDIUM') return 'warning' as const;
  return 'default' as const;
};

const getReadinessBadgeVariant = (r: string) => {
  const readiness = r.toUpperCase();
  if (readiness === 'HIGH') return 'success' as const;
  if (readiness === 'MEDIUM') return 'warning' as const;
  return 'default' as const;
};

const formatTimestamp = (isoString: string) => {
  try {
    return new Date(isoString).toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return '—';
  }
};

// ── Component ─────────────────────────────────────────────

export default function LedgerPage() {
  const navigate = useNavigate();
  const [ledger, setLedger]   = useState<LedgerEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError]     = useState<string | null>(null);

  const fetchLedger = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getLedger();
      setLedger(data);
    } catch (err) {
      const parsed = parseApiError(err);
      setError(parsed.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLedger(); }, []);

  const totalDecisions = ledger.length;
  const criticalCount  = ledger.filter(e => e.priority === 'CRITICAL' || e.priority === 'HIGH').length;
  const activeCount    = ledger.filter(e => e.status === 'received').length;

  const LEDGER_STATS = [
    { label: 'Total Decisions', value: totalDecisions.toString(), icon: <DecisionsIcon />, color: 'text-primary-600 dark:text-primary-400', bg: 'bg-primary-50 dark:bg-primary-950' },
    { label: 'High Priority',   value: criticalCount.toString(),  icon: <HighPriorityIcon />, color: 'text-red-600 dark:text-red-400',     bg: 'bg-red-50 dark:bg-red-950' },
    { label: 'Active Reports',  value: activeCount.toString(),    icon: <ActiveIcon />,    color: 'text-decision-600 dark:text-decision-400', bg: 'bg-decision-50 dark:bg-decision-950' },
    { label: 'Avg. Readiness',  value: totalDecisions > 0 ? 'HIGH' : '—', icon: <ReadinessIcon />, color: 'text-evidence-600 dark:text-evidence-400', bg: 'bg-evidence-50 dark:bg-evidence-950' },
  ];

  return (
    <>
      <PageHeader
        badge="Transparency Ledger"
        title="Public Decision Register"
        subtitle="A complete, auditable record of every evidence-based community decision. All entries are immutable and publicly accessible."
      />

      {/* Stats row */}
      <section aria-label="Ledger statistics" className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {LEDGER_STATS.map(({ label, value, icon, color, bg }) => (
          <div
            key={label}
            className="rounded-lg border border-line bg-surface-1 p-4"
          >
            <span className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${bg} ${color}`} aria-hidden="true">
              {icon}
            </span>
            <p className="text-xl font-bold text-primary">{value}</p>
            <p className="text-xs mt-0.5 font-medium text-muted">{label}</p>
          </div>
        ))}
      </section>

      {/* Table / List Container */}
      <section
        aria-label="Ledger entries"
        className="rounded-lg border border-line bg-surface-1 overflow-hidden mb-8"
      >
        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Spinner size="lg" color="primary" label="Loading decision register..." />
            <p className="text-xs font-medium text-muted">
              Reading public register…
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="flex flex-col items-center justify-center py-16 px-6 text-center gap-4">
            <svg className="w-8 h-8 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-sm font-medium text-red-600 dark:text-red-400">Failed to load ledger records</p>
            <p className="text-xs max-w-sm text-muted">{error}</p>
            <Button variant="secondary" onClick={fetchLedger}>Retry</Button>
          </div>
        )}

        {/* Data table */}
        {!loading && !error && ledger.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse" role="table">
              <thead>
                <tr className="border-b border-line bg-surface-2">
                  {['Incident', 'Priority', 'Recommendation', 'Readiness', 'Recorded', 'Status'].map(h => (
                    <th
                      key={h}
                      className="px-5 py-3.5 text-xs font-semibold uppercase tracking-widest text-muted"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ledger.map((entry) => (
                  <tr
                    key={entry.incidentId}
                    onClick={() => navigate(`/decision/${entry.incidentId}`)}
                    className="border-b border-line/60 hover:bg-surface-2 cursor-pointer transition-colors duration-100 last:border-b-0"
                  >
                    <td className="px-5 py-4">
                      <div className="text-sm font-semibold text-primary">
                        {entry.issueType || 'Unknown Issue'}
                      </div>
                      <div className="text-xs mt-0.5 font-mono text-muted">
                        #{entry.incidentId.substring(0, 8)}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <Badge variant={getPriorityBadgeVariant(entry.priority)}>
                        {entry.priority}
                      </Badge>
                    </td>
                    <td className="px-5 py-4 text-sm max-w-xs text-secondary">
                      {entry.recommendation}
                    </td>
                    <td className="px-5 py-4">
                      <Badge variant={getReadinessBadgeVariant(entry.decisionReadiness)}>
                        {entry.decisionReadiness}
                      </Badge>
                    </td>
                    <td className="px-5 py-4 text-sm whitespace-nowrap text-muted">
                      {formatTimestamp(entry.timestamp)}
                    </td>
                    <td className="px-5 py-4">
                      <Badge variant="info" dot>
                        {entry.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && ledger.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
            <svg className="w-10 h-10 text-slate-300 dark:text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.25} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <p className="text-sm font-medium text-secondary">
              No decisions recorded yet.
            </p>
            <p className="text-xs max-w-xs text-muted">
              Entries will appear here once community incidents are submitted and analysed.
            </p>
          </div>
        )}
      </section>

      {/* Primary CTA */}
      <div>
        <Button
          id="ledger-submit-incident-btn"
          variant="primary"
          onClick={() => navigate('/submit')}
        >
          Report an Incident
        </Button>
      </div>
    </>
  );
}
