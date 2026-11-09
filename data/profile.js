// Single source of truth for all site content.
// Edit this file to update the portfolio — components read from it.

export const profile = {
  name: 'Muhammad Khan',
  initials: 'MK',
  firstName: 'MUHAMMAD',
  // Portrait shown in the hero frame (metadata stripped). Set to null to show the rack illustration instead.
  photo: '/me.jpg',
  role: 'Network Deployment · Cloud Infrastructure',
  tagline: 'I build the physical layer the cloud runs on.',
  intro:
    'Network deployment technician (via TEKsystems) on hyperscale cloud data center builds. I install, cable and validate high-density network fabric — optics, fiber trunks, out-of-band management — and hand it to operations ready for production traffic.',
  location: 'Lorton, VA · Washington DC–Baltimore',
  availability: 'Open to cloud & network infrastructure roles',
  // Stored in two parts and joined in the browser so simple spam scrapers can't harvest it from the HTML.
  emailParts: ['khanmuhammad06j', 'gmail.com'],
  linkedin: 'https://www.linkedin.com/in/muhammadkhan-u',
  linkedinLabel: 'linkedin.com/in/muhammadkhan-u',
};

// Three cards beside the hero portrait (link to sections or case studies)
export const heroCards = [
  { id: '01', title: 'Hyperscale Deployment', body: 'Install, cable and validate high-density network fabric for production go-live.', tag: 'Production', href: '#work' },
  { id: '02', title: 'NetNova Capstone', body: 'Led 7 engineers from empty rack to a validated, hardened network.', tag: 'Lead', href: '/projects/netnova-data-center-capstone' },
  { id: '03', title: 'Fault Isolation', body: 'Logs and optical readings first; hands on hardware only when it counts.', tag: 'Operations', href: '#work' },
];

export const metrics = [
  { value: '7', label: 'engineers led as capstone project manager' },
  { value: '12/12', label: 'capstone validation checks passing at handoff' },
  { value: '99.9%', label: 'uptime on a storefront I ran end to end' },
  { value: '500+', label: 'people a night, 30 nights, 100% safety compliance' },
  { value: '3.77', label: 'GPA, A.S. Information Technology' },
];

// Results ledger — every number comes from my own work, never from the client's operations.
// kind controls the mini-visual: uptime | checks | gauge | nights | certs | plain
export const results = [
  { kind: 'uptime', value: '99.9%', label: 'Storefront uptime while running the full Shopify and analytics stack solo — including root-causing a critical plugin conflict.', source: 'Ummroayyaar Jewelry', span: 2 },
  { kind: 'checks', value: '12/12', total: 12, fixed: 1, label: 'Capstone validation checks passing at handoff. One defect caught in testing and fixed before sign-off.', source: 'NetNova capstone' },
  { kind: 'gauge', value: '69%', pct: 69, label: 'Power headroom built into the rack budget: ~550 W on an 1,800 W circuit.', source: 'NetNova capstone' },
  { kind: 'nights', value: '500+', nights: 30, label: 'Attendees a night for 30 straight nights, with 100% safety and occupancy compliance and audit-ready logs.', source: 'Adams Center', span: 2 },
  { kind: 'plain', value: '4', label: 'Teams aligned on one master IP plan after overlapping subnets broke routing.', source: 'NetNova capstone' },
  { kind: 'plain', value: '3', label: 'Teammates trained on my fault-isolation workflow on a live production floor.', source: 'Current contract' },
  { kind: 'plain', value: '15+/wk', label: 'Login, platform and Wi-Fi issues resolved for 30+ daily users.', source: 'Fairfax County Public Schools' },
  { kind: 'plain', value: '~15%', label: 'Fewer service errors (estimated) after I came back as senior crew to train new hires.', source: 'The Halal Guys' },
  { kind: 'plain', value: '200+', label: 'Hours of hands-on data center training: Cisco, ESXi, Linux, Windows and structured cabling.', source: 'Per Scholas × TEKsystems' },
  { kind: 'certs', value: '5', earned: 5, progress: 1, label: 'Certifications earned, with AWS Solutions Architect – Associate in progress.', source: 'Credentials' },
];

export const about = {
  paragraphs: [
    'Most people meet the cloud as a console. I meet it as cold aisles, fiber trays and a runbook. My job is the step between an engineering design and a live region: making sure every transceiver seats, every link comes up clean, and every rack reaches operations documented and ready.',
    'I came into IT through the Per Scholas × TEKsystems Data Center program, where I led a seven-person team through a full enterprise network build. Since then I have moved straight onto production hyperscale data center floors, completed CodePath’s Intermediate Cybersecurity program, and kept going on an A.S. in IT — with AWS Solutions Architect – Associate next.',
    'What I bring: speed without shortcuts, calm troubleshooting on live equipment, and trackers that other people can actually rely on.',
  ],
  facts: [
    { k: 'Focus', v: 'Hyperscale DC deployment' },
    { k: 'Fabric', v: 'Spine/leaf · L1–L4' },
    { k: 'Capstone', v: 'Project lead · 7 engineers' },
    { k: 'Next cert', v: 'AWS Solutions Architect' },
    { k: 'Education', v: 'A.S. IT · GPA 3.77' },
  ],
};

