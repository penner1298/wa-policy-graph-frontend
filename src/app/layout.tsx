import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'W.P.G. | WA Policy Graph',
  description: 'Municipal Intelligence Terminal',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans text-slate-800 min-h-screen bg-mist overflow-hidden relative antialiased">
        {children}
      </body>
    </html>
  );
}
