import { NavLink } from 'react-router-dom';

const NAV_LINKS = [
  { to: '/submit', label: 'Submit Incident' },
  { to: '/ledger', label: 'Ledger' },
];

export default function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-gray-800/60 bg-gray-950/80 backdrop-blur-md">
      <nav
        className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Brand */}
        <NavLink
          to="/"
          id="nav-brand"
          className="flex items-center gap-2 text-white font-extrabold text-lg tracking-tight hover:text-indigo-400 transition-colors"
        >
          <span className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-xs font-black">
            C
          </span>
          CommUnity AI
        </NavLink>

        {/* Links */}
        <ul className="flex items-center gap-1" role="list">
          {NAV_LINKS.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                id={`nav-${label.toLowerCase().replace(/\s+/g, '-')}`}
                className={({ isActive }) =>
                  [
                    'px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150',
                    isActive
                      ? 'bg-indigo-600/20 text-indigo-400'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800',
                  ].join(' ')
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