export const projects = [
  {
    id: '01',
    category: 'Deployment',
    eyebrow: 'Hyperscale cloud data center · via TEKsystems · 2026',
    title: 'Production network deployment at hyperscale',
    summary:
      'New data center capacity has to be cabled, validated and handed to operations before it can carry customer traffic. My work is the step between the engineering design and that handoff.',
    context:
      'Tight go-live windows, live production equipment next door, and many teams depending on accurate build status.',
    actions: [
      'Deploy network infrastructure from engineering runbooks in a spine/leaf architecture',
      'Install and validate optical transceivers and patch high-density fiber trunks',
      'Review validation results and clear link and port errors until equipment passes',
      'Hand off to operations with completed work, open items and next steps documented',
    ],
    tags: ['Spine/leaf', 'Optical transceivers', 'Fiber trunks', 'Runbooks', 'L1/L2 validation', 'Operational handoff'],
  },
  {
    id: '02',
    category: 'Operations',
    eyebrow: 'Hyperscale cloud data center · production floor · 2026',
    title: 'Fault isolation & out-of-band recovery',
    summary:
      'When a link fails on a live floor, the expensive mistake is guessing. I narrow the problem down from logs and monitoring first, then decide whether it needs a remote fix, a power cycle, or hands on hardware.',
    context: 'Unlabeled or misidentified cabling, and neighboring equipment carrying production traffic.',
    actions: [
      'Read system logs and optical power readings to localize link failures',
      'Traced faults through topology diagrams to correct mislabeled or misrouted cabling',
      'Safely drained and powered down devices through change tickets, then brought them back up',
      'Rebuilt console / out-of-band management devices to restore remote access',
    ],
    outcomes: [
      { value: '3', label: 'teammates trained on the workflow' },
      { value: 'Go-to', label: 'pulled in to help other crews' },
    ],
    tags: ['Root cause analysis', 'Optical power', 'Topology tracing', 'Out-of-band mgmt', 'Change control', 'Escalation'],
  },
  {
    id: '03',
    category: 'Leadership',
    eyebrow: 'Per Scholas × TEKsystems capstone · May 2026',
    title: 'NetNova data center build — project lead',
    summary:
      'Led a seven-person team that took a scenario client from an empty rack quarter to a segmented, hardened and fully validated network on real Cisco and Dell hardware — designed first in Packet Tracer, delivered in seven days.',
    context: 'A rack shared by four teams, a fixed seven-day plan, and a client-style handoff with full documentation.',
    actions: [
      'Planned the seven-day build and assigned network, systems, cabling, security, docs and QA roles',
      'Aligned all four teams on one master IP plan after overlapping subnets broke routing',
      'Delivered VLAN segmentation, router-on-a-stick, NAT, SSH-only access and ESXi + Windows Server 2019',
      'Closed a VLAN-bleed defect with ACLs and mapped five single points of failure with mitigations',
    ],
    outcomes: [
      { value: '12/12', label: 'validation checks passing' },
      { value: '69%', label: 'power headroom on circuit' },
      { value: '7', label: 'engineers led' },
    ],
    tags: ['Project management', 'Cisco IOS', 'VLANs', 'ASA', 'VMware ESXi', 'Packet Tracer'],
    caseStudy: 'netnova-data-center-capstone',
  },
];

// The Flagship section features one case study from data/caseStudies.js
export const flagship = {
  caseStudy: 'netnova-data-center-capstone',
  tag: 'Capstone · Project lead',
  environment: 'Hardware: Cisco ISR · ASA · Catalyst · Dell R630 — real gear, 7-day build',
  title: 'NetNova — Enterprise Data Center Build',
  sequence: ['Plan & power budget', 'Rack & cable', 'VLANs & routing', 'ESXi + Server 2019', 'Harden', 'Validate', 'Handoff'],
};

export const experience = [
  {
    role: 'Network Deployment Technician (Contract)',
    org: 'TEKsystems · hyperscale cloud data center',
    dates: 'Jun 2026 — Present',
    place: 'Washington DC–Baltimore',
    current: true,
    points: [
      'Deploy and validate high-density spine/leaf network infrastructure for new data center capacity, from engineering runbooks through go-live.',
      'Run L1/L2 validation for go-live readiness and clear link, port and device errors during peak deployment windows.',
      'Isolate faults remotely from logs and optical power readings; drain, rebuild and recover out-of-band management devices without affecting adjacent traffic.',
      'Keep shared trackers and tickets current for program managers, planners and engineers; coordinate daily with operations, engineering and vendors and drive escalations to closure.',
      'Trained 3 teammates on troubleshooting workflows and became a go-to for helping other crews with patching.',
    ],
  },
  {
    role: 'Founder',
    org: 'Ummroayyaar Jewelry',
    dates: 'Apr 2025 — Jul 2026',
    place: 'Virginia',
    points: [
      'Ran the full Shopify + Google Analytics stack solo and kept the storefront at 99.9% uptime.',
      'Root-caused a critical app/plugin conflict through the theme editor and app settings, restoring full site functionality and preventing recurrence.',
      'Owned Google and Meta ad campaigns, vendor relationships, tax documentation and books.',
    ],
  },
  {
    role: 'Operations Support (Contract)',
    org: 'Adams Center',
    dates: 'Feb 2026 — Mar 2026',
    place: 'Sterling, VA',
    points: [
      'Controlled access and crowd flow for 500+ attendees a night across 30 consecutive nights with minimal incidents.',
      'Coordinated logistics and security response by radio at 100% safety and occupancy compliance; kept audit-ready overnight logs.',
    ],
  },
  {
    role: 'Substitute Instructional Assistant',
    org: 'Fairfax County Public Schools',
    dates: 'Aug 2023 — Present',
    place: 'Fairfax County, VA',
    points: [
      'The go-to for classroom tech: resolve 15+ authentication, platform and Wi-Fi issues weekly via Google Admin Console and Schoology for 30+ daily users.',
      'Onboarded onto Schoology, Clever and SIS across multiple sites and standardized workflows to shorten teacher setup.',
    ],
  },
];

