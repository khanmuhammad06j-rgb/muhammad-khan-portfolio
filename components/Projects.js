'use client';

import { useState } from 'react';
import Link from 'next/link';
import { projects } from '@/data/profile';
import { labs } from '@/data/caseStudies';
import SectionHeading from './SectionHeading';
import { ArrowUpRight } from './Icons';

// Projects from profile.js plus any Packet Tracer labs from caseStudies.js
const items = [
  ...projects,
  ...labs.map((l) => ({
    id: l.slug,
    category: 'Labs',
    title: l.title,
    summary: l.summary,
    tags: l.tools || [],
    caseStudy: l.slug,
  })),
].map((p, i) => ({ ...p, sys: `#SYS-${String(i + 1).padStart(2, '0')}` }));

const FILTERS = ['All systems', ...Array.from(new Set(items.map((p) => p.category)))];

function Card({ p }) {
  const [open, setOpen] = useState(false);
  return (
    <article data-category={p.category} className="group relative flex h-full flex-col overflow-hidden rounded-[6px] border border-line bg-panel/85 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_24px_60px_-30px_rgb(var(--accent)/0.6)] md:p-6">
      <span className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
      <div className="flex items-start justify-between gap-3">
        <span className="tag">{p.category}</span>
        <span className="font-mono text-[11px] text-muted">{p.sys}</span>
      </div>
      <h3 className="mt-4 font-display text-xl font-extrabold leading-tight tracking-tight">{p.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{p.summary}</p>

      {p.actions && (
        <>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="group/d mt-4 w-fit font-mono text-[11px] font-bold uppercase tracking-wider text-accent hover:underline"
            aria-expanded={open}
            data-details-toggle
          >
            <span className="group-aria-expanded/d:hidden">+ What I did</span>
            <span className="hidden group-aria-expanded/d:inline">− Hide details</span>
          </button>
          <ul className="mt-3 space-y-2" hidden={!open} data-details>
            {p.actions.map((a) => (
              <li key={a} className="flex gap-2.5 text-[13px] leading-relaxed text-fg/85">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 bg-accent" />
                {a}
              </li>
            ))}
          </ul>
        </>
      )}

      {p.outcomes && p.outcomes.length > 0 && (
        <div className="mt-5 grid gap-2" style={{ gridTemplateColumns: `repeat(${p.outcomes.length}, minmax(0, 1fr))` }}>
          {p.outcomes.map((o) => (
            <div key={o.label} className="rounded-[3px] border border-line bg-bg/70 px-2 py-2 text-center">
              <div className="font-mono text-base font-bold text-accent">{o.value}</div>
              <div className="mt-0.5 text-[10.5px] leading-tight text-muted">{o.label}</div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
        {p.tags.slice(0, 5).map((t) => (
          <span key={t} className="chip">
            {t}
          </span>
        ))}
      </div>

      {p.caseStudy && (
        <Link
          href={`/projects/${p.caseStudy}`}
          className="mt-5 inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-accent hover:underline"
        >
          Open case study <ArrowUpRight width={14} height={14} />
        </Link>
      )}
    </article>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState(FILTERS[0]);

  return (
    <section id="matrix" className="mx-auto max-w-page px-5 pt-24 md:px-8 md:pt-32">
      <SectionHeading
        index="02"
        label="Engineering index"
        title="The Systems Matrix"
        kicker="Production work, leadership and labs — filter by type."
      />

      <div className="-mt-4 mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            role="tab"
            aria-selected={filter === f}
            onClick={() => setFilter(f)}
            data-filter={f}
            className="rounded-[4px] border border-line bg-panel/60 px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-fg/80 transition-all hover:border-accent/60 hover:text-accent aria-selected:border-accent aria-selected:bg-accent aria-selected:text-white aria-selected:shadow-[0_6px_20px_-6px_rgb(var(--accent)/0.8)]"
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" data-matrix>
        {items.map((p) => (
          <div key={p.id} hidden={filter !== FILTERS[0] && p.category !== filter} data-card={p.category}>
            <Card p={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
