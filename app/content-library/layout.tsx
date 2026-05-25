import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'PES Content Library | Sales Team',
  description: 'Internal sales content library for Practical EduSkills Pvt. Ltd.',
  robots: 'noindex,nofollow',
};

export default function ContentLibraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000,
          style: { background: '#0B1F5C', color: '#fff', fontWeight: 600 },
        }}
      />
    </div>
  );
}
