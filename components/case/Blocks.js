import Reveal from '../Reveal';

const BADGE = {
  PASS: 'border-signal/40 bg-signal/10 text-signal',
  FIXED: 'border-warn/40 bg-warn/10 text-warn',
  FAIL: 'border-red-500/40 bg-red-500/10 text-red-400',
  HIGH: 'border-red-500/40 bg-red-500/10 text-red-500 dark:text-red-400',
  MED: 'border-warn/40 bg-warn/10 text-warn',
  LOW: 'border-signal/40 bg-signal/10 text-signal',
};

function Cell({ value }) {
  const cls = BADGE[value];
  if (!cls) return value;
  return <span className={`inline-block rounded border px-2 py-0.5 font-mono text-[10.5px] tracking-wider ${cls}`}>{value}</span>;
}

function BlockTitle({ children, index }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <span className="font-mono text-xs text-accent">{String(index).padStart(2, '0')}</span>
      <span className="h-px w-6 bg-line" />
      <h2 className="text-xl font-semibold tracking-tight md:text-2xl">{children}</h2>
    </div>
  );
}

function Prose({ b }) {
  return (
    <div className="max-w-3xl space-y-4 text-lg leading-relaxed text-fg/85">
      {b.body.map((p) => (
        <p key={p.slice(0, 30)}>{p}</p>
      ))}
    </div>
  );
}

function List({ b }) {
  return (
    <ul className="grid max-w-4xl gap-3">
      {b.items.map((it) => (
        <li key={it.slice(0, 30)} className="flex gap-3 leading-relaxed text-fg/85">
          <span className="mt-[11px] h-1 w-3 shrink-0 rounded-full bg-accent/70" />
          {it}
        </li>
      ))}
    </ul>
  );
}

function ImageBlock({ b }) {
  return (
    <figure className="panel overflow-hidden">
      <div className="bg-white p-3 md:p-6">
        <img src={b.src} alt={b.alt} width={b.width} height={b.height} loading="lazy" className="mx-auto h-auto w-full max-w-3xl" />
      </div>
      {b.caption && <figcaption className="border-t border-line px-5 py-4 text-sm text-muted">{b.caption}</figcaption>}
    </figure>
  );
}

function Topology({ b }) {
  return (
    <figure className="panel p-6 md:p-10">
      <div className="flex flex-col items-center">
        {b.tiers.map((tier, ti) => {
          const multi = tier.nodes.length > 1;
          return (
            <div key={ti} className="flex w-full flex-col items-center">
              {ti > 0 && (
                <div className="flex w-full flex-col items-center">
                  <span className="h-6 w-px bg-accent/60" />
                  {multi && <span className="hidden h-px w-1/2 bg-accent/60 sm:block" />}
                </div>
              )}
              <div className={`grid w-full gap-4 ${multi ? 'sm:grid-cols-2' : ''}`}>
                {tier.nodes.map((n) => (
                  <div key={n.name} className="flex flex-col items-center">
                    {multi && <span className="hidden h-4 w-px bg-accent/60 sm:block" />}
                    <div className="group w-full max-w-xs rounded-lg border border-line bg-bg/70 px-4 py-3 text-center transition-colors hover:border-accent/60">
                      <div className="flex items-center justify-center gap-2 font-mono text-sm text-fg">
                        <span className="h-1.5 w-1.5 rounded-full bg-signal" />
                        {n.name}
                      </div>
                      {n.detail && <div className="mt-1 text-xs text-muted">{n.detail}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      {b.caption && <figcaption className="mt-8 text-center text-sm text-muted">{b.caption}</figcaption>}
    </figure>
  );
}

function Timeline({ b }) {
  return (
    <ol className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
      {b.steps.map((s, i) => (
        <li key={s.title} className="group bg-panel p-5 transition-colors hover:bg-bg">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-accent">{s.when}</span>
            <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, '0')}</span>
          </div>
          <div className="mt-2 font-semibold">{s.title}</div>
          <p className="mt-1 text-sm leading-relaxed text-muted">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}

function Specs({ b }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {b.cards.map((c) => (
        <div key={c.title} className="panel p-5 transition-colors hover:border-accent/50 md:p-6">
          <div className="eyebrow mb-3 text-accent">{c.title}</div>
          <ul className="space-y-2">
            {c.items.map((it) => (
              <li key={it} className="flex gap-2.5 text-sm leading-relaxed text-fg/85">
                <span className="mt-[3px] font-mono text-signal">✓</span>
                {it}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function Table({ b }) {
  return (
    <div>
      <div className="panel overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead>
            <tr className="border-b border-line">
              {b.columns.map((c) => (
                <th key={c} className="eyebrow px-4 py-3 font-normal">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {b.rows.map((r, ri) => (
              <tr key={ri} className="border-b border-line/70 transition-colors last:border-0 hover:bg-bg/60">
                {r.map((cell, ci) => (
                  <td key={ci} className={`px-4 py-3 align-top ${ci === 0 ? 'font-medium text-fg' : 'text-fg/80'}`}>
                    <Cell value={cell} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {b.note && <p className="mt-3 text-sm text-muted">{b.note}</p>}
    </div>
  );
}

function Fixes({ b }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {b.items.map((f, i) => (
        <div key={f.title} className="panel p-5 transition-colors hover:border-accent/50 md:p-6">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="font-semibold">{f.title}</h3>
          </div>
          <div className="mt-4 grid gap-3 text-sm leading-relaxed">
            <p>
              <span className="eyebrow mr-2 text-warn">Issue</span>
              <span className="text-fg/85">{f.problem}</span>
            </p>
            <p>
              <span className="eyebrow mr-2 text-signal">Fix</span>
              <span className="text-fg/85">{f.fix}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function Downloads({ b }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {b.items.map((d) => (
        <li key={d.href}>
          <a href={d.href} download className="panel flex items-center justify-between gap-4 p-4 transition-colors hover:border-accent/60">
            <span>
              <span className="block font-medium">{d.label}</span>
              {d.note && <span className="text-sm text-muted">{d.note}</span>}
            </span>
            <span className="font-mono text-xs text-accent">download ↓</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

const RENDERERS = {
  prose: Prose,
  list: List,
  image: ImageBlock,
  topology: Topology,
  timeline: Timeline,
  specs: Specs,
  table: Table,
  fixes: Fixes,
  downloads: Downloads,
};

export default function Blocks({ blocks }) {
  return (
    <div className="space-y-20">
      {blocks.map((b, i) => {
        const R = RENDERERS[b.type];
        if (!R) return null;
        return (
          <Reveal as="section" key={`${b.type}-${i}`}>
            {b.title && <BlockTitle index={i + 1}>{b.title}</BlockTitle>}
            <R b={b} />
          </Reveal>
        );
      })}
    </div>
  );
}
