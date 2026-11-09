import { notFound } from 'next/navigation';
import { caseStudies, getCaseStudy } from '@/data/caseStudies';
import { profile } from '@/data/profile';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Blocks from '@/components/case/Blocks';
import { ArrowRight } from '@/components/Icons';

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  return {
    title: `${cs.title} — ${profile.name}`,
    description: cs.summary,
  };
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const backHref = cs.kind === 'lab' ? '/#labs' : '/#work';

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-page px-5 pb-10 pt-28 md:px-8 md:pt-36">
        <a href={backHref} className="group inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-accent">
          <ArrowRight width={14} height={14} className="rotate-180 transition-transform group-hover:-translate-x-0.5" />
          {cs.kind === 'lab' ? 'All labs' : 'All work'}
        </a>

        <header className="mt-8 animate-rise">
          <div className="eyebrow">{cs.eyebrow || `${cs.kind === 'lab' ? 'Lab' : 'Case study'} · ${cs.date}`}</div>
          <h1 className="heading mt-4 max-w-4xl text-4xl leading-[1.05] md:text-6xl">{cs.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted">{cs.summary}</p>

          {cs.meta && (
            <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4 font-mono text-sm">
              {cs.meta.map((m) => (
                <div key={m.k}>
                  <dt className="text-xs text-muted">{m.k}</dt>
                  <dd className="mt-1 text-fg">{m.v}</dd>
                </div>
              ))}
            </dl>
          )}

          {cs.stats && (
            <dl
              className={`mt-10 grid grid-cols-2 overflow-hidden rounded-xl border border-line bg-line ${
                cs.stats.length >= 4 ? 'md:grid-cols-4' : 'md:grid-cols-3'
              }`}
              style={{ gap: '1px' }}
            >
              {cs.stats.map((s) => (
                <div key={s.label} className="group bg-panel p-5 transition-colors hover:bg-bg">
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <div className="font-mono text-2xl font-bold text-accent drop-shadow-[0_0_12px_rgb(var(--accent)/0.4)]">{s.value}</div>
                    <div className="mt-1.5 text-[13px] leading-snug text-muted">{s.label}</div>
                  </dd>
                </div>
              ))}
            </dl>
          )}

          {cs.tools && (
            <div className="mt-6 flex flex-wrap gap-2">
              {cs.tools.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="mt-20">
          <Blocks blocks={cs.blocks} />
        </div>

        <div className="mt-24 flex flex-col items-start justify-between gap-6 border-t border-line pt-10 md:flex-row md:items-center">
          <p className="text-lg">
            Want the configs or the full deliverable set? <span className="text-muted">Happy to walk through them.</span>
          </p>
          <div className="flex gap-3">
            <a href={backHref} className="btn-ghost">
              Back
            </a>
            <a href="/#contact" className="btn-primary">
              Get in touch <ArrowRight />
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
