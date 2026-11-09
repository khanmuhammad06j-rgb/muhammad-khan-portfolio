import { earlier, experience } from '@/data/profile';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-page px-5 pt-24 md:px-8 md:pt-32">
      <SectionHeading
        index="05"
        label="Experience"
        title="Where the work happened."
        kicker="Production infrastructure first; the roles before it are where the troubleshooting, ownership and calm under pressure came from."
      />

      <ol className="relative border-l border-line pl-6 md:pl-10">
        {experience.map((job, i) => (
          <Reveal as="li" key={job.org} delay={i * 60} className="group relative pb-12 last:pb-0">
            <span
              aria-hidden
              className={`absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 md:-left-[47px] ${
                job.current ? 'border-signal bg-signal/30' : 'border-line bg-bg group-hover:border-accent'
              } transition-colors`}
            />
            <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
              <h3 className="text-lg font-semibold tracking-tight md:text-xl">
                {job.role}
                {job.current && (
                  <span className="ml-3 rounded border border-signal/40 bg-signal/10 px-1.5 py-0.5 align-middle font-mono text-[10px] uppercase tracking-wider text-signal">
                    current
                  </span>
                )}
              </h3>
              <span className="font-mono text-xs text-muted">{job.dates}</span>
            </div>
            <p className="mt-1 font-mono text-sm text-accent">
              {job.org} <span className="text-muted">· {job.place}</span>
            </p>
            <ul className="mt-4 space-y-2.5">
              {job.points.map((pt) => (
                <li key={pt.slice(0, 32)} className="flex gap-3 leading-relaxed text-fg/85">
                  <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-muted" />
                  {pt}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </ol>

      <Reveal>
        <p className="mt-10 border-t border-line pt-6 text-sm text-muted">{earlier}</p>
      </Reveal>
    </section>
  );
}
