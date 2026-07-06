import { useNavigate } from 'react-router-dom';
import { Navbar, Button } from '@/components';

// ── Feature card icons (SVG, Material-style) ──────────────

function AnalysisIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

function DecisionIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}

function LedgerIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  );
}

// ── Feature data ──────────────────────────────────────────

const FEATURES = [
  {
    icon: <AnalysisIcon />,
    iconColor: 'text-primary-600 dark:text-primary-400',
    iconBg: 'bg-primary-50 dark:bg-primary-950',
    title: 'Evidence-Based Analysis',
    desc: 'Each community report is analysed for severity, urgency, and contextual risk factors using structured evidence.',
  },
  {
    icon: <DecisionIcon />,
    iconColor: 'text-decision-600 dark:text-decision-400',
    iconBg: 'bg-decision-50 dark:bg-decision-950',
    title: 'Transparent Decisions',
    desc: 'Every decision is deterministic, explainable, and auditable — showing exactly which evidence drove the outcome.',
  },
  {
    icon: <LedgerIcon />,
    iconColor: 'text-evidence-600 dark:text-evidence-400',
    iconBg: 'bg-evidence-50 dark:bg-evidence-950',
    title: 'Public Decision Register',
    desc: 'All decisions are recorded on an immutable public ledger that any resident can inspect at any time.',
  },
] as const;

// ── Component ─────────────────────────────────────────────

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col transition-colors duration-200"
      style={{ backgroundColor: 'var(--bg-page)' }}
    >
      <Navbar />

      {/* Hero */}
      <main className="flex-1 flex items-center justify-center px-6 pt-20 pb-16">
        <div className="text-center max-w-2xl">

          {/* Status badge */}
          <span className="inline-flex items-center gap-1.5 mb-6 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary-700 bg-primary-50 border border-primary-200 rounded-full dark:text-primary-300 dark:bg-primary-950 dark:border-primary-900">
            <span className="w-1.5 h-1.5 rounded-full bg-decision-500 inline-block" aria-hidden="true" />
            Community Governance Platform
          </span>

          <h1
            className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            Community Reports.{' '}
            <span className="gradient-text">Transparent Decisions.</span>
          </h1>

          <p
            className="text-lg max-w-xl mx-auto mb-10 leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            CommUnity AI transforms citizen incident reports into evidence-backed,
            auditable public decisions — putting governance accountability at the centre.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              id="landing-submit-incident-btn"
              size="lg"
              variant="primary"
              onClick={() => navigate('/submit')}
            >
              Report an Incident
            </Button>
            <Button
              id="landing-view-ledger-btn"
              size="lg"
              variant="secondary"
              onClick={() => navigate('/ledger')}
            >
              View Decision Ledger
            </Button>
          </div>

          {/* Feature strip */}
          <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-5 text-left">
            {FEATURES.map(({ icon, iconColor, iconBg, title, desc }) => (
              <div
                key={title}
                className="rounded-xl p-5 border transition-colors duration-150"
                style={{
                  backgroundColor: 'var(--surface-1)',
                  borderColor: 'var(--line)',
                }}
              >
                <span
                  className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${iconBg} ${iconColor}`}
                  aria-hidden="true"
                >
                  {icon}
                </span>
                <h2
                  className="text-sm font-semibold mb-1.5"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {title}
                </h2>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="py-5 text-center text-xs border-t"
        style={{ color: 'var(--text-tertiary)', borderColor: 'var(--line)' }}
      >
        CommUnity AI — Community-driven. Evidence-based. Transparent by design.
      </footer>
    </div>
  );
}
