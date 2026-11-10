'use client';

import { useEffect, useRef } from 'react';
import meta from '@/data/heroMeta.json';

// The dot portrait. The engine (Three.js) loads after the page renders, so it never blocks first paint.
export default function DotHero() {
  const box = useRef(null);

  useEffect(() => {
    let ctl;
    let cancelled = false;
    import('@/lib/dotEngine').then(({ mountDotHero }) => {
      if (cancelled || !box.current) return;
      const $ = (id) => document.getElementById(id);
      ctl = mountDotHero({
        meta,
        box: box.current,
        canvas: $('dh-canvas'),
        loader: $('dh-loader'),
        arc: $('dh-arc'),
        pct: $('dh-pct'),
        hint: $('dh-hint'),
        bannerEl: $('dh-banner'),
        bannerHot: $('dh-banner-hot'),
        src: { urls: ['/hero/dots.bin', '/hero/photo.webp'] },
      });
    });
    return () => {
      cancelled = true;
      ctl && ctl.destroy();
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div
        ref={box}
        id="dh-box"
        className="dh-box relative aspect-square w-full max-w-[400px] overflow-hidden rounded-full lg:w-[min(29vw,430px)] lg:max-w-none"
      >
        <canvas id="dh-canvas" className="absolute inset-0 h-full w-full" aria-label="Interactive dot portrait of Muhammad Khan" />
        <img src="/hero/photo.webp" alt="Muhammad Khan" className="dh-fallback absolute inset-0 h-full w-full object-cover object-[50%_25%]" />
        <div id="dh-loader" className="dh-loader pointer-events-none absolute inset-0 grid place-items-center" role="progressbar" aria-label="Loading portrait">
          <svg viewBox="0 0 36 36" className="h-[36%] w-[36%]" aria-hidden>
            <circle cx="18" cy="18" r="15.9155" fill="none" stroke="rgba(163,9,14,.18)" strokeWidth=".6" />
            <circle id="dh-arc" cx="18" cy="18" r="15.9155" fill="none" stroke="#7d0a10" strokeWidth=".9" strokeDasharray="100 100" strokeDashoffset="100" transform="rotate(-90 18 18)" strokeLinecap="round" />
          </svg>
          <span id="dh-pct" className="absolute font-mono text-[13px] tracking-[0.12em] text-[#a3121a]">0</span>
        </div>
      </div>
      <p id="dh-hint" className="dh-hint mt-4 font-mono text-[10.5px] font-bold uppercase tracking-[0.22em] text-muted" aria-hidden>
        Scroll to reveal <span className="inline-block animate-bounce">↓</span>
      </p>
    </div>
  );
}
