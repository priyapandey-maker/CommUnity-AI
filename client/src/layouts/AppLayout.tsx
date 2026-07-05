import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components';

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
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
