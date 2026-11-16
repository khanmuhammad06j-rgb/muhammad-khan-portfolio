import { profile } from '@/data/profile';

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-page flex-col gap-2 px-5 py-8 font-mono text-xs text-muted md:flex-row md:items-center md:justify-between md:px-8">
        <span className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <a href="/privacy" className="underline-offset-2 transition-colors hover:text-accent hover:underline">
            Privacy & legal
          </a>
          <a href="/.well-known/security.txt" className="underline-offset-2 transition-colors hover:text-accent hover:underline">
            Report a security issue
          </a>
        </span>
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-signal" /> all links up · built with Next.js & Tailwind CSS
        </span>
      </div>
    </footer>
  );
}
