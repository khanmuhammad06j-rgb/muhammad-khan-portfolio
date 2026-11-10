import Link from 'next/link';
import { getCaseStudy } from '@/data/caseStudies';
import { flagship } from '@/data/profile';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { ArrowRight } from './Icons';

export default function Flagship() {
  const cs = getCaseStudy(flagship.caseStudy);
  if (!cs) return null;

  return (
    <section id="work" className="mx-auto max-w-page px-5 pt-24 md:px-8 md:pt-32">
      <SectionHeading
        index="01"
        label="Field showcase"
        title="Flagship Deployment"
        kicker="The build I can show end to end, with every diagram, test and fix documented."
      />

      <Reveal className="panel relative overflow-hidden p-6 md:p-10">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 animate-glow rounded-full blur-3xl"
          style={{ background: 'radial-gradient(closest-side, rgb(var(--accent) / 0.35), transparent)' }}
        />

        <div className="relative flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <span className="tag w-fit">▸ {flagship.tag}</span>
          <span className="font-mono text-[11px] text-muted">{flagship.environment}</span>
        </div>

        <h3 className="heading relative mt-5 max-w-3xl text-3xl md:text-[2.6rem] md:leading-[1.05]">{flagship.title}</h3>
        <p className="relative mt-4 max-w-3xl leading-relaxed text-muted">{cs.summary}</p>

        <dl className="relative mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          {cs.stats.map((s) => (
            <div key={s.label} className="rounded-[4px] border border-line bg-bg/70 p-4 text-center transition-colors hover:border-accent/60">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <div className="font-mono text-2xl font-bold text-accent drop-shadow-[0_0_12px_rgb(var(--accent)/0.4)]">{s.value}</div>
                <div className="mt-1 text-[12px] leading-snug text-muted">{s.label}</div>
              </dd>
            </div>
          ))}
        </dl>

        <div className="relative mt-8 border-t border-line pt-6">
          <div className="eyebrow mb-3">Build sequence</div>
          <ol className="flex flex-wrap gap-2">
            {flagship.sequence.map((step, i) => (
              <li key={step} className="flex items-center gap-2">
                <span className="rounded-[3px] border border-line bg-bg/70 px-2.5 py-1 font-mono text-[11px] text-fg/85 transition-colors hover:border-accent/60 hover:text-accent">
                  <span className="text-accent">{String(i + 1).padStart(2, '0')}</span> {step}
                </span>
                {i < flagship.sequence.length - 1 && <span className="font-mono text-xs text-accent/70">→</span>}
              </li>
            ))}
          </ol>
        </div>

        <div className="relative mt-8 flex flex-wrap items-center gap-3">
          <Link href={`/projects/${cs.slug}`} className="btn-primary">
            Read the full case study <ArrowRight width={15} height={15} />
          </Link>
          <div className="flex flex-wrap gap-2">
            {cs.tools.slice(0, 5).map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
