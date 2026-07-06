import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components';

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-surface text-primary transition-colors duration-200">
      <Navbar />
      {/* offset for fixed navbar */}
      <main className="pt-16">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
