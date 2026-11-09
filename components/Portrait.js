import { profile } from '@/data/profile';

// Duotone server-rack illustration, used only when no photo is set.
function RackArt() {
  const units = Array.from({ length: 14 });
  return (
    <svg viewBox="0 0 240 320" className="h-full w-full" role="img" aria-label="Server rack illustration">
      <rect x="52" y="22" width="136" height="290" rx="4" fill="#0b0b0c" />
      <rect x="60" y="30" width="120" height="274" rx="2" fill="#151517" />
      {units.map((_, i) => {
        const y = 36 + i * 19;
        return (
          <g key={i}>
            <rect x="64" y={y} width="112" height="15" rx="1.5" fill="#101012" stroke="#2a2a2e" strokeWidth="0.8" />
            <circle cx="166" cy={y + 7.5} r="2" fill={i === 6 ? '#ff3038' : '#4ade80'} className="animate-blink" style={{ animationDelay: `${(i * 0.23) % 1.6}s` }} />
          </g>
        );
      })}
    </svg>
  );
}

export default function Portrait() {
  return (
    <div className="group relative mx-auto aspect-[3/4] w-full max-w-[320px]">
      {/* offset outline frame */}
      <div className="absolute -inset-2.5 rounded-[3px] border border-accent/70 transition-transform duration-500 group-hover:translate-x-1.5 group-hover:translate-y-1.5" />
      {/* corner ticks */}
      <span aria-hidden className="absolute -left-2.5 -top-2.5 h-3 w-3 border-l-2 border-t-2 border-accent" />
      <span aria-hidden className="absolute -bottom-2.5 -right-2.5 h-3 w-3 border-b-2 border-r-2 border-accent" />

      <div className="relative h-full w-full overflow-hidden rounded-[2px] bg-accent shadow-[0_30px_80px_-20px_rgb(var(--accent)/0.65)]">
        {profile.photo ? (
          <>
            {/* red duotone */}
            <img
              src={profile.photo}
              alt={`Portrait of ${profile.name}`}
              width={900}
              height={1200}
              fetchPriority="high"
              className="absolute inset-0 h-full w-full object-cover object-[60%_20%] mix-blend-multiply contrast-[1.35] grayscale"
            />
            {/* full color on hover / tap */}
            <img
              src={profile.photo}
              alt=""
              aria-hidden
              width={900}
              height={1200}
              className="absolute inset-0 h-full w-full object-cover object-[60%_20%] opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-active:opacity-100"
            />
          </>
        ) : (
          <RackArt />
        )}

        {/* scanline */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="h-1/3 w-full animate-scan bg-gradient-to-b from-transparent via-white/15 to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-black/80 px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
          <span>
            <span className="text-accent">■</span> {profile.name}
          </span>
        </div>
      </div>
    </div>
  );
}
