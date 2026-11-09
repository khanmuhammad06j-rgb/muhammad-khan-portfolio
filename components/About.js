import { about } from '@/data/profile';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-page px-5 pt-24 md:px-8 md:pt-32">
      <SectionHeading index="04" label="About" title="Between the design and the live region." />
      <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
        <Reveal className="space-y-5 text-lg leading-relaxed text-fg/85">
          {about.paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </Reveal>

        <Reveal delay={120}>
          <div className="panel p-6">
            <div className="eyebrow mb-4">show running-config</div>
            <dl className="divide-y divide-line font-mono text-sm">
              {about.facts.map((f) => (
                <div key={f.k} className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-muted">{f.k}</dt>
                  <dd className="text-right text-fg">{f.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
