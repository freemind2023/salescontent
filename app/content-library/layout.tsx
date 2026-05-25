import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'PES Admission Content Library',
  description: 'Internal admission content library for Practical EduSkills Pvt. Ltd.',
  robots: 'noindex,nofollow',
};

export default function ContentLibraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Force light mode — override dark mode CSS variables globally for this route
    <div
      className="min-h-screen bg-gray-50"
      style={{
        colorScheme: 'light',
        ['--background' as string]: '#f9fafb',
        ['--foreground' as string]: '#171717',
        color: '#171717',
        background: '#f9fafb',
      }}
    >
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
