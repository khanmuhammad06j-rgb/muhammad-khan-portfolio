'use client';

import { useEffect, useState } from 'react';
import { nav, profile } from '@/data/profile';
import ThemeToggle from './ThemeToggle';
import { Close, Menu } from './Icons';


export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 md:top-5">
      <div
        data-scrolled={scrolled || open}
        className="mx-auto flex max-w-3xl items-center justify-between gap-2 rounded-full border border-line/70 bg-panel/60 px-2 py-1.5 backdrop-blur-md transition-all duration-300 data-[scrolled=true]:border-line data-[scrolled=true]:bg-panel/90 data-[scrolled=true]:shadow-[0_10px_40px_-12px_rgb(0_0_0/0.6)]"
      >
        <a href="/#top" className="group flex items-center gap-2 pl-1" aria-label="Back to top">
          <span className="grid h-7 w-7 place-items-center rounded-[5px] bg-accent shadow-[0_0_18px_rgb(var(--accent)/0.6)] transition-transform group-hover:rotate-12">
            <span className="h-2 w-2 rounded-[2px] bg-white" />
          </span>
          <span className="font-mono text-xs font-bold text-fg">{profile.initials}.</span>
        </a>

        <nav className="hidden items-center md:flex" aria-label="Primary">
          {nav.slice(0, -1).map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-1.5 font-display text-[13px] font-medium text-muted transition-colors hover:bg-bg/70 hover:text-fg"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <a href="/#contact" className="hidden flex-col items-end pr-2 leading-tight sm:flex">
            <span className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-fg">
              <span className="h-1.5 w-1.5 animate-blink rounded-full bg-signal" /> Available
            </span>
            <span className="font-mono text-[11px] font-bold text-accent underline underline-offset-2">CONTACT →</span>
          </a>
          <ThemeToggle />
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-full border border-line bg-panel/60 text-muted md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            <span hidden={open}>
              <Menu />
            </span>
            <span hidden={!open}>
              <Close />
            </span>
          </button>
        </div>
      </div>

      {(
        <nav className="panel mx-auto mt-2 max-w-3xl px-5 py-2 md:hidden" aria-label="Mobile" hidden={!open} id="mnav">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block border-b border-line/60 py-3 font-mono text-sm text-muted last:border-0 hover:text-accent"
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
