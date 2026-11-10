import { heroCards, metrics, profile } from '@/data/profile';
import DotHero from './DotHero';
import { ArrowRight, LinkedIn, Pin } from './Icons';

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-24 md:pt-28">
      {/* giant word behind the portrait: grey fading down; turns crimson as the reveal band passes */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[88px] select-none md:top-[96px]">
        <div id="dh-banner" className="dh-banner">Portfolio</div>
        <div id="dh-banner-hot" className="dh-banner dh-banner-hot">Portfolio</div>
      </div>

      <div className="relative mx-auto grid max-w-page gap-12 px-5 pt-[12vw] md:px-8 md:pt-[9vw] lg:grid-cols-[minmax(0,1fr)_auto_minmax(250px,0.78fr)] lg:items-center lg:gap-8 lg:pt-[7vw]">
        {/* left: intro */}
        <div className="relative z-10 animate-rise">
          <p className="font-script text-4xl text-fg md:text-5xl">Hello, I’m</p>
          <h1 className="mt-1 inline-block bg-accent px-4 pb-1 pt-2 font-display text-[2.6rem] font-black uppercase leading-none tracking-[-0.03em] text-white shadow-[6px_6px_0_rgb(var(--fg)/0.9)] sm:text-5xl md:text-6xl lg:text-[2.6rem] xl:text-[3rem]">
            {profile.firstName}.
          </h1>
          <div className="mt-6">
            <span className="tag">
              <span className="h-1.5 w-1.5 bg-accent" /> Network deployment & cloud infrastructure
            </span>
          </div>
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-muted">
            I build <strong className="font-semibold text-fg">the physical layer the cloud runs on</strong>: installing, cabling
            and validating <strong className="font-semibold text-fg">high-density network fabric</strong> on hyperscale data
            center floors, and handing it to operations ready for production traffic.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#contact" className="btn-primary">
              Initiate contact <ArrowRight width={15} height={15} />
            </a>
            <a href="#work" className="btn-ghost">
              Explore work
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-10 w-10 place-items-center rounded-lg border border-line bg-panel/60 text-muted transition-colors hover:border-accent/70 hover:text-accent"
              aria-label="LinkedIn profile"
            >
              <LinkedIn />
            </a>
          </div>
          <p className="mt-6 flex items-center gap-1.5 font-mono text-[11px] text-muted">
            <Pin width={13} height={13} /> {profile.location}
          </p>
        </div>

        {/* centre: dot portrait */}
        <div className="relative z-10 animate-rise [animation-delay:120ms]">
          <DotHero />
        </div>

        {/* right: numbered cards */}
        <div className="relative z-10 grid gap-3 animate-rise [animation-delay:220ms]">
          {heroCards.map((c) => (
            <a
              key={c.id}
              href={c.href}
              className="group relative overflow-hidden rounded-[4px] border border-line bg-panel/85 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-x-1 hover:border-accent/70"
            >
              <span className="absolute inset-y-0 left-0 w-[3px] origin-top scale-y-0 bg-accent transition-transform duration-300 group-hover:scale-y-100" />
              <div className="flex items-start justify-between gap-3">
                <span className="font-mono text-[11px] font-bold text-muted">{c.id}.</span>
                <span className="tag-ghost group-hover:border-accent/60 group-hover:text-accent">{c.tag}</span>
              </div>
              <h3 className="mt-1 font-display text-lg font-extrabold tracking-tight">{c.title}</h3>
              <p className="mt-1 text-[13px] leading-snug text-muted">{c.body}</p>
            </a>
          ))}
        </div>
      </div>

      {/* metrics */}
      <div className="relative mx-auto mt-14 max-w-page px-5 md:mt-16 md:px-8">
        <dl className="grid grid-cols-2 gap-3 md:grid-cols-5">
          {metrics.map((m, i) => (
            <div
              key={m.label}
              className={`group rounded-[4px] border border-line bg-panel/85 p-4 text-center transition-all hover:-translate-y-0.5 hover:border-accent/60 ${
                i === metrics.length - 1 ? 'col-span-2 md:col-span-1' : ''
              }`}
            >
              <dt className="sr-only">{m.label}</dt>
              <dd>
                <div className="font-mono text-2xl font-bold text-accent drop-shadow-[0_0_12px_rgb(var(--accent)/0.45)] md:text-[1.7rem]">
                  {m.value}
                </div>
                <div className="mt-1 text-[12px] leading-snug text-muted">{m.label}</div>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