export const earlier =
  'Earlier: Verizon Fios field sales (CRM, territory lead) and The Halal Guys, where I returned as senior crew to train new hires — an estimated 15% drop in service errors.';

export const skills = [
  {
    layer: 'L1',
    note: 'Where most outages start. Seat it, light it, read the optical levels, label both ends.',
    name: 'Physical',
    items: ['Optical transceivers', 'Fiber & copper', 'MPO trunks', 'Structured cabling', 'Rack & stack', 'Patch panels', 'TX/RX power analysis', 'Preventive maintenance'],
  },
  {
    layer: 'L2–L4',
    note: 'Segmentation, routing and reachability — designed in Packet Tracer, proven on real Cisco gear.',
    name: 'Network',
    items: ['Spine/leaf fabric', 'TCP/IP', 'VLANs', 'Inter-VLAN routing', 'Cisco IOS', 'DNS · DHCP', 'SSH', 'Link troubleshooting', 'Cisco Packet Tracer'],
  },
  {
    layer: 'SYS',
    note: 'Hosts, hypervisors and the out-of-band path that keeps remote access alive when the network isn\'t.',
    name: 'Systems',
    items: ['Linux CLI & logs', 'Windows / Windows Server', 'VMware ESXi', 'VirtualBox', 'Serial console', 'Out-of-band management', 'Device drain & power-up'],
  },
  {
    layer: 'CLOUD',
    note: 'Studying for AWS Solutions Architect – Associate on top of hands-on hyperscale floor experience.',
    name: 'AWS',
    items: ['VPC', 'EC2', 'S3', 'IAM', 'Route 53', 'Hyperscale DC infrastructure'],
  },
  {
    layer: 'OPS',
    note: 'Runbooks, tickets and trackers other people can rely on — the difference between a build and a handoff.',
    name: 'Operations',
    items: ['Runbook execution', 'Change control', 'Incident management', 'Root cause analysis', 'ServiceNow', 'Freshdesk', 'Escalation', 'Excel trackers', 'Vendor coordination', 'Documentation'],
  },
  {
    layer: 'SEC',
    note: 'Harden in small steps and test each one: SSH-only, port security, ACLs, least privilege.',
    name: 'Security',
    items: ['Security hardening', 'Access control', 'CodePath Intermediate Cybersecurity', 'Incident response basics'],
  },
];

export const education = [
  {
    title: 'A.S. Information Technology',
    org: 'Northern Virginia Community College',
    detail: 'GPA 3.77 / 4.00 · networking & hardware labs',
    dates: 'Expected Aug 2027',
  },
  {
    title: 'Data Center Program — 200+ hours',
    org: 'Per Scholas × TEKsystems',
    detail: 'Cisco IOS, ESXi, Linux & Windows admin, cabling & topology',
    dates: 'Apr — May 2026',
  },
  {
    title: 'Intermediate Cybersecurity',
    org: 'CodePath',
    detail: 'Threats, defenses and hands-on security labs',
    dates: 'Jun — Aug 2026',
  },
];

export const certifications = [
  { name: 'AWS Certified Solutions Architect – Associate', issuer: 'Amazon Web Services', status: 'progress' },
  { name: 'Google IT Support Professional Certificate', issuer: 'Google', status: 'earned' },
  { name: 'AWS Cloud Practitioner Essentials', issuer: 'Amazon Web Services', status: 'earned' },
  { name: 'ITSM Fundamentals (Zurich)', issuer: 'ServiceNow', status: 'earned' },
  { name: 'Networking, Hardware & OS Basics', issuer: 'Cisco Networking Academy', status: 'earned' },
  { name: 'OSHA 10 · NFPA 70E', issuer: 'Electrical & site safety', status: 'earned' },
];

export const nav = [
  { href: '/#work', label: 'Flagship' },
  { href: '/#matrix', label: 'Matrix' },
  { href: '/#results', label: 'Results' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#skills', label: 'Stack' },
  { href: '/#contact', label: 'Contact' },
];
