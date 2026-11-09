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
      'Our seven-person consulting team was hired (in scenario) by NetNova, a growing e-commerce company, to design, build and document a compact data center rack for its regional office: a server network, a workstation network and secure internet access — on real Cisco and Dell hardware, in seven days.',
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
      { value: '~550 W', label: 'load on a 1,800 W circuit — 69% headroom' },
      { value: '5', label: 'single points of failure mapped & mitigated' },
      { value: '4', label: 'teams aligned on one shared IP plan' },
    ],
    blocks: [
      {
        type: 'list',
        title: 'What I owned as project manager',
        items: [
          'Built the seven-day plan — analysis, physical build, network config, server setup, testing, presentation — and kept the team on it.',
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
            items: ['SSHv2 only — Telnet refused on VTY lines', 'AAA new-model with local login list', 'ACL limits SSH to the management subnet'],
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
        title: 'Risk register — single points of failure',
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
          'Agree the IP plan with every party before anyone configures anything — fixing overlap mid-build is expensive.',
          'Cable labels matter as much as configs; unlabeled runs cost us the most troubleshooting time.',
          'ESXi virtual networking has to mirror the physical VLAN design exactly.',
          'Harden in small steps and test after each one, not all at the end.',
          'Add monitoring (SNMP with Zabbix or Nagios) and change management, even in a lab.',
        ],
      },
    ],
  },
];

export const getCaseStudy = (slug) => caseStudies.find((c) => c.slug === slug);
export const labs = caseStudies.filter((c) => c.kind === 'lab');
