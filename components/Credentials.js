import { certifications, education } from '@/data/profile';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function Credentials() {
  return (
    <section id="credentials" className="mx-auto max-w-page px-5 pt-24 md:px-8 md:pt-32">
      <SectionHeading index="07" label="Credentials" title="Trained, certified, still climbing." />

      <div className="grid gap-6 lg:grid-cols-2">
        <Reveal className="panel p-6 md:p-8">
          <div className="eyebrow mb-5">Education & training</div>
          <ul className="space-y-6">
            {education.map((e) => (
              <li key={e.title} className="grid gap-1">
                <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                  <h3 className="font-semibold">{e.title}</h3>
                  <span className="font-mono text-xs text-muted">{e.dates}</span>
                </div>
                <p className="font-mono text-sm text-accent">{e.org}</p>
                <p className="text-sm text-muted">{e.detail}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={100} className="panel p-6 md:p-8">
          <div className="eyebrow mb-5">Certifications</div>
          <ul className="grid gap-3">
            {certifications.map((c) => (
              <li
                key={c.name}
                className="flex items-center justify-between gap-4 rounded-lg border border-line bg-bg/50 px-4 py-3 transition-colors hover:border-accent/50"
              >
                <div>
                  <div className="text-sm font-medium">{c.name}</div>
                  <div className="text-xs text-muted">{c.issuer}</div>
                </div>
                {c.status === 'progress' ? (
                  <span className="shrink-0 rounded border border-warn/40 bg-warn/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-warn">
                    in progress
                  </span>
                ) : (
                  <span className="shrink-0 rounded border border-signal/40 bg-signal/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-signal">
                    earned
                  </span>
                )}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
