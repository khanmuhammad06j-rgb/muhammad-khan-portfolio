// Case studies and lab projects. Each entry becomes a page at /projects/<slug>.
//
// kind: 'case-study' → linked from a Featured Work card (set `caseStudy: '<slug>'` on that project in profile.js)
// kind: 'lab'        → listed automatically in the "Labs" section on the home page
//
// A page is built from `blocks`, rendered top to bottom. Available block types:
//   prose     { title, body: ['paragraph', ...] }
//   list      { title, items: ['...'] }
//   image     { title, src, alt, caption, width, height }          (put files in /public/projects/<slug>/)
//   topology  { title, caption, tiers: [{ nodes: [{ name, detail }] }] }
//   timeline  { title, steps: [{ when, title, body }] }
//   specs     { title, cards: [{ title, items: ['...'] }] }
//   table     { title, columns: ['...'], rows: [['...']], note }  (cells reading PASS / FIXED / FAIL / HIGH / MED / LOW render as badges)
//   fixes     { title, items: [{ title, problem, fix }] }
//   downloads { title, items: [{ label, href, note }] }             (e.g. a .pkt file in /public/projects/<slug>/)
//
// ── TEMPLATE: copy this into the array below to add a Cisco Packet Tracer lab ─────────
// {
//   slug: 'ospf-multi-area-lab',
//   kind: 'lab',
//   title: 'Multi-area OSPF with route summarization',
//   summary: 'One or two sentences on what the lab proves.',
//   date: '2026',
//   tools: ['Cisco Packet Tracer', 'OSPF', 'VLANs'],
//   stats: [{ value: '3', label: 'OSPF areas' }, { value: '100%', label: 'ping tests passing' }],
//   blocks: [
//     { type: 'prose', title: 'Goal', body: ['What problem the topology solves.'] },
//     { type: 'image', title: 'Topology', src: '/projects/ospf-multi-area-lab/topology.png', alt: 'Packet Tracer topology', width: 1200, height: 800 },
//     { type: 'list', title: 'What I configured', items: ['...'] },
//     { type: 'table', title: 'Verification', columns: ['Test', 'Result'], rows: [['R1 → R4 ping', 'PASS']] },
//     { type: 'downloads', title: 'Files', items: [{ label: 'Packet Tracer file (.pkt)', href: '/projects/ospf-multi-area-lab/lab.pkt' }] },
//   ],
// },
// ───────────────────────────────────────────────────────────────────────────────

