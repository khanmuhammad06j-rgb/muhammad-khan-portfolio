# Muhammad Khan — Portfolio

Personal portfolio for **Muhammad Khan**, network deployment technician (via TEKsystems) on hyperscale cloud data center builds, targeting cloud infrastructure, network deployment and provisioning roles.

> *I build the physical layer the cloud runs on.*

## Overview

Bold black-and-red design: a circular "Portrait in Dots" hero (about 16,700 crimson halftone dots that follow the cursor in 3D and open into the real photo as you scroll), a floating pill nav, a Flagship case study, a filterable Systems Matrix with security projects, a Results Ledger and a clickable Layer Stack of skills.

**Sections**

| Section | What it shows |
| --- | --- |
| Hero | "Hello, I'm" intro, the dot portrait (scroll to reveal the photo), three highlight cards, five headline metrics |
| Flagship | The NetNova capstone with stats, build sequence and a link to the full case study |
| Systems Matrix | Production, leadership and 8 CodePath security projects (each with its own page), with category filters |
| Results Ledger | Ten NDA-safe results with count-up numbers and mini visuals (uptime bars, check grid, power gauge) |
| About | Short narrative plus a "running-config" quick-facts panel |
| Experience | Timeline, with the current deployment role highlighted |
| Layer Stack | Click a layer (Physical, Network, Systems, AWS, Operations, Security) to inspect its skills |
| Credentials | Education, training and certifications (earned and in progress) |
| Contact | Email (mailto + copy to clipboard) and LinkedIn |

**Features**

- Next.js 15 App Router with Tailwind CSS 3, JavaScript only
- Dark / light mode toggle, remembered across visits, with no flash on load
- Fully responsive, with a mobile menu
- Subtle motion: fiber-link animation, reveal-on-scroll, hover lift on cards; all turned off when the visitor's system prefers reduced motion
- Self-hosted Archivo, Space Mono and Caveat fonts via npm, so no external font requests and no environment variables
- Statically prerendered home page

## Local setup

Requires **Node.js 18.18+** (Node 20 or 22 recommended).

```bash
npm install && npm run dev
```

Then open http://localhost:3000.

Production build check:

```bash
npm run build
npm start
```

## Project structure

```
.
├── app/
│   ├── globals.css        # Theme tokens (light/dark), base styles, component classes
│   ├── icon.svg           # Favicon (spine/leaf mark)
│   ├── layout.js          # Root layout, metadata, no-flash theme script
│   ├── page.js            # Page composition
│   └── projects/[slug]/
│       └── page.js        # Case study & lab detail pages (statically generated)
├── components/
│   ├── Nav.js             # Sticky nav + mobile menu
│   ├── ThemeToggle.js     # Dark/light switch
│   ├── Hero.js            # Outlined title, intro, cards, metrics strip
│   ├── DotHero.js         # Dot portrait (loads lib/dotEngine.js)
│   ├── Results.js         # Results Ledger
│   ├── CountUp.js         # Animated numbers
│   ├── Flagship.js        # Featured case study
│   ├── Projects.js        # Systems Matrix with filters (includes labs)
│   ├── case/Blocks.js     # Renders case-study content blocks
│   ├── About.js
│   ├── Experience.js
│   ├── Skills.js
│   ├── Credentials.js
│   ├── Contact.js
│   ├── Footer.js
│   ├── SectionHeading.js
│   ├── Reveal.js          # IntersectionObserver fade-in
│   └── Icons.js           # Inline SVG icons (no icon library)
├── data/
│   ├── profile.js         # Home page content
│   └── caseStudies.js     # Case study + lab pages
├── public/
│   └── projects/<slug>/   # Images and .pkt files for each project
├── lib/dotEngine.js       # Three.js dot renderer (+ 2D fallback, photo fallback)
├── middleware.js          # Per-request Content Security Policy (nonce)
├── next.config.js         # Security headers
├── tailwind.config.js
├── postcss.config.js
├── jsconfig.json
└── package.json
```

## Editing content

Home page content comes from `data/profile.js`; detail pages come from `data/caseStudies.js`. Update metrics, projects, roles, skills or certifications there; no component changes are needed. Colors for both themes are CSS variables at the top of `app/globals.css`.

## Adding a Cisco Packet Tracer project

1. **Add the files.** Create `public/projects/<your-slug>/` and drop in a topology screenshot (PNG/JPG) and, if you want visitors to download it, the `.pkt` file.
2. **Add the entry.** In `data/caseStudies.js`, copy the commented `TEMPLATE` at the top of the file into the `caseStudies` array, set `kind: 'lab'`, and fill in the title, summary, tools and blocks.
3. **Run it.** `npm run dev`. The lab appears in the Systems Matrix under a **Labs** filter, and gets its own page at `/projects/<your-slug>`.

Blocks you can use: `prose`, `list`, `image`, `topology`, `timeline`, `specs`, `table` (cells reading `PASS`, `FIXED`, `FAIL`, `HIGH`, `MED` or `LOW` become colored badges), `fixes` and `downloads`.

To promote a project to the Featured Work section instead, set `kind: 'case-study'`, add a card to `projects` in `data/profile.js`, and set `caseStudy: '<your-slug>'` on that card to show the "Read the full case study" button.

## Changing the photo

Replace `public/me.jpg` (3:4 portrait works best). Strip location data first: most phone photos embed GPS coordinates. The included photo has already been stripped.

## Security

The site has no forms, database, login, API routes or environment variables, so there is very little to attack. On top of that:

- **Content Security Policy** (`middleware.js`): a fresh nonce on every request, so only the site's own scripts can run; injected scripts (XSS), plugins and iframes are blocked.
- **Security headers** (`next.config.js`): HSTS (HTTPS only), clickjacking protection (`X-Frame-Options: DENY`, `frame-ancestors 'none'`), no MIME sniffing, strict referrer policy, camera/mic/location and other browser features disabled, cross-origin isolation.
- **Patched dependencies**: Next.js 15.5.29 and React 19.1.10, with `postcss` and `sharp` pinned to patched versions; `npm audit` reports 0 vulnerabilities. Re-run `npm audit` every few weeks.
- **No framework fingerprinting**: `X-Powered-By` header and browser source maps are off.
- **Spam protection**: the email address is never in the HTML; the browser assembles it.
- **Privacy**: photo metadata (including GPS) removed; no trackers, analytics or third-party requests.
- **Responsible disclosure**: `/.well-known/security.txt`.

DDoS protection and TLS certificates come from wherever the site is hosted.

## The dot portrait

`public/hero/dots.bin` holds the dots (position, surface normal, brightness, size class) generated from `public/hero/photo.webp` with AI depth estimation and a person cut-out. `lib/dotEngine.js` draws them with Three.js. If WebGL is unavailable or fails its self-check, it switches to a Canvas 2D halftone; if that fails, the plain photo shows. Without JavaScript the photo shows too.
