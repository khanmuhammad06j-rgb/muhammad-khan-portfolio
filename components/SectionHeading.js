import Reveal from './Reveal';

export default function SectionHeading({ index, label, title, kicker, children }) {
  return (
    <Reveal className="mb-10 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between">
      <div>
        <div className="eyebrow">
          {index && <span className="mr-2 text-muted">{index}</span>}
          {label}
        </div>
        <h2 className="heading mt-3 max-w-3xl text-4xl md:text-5xl">{title}</h2>
        {kicker && <p className="mt-3 max-w-2xl text-muted">{kicker}</p>}
      </div>
      {children}
    </Reveal>
  );
}
