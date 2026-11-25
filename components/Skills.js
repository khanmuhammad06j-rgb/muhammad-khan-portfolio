'use client';

import { useState } from 'react';
import { skills } from '@/data/profile';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function Skills() {
  const [active, setActive] = useState(0);

  return (
    <section id="skills" className="mx-auto max-w-page px-5 pt-24 md:px-8 md:pt-32">
      <SectionHeading
        index="06"
        label="Capability stack"
        title="The Layer Stack"
        kicker="Organized the way I troubleshoot: start at the physical layer and work up. Click a layer to inspect it."
      />

      <Reveal className="grid gap-5 lg:grid-cols-[1fr_1.2fr]">
        {/* stack */}
        <div className="flex flex-col gap-2" role="tablist" aria-label="Skill layers">
          {skills.map((s, i) => {
            return (
              <button
                key={s.layer}
                type="button"
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                data-layer={i}
                className="group flex items-center justify-between rounded-[4px] border border-line bg-panel/80 px-4 py-3 text-left transition-all duration-300 hover:translate-x-1 hover:border-accent/60 aria-selected:translate-x-2 aria-selected:border-accent aria-selected:bg-accentfill aria-selected:text-white aria-selected:shadow-[0_10px_30px_-10px_rgb(var(--accent)/0.8)]"
                style={{ marginRight: `${(skills.length - 1 - i) * 6}px` }}
              >
                <span className="flex items-center gap-3">
                  <span className="w-14 font-mono text-[11px] font-bold text-accent group-aria-selected:text-white">{s.layer}</span>
                  <span className="font-display font-bold">{s.name}</span>
                </span>
                <span className="font-mono text-[11px] text-muted group-aria-selected:text-white">{s.items.length} skills</span>
              </button>
            );
          })}
        </div>

        {/* inspector */}
        <div className="panel relative overflow-hidden p-6 md:p-8">
          {skills.map((s, i) => (
            <div key={s.layer} hidden={i !== active} data-layer-panel={i} className="animate-rise">
              <div className="flex items-center justify-between">
                <span className="tag">
                  {s.layer} · {s.name}
                </span>
                <span className="font-mono text-[11px] text-muted">inspect</span>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {s.items.map((item) => (
                  <span key={item} className="chip text-[12.5px]">
                    {item}
                  </span>
                ))}
              </div>
              <p className="mt-8 border-t border-line pt-4 font-mono text-[11px] leading-relaxed text-muted">{s.note}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