export const caseStudies = [
  {
    slug: 'netnova-data-center-capstone',
    kind: 'case-study',
    eyebrow: 'Per Scholas × TEKsystems capstone · May 2026',
    title: 'NetNova regional office: from empty rack quarter to a validated network',
    summary:
      'Our seven-person consulting team was hired (in scenario) by NetNova, a growing e-commerce company, to design, build and document a compact data center rack for its regional office: a server network, a workstation network and secure internet access, on real Cisco and Dell hardware, in seven days.',
    date: 'May 2026',
    tools: ['Cisco ISR 4331', 'Catalyst 2960', 'ASA 5505', 'Dell PowerEdge R630', 'VMware ESXi', 'Windows Server 2019', 'Cisco Packet Tracer'],
    meta: [
      { k: 'My role', v: 'IT Project Manager' },
      { k: 'Team', v: '7 engineers' },
      { k: 'Timeline', v: '7-day build plan' },
      { k: 'Space', v: '¼ of a shared rack' },
    ],
    stats: [
      { value: '12/12', label: 'validation checks passing at handoff' },
      { value: '~550 W', label: 'load on a 1,800 W circuit (69% headroom)' },
      { value: '5', label: 'single points of failure mapped & mitigated' },
      { value: '4', label: 'teams aligned on one shared IP plan' },
    ],
    blocks: [
      {
        type: 'list',
        title: 'What I owned as project manager',
        items: [
          'Built the seven-day plan (analysis, physical build, network config, server setup, testing, presentation) and kept the team on it.',
          'Assigned work across seven roles: network, systems, cabling, security, documentation and QA.',
          'Brokered a single master IP plan with the three other teams sharing our rack after overlapping subnets caused routing conflicts.',
          'Owned the deliverable set: deployment plan, power budget, IP schema, wire map, rack diagram, topology, config files and test results.',
          'Led the final presentation and peer review.',
        ],
      },
      {
        type: 'image',
        title: 'Design model in Cisco Packet Tracer',
        src: '/projects/netnova-data-center-capstone/packet-tracer-topology.png',
        alt: 'Cisco Packet Tracer topology: internet, ASA firewall, router, two 2960 switches, PCs, laptops, access points, phones and printers',
        caption:
          'We modeled the office in Packet Tracer before touching hardware: firewall at the edge, a router behind it, two access switches, wireless access points, user devices and shared printers.',
        width: 718,
        height: 545,
      },
      {
        type: 'topology',
        title: 'Physical build',
        caption: 'Logical layout of the equipment we racked, with the server and workstation networks separated by VLAN.',
        tiers: [
          { nodes: [{ name: 'Internet', detail: 'ISP uplink' }] },
          { nodes: [{ name: 'Cisco ISR 4331', detail: 'Edge router · NAT/PAT · DHCP' }] },
          { nodes: [{ name: 'Cisco ASA 5505', detail: 'Firewall' }] },
          { nodes: [{ name: 'Catalyst 2960', detail: 'Access switch · trunk to router' }] },
          {
            nodes: [
              { name: 'Server VLAN', detail: 'Dell R630 · ESXi · Windows Server 2019 VM' },
              { name: 'Workstation VLAN', detail: '10 workstations · 10 user devices · 4 APs' },
            ],
          },
        ],
      },
      {
        type: 'timeline',
        title: 'Seven-day delivery plan',
        steps: [
          { when: 'Days 1–2', title: 'Analysis & planning', body: 'Inventoried the rack, defined the IP schema and ran the power budget.' },
          { when: 'Days 3–4', title: 'Physical build', body: 'Racked and cabled devices, terminated keystone jacks, labeled every run.' },
          { when: 'Days 4–5', title: 'Network configuration', body: 'Switch and router config, VLANs, SSH and baseline security.' },
          { when: 'Day 5', title: 'Server & VM', body: 'ESXi networking, then Windows Server 2019 as a VM on the server network.' },
          { when: 'Day 6', title: 'Testing & validation', body: 'Connectivity, internet access, remote management and security checks.' },
          { when: 'Day 7', title: 'Handoff', body: 'Final deliverables, peer review and presentation.' },
        ],
      },
      {
        type: 'specs',
        title: 'How it was built',
        cards: [
          {
            title: 'Switching',
            items: [
              'Separate VLANs for servers and workstations',
              'Access ports grouped by VLAN; Gi1/0/24 trunked to the router',
              'Unused ports moved to VLAN 99 and shut down',
              'SSH management with 2048-bit RSA keys',
            ],
          },
          {
            title: 'Routing & edge',
            items: [
              'Router-on-a-stick with subinterfaces for inter-VLAN routing',
              'NAT/PAT inside/outside for internet access',
              'DHCP pool for the workstation range',
              'Default route to the ISP gateway',
            ],
          },
          {
            title: 'Virtualization',
            items: [
              'ESXi vSwitch0 bound to the physical server NIC',
              '“Server-Net” port group mapped to the server VLAN',
              'Windows Server 2019 VM: 4 vCPU · 8 GB RAM · 80 GB disk',
              'VMFS datastore on the local RAID volume',
            ],
          },
          {
            title: 'Structured cabling',
            items: [
              'Cat6 UTP, RJ-45, T568B keystone terminations',
              'Color-coded: blue servers · yellow workstations · red uplinks',
              'Both ends labeled with port and destination',
              'Runs within the 100 m TIA-568 limit; 24-port 1U patch panel',
            ],
          },
        ],
      },
      {
        type: 'table',
        title: 'Power budget',
        columns: ['Device', 'Qty', 'Draw', 'Notes'],
        rows: [
          ['Dell PowerEdge R630 (our ¼ share)', '1', '~200 W', 'Dual PSUs; host shared with other teams'],
          ['Cisco switch', '1', '~50 W', 'PoE capable'],
          ['Cisco router', '1', '~40 W', 'Routing and NAT'],
          ['Workstations', '4', '~260 W', '~65 W each'],
          ['Patch panel · cable management', '2', '0 W', 'Passive'],
          ['Total', '9', '~550 W', '15 A / 1,800 W circuit · 1,500 VA UPS recommended'],
        ],
      },
      {
        type: 'specs',
        title: 'Security hardening',
        cards: [
          {
            title: 'Devices',
            items: ['All default passwords replaced', 'Hashed enable secrets', 'Unneeded legacy services disabled', 'Legal-warning login banner'],
          },
          {
            title: 'Remote access',
            items: ['SSHv2 only: Telnet refused on VTY lines', 'AAA new-model with local login list', 'ACL limits SSH to the management subnet'],
          },
          {
            title: 'Port security',
            items: ['Max 2 MACs per access port', 'Sticky MAC on workstation ports', 'Violation mode restrict: drop and log'],
          },
          {
            title: 'Server',
            items: ['Windows Firewall on, minimal ports open', 'Administrator account renamed', 'Strong password policy', 'RDP limited to the management subnet'],
          },
        ],
      },
      {
        type: 'table',
        title: 'Validation matrix',
        columns: ['Area', 'Test', 'Result'],
        rows: [
          ['Connectivity', 'Device to device, same VLAN', 'PASS'],
          ['Connectivity', 'Workstation → default gateway (<1 ms)', 'PASS'],
          ['Connectivity', 'Workstation → Windows Server VM', 'PASS'],
          ['Connectivity', 'Workstation internet access + DNS', 'PASS'],
          ['Connectivity', 'Server outbound (Windows Updates)', 'PASS'],
          ['Remote mgmt', 'SSHv2 into switch', 'PASS'],
          ['Remote mgmt', 'SSHv2 into router', 'PASS'],
          ['Remote mgmt', 'ESXi web client over HTTPS', 'PASS'],
          ['Security', 'Port security on unknown MAC', 'PASS'],
          ['Security', 'Telnet blocked (port 23 refused)', 'PASS'],
          ['Security', 'Inter-VLAN isolation', 'FIXED'],
          ['Physical', 'Every cable labeled, verified by two people', 'PASS'],
        ],
        note: 'Inter-VLAN isolation failed on first run; extended ACLs on the router subinterfaces fixed it before handoff.',
      },
      {
        type: 'fixes',
        title: 'What broke, and how we fixed it',
        items: [
          {
            title: 'Overlapping subnets',
            problem: 'Two teams sharing the rack picked the same address range, which confused routing.',
            fix: 'I coordinated all four teams onto one master IP plan, with a separate block for each team.',
          },
          {
            title: 'VLAN bleed',
            problem: 'The workstation VLAN could reach the server VLAN without restriction.',
            fix: 'Extended ACLs on the router subinterfaces allow only the traffic users need, such as RDP and SMB.',
          },
          {
            title: 'VM had no network',
            problem: 'The Windows Server VM’s NIC was attached to the wrong ESXi port group.',
            fix: 'Audited the vSwitch config, moved the NIC to “Server-Net” and re-tested.',
          },
          {
            title: 'Trip hazard',
            problem: 'Floor runs from the rack to workstations were unsafe.',
            fix: 'Re-routed along baseboards and secured flush to the wall.',
          },
        ],
      },
      {
        type: 'table',
        title: 'Risk register: single points of failure',
        columns: ['Component', 'Impact if it fails', 'Severity', 'Mitigation'],
        rows: [
          ['Single switch', 'All VLAN connectivity lost', 'HIGH', 'Second switch with spanning tree / link aggregation'],
          ['Single router', 'No internet, no inter-VLAN routing', 'HIGH', 'HSRP/VRRP with a standby router'],
          ['Single ISP uplink', 'Full internet outage', 'HIGH', 'Dual ISP with BGP or policy-based routing'],
          ['No UPS', 'Unplanned outages and data loss', 'HIGH', '1,500 VA UPS with auto-shutdown'],
          ['Single server NIC', 'Server network down', 'MED', 'NIC teaming on the ESXi host'],
        ],
      },
      {
        type: 'list',
        title: 'What I’d carry into the next build',
        items: [
          'Agree the IP plan with every party before anyone configures anything. Fixing overlap mid-build is expensive.',
          'Cable labels matter as much as configs; unlabeled runs cost us the most troubleshooting time.',
          'ESXi virtual networking has to mirror the physical VLAN design exactly.',
          'Harden in small steps and test after each one, not all at the end.',
          'Add monitoring (SNMP with Zabbix or Nagios) and change management, even in a lab.',
        ],
      },
    ],
  },
  /* ---------------- CodePath CYB102 Intermediate Cybersecurity (Summer 2026) ---------------- */
  {
    slug: 'threat-hunt-solarwinds-scattered-spider',
    kind: 'security',
    eyebrow: 'CodePath CYB102 · Threat hunting · 2026',
    title: 'Threat hunt: SolarWinds and Scattered Spider indicators in Splunk',
    summary:
      'Took published indicators of compromise from two real-world campaigns and hunted for them in a simulated company’s traffic logs, to find which machines talked to attacker infrastructure, when, and how widely.',
    date: 'Summer 2026',
    tools: ['Splunk', 'SPL', 'VirusTotal', 'Threat intelligence', 'IOC hunting'],
    stats: [
      { value: '9', label: 'machines found talking to attacker infrastructure' },
      { value: '6', label: 'indicators matched across two campaigns' },
      { value: '2', label: 'separate campaigns, four years apart' },
      { value: '1', label: 'correlation search reused for both hunts' },
    ],
    blocks: [
      {
        type: 'list',
        title: 'How I hunted',
        items: [
          'Loaded each campaign’s IOC list and the company traffic log into Splunk as two sources.',
          'Wrote one SPL search that groups events by IP or domain and keeps only values seen in both sources (mvcount(sources) > 1), so only real matches survive.',
          'Tabled the computer name, user agent, date and time for every match to build a timeline.',
          'Checked each indicator’s reputation in VirusTotal to see how the infrastructure had aged.',
        ],
      },
      {
        type: 'image', bg: 'dark',
        title: 'SolarWinds: matches in Splunk',
        src: '/projects/threat-hunt-solarwinds-scattered-spider/solarwinds-matches.webp',
        alt: 'Splunk results: three SolarWinds command-and-control IPs matched to five machines',
        caption: 'Every match carried the user agent “SolarWinds Orion Core Services”: attacker traffic disguised as normal Orion software.',
        width: 1167, height: 470,
      },
      {
        type: 'table',
        title: 'SolarWinds findings (Dec 9 to 11, 2020)',
        columns: ['Indicator', 'Machines', 'When'],
        rows: [
          ['13.59.205.66', 'WS-SolarWave-212', 'Dec 10, 06:57'],
          ['5.252.177.25', 'LN-SolarStrike-14, MX-SolarStorm-136, WS-SolarLight-943', 'Dec 9 to Dec 11'],
          ['54.215.192.52', 'LN-SolarShadow-552', 'Dec 11, 07:10'],
        ],
      },
      {
        type: 'image', bg: 'dark',
        title: 'Scattered Spider: matches in Splunk',
        src: '/projects/threat-hunt-solarwinds-scattered-spider/scattered-spider-matches.webp',
        alt: 'Splunk results: three lookalike phishing domains matched to four machines',
        caption: 'Lookalike domains impersonating Cisco and LinkedIn, visited from IT, HR, DevOps and Finance workstations.',
        width: 1142, height: 466,
      },
      {
        type: 'table',
        title: 'Scattered Spider findings (Sep 15 to 16, 2024)',
        columns: ['Indicator', 'Machines', 'When'],
        rows: [
          ['ciscoacclink.com', 'WS-IT-204', 'Sep 15, 14:23'],
          ['linkedinsso.com', 'WS-HR-888', 'Sep 15, 09:47'],
          ['logonlink.com', 'WS-DevOps-441, WS-Finance-307', 'Sep 16, 11:15 and 11:28'],
        ],
      },
      {
        type: 'list',
        title: 'What it showed',
        items: [
          'SolarWinds hid inside trusted software updates; Scattered Spider went after people with fake login domains. Two very different ways in.',
          'The SolarWinds IPs still carry a malicious reputation years later, while the phishing domains are newer and short-lived. Old indicators are still worth hunting.',
          'Two compromises years apart point to a monitoring gap: I’d recommend automatic IOC correlation alerts, domain-based detection and targeted phishing awareness for high-access teams.',
        ],
      },
    ],
  },
  {
    slug: 'siem-malware-investigation',
    kind: 'security',
    eyebrow: 'CodePath CYB102 · SIEM · 2026',
    title: 'SIEM investigation: tracing a malware upload in Splunk',
    summary:
      'Solved all 15 Splunk capture-the-flag challenges: ten search drills on a large media dataset, then a five-step investigation that traced a known-bad file hash back to the attacker’s IP, the accounts they tried, the browser they used and the file they planted.',
    date: 'Summer 2026',
    tools: ['Splunk', 'SPL', 'Log analysis', 'Incident timeline'],
    stats: [
      { value: '15/15', label: 'CTF challenges solved' },
      { value: '3', label: 'accounts the attacker tried' },
      { value: '8 min', label: 'between the malicious and a legitimate upload' },
      { value: '1', label: 'malicious file confirmed by hash' },
    ],
    blocks: [
      {
        type: 'timeline',
        title: 'The investigation, step by step',
        steps: [
          { when: 'Step 1', title: 'Hash to IP', body: 'Searched the MD5 hash of the known malware and found the uploading IP: 192.168.1.10.' },
          { when: 'Step 2', title: 'IP to accounts', body: 'Login attempts from that IP used ABurke, Admin and Pi. The upload succeeded as ABurke.' },
          { when: 'Step 3', title: 'Attacker’s browser', body: 'The successful upload came from a Firefox/89.0 user agent.' },
          { when: 'Step 4', title: 'Rule out noise', body: 'A second upload 8 minutes later came from Jmann at 192.168.1.7: a normal proposal.pdf.' },
          { when: 'Step 5', title: 'Name the file', body: 'Matching hashes to filenames confirmed EvilScript.exe as the malicious upload.' },
        ],
      },
      {
        type: 'list',
        title: 'Search techniques used',
        items: [
          'Field filters and wildcards to narrow a dataset to exactly the events that matter.',
          'stats count, top, table and sort to turn raw events into answers.',
          'Pivoting: each answer (hash, IP, username, time) became the filter for the next search.',
        ],
      },
      {
        type: 'prose',
        title: 'Takeaway',
        body: ['Timestamps are the most important field in a log. Lining up the two uploads by time is what separated the attack from normal activity, and correlating events by time is the whole point of a SIEM.'],
      },
    ],
  },
  {
    slug: 'incident-response-ioc-validation',
    kind: 'security',
    eyebrow: 'CodePath CYB102 · Incident response · 2026',
    title: 'Incident response: catching a mislabeled indicator',
    summary:
      'Worked a remote-access-trojan case in Cisco Catalyst, then verified every indicator in the analyst’s report against outside threat intelligence. One “high confidence malicious” IP turned out to be a harmless CDN address: a mistake that would have wasted analyst time and blocked legitimate traffic.',
    date: 'Summer 2026',
    tools: ['Cisco Catalyst', 'VirusTotal', 'AbuseIPDB', 'Incident response', 'IOC validation'],
    stats: [
      { value: '~45/60', label: 'antivirus engines flagging the malware hash' },
      { value: '1/91', label: 'vendors flagging the “malicious” IP' },
      { value: '1', label: 'mislabeled indicator caught' },
      { value: '2', label: 'controls recommended' },
    ],
    blocks: [
      {
        type: 'image', bg: 'dark',
        title: 'The case in Catalyst',
        src: '/projects/incident-response-ioc-validation/catalyst-case.webp',
        alt: 'Cisco Catalyst incident IR-2023-002 with three artifacts: an MD5 hash, an IP address and a download URL',
        caption: 'Incident IR-2023-002 (training scenario): a user clicked a social-media link and ran a Word document that installed a remote access trojan.',
        width: 613, height: 373,
      },
      {
        type: 'table',
        title: 'Checking the report’s indicators',
        columns: ['Indicator', 'The report said', 'What I found', 'Verdict'],
        rows: [
          ['MD5 3AADBF7E…', 'Remote access trojan', 'Flagged by ~45 of 60 engines; matches the Valyria/PoetRAT family: a Word macro dropper that runs a Python payload', 'CONFIRMED'],
          ['93.184.216.34', 'High-confidence malicious', '0% abuse score on AbuseIPDB, 1 of 91 vendors on VirusTotal; a CDN address long used for example.com', 'MISLABELED'],
        ],
      },
      {
        type: 'fixes',
        title: 'Gaps I found, and what I’d change',
        items: [
          { title: 'Unvetted indicators', problem: 'IOCs went into the report without a reputation check, so a harmless address was marked high-confidence malicious.', fix: 'Validate every IOC automatically before it’s added to a case.' },
          { title: 'Macros allowed', problem: 'The chain was link → Word document → macro → Python RAT. Nothing stopped the macro from running.', fix: 'Group Policy that blocks macros in Office files downloaded from the internet, breaking the chain at its first step.' },
        ],
      },
      {
        type: 'prose',
        title: 'Most important phase',
        body: ['Containment. Even when detection is slow, containing the host quickly stops an attacker from spreading, escalating privileges or taking data.'],
      },
    ],
  },
  {
    slug: 'slowloris-dos-mitigation',
    kind: 'security',
    eyebrow: 'CodePath CYB102 · Network defense · 2026',
    title: 'Defending nginx against a Slowloris denial-of-service attack',
    summary:
      'Hit an unprotected nginx server with Slowloris and watched it lock up in Netdata, then hardened the config with connection limits, rate limiting and short timeouts, and ran the attack again. This time the server kept serving.',
    date: 'Summer 2026',
    tools: ['nginx', 'Slowloris', 'Netdata', 'Linux', 'Rate limiting'],
    stats: [
      { value: '~560', label: 'connections held open while unprotected' },
      { value: '10', label: 'connections allowed per client after hardening' },
      { value: '10 r/s', label: 'request rate limit (burst 20)' },
      { value: '5 s', label: 'header and body timeouts' },
    ],
    blocks: [
      {
        type: 'image', bg: 'dark',
        title: 'Before: unprotected',
        src: '/projects/slowloris-dos-mitigation/unprotected-graph.webp',
        alt: 'Netdata TCP connections graph rising and staying high during the unprotected attack',
        caption: 'Slowloris opened 500 connections; the graph climbed to about 560 and stayed there. Every worker slot was waiting on a request that would never finish.',
        width: 1400, height: 214,
      },
      {
        type: 'image', bg: 'dark',
        title: 'The fix',
        src: '/projects/slowloris-dos-mitigation/nginx-config.webp',
        alt: 'nginx config with limit_conn, limit_req and short client timeouts',
        caption: 'Per-client connection and request limits, plus short timeouts so half-open requests get dropped.',
        width: 872, height: 390,
      },
      {
        type: 'image', bg: 'dark',
        title: 'After: protected',
        src: '/projects/slowloris-dos-mitigation/protected-graph.webp',
        alt: 'Netdata TCP connections graph showing short spikes that drop straight back down',
        caption: 'Same attack: short spikes that fall straight back down as nginx rejects and times out the extra connections.',
        width: 1400, height: 220,
      },
      {
        type: 'specs',
        title: 'What each rule does',
        cards: [
          { title: 'Connection limits', items: ['limit_conn_zone per client IP', 'limit_conn 10: one client can’t hog the server'] },
          { title: 'Rate limiting', items: ['limit_req at 10 requests per second', 'burst 20 absorbs normal spikes'] },
          { title: 'Timeouts', items: ['client_header_timeout 5s and client_body_timeout 5s', 'Slow, never-finished requests get dropped'] },
          { title: 'Keep-alive', items: ['keepalive_timeout 15s, send_timeout 10s', 'Idle connections free up quickly'] },
        ],
      },
    ],
  },
  {
    slug: 'phishing-pcap-forensics',
    kind: 'security',
    eyebrow: 'CodePath CYB102 · Network forensics · 2026',
    title: 'Network forensics: finding a phishing sender in packet captures',
    summary:
      'Given four packet captures, found the one machine running a sextortion phishing campaign, using Wireshark display filters to separate it from normal mail traffic.',
    date: 'Summer 2026',
    tools: ['Wireshark', 'PCAP analysis', 'SMTP', 'Phishing analysis'],
    stats: [
      { value: '4', label: 'packet captures analyzed' },
      { value: '24', label: 'phishing emails sent within seconds' },
      { value: '1', label: 'sending IP identified' },
    ],
    blocks: [
      {
        type: 'list',
        title: 'How I found it',
        items: [
          'Applied the imf filter (Internet Message Format) to see the actual emails inside each capture.',
          'One capture stood out: a single internal IP, 10.6.1.104, sent 24 emails within seconds to different recipients.',
          'The sender addresses rotated through random domains, and every subject line used threatening, urgent language: classic sextortion phishing.',
          'Confirmed with ip.src == 10.6.1.104, which showed the SMTP traffic going out to an external mail server.',
          'The other three captures each held a single legitimate test email.',
        ],
      },
      {
        type: 'prose',
        title: 'Why it matters',
        body: ['Packet captures are a recording of exactly what crossed the network. Knowing the right filters turns thousands of packets into one clear answer: who sent what, to whom, and when.'],
      },
    ],
  },
  {
    slug: 'linux-auditd-file-integrity',
    kind: 'security',
    eyebrow: 'CodePath CYB102 · Host monitoring · 2026',
    title: 'File integrity monitoring with Linux auditd',
    summary:
      'Put kernel-level watch rules on sensitive files, let three attack scripts run, and used the audit log to prove exactly which script changed which file.',
    date: 'Summer 2026',
    tools: ['Linux', 'auditd', 'auditctl', 'ausearch'],
    stats: [
      { value: '4', label: 'tampered files detected' },
      { value: '3', label: 'attack scripts' },
      { value: '4/4', label: 'changes traced to the script that made them' },
    ],
    blocks: [
      {
        type: 'table',
        title: 'Which attack changed which file',
        columns: ['File', 'Changed by'],
        rows: [
          ['cloudia.txt', 'attack-a'],
          ['oakley.txt', 'attack-b'],
          ['squeaky.txt', 'attack-b'],
          ['precipitation.csv', 'attack-c'],
        ],
      },
      {
        type: 'list',
        title: 'How it works',
        items: [
          'auditctl -w <file> -p wa -k <key> watches a file for writes and attribute changes, tagged with a search key.',
          'The kernel logs every matching system call, so nothing slips past the watch.',
          'ausearch -k <key> pulls up only that file’s events, and the comm= field names the process that made the change.',
        ],
      },
    ],
  },
  {
    slug: 'directory-traversal-attack',
    kind: 'security',
    eyebrow: 'CodePath CYB102 · Web app security · 2026',
    title: 'Web app security: exploiting a directory traversal flaw',
    summary:
      'Scripted an attack on a vulnerable file server that escaped its public folder with URL-encoded ../ paths, read other users’ private reports, and pulled the real earnings figure the app was hiding.',
    date: 'Summer 2026',
    tools: ['Bash', 'Node.js', 'Directory traversal', 'URL encoding'],
    stats: [
      { value: '3', label: 'private files read from outside the public folder' },
      { value: '1', label: 'Bash script automating the attack' },
    ],
    blocks: [
      {
        type: 'image', bg: 'dark',
        title: 'The attack running',
        src: '/projects/directory-traversal-attack/traversal-output.webp',
        alt: 'Terminal running attack.sh: the server starts, the traversal request is sent, and a private report is returned',
        caption: 'attack.sh starts the vulnerable server, sends the traversal request and cleans up. The response leaks a private report: “Earnings are down 1600%”.',
        width: 1400, height: 865,
      },
      {
        type: 'list',
        title: 'What I did',
        items: [
          'Used %2e%2e (URL-encoded “..”) to step out of /general into other users’ folders: timmy, wanda and cosmo.',
          'Wrapped server start-up, the attack path and clean-up in one Bash script, so each test is a one-line change.',
        ],
      },
      {
        type: 'list',
        title: 'How it should be fixed',
        items: [
          'Decode and normalize every requested path, then reject anything that resolves outside the public folder.',
          'Serve files from an allowlist, and run the server with only the permissions it needs.',
        ],
      },
    ],
  },
  {
    slug: 'sdn-ddos-data-dig',
    kind: 'security',
    eyebrow: 'CodePath CYB102 · Team project · In progress',
    title: 'The Data Dig: DDoS detection in a software-defined network',
    summary:
      'A four-person team analyzing a 1,048,575-row DDoS dataset from a simulated software-defined network, and adapting CISA’s DDoS response playbook to how SDN actually works.',
    date: 'Summer 2026 (in progress)',
    tools: ['Python (pandas)', 'Wireshark', 'Splunk', 'Snort', 'Zeek', 'CISA playbooks'],
    stats: [
      { value: '1,048,575', label: 'rows of labeled traffic' },
      { value: '4', label: 'team members' },
      { value: '3', label: 'hypotheses to test' },
      { value: '5', label: 'changes to the CISA playbook' },
    ],
    blocks: [
      {
        type: 'list',
        title: 'My role',
        items: [
          'Researched SDN and the Ryu controller so the team understood where the data came from.',
          'Mapped the playbook’s phases to our findings: what detection and containment look like in this network.',
          'Co-wrote the playbook adaptation, and own the presentation.',
        ],
      },
      {
        type: 'list',
        title: 'What we expect to find',
        items: [
          'Attack traffic will have much higher packet rates and smaller, more uniform packets than normal traffic.',
          'A few source IPs will produce most of the traffic during attacks.',
          'Delay, jitter and packet loss will rise sharply during attack windows.',
        ],
      },
      {
        type: 'specs',
        title: 'Adapting CISA’s playbook to SDN',
        cards: [
          { title: 'Detect at the controller', items: ['The controller sees every switch’s flow table', 'Watch for spikes in flows, packet rate and uniform short flows'] },
          { title: 'Contain with flow rules', items: ['Push drop or rate-limit rules from the controller', 'Network-wide in seconds, instead of edge firewall rules'] },
          { title: 'Thresholds from data', items: ['Packet-rate and per-source limits taken from our own analysis', 'Replaces generic “unusual volume” wording'] },
          { title: 'Validate against labels', items: ['Score the playbook’s detection rules against the dataset’s ground truth', 'Drop steps that don’t apply to a lab dataset'] },
        ],
      },
    ],
  },

];

export const getCaseStudy = (slug) => caseStudies.find((c) => c.slug === slug);
export const labs = caseStudies.filter((c) => c.kind === 'lab');
export const securityProjects = caseStudies.filter((c) => c.kind === 'security');
