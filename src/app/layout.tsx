import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ask Penner | WA Policy Graph',
  description: 'Your personal civic intelligence agent. Instantly search and monitor Washington State city council agendas, school board minutes, and state audits without hallucinations.',
  keywords: ['Washington State policy', 'civic intelligence', 'city council agendas', 'school board minutes', 'WA audits', 'municipal data tracker', 'Penner agent', 'AI civic research'],
  openGraph: {
    title: 'Ask Penner | Civic Intelligence Agent',
    description: 'I read every city council agenda, school board minute, and state audit in Washington the second they are published so you don\'t have to. Ask me what\'s happening in your town.',
    url: 'https://wapolicygraph.com',
    siteName: 'WA Policy Graph',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ask Penner - WA Policy Graph',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ask Penner | Civic Intelligence Agent',
    description: 'Instantly search and monitor Washington State municipal documents.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  }
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
      <body className="font-sans text-slate-800 min-h-screen bg-mist overflow-x-hidden relative antialiased">
        {children}
      </body>
    </html>
  );
}
