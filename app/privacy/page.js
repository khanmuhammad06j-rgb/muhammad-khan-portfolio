import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { profile } from '@/data/profile';

export const metadata = {
  title: `Privacy & legal | ${profile.name}`,
  description: 'Privacy policy, cookies, credits and legal notices for this portfolio.',
};

const EFFECTIVE = 'November 15, 2026';

function Section({ id, title, children }) {
  return (
    <section id={id} className="border-t border-line pt-10">
      <h2 className="heading text-2xl md:text-3xl">{title}</h2>
      <div className="mt-5 space-y-4 text-[15.5px] leading-relaxed text-fg/85">{children}</div>
    </section>
  );
}

const ext = { target: '_blank', rel: 'noopener noreferrer', className: 'text-accent underline underline-offset-2' };

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-3xl px-5 pb-16 pt-28 md:px-8 md:pt-36">
        <a href="/#top" className="font-mono text-xs text-muted transition-colors hover:text-accent">
          ← Back to portfolio
        </a>
        <div className="eyebrow mt-8">Privacy & legal</div>
        <h1 className="heading mt-3 text-4xl md:text-5xl">Privacy policy and legal notices</h1>
        <p className="mt-4 text-muted">Effective {EFFECTIVE}</p>

        <div className="panel mt-10 p-6">
          <div className="eyebrow mb-3">The short version</div>
          <ul className="space-y-2 text-[15px] text-fg/90">
            <li>✓ No cookies, no analytics, no ads, no trackers.</li>
            <li>✓ No forms: nothing you type is sent anywhere.</li>
            <li>✓ No third-party scripts or fonts are loaded; everything is served from this site.</li>
            <li>✓ The only thing stored on your device is your light/dark theme choice.</li>
          </ul>
        </div>

        <div className="mt-12 space-y-12">
          <Section id="what-is-collected" title="1. What is collected">
            <p>
              This site does not collect personal information. It has no accounts, contact forms, comment boxes, analytics
              or advertising.
            </p>
            <p>
              Like every website, the hosting provider automatically processes basic technical data when your browser
              requests a page: your IP address, browser and device type, the page requested, and the time. This is needed to
              deliver the site and protect it from abuse (for example, denial-of-service attacks). This site is hosted by{' '}
              <a href="https://vercel.com/legal/privacy-policy" {...ext}>Vercel</a>; a copy may also be served by{' '}
              <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" {...ext}>GitHub Pages</a>.
              Their privacy policies describe how they handle these logs. I don’t use these logs to identify visitors.
            </p>
          </Section>

          <Section id="cookies" title="2. Cookies and local storage">
            <p>This site sets no cookies, so there is no cookie banner.</p>
            <p>
              If you switch between light and dark mode, that choice is saved in your browser’s local storage under the name{' '}
              <code className="rounded bg-panel px-1.5 py-0.5 font-mono text-[13px]">theme</code>. It never leaves your device,
              contains no personal information, and you can clear it at any time in your browser settings.
            </p>
          </Section>

          <Section id="email" title="3. If you email me">
            <p>
              If you contact me by email, I receive your email address and whatever you choose to write. I use it only to
              reply to you. I don’t sell or share it, add it to mailing lists, or use it for marketing. Ask me and I’ll delete
              our correspondence.
            </p>
          </Section>

          <Section id="links" title="4. Links to other sites">
            <p>
              This site links to my LinkedIn profile. Those links open LinkedIn in a new tab and are covered by LinkedIn’s own
              privacy policy. Nothing from LinkedIn is embedded or loaded on this site.
            </p>
          </Section>

          <Section id="rights" title="5. Your rights">
            <p>
              Depending on where you live (for example, under the GDPR in the EU/UK or the CCPA in California), you may have the
              right to know what personal information I hold about you, to have it corrected or deleted, and to object to its
              use. Because this site collects no personal information, the only data I could hold is email you sent me. To make
              a request, email me using the address in the <a href="/#contact" className="text-accent underline underline-offset-2">Contact</a> section.
            </p>
            <p>This site is not directed to children under 13, and I don’t knowingly collect information from them.</p>
          </Section>

          <Section id="security" title="6. Security">
            <p>
              The site is served only over HTTPS and uses a strict Content Security Policy, anti-framing protection and other
              security headers. If you find a security issue, please report it privately (see{' '}
              <a href="/.well-known/security.txt" className="text-accent underline underline-offset-2">security.txt</a>).
            </p>
          </Section>

          <Section id="legal" title="7. Legal notices and credits">
            <p>
              © {new Date().getFullYear()} {profile.name}. All rights reserved. The text, design, photographs and source code of
              this site are my own work unless credited below, and may not be reused without permission.
            </p>
            <p>
              <strong className="text-fg">Confidentiality.</strong> Professional work is described in general terms. No
              confidential, proprietary or client-identifying information from any employer or client is published here, and no
              employer or client has endorsed this site.
            </p>
            <p>
              <strong className="text-fg">Training projects.</strong> Security projects were completed in CodePath’s
              Intermediate Cybersecurity course; the NetNova build was a Per Scholas × TEKsystems capstone completed as a team.
              Screenshots show my own work in training lab environments; scenarios and company names in them are fictional.
            </p>
            <p>
              <strong className="text-fg">Trademarks.</strong> Product and company names such as Cisco, Splunk, Wireshark, AWS,
              VMware, Dell and Shopify are trademarks of their respective owners and are used only to describe skills and tools.
              Their use does not imply affiliation or endorsement.
            </p>
            <div>
              <strong className="text-fg">Open-source credits.</strong>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-fg/80">
                <li>Fonts: Archivo, Space Mono, Caveat and Anton, licensed under the <a href="https://openfontlicense.org" {...ext}>SIL Open Font License 1.1</a>, self-hosted via Fontsource.</li>
                <li>Libraries: Next.js, React, Three.js and Tailwind CSS, under the MIT License.</li>
                <li>Depth model used to build the dot portrait: Depth Anything V2 (small), Apache-2.0.</li>
              </ul>
            </div>
          </Section>

          <Section id="changes" title="8. Changes">
            <p>If this policy changes, the updated version will be posted on this page with a new effective date.</p>
          </Section>
        </div>
      </main>
      <Footer />
    </>
  );
}
