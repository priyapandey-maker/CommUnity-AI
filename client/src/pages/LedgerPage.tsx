import { useNavigate } from 'react-router-dom';
import { PageHeader, Button } from '@/components';

const LEDGER_STATS = [
  { label: 'Total Decisions', value: '—', icon: '⚖️' },
  { label: 'Open Incidents', value: '—', icon: '📋' },
  { label: 'Resolved', value: '—', icon: '✅' },
  { label: 'Avg. Resolution Time', value: '—', icon: '⏱️' },
];

const LEDGER_COLUMNS = ['Decision ID', 'Incident Type', 'Status', 'Issued At', 'Outcome'];

export default function LedgerPage() {
  const navigate = useNavigate();

  return (
    <>
      <PageHeader
        badge="Transparency Ledger"
        title="Decision Ledger"
        subtitle="A complete, auditable record of every AI-assisted community decision. All entries are immutable and publicly accessible."
      />

      {/* Stats row */}
      <section aria-label="Ledger statistics" className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {LEDGER_STATS.map(({ label, value, icon }) => (
          <div
            key={label}
            className="rounded-2xl border border-gray-800 bg-gray-900/50 p-5 hover:border-indigo-800 transition-colors duration-200"
          >
            <span className="text-xl mb-2 block">{icon}</span>
            <p className="text-2xl font-extrabold text-white">{value}</p>
            <p className="text-xs text-gray-500 mt-1 font-medium">{label}</p>
          </div>
        ))}
      </section>

      {/* Table placeholder */}
      <section aria-label="Ledger entries table" className="rounded-2xl border border-gray-800 bg-gray-900/50 overflow-hidden mb-8">
        {/* Table header */}
        <div className="grid grid-cols-5 gap-4 px-6 py-3 border-b border-gray-800 bg-gray-900/80">
          {LEDGER_COLUMNS.map((col) => (
            <span key={col} className="text-xs font-semibold uppercase tracking-widest text-gray-500">
              {col}
            </span>
          ))}
        </div>

        {/* Empty state */}
        <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
          <span className="text-4xl">📭</span>
          <p className="text-sm font-medium text-gray-400">No decisions recorded yet.</p>
          <p className="text-xs text-gray-600">Entries will appear here once incidents are submitted and analysed.</p>
        </div>
      </section>

      {/* Action */}
      <div>
        <Button
          id="ledger-submit-incident-btn"
          variant="primary"
          onClick={() => navigate('/submit')}
        >
          Submit an Incident
        </Button>
      </div>
    </>
  );
}
