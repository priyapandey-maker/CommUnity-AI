import { useNavigate, useParams } from 'react-router-dom';
import { PageHeader, Button } from '@/components';

const DECISION_FIELDS = [
  { label: 'Status', value: 'Pending implementation' },
  { label: 'Incident ID', value: '—' },
  { label: 'Analysis score', value: '—' },
  { label: 'Issued at', value: '—' },
  { label: 'Reasoning', value: 'AI reasoning will appear here once the engine is connected.' },
];

export default function DecisionPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <>
      <PageHeader
        badge="Decision Record"
        title={`Decision #${id ?? '—'}`}
        subtitle="This record contains the full reasoning trail and outcome for the associated community incident."
      />

      {/* Decision card */}
      <section
        aria-label="Decision details"
        className="rounded-2xl border border-gray-800 bg-gray-900/50 divide-y divide-gray-800 overflow-hidden mb-8"
      >
        {DECISION_FIELDS.map(({ label, value }) => (
          <div key={label} className="flex flex-col sm:flex-row sm:items-start gap-2 px-6 py-4">
            <dt className="w-40 shrink-0 text-xs font-semibold uppercase tracking-widest text-gray-500">
              {label}
            </dt>
            <dd className="text-sm text-gray-300">{value}</dd>
          </div>
        ))}
      </section>

      {/* Actions */}
      <div className="flex flex-wrap gap-4">
        <Button
          id="decision-view-ledger-btn"
          variant="secondary"
          onClick={() => navigate('/ledger')}
        >
          View Full Ledger
        </Button>
        <Button
          id="decision-submit-incident-btn"
          variant="ghost"
          onClick={() => navigate('/submit')}
        >
          Submit another incident
        </Button>
      </div>
    </>
  );
}
