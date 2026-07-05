import { useNavigate } from 'react-router-dom';
import { PageHeader, Button } from '@/components';

const STEPS = [
  {
    step: '01',
    title: 'Describe the incident',
    desc: 'Provide details about the community concern — location, time, and what happened.',
  },
  {
    step: '02',
    title: 'AI analysis',
    desc: 'The system analyses your report for severity, patterns, and relevant context.',
  },
  {
    step: '03',
    title: 'Decision issued',
    desc: 'A reasoned decision is generated and published to the public ledger.',
  },
];

export default function SubmitIncidentPage() {
  const navigate = useNavigate();

  return (
    <>
      <PageHeader
        badge="Incident Reporting"
        title="Submit an Incident"
        subtitle="Report a community concern. Your submission will be analysed and result in a transparent, auditable decision."
      />

      {/* Process steps */}
      <section aria-label="Submission process" className="mb-12">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-6">
          How it works
        </h2>
        <ol className="grid grid-cols-1 sm:grid-cols-3 gap-4" role="list">
          {STEPS.map(({ step, title, desc }) => (
            <li
              key={step}
              className="relative rounded-2xl border border-gray-800 bg-gray-900/50 p-6 hover:border-indigo-800 transition-colors duration-200"
            >
              <span className="text-3xl font-black text-indigo-900/60 mb-3 block">{step}</span>
              <h3 className="text-sm font-bold text-white mb-1">{title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Form placeholder */}
      <section
        aria-label="Incident submission form"
        className="rounded-2xl border border-dashed border-gray-700 bg-gray-900/30 p-10 flex flex-col items-center justify-center text-center gap-4 min-h-[220px]"
      >
        <span className="text-3xl">📝</span>
        <p className="text-sm font-medium text-gray-400">
          The submission form will appear here in the next build phase.
        </p>
      </section>

      <div className="mt-8 flex gap-4">
        <Button
          id="submit-incident-view-ledger-btn"
          variant="ghost"
          onClick={() => navigate('/ledger')}
        >
          ← View Decision Ledger
        </Button>
      </div>
    </>
  );
}
