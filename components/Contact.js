'use client';

import { useEffect, useState } from 'react';
import { profile } from '@/data/profile';
import Reveal from './Reveal';
import { ArrowUpRight, Check, Copy, LinkedIn, Mail } from './Icons';

const [user, domain] = profile.emailParts;
// Readable but not machine-harvestable until JavaScript joins it in the browser.
const OBFUSCATED = `${user} [at] ${domain.replace('.', ' [dot] ')}`;

export default function Contact() {
  const [email, setEmail] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setEmail(`${user}@${domain}`);
  }, []);

  const copy = async () => {
    if (!email) return;
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (e) {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <section id="contact" className="mx-auto max-w-page px-5 py-24 md:px-8 md:py-32">
      <Reveal className="panel relative overflow-hidden p-8 md:p-14">
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -right-24 h-80 w-80 animate-glow rounded-full blur-3xl"
          style={{ background: 'radial-gradient(closest-side, rgb(var(--accent) / 0.3), transparent)' }}
        />
        <div className="relative">
          <div className="eyebrow">
            <span className="mr-2 text-muted">08</span>Contact
          </div>
          <h2 className="heading mt-5 max-w-2xl text-4xl md:text-6xl">
            Building out capacity? <span className="text-accent">Let’s talk.</span>
          </h2>
          <p className="mt-4 max-w-xl text-lg text-muted">
            Looking for cloud infrastructure, network deployment, provisioning or technical coordination roles in the
            DC–Baltimore area. Email is the fastest way to reach me.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a href={email ? `mailto:${email}` : '#contact'} className="btn-primary normal-case" data-email-link>
              <Mail /> <span data-email>{email || OBFUSCATED}</span>
            </a>
            <button type="button" onClick={copy} className="btn-ghost" aria-live="polite" data-copy-email>
              {copied ? (
                <>
                  <Check className="text-signal" /> Copied
                </>
              ) : (
                <>
                  <Copy /> Copy email
                </>
              )}
            </button>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <LinkedIn /> LinkedIn <ArrowUpRight width={14} height={14} />
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
