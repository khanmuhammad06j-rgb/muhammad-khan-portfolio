import { headers } from 'next/headers';
import './globals.css';
import { profile } from '@/data/profile';

export const metadata = {
  title: `${profile.name} | Network Deployment & Cloud Infrastructure`,
  description:
    'Network deployment technician on hyperscale cloud data center builds. Spine/leaf fabric, optics validation, out-of-band recovery and clean operational handoffs.',
  openGraph: {
    title: `${profile.name} | ${profile.tagline}`,
    description: profile.intro,
    type: 'website',
  },
  referrer: 'strict-origin-when-cross-origin',
  formatDetection: { email: false, telephone: false, address: false },
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#09090a' },
    { media: '(prefers-color-scheme: light)', color: '#f5f4f2' },
  ],
};

// Runs before paint so the saved theme applies without a flash. Dark is the default.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.remove('dark');}}catch(e){}})();`;

export default async function RootLayout({ children }) {
  // Nonce issued by middleware.js — lets this one inline script pass the CSP.
  const nonce = (await headers()).get('x-nonce') ?? undefined;

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script nonce={nonce} dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
