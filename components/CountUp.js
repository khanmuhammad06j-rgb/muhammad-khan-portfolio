'use client';

import { useEffect, useRef } from 'react';

// Animates the first number inside `value` (e.g. "99.9%", "500+", "12/12") when it scrolls into view.
// The final value is in the HTML from the start, so it reads correctly without JavaScript.
export default function CountUp({ value, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const m = value.match(/[\d.,]+/);
    if (!el || !m || typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const raw = m[0];
    const target = parseFloat(raw.replace(/,/g, ''));
    const decimals = (raw.split('.')[1] || '').length;
    const [pre, post] = [value.slice(0, m.index), value.slice(m.index + raw.length)];
    let frame;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const dur = 1100;
        const tick = (now) => {
          const t = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - t, 3);
          el.textContent = pre + (target * eased).toFixed(decimals) + post;
          if (t < 1) frame = requestAnimationFrame(tick);
          else el.textContent = value;
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref} className={className} data-countup={value}>
      {value}
    </span>
  );
}
