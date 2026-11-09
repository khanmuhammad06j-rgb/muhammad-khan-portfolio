'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from './Icons';

export default function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch (e) {
      /* storage unavailable — theme still switches for this visit */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="grid h-9 w-9 place-items-center rounded-full border border-line bg-panel/60 text-muted transition-colors hover:border-accent/60 hover:text-accent"
    >
      {dark ? <Sun /> : <Moon />}
    </button>
  );
}
