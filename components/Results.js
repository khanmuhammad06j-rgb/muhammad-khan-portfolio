import { results } from '@/data/profile';
import CountUp from './CountUp';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

function Visual({ r }) {
  switch (r.kind) {
    case 'uptime':
      return (
        <div className="mt-5">
          <div className="flex h-8 items-end gap-[3px]" aria-hidden>
            {Array.from({ length: 40 }).map((_, i) => (
              <span
                key={i}
                className="flex-1 rounded-[1px] bg-signal/80 transition-all duration-300 group-hover:bg-signal"
                style={{ height: `${70 + ((i * 37) % 30)}%` }}
              />
            ))}
          </div>
          <div className="mt-2 flex justify-between font-mono text-[10px] text-muted">
            <span>status: operational</span>
            <span>uptime 99.9%</span>
          </div>
        </div>
      );
    case 'checks':
      return (
        <div className="mt-5 grid grid-cols-6 gap-1.5" aria-hidden>
          {Array.from({ length: r.total }).map((_, i) => (
            <span
              key={i}
              className={`grid aspect-square place-items-center rounded-[2px] font-mono text-[10px] font-bold ${
                i === r.total - 2 ? 'bg-warn/20 text-warn ring-1 ring-warn/50' : 'bg-signal/15 text-signal ring-1 ring-signal/40'
              }`}
            >
              ✓
            </span>
          ))}
        </div>
      );
    case 'gauge':
      return (
        <div className="mt-5" aria-hidden>
          <div className="h-2.5 overflow-hidden rounded-full bg-line">
            <div className="h-full rounded-full bg-accent" style={{ width: `${100 - r.pct}%` }} />
          </div>
          <div className="mt-2 flex justify-between font-mono text-[10px] text-muted">
            <span>load 31%</span>
            <span className="text-signal">headroom {r.pct}%</span>
          </div>
        </div>
      );
    case 'nights':
      return (
        <div className="mt-5" aria-hidden>
          <div className="grid grid-cols-[repeat(15,minmax(0,1fr))] gap-1.5 sm:grid-cols-[repeat(30,minmax(0,1fr))]">
            {Array.from({ length: r.nights }).map((_, i) => (
              <span
                key={i}
                className="aspect-square rounded-full bg-accent/80 transition-transform duration-300 group-hover:scale-110"
                style={{ transitionDelay: `${i * 12}ms` }}
              />
            ))}
          </div>
          <div className="mt-2 flex justify-between font-mono text-[10px] text-muted">
            <span>night 01</span>
            <span>night 30 · 100% compliant</span>
          </div>
        </div>
      );
    case 'certs':
      return (
        <div className="mt-5 flex gap-1.5" aria-hidden>
          {Array.from({ length: r.earned + r.progress }).map((_, i) => (
            <span
              key={i}
              className={`h-2.5 flex-1 rounded-[2px] ${i < r.earned ? 'bg-signal/80' : 'animate-blink bg-warn/70'}`}
            />
          ))}
        </div>
      );
    default:
      return null;
  }
}

export default function Results() {
  return (
    <section id="results" className="mx-auto max-w-page px-5 pt-24 md:px-8 md:pt-32">
      <SectionHeading
        index="03"
        label="Proof of work"
        title="The Results Ledger"
        kicker="Every number here is from my own work: training, capstone and earlier roles. None of it is client data."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {results.map((r, i) => (
          <Reveal
            key={r.label}
            delay={(i % 4) * 70}
            className={`${r.span === 2 ? 'sm:col-span-2' : ''}`}
          >
            <article className="group relative flex h-full flex-col overflow-hidden rounded-[6px] border border-line bg-panel/85 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_24px_60px_-30px_rgb(var(--accent)/0.6)]">
              <span className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
              <div className="flex items-start justify-between gap-3">
                <CountUp
                  value={r.value}
                  className={`font-mono font-bold text-accent drop-shadow-[0_0_14px_rgb(var(--accent)/0.45)] ${
                    r.span === 2 ? 'text-4xl md:text-5xl' : 'text-3xl'
                  }`}
                />
                <span className="font-mono text-[10px] text-muted">R-{String(i + 1).padStart(2, '0')}</span>
              </div>
              <p className="mt-3 text-[13.5px] leading-relaxed text-fg/85">{r.label}</p>
              <Visual r={r} />
              <div className="mt-auto pt-5">
                <span className="tag-ghost text-[9.5px] group-hover:border-accent/60 group-hover:text-accent">{r.source}</span>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
