import { PageHeader, IncidentForm } from '@/components';

export default function SubmitIncidentPage() {
  return (
    <>
      <PageHeader
        badge="Incident Reporting"
        title="Submit an Incident"
        subtitle="Report a community concern. Your submission will be analysed and result in a transparent, auditable decision published on the public ledger."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ── Form ─────────────────────────────────── */}
        <div className="lg:col-span-2">
          <IncidentForm />
        </div>

        {/* ── Sidebar info ─────────────────────────── */}
        <aside className="flex flex-col gap-4">
          {/* What happens next */}
          <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">
              What happens next
            </h2>
            <ol className="space-y-4" role="list">
              {[
                { step: '01', text: 'Your report is received and timestamped.' },
                { step: '02', text: 'AI analyses the incident for severity and context.' },
                { step: '03', text: 'A decision is generated and added to the public ledger.' },
              ].map(({ step, text }) => (
                <li key={step} className="flex gap-3">
                  <span className="text-xs font-black text-indigo-900/70 w-6 shrink-0 mt-0.5">
                    {step}
                  </span>
                  <p className="text-sm text-gray-400 leading-relaxed">{text}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* Tips */}
          <div className="rounded-2xl border border-indigo-900/40 bg-indigo-900/10 p-6">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-indigo-500 mb-3">
              Tips for a good report
            </h2>
            <ul className="space-y-2 text-sm text-gray-400">
              {[
                'Be specific about the location.',
                'Describe the impact on the community.',
                'Include a photo when possible.',
                'Avoid personal information.',
              ].map((tip) => (
                <li key={tip} className="flex gap-2">
                  <span className="text-indigo-500 mt-0.5 shrink-0">✓</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}
