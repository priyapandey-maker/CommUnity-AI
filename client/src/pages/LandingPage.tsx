import { useNavigate } from 'react-router-dom';
import { Navbar, Button } from '@/components';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      <Navbar />

      {/* Hero */}
      <main className="flex-1 flex items-center justify-center px-6 pt-16">
        <div className="text-center max-w-2xl">
          {/* Status badge */}
          <span className="inline-block mb-6 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-indigo-400 bg-indigo-900/30 border border-indigo-800/50 rounded-full">
            AI-Assisted Community Governance
          </span>

          <h1 className="text-5xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight mb-4">
            CommUnity{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
              AI
            </span>
          </h1>

          <p className="text-xl text-gray-400 mb-10 leading-relaxed">
            Turning community signals into trusted, transparent decisions.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              id="landing-submit-incident-btn"
              size="lg"
              variant="primary"
              onClick={() => navigate('/submit')}
            >
              Submit an Incident
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
          <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            {[
              {
                icon: '🔍',
                title: 'Incident Analysis',
                desc: 'Community reports are analysed by AI for patterns and severity.',
              },
              {
                icon: '⚖️',
                title: 'Transparent Decisions',
                desc: 'Every decision is reasoned, auditable, and stored on the ledger.',
              },
              {
                icon: '📒',
                title: 'Public Ledger',
                desc: 'Anyone can inspect the full history of community decisions.',
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 hover:border-indigo-800 transition-colors duration-200"
              >
                <span className="text-2xl mb-3 block">{icon}</span>
                <h2 className="text-sm font-bold text-white mb-1">{title}</h2>
                <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-gray-600 border-t border-gray-800/50">
        CommUnity AI — Community-driven. AI-assisted. Transparent by design.
      </footer>
    </div>
  );
}
